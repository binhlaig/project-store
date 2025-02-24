"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession();
  const user = session?.user
  if (!user) {
    router.push('/login');
  }



  console.log(user);
  return  (
    <div className="flex min-h-screen flex-col items-center justify-center">
     {!user && (
                    <div className="border border-solid border-black rounded">
                        <Link href="/login">Log In</Link>
                    </div>
                )}
                { user && (
                    <div className="border border-solid border-black rounded">
                        <Link href="/dashboard">home</Link>
                    </div>
                )}
    </div>
  );
}
