import React, {  useState  } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"" , password:""})
    // const [password,setPassword] = useState("")
    let history = useNavigate();

    const handlSubmit = async (e)=>{
        e.preventDefault();

        // fetch("http:localhost:5000/api/auth/login")
        const response = await fetch(`https://inotebook-backend-ixb2.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhODRlZGNlOTdmZDIxYmJjYTNlNTRmIn0sImlhdCI6MTcyMjMyOTgxMH0.MTFMME6n17uk0BO7yZT36LDdZkhxBTfcIcnh7jCYlwY",
              "Content-Type":"application/json"
            },
            body: JSON.stringify({email:credentials.email , password:credentials.password}),
          });
          const json = await response.json()
        //   console.log(json);
          if(json.success){
                //Access
                localStorage.setItem('token',json.authtoken);
                props.showAlert("Logged in Successfully","success")
                history("/");
          }else{
            // alert("Invalid Details.");
            props.showAlert("Enter Valid Information" ,"danger")
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <div>
            <h3>Login to Continue to iNotebook</h3>
            <form onSubmit={handlSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} placeholder="Password"/>
                </div>
                {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
