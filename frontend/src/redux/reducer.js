import {
  FILTER_BY_BRAND,
  ORDER_BY_NAME,
  GET_ALL,
  FILTER_BY_PRICE,
  REFRESH,
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allClothes1: payload,
        allClothes2: payload,
      };

    case ORDER_BY_NAME:
      let sortedArr =
        payload === "1"
          ? state.allClothes1.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allClothes1.sort(function (a, b) {
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

    case FILTER_BY_PRICE:
      console.log(Number(payload.minPrice));
      console.log(allClothes2);
      const filteredByPrice = state.allClothes2.filter((product) => {
        product.price >= Number(payload.minPrice) &&
          product.price <= Number(payload.maxPrice);
      });
      console.log(filteredByPrice);
      return {
        ...state,
        allClothes1: filteredByPrice,
      };

    case FILTER_BY_BRAND:
      const allBrands = state.allClothes2;
      const brand = allBrands.filter(
        (allBrand) => allBrand.productbrand === payload
      );
      return {
        ...state,
        allClothes1: brand,
      };

    case REFRESH:
      const perrito = state.allClothes2;
      return {
        ...state,
        allClothes1: perrito,
      };

    default:
      return { ...state };
  }
};

export default reducer;
