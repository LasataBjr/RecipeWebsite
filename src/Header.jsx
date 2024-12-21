import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/header.css';
import bakery from './assets/images/bakery.jpg';
import chicken from './assets/images/chicken.jpg';
import fish from './assets/images/fish.jpg';
import buffalo from './assets/images/buffalo.jpg';
import veg from './assets/images/veg.png';
import pork from './assets/images/pork.jpg';

const categories = [
    { name: 'Chicken', img: chicken, recipes: ['Chicken Curry', 'Chicken Chilly', 'Chicken Tandoori', 'Chicken Momo', 'Chicken Biryani'] },
    { name: 'Fish', img: fish, recipes: ['Fish Curry', 'Fish Fry', 'Grilled Fish', 'Fish Tacos', 'Fish Stew'] },
    { name: 'Buffalo', img: buffalo, recipes: ['Buffalo Wings', 'Buffalo Steak', 'Buffalo Chili', 'Buffalo Burgers', 'Buffalo Roast'] },
    { name: 'Pork', img: pork, recipes: ['Pork Curry', 'Pork Chops', 'BBQ Pork', 'Pork Fried Rice', 'Pork Dumplings'] },
    { name: 'Veg', img: veg, recipes: ['Vegetable Curry', 'Stir-fried Veggies', 'Veggie Pasta', 'Veggie Wraps', 'Veggie Soup'] },
    { name: 'Bakery', img: bakery, recipes: ['Bread', 'Croissant', 'Donuts', 'Cupcakes', 'Cookies'] },
];

function Head() {
    const [activePopup, setActivePopup] = useState(null);

    const openPopup = (categoryName) => {
        setActivePopup(categoryName);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
            <header>
                <div id="container">
                    {categories.map((category) => (
                        <div className="CatName" key={category.name}>
                            <a href="#" onClick={() => openPopup(category.name)}>
                                <img className="c_img" src={category.img} alt={category.name} />
                                <p className="R_title">{category.name}</p>
                            </a>
                        </div>
                    ))}
                </div>

                {activePopup && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup" onClick={(e) => e.stopPropagation()}>
                            <h2>{activePopup}</h2>
                            <ul>
                                {categories
                                    .find((category) => category.name === activePopup)
                                    .recipes.map((recipe, index) => (
                                        <li key={index}>
                                            <Link to={`/RecipePage/${recipe}`}>{recipe}</Link>
                                        </li>
                                    ))}
                            </ul>
                            <button className="close-btn" onClick={closePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Head;
