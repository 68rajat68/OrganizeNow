import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useNavigate();

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
    <div className='container'>
      <h3>Create an account to use iNotebook</h3>
      <form onSubmit={handlSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChange} placeholder="Enter name" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} placeholder="Password" required minLength={5} />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} placeholder="Confirm Password" required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary ">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
