import Navbar from "@/components/Navbar";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const { userId } = await auth();

  if(!userId){
    return redirect("/sign-in");
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
