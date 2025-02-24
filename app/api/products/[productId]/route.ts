import Collection from "@/lib/models/Collection";
import Products from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
  ) => {
    try {
      await connectToDB();
      const product = await Products.findById(params.productId).populate({
        path: "collections",
        model: Collection
      });
  
      if (!product) {
        return new NextResponse("Product not found", { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
    } catch (err) {
      console.log("productId_GET", err);
      return new NextResponse("Internal Server Err!", { status: 500 });
    }
  };