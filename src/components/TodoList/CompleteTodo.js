import { useState, useEffect } from 'react';
import axios from 'axios';
// import { render } from 'react-dom';
import { useParams, useHistory } from 'react-router-dom';
import TodoList from './TodoList';

// const axios = require('axios').default;
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
	console.log(id);

	const [todoText, setTodoText] = useState(initialState);

	const handleAddTodo = (todo) => {
		setCount([...count, '']);
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
	}, []);

	const handleChange = (event) => {
		// setTodoText(event.target.value);
		setTodoText({ ...todoText, [event.target.id]: event.target.value });
	};

	const handleSaveClick = () => {
		axios.put(`https://safe-springs-78643.herokuapp.com/api/todos/${id}`, {
			completed: true,
		});

		setTodoText(initialState);
		axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
			})
			.catch((err) => {
				console.log(err);
			});

		// submitForm();
		history.goBack();
	};

	//  axios.get('http://localhost:3000/gifs').then(response => {
	// gets the initial data
	//   addPictures(response.data)
	// })

	return (
		// "_id": "615f15dec218e49e354c5365",
		// "date": "10/6/2021",
		// "dueDate": "11/1/2021",
		// "user": "Pusheen",
		// "content": "It's a me, Pusheen!",
		// "priority": "High",
		// "completed": false,
		// "__v": 0

		// <div className='note new'>
			<div className='todoNew'>
			<form>
				<label>Today's Date:</label>
				<p id='date'>{new Date().toLocaleDateString()}</p>
				<label>Due Date</label>
				<input
					id='dueDate'
					value={todoText.dueDate}
					onChange={handleChange}></input>
				<label>User</label>
				<input id='user' value={todoText.user} onChange={handleChange}></input>
				<label>To Do</label>
				<textarea
					id='content'
					rows='8'
					cols='10'
					placeholder='type to add a note'
					value={todoText.content}
					onChange={handleChange}></textarea>
				<label>Priority</label>
				<select
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
				{/* <span className= "">completed: false</span> */}
			</form>
			<div className='note-footer'>
				<button onClick={handleSaveClick}>Save</button>
			</div>
		</div>
	);
};

export default UpdateTodo;
