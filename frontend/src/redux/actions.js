import axios from "axios";
import {
  GET_ALL,
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  REFRESH,
<<<<<<< HEAD


  GET_ALL_BRANDS,
  FILTER_BRAND_AND_PRICE,


=======
>>>>>>> tomas-callenius
  ADD_TO_CART,
  INITIALIZE_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
<<<<<<< HEAD

=======
  // FILTER_BRAND_AND_PRICE,
>>>>>>> tomas-callenius
} from "./action-types";

export const getAllClothes = () => {
  return async function (dispatch) {
    try {
      const all = await axios.get("http://localhost:3004/products");
      return dispatch({
        type: GET_ALL,
        payload: all.data,
      });
    } catch (error) {
      console.error(error);  
    }
  };
};

export const filterByBrand = (brandName) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3004/products/brands/${brandName}`
      );
      return dispatch({
        type: FILTER_BY_BRAND,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export function orderByName(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_NAME,
      payload,
    });
  };
}

export const searchName = (payload) => {
  console.log(payload);
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
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

export const filterPrice = ({ minPrice, maxPrice }) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3004/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        console.log(response);
        return dispatch({
          type: FILTER_BY_PRICE,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
};
  
  export const refresh = () => {
    return {
      type: REFRESH,
      paylaod: "",
    };
};

export const addToCart = (item) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });

    const cartItems = getState().cart; // Obtener los elementos del carrito del estado
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Actualizar el localStorage
  };
};

export const initializeCart = (cartItems) => ({
  type: INITIALIZE_CART,
  payload: cartItems,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const increaseQuantity = (itemId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: itemId,
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: itemId,
  };
};
  
  //.....................para implementar desp............................//
  // export const filterPriceAndBrand = (payload) => {
  //   return async function (dispatch) {
  //     try {
  //       const filteredByBrandAndPrice = await axios.get(`
  //       http://localhost:3004/products/filter?brandName=${payload.brand}&name=${payload.minPrice}&name=${payload.maxPrice}`);
  //       return dispatch({
  //         type: FILTER_BRAND_AND_PRICE,
  //         payload: filteredByBrandAndPrice.data,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       alert(error.response.data.error);
  //     }
  //   };
  // };
  
  