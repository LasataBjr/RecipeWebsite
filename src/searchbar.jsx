import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './assets/css/search.css';
import './font-awesome/css/font-awesome.min.css';
import bck from './assets/images/background1.jpg';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5000/search_recipes?query=${searchQuery}`);
            console.log("search results", response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search result", error);
            setError("Error fetching search results. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const handleResultClick = (recipeId) => {
        console.log("Navigating to recipe page with ID: ", recipeId);
        navigate(`/recipePage/${recipeId}`);
    };

    return (
        <>
            <div id="input-wrapper">
                <div id="search_bar">
                    <button id="btn1" onClick={handleSearch} disabled={!searchQuery}>
                        <i className="fa fa-search" id="search_icon" aria-hidden="true"></i>
                    </button>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        name="SearchBar"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search recipes"
                    />
                </div>
                <div id="SearchBox">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    {searchResults.length > 0 ? (
                        searchResults.map((recipe) => (
                            <div
                                id="search_result"
                                key={recipe._id}
                                onClick={() => handleResultClick(recipe._id)}
                                style={{ cursor: 'pointer' }} 
                            >
                                <h3>{recipe.title}</h3>
                            </div>
                        ))
                    ) : (
                        searchQuery && !loading && <p>No results found for "{searchQuery}"</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SearchBar;
