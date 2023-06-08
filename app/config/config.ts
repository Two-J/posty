interface Config {
  clientId: string;
  clientSecret: string;
  authSecret: string;
}

export const config: Config = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authSecret: process.env.AUTH_SECRET || "",
};
