const express = require("express")
const User = require("../models/users")

const router = express.Router();

const addUser = async (req, res) => {
    try {
        const { username, password, useremail } = req.body;

        const existingUserByUsrn = await User.findOne({ username });

        if (existingUserByUsrn) {
            return res.status(409).json({ message:"UsernameErr"});
        }

        const existingUserByEmal = await User.findOne({ useremail });

        if (existingUserByEmal) {
            return res.status(410).json({ message: "EmailErr" })
        }

        const newUser = await User.create({
            username: username,
            password: password,
            useremail: useremail,
            createdDate: new Date()
        })

        const date = new Date(newUser.createdDate)
        const createdDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            useremail: newUser.useremail,
            createdDate: createdDate
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const checkUsername = async (req, res) => {
    const username = req.params.username;
    const usernameStatus = await User.findOne({username});
    if (usernameStatus) {
        return res.json(true)
    } else {
        return res.json(false)
    }
}

const checkUseremail = async(req, res) => {
    const useremail = req.params.useremail;
    const useremailStatus = await User.findOne({useremail});
    if (useremailStatus) {
        return res.json(true)
    } else {
        return res.json(false)
    }
}

router.post('/addUser', addUser)

router.get('/checkUsername/:username', checkUsername)

router.get('/checkUseremail/:useremail', checkUseremail)

module.exports = router