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
  event.target.value !== "" && setForm({ ...form, size: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postForm = form;
    const idPrenda = postForm.image.split("/d/");
    const idSinView = idPrenda[1].split("/");
    const idUltimo = `https://drive.google.com/uc?id=${idSinView[0]}`;
    postForm.image = idUltimo;
    await axios.post("http://localhost:3004/products/create", postForm);
    alert("The product has been created");
  };

  return (
    <div className="container mt-5 divAllForm">
      <h1 className="mb-4">Ingresar Prenda</h1>
      <form>
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
            onChange={handleSize}
            value={form.size}
          >
            <option value="">Choose a size</option>
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
            type="text"
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
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            className={`form-control ${errors.color ? "is-invalid" : ""}`}
            id="color"
            name="color"
            value={form.color}
            onChange={handleChange}
          />
          {errors.color && (
            <div className="invalid-feedback">{errors.color}</div>
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
