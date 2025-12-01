import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleMoveToLogin = () => {
        navigate("/login"); 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { Fname, Lname, Phone, Email, Password };
    axios.post("http://127.0.0.1:8000/register/", data)
            .then(response => {
                let message=response.data.message
                console.log(message)
                if (message==="Registered Succesfully"){
                    navigate("/login"); 
                }else{
setMessage(response.data.message);
                }
                setMessage(response.data.message);  
                setFname(""); setLname(""); setPhone(""); setEmail(""); setPassword("");
            })
            .catch(error => {
                console.log(error); 
                if (error.response) {
                    setMessage(error.response.data.error || error.response.data.message);
                } else {
                    setMessage("Network Error");
                }
            });
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Firstname:</label>
                <input type="text" value={Fname} onChange={(e)=>setFname(e.target.value)} required /><br/><br/>

                <label>Lastname:</label>
                <input type="text" value={Lname} onChange={(e)=>setLname(e.target.value)} required /><br/><br/>

                <label>Phone:</label>
                <input type="text" value={Phone} onChange={(e)=>setPhone(e.target.value)} required /><br/><br/>

                <label>Email:</label>
                <input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} required /><br/><br/>

                <label>Password:</label>
                <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} required /><br/><br/>

                <button type="submit">Register</button>
            </form>

            {message && <p style={{ color: "green" }}>{message}</p>}
            <button onClick={handleMoveToLogin} style={{ marginTop: "10px" }}>Go to Login</button>
        </div>
    );
};
export default Register;