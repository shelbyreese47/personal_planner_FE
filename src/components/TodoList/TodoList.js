import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddTodo from './AddTodo';
import axios from 'axios';

const TodoList = ({ setCount, count }) => {
	const [todos, setTodos] = useState([]);

	const url = 'https://safe-springs-78643.herokuapp.com/api/todos';

	const handleAddTodo = (todo) => {
		setCount(!count);
	};

	const deleteTodo = (event) => {
		event.preventDefault();
		

		axios
			.delete(
				`https://safe-springs-78643.herokuapp.com/api/todos/${event.target.id}`
			)
			.then(() => setCount(!count));

	};

	const completeTodo = (todo) => {
		todo.preventDefault();

		axios
			.put(
				`https://safe-springs-78643.herokuapp.com/api/todos/${todo.target.id}`,
				{
					completed: true,
				}
			)

			.then(
				axios
					.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
					.then((response) => {
						setTodos(response.data);
						setCount(!count);
					})
					.catch((err) => {
						console.log(err)
					})
			);
	};
	const uncompleteTodo = (todo) => {
		todo.preventDefault();


		axios
			.put(
				`https://safe-springs-78643.herokuapp.com/api/todos/${todo.target.id}`,
				{
					completed: false,
				}
			)

			.then(
				axios
					.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
					.then((response) => {
						setTodos(response.data);
						setCount(!count);
					})
					.catch((err) => {
						console.log(err);
					})
			);
	};

	useEffect(() => {
		function getData() {
			fetch(url)
				.then((res) => res.json())
				.then((json) => {
					setTodos(json);
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
		<div className='todoContainer'>
			<div className='veryHigh'>
				<h3>Very High Priority</h3>
				<ul className='priorities'>
					{veryHighP.map((todo, index) => (
						

						<li className='todoBox' key={`${todo} - ${index}`}>
							<p className='dueDate'>Due: {todo.dueDate}</p>
							<p className='dueDate'>{todo.content}</p>
							<br />
							<span>
								<Link to={`/TodoList/${todo._id}`}>
									<button className='update'> ✎ </button>
								</Link>

								<button
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}>
									x
								</button>
								<button
									className='delete-icon'
									id={todo._id}
									onClick={completeTodo}>
									✓
								</button>
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className='high'>
				<h3>High Priority</h3>
				<ul className='priorities'>
					{highP.map((todo, index) => (
						<li className='todoBox' key={`${todo} - ${index}`}>
							<p className='dueDate'>Due: {todo.dueDate}</p>

							<p className='dueDate'>{todo.content}</p>
							<br />
							<span>
								<Link to={`/TodoList/${todo._id}`}>
									<button className='update'> ✎  </button>
								</Link>

								<button
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}>
									x
								</button>
								<button
									className='delete-icon'
									id={todo._id}
									onClick={completeTodo}>
									✓
								</button>
							</span>

						</li>
					))}
				</ul>
			</div>
			<div className='medium'>
				<h3>Medium Priority</h3>
				<ul className='priorities'>
					{mediumP.map((todo, index) => (
						<li className='todoBox' key={`${todo} - ${index}`}>
							<p className='dueDate'>Due: {todo.dueDate}</p>

							<p className='dueDate'>{todo.content}</p>
							<br />
							<span>
								<Link to={`/TodoList/${todo._id}`}>
									<button className='update'> ✎ </button>
								</Link>

								<button
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}>
									x
								</button>
								<button
									className='delete-icon'
									id={todo._id}
									onClick={completeTodo}>
									✓
								</button>
							</span>

						</li>
					))}
				</ul>
			</div>
			<div className='low'>
				<h3>Low Priority</h3>
				<ul className='priorities'>
					{lowP.map((todo, index) => (
						<li className='todoBox' key={`${todo} - ${index}`}>
							<p className='dueDate'>Due: {todo.dueDate}</p>

							<p className='dueDate'>{todo.content}</p>
							<br />
							<span>
								<Link to={`/TodoList/${todo._id}`}>
									<button className='update'> ✎ </button>
								</Link>

								<button
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}>
									x
								</button>
								<button
									className='delete-icon'
									id={todo._id}
									onClick={completeTodo}>
									✓
								</button>
							</span>

						</li>
					))}
				</ul>
			</div>
			<div className='completed'>
				<h3>Completed</h3>
				<ul className='priorities'>
					{completed.map((todo, index) => (
						<li className='todoBox' key={`${todo} - ${index}`}>
							<p className='dueDate'>Due: {todo.dueDate}</p>

							<p className='dueDate'>{todo.content}</p>
							<br />
							<span>
								<Link to={`/TodoList/${todo._id}`}>
									<button className='update'> ✎ </button>
								</Link>

								<button
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}>
									x
								</button>
								<button
									className='delete-icon'
									id={todo._id}
									onClick={uncompleteTodo}>
									⏎
								</button>
							</span>

						</li>
					))}
				</ul>
			</div>
			<AddTodo setTodos={setTodos} handleAddTodo={handleAddTodo} />
		</div>
	);
};

export default TodoList;
