import axios from 'axios';
import { GET_ALL, ORDER_PRICE, SEARCH_NAME } from './action-types';

export const getAllClothes = ()=>{
    return async function(dispatch){
        try {
            const all = await axios.get('http://localhost:3004/products')
            return dispatch({
                type: GET_ALL,
                payload: all.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

// http://localhost:3004/products/name?name=pantalon

export function getProductsByName(payload) {
  return async function(dispatch) {
    let dataProducts = await axios.get(`http://localhost:3004/products/name?name=${payload}`)
    return dispatch({
      type: SEARCH_NAME,
      payload: dataProducts.data
    })
  }
}


export const orderPrice = (payload)=>{
    return {
        type: ORDER_PRICE,
        payload
    }
}