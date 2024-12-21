import React, { useState } from 'react';
import login_logo from './assets/images/Logo.png'
import './assets/css/login.css';
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });

            if (response.status === 200) {
                alert("Login successful");
                localStorage.setItem('token', response.data.token);
                setLoginSuccess(true);
                onLogin();  // Call the onLogin function to update authentication state
                setUsername('');
                setPassword('');
            } else {
                setErrorMessage("Login failed. Please try againn");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred during login.");
        }
    };

    return (
        <>
           
            <div id="login_form">

                <form action = "" onSubmit={handleLogin}>
                    <img src={login_logo} id="login_logo"></img>
                    <div className = "input-box">
                        <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        />
                        <i className="fa fa-user form_icons"></i>
                        
                    </div>
                    <div className = "input-box">
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <i className="fa fa-lock"></i>
                        
                    </div>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <button type='submit'>Login</button>
                    <div className="register-link">
                        <p>Don't have an account?
                        {/* <a href="#"> SignUp </a> */}
                        <Link to="/Signup"> SignUp </Link>
                        </p>
                        
                        
                    </div>
                   
                </form>
            </div>
        </>
    );
}

export default Login;
