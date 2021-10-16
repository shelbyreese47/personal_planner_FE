import React, { useState, useEffect } from 'react';
import Clock from '../Clock';
import weatherAPIKey from '../../apikeys';

const Home = () => {
	const [home, setHome] = useState();
	const [quote, setQuote] = useState();
	const [click, setClick] = useState(false);
	const [quoteClick, setQuoteClick] = useState(true);
	const [index, setIndex] = useState(0);

	const [userCity, setUserCity] = useState('Boston');
	
	const apiKey = weatherAPIKey;

	const handleChange = (event) => {
		event.preventDefault();
		setUserCity(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setClick(!click);
	};

	let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=imperial`;

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setHome(json);
			})

			.catch(console.error);
	}, [click]);

	useEffect(() => {
		fetch('https://type.fit/api/quotes')
			.then((res) => res.json())
			.then((json) => {
				setQuote(json);
				setQuoteClick(false);
				setIndex(Math.floor(Math.random() * 1644));
			});
	}, [quoteClick]);

	if (!home) {
		return <h1>Loading</h1>;
	}
	if (!quote) {
		return <h1>Loading</h1>;
	}

	return (
		<div className='homeContainer'>
			<div className='weather'>
				{/* <h1>{home.main.temp}°</h1> */}
			</div>

			{/* <div className='weatherstatus'>{home.weather[0].description}  </div> */}
			<form className='location' onSubmit={handleSubmit}>
				{/* <h4>{home.name}</h4> */}
				<input
					className='c27'
					type='text'
					placeholder='enter city'
					onChange={handleChange}
				/>
				<button className='weather-icon' type='submit'>
					✓
				</button>
			</form>

			<div className='time'>
				<Clock />
			</div>
			<p className='todaysDate'>
				Today's Date: {new Date().toLocaleDateString()}
			</p>
			<div className='quote'>
				<h2>{quote[index].text}</h2>
				<h2> - {quote[index].author}</h2>
			</div>
		</div>
	);
};

export default Home;
