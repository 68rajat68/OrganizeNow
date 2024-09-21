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




import React, { useEffect, useState } from 'react';
import '../css/normal.css';  // Ensure spinner-specific styles are here

const LoadingSpinner = (probs) => {
    const [visible, setVisible] = useState(false);  // Control visibility

    useEffect(() => {
        if (probs.msg) {
            setVisible(true);  // Show spinner
            const timer = setTimeout(() => {
                setVisible(false);  // Hide spinner after 2 seconds
            }, 2000);
            return () => clearTimeout(timer);  // Clean up timer
        }
    }, [probs.msg]);

    return (
        <div style={{ height: '50px' }}>
            {probs.msg && (
                <div
                    style={{
                        position: 'fixed',
                        top: '70px',  // Just below the navbar
                        right: '20px',  // Align to the right side
                        zIndex: '1050',
                        width: '300px',  // Set fixed width
                        padding: '10px',
                        transition: 'transform 0.6s ease, opacity 0.6s ease',  // Smooth transition
                        transform: visible ? 'translateX(0)' : 'translateX(100%)',  // Slide in/out from right
                        opacity: visible ? 1 : 0,  // Fade out effect
                        backgroundColor: '#f9f9f9',  // Spinner background
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
