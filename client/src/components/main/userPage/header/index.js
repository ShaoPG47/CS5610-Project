import "./index.css"
import FilterButton from "./filterButton"


const UserHeader = ({
    username,
    useremail,
    userCreatedData,
    setQuestionFilter
}) => {
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title" id="usernameUP">{"Welcome, " + username}</div>
                <div className="bold_title" id="useremailUP">{"Email: "+ useremail}</div>
            </div>
            <div className="space_between right_padding">
                <div className="bold_title" id="createdDateUP">{"You joined us on: " + userCreatedData}</div>
                <div className="btns">
                    {["Questions Asked", "Questions Answered", "Questions Commented"].map((m, idx) => (
                        <FilterButton
                            key={idx}
                            message={m}
                            setQuestionFilter = {setQuestionFilter}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserHeader