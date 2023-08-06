// import axios from "axios";
// import {
//   ORDER_BY_NAME,
//   FILTER_BY_BRAND,
//   FILTER_BY_PRICE,
//   GET_ALL,
//   SEARCH_NAME,
//   REFRESH,
//   GET_ALL_BRANDS
// } from "./action-types";

// export const getAllClothes = () => {
//   return async function (dispatch) {
//     try {
//       const all = await axios.get("http://localhost:3004/products");
//       console.log(all.data);
//       return dispatch({
//         type: GET_ALL,
//         payload: all.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// <<<<<<<<< Temporary merge branch 1
// // http://localhost:3004/products/name?name=pantalon

// export function getProductsByName(payload) {
//   return async function(dispatch) {
//     let dataProducts = await axios.get(`http://localhost:3004/products/name?name=${payload}`)
//     return dispatch({
//       type: SEARCH_NAME,
//       payload: dataProducts.data
//     })
//   }
// }


// export const orderPrice = (payload)=>{
//     return {
//         type: ORDER_PRICE,
//         payload
// =========
// export const orderByName = (payload) => {
//   return {
//     type: ORDER_BY_NAME,
//     payload,
//   };
// };

// export const filterByBrand = (payload) => {
//   return {
//     type: FILTER_BY_BRAND,
//     payload,
//   };
// };

// export const filterPrice = (payload) => {
//   return {
//     type: FILTER_BY_PRICE,
//     payload,
//   };
// };

// export const searchName = (payload) => {
//   return async function (dispatch) {
//     try {
//       const productByName = await axios.get(
//         `http://localhost:3004/products/?name=${payload}`
//       );
//       return dispatch({
//         type: SEARCH_NAME,
//         payload: productByName.data,
//       });
//     } catch (error) {
//       console.log(error)
//       alert(error.response.data.error);
//     }
//   };
// };



// export const refresh = () => {
//   return {
//     type: REFRESH,
//     paylaod: "",
//   };
// };

// /* NO ESTA IMPLEMENTADA EN EL FRONT */
// export function getAllBrands() {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get('http://localhost:3004/products/brands')
//       const brands = response.data
//       dispatch({
//         type: GET_ALL_BRANDS,
//         paylaod: brands
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const filterPrice = (minPrice, maxPrice) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         `http://localhost:3004/products/search?minPrice=${minPrice}&maxPrice=${maxPrice}`
//       );
//       return dispatch({
//         type: FILTER_BY_PRICE,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// /* NO LOGRE IMPLEMENTARLA AL FRONT */
// export const filterByBrandAndPrice = (brandName, minPrice, maxPrice) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         `http://localhost:3004/products/filter?brandName=${brandName}&minPrice=${minPrice}&maxPrice=${maxPrice}`
//       );

//       if (response.status === 200 && response.data.length > 0) {
//         dispatch({
//           type: FILTER_BY_BRAND,
//           payload: response.data,
//         });
//       } else {

//         dispatch({
//           type: FILTER_BY_BRAND, 
//           payload: [],
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

import axios from "axios";
import {
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  GET_ALL,
  SEARCH_NAME,
  REFRESH,
} from "./action-types";

export const getAllClothes = () => {
  return async function (dispatch) {
    try {
      const all = await axios.get("http://localhost:3004/products");
      console.log(all.data);
      return dispatch({
        type: GET_ALL,
        payload: all.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export function orderByName(payload){
    return function (dispatch){
    return dispatch ({
        type: ORDER_BY_NAME,
        payload
    });
    };
}

export const filterByBrand = (payload) => {
  return {
    type: FILTER_BY_BRAND,
    payload,
  };
};

export const filterPrice = (payload) => {
  return {
    type: FILTER_BY_PRICE,
    payload,
  };
};

export const searchName = (payload) => {
  return async function (dispatch) {
    try {
      const productByName = await axios.get(
        `http://localhost:3004/products/?name=${payload}`
      );
      return dispatch({
        type: SEARCH_NAME,
        payload: productByName.data,
      });
    } catch (error) {
      console.log(error)
      alert(error.response.data.error);
    }
  };
};

export const refresh = () => {
  return {
    type: REFRESH,
    paylaod: "",
  };
};

