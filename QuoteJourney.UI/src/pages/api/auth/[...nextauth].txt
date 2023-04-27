import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Just hit the button..",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Just hit the button..",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "John Doe", email: "johndoe@test.com" };

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  // ...add more providers here
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
