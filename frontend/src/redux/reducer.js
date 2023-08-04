import { GET_ALL, ORDER_PRICE, SEARCH_NAME} from "./action-types";

const initialState = {
    allClothes1: [],
    allClothes2: [],
    productsByName: []
}

const reducer = (state = initialState, { type, payload })=>{
    switch (type) {
      case GET_ALL:
        return {
          ...state,
          allClothes1: payload,
          allClothes2: payload,
        };

        case SEARCH_NAME:
          return {
            ...state,
            productsByName: payload
          }

      case ORDER_PRICE:
        return {

        }

      default:
        return { ...state };
    }
}

export default reducer;
