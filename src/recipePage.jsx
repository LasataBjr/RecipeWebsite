import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function recipePage()
{
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[showIngredients, setShowIngredients] = useState(false);
    const[showSteps, setShowSteps] = useState(false);

    const fetchRecipe = async() =>{
        try{
            const response = await axios.get(`http://localhost:5000/recipePage/${id}`)
            setRecipe(response.data)
        }
        catch(error){
            console.error("Error fetching recipe", error);
            setError("Error loading recipe. Please try again");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRecipe();
    }, [id]); 
    
       
    if (loading) return <p>Loading...</p>
    if (error) return <p className = "error">{error}</p>
    
    return(
        <>
            <div>
                {recipe && (
                  <>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title}/>
                    <p><strong>Category:</strong>{recipe.category}</p>
                    <div id="option"> 
                        <button id="ingredients" onClick={() => setShowIngredients(!showIngredients)}>
                            {showIngredients ? 'hideIngredients' : 'showIngreddients'}
                        </button>
                        <button id="steps" onClick={() => setShowSteps(!showSteps)}> 
                            {showSteps ? 'hideSteps' : 'showSteps'}
                        </button>
                    </div>
                    <div id="points">
                        {showIngredients && (
                                <div className="ways">
                                    <p>Ingredients</p>
                                        <ul>
                                            {recipe.ingredients.map((ingredients, index) => (
                                                <li key= {index}>{ingredients}</li>
                                            ))}
                                            
                                        </ul>   
                                </div>

                            )                   
                        }
                        {showSteps && (
                            <div className="ways">
                                <p>Steps</p>
                                   <ul>{recipe.steps.map((steps, indexsteps) => (
                                        <li key={indexsteps}>{steps}</li>
                                   ))}
                                   </ul>
                            </div>
                        )

                        }
                    </div>
                    
                    
                  </>  



                )}

            </div>

       </>
    );
}
export default recipePage;
