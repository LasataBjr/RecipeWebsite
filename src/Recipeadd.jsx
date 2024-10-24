import axios from "axios";
import { useState } from "react";
function RecipeInsertion(){
    const[category, setCategory] = useState('Veg'); //Default selection category will be veg
    const[title, setTitle] = useState('');
    const[image, setImage] = useState('');
    const[steps, setSteps] = useState([]);
    const[ingredients, setIngredients] = useState([]);
    const[stepsinput, setStepsinput] = useState('');
    const[ingredientsInput, setIngredientsInput] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipeData = {
            category,
            title,
            image: image || null,
            ingredients,
            steps

        };
        try{
            const response = await axios.post("http://localhost:5000/addRecipe", recipeData)
            alert(response.data.message);
            setTitle('');
            setImage('');
            setIngredients([]);
            setSteps([]);
            setIngredientsInput('');
            setStepsinput('');
            // if(response.status === 200)
            // {
            //     alert("Inserted Successfully")
            // }
            // else{
            //     alert("Connection error");
            // }
        }
        catch(error)
        {
            alert("Insertion Unsucessful");
        }
    }

    const addIngredient = () => {
        setIngredients([...ingredients, ingredientsInput])
        setIngredientsInput('');
    };

    const addSteps = () => {
        setSteps([...steps, stepsinput])
        setStepsinput('');
    };

    return(
        
        <>
            <form onSubmit={handleSubmit}>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Chicken">Chicken</option>
                    <option value="Buff">Buff</option>
                    <option value="Pork">Pork</option>
                    <option value="Veg">Veg</option>
                    <option value="Fish">Fish</option>
                    <option value="Bakery">Battery</option>
                </select>
                <label id="TT">Title:</label>
                <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label id="img">Image:</label>
                <input type="file" value={image} onChange ={(e) => setImage(e.target.value)}/>

                <label>Ingredients:</label>
                <textarea row= '4' cols='3' value={ingredientsInput} onChange = {(e) => setIngredientsInput(e.target.value)}></textarea>
                <button type="button" onClick={addIngredient}>AddIngredient</button>
                <ul>
                    {ingredients.map((ing, index) => (<li key={index}>{ing}</li>))}
                </ul>
                
                <label>Steps:</label>
                <input type="textarea" row= '4' cols='7' value={stepsinput} onChange={(e) => setStepsinput(e.target.value)}/>
                <button type="button" onClick={addSteps}>AddSteps</button>
                <ul>
                    {steps.map((st, index) => (<li
                        key={index}>{st}
                    </li>))}
                </ul>
                <button type="submit">Add</button>

            </form>
        </>
    )

}export default RecipeInsertion