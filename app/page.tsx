import { auth } from "@clerk/nextjs/server"
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {
  const { userId } = await auth();

  if(!userId){
    return redirect("/sign-in");
  }
 
  return  (
    <div className="flex min-h-screen flex-col items-center justify-center">
     {!userId && (
                    <div className="border border-solid border-black rounded">
                        <Link href="/sign-in">sign in</Link>
                    </div>
                )}
                { userId && (
                    <div className="border border-solid border-black rounded">
                        <Link href="/dashboard">home</Link>
                    </div>
                )}
    </div>
  );
}
