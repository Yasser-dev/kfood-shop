import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (!itemExists) {
        return { state: { ...state, cartItems: [...state.cartItems, item] } };
      }

      return {
        state: {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === itemExists.product ? item : cartItem
          ),
        },
      };

    default:
      return state;
  }
};
