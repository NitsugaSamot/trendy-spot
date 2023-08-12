import React, { useState } from "react";
import axios from "axios";
import validation from "./validation";
import "./createProduct.css";
import Nav from "../../components/nav/nav";

const CreateProduct = () => {
  const [imagePP, setImagePP] = useState("");
  // const [endpoint, setEndpoint] = useState("");
  const [image, setImage] = useState({
    principal: "",
    secundaria: "",
    extra:""
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: {},
    description: "",
    stock: {
      S: {
        white: '',
        black: '',
        grey: ''
      },
      M: {
        white: '',
        black: '',
        grey: ''
      },
      L: {
        white: '',
        black: '',
        grey: ''
      },
      XL: {
        white: '',
        black: '',
        grey: ''
      }
    },
    brand: "",
  });
  const [stock, setStock] = useState({
      S: {
        white: '',
        black: '',
        grey: ''
      },
      M: {
        white: '',
        black: '',
        grey: ''
      },
      L: {
        white: '',
        black: '',
        grey: ''
      },
      XL: {
        white: '',
        black: '',
        grey: ''
      }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors(validation({ ...form, [event.target.name]: event.target.value }));
    console.log(form);
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
    console.log(value,name,id);

    setStock({...stock, [name]: {[id]: value}})
  console.log(stock);
};

  const carousel = (event) => {
    setImagePP(form.image[event.target.value]);
  }

  form.image = image;
  form.stock = stock;
  
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
      price: "",
      image: {},
      description: "",
      stock: {
        S: {
          white: '',
          black: '',
          grey: ''
        },
        M: {
          white: '',
          black: '',
          grey: ''
        },
        L: {
          white: '',
          black: '',
          grey: ''
        },
        XL: {
          white: '',
          black: '',
          grey: ''
        }
      },
      brand: ""
    });
    alert("The product has been created");
  };
  
  return (
    <div className="">
      <Nav/>
      <div className="allDiv">
      <div className="tomasSeco">
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

        <div className="maxContainerStock">
            <h5>Colors</h5>
        </div>
        {errors.stock && (
            <div className="">{errors.stock}</div>
            )}
        <div className="divStock">
          <div>
            <label>S:</label>
            </div>
            <div className="theRealLabelDiv">
        <label className="stockWhite">
          <input 
           style={{color: "black"}}
          className="input-goup"
          id='white'
          name='S'
          type="number"
          min="0" 
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlack">
          <input 
          className="input-goup"
          id='black'
          name='S'
          type="number"
          min="0" 
          onChange={handleInputStock}
          />
        </label>

        <label className="stockGrey">
          <input 
          className="input-goup"
          id='grey'
          name='S'
          type="number"
          min="0" 
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlue">
          <input 
          className="input-goup"
          id='BLUE'
          name='S'
          type="number"
          min="0" 
          onChange={handleInputStock}
          />
        </label>


        </div>
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
            {/* *********** */}
            <div className="divImagenes">
            <div className="theRealDiv">

                <div className="buttonStyles">
                 {loading ? (
                   <h5>Cargando Imagenes...</h5>
                   ) : (
                     <div className="imageButtonContainer">
                       <hr />
                  {image.principal ? (
                    <button className="btn-close" aria-label="Close" name="principal" onClick={handleDeleteImg}/>
                  ) : null}
                  <button style={{backgroundImage: `url(${image.principal})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: "none"}} value='principal' onClick={carousel} className="imageUploaded">Frente</button>
                    <hr />
                </div>
              )}

              {loading ? (
                <h5>Cargando Imagenes...</h5>
              ) : (
                <div className="imageButtonContainer">
                  <hr />                 
                  {image.secundaria ? (
                    <button className="btn-close" aria-label="Close" name="secundaria" onClick={handleDeleteImg}/>
                    ) : null}
                    <button style={{backgroundImage: `url(${image.secundaria})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='secundaria' onClick={carousel} className="imageUploaded">Dorso</button>   
                    <hr />
                  </div>             
              )}

              {loading ? (
                <h5>Cargando Imagenes...</h5>
              ) : (
                <div className="imageButtonContainer">
                  <hr />
                  {image.extra ? (
                    <button className="btn-close" aria-label="Close" name="extra" onClick={handleDeleteImg}/>
                  ) : null}       
                  <button style={{backgroundImage: `url(${image.extra})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='extra' onClick={carousel} className="imageUploaded">Extra</button>
                  <hr />
                </div>
              )}
              </div>
              <div className="containerImage">
              {form.image && <img className="productImage" src={imagePP || form.image[0]}/>}
              </div>
              </div>


            <div className="divInputs">
              <input
                  type="file"
                  name="principal"
                  onChange={uploadImage}
              />
              
              <input
                type="file"
                name="secundaria"
                onChange={uploadImage}
              />
          
              <input
                type="file"
                name="extra"
                onChange={uploadImage}
              />
            </div>
         
              
    

                
              
            </div>
    
            {/* ********* */}

      </div>
      </div>
    </div>
  );
};

export default CreateProduct;
