import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Footer from './Footer.jsx'
import Head from './Header.jsx';
import logo from './assets/images/Logo.png';
import './assets/css/navbar.css';
import Home from './Home.jsx';
import RecipeInsertion from './Recipeadd.jsx';
import RecipeDeletion from './Recipedel.jsx';
import RecipePage from './RecipePage.jsx';
import Recipeedit from './Recipeedit.jsx'
import './assets/css/index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token){
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigator('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {/* <nav>
                {!isAuthenticated ? (
                    <>
                        <Link to='/Login'>Login</Link>
                        <Link to='/Signup'>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to='/Recipeadd'>Add Recipe</Link>
                        <Link to='/Recipedel'>View Recipes</Link>
                        <Link to='/'>Home</Link> 
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav> */}
            {!isAuthenticated || <nav>

                                    <div>
                                        <Link to="/">
                                            <img src={logo} className="navlogo" alt="Website Logo" />
                                        </Link>
                                    </div>
                                    <div>
                                        <ul id="navbar">
                                            <li><Link to='/' >Home</Link></li>
                                            <li><Link to='/Recipeadd'>Add Recipe</Link></li>
                                            <li><Link to='/Recipedel'>View Recipes</Link></li>
                                            <li><button onClick={handleLogout}><i class="fa fa-sign-out"></i>  Logout</button></li>                                           
                                                                
                                        </ul>                             
                                    </div>
                            </nav>}
            

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
                <Route path='/RecipePage/:id'
                    element={isAuthenticated ? <RecipePage /> : <Navigate to='/Login'/>}
                />
                <Route path='/Recipeedit/:id'
                    element={isAuthenticated ? <Recipeedit/> : <Navigate to ='/Login'/>}
                />
                <Route 
                    path='/' 
                    element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} 
                />
                
                
            </Routes>
            {/* {location.pathname !== '/Login' && location.pathname !== '/Signup' && <Footer />} */}
            {isAuthenticated  && <Footer/>}
        </Router>
    );
}

export default App;
