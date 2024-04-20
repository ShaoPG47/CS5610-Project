import "./index.css";

const AnswerComments = ({
    cmtBy,
    text
}) => {
    return (
        <div id = 'answerComments'
             className='answerComments right_padding'
        >
            <div className="aCommentsBy">
                {cmtBy+": "}
            </div>
            <div className="aCommentsText">
                {text}
            </div>
        </div>
    )
}

export default AnswerComments;