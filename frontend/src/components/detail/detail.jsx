import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './detail.css'
import price from "../detail/price.png"
import StarRating from "../stars/stars"

const Detail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const [garment, setGarment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/products/${id}`);
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del producto");
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="nav">
      <div className="contImage">
        <img className="detailImage" src={garment.image} alt={garment.name} />

        <div>
          <img className="blueTag" src={price} />
          <h4 className="priceTag">${garment.price}</h4>
        </div>

        <div>
          <div className="details">
            <h2 className="name">{garment.name}</h2>

            <div className="starPos">
              <StarRating  productId={productId} />
            </div>

            <h5 className="exDetail">
              Tamaño: &nbsp; {garment.size}
              <br />Color: &nbsp; {garment.color}
              <br />Stock: &nbsp; {garment.stock}
            </h5>

            <h3 className="description">DESCRIPCIÓN: <br />{garment.description}</h3>

            <hr />

            <Link to="/carrito">
              <button className="btnCashout">Añadir al carrito</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
