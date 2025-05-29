import dotenv from "dotenv";

dotenv.config();
class Config {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URL: string;
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV!;
    this.PORT = Number(process.env.PORT!);
    this.MONGODB_URL = process.env.MONGODB_URL!;
  }
}

const config = new Config();
export default config;
