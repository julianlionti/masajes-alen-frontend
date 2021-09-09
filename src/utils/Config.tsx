type NODE_ENV = "development" | "test" | "production";

type ConfigProps = { NODE_ENV: NODE_ENV; USER_KEY: "MA_USER" };
const Config: ConfigProps = {
  NODE_ENV: process.env.NODE_ENV as NODE_ENV,
  USER_KEY: "MA_USER",
};
export default Config;
