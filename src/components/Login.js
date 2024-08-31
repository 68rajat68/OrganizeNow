import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/normal.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [passwordVisible, setPasswordVisible] = useState(true);
  // const [password,setPassword] = useState("")
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch("http:localhost:5000/api/auth/login")
    const response = await fetch(`https://inotebook-backend-ixb2.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhODRlZGNlOTdmZDIxYmJjYTNlNTRmIn0sImlhdCI6MTcyMjMyOTgxMH0.MTFMME6n17uk0BO7yZT36LDdZkhxBTfcIcnh7jCYlwY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()
    //   console.log(json);
    if (json.success) {
      //Access
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success")
      history("/");
    } else {
      // alert("Invalid Details.");
      props.showAlert("Enter Valid Information", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    // <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
    //     <h3><center><i className="fa-solid fa-sign-in-alt px-2"></i>Login to Continue with iNotebook</center></h3>
    //     <form onSubmit={handlSubmit}>
    //         <div className="form-group my-3">
    //             <label htmlFor="email" className="form-label">Email address</label>
    //             <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>

    //         </div>
    //         {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
    //         <div className="form-group my-3">
    //             <label htmlFor="password" className="form-label">Password</label>
    //             <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} placeholder="Password"/>
    //         </div>
    //         {/* <div className="form-check">
    //             <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    //                 <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    //         </div> */}
    //         <button type="submit" className="btn btn-primary" >Login</button>
    //     </form>
    // </div>

    <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
      <h3><center><i className="fa-solid fa-sign-in-alt px-2"></i>Login to Continue with OrganizeNow</center></h3>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group my-3 position-relative">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={!passwordVisible ? 'text' : 'password'}
            className="form-control"
            name='password'
            id="password"
            onChange={onChange}
            placeholder="Password"
            required
            minLength={5}
          />
          <i
            className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
