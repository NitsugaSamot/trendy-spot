import React, { useState } from "react";
import axios from "axios";
import validation from "./validation";
import "./createProduct.css";

const CreateProduct = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const predefinedColors = ["red", "black", "white", "blue", "green", "yellow", "orange", "brown", "beige", "purple", "pink", "grey"];

  const [form, setForm] = useState({
    name: "",
    size: "",
    price: "",
    image: "",
    description: "",
    stock: "",
    colors: [],
    brand: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedColors = checked
        ? [...form.colors, value]
        : form.colors.filter((color) => color !== value);
      setForm({ ...form, colors: updatedColors });
      setErrors(validation({ ...form, colors: updatedColors }));
    } else {
      setForm({ ...form, [name]: value });
      setErrors(validation({ ...form, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postForm = { ...form };
    // Resto del código para manejar el envío del formulario
    console.log("Formulario enviado:", postForm);
    setForm({
      name: "",
      size: "",
      price: "",
      image: "",
      description: "",
      stock: "",
      colors: [],
      brand: "",
    });
    alert("The product has been created");
  };

  return (
    <div className="mainContainer">
      <div className="tomasSeco"></div>
      <hr />
      <h3 className="mb-4">Ingresar Prenda</h3>
      <form className="form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <select
            className={`form-select ${errors.size ? "is-invalid" : ""}`}
            id="size"
            onChange={handleChange}
            value={form.size}
            name="size"
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
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="input"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Colors</label>
          <div className="color-options">
            {predefinedColors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  name="colors"
                  value={color}
                  checked={form.colors.includes(color)}
                  onChange={handleChange}
                />
                <span
                  className={`color-box ${
                    form.colors.includes(color) ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                ></span>
              </label>
            ))}
          </div>
          {errors.colors && (
            <div className="invalid-feedback">{errors.colors}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            className={`form-control ${errors.brand ? "is-invalid" : ""}`}
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
          {errors.brand && (
            <div className="invalid-feedback">{errors.brand}</div>
          )}
        </div>

        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={Object.keys(errors).length > 0 || form.name.length < 1}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
