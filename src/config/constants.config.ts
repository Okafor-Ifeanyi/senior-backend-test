import * as dotenv from 'dotenv';
import { boolean, number } from 'joi';
dotenv.config();

export const RISE = {
    DATABASE: process.env.DATABASE,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    MAXAGE: 60 * 60,
    PORT: process.env.PORT,
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    HOST: process.env.HOST,
    SSL: process.env.SSL,


    MESSAGES: {
        DATABASE: {
            CONNECTED: "DB is connected",
            ERROR: "There was an error while connecting to the database."
        },
        USER: {
            CREATED: "User created successfully",
            FETCHED: "User fetched successfully",
            FETCHEDALL: "User fetched successfully",
            UPDATED: "User updated successfully",
            DELETED: "User deleted successfully",
            DUPLICATE_ERROR: "Email already exists",
            INVALID_ID_ERROR: "Id doesn't exist",
            INVALID_OBJID_ERROR: "Id is not a valid objectId",
            INVALID_NAME_ERROR: "Invalid name or password",
            INVALID_PASSWORD_ERROR: "Invalid name or password",
            LOGGEDIN: "Login was successful",
            LOGGEDOUT: "Logout was successful"
        },
        POST: {
            CREATED: "Post created successfully",
            FETCHED: "Post fetched successfully",
            FETCHEDALL: "Post fetched successfully",
            UPDATED: "Post updated successfully",
            DELETED: "Post deleted successfully",
            INVALID_POST_ERROR: "Invalid, Post not found",
        },
        COMMENT: {
            CREATED: "Comment created successfully",
            FETCHED: "Comment fetched successfully",
            FETCHEDALL: "Comment fetched successfully",
            UPDATED: "Comment updated successfully",
            DELETED: "Comment deleted successfully",
            INVALID_POST_ERROR: "Invalid, Comment not found"
        },
        TOKEN : {
            EXPIRED: "Expired token, Unauthorized User",
            UNAUTHORIZED: "User not Found, Unauthorized user",
            NOTFOUND: "Authentication token missing"
        }
    }
};