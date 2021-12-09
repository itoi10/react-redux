// import * as Actions from "./actions";
import initialState from "../store/initialStore";

export const ProductsReducer = (state = initialState.products, action: { type: string; payload: any }) => {
  switch (action.type) {
    default:
      return state;
  }
};
