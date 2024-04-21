const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const User = require("../models/users")

const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
    const { qid, ans } = req.body;
    const newAnswer = await Answer.create({
        ...ans,
        question: qid
    })

    // await newAnswer.save()

    const updatedQuestion = await Question.findOneAndUpdate(
        { _id: qid },
        { $push: { answers: { $each: [newAnswer._id], $position: 0 } } },
        { new: true }
    );

    const updatedUser = await User.findOneAndUpdate(
        {username: ans.ans_by},
        {$push:  { answers: { $each: [newAnswer._id], $position: 0 } } },
        { new: true}
    )

    if (!updatedQuestion) {
        return res.status(404).send('Question not found');
    }

    if (!updatedUser) {
        return res.status(404).send('User not found');
    }

    res.json(newAnswer);
};

// add appropriate HTTP verbs and their endpoints to the router.
router.post('/addAnswer',addAnswer)

module.exports = router;
