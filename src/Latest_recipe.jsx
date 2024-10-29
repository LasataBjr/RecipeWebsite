import './assets/css/latest_recipe.css'
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import arrow_up from './assets/images/arrow_up.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

function latest_review(){
    const[latestRecipes , setLatestRecipes] = useState([]);
    
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


    return(
        <>
            <h2 id="tt1">Latest Recipe</h2>
            <br></br>
            <div id="row">
                { latestRecipes.length > 0 ? (
                    latestRecipes.map((recipe) => (
                        <div className="column" key={recipe._id}>
                            <img className="latest_img" src={recipe.image || arrow_up} alt={recipe.title}/>{/*it will show either of the image or title even though there is only of the image or title*/}
                            <p className="l_title">{recipe.title}</p>
                            <button ><i className="fa fa-heart"></i></button>
                            <button></button>
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