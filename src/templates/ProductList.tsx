import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";

interface Props {}

const ProductList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const selector: any = useSelector((state) => state);
  const products = getProducts(selector);

  // クエリ取得
  const query: string = selector.router.location.search;
  const gender = /^\?gender=.+/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=.+/.test(query) ? query.split("?category=")[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  console.log(products);

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      <div className="flex flex-row flex-wrap">
        {products.length > 0 &&
          products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
