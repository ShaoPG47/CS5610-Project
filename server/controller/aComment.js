const express = require("express")
const User = require("../models/users")
const Answer = require('../models/answers')
const Acomment = require("../models/aComments")

const router = express.Router();

const addAcomment = async (req, res) => {
    const { aid, cmt} = req.body;

    if (!aid) {
        return res.status(400).json({error: "Answer do not exist"})
    }

    if (!cmt ) {
        return res.status(400).json({error: "Comment do not exist"})
    }
    try {
        const newAcomment = await Acomment.create({
            ...cmt,
            answer: aid
        })


        // await newAcomment.save()

        const updatedAnswer = await Answer.findOneAndUpdate(
            {_id: aid},
            {$push : { comments: {$each: [newAcomment._id], $position: 0}}},
            {new: true}
        )

        const updatedUser = await User.findOneAndUpdate(
            {username: cmt.cmt_by },
            {$push:  { aComments: { $each: [newAcomment._id], $position: 0 } } },
            {new: true}
        )

        if (!updatedAnswer) {
            return res.status(404).send("Question not found")
        }

        if (!updatedUser) {
            return res.status(404).send("User not found")
        }
        res.json(newAcomment)
    } catch (error) {
        console.error("Error in addAcomment", error)
        res.status(500).json({error: "Unknown Error"})
    }
}

router.post('/addAcomment', addAcomment)

module.exports = router;