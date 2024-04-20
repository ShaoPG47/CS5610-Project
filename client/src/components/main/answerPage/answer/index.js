import { handleHyperlink } from "../../../../tool";
import "./index.css";
import React from "react";

// Component for the Answer Page
const Answer = ({
                    text,
                    ansBy,
                    meta,
                    isLoggedIn,
                    handleUnloggedIn,
                    handleNewAcomment,
                    toggleAcomments,
                    aid
}) => {
    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{ansBy}</div>
                <div className="answer_question_meta">{meta}</div>
            </div>
            <div className="aCommentsBtns">
                <button
                    className="showAcommentsBtn"
                    onClick={() => {
                        toggleAcomments(aid);
                    }}
                >
                    Comments
                </button>
                {isLoggedIn ? (
                    <button
                        className="addAcommentBtn"
                        onClick={() => {
                            handleNewAcomment(aid);
                        }}
                    >
                        Add Comment
                    </button>
                ) : (
                    <button
                        className="noAddAcommentBtn"
                        onClick={handleUnloggedIn}
                    >
                        Add Comment
                    </button>
                )}
            </div>
        </div>
    );
};

export default Answer;
