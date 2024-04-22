// unit tests for functions in controller/user.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const {getUserQuestions, getUserAnswers, getUserComments } = require('../utils/question')

//Mocking the models
jest.mock("../models/questions")

jest.mock("../utils/question", () => ({
    getUserQuestions: jest.fn(),
    getUserAnswers: jest.fn(),
    getUserComments: jest.fn()
}))

let server;

describe('GET /getQuestionsByUser/:username', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it("should return questions by username", async () => {
        const mockQuestions = [{ id: "dummyId1", title: "dummyTitle1" }];
        getUserQuestions.mockResolvedValue(mockQuestions);

        const response = await supertest(server).get('/user/getQuestionsByUser/testUser');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuestions);
        expect(getUserQuestions).toHaveBeenCalledWith('testUser');
    })
});

describe('GET /getAnswersByUser', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect()
    })

    it("should return questions that user answered", async () => {
        const mockQuestions = [{ id: "dummyId2", title: "dummyTitle2" }];
        getUserAnswers.mockResolvedValue(mockQuestions);

        const response = await supertest(server).get('/user/getAnswersByUser/testUser2');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuestions);
        expect(getUserAnswers).toHaveBeenCalledWith('testUser2');
    })

});

describe("GET /getCommentsByUser/:username", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("Should return questions that user commented", async () => {
        const mockQuestions = [{ id: "dummyId3", title: "dummyTitle3" }];
        getUserComments.mockResolvedValue(mockQuestions);

        const response = await supertest(server).get('/user/getCommentsByUser/testUser3');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuestions);
        expect(getUserComments).toHaveBeenCalledWith('testUser3');
    });
})