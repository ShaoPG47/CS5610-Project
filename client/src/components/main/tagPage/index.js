import { useEffect, useState } from "react";
import "./index.css";
import Tag from "./tag";
import { getTagsWithQuestionNumber } from "../../../services/tagService";

const TagPage = ({
                     clickTag,
                     handleNewQuestion,
                     isLoggedIn,
                     handleLogin,
                     handleSignup,
                     handleLogout
}) => {
    const [tlist, setTlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getTagsWithQuestionNumber();
            setTlist(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, []);

    return (
        <>
            <div className="space_between right_padding">
                <div className="bold_title">{tlist.length} Tags</div>
                <div className="bold_title">All Tags</div>
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
                            onClick={handleLogin}
                        >
                            Log in
                        </button>
                        <button
                            className="signupBtn"
                            onClick={handleSignup}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
            <div className="tag_list right_padding">
                {tlist.map((t, idx) => (
                    <Tag key={idx} t={t} clickTag={clickTag} />
                ))}
            </div>
        </>
    );
};

export default TagPage;
