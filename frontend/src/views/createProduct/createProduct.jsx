import React, { useState } from "react";
import axios from "axios";
import validation from "./validation";
import "./createProduct.css";

const CreateProduct = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // const [endpoint, setEndpoint] = useState("");
  const [image, setImage] = useState({
    principal: "",
    secundaria: "",
    extra:""
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    size: "",
    price: "",
    image: {},
    description: "",
    stock: "",
    color: "",
    brand: "",
  });
  const [stock, setStock] = useState({})
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors(validation({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSize = (event) => {
    setForm({ ...form, size: event.target.value });
    setErrors(validation({ ...form, size: event.target.value}));
    };

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
    console.log(file.secure_url)
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

  const handleInputStock = (event) => {
    const {value, name, id} = event.target;
    const object = {
      color: id,
      size: name,
      stock: value,
    }
    setStock({...stock, })
  };

  form.image = image;

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
      image: {},
      description: "",
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

        {/* *********** */}
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

        {/* ********* */}

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

        <div className="divStock">
        <label style={{backgroundColor: "red"}}>
          <input 
          id='white'
          name='S'
          type="number"
          min="0" 
          onChange={handleInputStock}
          />
        </label>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default CreateProduct;
