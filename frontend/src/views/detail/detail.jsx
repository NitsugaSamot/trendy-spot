import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './detail.css'
import Nav from "../../components/nav/nav";

const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState('');
  const [expanded, setExpanded] = useState(false);

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

  const carousel = (event) => {
    setImagePP(garment.image[event.target.value]);
  }

  useEffect(() => {
  }, [imagePP]);

  
    const toogleExpand = () => {
      setExpanded(!expanded);
    };

  return(

    <div className="">
      <Nav />
      <div className="theRealMaxContainer">
      <div className="carousel-inner maxContainer">
        <div className="mediumContainer">
          <div className="imageCont">

            <div className="divBtn">
            {garment.image && garment.image.map((imag, index) => (
            <button style={{backgroundImage: `url(${imag})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '5px', marginTop: "7px", border: "none"}} key={index} value={index} onClick={carousel}/>
            ))}
            </div>

            <div className="divImage">
            {garment.image && <img className="productImage" src={imagePP || garment.image[0]} alt={garment.name} />}
            {garment.price && ( 
            <div className="priceh4">
              <h4 className="therealh4">${garment.price}</h4>
            </div>
              )}
            </div>
          </div>
          
        <div className="divMaxDetails">
          <div className="allDetailsDiv">
            <hr />
            {garment.name && <h3>{garment.name}</h3>}
            <hr />
            {garment.size && <h5>Talle: {garment.size}</h5>}
            {garment.color && <h5>Color: {garment.color}</h5>}
            {garment.productbrand && <h5>{garment.productbrand}</h5>}
            <hr />
            {garment.description && <h5>{expanded ? garment.description : garment.description.slice(0, 99) + '...'}
            </h5>}
            <span style={{cursor: "pointer", marginLeft: "5px", color: "rgb(47, 203, 255)"}} onClick={toogleExpand}>{expanded ? 'Ver menos' : 'Ver mas'}</span>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>

    // <div className="">
    //     <Nav/>
    //   <div className="maxContainer">
    //     <div className="mediumContainer">
        
    //     <div className="imageCont">
    //     <img className="productImage" src={garment.image} alt={garment.name} />
    //     </div>
        
    //     <div className="divMaxDetails">
    //     <div className="allDetailsDiv">
    //     <h2>{garment.name}</h2>
    //     <br />
    //     <h5 >Talle: {garment.size}</h5>
    //     <h5 >Color: {garment.color}</h5>
    //     <hr />
    //     <h5 >{garment.productbrand}</h5>
    //     <h4 >${garment.price}</h4>
    //     <hr />
    //     <h3>{garment.description}</h3>
    //     <hr />
    //     </div>
    //     </div>
    //     </div>
    //   </div>
    // </div>
  )
};

export default Detail;