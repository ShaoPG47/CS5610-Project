const express = require("express");
const Question = require("../models/questions");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');

const User = require('../models/users')

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    const {order, search} = req.query
    let questions = await getQuestionsByOrder(order)
    questions = filterQuestionsBySearch(questions, search)
    res.json(questions)
};

// To get Questions by Id
const getQuestionById = async (req, res) => {
    const qid = req.params.qid;

    const updatedQuestion = await Question.findOneAndUpdate(
        { _id: qid },
        { $inc: { views: 1 } },
        { new: true }
    )
    .populate({
        path: 'answers',
        populate: {
            path: 'comments',
            model: 'Acomment'
        }
    })
    .populate({
        path: 'comments',
        model: 'Qcomment'
    });

    if (!updatedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);

};

// To add Question
const addQuestion = async (req, res) => {
    const { title, text, tags, asked_by, ask_date_time } = req.body;

    const tagIds = await Promise.all(tags.map(async tagName => {
        return await addTag(tagName)
    }))

    const newQuestion = await Question.create({
        title,
        text,
        asked_by,
        ask_date_time: new Date(ask_date_time),
        views: 0,
        tags: tagIds
    });

    await User.findOneAndUpdate(
        { username: asked_by },
        { $push: { questions: newQuestion._id}}
    )

    res.json(newQuestion);
};


// add appropriate HTTP verbs and their endpoints to the router
router.get('/getQuestion', getQuestionsByFilter)

router.get('/getQuestionById/:qid', getQuestionById)

router.post('/addQuestion', addQuestion)

module.exports = router;