import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/Products";

interface Props {}

const ProductList: React.FC<Props> = () => {
  const testList = ["1", "2", "3", "4", "5"];

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      <div className="flex flex-row flex-wrap">{testList && testList.map((item, i) => <ProductCard key={i} />)}</div>
    </section>
  );
};

export default ProductList;
