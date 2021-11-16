import React,{useContext} from "react";
import noteContext from '../context/notes/noteContext'
import Noteitem from "./Noteitem";

const Notes = () => {
    const context=useContext(noteContext);
  return (
    <div className="row my-3">
      <h1>Your notes</h1>
      {context.notes.map((note) => {
        return <Noteitem note={note}/>
      })}
    </div>
  );
};

export default Notes;
