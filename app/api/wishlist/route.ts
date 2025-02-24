import { authoptions } from "@/lib/auth";
import Wishlist from "@/lib/models/wishlist";
import { connectToDB } from "@/lib/mongoDB";
import { UserRoundIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getServerSession(authoptions);
   
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    let wishlist = await Wishlist.findOne({ userId: userId.user?._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: userId });
      await wishlist.save();
    }

    return NextResponse.json(wishlist, { status: 200 });

    
  } catch (err) {
    console.log("wishlist_GET", err);
    return new NextResponse("Internal server err", { status: 500 });
  }
};
export const POST = async (req: NextRequest) => {
  try {
    const userId = await getServerSession(authoptions);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await Wishlist.findOne({ userId: userId});

    await connectToDB();

    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product not found", { status: 400 });
    }
    const isLiked = user.wishlist.includes(productId);

    if(isLiked) {
        user.wishlist = user.wishlist.filter((id:string)=> id !== productId)
    }else{
        user.wishlist.push(productId);
    }
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new NextResponse("Internal Server err", { status: 500 });
  }
};
