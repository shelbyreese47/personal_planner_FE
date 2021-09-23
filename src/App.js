import React from 'react';
import Home from './components/Home/Home';
import Contacts from './components/Contacts/Contacts';
import Notes from './components/Notes/Notes';
import TodoList from './components/TodoList/TodoList';
import { Route, Link } from 'react-router-dom';



function App() {








	return (
		<div className='container'>
		
			<header>
			
			</header>

			<div className='menu'>
				<Link to='/'>Home </Link>
				<Link to='/Notes'> Notes </Link>
				<Link to='/TodoList'>Todo List </Link>
				<Link to='/Contacts'> Contacts</Link>
				<Route exact path='/' component={Home} />
				<Route exact path='/Notes' component={Notes} />
				<Route exact path='/TodoList' component={TodoList} />
				<Route exact path='/Contacts' component={Contacts} />
			</div>
             

			<main></main>
		</div>
	);
}

export default App;
