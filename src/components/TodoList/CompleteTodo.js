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

	return (
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
			</form>
			<div className='note-footer'>
				<button onClick={handleSaveClick}>Save</button>
			</div>
		</div>
	);
};

export default UpdateTodo;
