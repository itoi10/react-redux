import * as Actions from "./actions";
import initialState from "../store/initialStore";
import { UserState } from "./types";

// storeの値を変更する (第１引数: state, 第２引数: actionがreturnした値)
export const UsersReducer = (state = initialState.users, action: { type: string; payload: any }) => {
  // Actionsのtypeに応じてstate変更
  switch (action.type) {
    case Actions.FETCH_ORDER_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      };

    case Actions.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };

    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.SIGN_OUT:
      // サインアウトするので情報の残さない(...stateは不要)
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
