
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { connectToDB } from "./lib/mongoDB";
import User from "./lib/models/user";


export const authoptions:NextAuthOptions= ({ 
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials) {
                await connectToDB();
                const user = await User.findOne({username: credentials!.username});
                const isPasswordCorrect = await bcrypt.compare(
                  credentials!.password,
                  user.password
                );
                if(isPasswordCorrect) {
                  return{
                    id: user?._id,
                    username: user?.username,
                    image: user?.image
                  }
                }
                if (!isPasswordCorrect) throw new Error("Wrong credentials!");
                return user;
              },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages:{
      signIn: "/login"
    },
    session: {
      strategy:"jwt"
    },

  callbacks: {
    async jwt({token,user,session,trigger}){

      if(trigger === "update" && session?.username){
        token.username = session.username;
      }
    
      if(user){
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          username: u.username,
        };
      }
      return token;

    },

    async session({ session,token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          username: token.username,
        }
      }
    },
  }
});

