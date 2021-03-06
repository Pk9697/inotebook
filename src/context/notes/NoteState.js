import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    // const state={
    //     "name":"Pk",
    //     "class":"codewithharry"
    // }
    const host="http://localhost:5000"
    const notesInitial=[];
    const [notes, setNotes] = useState(notesInitial)

      //Fetch all notes
      const getNotes=async ()=>{
        //*API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        const json= await response.json(); 
        console.log(json);
        setNotes(json);
      }


      //Add a note
      const addNote=async (title,description,tag)=>{
        //*API Call adding in backend
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const json= await response.json(); 
        console.log(json);
        //adding in frontend
        setNotes(notes.concat(json));
        // const note={
        //     "_id": "6193bc2796c2d407025701234",
        //   "user": "618f61963af98a4066e3cc2a",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2021-11-16T14:11:51.619Z",
        //   "__v": 0
        // }
        // setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote=async (id)=>{
        //*API Call deleting from backend
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        const json= await response.json(); 
        console.log(json);
        console.log("Delete Note with id "+id);
        //deleting from front end
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }
      //Edit a note
      const editNote=async (id,title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const json=await response.json(); 
        console.log(json);
        //Logic to edit in client
        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
            break;
          }
          
        }
        setNotes(newNotes);

      } 

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
