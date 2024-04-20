import "./index.css";
import { useState } from "react";
import Form from "../baseComponents/form";
import Textarea from "../baseComponents/textarea";
import { addQcomment } from "../../../services/qCommentService";

const NewQcomment = ({ qid, handleAnswer, username }) => {
    const [text, setText] = useState('')
    const [textErr, setTextErr] = useState('')

    const postQcomment = async () => {
        let isValid = true;

        if (!text) {
            setTextErr("Comment text cannot be empty")
            isValid = false;
        } else if (text.length > 200) {
            setTextErr("Comment cannot be longer than 200 characters")
            isValid = false;
        }

        const qComment = {
            text: text,
            cmt_by: username
        }

        if (!isValid) {
            return;
        }

        const res = await addQcomment(qid, qComment)

        if (res && res._id) {
            handleAnswer(qid);
        }
    };
    return (
        <Form>
            <Textarea
                title={"Comment Text"}
                id={"qCommentTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postQcomment();
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
};

export default NewQcomment;