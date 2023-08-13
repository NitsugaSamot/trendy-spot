import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./detail.css";
import Nav from "../../components/nav/nav";

const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [stockComb, setStockComb] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    };
    fetchData();
  }, [id]);

  const carousel = (event) => {
    setImagePP(garment.image[event.target.value]);
  };

  useEffect(() => {}, [imagePP]);

  const toogleExpand = () => {
    setExpanded(!expanded);
  };

  // garment.stock = {
  //   s: {
  //     blanco: 19,
  //     negro: 3,
  //     rojo: 2,
  //     verde: 1,
  //     azul: 0,
  //     amarillo: 1,
  //     rosa: 0,
  //   },
  //   m: {
  //     blanco: 0,
  //     negro: 3,
  //     rojo: 2,
  //     verde: 0,
  //     azul: 0,
  //     amarillo: 1,
  //     rosa: 6,
  //   },
  //   l: {
  //     blanco: 0,
  //     negro: 3,
  //     rojo: 2,
  //     verde: 1,
  //     azul: 2,
  //     amarillo: 1,
  //     rosa: 6,
  //   },
  //   xl: {
  //     blanco: 0,
  //     negro: 3,
  //     rojo: 23,
  //     verde: 0,
  //     azul: 0,
  //     amarillo: 0,
  //     rosa: 0,
  //   },
  // };

  const handleClickStock = (event, stock = garment.stock) => {
    setColorsAvailable([]);
    setSize(event.target.value);

    for (let index in stock[size]) {
      if (stock[size][index] > 0) {
        console.log(index);
        setColorsAvailable((colorsAvailable) => [...colorsAvailable, index]);
        console.log(colorsAvailable);
      }
    }
    console.log(colorsAvailable);
  };
  console.log(size);
  const handleClickColor = (event, stock = garment.stock) => {
    const color = event.target.name;

    if (color) {
      setStockComb(stock[size][color]);
    }
  };
  return (
    <div className="">
      <Nav />
      <div className="theRealMaxContainer">
        <div className="carousel-inner maxContainer">
          <div className="mediumContainer">
            <div className="imageCont">
              <div className="divBtn">
                {garment.image &&
                  garment.image.map((imag, index) => (
                    <button
                      style={{
                        backgroundImage: `url(${imag})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100px",
                        height: "100px",
                        marginRight: "5px",
                        marginTop: "7px",
                        border: "none",
                      }}
                      key={index}
                      value={index}
                      onClick={carousel}
                    />
                  ))}
              </div>

              <div className="divImage">
                {garment.image && (
                  <img
                    className="productImage"
                    src={imagePP || garment.image[0]}
                    alt={garment.name}
                  />
                )}
                {garment.price && (
                  <div className="priceh4">
                    <h4 className="therealh4">${garment.price}</h4>
                  </div>
                )}
              </div>
            </div>

            <div className="divMaxDetails">
              <div className="allDetailsDiv">
                <hr />
                {garment.name && <h3>{garment.name}</h3>}
                <hr />
                {garment.size && <h5>Talle: {garment.size}</h5>}
                {garment.color && <h5>Color: {garment.color}</h5>}
                {garment.productbrand && <h5>{garment.productbrand}</h5>}
                <hr />
                {garment.description && (
                  <h5>
                    {expanded
                      ? garment.description
                      : garment.description.slice(0, 99) + "..."}
                  </h5>
                )}
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    color: "rgb(47, 203, 255)",
                  }}
                  onClick={toogleExpand}
                >
                  {expanded ? "Ver menos" : "Ver mas"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleClickStock} value="s">
              s
            </button>
            <button onClick={handleClickStock} value="m">
              m
            </button>
            <button onClick={handleClickStock} value="l">
              l
            </button>
            <button onClick={handleClickStock} value="xl">
              xl
            </button>
          </div>
          <div>
            {colorsAvailable.map((color) => (
              <button onClick={handleClickColor} name={color} key={color}>
                {color}
              </button>
            ))}
          </div>
          <div>{stockComb}</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
