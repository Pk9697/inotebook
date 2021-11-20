import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    // const state={
    //     "name":"Pk",
    //     "class":"codewithharry"
    // }
    const notesInitial=[
        {
          "_id": "61910fd0abf480d4853391d5",
          "user": "618f61963af98a4066e3cc2a",
          "title": "My title2",
          "description": "Wake Up Early2",
          "tag": "Personal",
          "date": "2021-11-14T13:32:00.259Z",
          "__v": 0
        },
        {
          "_id": "6193bc2796c2d40702570123",
          "user": "618f61963af98a4066e3cc2a",
          "title": "new title",
          "description": "Wake Up Early2",
          "tag": "Personal",
          "date": "2021-11-16T14:11:51.619Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial)

      //Add a note
      const addNote=(title,description,tag)=>{
        //TODO:API Call
        const note={
            "_id": "6193bc2796c2d407025701234",
          "user": "618f61963af98a4066e3cc2a",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-11-16T14:11:51.619Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote=(id)=>{
        //TODO:API Call
        console.log("Delete Note with id"+id);
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }
      //Edit a note

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
