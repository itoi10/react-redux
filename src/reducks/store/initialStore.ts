// Storeの初期状態、アプリに必要なstateを全て記述
const initialState = {
  // userの状態
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },

  // 商品の状態
  products: {},
};

export default initialState;
