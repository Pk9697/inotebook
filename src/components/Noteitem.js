import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const {note,updateNote}=props;
  const context = useContext(noteContext);

    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{context.deleteNote(note._id) ;props.showAlert("Deleted Successfully","success"); }}></i>
                    <i className="far fa-edit" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
