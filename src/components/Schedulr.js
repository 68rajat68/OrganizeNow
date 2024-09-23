import React, { useState, useEffect } from 'react';
import '../css/Schedulr.css';
import { useNavigate } from 'react-router-dom';

const Schedulr = (props) => {
  const [rows, setRows] = useState([{ time_slot: 'Time Slot', work_to_do: 'Work to Do', status: Array(31).fill(false) }]);
  const [isEditable, setIsEditable] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState(['Time Slot', 'Work to Do', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))]);
  let history = useNavigate();

  const [showModal, setShowModal] = useState(false);


  const handleRemoveClick = (id) => {
    // setNoteIdToDelete(id);
    setShowModal(true);
};


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history("/login");
    }
  }, []);

  const addRow = () => {
    const newRow = { time_slot: '', work_to_do: '', status: Array(31).fill(false) };
    setRows([...rows, newRow]);
    props.showAlert("Added Row Successfully","success")
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
      props.showAlert("Row Removed Successfully","success");
      setShowModal(false);
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      saveTimetable(); // Save data when switching from edit mode to view mode
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleHeaderChange = (index, value) => {
    let newValue = parseInt(value, 10);

    if (newValue > 31) {
      newValue = 1;
    } else if (newValue < 1) {
      newValue = 31;
    }

    const newHeaders = [...columnHeaders];
    if (index >= 2) { // Only update dynamic columns
      newHeaders[index] = newValue.toString().padStart(2, '0');
    }
    setColumnHeaders(newHeaders);
  };

  const toggleStatus = (rowIndex, statusIndex) => {
    if (!isEditable) { // Only allow changing status when not in edit mode
      const newRows = [...rows];
      newRows[rowIndex].status[statusIndex] = !newRows[rowIndex].status[statusIndex];
      setRows(newRows);
    }
  };

  const saveTimetable = async () => {
    try {
      const response = await fetch('https://inotebook-backend-ixb2.onrender.com/api/timetable/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          rows,
          columnHeaders
        })
      });

      const result = await response.json();
      if (result.success) {
        console.log('Timetable saved successfully');
        props.showAlert("Saved Successfully","success")
      } else {
        console.error('Failed to save timetable');
        props.showAlert("Failed to save timetable","danger")
      }
    } catch (error) {
      console.error('Error saving timetable:', error);
      props.showAlert("Failed to save timetable","danger")
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await fetch('https://inotebook-backend-ixb2.onrender.com/api/timetable/fetch', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });

      const result = await response.json();
      if (result.success) {
        // If data exists, use it
        setRows(result.timetable.rows);
        setColumnHeaders(result.timetable.columnHeaders);
      } else {
        // If no data exists, set default values
        setRows([
          { time_slot: 'Time Slot', work_to_do: 'Work to Do', status: Array(31).fill(false) }
        ]);
        setColumnHeaders(['Time Slot', 'Work to Do', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))]);
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);

      // If an error occurs, set default values
      setRows([
        { time_slot: 'Time Slot', work_to_do: 'Work to Do', status: Array(31).fill(false) }
      ]);
      setColumnHeaders(['Time Slot', 'Work to Do', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))]);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  return (
    <div className="schedulr-container p-3" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
      <h2>
      {/* <i className="fa-solid fa-clock mx-1" style={{ color: "#1020ff" }}></i>
      <i className="fa-solid fa-tasks mx-1" style={{ color: "#1020ff" }}></i>
      <i className="fa-regular fa-check-square mx-1" style={{ color: "#1020ff" }}></i>
      <i className="fa-regular fa-list-alt mx-1" style={{ color: "#1020ff" }}></i>
      <i className="fa-solid fa-hourglass-half mx-1" style={{ color: "#1020ff" }}></i>
      <i className="fa-solid fa-bell mx-1" style={{ color: "#1020ff" }}></i> */}
      
      <center><i className="fa-solid fa-calendar-alt mx-2" style={{ color: "green" }}></i>Schedulr</center></h2>
      <div className="schedulr-columns py-2">
        <div className="schedulr-fixed-columns">
          <table className="schedulr-table">
            <thead>
              <tr>
                <th>{columnHeaders[0]}</th>
                <th>{columnHeaders[1]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    {isEditable ? (
                      <input
                        type="text"
                        value={row.time_slot}
                        onChange={(e) => handleInputChange(rowIndex, 'time_slot', e.target.value)}
                      />
                    ) : (
                      row.time_slot
                    )}
                  </td>
                  <td>
                    {isEditable ? (
                      <input
                        type="text"
                        value={row.work_to_do}
                        onChange={(e) => handleInputChange(rowIndex, 'work_to_do', e.target.value)}
                      />
                    ) : (
                      row.work_to_do
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="schedulr-scrollable-columns">
          <div className="schedulr-table-container">
            <table className="schedulr-table">
              <thead>
                <tr>
                  {columnHeaders.slice(2).map((header, i) => (
                    <th key={i + 2}>
                      {isEditable ? (
                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={header}
                          onChange={(e) => handleHeaderChange(i + 2, e.target.value)}
                        />
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.status.map((done, statusIndex) => (
                      <td
                        key={statusIndex}
                        onClick={() => toggleStatus(rowIndex, statusIndex)}
                        className={`status-icon ${isEditable ? 'disabled' : ''}`}
                      >
                        {done ? '✅' : '⬜'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="button-container ">
        <div className="left-buttons">
          <button onClick={toggleEdit} className="edit-btn">
            {isEditable ? 'Save' : 'Edit'}
          </button>
          <button onClick={addRow} className="add-row-btn">Add Row</button>
          <button onClick={handleRemoveClick} className="remove-row-btn">Remove Row</button>
        </div>
        <button onClick={saveTimetable} className="save-data-btn">Save Data</button>
      </div>
      {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Remove Row</h5>
                                {/* <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button> */}
                                <button
                                        type="button"
                                        className="close py-1 px-1"
                                        onClick={() => setShowModal(false)}
                                        aria-label="Close"
                                        // style={{
                                        //     marginLeft: 'auto', // Ensures the button is floated to the right
                                        //     fontSize: '1.5rem',
                                        // }}
                                        style={{
                                          marginTop : '-15px',
                                          marginLeft: 'auto', // Ensures the button is floated to the right
                                          fontSize: '1.8rem',
                                          background: 'black',
                                          color : 'white',
                                          height : ' 60px',
                                          width : '30px'
                                      }}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to remove the last added row?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                
                                <button type="button" className="btn btn-danger" onClick={removeRow}>Yes, Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>

  );
};

export default Schedulr;
