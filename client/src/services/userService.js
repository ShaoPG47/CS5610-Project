import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;


const getQuestionsByUser = async (username) => {
    const res = await api.get(`${USER_API_URL}/getQuestionsByUser/${username}`);
    return res.data;
};

const getAnswersByUser = async (username) => {
    const res = await api.get(`${USER_API_URL}/getAnswersByUser/${username}`);
    return res.data;
};

const getCommentsByUser = async (username) => {
    const res = await api.get(`${USER_API_URL}/getCommentsByUser/${username}`)
    return res.data
}

export { getQuestionsByUser, getAnswersByUser, getCommentsByUser }