import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DISMISSED,
} from "../constants/productConstants";

export const getProducts = (search = "", currentPage = 1) => async (
  dispatch
) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `/api/v1/products?name=${search}&page=${currentPage}`
    );
    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(`ERORR is ${error}`);
    dispatch({ type: ALL_PRODUCTS_FAIL, payload: error });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const dismissProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_DISMISSED });
};
