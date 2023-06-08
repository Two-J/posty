import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { config } from "../config/config";
import prisma from "../../prisma/client";

export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  secret: config.authSecret,
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#CD1818", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "#116D6E", // Hex color code
  },
};
