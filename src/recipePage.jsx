import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './assets/css/Recipe.css';
import Footer from './Footer.jsx'

function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('ingredients');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipePage/${id}`);
                setRecipe(response.data);
            } catch (error) {
                setError('Error fetching recipe data');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const toggleSection = () => {
        setActiveSection((prev) => (prev === 'ingredients' ? 'steps' : 'ingredients'));
    };

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="recipe-page">
            <h1 className="recipe-title">{recipe.title}</h1>
            {recipe.image && <img className="recipe-image" src={recipe.image} alt={recipe.title} />}

            <div className="toggle-switch-container">
                <div
                    className={`toggle-switch ${activeSection === 'steps' ? 'active' : ''}`}
                    onClick={toggleSection}
                >
                    <span className="toggle-label toggle-left">Ingredients</span>
                    <div className="toggle-slider"></div>
                    <span className="toggle-label toggle-right">Steps</span>
                </div>
            </div>

            <div className="recipe-content">
                {activeSection === 'ingredients' && (
                    <div className="ingredients-section">
                        <h2>Ingredients</h2>
                        <ul>
                            {recipe.ingredients &&
                                recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                        </ul>
                    </div>
                )}

                {activeSection === 'steps' && (
                    <div className="steps-section">
                        <h2>Steps</h2>
                        <ul>
                            {recipe.steps &&
                                recipe.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
        
    );
   
}

export default RecipePage;