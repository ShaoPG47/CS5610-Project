import './index.css'
import UserHeader from "./header";
import UserQuestion from "./question";

import { getQuestionsByUser, getAnswersByUser, getCommentsByUser} from "../../../services/userService";
import {useEffect, useState} from "react";

const UserPage = ({
    filter,
    username,
    useremail,
    userCreatedDate,
    handleAnswer,
    clickTag,
    setQuestionFilter
}) => {
    const [qlist, setQlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res;
            if (filter === 'Questions Answered') {
                res = await getAnswersByUser(username)
            } else if (filter === "Questions Asked") {
                res = await getQuestionsByUser(username)
            } else if (filter === "Questions Commented") {
                res = await getCommentsByUser(username)
            }
            setQlist(res || [])
        }
        fetchData().catch((e) => console.log(e))
    }, [username, filter])

    return (
        <>
            <UserHeader
                username = {username}
                useremail={useremail}
                userCreatedData = {userCreatedDate}
                setQuestionFilter = {setQuestionFilter}
            />
            <div id="question_list" className="question_list">
                {qlist.map((q, idx) => (
                    <UserQuestion
                        q = {q}
                        key = {idx}
                        clickTag={clickTag}
                        handleAnswer={handleAnswer}
                    />
                ))}
            </div>
        </>
    )

}



export default UserPage