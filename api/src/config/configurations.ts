export type Config = {
  app: {
    port: number;
  };
  database: { url: string };
  auth0: {
    audience: string;
    domain: string;
    secret: string;
  };
};

export default (): Config => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 8080,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  auth0: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_SECRET,
  },
});
