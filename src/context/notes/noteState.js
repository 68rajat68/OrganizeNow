import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "https://inotebook-backend-ixb2.onrender.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const [loading, setLoading] = useState(false);
  //Get All Note
  const getNotes = async () => {
    setLoading(true);
    //API call
    // const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    //   method: "GET",
    //   headers: {
    //     "auth-token": localStorage.getItem('token'),
    //     "Content-Type": "application/json"
    //   }
    // });
    // const json = await response.json();
    // setNotes(json);

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false); // End loading
    }
  }



  //Add Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, tag }),
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
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    });


    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json =response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes , loading  }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;