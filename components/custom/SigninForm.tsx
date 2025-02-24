"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "@/components/Loader";
import { LoaderCircle } from "lucide-react";
const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(4).max(50),
  });

const SigninForm = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user
    if (user) {
      router.push('/dashboard');
    }
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });
  
  
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
  
      try {
        setLoading(true);
        const res = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        if (res?.ok) {
          setLoading(false);
          router.push("/dashboard");
          // window.location.href = "/dashboard"
        }
  
      } catch (error) {
        console.log(error);
      }
  
    };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-blue-700"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-10 ">
              <Button type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" /> &nbsp;
                    Loading...
                    <p>error</p>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
             
            </div>
          </form>

        </Form>
      </div>
  )
}

export default SigninForm
