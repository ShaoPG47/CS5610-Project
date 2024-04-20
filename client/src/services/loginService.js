import { REACT_APP_API_URL, api } from "./config";


const USER_API_URL = `${REACT_APP_API_URL}/login`;



const checkUser = async (loginData) => {
    const res = await api.post(`${USER_API_URL}/checkUser`, loginData);
    return res.data;
};

const getUserData = async (username) => {
    const res = await api.get(`${USER_API_URL}/getUserData/${username}`);
    return res.data;
}



export { checkUser, getUserData }