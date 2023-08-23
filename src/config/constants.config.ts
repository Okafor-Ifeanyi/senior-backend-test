import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    DATABASE: process.env.DATABASE,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};