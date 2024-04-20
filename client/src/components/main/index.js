import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import NewUser from "./newUser";
import OldUser from "./oldUser";
import UserPage from "./userPage"
import NewQcommentPage from "./newQcommentPage";
import NewAcommentPage from "./newAcommentPage";

const Main = ({ search = "", title, setQuesitonPage }) => {
    const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    const [aid, setAid] = useState('')
    const [questionFilter, setQuestionFilter] = useState('Questions Asked')
    let selected = "";
    let content = null;



    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState(null);
    const [useremail, setUseremail] = useState(null);
    const [userCreatedDate, setUserCreatedDate] = useState(null)

    const handleLoggedIn = (username, useremail, userCreatedDate) => {
        setIsLoggedIn(true);
        setPage('home')
        setUsername(username)
        setUseremail(useremail)
        setUserCreatedDate(userCreatedDate)
    }

    const handleLogout = () => {
        localStorage.removeItem("userToken")
        setIsLoggedIn(false);
        setPage('loginPage')
        setUsername(null)
        setUseremail(null)
        setUserCreatedDate(null)
    }

    const handleQuestions = () => {
        setQuesitonPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleUsers = () => {
        setPage('user')
    }

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };


    const clickTag = (tname) => {
        setQuesitonPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };

    const handleLogin = () => {
        setPage('loginPage')
    }

    const handleSignup = () => {
        setPage('signupPage')
    }

    const handleNewQcomment = () => {
        setPage("qCommentPage")
    }

    const handleNewAcomment = (aid) => {
        setAid(aid)
        setPage('aCommentPage')
    }


    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
                handleLogin={handleLogin}
                handleSignup = {handleSignup}
                isLoggedIn = {isLoggedIn}
                handleLogout={handleLogout}
            />
        );
    };

    const getUserPage = (
        filter = "Questions Asked",
        username
    ) => {
        return (
            <UserPage
                filter = {filter}
                username = {username}
                useremail={useremail}
                userCreatedDate={userCreatedDate}
                handleAnswer={handleAnswer}
                clickTag={clickTag}
                setQuestionFilter={setQuestionFilter}
            />
        )
    }



    switch (page) {
        case 'user': {
            selected = "u";
            content = getUserPage(questionFilter, username)
            break;
        }
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                    isLoggedIn={isLoggedIn}
                    handleLogin = {handleLogin}
                    handleSignup = {handleSignup}
                    handleLogout={handleLogout}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    isLoggedIn={isLoggedIn}
                    handleLogout = {handleLogout}
                    handleNewQcomment={handleNewQcomment}
                    handleNewAcomment={handleNewAcomment}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content = <NewQuestion handleQuestions={handleQuestions} username={username} />;
            break;
        }
        case "newAnswer": {
            selected = "";
            content = <NewAnswer qid={qid} handleAnswer={handleAnswer} username = {username}/>;
            break;
        }
        case "signupPage": {
            selected = "";
            content = <NewUser handleLoggedIn={handleLoggedIn}/>
            break;
        }
        case "loginPage": {
            selected = '';
            content = <OldUser handleLoggedin={handleLoggedIn}/>
            break;
        }
        case "qCommentPage": {
            selected = '';
            content = <NewQcommentPage qid={qid} handleAnswer={handleAnswer} username={username}/>
            break;
        }
        case "aCommentPage": {
            selected = '';
            content = <NewAcommentPage
                qid = {qid}
                aid={aid}
                handleAnswer={handleAnswer}
                username={username}
            />
            break;
        }

        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
                handleUsers = {handleUsers}
                username = {username}
                isLoggedIn={isLoggedIn}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>
        </div>
    );
};

export default Main;
