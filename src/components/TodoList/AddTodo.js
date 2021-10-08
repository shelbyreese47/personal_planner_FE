import { useState } from 'react';


const AddTodo = ({ handleAddTodo }) => {

let initialState = {
		date:"",
		dueDate: "",
		user: "",
		content: "",
		priority: "",
		completed: false
}

			const [todoText, setTodoText] = useState(initialState);


	const handleChange = (event) => {
			
			//setTodoText(event.target.value);
			setTodoText({ ...todoText, [event.target.id]: event.target.value });
	};

	const handleSaveClick = () => {
		if (todoText.trim().length > 0) {
			handleAddTodo(todoText);
			setTodoText(initialState);
		}
        // axios.post(`http://localhost:8000/api/todos`, {
        //     date: Date,
		//     dueDate: todoText.dueDate,
		//     user: todoText.user,
		//     content: todoText.content,
		//     priority: todoText.priority
        // }
	};

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
				<p id='date'>
					{new Date().toLocaleDateString()}
				</p>
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
				<select id='priority' onChange={handleChange}>
					<option value='Very High'>Very High Priority</option>
					<option value='High'>High Priority</option>
					<option value='Medium'>Medium Priority</option>
					<option value='Low'>Low Priority</option>
				</select>
			</form>
			<div className='note-footer'>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddTodo;
