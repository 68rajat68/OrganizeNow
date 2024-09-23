// import React from 'react';
// import '../css/normal.css';

// const LoadingSpinner = (probs) => {
//     return (
//         <div className="loading-spinner">
//             <div className="spinner-icon"></div>
//             <p>{probs.msg}</p>
//         </div>
//     );
// };

// export default LoadingSpinner;




import React from 'react';
import '../css/normal.css';  // Ensure spinner-specific styles are here

const LoadingSpinner = (probs) => {
    return (
        <div style={{ height: '40px' }}>
            {probs.msg && (
                <div
                    style={{
                        position: 'fixed',
                        top: '72px',  // Just below the navbar
                        right: '10px',  // Align to the right side
                        zIndex: '1050',
                        width: '300px',  // Set fixed width
                        padding: '10px',
                        transition: 'transform 0.6s ease, opacity 0.6s ease',  // Smooth transition
                        transform: 'translateX(0)',  // Slide in/out from right
                        opacity: 1,  // Fade out effect
                        // backgroundColor: '#f9f9f9',  // Spinner background
                        backgroundColor: 'rgba(10,10,230,1)',
                        color : 'white',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="loading-spinner"
                >
                    <div className="spinner-icon" style={{ marginRight: '10px' }}></div>  {/* Customize spinner icon */}
                    <p>{probs.msg}</p>
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner;
