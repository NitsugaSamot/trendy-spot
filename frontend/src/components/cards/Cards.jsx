import React from 'react'
// import './CardsStyles.css'
import Card from '../card/card';


const Cards = ({ products }) => {
  // console.log(recipes);
  return (
    <div className="cardsContainer">
      {products &&
        products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
    </div>
  );
};
export default Cards