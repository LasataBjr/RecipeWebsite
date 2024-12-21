import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        title: "",
        category: "",
        ingredients: "",
        steps: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/get_recipes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setNewRecipe({ ...newRecipe, image: file });
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const addRecipe = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newRecipe.title);
        formData.append("category", newRecipe.category);
        formData.append("ingredients", JSON.stringify(newRecipe.ingredients.split(",")));
        formData.append("steps", JSON.stringify(newRecipe.steps.split(",")));
        if (newRecipe.image) {
            formData.append("image", newRecipe.image);
        }

        try {
            await axios.post("http://localhost:5000/addRecipe", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Recipe added successfully!");
            setNewRecipe({ title: "", category: "", ingredients: "", steps: "", image: null });
            fetchRecipes();
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe.");
        }
    };

    const deleteRecipe = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;

        try {
            await axios.delete(`http://localhost:5000/del_recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Recipe deleted successfully!");
            fetchRecipes();
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("Failed to delete recipe.");
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div>
                <h2>Add New Recipe</h2>
                <form onSubmit={addRecipe}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Recipe Title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category (e.g., Chicken, Fish)"
                        value={newRecipe.category}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="ingredients"
                        placeholder="Ingredients (comma-separated)"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="steps"
                        placeholder="Steps (comma-separated)"
                        value={newRecipe.steps}
                        onChange={handleInputChange}
                        required
                    />
                    <input type="file" name="image" onChange={handleFileChange} />
                    <button type="submit">Add Recipe</button>
                </form>
            </div>

            <div>
                <h2>Manage Recipes</h2>
                {loading ? (
                    <p>Loading recipes...</p>
                ) : recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id}>
                            <h3>{recipe.title}</h3>
                            <p>Category: {recipe.category}</p>
                            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
                            <p>Steps: {recipe.steps.join(", ")}</p>
                            {recipe.image ? (
                                <img src={recipe.image} alt={recipe.title} style={{ width: "100px" }} />
                            ) : (
                                <p>No image available</p>
                            )}
                            <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No recipes available.</p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
