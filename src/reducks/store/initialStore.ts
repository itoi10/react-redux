// Storeの初期状態、アプリに必要なstateを全て記述
const initialState = {
  // userの状態
  users: {
    cart: [],
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },

  // 商品の状態
  products: {
    list: [],
  },
};

export default initialState;
