import React, { useState } from 'react';
import './assets/css/login.css';
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
                setErrorMessage("Login failed. Please try agian");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred during login.");
        }
    };

    return (
        <>
            <h1>This is the login form</h1>
            <div id="loginform">
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </form>
            </div>
        </>
    );
}

export default Login;
