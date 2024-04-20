const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const express = require('express')
const router = express.Router();


const checkUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Username or Password incorrect' });
        }
        const token = jwt.sign({ id: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
        res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({username} ).select('-password')
        if (!user) {
            return res.status(404).json({message: "User do not exist"})
        }
        const date = new Date(user.createdDate)
        const createdDate = (date.getMonth() +1) + '/' + date.getDate() + '/' + date.getFullYear();
        res.json({
            username: user.username,
            useremail: user.useremail,
            createdDate: createdDate
        })
    } catch (error) {
        res.json( {message : error.message})
    }
}

router.post('/checkUser', checkUser)
router.get('/getUserData/:username', getUserData)

module.exports = router;