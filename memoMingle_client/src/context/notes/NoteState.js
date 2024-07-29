import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes
  const getNotes = async () => {
    try {
      //API CALL
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Add a note
  const addNote = async (title, description, tags) => {
    try {
      //API CALL
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tags })
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // Edit a note
  const editNote = async (id, title, description, tags) => {
    try {
      //API CALL
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tags })
      });
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      // logic to edit client side
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tags=tags;
          break;
        }
        
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  }

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Failed to delete note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;
