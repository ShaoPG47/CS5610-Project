// Setup database with initial test data.

//If this wont work, user for docker in populate_db.js
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");

mongoose.connect(MONGO_URL);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let User = require('./models/users')
let Qcomments = require('./models/qComments')
let Acomments = require('./models/aComments')


const init = async () => {
    console.log('insert test data into the database')
    if (db) db.close();

    const t1 = new Tag({ name: 'react' });
    await t1.save();
    const t2 = new Tag({ name: 'javascript' });
    await t2.save();
    const t3 = new Tag({ name: 'android-studio' });
    await t3.save();
    const t4 = new Tag({ name: 'shared-preferences' });
    await t4.save();
    const t5 = new Tag({ name: 'storage' });
    await t5.save();
    const t6 = new Tag({ name: 'website' });
    await t6.save();
    const t7 = new Tag({ name: 'Flutter' });
    await t7.save();

    const ac1 = new Acomments({ text: "I tried, it didn't work", cmt_by: "rookieman1" });
    await ac1.save();
    const qc1 = new Qcomments({ text: "I have the same problem!", cmt_by: "fruitloop" });
    await qc1.save();

    const a1 = new Answer({
        text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
        ans_by: 'hamkalo',
        ans_date_time: new Date('2023-11-20T03:24:42')
    });
    await a1.save();
    const a2 = new Answer({
        text: 'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
        ans_by: 'azad',
        ans_date_time: new Date('2023-11-23T08:24:00')
    });
    await a2.save();
    const a3 = new Answer({
        text: 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
        ans_by: 'abaya',
        ans_date_time: new Date('2023-11-18T09:24:00')
    });
    await a3.save();
    const a4 = new Answer({
        text: 'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
        ans_by: 'alia',
        ans_date_time: new Date('2023-11-12T03:30:00')
    });
    await a4.save();
    const a5 = new Answer({
        text: 'I just found all the above examples just too confusing, so I wrote my own.',
        ans_by: 'sana',
        ans_date_time: new Date('2023-11-01T15:24:19')
    });
    await a5.save();
    const a6 = new Answer({
        text: 'Storing content as BLOBs in databases.',
        ans_by: 'abhi3241',
        ans_date_time: new Date('2023-02-19T18:20:59')
    });
    await a6.save();
    const a7 = new Answer({
        text: 'Using GridFS to chunk and store content.',
        ans_by: 'mackson3332',
        ans_date_time: new Date('2023-02-22T17:19:00')
    });
    await a7.save();
    const a8 = new Answer({
        text: 'Store data in a SQLLite database.',
        ans_by: 'ihba001',
        ans_date_time: new Date('2023-03-22T21:17:53'),
        comments: [ac1._id]
    });
    await a8.save();

    const q1 = new Question({
        title: 'Programmatically navigate using React router',
        text: 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.',
        tags: [t1._id, t2._id],
        answers: [a1._id, a2._id],
        asked_by: 'Joji John',
        ask_date_time: new Date('2022-01-20T03:00:00'),
        views: 10
    });
    await q1.save();
    const q2 = new Question({
        title: 'android studio save string shared preference, start activity and load the saved string',
        text: 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what I am using to refrain them from being recreated.',
        tags: [t3._id, t4._id, t2._id],
        answers: [a3._id, a4._id, a5._id],
        asked_by: 'saltyPeter',
        ask_date_time: new Date('2023-01-10T11:24:30'),
        views: 121,
        comments: [qc1._id]
    });
    await q2.save();
    const q3 = new Question({
        title: 'Object storage for a web application',
        text: 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.',
        tags: [t5._id, t6._id],
        answers: [a6._id, a7._id],
        asked_by: 'monkeyABC',
        ask_date_time: new Date('2023-02-18T01:02:15'),
        views: 200
    });
    await q3.save();
    const q4 = new Question({
        title: 'Quick question about storage on android',
        text: 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains',
        tags: [t3._id, t4._id, t5._id],
        answers: [a8._id],
        asked_by: 'elephantCDE',
        ask_date_time: new Date('2023-03-10T14:28:01'),
        views: 103
    });
    await q4.save();


    console.log("done");
};

init().catch((err) => {
    console.log("ERROR: " + err);
    if (db) db.close();
});

console.log("processing ...");
