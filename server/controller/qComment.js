const express = require("express");
const Question = require("../models/questions");
const User = require("../models/users")
const Qcomment = require('../models/qComments')


const router = express.Router()


const addQcomment = async (req, res) => {
    const { qid, cmt} = req.body;
    const newQcomment = await Qcomment.create({
        ...cmt,
        question: qid
    })

    await newQcomment.save()

    const updatedQuestion = await Question.findOneAndUpdate(
        {_id: qid },
        { $push: {comments: {$each: [newQcomment._id], $position: 0}}},
        {new: true}
    )


    const updatedUser = await User.findOneAndUpdate(
        {username: cmt.cmt_by },
        {$push: {qComments: newQcomment._id}},
        {new: true}
    )

    if (!updatedQuestion) {
        return res.status(404).send("Question not found")
    }

    if (!updatedUser) {
        return res.status(404).send("User not found")
    }
    res.json(newQcomment)
}

router.post('/addQcomment', addQcomment)

module.exports = router;