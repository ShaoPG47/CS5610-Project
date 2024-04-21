const mockingoose = require('mockingoose')
const User = require("../models/users");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const Qcomment = require("../models/qcomments");
const { getUserQuestions, getUserAnswers, getUserComments } = require('../utils/question');

Question.schema.path('answers', Array)

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
    ans_by: 'ans_by1',
    ans_date_time: new Date('2023-11-18T09:24:00')
}

const _ans2 = {
    _id: '65e9b58910afe6e94fc6e6dd',
    text: 'ans2',
    ans_by: 'ans_by2',
    ans_date_time: new Date('2023-11-20T09:24:00')
}

const _ans3 = {
    _id: '65e9b58910afe6e94fc6e6de',
    text: 'ans3',
    ans_by: 'ans_by3',
    ans_date_time: new Date('2023-11-19T09:24:00')
}

const _ans4 = {
    _id: '65e9b58910afe6e94fc6e6df',
    text: 'ans4',
    ans_by: 'ans_by4',
    ans_date_time: new Date('2023-11-19T09:24:00')
}

const _cmt1 = {
    _id: 'comment1',
    text: 'comment text',
    cmt_by: 'cmt_by1',
    question: '65e9b58910afe6e94fc6e6dc'
};

const _questions = [
    {
        _id: '65e9b58910afe6e94fc6e6dc',
        title: 'Quick question about storage on android',
        text: 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains',
        asked_by: "user1",
        ask_date_time: new Date('2020-11-16T09:24:00'),
        tags: [_tag3, _tag2],
        answers: [_ans1, _ans2],
        comments: [_cmt1]
    },
    {
        _id: '65e9b5a995b6c7045a30d823',
        title: 'Object storage for a web application',
        text: 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.',
        asked_by: "user1",
        ask_date_time: new Date('2021-11-17T09:24:00'),
        tags: [_tag1, _tag2],
        answers: [_ans3],
    },
    {
        _id: '65e9b9b44c052f0a08ecade0',
        title: 'Is there a language to write programmes by pictures?',
        text: 'Does something like that exist?',
        asked_by: "user2",
        ask_date_time: new Date('2022-11-19T09:24:00'),
        tags: [],
        answers: [_ans4],
    },
    {
        _id: '65e9b716ff0e892116b2de09',
        title: 'Unanswered Question #2',
        text: 'Does something like that exist?',
        asked_by: "user3",
        ask_date_time: new Date('2023-11-20T09:24:00'),
        tags: [],
        answers: [],
    },
]

const _user1 = {
            _id: 'testuserid1',
            username: 'user1',
            questions: _questions.slice(0,2)
}


const _userWithPopulatedData = {
    ..._user1,
    questions: _questions.filter(q => q.asked_by === _user1.username).map(q => ({
        ...q,
        tags: [ _tag1, _tag2 ],
        answers: _questions[0].answers.map(ans => ({
            ...ans,
            tags: [ _tag3 ],
        }))
    }))
};

mockingoose(User).toReturn(_userWithPopulatedData, 'findOne');

describe('utils: getUserQuestions', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose(User).toReturn(_userWithPopulatedData, 'findOne');
    })

    test('should return user asked questions', async () => {
        const username = 'testUser';

        const questions = await getUserQuestions(username);

        expect(questions.length).toBe(2);
    })
})