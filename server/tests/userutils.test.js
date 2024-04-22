const mockingoose = require('mockingoose')
const User = require("../models/users");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const { getUserQuestions } = require('../utils/question');

Question.schema.path('answers', Array)
User.schema.path('questions', Array)
Answer.schema.path("question", Array)


const _tag1 = {
    _id: '507f191e810c19729de860ea',
    name: 'react'
};
const _tag2 = {
    _id: '65e9a5c2b26199dbcc3e6dc8',
    name: 'javascript'
};
const _tag3 = {
    _id: '65e9b4b1766fca9451cba653',
    name: 'android'
};

const _ans1 = {
    _id: '65e9b58910afe6e94fc6e6dc',
    text: 'ans1',
    ans_by: 'user2',
    ans_date_time: new Date('2023-11-18T09:24:00')
}

const _ans2 = {
    _id: '65e9b58910afe6e94fc6e6dd',
    text: 'ans2',
    ans_by: 'user2',
    ans_date_time: new Date('2023-11-20T09:24:00')
}

const _ans3 = {
    _id: '65e9b58910afe6e94fc6e6de',
    text: 'ans3',
    ans_by: 'user2',
    ans_date_time: new Date('2023-11-19T09:24:00')
}

const _ans4 = {
    _id: '65e9b58910afe6e94fc6e6df',
    text: 'ans4',
    ans_by: 'user3',
    ans_date_time: new Date('2023-11-19T09:24:00')
}

const _cmt1 = {
    _id: 'comment1',
    text: 'comment text',
    cmt_by: 'user3',
    question: '65e9b58910afe6e94fc6e6dc'
};

const _question1 = {
    _id: '65e9b58910afe6e94fc6e6dc',
    title: 'Quick question about storage on android',
    text: 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains',
    asked_by: "user1",
    ask_date_time: new Date('2020-11-16T09:24:00'),
    tags: [_tag3, _tag2],
    answers: [_ans1, _ans2],
    comments: [_cmt1]
}
const _question2 = {
        _id: '65e9b5a995b6c7045a30d823',
        title: 'Object storage for a web application',
        text: 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.',
        asked_by: "user1",
        ask_date_time: new Date('2021-11-17T09:24:00'),
        tags: [_tag1, _tag2],
        answers: [_ans3],
}
const _question3 = {
        _id: '65e9b9b44c052f0a08ecade0',
        title: 'Is there a language to write programmes by pictures?',
        text: 'Does something like that exist?',
        asked_by: "user3",
        ask_date_time: new Date('2022-11-19T09:24:00'),
        tags: [],
        answers: [_ans4],
}

const _user1 = {
    id: "dummyuserid1",
    username: "user1",
    questions: [_question1,_question2],
    answers: [],
    qComments: []
}

const _user2 = {
    id: "dummyuserid2",
    username: 'user2',
    questions: [],
    answers: [_ans1,_ans2,_ans3],
    qComments: []
}

const _user3 = {
    id: 'dummyuserid3',
    username: 'user3',
    questions: [_question3],
    answers: [_ans4],
    qComments: [_cmt1]
}

describe('utils: getUserQuestions', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    })

    test('should return user asked questions with sorted order', async () => {
        //mocking return and populate
        mockingoose(User).toReturn( {
            ..._user1,
            questions: [_question1,_question2],
        }, 'findOne');


        const result = await getUserQuestions('user1');

        //make sure the length is 2
        expect(result.length).toBe(2);

        //make sure the returned list is sorted by ask_date_time
        expect(result[0]).toBe(_question2)
        expect(result[1]).toBe(_question1)
    })

    test("should return empty list when user did not ask question", async () => {
        mockingoose(User).toReturn( {
            ..._user2,
            questions: []
        }, 'findOne');

        const result = await(getUserQuestions('user2'));
        expect(result.length).toBe(0);
    })

    test("should return user3 asked questions",async () => {
        mockingoose(User).toReturn({
            ..._user3,
            questions: [_question3]
        }, 'findOne')

        const result = await(getUserQuestions('user2'));
        expect(result.length).toBe(1);
        expect(result[0]).toBe(_question3)
    })
})


