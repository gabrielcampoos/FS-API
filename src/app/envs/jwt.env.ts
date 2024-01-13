import "dotenv/config";

export const jwtEnvs = {
  secret: process.env.JWT_SECRET as string,
  expireIn: process.env.JWT_EXPIREIN as string,
};
