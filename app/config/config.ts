interface Config {
  clientId: string;
  clientSecret: string;
  authSecret: string;
  databaseUrl: string;
  facebookClientId: string;
  facebookClientSecret: string;
}

export const config: Config = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authSecret: process.env.AUTH_SECRET || "",
  databaseUrl: process.env.DATABASE_URL || "",
  facebookClientId: process.env.FACEBOOK_CLIENT_ID || "",
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
};
