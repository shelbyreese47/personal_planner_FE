import { useState } from 'react';
import axios  from 'axios';

const AddTodo = ({ handleAddTodo, setTodos, count, setCount }) => {
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
		setTodoText({ ...todoText, [event.target.id]: event.target.value });
	};


	const handleSaveClick = (event) => {
		event.preventDefault();
       let arrPrior = ['Very High','High','Medium','Low']
	   if(arrPrior.includes(todoText.priority))
      {
		handleAddTodo(todoText);
	
		axios.post(`https://safe-springs-78643.herokuapp.com/api/todos`, {
			date: new Date().toLocaleDateString(),
			dueDate: todoText.dueDate,
			// user: todoText.user,
			content: todoText.content,
			priority: todoText.priority,
			completed: todoText.completed,
		})
		.then(setTodoText(initialState))
		.then(axios.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
		.then(response => { 
			setTodos(response.data)
		}).catch((err) => {
			console.log(err)
		}))

	}
		
}

	return (
		<div className='todoNew todoFormCSS'>
			<form className='addTodo' onSubmit ={handleSaveClick}>
				<label className="c11"id='date'>Today's Date: {new Date().toLocaleDateString()}</label> <br/>
				<label className="c12">Due Date</label>
				<input
					className="c22"
					id='dueDate'
					placeholder="type to add due date"
					value={todoText.dueDate}
					onChange={handleChange}></input>
				<br/>
				<label className="c13">To Do</label>
				<input
				className="c23"
					id='content'
					placeholder='type to add a new todo'
					value={todoText.content}
					onChange={handleChange}></input>
					<br/>
				<label className="c14">Priority</label>
				<select
					className="c24"
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
				</div>
				<button className="c15" type='submit'>☑︎</button>
			</form>
				
		</div>
	);
};

export default AddTodo;
