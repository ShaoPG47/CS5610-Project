// Unit tests for addAnswer in contoller/answer.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Answer = require("../models/answers");
const Question = require("../models/questions");
const User = require("../models/users")

// Mock the Answer model
jest.mock("../models/answers");
jest.mock("../models/questions")
jest.mock("../models/users")

let server;
describe("POST /addAnswer", () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it("should add a new answer to the question and update user", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
          ans_by: "testuser1"
      }
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer",
        ans_by: "testuser1"
    }
    // Mock the create method of the Answer model
    Answer.create.mockResolvedValueOnce(mockAnswer);

    // Mocking the Question.findOneAndUpdate method
    Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"]
    });

    // Mocking the User.findOneAndUpdate method
    User.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
        username: "testuser1",
        answers: ["dummyAnswerId"]
    })

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);

    // Verifying that Answer.create method was called with the correct arguments
    expect(Answer.create).toHaveBeenCalledWith({
      ...mockReqBody.ans,
        question: mockReqBody.qid
    });

    // Verifying that Question.findOneAndUpdate method was called with the correct arguments
    expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "dummyQuestionId" },
      { $push: { answers: { $each: ["dummyAnswerId"], $position: 0 } } },
      { new: true }
    );

    //Verifying that User.findOneAndUpdate method was called with theh correct aruguments
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        {username: "testuser1"},
        { $push: { answers: { $each: ["dummyAnswerId"], $position: 0 } } },
        { new: true }
    )
  });
});