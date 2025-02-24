"use client";

import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const productDetailpage = ({ params }: { params: { productId: string } }) => {
  const [productDetails, setProductDetails] = useState<ProductsType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();
  const route = useRouter()

  const getproductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });

      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
      toast.success("Successful!");
    } catch (err) {
      console.log("[productId_GET]", err);
      toast.error("Something worng!");
    }
  };

  useEffect(() => {
    getproductDetails();
  }, []);

  console.log(productDetails);

  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <div className="flex flex-col gap-3 max-w-[500px]">
        <Image
          src={productDetails?.media[0] || ""}
          alt="product"
          width={300}
          height={300}
        />
      </div>

      <div className="max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-black font-bold text-2xl">
            {productDetails?.title}
          </p>
        </div>

        <div className="flex gap-2">
          <p className="text-base text-gray-500">Category :</p>
          <p className="text-black font-bold">{productDetails?.category}</p>
        </div>
        <p className="text-sm font-bold">¥ {productDetails?.price}</p>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Description :</p>
          <p className="text-sm text-black">{productDetails?.description}</p>
        </div>

        <div className="flex gap-2">
          <p>Sizes :</p>
          <div className="flex gap-2">
            {productDetails?.sizes.map((size, index) => (
              <p
                key={index}
                className={`cursor-pointer hover:outline px-2 py-1 rounded-lg  ${selectedSize === size &&
                  "bg-gray-800 text-white border border-black px-2 py-1 rounded-lg"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-ms text-gray-500">Qiantity</p>
          <div className="flex gap-4 items-center">
            <MinusCircle
              className="hover:text-red-600 cursor-pointer"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            />
            <p className=" text-black">{quantity}</p>
            <PlusCircle
              className="hover:text-red-600 cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            />
          </div>
        </div>

        <button
          className="outline text-black py-3 rounded-lg hover:bg-black hover:text-white"
          onClick={() => {
            cart.addItem({
              item: productDetails!, quantity, size: selectedSize
            });
            route.push("/dashboard/cart")

          }}

        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default productDetailpage;
