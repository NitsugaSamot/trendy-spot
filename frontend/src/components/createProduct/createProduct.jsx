import { useState } from "react";
// import axios from "axios";
import validation from "./validation";
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
    const postForm = form
    const idPrenda = postForm.image.split('/d/')
    const idSinView = idPrenda[1].split('/')
    const idUltimo = `https://drive.google.com/uc?id=${idSinView[0]}`
    postForm.image = idUltimo

    // const response = await axios.post('http://localhost:3004/products/create', postForm);
    alert("the product has been created");
  }

  return (
    <div>
      <h1>ingresar prenda</h1>
      <form>
        <label>
          name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.name}</span>

        <select onChange={handleSize}>
          {sizes.map((prenda) => {
            return (
              <option key={prenda} name={prenda} value={prenda}>
                {prenda}
              </option>
            );
          })}
        </select>

        <label>
          price
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.price}</span>

        <label>
          image
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.image}</span>

        <label>
          description
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.description}</span>

        <label>
          stock
          <input
            type="string"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.stock}</span>

        <label>
          color
          <input
            type="string"
            name="color"
            value={form.color}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.color}</span>

        <label>
          productbrand
          <input
            type="string"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          ></input>
        </label>
        <span className="spanError">{errors.brand}</span>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || form.name.length < 1}  onClick={
            handleSubmit
          }
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateProduct;