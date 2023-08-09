import React, { useState } from "react";
import axios from "axios";
import validation from "./validation";
import "./createProduct.css";

const CreateProduct = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [form, setForm] = useState({
    name: "",
    size: "",
    price: "",
    image: "",
    description: "",
    stock: "",
    color: "",
    brand: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors(validation({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSize = (event) => {
    setForm({ ...form, size: event.target.value });
    setErrors(validation({ ...form, size: event.target.value}));
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postForm = form;
    const idPrenda = postForm.image.split("/d/");
    const idSinView = idPrenda[1].split("/");
    const idUltimo = `https://drive.google.com/uc?id=${idSinView[0]}`;
    postForm.image = idUltimo;

    //----------------------------toLowerCase a los string y toUpperCase a la primera letra de cada palabra------------------
    const lower = postForm.brand.toLocaleLowerCase()
    let array = lower.split(" ")
    let losArrays = array.map(palabra => {
      return palabra[0].toUpperCase() + palabra.slice(1);
    })
  
    const resultado = losArrays.join(" ");
    postForm.brand = resultado
//------------------------------------------------------------------------------------------------------------------------
    await axios.post("http://localhost:3004/products/create", postForm);
    setForm({
      name: "",
      size: "",
      price: "",
      image: "",
      description: "",
      stock: "",
      color: "",
      brand: "",
    });
    alert("The product has been created");
  };

  return (
    <div>
      <div className="allDiv">
      <div className="tomasSeco"></div>
      <div className="divForm">
      <form className="form">

      <h3 className="mb-4 h3">Ingresar Prenda</h3>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${!errors.name && form.name !== "" ? "is-valid" : "is-invalid"}`}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            autocomplete="off"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <select
            className={`form-select ${!errors.size && form.size !== "" ? "is-valid" : "is-invalid"}`}
            id="size"
            onChange={handleSize}
            value={form.size}
          >
            <option value="" disabled>Choose a size</option>
            {sizes.map((prenda) => (
              <option key={prenda} value={prenda}>
                {prenda}
              </option>
            ))}
          </select>
          {errors.size && (
            <div className="invalid-feedback">{errors.size}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="number"
            className={`form-control ${!errors.price && form.price !== "" ? "is-valid" : "is-invalid"}`}
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Insert Price"
            autocomplete="off"
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${!errors.image && form.image !== "" ? "is-valid" : "is-invalid"}`}
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image"
            autocomplete="off"
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${!errors.description && form.description !== "" ? "is-valid" : "is-invalid"}`}
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a description"
            autocomplete="off"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="number"
            className={`form-control ${!errors.stock && form.stock ? "is-valid" : "is-invalid"}`}
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Insert Stock"
            autocomplete="off"
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${!errors.color && form.color !== "" ? "is-valid" : "is-invalid"}`}
            id="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
            autocomplete="off"
          />
          {errors.color && (
            <div className="invalid-feedback">{errors.color}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${!errors.brand && form.brand !== "" ? "is-valid" : "is-invalid"}`}
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            autocomplete="off"
          />
          {errors.brand && (
            <div className="invalid-feedback">{errors.brand}</div>
          )}
        </div>

        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            className="btnForm"
            disabled={Object.keys(errors).length > 0 || form.name.length < 1}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default CreateProduct;
