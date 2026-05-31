import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { databaseConnection } from '@/app/Connection/dbConnection';
import User from '@/app/models/User';

const authOptions = ({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                await databaseConnection();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                        name: user.name || user.email.split("@")[0]
                    })
                    await newUser.save();
                    return true;
                }
                else {
                    return true;
                }
            } catch (error) {
                console.log("Authentication Error: ", error);
                return false;
            }
        },
        async session({ session }) {
            await databaseConnection();
            const userDB = await User.findOne({ email: session.user.email });
            session.user.name = userDB.username;
            return session;
        }
    },
})

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

