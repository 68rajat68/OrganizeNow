// import Notes from './Notes';
// import AddNote from './AddNote';

// const Home = (props) => {
//   const {showAlert} = props;
//   return (
//     <div>
//       <AddNote showAlert={props.showAlert} />
//       <Notes showAlert={showAlert}/>
//     </div>
//   )
// }

// export default Home




import React, { useState } from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {
  const { showAlert , layout } = props;

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: layout===1 ? 'column' : 'row',
        gap: '20px' // Adds some space between AddNote and Notes when in horizontal layout
      }}>
        <div style={{margin:layout===0 ? 'auto':'0px' , flex: layout===1 ? 'none' : 1 }}> {/* Adjust width in horizontal */}
          <AddNote showAlert={props.showAlert} layoutNo={layout} />
        </div>
        <div style={{  flex: layout===1 ? 'none' : 1 }}> {/* Adjust width in horizontal */}
          <Notes showAlert={showAlert} layoutNo={layout} />
        </div>
      </div>
    </div>
  );
}

export default Home;
