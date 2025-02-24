"use client";

import { useEffect, useState } from "react";
import Loader from "../Loader";
import ProductsCard from "./ProductsCard";
import Link from "next/link";


const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductsType | null>(null);

  const getproducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[collection_GET]", err);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <Link href="/dashboard/products" className="hover: cursor-pointer">
        <p className="text-bold  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Product List
        </p>
      </Link>

      {!products || products.length === 0 ? (
        <p>Not product found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product: ProductsType) => (
            <ProductsCard key={product._id} product={product} />
          ))}

        </div>
      )}

    </div>
  );
};

export default ProductList;
