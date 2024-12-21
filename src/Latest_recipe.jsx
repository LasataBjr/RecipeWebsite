import './assets/css/latest_recipe.css'
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import arrow_up from './assets/images/arrow_up.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function latest_review(){
    const[latestRecipes , setLatestRecipes] = useState([]);
    const navigate = useNavigate();
    const fetchLatestRecipes = async() => {
        try{
            const response = await axios.get('http://localhost:5000/latest_recipes');
            setLatestRecipes(response.data);
        }
        catch(error){
            console.error('Error:',error);

        }
   };
   useEffect(() => {
        fetchLatestRecipes();
   },[]);

   const handleResultClick = (recipeId) => {
    console.log("Navigating to recipe page with ID: ", recipeId);
    navigate(`/recipePage/${recipeId}`);
};


    return(
        <>
            <h2 id="tt1">Latest Recipes</h2>
            <br></br>
            <div id="col">
                { latestRecipes.length > 0 ? (
                    latestRecipes.map((recipe) => (
                        <div className="row" key={recipe._id}>
    <img className="latest_img" src={recipe.image || arrow_up} alt={recipe.title} />
    <p className="l_title">{recipe.title}</p>
        <div className="action-buttons">
        <button className="like-button">
            <i className="fa fa-heart"></i>
        </button>
        <button className="more-button" onClick={() => handleResultClick(recipe._id)}>
            <i className="fa fa-external-link"  ></i> View Recipe
        </button>
    </div>
</div>

                    ))
                ):(
                    <p>no latest recipes available</p>
                )}
                    
                
            </div>
            
        </>
    );
}
export default latest_review