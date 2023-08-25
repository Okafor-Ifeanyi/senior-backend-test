import * as dotenv from 'dotenv';
dotenv.config();

export const riseConsts = {
    DATABASE: process.env.DATABASE,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    MAXAGE: 60 * 60,

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
        TOKEN : {
            EXPIRED: "Expired token, Unauthorized User",
            UNAUTHORIZED: "User not Found, Unauthorized user",
            NOTFOUND: "Authentication token missing"
        }
    }
};