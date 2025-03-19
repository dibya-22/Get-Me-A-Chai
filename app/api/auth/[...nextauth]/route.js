import NextAuth from 'next-auth'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDB';


export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github"){
        await connectDB();

        const email = user.email;
          if (!email) {
            console.error("❌ No email found for user");
            return false;
        }

        // Check if the user is already exist in the database
        const currentUser = await User.findOne({email: email});
        if(!currentUser){
          // Create a new user
          const newUser = new User({
            email: email,
            username: email.split("@")[0],
          })
          await newUser.save();
          user.name = newUser.username;
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email});
      session.user.name = dbUser.username
      return session
    },
  }
})

export { authoptions as GET, authoptions as POST}