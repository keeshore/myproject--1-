import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // const handleMoveToRegister = () => {
    //     navigate("/Register");
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { Email, Password };

        axios.post("http://127.0.0.1:8000/login/", data)
            .then(response => {
                let message=response.data.message
                if (message==="Login Successfully"){
                    navigate("/",{state:{Email}}); 
                }else{
setMessage(response.data.message);
                }
                setEmail("");
                setPassword(""); // Navigate to home/dashboard after login success// navigate("/home");  // optional
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    setMessage(error.response.data.message || "Invalid Credentials");
                } else {
                    setMessage("Network Error");
                }
            });
    };
    return (
        <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />

                <label>Password:</label>
                <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />

                <button type="submit">Login</button>
            </form>

            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* <button onClick={handleMoveToRegister} style={{ marginTop: "10px" }}>
                Go to Register
            </button> */}
        </div>
    );
};
export default Login;