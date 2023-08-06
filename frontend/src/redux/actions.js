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
  console.log(payload);
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
