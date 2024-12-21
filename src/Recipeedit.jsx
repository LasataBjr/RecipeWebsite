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
    const token = localStorage.getItem('token');  // Check if token exists in localStorage

    if(!token){
      alert('you need to be logged in to edit this recipe');
      navigate('/Login');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
        console.error('Error fetching recipe:', error.response ? error.response.data : error.message);
        alert('Error fetching recipe');
        navigate('/Login');
        
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append(
        'ingredients',
        formData.ingredients.split(',').map((ing) => ing.trim())
      );
      formDataToSubmit.append(
        'steps',
        formData.steps.split(',').map((step) => step.trim())
      );
  
      if (formData.image) {
        formDataToSubmit.append('image', formData.image);
      }
  
      const token = localStorage.getItem('token');
  
      const response = await axios.put(
        `http://localhost:5000/recipe/${id}`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      console.error(
        'Error updating recipe:',
        error.response ? error.response.data : error.message
      );
      alert('Error updating recipe');
    }
  };
  
  

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
