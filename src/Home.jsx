import Head from './Header.jsx';
import Searchbar from './Searchbar.jsx';
import Latest_review from './Latest_recipe.jsx';
import PopularReview from './PopularReview.jsx';
import './assets/css/index.css';
import React from 'react'
import { useState} from 'react'
import Footer from './Footer.jsx'


function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setIsAuthenticated(false);
        alert("You have been logged out.");
        window.location.href = '/Login';
    };
    return(
                                       
        <>
            
            <Head/>
            <Searchbar/>
            <Latest_review/>
            <PopularReview/>
           
        </>
    );
}
    
export default Home