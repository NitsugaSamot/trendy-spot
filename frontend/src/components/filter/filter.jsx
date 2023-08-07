import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import {
  orderByName,
  filterByBrand,
  filterPrice,
} from "../../redux/actions";
import './filter.css';

const Filter = () => {
  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const allClothes2 = useSelector((state) => state.allClothes2);
  const dispatch = useDispatch();
  

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
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
  };

  const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
  };

  const handleClickPrice = () => {
    if (price.minPrice >= 100 && price.maxPrice <= 10000)
    dispatch(filterPrice(price));
  };

  return (
    <div className="containerFilter">
      <h4>Order</h4>
      <select className="form-select"   name="order" onChange={handleOrderSelect}>
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
        </label>
      </div>
      <button className="btnPrice" onClick={handleClickPrice}>
        Search 
      </button>
    </div>
  );
};

export default Filter;

