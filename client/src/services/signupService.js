import { REACT_APP_API_URL, api } from "./config";


const USER_API_URL = `${REACT_APP_API_URL}/signup`;


const addUser = async ( userData ) => {
    const res = await api.post(`${USER_API_URL}/addUser`, userData);
    return res.data
}

const checkUseremail = async (useremail) => {
    const res = await api.get(`${USER_API_URL}/checkUseremail/${useremail}`)
    return res.data
}

const checkUsername = async (username) => {
    const res = await api.get(`${USER_API_URL}/checkUsername/${username}`)
    return res.data
}

export { addUser, checkUseremail, checkUsername }