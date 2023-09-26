import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

// Define authentication options using NextAuthOptions
export const authOptions: NextAuthOptions = {
  // Use PrismaAdapter with the database connection from 'db'
  adapter: PrismaAdapter(db),

  // Configure session strategy using JSON Web Tokens (JWT)
  session: {
    strategy: "jwt",
  },

  // Define custom sign-in page URL
  pages: {
    signIn: "/sign-in",
  },

  // Configure authentication providers, in this case, Google OAuth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],

  // Define callbacks for manipulating session and JWT tokens
  callbacks: {
    // Customizes the session object with user information from the JWT token
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },

    // Customizes the JWT token with user information from the database
    async jwt({ token, user }) {
      // Check if a user with the provided email exists in the database
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        // If the user doesn't exist in the database, add their ID to the token
        token.id = user!.id;
        return token;
      }

      // Return an updated JWT token with user information
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },

    // Redirect user to the home page after authentication
    redirect() {
      return "/";
    },
  },
};

// Function to get the server session with the defined authentication options
export const getAuthSession = () => getServerSession(authOptions);
