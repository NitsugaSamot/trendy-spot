import axios from 'axios';
import { GET_ALL, ORDER_PRICE, SEARCH_NAME } from './action-types';

export const getAllClothes = ()=>{
    return async function(dispatch){
        try {
            var all = axios('http://localhost:3001/')
            return dispatch({
                type: GET_ALL,
                payload: all.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const orderPrice = (payload)=>{
    return {
        type: ORDER_PRICE,
        payload
    }
}