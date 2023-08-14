import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    // Obtener el promedio de valoración desde el backend
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`/api/detail/${productId}/average-rating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error al obtener el promedio de valoración:', error);
    }
  };

  const handleRatingClick = async (rating) => {
    try {
      const response = await axios.post(`/api/products/${productId}/ratings`, { rating });
      setUserRating(response.data.rating);
      // Actualizar el promedio de valoración después de crear una valoración
      fetchAverageRating();
    } catch (error) {
      console.error('Error al crear la valoración:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${userRating === i ? 'selected' : ''}`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {averageRating !== null && (
        <p>Promedio de valoración: {averageRating.toFixed(2)} estrellas</p>
      )}
      <div className="stars">{renderStars()}</div>
    </div>
  );
};

export default StarRating;
