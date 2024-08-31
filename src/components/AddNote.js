import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import '../css/normal.css'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added Successfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
      {/* <i className="fa-solid fa-book mx-1" style={{ color: "#1020ff" }} ></i> */}
      <h2><center><i className="fa-solid fa-clipboard-list mx-1" style={{ color: "#1020ff" }}></i> iNotebook</center></h2>
      <h5>Add Note </h5>
      <form>
        <div className="form-group mb-2">
          <label htmlFor="title" className="form-label" >Title</label>
          <input type="text"  className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} />
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
