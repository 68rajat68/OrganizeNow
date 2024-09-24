import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './Noteitem'
import { useNavigate } from 'react-router-dom';
import '../css/normal.css';

const Notes = (props) => {
  const { layoutNo , gridNo , setGridNo} = props;
  let history = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({ id: "66ab2c68abc8ad217009a11f", etitle: "", edescription: "", etag: "deafult" })
  const ref = useRef(null)
  const refClose = useRef(null)

  const [layout, setLayout] = useState('vertical');
  const [selectedNumber, setSelectedNumber] = useState(layoutNo || 1);

  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      history("/login");
    }
  }, [])

  

  const handleSelect = (e) => {
    setSelectedNumber(e.target.value);
    console.log(selectedNumber);
  };


  useEffect(() => {
    setGridNo(selectedNumber);
    console.log(" grid" + gridNo);
  }, [selectedNumber]);

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === 'vertical' ? 'horizontal' : 'vertical'));
  };



  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    // props.showAlert("Updated Successfully","success")
  }

  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    console.log("HandlClick is Called....");
    props.showAlert("Updated Successfully", "success")
    // addNote(note.title, note.description, note.tag);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
        <div className='row '>
          <div className='dropdown-container'>
            <h3 className='dropdown-heading'>Your Note</h3>
            {/* Dropdown Button on the Right */}
            <div className="dropdown-select-container">
              <select
                className="dropdown-select"
                value={selectedNumber}
                onChange={handleSelect}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="container mx-2 my-1" >{notes.length === 0 && 'No Notes To Display'}</div>
          {
            notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} gridNo={selectedNumber}/>;
            })
          }
        </div>


        {/* <button className="btn btn-primary my-2" onClick={toggleLayout}>
        Toggle Layout
      </button> */}

        {/* <div className={`container p-3 my-2 layout-${layout}`} style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
        <div className='row my-3'>
          <h3>Your Note</h3>
          <div className="container mx-2" >{notes.length === 0 && 'No Notes To Display'}</div>
          {
            notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
            })
          }
        </div>*/}
      </div>
    </>
  )
}

export default Notes;