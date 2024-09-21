

// import React from 'react'
// import LoadingSpinner from './LoadingSpinner';

// export default function Alert(probs) {

//     const capitalize=(word)=>{
//         if(word === 'danger') word="error";
//         const lower=word.toLowerCase();
//         return word.charAt(0).toUpperCase() + lower.slice(1);
//     }

//   return (
//     <div style={{ height: '50px', marginTop: '65px' }}>
//       {probs.loading === true ? (
//         <LoadingSpinner msg={probs.msg} />
//       ) : (
//         probs.alert && (
//           <div
//             style={{ 
//               height: '50px', 
//               paddingTop: '10px',
//               whiteSpace: 'nowrap', // Prevent wrapping
//               overflow: 'hidden', // Hide overflow
//               textOverflow: 'ellipsis', // Show ellipsis for long text
//               maxWidth: '100%', // Ensure it doesn't exceed screen width
//             }}
//             className={`alert alert-${probs.alert.type} alert-dismissible fade show`}
//             role="alert"
//           >
//             <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
//           </div>
//         )
//       )}
//     </div>
//   );
// }





// import React, { useEffect, useRef } from 'react';
// import LoadingSpinner from './LoadingSpinner';

// export default function Alert(probs) {
//     const alertRef = useRef(null);  // Create a reference to the alert

//     const capitalize = (word) => {
//         if (word === 'danger') word = "error";
//         const lower = word.toLowerCase();
//         return word.charAt(0).toUpperCase() + lower.slice(1);
//     };

//     // Use useEffect to scroll to the alert when it's shown and remove it after 2 seconds
//     useEffect(() => {
//         if (probs.alert && alertRef.current) {
//             alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

//             // Automatically remove the alert after 2 seconds
//             const timer = setTimeout(() => {
//                 probs.setAlert(null);  // Call a function to remove the alert
//             }, 2000);

//             // Cleanup timer on unmount or if alert changes
//             return () => clearTimeout(timer);
//         }
//     }, [probs.alert]);  // Trigger effect whenever probs.alert changes

//     return (
//         <div style={{ height: '50px' }}>
//             {probs.loading === true ? (
//                 <LoadingSpinner msg={probs.msg} />
//             ) : (
//                 probs.alert && (
//                     <div
//                         ref={alertRef}  // Attach the reference to this element
//                         style={{
//                             position: 'fixed',  // Fix the alert's position
//                             top: '70px',        // Just below the navbar
//                             right: '20px',      // Align to the right side of the page
//                             zIndex: '1050',     // Ensure it's above other elements
//                             width: '300px',     // Set a fixed width
//                             padding: '10px',
//                             whiteSpace: 'nowrap',  // Prevent wrapping
//                             overflow: 'hidden',   // Hide overflow
//                             textOverflow: 'ellipsis',  // Show ellipsis for long text
//                             maxWidth: '100%',  // Ensure it doesn't exceed screen width
//                         }}
//                         className={`alert alert-${probs.alert.type} alert-dismissible fade show`}
//                         role="alert"
//                     >
//                         <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
//                     </div>
//                 )
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function Alert(probs) {
    const [visible, setVisible] = useState(false); // Control visibility
    const [render, setRender] = useState(false);  // Keep component rendered for animations

    const capitalize = (word) => {
        if (word === 'danger') word = "error";
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    };

    // Show the alert with animation, stay visible for 2 seconds, and then remove it
    useEffect(() => {
        if (probs.alert && probs.alert.type && probs.alert.msg) {
            setRender(true);  // Render the alert
            setVisible(true);  // Make the alert visible
            const hideTimer = setTimeout(() => {
                setVisible(false);  // Hide after 2 seconds
            }, 1500);  // Duration the alert stays visible
            const removeTimer = setTimeout(() => {
                setRender(false);  // Remove from DOM after the animation completes
            }, 2500);  // Delay unmounting by 600ms for the slide-out animation
            return () => {
                clearTimeout(hideTimer);
                clearTimeout(removeTimer);
            };
        }
    }, [probs.alert]);

    return (
        <div style={{ height: '50px' }}>
            {probs.loading === true ? (
                <LoadingSpinner msg={probs.msg} />
            ) : (
                render && probs.alert && probs.alert.type && probs.alert.msg && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '70px', // Just below the navbar
                            right: '20px', // Align to the right side
                            zIndex: '1050',
                            width: '300px', // Set fixed width for the alert
                            padding: '10px',
                            transition: 'transform 0.6s ease, opacity 0.6s ease', // Smooth transition
                            transform: visible ? 'translateX(0)' : 'translateX(100%)', // Slide in/out from right
                            opacity: visible ? 1 : 0, // Fade in/out effect
                            backgroundColor: probs.alert.type === 'error' ? 'red' : 'blue', // Customize based on alert type
                            color: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                        className={`alert alert-${probs.alert.type} alert-dismissible fade show`}
                        role="alert"
                    >
                        <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
                    </div>
                )
            )}
        </div>
    );
}





// import React, { useEffect, useRef } from 'react';
// import LoadingSpinner from './LoadingSpinner';

// export default function Alert(probs) {
//     const alertRef = useRef(null);  // Create a reference to the alert

//     const capitalize = (word) => {
//         if (word === 'danger') word = "error";
//         const lower = word.toLowerCase();
//         return word.charAt(0).toUpperCase() + lower.slice(1);
//     };

//     // Use useEffect to scroll to the alert when it's shown
//     useEffect(() => {
//         if (probs.alert && alertRef.current) {
//             // Scroll the page to the alert's position
//             alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//     }, [probs.alert]);  // Trigger effect whenever probs.alert changes

//     return (
//         <div style={{ height: '50px', marginTop: '65px' }}>
//             {probs.loading === true ? (
//                 <LoadingSpinner msg={probs.msg} />
//             ) : (
//                 probs.alert && (
//                     <div
//                         ref={alertRef}  // Attach the reference to this element
//                         style={{
//                             height: '50px',
//                             paddingTop: '10px',
//                             whiteSpace: 'nowrap', // Prevent wrapping
//                             overflow: 'hidden',   // Hide overflow
//                             textOverflow: 'ellipsis',  // Show ellipsis for long text
//                             maxWidth: '100%',  // Ensure it doesn't exceed screen width
//                         }}
//                         className={`alert alert-${probs.alert.type} alert-dismissible fade show`}
//                         role="alert"
//                     >
//                         <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
//                     </div>
//                 )
//             )}
//         </div>
//     );
// }
  