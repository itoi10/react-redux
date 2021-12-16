import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";

interface Props {}

const ProductList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      <div className="flex flex-row flex-wrap">
        {products.length > 0 && products.map((product: any) => <ProductCard key={product.id} />)}
      </div>
    </section>
  );
};

export default ProductList;
