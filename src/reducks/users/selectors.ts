import { createSelector } from "reselect";

const userSelector = (state: any) => state.users;

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector([userSelector], (state) => state.username);
