// import * as Actions from "./actions";
import initialState from "../store/initialStore";
import * as Actions from "./actions";

export const ProductsReducer = (state = initialState.products, action: { type: string; payload: any }) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        // 新しい配列に更新
        list: [...action.payload],
      };
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
