const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {
    const tags = await Tag.find();
    const questions = await Question.find().populate('tags');
    const tagCounts = tags.map(tag => {
        const qcnt = questions.filter(question =>
            question.tags.some(t => t.name === tag.name)).length;
        return { name: tag.name, qcnt: qcnt };
    });

    res.json(tagCounts);
}

// add appropriate HTTP verbs and their endpoints to the router.
router.get('/getTagsWithQuestionNumber', getTagsWithQuestionNumber)

module.exports = router;
