"use client"
import Link from "next/link";
import { Menu, ShoppingCart } from 'lucide-react';
import { useState } from "react";
import useCart from "@/lib/hooks/useCart";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const [dropDpwnMenu, setDropDownMenu] = useState(false);
  const cart = useCart();

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href="/">
        <h1 className="text-bold  text-2xl font-bold leading-9 tracking-tight text-blue-700">
           Bin Hlaig Group
        </h1>
      </Link>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="relative flex gap-3 items-center" >
        <Link href="/dashboard/cart" className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white">
        <ShoppingCart/>
        <p className=""> Cart ({cart.cartItems.length})</p>
        </Link>

        {<Menu className="cursor-pointer" onClick={()=> setDropDownMenu(!dropDpwnMenu)} />}
          {dropDpwnMenu && (
            <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border text-black">
              <Link href="/dashboard/wishlist">Wishlist</Link>
              <Link href="/dashboard/orders">Orders</Link>
              <UserButton/>
            </div>
          )}
      </div>
    </div>
  );
};

export default Navbar;
