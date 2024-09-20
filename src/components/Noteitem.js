import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import '../css/normal.css'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        // <div className='col-md-3'>
        //     {/* {note.title}    
        //     {note.description} */}
        //     <div className="card my-3">
        //         {/* <img src="..." className="card-img-top" alt="..."> */}
        //         <div className="card-body">
        //             <div className='d-flex align-item-center'>
        //                 <h5 className="card-title">{note.title}</h5>
        //                 <i className="fa-regular fa-trash-can mx-2" onClick={ () => {deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
        //                 <i className="fa-regular fa-pen-to-square mx-2" onClick={ () => {updateNote(note)}}></i>
        //             </div>
        //             <p className="card-text">{note.description}</p>
        //         </div>
        //     </div>
        // </div>

        // <div className='col-md-3'>
        //     <div className="card my-3">
        //         <div className="card-body">
        //             <div className='d-flex align-items-center justify-content-between'>
        //                 <h5 className="card-title">{note.title}</h5>
        //                 <div className='d-flex align-items-center'>
        //                     <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
        //                     <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
        //                 </div>
        //             </div>
        //             <p className="card-text">{note.description}</p>
        //         </div>
        //     </div>
        // </div>

        <div className='col-md-3'>
            <div className="card my-3 position-relative">
                <span className="badge badge_01 badge-dark ">{note.tag}</span>
                <span className="badge badge_02 badge-dark "><i className="fa-regular fa-trash-can mx-1 circle_back" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                <i className="fa-regular fa-pen-to-square mx-1 circle_back" onClick={() => { updateNote(note) }}></i></span>
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        {/* <div className='d-flex align-items-center'>
                            <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div> */}
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
