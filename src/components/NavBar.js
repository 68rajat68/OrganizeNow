// import React, { useEffect, useRef, useState } from 'react'
// import { NavLink, useNavigate } from "react-router-dom";

// function NavBar() {
//     let history = useNavigate()
//     const [showModal, setShowModal] = useState(false);
//     const [userName, setUserName] = useState('');
//     const [token, setToken] = useState(localStorage.getItem('token') || '');
//     const iconRef = useRef(null);
//     const modalRef = useRef(null);


//     useEffect(() => {
//         const fetchUserData = async () => {
//             const authToken = localStorage.getItem('token');
//             if (authToken) {
//                 try {
//                     const response = await fetch('https://inotebook-backend-ixb2.onrender.com/api/auth/getuser', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'auth-token': authToken
//                         }
//                     });

//                     const data = await response.json();
//                     if (response.ok) {
//                         setUserName(data.name); // Store user's name in state
//                     } else {
//                         console.error('Failed to fetch user data:', data.error);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [token]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setToken('');
//         setUserName('');
//         if (showModal === true) setShowModal(false);
//         history('/login');
//     }

//     const userProfileFun = () => {
//         setShowModal(!showModal);
//     };

//     // const positionModal = () => {
//     //     if (iconRef.current && modalRef.current) {
//     //         const iconRect = iconRef.current.getBoundingClientRect();
//     //         modalRef.current.style.top = `${iconRect.bottom + window.scrollY}px`;
//     //         modalRef.current.style.right = `${iconRect.right - window.scrollX }px`;
//     //     }
//     // };
//     const positionModal = () => {
//         if (iconRef.current && modalRef.current) {
//             const iconRect = iconRef.current.getBoundingClientRect();
//             const modalWidth = modalRef.current.offsetWidth;

//             let leftPosition = iconRect.left + window.scrollX;

//             // Adjust position if modal goes out of screen
//             if (leftPosition + modalWidth > window.innerWidth) {
//                 leftPosition = window.innerWidth - modalWidth - 20; // Add a little padding from the edge
//             }

//             modalRef.current.style.top = `${iconRect.bottom + window.scrollY + 10}px`;
//             modalRef.current.style.left = `${leftPosition}px`;
//         }
//     };

//     useEffect(() => {
//         if (showModal) {
//             positionModal();
//         }
//     }, [showModal]);


//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken !== token) {
//             setToken(storedToken); // Update the token state
//         }
//     }, []);



//     return (
//         <div>
//             <nav className="navbar fixed-top navbar-expand-lg bg-dark bg-body-tertiary">
//                 <div className="container-fluid">
//                     <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/Schedulr">Schedulr</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
//                             </li>
//                         </ul>
//                         {
//                             !localStorage.getItem('token') ?

//                                 <form className='d-flex'>
//                                     <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
//                                     <NavLink className="btn btn-primary mx-1" to="/signup" role="button">SignUp</NavLink>
//                                 </form>
//                                 :
//                                 <>
//                                     <i
//                                         ref={iconRef}
//                                         className="fa-regular fa-circle-user mx-2"
//                                         style={{ fontSize: '24px', cursor: 'pointer' }}
//                                         onClick={userProfileFun}
//                                     ></i>
//                                     {showModal && (
//                                         <div
//                                             ref={modalRef}
//                                             className="modal-content"
//                                             style={{
//                                                 position: 'absolute',
//                                                 zIndex: 1000,
//                                                 width: '200px',
//                                                 padding: '5px',
//                                                 borderRadius: '5px',
//                                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                                                 backgroundColor: 'white',
//                                                 display: 'flex'
//                                             }}
//                                         >
//                                             <div className="modal-header">
//                                                 <div>
//                                                     <i className="fa-regular fa-circle-user mx-2" style={{ fontSize: '24px' }}></i><span>{userName}</span>
//                                                 </div>
//                                                 <button type="button" className="close" onClick={userProfileFun} style={{alignItems:'end', marginLeft:'30%' , justifyContent:'end'}}>
//                                                     <div>&times;</div>
//                                                 </button>
//                                             </div>
//                                             <div className="modal-body">
//                                                 {/* <div>
//                                                     <i className="fa-regular fa-circle-user mx-2" style={{ fontSize: '24px' }}></i>
//                                                 </div> */}

//                                                 <button onClick={handleLogout} className="btn btn-primary btn-block my-2">Logout</button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </>
//                         }

//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default NavBar




import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../css/Navbar.css';

function NavBar() {
    let history = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [menuOpen, setMenuOpen] = useState(false);
    const iconRef = useRef(null);
    const ref = useRef(null)
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const authToken = localStorage.getItem('token');
            if (authToken) {
                try {
                    const response = await fetch('https://inotebook-backend-ixb2.onrender.com/api/auth/getuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': authToken
                        }
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setUserName(data.name); // Store user's name in state
                        setUserEmail(data.email);
                    } else {
                        console.error('Failed to fetch user data:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserName('');
        if (showModal === true) setShowModal(false);
        history('/login');
    };

    const userProfileFun = () => {
        // if (!showModal) ref.current.click();
        setShowModal(!showModal);
        console.log(showModal);
    };

    const positionModal = () => {
        if (iconRef.current && modalRef.current) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const modalWidth = modalRef.current.offsetWidth;

            let leftPosition = iconRect.left + window.scrollX;

            if (leftPosition + modalWidth > window.innerWidth) {
                leftPosition = window.innerWidth - modalWidth - 20;
            }

            modalRef.current.style.top = `${iconRect.bottom + window.scrollY + 10}px`;
            modalRef.current.style.left = `${leftPosition}px`;
        }
    };

    useEffect(() => {
        if (showModal) {
            positionModal();
        }
    }, [showModal]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken !== token) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg">
                <div className="container-fluid">

                    {/* <FontAwesomeIcon icon="fa-solid fa-book" style={{color: "#ebedff",}} /> */}
                    <NavLink className="navbar-brand" to="/"><i className="fa-solid fa-book mx-1" style={{ color: "#ebedff", }} ></i><span style={{ color: 'white' }}>iNotebook</span></NavLink>
                    <div className="profile_mobile">
                        {localStorage.getItem('token') && (
                            <>
                                <i

                                    className="fa-regular fa-circle-user mx-1"
                                    style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }}
                                    onClick={userProfileFun}
                                ></i>
                            </>
                        )}
                    </div>

                    <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                        <span className="close-btn" onClick={() => setMenuOpen(false)}>&times;</span>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/Schedulr">Schedulr</NavLink>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        {!localStorage.getItem('token') && (
                            <>
                                <NavLink className="btn btn-primary mx-2 my-2" to="/login">Login</NavLink>
                                <NavLink className="btn btn-primary mx-2 my-2" to="/signup">SignUp</NavLink>
                            </>
                        )}
                    </div>
                    <div className={`collapse navbar-collapse ${menuOpen ? 'd-none' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/Schedulr">Schedulr</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
                            </li>
                        </ul>
                        {
                            !localStorage.getItem('token') ?
                                <form className='d-flex'>
                                    <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
                                    <NavLink className="btn btn-primary mx-1" to="/signup" role="button">SignUp</NavLink>
                                </form>
                                :
                                <>
                                    <i
                                        ref={iconRef}
                                        className="fa-regular fa-circle-user mx-1"
                                        style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }}
                                        onClick={userProfileFun}
                                    ></i>

                                </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
