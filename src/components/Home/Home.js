
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

const [home,setHome] = useState({})
const [quote, setQuote] = useState({});
  
   	const url = `https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=5ecef11cefb74010e2528b942ae24f55&units=imperial`;


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



.catch(console.error);

		// console.log(data[index].text);
		// console.log(data[index].author);
	}, []);








     return (
				<div>
					<h1>Welcome Joy!</h1>
					<h2>Boston</h2>
					<h3>
						{console.log(home.weather[0].description)} {home.main.temp}
						{home.weather[0].description}
					</h3>
				</div>
			);


};

export default Home;