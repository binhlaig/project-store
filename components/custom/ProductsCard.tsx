"use client";
import Image from "next/image";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

const ProductsCard = ({ product }: { product: ProductsType }) => {
  return (
    <div>
      <Link
        href={`/dashboard/products/${product._id}`}
        className="w-[220px] flex flex-col gap-2"
      >
        <Image
          src={product.media[0]}
          alt="product"
          width={150}
          height={150}
          className="h-[250] rounded-lg object-cover"
        />
      </Link>
      <div>
        <p className="text-black">{product.title}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>{product.price} ¥</p>
        <button className="outline text-black py-1 px-4 rounded-xl hover:bg-black hover:text-white">
        Add cart
      </button>
      </div>
     
    </div>
  );
};

export default ProductsCard;
