import { UserState } from "./types";

export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";
export const fetchOrderHistoryAction = (history: any) => {
  return {
    type: FETCH_ORDER_HISTORY,
    payload: history,
  };
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products: any) => {
  return {
    type: FETCH_PRODUCTS_IN_CART,
    payload: products,
  };
};

// アプリから受け取ったデータをreducersに渡す
export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: { uid: string; username: string; role: string }) => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
    },
  };
};
