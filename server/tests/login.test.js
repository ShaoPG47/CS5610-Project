// Unit tests for functions in contoller/login.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const User = require('../models/users');

//Mocking the models
jest.mock("../models/users")
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

let server;

describe('POST /checkUser', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it ('Should return token, username and useremail if user exists and password is correct',async () => {
        // Mock request body
        const mockUser = {
            _id: "dummyId",
            username: 'dummyUsername',
            password: "hasedPassword",
            useremail: "dummyemail@neu.edu"
        }

        //Mock password check and token generate
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fakeToken')

        //Mock request
        const res = await supertest(server).post('/login/checkUser').send({
            username: "dummyUsername",
            password: "dummyPassword"
        })

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token','fakeToken')
        expect(res.body).toHaveProperty('userId', "dummyId")
        expect(res.body).toHaveProperty("username", 'dummyUsername')
    })
    it("Should return an error if the password is incorrect", async () => {
        const mockUser = {
            _id: "dummyId",
            username: 'dummyUsername',
            password: "hashedPassword",
            useremail: "dummyemail@neu.edu"
        };

        //Mocking the request that password compare failed
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        const res = await supertest(server).post('/login/checkUser').send({
            username: "dummyUsername",
            password: "incorrectPassword"
        });

        // Asserting the response
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: 'Username or Password incorrect' });

    })

});

describe('GET /getUserData', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it('Should return an object including username, crated date, and user email', async () => {
        const username = 'dummyUsername'
        const mockUser = {
            username: 'dummyUsername',
            useremail: 'dummyemail@neu.edu',
            createdDate: new Date(2024, 0, 1)
        };

        User.findOne.mockImplementation(() => ({
            select: jest.fn().mockResolvedValue({
                username: 'dummyUsername',
                useremail: 'dummyemail@neu.edu',
                createdDate: new Date(2024, 0, 1)
            })
        }));

        const res = await supertest(server).get(`/login/getUserData/${username}`);

        const formattedDate = '1/1/2024';
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            username: 'dummyUsername',
            useremail: 'dummyemail@neu.edu',
            createdDate: formattedDate
        });


    })
});
