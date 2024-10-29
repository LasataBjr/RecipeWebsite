import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useAsyncError } from 'react-router-dom';

function fetch_Recipe(){
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState('Veg');
    const [sortBy,  setSortBy] = useState('default');

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
        <h2>Top {sortBy === 'popular' ? '3 popular' : ''}Recipes in {category} Category</h2>
        <label>Choose Category:</label>
        <select value={category} onChange = {(e) => setCategory(e.target.value)}>
            <option value="Chicken">Chicken</option>
            <option value="Buff">Buff</option>
            <option value="Pork">Pork</option>
            <option value="Veg">Veg</option>
            <option value="Fish">Fish</option>
            <option value="Bakery">Bakery</option>
        </select>

        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="popular">Popular</option>
        </select>

        <ul>
            {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <h3>{recipe.title}</h3>
                    {recipe.image && <img src={recipe.image} alt={recipe.title} width="100"/>}
                    <p><strong>Ingredients: </strong>{recipe.ingredients.join(', ')}</p>
                    <p><strong>Steps: </strong>{recipe.steps.join(', ')}</p>
                    <p><strong>Likes: </strong></p>
                    <button onClick = { () => afterdel_recipe(recipe._id)}>Delete</button>
                    <button onClick = { () => likerecipe(recipe._id)}>Like</button>
                </li>
            ))}
        </ul>
    </>
);
}
export default fetch_Recipe