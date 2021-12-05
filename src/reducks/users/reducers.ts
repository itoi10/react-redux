import * as Actions from "./actions";
import initialState from "../store/initialStore";

// storeの値を変更する (第１引数: state, 第２引数: actionがreturnした値)
export const UsersReducer = (state = initialState.users, action: { type: string; payload: any }) => {
  // Actionsのtypeに応じてstate変更
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
