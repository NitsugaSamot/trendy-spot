import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});

  useEffect(()=>{
    const fetchData = async ()=>{
    try{
      const response = await axios.get(`http://localhost:3001/${id}`);
      const { data } = response;
      setGarment(data);
    } catch (error) {
      window.alert("Error al obtener los datos del personaje");
    }
  }
  fetchData();
  }, [id])

  return (
    <div>
              <h1>{data.name}</h1>
              <img src={prenda.image} alt={data.name} />
              <h3>$ {data.price}</h3>
    </div>
  );
};

export default Detail;
