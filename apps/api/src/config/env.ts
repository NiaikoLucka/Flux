import dotenv from "dotenv"

dotenv.config({quiet: true})

export const ENV = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL
}