import React, { useState } from "react";
import axios from "axios";
import validation from "./validation";
import "./createProduct.css";

const CreateProduct = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [image, setImage] = useState({
    principal: "",
    secundaria: "",
    extra:""
  });
  const [loading, setLoading] = useState(false);
  // const [endpoint, setEndpoint] = useState("");

  const [form, setForm] = useState({
    name: "",
    size: "",
    price: "",
    image: "",
    description: "",
    stock: {
      verde: "3",
    },
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
    setErrors(validation({ ...form, size: event.target.value }));
  };

  //***carga de imagenes*************** */
  const uploadImage = async (event) => {
    const name = event.target.name;
    const files = event.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Trendy");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpqsnv9bu/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();
    setImage({ ...image, [name]: file.secure_url });
    setLoading(false);
  };

  // const handleEndPoint = (event) => {
  //   setEndpoint(event.target.value);
  // };

  const handleDeleteImg = (event) => {
    const name = event.target.name;
    setImage({ ...image, [name]: "" });
  };


  form.image = image;
  console.log();
  //********************** */
  const handleSubmit = async (event) => {
    event.preventDefault();

    //----------------------------toLowerCase a los string y toUpperCase a la primera letra de cada palabra------------------
    const postForm = form;
    const lower = postForm.brand.toLocaleLowerCase();
    let array = lower.split(" ");
    let losArrays = array.map((palabra) => {
      return palabra[0].toUpperCase() + palabra.slice(1);
    });

    const resultado = losArrays.join(" ");
    postForm.brand = resultado;
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
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
            <option value="" disabled>
              Choose a size
            </option>
            {sizes.map((prenda) => (
              <option key={prenda} value={prenda}>
                {prenda}
              </option>
            ))}
          </select>
          {errors.size && <div className="invalid-feedback">{errors.size}</div>}
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
        {/* ***************************** */}
        <div>
          <h1>Subiendo Imagenes</h1>
          <label>
            principal
            <input
              type="file"
              name="principal"
              placeholder="Sube tu imagen aqui!"
              onChange={uploadImage}
            />
          </label>
          {loading ? (
            <h3>Cargando Imagenes...</h3>
          ) : (
            <div>
              <img src={image.principal} alt="" width="100px" />
              {image.principal ? (
                <button name="principal" onClick={handleDeleteImg}>
                  boton
                </button>
              ) : null}
            </div>
          )}
          <label>
            secundaria
            <input
              type="file"
              name="secundaria"
              placeholder="Sube tu imagen aqui!"
              onChange={uploadImage}
            />
          </label>
          {loading ? (
            <h3>Cargando Imagenes...</h3>
          ) : (
            <div>
              <img src={image.secundaria} alt="" width="100px" />
              {image.secundaria ? (
                <button name="secundaria" onClick={handleDeleteImg}>
                  boton
                </button>
              ) : null}
            </div>
          )}
          <label>
            extra
            <input
              type="file"
              name="extra"
              placeholder="Sube tu imagen aqui!"
              onChange={uploadImage}
            />
          </label>
          {loading ? (
            <h3>Cargando Imagenes...</h3>
          ) : (
            <div>
              <img src={image.extra} alt="" width="100px" />
              {image.extra ? (
                <button name="extra" onClick={handleDeleteImg}>
                  boton
                </button>
              ) : null}
            </div>
          )}
          {/* <label>
            ruta de la imagen
            <input
              type="text"
              value={endpoint}
              placeholder="Sube tu endpoint"
              onChange={handleEndPoint}
            />
          </label> */}
        </div>

        {/* *************************** */}

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
