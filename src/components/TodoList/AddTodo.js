import { useState } from 'react';
import axios  from 'axios';
import { render } from 'react-dom';


// const axios = require('axios').default;
const AddTodo = ({ handleAddTodo, setTodos }) => {
	let initialState = {
		date: '',
		dueDate: '',
		user: '',
		content: '',
		priority: '',
		completed: false,
	};

	const [todoText, setTodoText] = useState(initialState);




	const handleChange = (event) => {
		// setTodoText(event.target.value);
		setTodoText({ ...todoText, [event.target.id]: event.target.value });
	};


	const handleSaveClick = () => {

       let arrPrior = ['Very High','High','Medium','Low']
	   if(arrPrior.includes(todoText.priority))
      {

		// if (todoText.length > 0) {
			handleAddTodo(todoText);
		// 	setTodoText(initialState);
		console.log(todoText);
		axios.post(`https://safe-springs-78643.herokuapp.com/api/todos`, {
			date: new Date().toLocaleDateString(),
			dueDate: todoText.dueDate,
			user: todoText.user,
			content: todoText.content,
			priority: todoText.priority,
			completed: todoText.completed,
		});
	  }
		setTodoText(initialState);
		axios.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
		.then(response => { 
			setTodos(response.data)
		}).catch((err) => {
			console.log(err)
		})
		// submitForm();
		
}




	return (


		<div className='note new'>
			<form className= "addTodo">
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
				<select required id='priority' value={todoText.priority} onChange={handleChange}>
					<option value="Click here to select priority" >Click here to select priority</option>
					<option value='Very High'>Very High Priority</option>
					<option value='High'>High Priority</option>
					<option value='Medium'>Medium Priority</option>
					<option value='Low'>Low Priority</option>
				</select>
				{/* <span className= "">completed: false</span> */}
			</form>
			<div className='note-footer'>
				<button onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddTodo;
