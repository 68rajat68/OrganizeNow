import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/normal.css'


const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCpasswordVisible] = useState(true);

  const handlSubmit = async (e) => {
    e.preventDefault();

    // fetch("http:localhost:5000/api/auth/login")
    const { name, email, password } = credentials;
    const response = await fetch(`https://inotebook-backend-ixb2.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //Access
      // localStorage.setItem('token', json.authtoken);
      history("/login");
      props.showAlert("Account Created Successfully. Now Login !!!","success")
    } else {
      // console.log(credentials);
      // alert(json.error);
      props.showAlert(json.error,"danger")
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    // <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
    //   <h3><center><i className="fa-solid fa-user-plus px-2"></i>Create an account to use iNotebook</center></h3>
    //   <form onSubmit={handlSubmit}>
    //     <div className="form-group my-3">
    //       <label htmlFor="name" className="form-label">Name</label>
    //       <input type="text" className="form-control" name='name' id="name" onChange={onChange} placeholder="Enter name" />
    //     </div>
    //     <div className="form-group my-3">
    //       <label htmlFor="email" className="form-label">Email address</label>
    //       <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
    //       {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
    //     </div>
    //     <div className="form-group my-3">
    //       <label htmlFor="password" className="form-label">Password</label>
    //       <input type="password" className="form-control" name='password' id="password" onChange={onChange} placeholder="Password" required minLength={5} />
    //     </div>
    //     <div className="form-group my-3">
    //       <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    //       <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} placeholder="Confirm Password" required minLength={5} />
    //     </div>

    //     <button type="submit" className="btn btn-primary ">SignUp</button>
    //   </form>
    // </div>


    <div className='container p-3' style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
      <h3><center><i className="fa-solid fa-user-plus px-2"></i>Create an account to use OrganizeNow</center></h3>
      <hr/>
      <form onSubmit={handlSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChange} placeholder="Enter name" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
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
        <div className="form-group my-3 position-relative">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type={!cpasswordVisible ? 'text' : 'password'}
            className="form-control"
            name='cpassword'
            id="cpassword"
            onChange={onChange}
            placeholder="Confirm Password"
            required
            minLength={5}
          />
          <i
            className={`fa ${cpasswordVisible ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
            onClick={() => setCpasswordVisible(!cpasswordVisible)}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>

        <button type="submit" className="btn btn-primary ">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
