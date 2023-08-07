import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="divAllDetail">
      <h1>{garment.name}</h1>
      <img src={garment.image} alt={garment.name} />
      <h3>$ {garment.price}</h3>
      <h3>$ {garment.description}</h3>
      <h3>$ {garment.brand}</h3>
      <h3>$ {garment.stock}</h3>
      <h3>$ {garment.color}</h3>
    </div>
  );
};

export default Detail;
