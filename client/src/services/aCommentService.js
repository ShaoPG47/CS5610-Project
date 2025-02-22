import { REACT_APP_API_URL, api } from "./config";

const ACOMMENT_API_URL = `${REACT_APP_API_URL}/aComment`;


const addAcomment = async (aid, cmt) => {
    const data = {aid: aid, cmt: cmt}
    const res = await api.post(`${ACOMMENT_API_URL}/addAcomment`, data)
    return res.data;
}


export { addAcomment };