const Tag = require("../models/tags");
const Question = require("../models/questions");
const User = require("../models/users");


const addTag = async (tname) => {
    let tag = await Tag.findOne({name: tname})
    if (!tag) {
        tag = new Tag({ name: tname});
        const savedTag = await tag.save()
        return savedTag._id
    }
    return tag._id;
};//Jest question.test.js passed


const getQuestionsByOrder = async (order) => {
    let qs = await Question.find().populate('tags').populate('answers');
    if (order.toLowerCase() === 'newest') {
        qs.sort((a,b) => new Date(b.ask_date_time).getTime() - new Date(a.ask_date_time).getTime())
    } else if (order.toLowerCase() === 'active') {
        qs.sort((a,b) => {
            const lastAnsA = a.answers.reduce((latest, ans) => Math.max(latest, new Date(ans.ans_date_time).getTime()), 0);
            const lastAnsB = b.answers.reduce((latest, ans) => Math.max(latest, new Date(ans.ans_date_time).getTime()), 0);

            return lastAnsB - lastAnsA || new Date(b.ask_date_time).getTime() - new Date(a.ask_date_time).getTime();
        })
    } else if (order.toLowerCase() === 'unanswered') {
        qs = qs.filter(q => q.answers.length === 0)
        qs.sort((a,b) => new Date(b.ask_date_time).getTime() - new Date(a.ask_date_time).getTime())
    }
    return qs;
} //passed, temp, ?

const filterQuestionsBySearch = (qlist, search) => {
    const parseTags = (search) => {
        return (search.match(/\[([^\]]+)\]/g) || []).map(tag => tag.slice(1, -1).toLowerCase());
    };

    const parseKeyword = (search) => {
        return search.replace(/\[([^\]]+)\]/g, '').trim().toLowerCase();
    };

    const checkTagInQuestion = (question, searchTags) => {
        return searchTags.some(tag => question.tags.some(qTag => qTag.name.toLowerCase() === tag));
    };

    const checkKeywordInQuestion = (question, searchKeyword) => {
        return question.title.toLowerCase().includes(searchKeyword) || question.text.toLowerCase().includes(searchKeyword);
    };

    let searchTags = parseTags(search);
    let searchKeyword = parseKeyword(search);

    return qlist.filter((q) => {
        if (searchKeyword.length === 0 && searchTags.length === 0) {
            return true
        } else if (searchKeyword.length === 0) {
            return checkTagInQuestion(q, searchTags)
        } else if (searchTags.length === 0) {
            return checkKeywordInQuestion(q, searchKeyword)
        } else {
            return checkKeywordInQuestion(q, searchKeyword) || checkTagInQuestion(q, searchTags)
        }
    });
};


const getUserQuestions = async (username) => {
    const user = await User.findOne({ username })
        .populate({
            path: 'questions',
            populate: {
                path: 'tags',
                model: 'Tag'
            }
        });
    if (!user) {
        throw new Error('User does not exist');
    }

    user.questions.sort((a, b) => b.ask_date_time - a.ask_date_time)
    return user.questions;
};

const getUserAnswers = async (username) => {
    const user = await User.findOne({ username }).populate({
        path: 'answers',
        populate: {
            path: 'question',
            model: 'Question',
            populate: {
                path: 'tags',
                model: 'Tag'
            }
        }
    });
    const answers = user.answers;

    answers.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time))

    const questions = answers.map(answer => answer.question);
    const qset = new Set()
    const uniqueQuestions = questions.filter(question => {
        const duplicate = qset.has(question._id.toString())
        qset.add(question._id.toString())
        return !duplicate
    });

    return uniqueQuestions;
};

const getUserComments = async (username) => {
    const user = await User.findOne({ username }).populate({
        path: 'qComments',
        populate: {
            path: 'question',
            model: 'Question',
            populate: {
                path: 'tags',
                model: 'Tag'
            }
        }
    })

    const questions = user.qComments.map(comment => comment.question);
    const uniqueQuestions = questions.filter((q, index, self) =>
        index === self.findIndex((t) => t._id.equals(q._id))
    );

    return uniqueQuestions

}

module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch, getUserQuestions, getUserAnswers, getUserComments};