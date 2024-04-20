import React, { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";

import QuestionComments from "./questionComments";
import AnswerComments from "./answerComments";

// Component for the Answers page
const AnswerPage = ({ 
                        qid, 
                        handleNewQuestion, 
                        handleNewAnswer,
                        handleLogin,
                        handleSignup,
                        isLoggedIn,
                        handleLogout,
                        handleNewQcomment,
                        handleNewAcomment
}) => {
    const [showQcomments, setShowQcomments] = useState(false)
    const [showAcomments, setShowAcomments] = useState({})

    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    const handleUnloggedIn = () => {
        alert("You need to log in first")
    }

    const toggleQcomments = () => setShowQcomments(!showQcomments)

    const toggleAcomments = (aid) => {
        setShowAcomments(prev => (
            {...prev, [aid] : !(prev[aid] || false)}
        ))
    }


    return (
        <>
            <AnswerHeader
                ansCount={
                    question && question.answers && question.answers.length
                }
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
            />
            <QuestionBody
                views={question && question.views}
                text={question && question.text}
                askby={question && question.asked_by}
                meta={question && getMetaData(new Date(question.ask_date_time))}
                toggleQcomments = {toggleQcomments}
                handleNewQcomment={handleNewQcomment}
                isLoggedIn = {isLoggedIn}
                handleUnloggedIn = {handleUnloggedIn}
            />
            {showQcomments &&
                (question.comments &&
                question.comments.length > 0 ? (
                    question.comments.map((c, idx) => (
                        <QuestionComments
                            key={idx}
                            text={c.text}
                            cmtBy={c.cmt_by}
                        />
                    ))
                ) : (
                    <QuestionComments
                        text="No comments yet, leave your comment!"
                        cmtBy=""
                    />
                ))}
            {question &&
                question.answers &&
                question.answers.map((a, idx) => (
                    <React.Fragment key = {idx}>
                        <Answer
                            key={idx}
                            text={a.text}
                            ansBy={a.ans_by}
                            meta={getMetaData(new Date(a.ans_date_time))}
                            isLoggedIn = {isLoggedIn}
                            handleUnloggedIn = {handleUnloggedIn}
                            handleNewAcomment={handleNewAcomment}
                            toggleAcomments={() => toggleAcomments(a._id)}
                            showAcomments = {showAcomments[a._id] || false}
                            aid = {a._id}
                        />
                        {showAcomments[a._id] &&
                            (a.comments &&
                            a.comments.length > 0 ? (
                                a.comments.map((c, id) => (
                                    <AnswerComments
                                        key={id}
                                        text={c.text}
                                        cmtBy={c.cmt_by}
                                    />
                                ))
                            ) : (
                                <AnswerComments
                                    text="No comments yet, leave your comment!"
                                    cmtBy=""
                                />
                            ))}
                    </React.Fragment>
                ))}
            {isLoggedIn ? (
                <button
                    className="bluebtn ansButton"
                    onClick={() => {
                        handleNewAnswer();
                    }}
                >
                    Answer Question
                </button>
            ) : (
                <button
                    className="graybtn ansButton"
                    onClick={handleUnloggedIn}
                >
                    Answer Question
                </button>
            )}
        </>
    );
};

export default AnswerPage;
