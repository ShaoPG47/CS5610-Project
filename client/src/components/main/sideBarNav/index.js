import "./index.css";

const SideBarNav = ({
                        selected = "",
                        handleQuestions,
                        handleTags,
                        handleUsers,
                        username,
                        isLoggedIn
}) => {
    return (
        <div id="sideBarNav" className="sideBarNav">
            <div
                id="menu_question"
                className={`menu_button ${
                    selected === "q" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleQuestions();
                }}
            >
                Questions
            </div>
            <div
                id="menu_tag"
                className={`menu_button ${
                    selected === "t" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleTags();
                }}
            >
                Tags
            </div>
            {isLoggedIn && (
                <div
                    id="menu_user"
                    className={`menu_button ${
                        selected === "u" ? "menu_selected" : ""
                    }`}
                    onClick={() => {
                        handleUsers()
                    }}
                >
                    {username}
                </div>
            )}
        </div>
    );
};

export default SideBarNav;
