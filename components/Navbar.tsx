"use client"
import Link from "next/link";
import { Menu, ShoppingCart } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/lib/hooks/useCart";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user
  const [dropDpwnMenu, setDropDownMenu] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const showSession = () => {
    if (user) {
      return (
        <button
          className=" cursor-pointer"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/login");
              window.location.href = "/login" 
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return (
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      );
    } else {
      return (
        <Link
          href="/login"
          className=""
        >
          Sign In
        </Link>
      );
    }
  };

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
              <p className="">{showSession()}</p>
            </div>
          )}
       

      </div>
    </div>
  );
};

export default Navbar;
