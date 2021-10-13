import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateTodo = ({ setCount, count, setTodos, todo }) => {
	let initialState = {
		date: '',
		dueDate: '',
		user: '',
		content: '',
		priority: '',
		completed: false,
	};
	
	
	
	const { id } = useParams();
	const history = useHistory();
	
	
	const [todoText, setTodoText] = useState(initialState);
	
	const handleAddTodo = (todo) => {
		setCount(!count);
	};

	useEffect(() => {
		axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos/${id}`)
			.then((response) => {
				setTodoText(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
		//eslint-disable-next-line
	}, []);

	const handleChange = (event) => {
		// setTodoText(event.target.value);
		setTodoText({ ...todoText, [event.target.id]: event.target.value });
	};

	const handleSaveClick = () => {
		let arrPrior = ['Very High', 'High', 'Medium', 'Low'];
		if (arrPrior.includes(todoText.priority)) {
			handleAddTodo(todoText);
	
			axios.put(`https://safe-springs-78643.herokuapp.com/api/todos/${id}`, {
				date: new Date().toLocaleDateString(),
				dueDate: todoText.dueDate,
				user: todoText.user,
				content: todoText.content,
				priority: todoText.priority,
				completed: todoText.completed,
			})
		

		.then(setTodoText(initialState))
		.then(axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
			})
			.catch((err) => {
				
			}))

		.then(history.push('/TodoList')) 

	}};
	return (
		<div className='todoNew updateTodoForm todoFormCSS'>
			<form className="addTodo">
				<label className='c11' id='date'>
					Today's Date: {new Date().toLocaleDateString()}
				</label>
				<br />
				<label className='c12'>Due Date</label>
				<input
					id='dueDate'
					value={todoText.dueDate}
					onChange={handleChange}
					className='c22'></input>
				<br />
				<label className='c13'>To Do</label>
				<input
					id='content'
					placeholder='type to edit a todo'
					value={todoText.content}
					onChange={handleChange}
					className='c23'></input>
				<br />
				<label className='c14'>Priority</label>
				<select
					className='c24'
					required
					id='priority'
					value={todoText.priority}
					onChange={handleChange}>
					<option value='Click here to select priority'>
						Click here to select priority
					</option>
					<option value='Very High'>Very High Priority</option>
					<option value='High'>High Priority</option>
					<option value='Medium'>Medium Priority</option>
					<option value='Low'>Low Priority</option>
				</select>
					<button className='c15' onClick={handleSaveClick}>
						☑︎
					</button>
			</form>
		</div>
	);
};

export default UpdateTodo;
