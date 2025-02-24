"use client";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const catrpage = () => {
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + Number(cartItem.item.price) * cartItem.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));
  
    const router = useRouter()

  const getOrders = async() => {
    try {
      const res = await fetch('/api/webhooks', {
        method: "POST",
        body: JSON.stringify({cartItems: cart.cartItems})    
      }); 

      router.push("/dashboard/order");
    } catch (err) {
      console.log("[webhook_POST]", err);     
    }
  }
  


  return (
    <div className="flex gap-20 py-16 px-10">
      <div className="w-2/3">
        <p className="font-bold">Shopping Cart</p>
        <hr />

        {cart.cartItems.length === 0 ? (
          <p className="flex hover:bg-gray-100 px-6 py-5 justify-center items-center">
            no cart
          </p>
        ) : (
          <div className="">
            {cart.cartItems.map((cartItem) => (
              <div className="w-full flex hover:bg-gray-100 px-6 py-5 justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0] || ""}
                    alt="product"
                    width={70}
                    height={70}
                    className="rounded-sm w-28 h-28 object-cover"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="font-bold">{cartItem.item.title}</p>
                    {cartItem.size && (
                      <p className="text-sm">{cartItem.size}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className=" text-black">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>
                <p className="font-bold">
                  {Number(cartItem.item.price) * cartItem.quantity} ¥{" "}
                </p>
                <Trash
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between">
          <span>Total Amount</span>
          <span>{totalRounded} ¥</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={getOrders}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default catrpage;
