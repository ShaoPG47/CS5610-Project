import './index.css'
import { useState } from "react";
import Form from "../baseComponents/form";
import Textarea from "../baseComponents/textarea";
import { addAcomment } from "../../../services/aCommentService";

const NewAcomment = ({ qid, aid, handleAnswer, username }) => {
    const [text, setText] = useState('')
    const [textErr, setTextErr] = useState('')

    const postAcomment = async () => {
        let isValid = true;

        if (!text) {
            setTextErr("Comment text cannot be empty")
            isValid = false;
        } else if (text.length > 200) {
            setTextErr("Comment cannot be longer than 200 characters")
            isValid = false;
        }

        const aComment = {
            text: text,
            cmt_by: username
        }

        if (!isValid) {
            return;
        }

        const res = await addAcomment(aid, aComment)

        if (res && res._id) {
            handleAnswer(qid);
        }
    };
    return (
        <Form>
            <Textarea
                title={"Comment Text"}
                id={"aCommentTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postAcomment();
                    }}
                >
                    Post Comment
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
        </Form>
    )
}

export default NewAcomment;