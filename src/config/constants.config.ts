import * as dotenv from 'dotenv';
dotenv.config();

export const constants = {
    DATABASE: process.env.DATABASE,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

    MESSAGES: {
        DATABASE: {
            CONNECTED: "MongoDB is connected",
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
            INVALID_EMAIL_ERROR: "Invalid email or password",
            INVALID_PASSWORD_ERROR: "Invalid email or password",
            LOGGEDIN: "Login was successful",
            LOGGEDOUT: "Logout was successful"
        }
    }
};