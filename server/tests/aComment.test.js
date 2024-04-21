// Unit tests for addComment in contoller/aComment.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Answer = require("../models/answers");
const User = require("../models/users")
const Acomment = require("../models/aComments")

// Mock the Answer model
jest.mock("../models/answers");
jest.mock("../models/users")
jest.mock("../models/aComments")

let server;
describe('POST /addAcomment', () => {
    beforeEach(() => {
        server = require("../server")
    })

    afterEach(async() => {
        server.close();
        await mongoose.disconnect()
    })

    it("should add a new answer comment to the answer and update user", async () => {
        // Mocking the request body
        const mockReqBody = {
            aid: "dummyAnswerId",
            cmt: {
                text: "This is a test answer comment",
                cmt_by: "testuser1"
            }
        }

        const mockAcomment = {
            _id: "dummyAcommentId",
            text: "This is a test answer comment",
            cmt_by: "testuser1"
        }

        // Mock the create method of the Acomment model
        Acomment.create.mockResolvedValueOnce(mockAcomment)

        // Mocking the Answer.findOneAndUpdate method
        Answer.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyAnswerId",
            comments: ["dummyAcommentId"]
        })

        // Mocking the User.findOneAndUpdate method
        User.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            username: "testuser1",
            aComments: ["dummyAcommentId"]
        })

        // Making the request
        const res = await supertest(server).post("/aComment/addAcomment").send(mockReqBody)

        // Asserting the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockAcomment)


        // Verifying that Acomment.create method was called with the correct arguments
        expect(Acomment.create).toHaveBeenCalledWith({
            ...mockReqBody.cmt,
            answer: mockReqBody.aid
        })

        // Verifying that Answer.findOneAndUpdate method was called with the correct arguments
        expect(Answer.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "dummyAnswerId" },
            { $push: { comments: { $each: ["dummyAcommentId"], $position: 0 } } },
            { new: true }
        );

        //Verifying that User.findOneAndUpdate method was called with theh correct aruguments
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            {username: "testuser1"},
            { $push: { aComments: { $each: ["dummyAcommentId"], $position: 0 } } },
            { new: true }
        )

    })
});