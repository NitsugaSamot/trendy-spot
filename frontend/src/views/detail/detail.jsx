import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";
import axios from 'axios';

import Nav from "../../components/nav/nav";

import './detail.css'
import { useDispatch } from "react-redux";
const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState('');
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

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

    // Manejador para agregar la prenda actual al carrito
  const handleAddToCart = () => {
    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      name: garment.name,
      price: garment.price,
      description: garment.description,
      stock: garment.stock,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    setShowModal(true);
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
              <hr />
              <h4 className="therealh4">${garment.price}</h4>
              <hr />
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
            
            {/* Botón para agregar la prenda al carrito */}
          <button onClick={handleAddToCart}>Añadir al carrito</button>
          
          {/* Modal para mostrar cuando se agrega un producto al carrito */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Producto agregado al carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Mostrar detalles del producto recién añadido en el modal */}
              <p>Nombre: {garment.name}</p>
              <p>Precio: ${garment.price}</p>
              {/* Puedes agregar más detalles aquí si es necesario */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

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