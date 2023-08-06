import {
  FILTER_BY_BRAND,
  ORDER_BY_NAME,
  GET_ALL,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  REFRESH,
//  GET_ALL_BRANDS 
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
  productsByPrice: [],
  allBrands: []
};

const reducer = (state = initialState, { type, payload }) => {
  let sortedArr;

  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allClothes1: payload,
        allClothes2: payload,
      };

    case ORDER_BY_NAME: {
      sortedArr =
        payload === "1"
          ? state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allClothes1: sortedArr,
      };
    }

    case FILTER_BY_PRICE: { 
      const filteredByPrice = state.allClothes2.filter((product) => {
        product.price >= Number(payload.minPrice) &&
          product.price <= Number(payload.maxPrice);
      });
      return {
        ...state,
        allClothes1: filteredByPrice,
      };
    }
    case FILTER_BY_BRAND: {
      const allBrands = state.allClothes2;
      const brand = allBrands.filter(
        (allBrand) => allBrand.productbrand === payload
      );
      return {
        ...state,
        allClothes1: brand,
      };
    }
    
    case SEARCH_NAME:
      return {
        ...state,
        allClothes1: payload,
      };

    case REFRESH: {
      const perrito = state.allClothes2;
      return {
        ...state,
        allClothes1: perrito,
      };
    } 
    
    default:
      return { ...state }
  }
};

export default reducer;
