import React,{useContext,useEffect, useRef,useState} from "react";
import noteContext from '../context/notes/noteContext'
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
    const context=useContext(noteContext);
    let navigate=useNavigate();
    //cdm-component did mount method using useEffect
    useEffect(() => {
      if(localStorage.getItem('token')){
        context.getNotes()
        console.log(localStorage.getItem('token'));
      }else{
        navigate('/login');
      }
      // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote=(currentNote)=>{
      // console.log(currentNote);
      ref.current.click()
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }

    const handleClick=(e)=>{
      console.log("Updating note",note);
        e.preventDefault();
        context.editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click()
      props.showAlert("Updated Successfully","success");

        // context.addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>

    {/* modal for editing note */}
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

   
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
             <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      value={note.etitle}
                      minLength={3}
                      required
                    />
                    
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      value={note.edescription}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                  
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>


    <div className="row my-3">
      <h1>Your notes</h1>
      {context.notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
      })}
    </div>
    </>
  );
};

export default Notes;
