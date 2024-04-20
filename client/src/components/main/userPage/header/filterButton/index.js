import "./index.css"

const FilterButton = ({ message, setQuestionFilter }) => {
    return (
        <button
            className="filterBtn"
            onClick={() => {
                setQuestionFilter(message)
            }}
        >
            {message}
        </button>
    );
};

export default FilterButton;