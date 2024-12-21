import axios from "axios";
import { useState } from "react";
import './assets/css/Adrecipe.css';
function RecipeInsertion(){
    const[category, setCategory] = useState('Veg'); //Default selection category will be veg
    const[title, setTitle] = useState('');
    const[image, setImage] = useState(null);
    const[steps, setSteps] = useState([]);
    const[ingredients, setIngredients] = useState([]);
    const[stepsinput, setStepsinput] = useState('');
    const[ingredientsInput, setIngredientsInput] = useState('');
    

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };
    //     if (file){
    //         reader.readAsDataURL(file);
    //     }
    // }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('image', image);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('steps', JSON.stringify(steps));

            
        try {
            const response = await axios.post("http://localhost:5000/addRecipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setTitle('');
            setImage(null);
            setIngredients([]);
            setSteps([]);
            setIngredientsInput('');
            setStepsinput('');
        } catch (error) {
            alert("Insertion Unsuccessful");
        }
            // if(response.status === 200)
            // {
            //     alert("Inserted Successfully")
            // }
            // else{
            //     alert("Connection error");
            // }
        
    };
    const addIngredient = () => {
        const newIngredients = ingredientsInput
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient); // Filter out empty strings
        setIngredients([...ingredients, ...newIngredients]);
        setIngredientsInput('');
    };

    const addSteps = () => {
        const newSteps = stepsinput // Corrected the variable name to match your state
            .split('.')
            .map(step => step.trim())
            .filter(step => step); // Filter out empty strings
        setSteps([...steps, ...newSteps]);
        setStepsinput('');
    };
    // const addIngredient = () => {
    //     setIngredients([...ingredients, ingredientsInput])
    //     setIngredientsInput('');
    // };

    // const addSteps = () => {
    //     setSteps([...steps, stepsinput])
    //     setStepsinput('');
    // };

    return(
        
        <>
            <h2>Add New Recipe</h2>
            <form id="addrecipe_form" onSubmit={handleSubmit}>
                <label className="label">Category:</label>
                <select id ="category"value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Chicken">Chicken</option>
                    <option value="Buff">Buff</option>
                    <option value="Pork">Pork</option>
                    <option value="Veg">Veg</option>
                    <option value="Fish">Fish</option>
                    <option value="Bakery">Bakery</option>
                </select>
                <label className="label">Title:</label>
                <input className="addinput" type="text" value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label className="label">Image:</label>
                <input className="addinput" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <label className="label">Ingredients:</label>
                <textarea className="addinput" row= '4' cols='3' value={ingredientsInput} onChange = {(e) => setIngredientsInput(e.target.value)}></textarea>
                <button class="addbtn" type="button" onClick={addIngredient}>Add Ingredient</button>
                <ul>
                    {ingredients.map((ing, index) => (<li key={index}>{ing}</li>))}
                </ul>
                
                <label className="label">Steps:</label>
                <textarea className="addinput" row='4' cols='7' value={stepsinput} onChange={(e) => setStepsinput(e.target.value)}></textarea>
                <button class="addbtn" type="button" onClick={addSteps}>Add Steps</button>
                <ul>
                    {steps.map((st, index) => (<li
                        key={index}>{st}
                    </li>))}
                </ul>
                <button class="addbtn submit" type="submit">Add</button>

            </form>
        </>
    )

}export default RecipeInsertion