import React, { useContext, useState } from 'react';
import NoteContext from '../../context/notes/noteContext';
import './AddNote.css';  // Import the custom CSS file

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tags: '' });

  const addClick = (e) => {
    e.preventDefault();
    if (note.title && note.description && note.tags) {
      addNote(note.title, note.description, note.tags);
      setNote({ title: '', description: '', tags: '' });
      // props.showAlert("Added SuccessFully", "success");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <div className="form-container my-3">
        <h2>Add Note</h2>

        <form className="my-3">
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={5} required
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5} required
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={note.tags}
              onChange={onChange}
              minLength={5} required
            />
          </div>

          <button disabled={note.title<5 || note.description<5} type="submit" className="btn btn-dark" onClick={addClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
