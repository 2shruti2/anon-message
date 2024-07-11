import "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultJWT['user']
  }
}

declare module "next-auth/jwt"{
  interface JWT {
    _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
  }
}