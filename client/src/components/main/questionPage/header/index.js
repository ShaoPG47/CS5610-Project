import "./index.css";
import OrderButton from "./orderButton";

const QuestionHeader = ({
    title_text,
    qcnt,
    setQuestionOrder,
    handleNewQuestion,
    handleLogin,
    handleSignup,
    isLoggedIn,
    handleLogout
}) => {
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
                {isLoggedIn ? (
                    <div className="AQnLogoutBtns">
                        <button
                            className="bluebtn"
                            onClick={() => {
                                handleNewQuestion();
                            }}
                        >
                            Ask a Question
                        </button>
                        <button
                            className="logoutBtn"
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className="userBtns">
                        <button
                            className="loginBtn"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Log in
                        </button>
                        <button
                            className="signupBtn"
                            onClick={() => {
                                handleSignup();
                            }}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
            <div className="space_between right_padding">
                <div id="question_count">{qcnt} questions</div>
                <div className="btns">
                    {["Newest", "Active", "Unanswered"].map((m, idx) => (
                        <OrderButton
                            key={idx}
                            message={m}
                            setQuestionOrder={setQuestionOrder}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;