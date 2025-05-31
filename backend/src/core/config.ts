import dotenv from 'dotenv'

dotenv.config()
class Config {
  NODE_ENV: string
  PORT: number
  MONGODB_URL: string
  JWT_SECRET_KEY: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
  CLOUDINARY_CLOUD_NAME: string
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV!
    this.PORT = Number(process.env.PORT!)
    this.MONGODB_URL = process.env.MONGODB_URL!
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!
    this.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
  }
}

const config = new Config()
export default config
