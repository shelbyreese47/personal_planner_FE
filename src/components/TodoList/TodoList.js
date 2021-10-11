import React, { useEffect, useState } from 'react';
// import Link from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import AddTodo from './AddTodo';
import axios from 'axios';

const TodoList = ({setCount, count}) => {
	const [todos, setTodos] = useState([]);
	// const [count, setCount] = useState([]);

	const url = 'https://safe-springs-78643.herokuapp.com/api/todos';

	const handleAddTodo = (todo) => {
		// const date = new Date();
		// const newTodo = {
		// 	text: text,
		// 	date: date.toLocaleDateString(),
		// };

		// const newTodos = [...todos, newTodo];
		// setTodos(...todo);
		// setCount( count ? 0 : 1)
		setCount([...count, '']);
		// count++;

		// setTodos([...todos, todo]);
		//console.log(y);
	};
	const updateTodo = async (event) => {
		console.log(event.target.id);

		// await axios.put(`https://safe-springs-78643.herokuapp.com/api/todos/${event.target.id}`, {
		// 	date: new Date().toLocaleDateString(),
		// 	dueDate: todoText.dueDate,
		// 	user: todoText.user,
		// 	content: todoText.content,
		// 	priority: todoText.priority,
		// 	completed: todoText.completed,
		// })

		axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const id = todos._id;
	// console.log(id);

	const deleteTodo = async (event) => {
		console.log(event.target.id);

		await axios.delete(
			`https://safe-springs-78643.herokuapp.com/api/todos/${event.target.id}`
		);

		axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		function getData() {
			fetch(url)
				.then((res) => res.json())
				.then((json) => {
					console.log(json);
					setTodos(json);
					// let high = todos.filter((todo) => todo.priority === 'High');
					// console.log(high);

					let o = setTodos(json);
					console.log(o);
				})
				.catch((err) => console.log(err));
		}
		getData();
	}, [count]);

	let veryHighP = todos.filter(
		(todo) => todo.priority === 'Very High' && todo.completed === false
	);
	let highP = todos.filter(
		(todo) => todo.priority === 'High' && todo.completed === false
	);
	let mediumP = todos.filter(
		(todo) => todo.priority === 'Medium' && todo.completed === false
	);
	let lowP = todos.filter(
		(todo) => todo.priority === 'Low' && todo.completed === false
	);
	let completed = todos.filter((todo) => todo.completed === true);

	return (
		<div>
			{/* <h3>All Todos</h3>
				{todos.map((todo)=> 
				<li>{todo.content}</li>)} */}

			<h3>Very High Priority</h3>
			<ul>
				{veryHighP.map((todo, index) => (
					// console.log(todo)
					<li key={`${todo} - ${index}`}>
						{todo.content}
						<Link to={`/TodoList/${todo._id}`}>
							<button>Update</button>
						</Link>

						<button id={todo._id} onClick={deleteTodo}>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h3>High Priority</h3>
			<ul>
				{highP.map((todo, index) => (
					<li key={`${todo} - ${index}`}>
						{todo.content}
						<Link to={`/TodoList/${todo._id}`}>
							<button>Update</button>
						</Link>
						<button id={todo._id} onClick={deleteTodo}>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h3>Medium Priority</h3>
			<ul>
				{mediumP.map((todo, index) => (
					<li key={`${todo} - ${index}`}>
						{todo.content}
						<Link to={`/TodoList/${todo._id}`}>
							<button>Update</button>
						</Link>
						<button id={todo._id} onClick={deleteTodo}>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h3>Low Priority</h3>
			<ul>
				{lowP.map((todo, index) => (
					<li key={`${todo} - ${index}`}>
						{todo.content}
						<Link to={`/TodoList/${todo._id}`}>
							<button>Update</button>
						</Link>
						<button id={todo._id} onClick={deleteTodo}>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h3>Completed</h3>
			<ul>
				{completed.map((todo, index) => (
					<li key={`${todo} - ${index}`}>
						{todo.content}
						<Link to={`/TodoList/${todo._id}`}>
							<button>Update</button>
						</Link>

						<button id={todo._id} onClick={deleteTodo}>
							Delete
						</button>
					</li>
				))}
			</ul>
			<AddTodo setTodos={setTodos} handleAddTodo={handleAddTodo} />
		</div>
	);
};

export default TodoList;
