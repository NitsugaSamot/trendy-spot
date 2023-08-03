import { useState } from "react";
import axios from "axios";


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
    setErrors(validation({...form, [event.target.name]: event.target.value}))
    setForm({...form, [event.target.name]: event.target.value});
  };

  const handleSize = (event) => {
    setForm({...form, size: event.target.value})
  }
  const handleSubmit =async(event) => {
    event.preventDefault()
    const response = await axios.post('http://localhost:3004/products/create', form);
    alert(response.data)

  }

  return (
    <div>
      <h1>ingresar prenda</h1>
      <form>
        <label>name
          <input type='text' name='name' value={form.name} onChange={handleChange}></input>
        </label>

        <select onChange={handleSize}>
          {sizes.map((prenda)=>{
            return (
            <option key={prenda} name={prenda} value={prenda}>{prenda}</option>
            )
  })}
        </select>

        <label>price
          <input type='text' name='price' value={form.price} onChange={handleChange}></input>
        </label>

        <label>image
          <input type='text' name='image' value={form.image} onChange={handleChange}></input>
        </label>

        <label>description
          <input type='text' name='description' value={form.description} onChange={handleChange}></input>
        </label>

        <label>stock
          <input type='string' name='stock' value={form.stock} onChange={handleChange}></input>
        </label>

        <label>color
          <input type='string' name='color' value={form.color} onChange={handleChange}></input>
        </label>

        <label>productbrand
          <input type='string' name='productbrand' value={form.productbrand} onChange={handleChange}></input>
        </label>

        <button type='submit' /* disabled={Object.keys(errors).length > 0 || form.name.length < 1} */ onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};
export default CreateProduct;