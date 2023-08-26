import { AppDataSource } from "../data-source"
import app from "../app"
import * as supertest from 'supertest';
import { RISE } from "../config/constants.config"
import { JSON } from "./body"

// Do this before the application starts
beforeAll( async() => {
    await AppDataSource.initialize()
})

// store variables
const value: any = {}

describe("Test user Functionalities", ()=> {
    // Register
    test("Register user",async () => {
        const result = await supertest(app)
                .post("/users/register")
                .send(JSON.createUser)

        expect(result.statusCode).toBe(201)
        expect(result.body.data).toMatchObject({
            id : expect.any(Number),
            age : expect.any(Number),
            name: expect.any(String),
            phoneNumber: expect.any(String),
            createdAt: expect.any(String)
        })
    })
    // Check for duplicate error
    test("Duplicate Error for user", async () => {
        const result = await supertest(app)
                .post("/users/register")
                .send(JSON.createUser)

        expect(result.statusCode).toBe(500)
        expect(result.body.error).toBe('duplicate key value violates unique constraint "UQ_065d4d8f3b5adb4a08841eae3c8"')
    })
    
    // Check if password matcher is active
    test("Wrong Login Password", async () => {
        const result = await supertest(app)
            .post("/users/login")
            .send({ name: "BIO", password: "569484" })

        expect(result.statusCode).toBe(500)
        expect(result.body.error).toEqual(RISE.MESSAGES.USER.INVALID_PASSWORD_ERROR)
    })

    // Check if login works
    test("Login user",async () => {
        const result = await supertest(app)
                .post("/users/login")
                .send(JSON.loginUser)

        // Assign values to the object created above 
        value.key1 = result.body.userID
        value.key2 = result.body.token

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            token: expect.any(String),
            Token_Type: "Bearer",
            userID: expect.any(Number)
        })
    })

    // Get all users
    test("Get all users", async () => {
        const result = await supertest(app)
            .get("/users/")
            .set('Authorization', `Bearer ${value.key2}`)

        expect(result.statusCode).toBe(201)
        expect(result.body).toMatchObject({ success: true });
    })

    // Get 1 user
    test("Get a user", async () => {
        const result = await supertest(app)
            .get(`/users/${value.key1}`)
            .set('Authorization', `Bearer ${value.key2}`)

        expect(result.statusCode).toBe(201)
        expect(result.body.message).toEqual(RISE.MESSAGES.USER.FETCHED)
        expect(result.body).toMatchObject({ success: true });
    })

    describe("Test post Functionalities", ()=> {
        // Register
        test("Create post",async () => {
            const result = await supertest(app)
                    .post(`/users/${value.key1}/posts/create`)
                    .send(JSON.createPost)
                    .set('Authorization', `Bearer ${value.key2}`)
            
            value.key3 = result.body.data.id
            expect(result.statusCode).toBe(201)
            expect(result.body.data).toMatchObject({
                id : expect.any(Number),
                title : expect.any(String),
                description: expect.any(String),
                content: expect.any(String),
                createdAt: expect.any(String)
            })
        })
        // Check for duplicate error
        test("Duplicate Error for post", async () => {
            const result = await supertest(app)
                    .post(`/users/${value.key1}/posts/create`)
                    .send(JSON.createPost)
                    .set('Authorization', `Bearer ${value.key2}`)

    
            expect(result.statusCode).toBe(500)
            expect(result.body.error).toBe('duplicate key value violates unique constraint "UQ_e28aa0c4114146bfb1567bfa9ac"')
        })
    
        // Get all posts
        test("Get all posts", async () => {
            const result = await supertest(app)
                .get(`/users/${value.key1}/posts/`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body).toMatchObject({ success: true });
        })
    
        // Get 1 post
        test("Get a post", async () => {
            const result = await supertest(app)
                .get(`/users/${value.key1}/posts/${value.key3}`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(RISE.MESSAGES.POST.FETCHED)
            expect(result.body).toMatchObject({ success: true });
        })
    
        // Get 1 post
        test("Get my posts", async () => {
            const result = await supertest(app)
                .get(`/users/${value.key1}/posts/mine`)
                .set('Authorization', `Bearer ${value.key2}`)
            
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(RISE.MESSAGES.POST.FETCHED)
            expect(result.body).toMatchObject({ success: true });
        })
    
        // Delete test post that was just created
        test("delete a post", async () => {
            const result = await supertest(app)
                .delete(`/users/${value.key1}/posts/${value.key3}`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(RISE.MESSAGES.POST.DELETED)
            expect(result.body).toMatchObject({ success: true });
        })
    })

    describe("Test comment Functionalities", ()=> {
        // Register
        test("Create comment",async () => {
            const result = await supertest(app)
                    .post(`/users/${value.key1}/posts/${value.key3}/comments/create`)
                    .send(JSON.createComment)
                    .set('Authorization', `Bearer ${value.key2}`)
            
            value.key4 = result.body.data.id
            expect(result.statusCode).toBe(201)
            expect(result.body.data).toMatchObject({
                id : expect.any(Number),
                message : expect.any(String),
                author: expect.any(Object),
                post: expect.any(Object),
                createdAt: expect.any(String)
            })
        })
    
        // Get all comments
        test("Get all comments", async () => {
            const result = await supertest(app)
                .get(`/users/${value.key1}/posts/${value.key3}/comments/`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body).toMatchObject({ success: true });
        })
    
        // Get 1 comment
        test("Get a comment", async () => {
            const result = await supertest(app)
                .get(`/users/${value.key1}/posts/${value.key3}/comments/${value.key4}`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(RISE.MESSAGES.COMMENT.FETCHED)
            expect(result.body).toMatchObject({ success: true });
        })
    
        // Delete test comment that was just created
        test("delete a comment", async () => {
            const result = await supertest(app)
                .delete(`/users/${value.key1}/posts/${value.key3}/comments/${value.key4}`)
                .set('Authorization', `Bearer ${value.key2}`)
    
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(RISE.MESSAGES.COMMENT.DELETED)
            expect(result.body).toMatchObject({ success: true });
        })
    })

    // Delete test user that was just created
    test("delete a user", async () => {
        const result = await supertest(app)
            .delete(`/users/${value.key1}`)
            .set('Authorization', `Bearer ${value.key2}`)

        expect(result.statusCode).toBe(201)
        expect(result.body.message).toEqual(RISE.MESSAGES.USER.DELETED)
        expect(result.body).toMatchObject({ success: true });
    })
})

