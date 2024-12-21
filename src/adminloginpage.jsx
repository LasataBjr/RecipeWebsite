import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/admin/login", {
                username,
                password,
            });

            // Save the token if login is successful
            localStorage.setItem("adminAuthToken", response.data.token);
            navigate("/admindashboard");
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid username or password. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="admin-login-page">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLoginPage;