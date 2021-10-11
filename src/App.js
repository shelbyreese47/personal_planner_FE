import React, { useState } from 'react';
import Home from './components/Home/Home';
import Contacts from './components/Contacts/Contacts';
import Notes from './components/Notes/Notes';
import TodoList from './components/TodoList/TodoList';
import { Route, Link } from 'react-router-dom';
import UpdateTodo from './components/TodoList/UpdateTodo'



function App() {
const [count, setCount] = useState([]);







	return (
		<div className='container'>
			<header></header>

			<div className='menu'>
				<Link to='/'>Home </Link>
				<Link to='/Notes'> Notes </Link>
				<Link to='/TodoList'>Todo List </Link>
				<Link to='/Contacts'> Contacts</Link>
				<Route exact path='/' component={Home} />
				<Route exact path='/Notes' component={Notes} />
				<Route
					exact
					path='/TodoList'
					render={() => <TodoList count={count} setCount={setCount} />}
				/>
				<Route exact path='/Contacts' component={Contacts} />
				<Route
					exact
					path='/TodoList/:id'
					render={() => <UpdateTodo count={count} setCount={setCount} />}
				/>
			</div>

			<main></main>
		</div>
	);
}

export default App;
