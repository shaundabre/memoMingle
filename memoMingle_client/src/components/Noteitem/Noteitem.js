import React, { useContext } from "react";
import './Noteitem.css'; // Import the CSS file
import NoteContext from '../../context/notes/noteContext';

const Noteitem = (props) => {
  const { note1, updateNotes } = props;  
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col md-3 note-item">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note1.title}</h5>
          <p className="card-text">{note1.description}</p>
          <p className="card-text">{note1.tags}</p>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNotes(note1)}></i>
          <i className="fa-solid fa-trash mx-2" onClick={() => {
              deleteNote(note1._id);
              // props.showAlert("Note Deleted Successfully", "success");

            }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
