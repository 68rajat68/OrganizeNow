// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useNavigate } from "react-router-dom";
// import '../css/Navbar.css';

// function NavBar() {
//     let history = useNavigate();
//     const [showModal, setShowModal] = useState(false);
//     const [userName, setUserName] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [menuOpen, setMenuOpen] = useState('');
//     const [getUser, setGetUser] = useState(false);
//     const [token, setToken] = useState(localStorage.getItem('token') || '');
//     const iconRef = useRef(null);
//     const modalRef = useRef(null);
//     const menuRef = useRef(null);


//     const fetchUserData = async () => {
//         const authToken = localStorage.getItem('token');
//         if (authToken) {
//             try {
//                 const response = await fetch('https://inotebook-backend-ixb2.onrender.com/api/auth/getuser', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'auth-token': authToken
//                     }
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     setUserName(data.name);
//                     setUserEmail(data.email);
//                     if (userName !== '') setGetUser(true);
//                 } else {
//                     console.error('Failed to fetch user data:', data.error);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }

//         }
//     };


//     useEffect(() => {
//         if (showModal) {
//             positionModal();
//             document.addEventListener('click', handleClickOutside, true);
//         } else {
//             document.removeEventListener('click', handleClickOutside, true);
//         }
//     }, [showModal]);

//     // useEffect(() => {
//     //     if (menuOpen) {
//     //         document.addEventListener('click', handleClickOutsideMenu, true);
//     //     } else {
//     //         document.removeEventListener('click', handleClickOutsideMenu, true);
//     //     }
//     // }, [menuOpen]);


//     useEffect(() => {
//         if (showModal || menuOpen) {
//             document.addEventListener('click', handleClickOutside, true);
//         } else {
//             document.removeEventListener('click', handleClickOutside, true);
//         }
//     }, [showModal, menuOpen]);

//     const handleClickOutside = (event) => {
//         if (
//             modalRef.current &&
//             !modalRef.current.contains(event.target) &&
//             !iconRef.current.contains(event.target)
//         ) {
//             setShowModal(false);
//         }

//         if (
//             menuOpen &&
//             !event.target.closest('.navbar-toggler') &&
//             !event.target.closest('.mobile-menu')
//         ) {
//             setMenuOpen(false);
//         }
//     };


//     // const handleClickOutside = (event) => {
//     //     if (modalRef.current && !modalRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
//     //             setShowModal(false);
//     //         // setArrowDirection('down');
//     //     }
//     // };

//     const handleClickOutsideMenu = (event) => {
//         if (menuRef.current && !menuRef.current.contains(event.target)) {
//             setMenuOpen(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setToken('');
//         setUserName('');
//         if (showModal === true) setShowModal(false);
//         history('/login');
//         setGetUser(false);
//     };

//     // const userProfileFun = () => {
//     //     if (!getUser) fetchUserData();
//     //     setShowModal(!showModal);
//     // };

//     const userProfileFun = () => {
//         if (!getUser) fetchUserData();
//         setShowModal(!showModal);
//     };


//     const positionModal = () => {
//         if (iconRef.current && modalRef.current) {
//             const iconRect = iconRef.current.getBoundingClientRect();
//             const modalWidth = modalRef.current.offsetWidth;

//             let leftPosition = iconRect.left + (iconRect.width / 2) - (modalWidth / 2);

//             // Ensure the modal stays within the viewport
//             if (window.innerWidth < 768) {
//                 // For mobile view, center the modal and make it near-full width
//                 modalRef.current.style.width = '60%';
//                 leftPosition = (window.innerWidth - modalRef.current.offsetWidth);
//                 modalRef.current.style.top = `${iconRect.bottom + 60}px`;
//             } else {
//                 if (leftPosition < 10) {
//                     leftPosition = 10;
//                 } else if (leftPosition + modalWidth > window.innerWidth - 10) {
//                     leftPosition = window.innerWidth - modalWidth - 10;
//                 }
//                 modalRef.current.style.top = `${iconRect.bottom + 20}px`;
//             }

//             modalRef.current.style.position = 'fixed';

//             modalRef.current.style.left = `${leftPosition - 10}px`;
//         }
//     };

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken !== token) {
//             setToken(storedToken);
//         }
//     }, []);

//     return (
//         <div>
//             <nav className="navbar fixed-top navbar-expand-lg">
//                 <div className="container-fluid">
//                     <NavLink className="navbar-brand" to="/"><span style={{ color: 'white', fontWeight:'600' }}>
//                     <i className="fa-solid fa-boxes" style={{marginRight:'5px', color: "#E0FFFF" }}></i>
//                     OrganizeNow</span></NavLink>
//                     <div className="profile_mobile">
//                         {localStorage.getItem('token') && (
//                             <>
//                                 <i
//                                     ref={iconRef}
//                                     className="icon-container"
//                                     onClick={userProfileFun}
//                                 >
//                                     <i
//                                         className={`fa-regular fa-circle-user mx-1 ${showModal ? 'icon-open' : 'icon-closed'}`}
//                                         style={{ fontSize: '24px', color: 'white' }}
//                                     ></i>
//                                     <i
//                                         className={`fa ${showModal ? 'fa-chevron-up' : 'fa-chevron-down'} `}
//                                         style={{ fontSize: '12px', color: 'white', marginLeft: '3px' }}
//                                     ></i>
//                                 </i>

//                             </>
//                         )}
//                     </div>

//                     <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
//                         <span className="close-btn" onClick={() => setMenuOpen(false)}>&times;</span>
//                         {/* <NavLink className="nav-link" to="/">Home</NavLink>
//                         <NavLink className="nav-link" to="/Schedulr">Schedulr</NavLink>
//                         <NavLink className="nav-link" to="/about">About</NavLink> */}

//                         <NavLink className="nav-link" to="/" onClick={() => setMenuOpen(false)}>iNotebook</NavLink>
//                         <NavLink className="nav-link" to="/Schedulr" onClick={() => setMenuOpen(false)}>Schedulr</NavLink>
//                         <NavLink className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
//                         {!localStorage.getItem('token') && (
//                             <>
//                                 <NavLink className="btn btn-primary mx-2 my-2" to="/login">Login</NavLink>
//                                 <NavLink className="btn btn-primary mx-2 my-2" to="/signup">SignUp</NavLink>
//                             </>
//                         )}
//                     </div>
//                     <div className={`collapse navbar-collapse ${menuOpen ? 'd-none' : ''}`} id="navbarSupportedContent">
//                         <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/">iNotebook</NavLink>
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
//                                         style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                                         onClick={userProfileFun}
//                                     >
//                                         <i
//                                             className={`fa-regular fa-circle-user mx-1 ${showModal ? 'icon-open' : 'icon-closed'}`}
//                                             style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }}
//                                         ></i>
//                                         <i
//                                             className={`fa ${showModal ? 'fa-chevron-up' : 'fa-chevron-down'} `}
//                                             style={{ fontSize: '12px', color: 'white', marginLeft: '3px' }}
//                                         ></i></i>
//                                 </>
//                         }
//                     </div>
//                     {showModal && (
//                         <div className="profile-modal" ref={modalRef}>
//                             <div className="profile-details">
//                                 <h4><i className='fa-solid fa-user' /> User Profile</h4>
//                                 <hr />
//                                 <p><strong>Name:</strong> {userName}</p>
//                                 <p><strong>Email:</strong> {userEmail}</p>
//                                 <hr />
//                                 <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default NavBar;


























import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../css/Navbar.css';

function NavBar() {
    let history = useNavigate();
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [menuOpen, setMenuOpen] = useState('');
    const [getUser, setGetUser] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const iconRef1 = useRef(null);
    const iconRef2 = useRef(null);
    const modalRef1 = useRef(null);
    const modalRef2 = useRef(null);
    const menuRef = useRef(null);


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
                    setUserName(data.name);
                    setUserEmail(data.email);
                    if (userName !== '') setGetUser(true);
                } else {
                    console.error('Failed to fetch user data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

        }
    };


    // useEffect(() => {
    //     if (showModal1) {
    //         positionModal1();
    //         document.addEventListener('click', handleClickOutside, true);
    //     } else {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     }
    // }, [showModal1]);



    // useEffect(() => {
    //     if (menuOpen) {
    //         document.addEventListener('click', handleClickOutsideMenu, true);
    //     } else {
    //         document.removeEventListener('click', handleClickOutsideMenu, true);
    //     }
    // }, [menuOpen]);


    useEffect(() => {
        if (showModal1 || menuOpen) {
            positionModal1();
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [showModal1, menuOpen]);

    useEffect(() => {
        if (showModal2 || menuOpen) {
            positionModal2();
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [showModal2, menuOpen]);


    const handleClickOutside = (event) => {
        if (
            modalRef1.current &&
            !modalRef1.current.contains(event.target) &&
            !iconRef1.current.contains(event.target)
        ) {
            setShowModal1(false);
        }

        if (
            modalRef2.current &&
            !modalRef2.current.contains(event.target) &&
            !iconRef2.current.contains(event.target)
        ) {
            setShowModal2(false);
        }

        if (
            menuOpen &&
            !event.target.closest('.navbar-toggler') &&
            !event.target.closest('.mobile-menu')
        ) {
            setMenuOpen(false);
        }
    };


    // const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
    //             setShowModal(false);
    //         // setArrowDirection('down');
    //     }
    // };

    // const handleClickOutsideMenu = (event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         setMenuOpen(false);
    //     }
    // };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserName('');
        if (showModal1 === true) setShowModal1(false);
        if (showModal2 === true) setShowModal2(false);
        history('/login');
        setGetUser(false);
    };

    const userProfileFun1 = () => {
        if (!getUser) fetchUserData();
        setShowModal1(!showModal1);
        // console.log(showModal);
    };

    const userProfileFun2 = () => {
        if (!getUser) fetchUserData();
        setShowModal2(!showModal2);
    };


    const positionModal1 = () => {
        if (iconRef1.current && modalRef1.current) {
            const iconRect = iconRef1.current.getBoundingClientRect();
            const modalWidth = modalRef1.current.offsetWidth;

            let leftPosition = iconRect.left + (iconRect.width / 2) - (modalWidth / 2);

            // Ensure the modal stays within the viewport
            if (window.innerWidth < 768) {
                // For mobile view, center the modal and make it near-full width
                modalRef1.current.style.width = '60%';
                leftPosition = (window.innerWidth - modalRef1.current.offsetWidth);
                modalRef1.current.style.top = `${iconRect.bottom + 20}px`;
            } else {
                if (leftPosition < 10) {
                    leftPosition = 10;
                } else if (leftPosition + modalWidth > window.innerWidth - 10) {
                    leftPosition = window.innerWidth - modalWidth - 10;
                }
                modalRef1.current.style.top = `${iconRect.bottom + 20}px`;
            }

            modalRef1.current.style.position = 'fixed';

            modalRef1.current.style.left = `${leftPosition - 10}px`;
        }
    };


    const positionModal2 = () => {

        if (iconRef2.current && modalRef2.current) {
            const iconRect = iconRef2.current.getBoundingClientRect();
            const modalWidth = modalRef2.current.offsetWidth;

            let leftPosition = iconRect.left + (iconRect.width / 2) - (modalWidth / 2);

            // Ensure the modal stays within the viewport
            if (window.innerWidth < 768) {
                // For mobile view, center the modal and make it near-full width
                modalRef2.current.style.width = '60%';
                leftPosition = (window.innerWidth - modalRef2.current.offsetWidth);
                modalRef2.current.style.top = `${iconRect.bottom + 20}px`;
            } else {
                if (leftPosition < 10) {
                    leftPosition = 10;
                } else if (leftPosition + modalWidth > window.innerWidth - 10) {
                    leftPosition = window.innerWidth - modalWidth - 10;
                }
                modalRef2.current.style.top = `${iconRect.bottom + 20}px`;
            }

            modalRef2.current.style.position = 'fixed';

            modalRef2.current.style.left = `${leftPosition - 10}px`;
        }
    };

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
                    <NavLink className="navbar-brand" to="/"><span style={{ color: 'white', fontWeight: '600' }}>
                        <i className="fa-solid fa-boxes" style={{ marginRight: '5px', color: "#E0FFFF" }}></i>
                        OrganizeNow</span></NavLink>
                    <div className="profile_mobile">
                        {localStorage.getItem('token') && (
                            <>
                                <i
                                    ref={iconRef2}
                                    className="icon-container"
                                    onClick={userProfileFun2}
                                >
                                    <i
                                        className={`fa-regular fa-circle-user mx-1 ${showModal2 ? 'icon-open' : 'icon-closed'}`}
                                        style={{ fontSize: '24px', color: 'white' }}
                                    ></i>
                                    <i
                                        className={`fa ${showModal2 ? 'fa-chevron-up' : 'fa-chevron-down'} `}
                                        style={{ fontSize: '12px', color: 'white', marginLeft: '3px' }}
                                    ></i>
                                </i>

                            </>
                        )}
                    </div>

                    <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                        <span className="close-btn" onClick={() => setMenuOpen(false)}>&times;</span>
                        {/* <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/Schedulr">Schedulr</NavLink>
                        <NavLink className="nav-link" to="/about">About</NavLink> */}

                        <NavLink className="nav-link" to="/" onClick={() => setMenuOpen(false)}><i className="fa-solid fa-clipboard-list mx-1" style={{ color: 'white' }}></i>iNotebook</NavLink>
                        <NavLink className="nav-link" to="/Schedulr" onClick={() => setMenuOpen(false)}>Schedulr</NavLink>
                        <NavLink className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                        {!localStorage.getItem('token') && (
                            <>
                                <NavLink className="btn btn-primary mx-3 my-2" to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                                <NavLink className="btn btn-primary mx-3 my-2" to="/signup" onClick={() => setMenuOpen(false)}>SignUp</NavLink>
                            </>
                        )}
                    </div>
                    <div className={`collapse navbar-collapse ${menuOpen ? 'd-none' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/"><i className="fa-solid fa-clipboard-list mx-1" style={{ color: 'white' }}></i>iNotebook</NavLink>
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
                                        ref={iconRef1}
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={userProfileFun1}
                                    >
                                        <i
                                            className={`fa-regular fa-circle-user mx-1 ${showModal1 ? 'icon-open' : 'icon-closed'}`}
                                            style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }}
                                        ></i>
                                        <i
                                            className={`fa ${showModal1 ? 'fa-chevron-up' : 'fa-chevron-down'} `}
                                            style={{ fontSize: '12px', color: 'white', marginLeft: '3px' }}
                                        ></i>
                                    </i>
                                </>
                        }
                    </div>
                    {showModal1 && (
                        <div className="profile-modal" ref={modalRef1}>
                            <div className="profile-details">
                                <h4><i className='fa-solid fa-user' /> User Profile</h4>
                                <hr />
                                <p><strong>Name:</strong> {userName}</p>
                                <p><strong>Email:</strong> {userEmail}</p>
                                <hr />
                                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                            </div>
                        </div>
                    )}
                    {showModal2 && (
                        <div className="profile-modal" ref={modalRef2}>
                            <div className="profile-details">
                                <h4><i className='fa-solid fa-user' /> User Profile</h4>
                                <hr />
                                <p><strong>Name:</strong> {userName}</p>
                                <p><strong>Email:</strong> {userEmail}</p>
                                <hr />
                                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                            </div>
                        </div>
                    )}

                    {/* {showModal1 && (
                        <div className="profile-modal" ref={modalRef1}>
                            <div className="profile-details">
                                <h4><i className='fa-solid fa-user' /> User Profile</h4>
                                <hr />
                                <p><strong>Name:</strong> {userName}</p>
                                <p><strong>Email:</strong> {userEmail}</p>
                                <hr />
                                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                            </div>
                        </div>
                    )} */}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
