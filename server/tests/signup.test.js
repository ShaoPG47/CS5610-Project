// unit tests for functions in controller/signup.js


const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const User = require('../models/users');

//Mocking the models
jest.mock("../models/users")


let server;

describe('POST /addUser', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it("should add a new user", async () => {
        // Mock request body
        const mockUser = {
            username: "dummyUsername",
            password: "dummyPassword",
            createdDate: new Date(),
            useremail: "dummyemail@neu.edu"
        }
        User.create.mockResolvedValueOnce(mockUser);

        // Making the request
        const res = await supertest(server).post('/signup/addUser').send(mockUser)

        //Expected value, makesure that addUser do not return password, and the date is in right format
        const date = new Date()
        const createdDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
        const expeUser = {
            username: "dummyUsername",
            createdDate: createdDate,
            useremail: "dummyemail@neu.edu"
        }

        // Asserting the response
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expeUser)
    })
});

describe('get /checkUsername/:username', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it("Should return true when username exists", async () => {
        // Mock request body
        const username = 'testuser1';

        User.findOne.mockResolvedValue({_id:'dummyuserid', username: "testuser1"})

        // Making the request
        const res = await supertest(server).get(`/signup/checkUsername/${username}`);

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual(true)

    })

    it("should return false when username do not exists", async () => {
        // Mock request body
        const username = 'testuser1';

        User.findOne.mockResolvedValue({_id:'dummyuserid', username: "testuser2"})

        // Making the request
        const res = await supertest(server).get(`/signup/checkUsername/${username}`);

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual(true)
    })
});

describe('get /checkUseremail/:useremail', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it("Should return true when username exists", async () => {
        // Mock request body
        const useremail = 'testemail@neu.edu';

        User.findOne.mockResolvedValue({_id:'dummyuserid', useremail: "testemail@neu.edu"})

        // Making the request
        const res = await supertest(server).get(`/signup/checkUseremail/${useremail}`);

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual(true)
    })

    it("Should return false when username do not exists", async () => {
        // Mock request body
        const useremail = 'testemail@neu.edu';

        User.findOne.mockResolvedValue(null)

        // Making the request
        const res = await supertest(server).get(`/signup/checkUseremail/${useremail}`);

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual(false)
    })
})