import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const state={
        "name":"Pk",
        "class":"codewithharry"
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
