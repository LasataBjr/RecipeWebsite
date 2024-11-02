import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import RecipeInsertion from './Recipeadd.jsx';
import RecipeDeletion from './Recipedel.jsx';
import './assets/css/index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <nav>
                {!isAuthenticated ? (
                    <>
                        <Link to='/Login'>Login</Link>
                        <Link to='/Signup'>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to='/Recipeadd'>Add Recipe</Link>
                        <Link to='/Recipedel'>View Recipes</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>
            <Routes>
                <Route 
                    path='/Login' 
                    element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
                />
                <Route path='/Signup' element={<Signup />} />
                <Route 
                    path='/Recipeadd' 
                    element={isAuthenticated ? <RecipeInsertion /> : <Navigate to="/Login" />} 
                />
                <Route 
                    path='/Recipedel' 
                    element={isAuthenticated ? <RecipeDeletion /> : <Navigate to="/Login" />} 
                />
                <Route 
                    path='/' 
                    element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} 
                />
                
            </Routes>
        </Router>
    );
}

export default App;
