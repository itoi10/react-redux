import { createSelector } from "reselect";
import { UserState } from "./types";

const userSelector = (state: any) => state.users as UserState;

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector([userSelector], (state) => state.username);

export const getIsSignedIn = createSelector([userSelector], (state) => state.isSignedIn);

export const getProductsInCart = createSelector([userSelector], (state) => state.cart);

export const getOrderHistory = createSelector([userSelector], (state) => state.orders);
