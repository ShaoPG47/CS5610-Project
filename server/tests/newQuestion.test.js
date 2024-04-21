// unit tests for functions in controller/question.js


const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require('../models/questions');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');

// Mocking the models
jest.mock("../models/questions");
jest.mock('../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
}));

jest.mock("../models/users")

let server;

const mockQuestionComments = [
  {
    _id: '5fc10b3abd927f42f0f3f123',
    text: 'This is a comment for the question.',
    cmt_by: 'user123'
  },
  {
    _id: '5fc10b3abd927f42f0f3f456',
    text: 'Another comment for the question.',
    cmt_by: 'user456'
  }
];

const mockAnswerComments = [
  {
    _id: '5fc10b3abd927f42f0f3f789',
    text: 'This is a comment for the answer.',
    cmt_by: 'user789'
  },
  {
    _id: '5fc10b3abd927f42f0f3f101',
    text: 'Another comment for the answer.',
    cmt_by: 'user101'
  }
];

const tag1 = {
  _id: '507f191e810c19729de860ea',
  name: 'tag1'
};
const tag2 = {
  _id: '65e9a5c2b26199dbcc3e6dc8',
  name: 'tag2'
};

const ans1 = {
  _id: '65e9b58910afe6e94fc6e6dc',
  text: 'Answer 1 Text',
  ans_by: 'answer1_user',

}

const ans2 = {
  _id: '65e9b58910afe6e94fc6e6dd',
  text: 'Answer 2 Text',
  ans_by: 'answer2_user',

}

const mockQuestions = [
  {
      _id: '65e9b58910afe6e94fc6e6dc',
      title: 'Question 1 Title',
      text: 'Question 1 Text',
      tags: [tag1],
      answers: [ans1],
      views: 21
  },
  {
      _id: '65e9b5a995b6c7045a30d823',
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [tag2],
      answers: [ans2],
      views: 99
  }
]

describe('GET /getQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };

    getQuestionsByOrder.mockResolvedValueOnce(mockQuestions);
    filterQuestionsBySearch.mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });
});

describe('GET /getQuestionById/:qid', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return a question by id and increment its views by 1', async () => {
    const qid = '65e9b5a995b6c7045a30d823';
    const views = 100;

    //Mocking the question after viewed
    const questionAfterUpdate = {
      _id: qid,
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [tag2._id],
      answers: [ans2._id],
      views: views
    };

    // Mock findOneAndUpdate
    Question.findOneAndUpdate.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(questionAfterUpdate)
      })
    });

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${qid}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(questionAfterUpdate);
    expect(response.body.views).toBe(views);
  });

  //Check for populate answer

    it("should return a question by id and it's answers and comments", async () => {
        const qid = '65e9b5a995b6c7045a30d823';

        //mock populated question
        const populatedQuestion = {
            _id: qid,
            title: 'Question 2 Title',
            text: 'Question 2 Text',
            tags: [tag2],
            answers: [{
                _id: ans2._id,
                text: ans2.text,
                ans_by: ans2.ans_by,
                comments: mockAnswerComments
            }],
            views: 100,
            comments: mockQuestionComments
        };

        //mock findOneAndUpdate
        Question.findOneAndUpdate.mockReturnValue({
            populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(populatedQuestion)
            })
        });

        //making the request
        const response = await supertest(server)
            .get(`/question/getQuestionById/${qid}`);

        //Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(populatedQuestion);
        expect(response.body.answers[0].comments).toEqual(expect.arrayContaining(mockAnswerComments));
        expect(response.body.comments).toEqual(expect.arrayContaining(mockQuestionComments));
    })
});

describe('POST /addQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should add a new question', async () => {
    // Mock request body

    const mockTags = [tag1, tag2];

    const mockQuestion = {
      _id: '65e9b58910afe6e94fc6e6fe',
      title: 'Question 3 Title',
      text: 'Question 3 Text',
      tags: [tag1, tag2],
      answers: [ans1],
    }

    addTag.mockResolvedValueOnce(mockTags);
    Question.create.mockResolvedValueOnce(mockQuestion);

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestion);

  });
});