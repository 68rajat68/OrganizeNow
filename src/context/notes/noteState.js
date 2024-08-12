import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
  const host = "https://i-notebook-teal.vercel.app"
    const notesInitial = [
        {
          "_id": "66aa990c63cff752732c2c66",
          "user": "66a84edce97fd21bbca3e54f",
          "title": "My Title_01",
          "description": "Please not Wake up early",
          "tag": "personal_01",
          "date": "2024-07-31T20:05:32.263Z",
          "__v": 0
        },
        {
          "_id": "66aa991863cff752732c2c680",
          "user": "66a84edce97fd21bbca3e54f",
          "title": "My Title_02",
          "description": "Please Wake up early",
          "tag": "personal_02",
          "date": "2024-07-31T20:05:44.820Z",
          "__v": 0
        },
        {
          "_id": "66aa991863cff752732c2c681",
          "user": "66a84edce97fd21bbca3e54f",
          "title": "My Title_03",
          "description": "Please Wake up early",
          "tag": "personal_03",
          "date": "2024-07-31T20:05:44.820Z",
          "__v": 0
        },
        {
          "_id": "66aa991863cff752732c2c682",
          "user": "66a84edce97fd21bbca3e54f",
          "title": "My Title_04",
          "description": "Please Wake up early",
          "tag": "personal_04",
          "date": "2024-07-31T20:05:44.820Z",
          "__v": 0
        },
        {
          "_id": "66aa991863cff752732c2c683",
          "user": "66a84edce97fd21bbca3e54f",
          "title": "My Title_05",
          "description": "Please Wake up early",
          "tag": "personal_05",
          "date": "2024-07-31T20:05:44.820Z",
          "__v": 0
        }
      ]
    const [notes,setNotes] = useState(notesInitial);
      //Get All Note
    const getNotes = async () => {
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type":"application/json"
        }
      });
      const json =await response.json();
      setNotes(json);
    }



      //Add Note
      const addNote = async (title , description , tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "auth-token":localStorage.getItem('token'),
            "Content-Type":"application/json"
          },
          body: JSON.stringify({title,description,tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
      }


      //Delete Note
      const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "auth-token":localStorage.getItem('token'),
            "Content-Type":"application/json"
          }
        });


        const newNotes  = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }
      //Edit Note
      const editNote = async (id, title, description,tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "auth-token":localStorage.getItem('token'),
            "Content-Type":"application/json"
          },
          body: JSON.stringify({title,description,tag}),
        });
        // const json =response.json();


        let newNotes = JSON.parse(JSON.stringify(notes))

        for(let index=0;index < notes.length ; index++){
          const element = notes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes);
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;