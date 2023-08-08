import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import {
  orderByName,
  filterByBrand,
  filterPrice,
} from "../../redux/actions";
import './filter.css';

const Filter = ({ onPageChange }) => {

  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const [errorPrice, setErrorPrice] = useState("");

  const allClothes2 = useSelector((state) => state.allClothes2);
  const dispatch = useDispatch();
  

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
    onPageChange(1)

  };

  const filterBrands = [];

  const brands = allClothes2.filter((product) => {
    if (!filterBrands.includes(product.productbrand)) {
      filterBrands.push(product.productbrand);
    }
  });

  const handleFilterBrandSelect = (event) => {
    // dispatch(refresh());
    dispatch(filterByBrand(event.target.value));
    onPageChange(1)
  };

  const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
    onPageChange(1)
    if (
      price.minPrice >= 100 &&
      price.maxPrice <= 10000 &&
      price.minPrice < price.maxPrice
    ) {
      setErrorPrice("");
    } else if (price.minPrice && price.maxPrice && price.minPrice > price.maxPrice){
      setErrorPrice("The min is higher than the max price")
    } 
  };

  const handleClickPrice = () => {
    if (
      price.minPrice >= 100 &&
      price.maxPrice <= 10000 &&
      price.minPrice < price.maxPrice
    ) {
        dispatch(filterPrice(price));
        setErrorPrice("");
    } else if (!price.minPrice || !price.maxPrice){
      setErrorPrice("Please insert price")
    }else {
      setErrorPrice("The min is higher than the max price")
    }
    onPageChange(1);
  };

  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary containerFilter">
      <h4>Order</h4>
      <select className="form-select" name="order" onChange={handleOrderSelect}>
      <option value="" disabled selected>Order by Name</option>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>
      <h4>Brand</h4>
      <select className="form-select" name="order" onChange={handleFilterBrandSelect}>
        <option value="" disabled selected>Order by Brand</option>
        { filterBrands.map((brand, index) => ( 
          
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select >
      <h4>Price</h4>
      <div className="containerPrice">
        <label>
          <input
            className="inputPrice"
            type="number"
            name="minPrice"
            value={price.minPrice}
            onChange={handleFilterPrice}
            placeholder="Price Min"
            />
          <input
            className="inputPrice"
            type="number"
            name="maxPrice"
            value={price.maxPrice}
            onChange={handleFilterPrice}
            placeholder="Price Max"
            />
            {errorPrice ? 
            (<p className="errorp">{errorPrice}</p>) 
            : (<></>)
            }
        </label>
        

      </div>
      <button className="btnPrice" onClick={handleClickPrice}>
        Search 
      </button>
    </div>
  );
};

export default Filter;

