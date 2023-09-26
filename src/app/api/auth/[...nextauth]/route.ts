import NextAuth from "next-auth/next";
import { authOptions } from "@/src/lib/auth";

const handler = NextAuth(authOptions);

// Export the handler function as both GET and POST for authentication
export { handler as GET, handler as POST };
