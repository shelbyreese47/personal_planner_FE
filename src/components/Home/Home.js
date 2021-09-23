import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clock from '../Clock';
import apiConfig from '../../apikeys';
const Home = () => {
	const [home, setHome] = useState();
	const [quote, setQuote] = useState();

	const date = new Date();
	let q = apiConfig.weatherAPIKey;
    
	const url = `https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=${q}&units=imperial`;

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setHome(json);
			})

			.catch(console.error);
	}, []);

	let index = Math.floor(Math.random() * 1644);
	let url2 = 'https://type.fit/api/quotes';

	useEffect(() => {
		fetch(url2)
			.then((res) => res.json())
			.then((json) => {
				setQuote(json);
			});
	}, []);

	// .catch(console.error);

	// console.log(quote[index].text);

	// 	}, []);

	if (!home) {
		return <h1>Loading</h1>;
		//empty objects are not falsey. state must be empty for this to happen. ^^^^^
	}
	if (!quote) {
		return <h1>Loading</h1>;
		//empty objects are not falsey. state must be empty for this to happen. ^^^^^
	}

	return (
		<div className='container'>
			<div className='weather'>
				<h1>{home.main.temp}°</h1>
			</div>

		
			<div className='weatherstatus'>
				{console.log(home.weather[0].description)}
				{home.weather[0].description}  
			</div>
			<div className='location'>
				<h4>Boston</h4>
			</div>

			<div className='time'>
				<Clock /> 
			</div>

			{/* <h1 className='welcome'>WELCOME JOY!</h1> */}

			<div className='quote'>
				<h2>{quote[index].text}</h2>
				<h2> - {quote[index].author}</h2>
			</div>
		</div>
	);
};

export default Home;
