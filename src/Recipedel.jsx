import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useAsyncError, useNavigate } from 'react-router-dom';
import './assets/css/viewrecipe.css'
function Recipedel(){
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState('Veg');
    const [sortBy,  setSortBy] = useState('default');
    const navigate = useNavigate();

    //function for fetching
    const fetch_recipe = async() =>{
        try{
            const response = await axios.get(`http://localhost:5000/get_recipes?category=${category}`);
            setRecipes(response.data)
            
        }
        catch(error)
        {
            alert("Cannot fetch the data",error);
        }
    }
    const afterdel_recipe = async(id) =>{
        try{
            const response = await axios.delete(`http://localhost:5000/del_recipes/${id}?category=${category}`);
            alert(response.data.message);
            fetch_recipe();
        }catch(error)
        {
            console.error('error deleting recipe:',error);
            alert("Cannot delete",error);
        }
    };
    const likerecipe = async(id) =>{
        try{
            const response = await axios.post(`http://localhost:5000/likes/${id}?category=${category}`);
            alert(response.data.message);
            fetch_recipe();
        }
        catch(error)
        {
            console.error('error liking recipe:',error);
            alert("Cannot like recipe",error);
        }
    }

    useEffect(() =>{
        fetch_recipe();    
    },[category, sortBy]);

return(
    <>
        <h2 id="cat">Top {sortBy === 'popular' ? '3 popular' : ''}Recipes in {category} Category</h2>

        <label className="lab">Choose Category:</label>
        <select className="option" value={category} onChange = {(e) => setCategory(e.target.value)}>
            <option value="Chicken">Chicken</option>
            <option value="Buff">Buff</option>
            <option value="Pork">Pork</option>
            <option value="Veg">Veg</option>
            <option value="Fish">Fish</option>
            <option value="Bakery">Bakery</option>
        </select>

        <label className="lab">Sort By:</label>
        <select className="option" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="popular">Popular</option>
        </select>

        <div className="recipes-container">
                {recipes.map((recipe) => (
                    <div className="recipe-box" key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        {recipe.image && (
                            <img
                                id="recipe_img"
                                src={recipe.image}
                                alt={recipe.title}
                                width="100"
                            />
                        )}
                        <p className="topic">
                            <strong>Ingredients: </strong>
                        </p>
                        <ul className="points">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li className="li" key={index}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                        <p className="topic">
                            <strong>Steps: </strong>
                        </p>
                        <ul className="points">
                            {recipe.steps.map((step, index) => (
                                <li className="li" key={index}>
                                    {step}
                                </li>
                            ))}
                        </ul>
                        <p className="topic">
                            <strong>Likes: </strong>
                            {recipe.likes}
                        </p>

                        {/* <button
                            className="bttn"
                            onClick={() => afterdel_recipe(recipe._id)}
                        >
                            Delete
                        </button> */}
                        <button className="bttn" onClick={() => likerecipe(recipe._id)}>
                            Like
                        </button>
                        {/* <button
                            className="bttn"
                            onClick={() => navigate(`/Recipeedit/${recipe._id}`)}
                        >
                            Edit
                        </button> */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Recipedel;