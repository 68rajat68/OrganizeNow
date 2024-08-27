import React, { useState } from 'react';
import '../css/Schedulr.css';

const Schedulr = () => {
    const [rows, setRows] = useState([{ time_slot: 'Time Slot', work_to_do: 'Work to Do', status: Array(10).fill(false) }]);
    const [isEditable, setIsEditable] = useState(false);
    const [columnHeaders, setColumnHeaders] = useState(Array.from({ length: 10 }, (_, i) => (i + 1).toString().padStart(2, '0')));
    const [tempRows, setTempRows] = useState([]);
  
    const addRow = () => {
      const newRow = { time_slot: '', work_to_do: '', status: Array(10).fill(false) };
      setRows([...rows, newRow]);
      setTempRows([...tempRows, newRow]);
    };
  
    const removeRow = () => {
      if (rows.length > 1) {
        setRows(rows.slice(0, -1));
      }
    };
  
    const toggleEdit = () => {
      if (isEditable) {
        setTempRows(rows); // Save the edited values
      } else {
        setTempRows([...rows]); // Backup current values before editing
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
      newHeaders[index] = newValue.toString().padStart(2, '0'); // Pad with leading zero if necessary
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
        } else {
          console.error('Failed to save timetable');
        }
      } catch (error) {
        console.error('Error saving timetable:', error);
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
            { time_slot: '08:00 AM - 09:00 AM', work_to_do: '', status: Array(10).fill(false) }
          ]);
          setColumnHeaders(['Time Slot', 'Work to Do', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
    
        // If an error occurs, set default values
        setRows([
          { time_slot: '08:00 AM - 09:00 AM', work_to_do: '', status: Array(10).fill(false) }
        ]);
        setColumnHeaders(['Time Slot', 'Work to Do', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']);
      }
    };
    
    useEffect(() => {
      fetchTimetable();
    }, []);
    
    
    
  
    return (
      <div className="schedulr-container">
        <table className="schedulr-table">
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>Work to Do</th>
              {columnHeaders.map((header, i) => (
                <th key={i}>
                  {isEditable ? (
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={header}
                      onChange={(e) => handleHeaderChange(i, e.target.value)}
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
        <button onClick={toggleEdit} className="edit-btn">
          {isEditable ? 'Save' : 'Edit'}
        </button>
        <button onClick={addRow} className="add-row-btn">Add Row</button>
        <button onClick={removeRow} className="remove-row-btn">Remove Row</button>
        
      </div>
    );
  };
  
  export default Schedulr;