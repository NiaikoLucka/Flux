import dotenv from "dotenv"

dotenv.config({quiet: true})

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_UR: process.env.BETTER_AUTH_UR
}