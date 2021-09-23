import { getDefaultNormalizer } from '@testing-library/react';
import { nanoid } from 'nanoid';
import {useState} from 'react';
import Note from '../Note/Note'
import AddNote from '../AddNote';
const Notes = () => {

    	 const [notes, setNotes] = useState([
					{
						id: nanoid(),
						text: 'note 1',
						date: '8/22/21',
					},
					{
						id: nanoid(),
						text: 'note 2',
						date: '8/22/21',
					},
					{
						id: nanoid(),
						text: 'note 3',
						date: '8/22/21',
					},
				]);
   
                const addNote = (text) =>
                {
                
                   const date = new Date(); 
                   const newNote = 
                   {
                       id: nanoid(), 
                        text: text, 
                        date: date.toLocaleDateString() 

                   }

                   const newNotes = [...notes, newNote]
                   setNotes(newNotes);

                }; 

    const deleteNote = (id) => {
			const newNotes = notes.filter((note) => note.id !== id);
            setNotes(newNotes); 
		};




    return (
        <div className = 'Container2'>
			<div className='notes-list'>
                {notes.map((note) => <Note id={note.id} text={note.text} date = {note.date}
                
                handleDeleteNote = {deleteNote}
                />)}
			
			</div>

      

            <AddNote handleAddNote={addNote}/>
        </div>
		);
};

export default Notes;