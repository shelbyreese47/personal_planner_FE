import { useState } from 'react';


const AddTodo = ({ handleAddTodo }) => {
	const [todoText, setTodoText] = useState('');

	const handleChange = (event) => {
		setTodoText(event.target.value);
	};

	const handleSaveClick = () => {
		if (todoText.trim().length > 0) {
			handleAddTodo(todoText);
			setTodoText('');
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
				<label>Due Date</label>
				<input></input>
				<label>User</label>
				<input></input>
				<label>To Do</label>
				<textarea
					rows='8'
					cols='10'
					placeholder='type to add a note '
					value={todoText}
					onChange={handleChange}></textarea>
				<select>
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
