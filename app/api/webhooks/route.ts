
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { cartItems, customer } = await req.json();
    const session = auth();

    const customerInfo = {
      clerkId: customer?.clerkId,
      name: customer?.name,
    };

    await connectToDB();

    const newOrder = new Order({
      customerClerkId: customerInfo.clerkId,
      username:customerInfo.name,
      cart: cartItems,
    });
    await newOrder.save();
  } catch (err) {
    console.log(console.log("[checkout_POST]", err));
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
