import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import { orderByName, filterByBrand, refresh,  filterPrice} from "../../redux/actions";
import "./filter.css";

const Filter = () => {
  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const allClothes2 = useSelector((state) => state.allClothes2);
  const dispatch = useDispatch();
  const [filterBrands, setFilterBrands] = useState([]);

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const uniqueBrands = allClothes2.reduce((acc, product) => {
        if (!acc.includes(product.productbrand)) {
          acc.push(product.productbrand);
        }
        return acc;
      }, []);
      setFilterBrands(uniqueBrands);
    }, 3000); // 3 seconds delay

    // Clear the timeout if the component is unmounted before the delay completes
    return () => clearTimeout(delay);
  }, [allClothes2]);

  const handleFilterBrandSelect = (event) => {
    dispatch(refresh());
    dispatch(filterByBrand(event.target.value));
  };

  const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
  };

  // const handleClickPrice = () => {
  //   if (price.minPrice >= 100 && price.maxPrice <= 1000) {
  //     console.log(price);
  //     dispatch(filterPrice(price));
  //   }
  //   alert("hola");
  // };
  const handleClickPrice = () => {

      dispatch(filterPrice(price.minPrice, price.maxPrice));
      

  };

  return (
    <div className="containerFilter">
      <h2>Order</h2>
      <select name="order" onChange={handleOrderSelect}>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>
      <h2>Brand</h2>
      <select name="order" onChange={handleFilterBrandSelect}>
        {filterBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <h2>Price</h2>
      <div className="containerPrice">
        <label>
          <input
            type="number"
            name="minPrice"
            value={price.minPrice}
            onChange={handleFilterPrice}
          />
          <input
            type="number"
            name="maxPrice"
            value={price.maxPrice}
            onChange={handleFilterPrice}
          />
        </label>
      </div>
      <button className="btnPrice" onClick={handleClickPrice}>
        Price
      </button>
    </div>
  );
};

export default Filter;

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./filter.css";
// import {
//   orderByName,
//   filterByBrand,
//   refresh,
//   filterPrice,
// } from "../../redux/actions";
// import './filter.css'

// const Filter = () => {
//   const [price, setPrice] = useState({
//     minPrice: "",
//     maxPrice: "",
//   });
//   // const allClothes1 = useSelector((state) => state.allClothes1);
//   const allClothes2 = useSelector((state) => state.allClothes2);

//   // console.log(allClothes1);
//   const dispatch = useDispatch();

//   const [filterBrands, setFilterBrands] = useState([]);

//   const handleOrderSelect = (event) => {
//     dispatch(orderByName(event.target.value));
//   };

//   useEffect(() => {
//     // Simulate an API call or data processing that takes 3 seconds to fetch/filter data
//     const delay = setTimeout(() => {
//       const uniqueBrands = allClothes2.reduce((acc, product) => {
//         if (!acc.includes(product.productbrand)) {
//           acc.push(product.productbrand);
//         }
//         return acc;
//       }, []);
//       setFilterBrands(uniqueBrands);
//     }, 3000); // 3 seconds delay

//     // Clear the timeout if the component is unmounted before the delay completes
//     return () => clearTimeout(delay);
//   }, [allClothes2]);

//   const handleFilterBrandSelect = (event) => {
//     dispatch(refresh());
//     dispatch(filterByBrand(event.target.value));
//   };

//   const handleFilterPrice = (event) => {
//     setPrice({ ...price, [event.target.name]: event.target.value });
//   };

//   const handleClickPrice = () => {
//     if (price.minPrice >= 100 && price.maxPrice <= 1000)
//     console.log(price);
//       dispatch(filterPrice(price));
//     alert("hola");
//   };
//   return (
//     <div className="containerFilter">
//       {/* <h1>Filter by:</h1> */}
//       <h2>Order</h2>
//       <select name="order" onChange={handleOrderSelect}>
//         <option value="1">Name A-Z</option>
//         <option value="2">Name Z-A</option>
//       </select>
//       <h2>Brand</h2>
//       <select name="order" onChange={handleFilterBrandSelect}>
//         {filterBrands.map((brand) => (
//           <option key={brand} value={brand}>
//             {brand}
//           </option>
//         ))}
//         ;
//       </select>
//       <h2>Price</h2>
//       <div className="containerPrice">
//           <label>
//             <input
//               type="number"
//               name="minPrice"
//               value={price.minPrice}
//               onChange={handleFilterPrice}
//             />
//             <input
//               type="number"
//               name="maxPrice"
//               value={price.maxPrice}
//               onChange={handleFilterPrice}
//             />
//           </label>
//       </div>
//       <button className="btnPrice" onClick={handleClickPrice}>Price</button>
//     </div>
//   );
// };
// export default Filter;
