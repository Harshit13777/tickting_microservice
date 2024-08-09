import { useState } from "react";
import axios from "axios";

export default ()=>{

    const [email,set_email]=useState('');
    const [password,set_password]=useState('');
    const [errors,set_errors]=useState([])

    const onsubmit=async (event)=>{
        event.preventDefault();
        try {
            const response= await axios.post('/api/users/signup',{
                email,password
            })
            
        } catch (error) {
            console.log(error.response.data)
            set_errors(error.response.data.Error);
        }
    }

    return <>
    <form onSubmit={onsubmit}>
        <h1>Signup</h1>
        <div className="form-group">
            <label>Email Address</label>
        <input 
        value={email}
        onChange={e=>set_email(e.target.value)}
         className="from-control"></input>
        </div>
        <div className="form-group">
            <label>Password</label>
        <input 
        value={password}
        onChange={e=>set_password(e.target.value)}
         className="from-control"></input>
        </div>
    <div className="alert alert-danger">
        {errors.length!==0 && <h4>Ooops...</h4>}
        <ul className="my-0">
        {

        errors?.map((e,i)=>(
            <li key={i}>{e.message}</li>
        ))
    }
    </ul>
    </div>
        <button type="submit" className="btn btn-primary">submit</button>
    </form>
    </>
}