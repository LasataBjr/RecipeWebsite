import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipePage() {
    const { id } = useParams();  // Get recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('ingredients');

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

    const toggleSection = (section) => {
        setActiveSection(section);
    }

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="recipe-page">
            <h1>{recipe.title}</h1>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}

            <div className='recipe-section-toggle'>
                <button onClick={() => toggleSection('ingredients')} className={activeSection === 'ingrediets' ? 'active' : ''}>
                    Ingredients
                </button>
                <button onClick={() => toggleSection('steps')} className={activeSection === 'steps' ? 'active' : ''}>
                    Steps
                </button>

            </div>
            <div className='recipe-content'>
                {activeSection === 'ingredients' &&(
                    <div className='ingredients'>
                        <h2>Ingredients</h2>
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeSection === 'steps' &&(
                    <div className='steps'>
                        <h2>Steps</h2>
                        <ol>
                            {recipe.steps && recipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                )}                
            </div>
        </div>
    );
}

export default RecipePage;
