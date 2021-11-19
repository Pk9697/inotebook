import React,{useContext} from "react";
import noteContext from '../context/notes/noteContext'
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
    const context=useContext(noteContext);
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h1>Your notes</h1>
      {context.notes.map((note) => {
        return <Noteitem key={note._id} note={note}/>
      })}
    </div>
    </>
  );
};

export default Notes;
