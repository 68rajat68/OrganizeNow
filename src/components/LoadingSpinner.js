import React from 'react';
import '../css/normal.css';

const LoadingSpinner = (probs) => {
    return (
        <div className="loading-spinner">
            <div className="spinner-icon"></div>
            <p>{probs.msg}</p>
        </div>
    );
};

export default LoadingSpinner;
