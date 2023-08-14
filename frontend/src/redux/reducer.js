import {
  FILTER_BY_BRAND,
  ORDER_BY_NAME,
  GET_ALL,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  REFRESH,
  GET_ALL_BRANDS,
  SET_SELECTED_BRAND,
  FILTER_BRAND_AND_PRICE,
  SET_PRODUCT_RATING, // Nuevo tipo de acción para establecer la valoración de un producto
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
  productsByPrice: [],
  allBrands: [],
  products: [],
  selectedBrand: null,
  filteredByPrice: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allClothes1: payload,
        allClothes2: payload,
      };

      case ORDER_BY_NAME: {
        const sortedArr =
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

    case SET_SELECTED_BRAND:
      return {
        ...state,
        selectedBrand: payload,
      };

    case FILTER_BY_PRICE:
      return {
        ...state,
        allClothes1: payload,
        selectedBrand: payload,
      };

    case FILTER_BRAND_AND_PRICE:
      return {
        ...state,
        allClothes1: payload,
      };

    case SEARCH_NAME:
      return {
        ...state,
        allClothes1: payload,
      };

    case GET_ALL_BRANDS:
      return {
        ...state,
        allBrands: payload,
      };

    case FILTER_BY_BRAND:
      return {
        ...state,
        allClothes1: payload,
        filteredByPrice: [],
      };

    case SET_PRODUCT_RATING: {
      // Actualizar la valoración de un producto en el estado
      const updatedAllClothes1 = state.allClothes1.map((product) => {
        if (product.id === payload.productId) {
          return { ...product, averageRating: payload.rating };
        }
        return product;
      });

      return {
        ...state,
        allClothes1: updatedAllClothes1,
      };
    }

    case REFRESH: {
      const perrito = state.allClothes2;
      return {
        ...state,
        allClothes1: perrito,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
