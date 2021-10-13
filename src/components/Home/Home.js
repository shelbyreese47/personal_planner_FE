import React, { useState, useEffect } from 'react';
import Clock from '../Clock';
// import apiConfig from '../../apikeys';

const Home = () => {
	const [home, setHome] = useState();
	const [quote, setQuote] = useState();

// const Boston = 'Boston'; 
const [userCity, setUserCity]  = useState('Boston');

	const handleChange = (event) => {
		// setTodoText(event.target.value);

		setUserCity({ ...userCity, [event.target.id]: event.target.value });
	};

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=5ecef11cefb74010e2528b942ae24f55&units=imperial`
		)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setHome(json);
			})

			.catch(console.error);
	}, []);

	let index = Math.floor(Math.random() * 1644);


	useEffect(() => {
		fetch('https://type.fit/api/quotes')
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
		<div className='homeContainer'>
			<div className='weather'>
				<h1>{home.main.temp}°</h1>
			</div>

			<div className='weatherstatus'>{home.weather[0].description}  </div>
			<div className='location'>
				{/* <h4>{home.weather[0]}</h4> */}
				<input type="text" placeholder="enter city" onChange={handleChange} value="userCity"/> 
				<button type="submit">✓</button>
			</div>

			<div className='time'>
				<Clock />
			</div>
				<p className="todaysDate">Today's Date: {new Date().toLocaleDateString()}</p>

			{/* <h1 className='welcome'>WELCOME JOY!</h1> */}

			<div className='quote'>
				<h2>{quote[index].text}</h2>
				<h2> - {quote[index].author}</h2>
			</div>
		</div>
	);
};

export default Home;
