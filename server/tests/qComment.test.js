// Unit tests for addQcomment in contoller/qComment.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require("../models/questions");
const User = require("../models/users")
const Qcomment = require("../models/qComments")

// Mock the Answer model
jest.mock("../models/questions");
jest.mock("../models/users")
jest.mock("../models/qComments")

let server;
describe('POST /addQcomment', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should add a new question comment to the question and update user", async () => {
        // Mocking the request body
        const mockReqBody = {
            qid: "dummyQuestionId",
            cmt: {
                text: "This is a test question comment",
                cmt_by: "testuser1"
            }
        }

        const mockQcomment = {
            _id: "dummyQcommentId",
            text:"This is a test question comment",
            cmt_by: "testuser1"
        }

        // Mock the create method of the Qcomment model
        Qcomment.create.mockResolvedValueOnce(mockQcomment)

        // Mocking the Question.findOneAndUpdate method
        Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyQuestionId",
            comments: ["dummyQcommentId"]
        })

        // Mocking the User.findOneAndUpdate method
        User.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            username: 'testuser1',
            qComments: ['dummyQcommentId']
        })

        // Making the request
        const res = await supertest(server).post("/qComment/addQcomment").send(mockReqBody)

        // Asserting the response
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockQcomment)

        // Verifying that Qcomment.create method was called with the correct arguments
        expect(Qcomment.create).toHaveBeenCalledWith({
            ...mockReqBody.cmt,
            question: mockReqBody.qid
        })

        // Verifying that Question.findOneAndUpdate method was called with the correct arguments
        expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
            {_id: "dummyQuestionId"},
            { $push: {comments: { $each: ["dummyQcommentId"], $position: 0}}},
            {new:true}
        )

        //Verifying that User.findOneAndUpdate method was called with theh correct aruguments
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            {username: "testuser1"},
            { $push: { qComments: {$each: ["dummyQcommentId"], $position: 0}}},
            {new:true}
        )
    })
})