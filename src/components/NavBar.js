import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import '../css/Navbar.css';

function NavBar() {
    let history = useNavigate();
    const location = useLocation();
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    // const [menuOpen, setMenuOpen] = useState('');
    const [getUser, setGetUser] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const iconRef1 = useRef(null);
    const iconRef2 = useRef(null);
    const modalRef1 = useRef(null);
    const modalRef2 = useRef(null);
    const menuRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    //   const [activeTab, setActiveTab] = useState('/iNotebook');
    const [activeTab, setActiveTab] = useState(location.pathname);

    useEffect(() => {
        setActiveTab(location.pathname); // Update activeTab when the path changes
    }, [location.pathname]);

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
    useEffect(() => {
        if (showModal1 || menuOpen) {
            positionModal1();
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
        // eslint-disable-next-line
    }, [showModal1, menuOpen]);

    useEffect(() => {
        if (showModal2 || menuOpen) {
            positionModal2();
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    {/* <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <button className="navbar-toggler_01" onClick={() => setMenuOpen(!menuOpen)}>
                        <AiOutlineMenu size={24} color="white" />
                    </button>
                    <NavLink className="navbar-brand" to="/"><span style={{ color: 'white', fontWeight: '600' }}>
                        <i className="fa-solid fa-boxes px-2" style={{ marginLeft: '5px', color: "#E0FFFF" }}></i>
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


                    <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                        <div className='menu_header'>
                            {/* <div><i className="fa-solid fa-boxes px-1" style={{ marginRight: '5px', color: "#E0FFFF" }}></i>OrganizeNow</div> */}
                            <div><span className="close-btn" onClick={() => setMenuOpen(false)}>&times;</span></div>
                        </div>
                        <NavLink className={`nav-link ${activeTab === '/' ? 'active_side' : ''}`} to="/" onClick={() => { setMenuOpen(false); }}><i className="fa-solid fa-clipboard-list mx-1" ></i>iNotebook</NavLink>
                        <NavLink className={`nav-link ${activeTab === '/Schedulr' ? 'active_side' : ''}`} to="/Schedulr" onClick={() => { setMenuOpen(false); setActiveTab('/Schedulr'); }}><i className="fa-solid fa-calendar-alt mx-1" ></i>Schedulr</NavLink>
                        <NavLink className={`nav-link ${activeTab === '/about' ? 'active_side' : ''}`} to="/about" onClick={() => { setMenuOpen(false); setActiveTab('/about'); }}><i className="fa-solid fa-info-circle mx-1"></i>About</NavLink>
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
                                <NavLink className="nav-link" aria-current="page" to="/">iNotebook</NavLink>
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
                                            style={{ fontSize: '12px', color: 'white', marginLeft: '3px' , marginRight: '10px'}}
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

                </div>
            </nav>
        </div>

    );
}

export default NavBar;
