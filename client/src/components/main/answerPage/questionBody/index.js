import "./index.css";
import React from "react";
import { handleHyperlink } from "../../../../tool";

// Component for the Question's Body
const QuestionBody = ({
                          views,
                          text,
                          askby,
                          meta,
                          toggleQcomments,
                          handleNewQcomment,
                          isLoggedIn,
                          handleUnloggedIn
}) => {
    return (
        <div id="questionBody" className="questionBody right_padding">
            <div className="bold_title answer_question_view">{views} views</div>
            <div className="answer_question_text">{handleHyperlink(text)}</div>
            <div className="answer_question_right">
                <div className="question_author">{askby}</div>
                <div className="answer_question_meta">asked {meta}</div>
            </div>
            <div className="qCommentsBtns">
                <button className="showQcommentsBtn" onClick={toggleQcomments}>
                    Comments
                </button>
                {isLoggedIn ? (
                    <button
                        className="addQcommentBtn"
                        onClick={() => {
                            handleNewQcomment();
                        }}
                    >
                        Add Comment
                    </button>
                ) : (
                    <button
                        className="noAddQcommentBtn"
                        onClick={handleUnloggedIn}
                    >
                        Add Comment
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionBody;
