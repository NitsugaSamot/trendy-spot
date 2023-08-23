import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByName, filterProducts } from "../../redux/actions";
import "./filter.css";

const Filter = ({ onPageChange }) => {
  const allClothes2 = useSelector((state) => state.allClothes2);

  const dispatch = useDispatch();

  //Estado inicial de brand y price
  const [filterOptions, setFilterOptions] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
    onPageChange(1);
  };

  const filterBrands = [];

  const brands = allClothes2.filter((product) => {
    if (!filterBrands.includes(product.productbrand)) {
      filterBrands.push(product.productbrand);
    }
  });


  const handleBrandSelect = (event) => {
    //toma el valor de la marca seleccionada
    const brand = event.target.value;
    //Lo manda a filterOptions y lo almacena en el pbjeto de peticion
    setFilterOptions((prevOptions) => ({ ...prevOptions, brand }));
    //despacha el filtrado que puede o no tener precios
    dispatch(filterProducts(brand, filterOptions.minPrice, filterOptions.maxPrice));
    onPageChange(1)
  };

  const handlePriceFilter = () => {
    // toma brand y prices del estado filterOptions
    const { brand, minPrice, maxPrice } = filterOptions;
    //Se llama al dispatch con los argumentos brand minPrice y max price, brand puede o no estar
    dispatch(filterProducts(brand, parseInt(minPrice), parseInt(maxPrice)));
    onPageChange(1)
  };
  
  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary containerFilter">
      <h4>Order</h4>
      <select className="form-select" name="order" onChange={handleOrderSelect}>
        <option value="" disabled>
          Order by Name
        </option>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>

      <h4>Brand</h4>
      <select
        className="form-select"
        name="selectedBrand"
        onChange={handleBrandSelect}
        value={filterOptions.brand}
      >
        <option disabled>Select brand</option>
        {filterBrands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <h4>Price</h4>
      <div className="containerPrice">
        <label>

        <input
            className="inputPrice"
            type="number"
            min="0"
            name="minPrice"
            value={filterOptions.minPrice}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                minPrice: e.target.value,
              }))
            }
            placeholder="Price Min"
        />
        <input
          className="inputPrice"
          type="number"
          min="0"
          name="maxPrice"
          //lo vinculamos al objeto filterOptions
          value={filterOptions.maxPrice}
          //Actualiza el estado 
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              maxPrice: e.target.value,
            }))
          }
          placeholder="Price Max"
        />
          
        </label>
      </div>
      <button className="btnPrice" onClick={handlePriceFilter}>
        Search
      </button>
    </div>
  );
};

export default Filter;

