import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Sign Up", type: "hidden" },
        name: { label: "Name", type: "text", optional: true },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("no-credentials");
        }
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("no-credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (credentials.isSignUp === "true") {
          if (user) throw new Error("User already exists");
          const hashed = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashed,
              name: credentials.name,
              role: "client",
            },
          });
          return { id: newUser.id, email: newUser.email, name: newUser.name };
        }
        if (!user || !user.password) throw new Error("No user found");
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Invalid password");
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    session: async ({ session, token }) => {
      // console.log(token);
      // console.log(session);
      session.user = {
        id: token.sub,
        email: token.email,
        name: token.name,
        // @ts-expect-error - token.user is not typed
        ...(token || session).user,
      };
      // eslint-disable-next-line no-console
      console.log(session);
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
