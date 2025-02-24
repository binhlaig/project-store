
import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=> {
    try {
        await connectToDB();

        const collections = await Collection.find().sort({createdAt: "desc"});
        return NextResponse.json(collections,{status:200});
        
    } catch (err) {
        console.log("[collection_GET]",err);
        return new NextResponse("Internal Server error", {status:500});
    }
}