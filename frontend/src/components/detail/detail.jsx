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

  return(
    <div className="">
      <Nav/>
      <div className="maxContainer">
      <div className="mediumContainer">

      <div className="imageCont">
      <img className="productImage" src={garment.image} alt={garment.name} />
      </div>

      <div className="divMaxDetails">
      <div className="allDetailsDiv">
        <h2>{garment.name}</h2>
        <br />
        <h5 >Talle: {garment.size}</h5>
        <h5 >Color: {garment.color}</h5>
        <hr />
        <h5 >{garment.productbrand}</h5>
        <h4 >${garment.price}</h4>
        <hr />
        <h3>{garment.description}</h3>
        <hr />
      </div>
      </div>
      </div>
      </div>
    </div>
  )

  // return (
  //   <div className="nav">
  //     <Nav/>
  //     <div className="contImageprops">
  //       <div className="divImage"> 
  //       <img className="detailImage" src={garment.image} alt={garment.name} />
  //       </div>
  //       <div>
  //       <img className="backprice" src={price}/>
  //       <h4 className="detailPriceh3">${garment.price}</h4>
  //       </div>
  //       <div>

  //         <div className="details">
  //           <h2>{garment.name}</h2>
  //           <br />
  //           <h5 className="sizeprop">Talle: {garment.size}</h5>
  //           <h5 className="colorprop">Color: {garment.color}</h5>
  //           <hr />
  //           <h5 className="colorprop">{garment.productbrand}</h5>
  //           <hr />
  //           <h3>{garment.description}</h3>
  //           <hr />
  //         </div>
      
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Detail;