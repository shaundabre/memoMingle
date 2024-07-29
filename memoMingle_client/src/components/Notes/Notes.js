import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../../context/notes/noteContext";
import Noteitem from "../Noteitem/Noteitem";
import AddNote from "../AddNote/AddNote";
import './Notes.css';  // Make sure to import your custom CSS file
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    if (token) {
      getNotes();
    } else {
      console.log("No token found, redirecting to login...");
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" });

  const updateNotes = (currNote) => {
    ref.current.click();
    setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etags: currNote.tags });
  };

  const updateClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etags);
    refClose.current.click();
    // props.showAlert("Notes Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="title">Change Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="description">Change Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="tag">Change Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={updateClick} type="button" className="btn btn-dark">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container my-3">
          {notes.length === 0 && 'No Notes to display'}
          {notes.map((note1) => {
            return (
              <Noteitem
                key={note1._id}
                updateNotes={updateNotes}
                note1={note1}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
