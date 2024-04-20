import "./index.css";

// Header for the Answer page
const AnswerHeader = ({
                          ansCount,
                          title,
                          handleNewQuestion,
                          handleLogin,
                          handleSignup,
                          isLoggedIn,
                          handleLogout
}) => {
    return (
        <div id="answersHeader" className="space_between right_padding">
            <div className="bold_title">{ansCount} answers</div>
            <div className="bold_title answer_question_title">{title}</div>
            { isLoggedIn ? (
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
    );
};

export default AnswerHeader;
