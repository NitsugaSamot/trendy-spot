import { useState } from "react";
import axios from "axios";
import validation from "./valitadion";
import "./createProduct.css" 

const CreateProduct = () => {

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [form, setForm] = useState({
    name:'',  //string
    size:'', //string
    price:'', //integer
    image:'', //string
    description:'', //string
    stock:'', //integer
    color:'', //string
    brand:'', //string
  });

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
    setErrors(validation({...form, [event.target.name]: event.target.value}))
  };
console.log(errors)
  const handleSize = (event) => {
    setForm({...form, size: event.target.value})
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    //---------------- corta URL se queda con lo q sirve y lo concatena con lo q necesita, y lo agrega al post---------------
    const postForm = form;
    const idPrenda = postForm.image.split('/d/');
    const idSinView = idPrenda[1].split('/');
    const idUltimo = `https://drive.google.com/uc?id=${idSinView[0]}`;
    postForm.image = idUltimo;
    //-----------------------------------------------------------------------------------------------------------------------
    const response = await axios.post('http://localhost:3004/products/create', postForm);
    alert(response.data);
  }

  return (
    <div>
      <h1>este es el form</h1>
    </div>
  );
};
export default CreateProduct;