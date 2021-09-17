import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Contacts from './components/Contacts/Contacts'
import Notes from './components/Notes/Notes'
import TodoList from './components/TodoList/TodoList'
import { Route, Link, Redirect } from 'react-router-dom';

function App() {
	return (
		<>
			<header>
				<h1>
					<a href='/'>Welcome Joy!</a>
				</h1>
			</header>
			<nav>
				<Link to='/'> Home</Link>
				<Link to='/Notes'>Notes</Link>
				<Link to='/TodoList'>Todo List</Link>
				<Link to='/Contacts'> Contacts</Link>
			</nav>

			<main>
				<Route exact path='/' component={Home} />
				<Route exact path='/Notes' component={Notes} />
				<Route exact path='/TodoList' component={TodoList} />
				<Route exact path='/Contacts' component={Contacts} />
			</main>
		</>
	);
}

export default App;
