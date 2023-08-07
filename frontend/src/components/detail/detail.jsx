import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './detail.css'
import Nav from "../nav/nav";
import price from "../detail/price.png"
const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/products/${id}`);
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    }
    fetchData();
  }, [id])

  return (
    <div className="nav">
      <Nav/>
      <div className="contImageprops">
        <img className="detailImage" src={garment.image} alt={garment.name} />
        
        <div>
        <img className="backprice" src={price}/>
        <h4 className="detailPriceh3">${garment.price}</h4>
        </div>

        <div>
          <div className="details">
            <h2 className="name">{garment.name}</h2>

            <h5 className="exDetail">Tamaño: &nbsp; {garment.size}<br />Color: &nbsp; {garment.color}</h5>

            <h3 className="description">DESCRIPCIÓN: <br />{garment.description}</h3>
            
            <hr />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Detail;