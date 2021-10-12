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
		// const date = new Date();
		// const newTodo = {
		// 	text: text,
		// 	date: date.toLocaleDateString(),
		// };
	
		// const newTodos = [...todos, newTodo];
		// setTodos(...todo);
		// setCount( count ? 0 : 1)
		setCount(!count);
		// count++;
	
		// setTodos([...todos, todo]);
		//console.log(y);
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
		let arrPrior = ['Very High', 'High', 'Medium', 'Low'];
		if (arrPrior.includes(todoText.priority)) {
			// if (todoText.length > 0) {
			handleAddTodo(todoText);
			
			// 	setTodoText(initialState);
			console.log(todoText);
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
				console.log(err);
			}))

		// submitForm();
		.then(history.push('/TodoList')) 
		// <TodoList />
		// <Link className="TodoList" to='/TodoList'>Todo List </Link>



	}};

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

		<div className='note new'>
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
			<div className='note-footer'>
				{/* <span className= "">completed: false</span> */}
				<button onClick={handleSaveClick}>Save</button>
			</div>
			</form>
		</div>
	);
};

export default UpdateTodo;
