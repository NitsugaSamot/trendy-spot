import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";
import axios from 'axios';

import NavClient from '../nav-client/NavClient'
// import Nav from "../nav/nav";
import price from "../detail/price.png"
import './detail.css'
import { useDispatch } from "react-redux";

// Definición del componente funcional "Detail"
const Detail = () => {
  // Extraer el parámetro "id" de la URL utilizando useParams de react-router-dom
  const { id } = useParams();
  const dispatch = useDispatch()
  
  // Estado para almacenar la información de la prenda actual
  const [garment, setGarment] = useState({});
  
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

  // UseEffect se utiliza para realizar efectos secundarios en el componente, en este caso, obtener los datos de la prenda
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET utilizando Axios para obtener los detalles de la prenda con el ID proporcionado
        const response = await axios.get(`http://localhost:3004/products/${id}`);
        const { data } = response;
        // Actualizar el estado "garment" con los datos obtenidos
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    }
    fetchData(); // Llamar a la función para obtener los datos cuando cambie el ID
  }, [id]); // El efecto se ejecutará cada vez que el ID cambie


  // Manejador para agregar la prenda actual al carrito
  const handleAddToCart = () => {
    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      name: garment.name,
      price: garment.price,
      description: garment.description,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    setShowModal(true);
  };

  // Estructura del componente de la interfaz de usuario
  return (
    <div className="nav">
      <NavClient /> {/* Renderizar el componente de navegación */}
      <div className="contImageprops">
        {/* Mostrar la imagen y el precio de la prenda */}
        <img className="detailImage" src={garment.image} alt={garment.name} />
        <div>
          <img className="backprice" src={price} />
          <h4 className="detailPriceh3">${garment.price}</h4>
        </div>
        <div>
          {/* Mostrar detalles de la prenda */}
          <div className="details">
            <h2>{garment.name}</h2>
            <br />
            <h5 className="sizeprop">Talle: {garment.size}</h5>
            <h5 className="colorprop">Color: {garment.color}</h5>
            <hr />
            <h5 className="colorprop">{garment.productbrand}</h5>
            <hr />
            <h3>{garment.description}</h3>
            <hr />
          </div>
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
  );
};

export default Detail; // Exportar el componente "Detail" para su uso en otras partes de la aplicación
