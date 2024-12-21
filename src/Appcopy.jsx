import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import RecipeInsertion from './Recipeadd.jsx';
import RecipeDeletion from './Recipedel.jsx';
import RecipePage from './RecipePage.jsx';
import Recipeedit from './Recipeedit.jsx';
import AdminLoginPage from './adminloginpage.jsx';
import AdminDashboard from './admindashboard.jsx';
import './assets/css/navbar.css';
import logo from './assets/images/Logo.png';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const adminToken = localStorage.getItem('adminAuthToken');

        if (token) {
            setIsAuthenticated(true);
        }
        if (adminToken) {
            setIsAdminAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/');
    };

    const handleAdminLogin = () => {
        setIsAdminAuthenticated(true);
        navigate('/admindashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminAuthToken');
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
    };

    return (
        <Router>
            <nav>
                {isAdminAuthenticated ? (
                    <div>
                        <ul id="navbar">
                            <li><Link to="/admindashboard">Admin Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : isAuthenticated ? (
                    <div>
                        <Link to="/">
                            <img src={logo} className="navlogo" alt="Website Logo" />
                        </Link>
                        <ul id="navbar">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Recipeadd">Add Recipe</Link></li>
                            <li><Link to="/Recipedel">View Recipes</Link></li>
                            <li><button onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</button></li>
                        </ul>
                    </div>
                ) : null}
            </nav>

            <Routes>
                {/* User Login */}
                <Route
                    path="/Login"
                    element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                />

                {/* User Signup */}
                <Route path="/Signup" element={<Signup />} />

                {/* Admin Login */}
                <Route
                    path="/adminlogin123"
                    element={isAdminAuthenticated ? <Navigate to="/admindashboard" /> : <AdminLoginPage onLogin={handleAdminLogin} />}
                />

                {/* Admin Dashboard */}
                <Route
                    path="/admindashboard"
                    element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/adminlogin123" />}
                />

                {/* Add Recipe */}
                <Route
                    path="/Recipeadd"
                    element={isAuthenticated ? <RecipeInsertion /> : <Navigate to="/Login" />}
                />

                {/* View Recipes */}
                <Route
                    path="/Recipedel"
                    element={isAuthenticated ? <RecipeDeletion /> : <Navigate to="/Login" />}
                />

                {/* Recipe Details */}
                <Route
                    path="/RecipePage/:id"
                    element={isAuthenticated ? <RecipePage /> : <Navigate to="/Login" />}
                />

                {/* Edit Recipe */}
                <Route
                    path="/Recipeedit/:id"
                    element={isAuthenticated ? <Recipeedit /> : <Navigate to="/Login" />}
                />

                {/* Home */}
                <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}
                />
            </Routes>

            {/* Footer */}
            {isAuthenticated && <Footer />}
        </Router>
    );
}

export default App;