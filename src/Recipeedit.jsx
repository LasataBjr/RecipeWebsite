import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    image: null,
  });

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');  // Check if token exists in localStorage

    if (!token) {
      alert('You need to be logged in to edit this recipe');
      navigate('/Login');  // Redirect to login if token is not found
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipeedit/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in the request header
          },
        });
        setRecipe(response.data);
        setFormData({
          title: response.data.title,
          ingredients: response.data.ingredients.join(', '),
          steps: response.data.steps.join(', '),
          image: response.data.image || null,
        });
      } catch (error) {
        console.error('Error fetching recipe:', error);
        alert('Error fetching recipe');
        navigate('/Login');  // Redirect if there’s an error fetching the recipe
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('ingredients', formData.ingredients.split(', '));
    data.append('steps', formData.steps.split(', '));
    if (formData.image) {
      data.append('image', formData.image);
    }

    const token = localStorage.getItem('authToken');  // Ensure you retrieve the token before sending the request

    if (!token) {
      alert('You need to be logged in to edit this recipe');
      navigate('/Login');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/recipeedit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in the request headers
        },
      });
      alert('Recipe updated successfully');
      navigate('/recipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Error updating recipe');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Steps (comma separated):</label>
          <input
            type="text"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
