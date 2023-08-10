import axios from "axios";
import {
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  GET_ALL,
  SEARCH_NAME,
  REFRESH,
  ADD_TO_CART,
  INITIALIZE_CART,
  REMOVE_FROM_CART,
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

