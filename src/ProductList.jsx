import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';
import peace_lily from './images/peace_lily.jpg'; 
import snake_plant from './images/snake_plant.jpg';
import aloe_vera from './images/aloe_vera.jpg';
import rose_bush from './images/rose_bush.jpg';
import lavender from './images/lavender.jpg';
import marigold from './images/marigold.jpg';
import echeveria from './images/echeveria.jpg';
import jade_plant from './images/jade_plant.jpg';
import haworthia from './images/haworthia.webp';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const totalQuantity = useSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const plantsArray = [
   {
    category: "Indoor Plants",
    plants: [
      { 
        name: "Peace Lily", 
        image: peace_lily, 
        description: "Elegant indoor plant, purifies the air.", 
        cost: "$120" 
      },
      { 
        name: "Snake Plant", 
        image: aloe_vera, 
        description: "Low-maintenance, ideal for bedrooms.", 
        cost: "$100" 
      },
      { 
        name: "Aloe Vera", 
        image: snake_plant, 
        description: "Medicinal plant, thrives indoors.", 
        cost: "$90" 
      },
    ]
  },
  {
    category: "Outdoor Plants",
    plants: [
      { 
        name: "Rose Bush", 
        image: rose_bush, 
        description: "Beautiful flowering plant, ideal for gardens.", 
        cost: "$150" 
      },
      { 
        name: "Lavender", 
        image: lavender, 
        description: "Fragrant herb, attracts pollinators.", 
        cost: "$120" 
      },
      { 
        name: "Marigold", 
        image: marigold, 
        description: "Bright and easy-to-grow outdoor flower.", 
        cost: "$80" 
      },
    ]
  },
  {
    category: "Succulents",
    plants: [
      { 
        name: "Echeveria", 
        image: echeveria, 
        description: "Small rosette succulent, low water needs.", 
        cost: "$70" 
      },
      { 
        name: "Jade Plant", 
        image: jade_plant, 
        description: "Popular succulent, symbolizes prosperity.", 
        cost: "$110" 
      },
      {
        name: "Haworthia", 
        image: haworthia, 
        description: "Small, hardy succulent, easy to maintain.", 
        cost: "$60" 
      },
    ]
  }
];


    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // ✅ fixed typo here
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

   const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prev) => ({
    ...prev,
    [plant.name]: true, // only this plant’s button gets disabled
  }));
};


    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                <rect width="156" height="156" fill="none"></rect>
                                <circle cx="80" cy="216" r="12"></circle>
                                <circle cx="184" cy="216" r="12"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                        </h1>
                    </a></div>
                </div>
            </div>

            {!showCart ? (
                  <div className="product-grid">
                    {plantsArray.map((categoryItem, catIndex) => (
                      <div key={catIndex}>
                        <h2>{categoryItem.category}</h2>
                        <div className="product-list">
                          {categoryItem.plants.map((plant, index) => (
                            <div className="product-card" key={index}>
                              <h3>{plant.name}</h3>
                              <img
                                src={plant.image}
                                alt={plant.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                              />
                              <p>{plant.description}</p>
                              <p><strong>{plant.cost}</strong></p>
                              <button onClick={() => handleAddToCart(plant)}
                                disabled={addedToCart[plant.name] === true }
                              >
                                {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <CartItem onContinueShopping={handleContinueShopping} />
                )}

        </div>
    );
}

export default ProductList;
