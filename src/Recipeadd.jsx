import axios from "axios";
import { useState } from "react";
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
                    <option value="Bakery">Bakery</option>
                </select>
                <label id="TT">Title:</label>
                <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label id="img">Image:</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
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