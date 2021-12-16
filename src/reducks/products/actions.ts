export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products: any) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};
