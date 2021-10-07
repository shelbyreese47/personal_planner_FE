import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    // let high;
    
    let url= `http://localhost:8000/api/todos`;
    
      const addTodo = (text) => {
                const date = new Date(); 
				const newTodo = {
					text: text,
					date: date.toLocaleDateString(),
				};

				const newTodos = [...todos, newTodo];
				setTodos(newTodos);
			}; 

    useEffect(() => {
			fetch(url)
				.then((res) => res.json())
				.then((json) => {
					setTodos(json);
					// high = todos.filter((todo) => todo.priority === 'High');
					// console.log(high);
				})
				.catch((err) => console.log(err));

			//eslint-disable-next-line
		}, [])
       let veryHighP = todos.filter((todo) => todo.priority === 'Very High' && todo.completed === false);
       let highP = todos.filter((todo) => todo.priority === 'High' && todo.completed === false);
       let mediumP = todos.filter((todo) => todo.priority === 'Medium' && todo.completed === false);
       let lowP = todos.filter((todo) => todo.priority === 'Low' && todo.completed === false);
       let completed = todos.filter((todo) => todo.completed === true);
				// console.log(highP);
                // console.log(highP[0].content)
    return (
			<div>
				<h3>Very High Priority</h3>
				<ul>
					{veryHighP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>{todo.content}</li>
					))}
				</ul>
				<h3>High Priority</h3>
				<ul>
					{highP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>{todo.content}</li>
					))}
				</ul>
				<h3>Medium Priority</h3>
				<ul>
					{mediumP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>{todo.content}</li>
					))}
				</ul>
				<h3>Low Priority</h3>
				<ul>
					{lowP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>{todo.content}</li>
					))}
				</ul>
				<h3>Completed</h3>
				<ul>
					{completed.map((todo, index) => (
						<li key={`${todo} - ${index}`}>{todo.content}</li>
					))}
				</ul>
                <AddTodo addTodo = {addTodo} />
			</div>
		);
};

export default TodoList;