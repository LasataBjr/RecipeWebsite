import './assets/css/popular_recipe.css';
import './fontawesome-free-6.6.0-web/css/all.min.css';
import arrow_up from './assets/images/arrow_up.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

function PopularReview() {
    const [recipes, setRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState(new Set());

    const fetchPopularRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/popular_recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const handleLike = async (id, category) => {
        const newLikedRecipes = new Set(likedRecipes);
    
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                alert("You need to log in to like a recipe.");
                return;
            }
    
            const response = await axios.post(
                `http://localhost:5000/toggle_like/${id}`,
                { category },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                const updatedLikes = response.data.likes;
                const likedStatus = response.data.liked;
    
                if (likedStatus) {
                    newLikedRecipes.add(id);
                } else {
                    newLikedRecipes.delete(id);
                }
    
                setLikedRecipes(newLikedRecipes);
    
                setRecipes((prevRecipes) =>
                    prevRecipes.map((recipe) =>
                        recipe._id === id ? { ...recipe, likes: updatedLikes } : recipe
                    )
                );
            }
        } catch (error) {
            console.error('Error liking recipe:', error);
        }
    };
    
        
    
    return (
        <>
            <h2 id="tt1">Popular Recipes</h2>
            <br />
            <div id="row">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div className="column" key={recipe._id}>
                            <img className="latest" src={recipe.image || arrow_up} alt={recipe.title} />
                            <p className="l_title">{recipe.title}</p>
                            <button
                                className={`btn2 ${likedRecipes.has(recipe._id) ? 'liked': ''}`}
                                onClick={() =>  handleLike(recipe._id, recipe.category)}
                            >
                                <i className='fa fa-heart'></i>
                            </button>

                            <p>Likes: {recipe.likes}</p>
                        </div>
                    ))
                ) : (
                    <p>No popular recipes available.</p>
                )}
            </div>
        </>
    );

}
export default PopularReview;
