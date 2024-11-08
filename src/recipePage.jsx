import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipePage() {
    const { id } = useParams();  // Get recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipePage/${id}`);
                setRecipe(response.data);  // Set recipe data on success
            } catch (error) {
                setError("Error fetching recipe data");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="recipe-page">
            <h1>{recipe.title}</h1>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {recipe.steps && recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipePage;
