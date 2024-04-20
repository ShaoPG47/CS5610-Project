import "./index.css";

const QuestionComments = ({
    cmtBy,
    text
}) => {
    return (
        <div id = 'questionComments'
             className='questionComments right_padding'
        >
            <div className="qCommentsBy">
                {cmtBy+": "}
            </div>
            <div className="qCommentsText">
                {text}
            </div>
        </div>
    )
}

export default QuestionComments