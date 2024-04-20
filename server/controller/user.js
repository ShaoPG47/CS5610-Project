const express = require("express")

const { getUserQuestions, getUserAnswers, getUserComments} = require("../utils/question")
// const User = require("../models/users")

const router = express.Router();


const getQuestionsByUser = async (req, res) => {
    try {
        const questions = await getUserQuestions(req.params.username);
        res.json(questions);
    } catch (error) {
        res.status(404).json({ message: "404 unknown" });
    }
};

const getAnswersByUser = async (req, res) => {
    try {
        const answers = await getUserAnswers(req.params.username);
        res.json(answers);
    } catch (error) {
        res.status(404).json({ message: "404 unknown" });
    }
};

const getCommentsByUser = async (req, res) => {
    try {
        const comments = await getUserComments(req.params.username);
        res.json(comments);
    } catch (error) {
        res.status(404).json({ message: "404 unknown"});
    }
}

router.get("/getQuestionsByUser/:username", getQuestionsByUser)

router.get("/getAnswersByUser/:username", getAnswersByUser)

router.get('/getCommentsByUser/:username', getCommentsByUser)

module.exports = router