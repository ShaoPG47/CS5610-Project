import { REACT_APP_API_URL, api } from "./config";

const QCOMMENT_API_URL = `${REACT_APP_API_URL}/qComment`;


const addQcomment = async (qid, cmt) => {
    const data = {qid: qid, cmt: cmt}
    const res = await api.post(`${QCOMMENT_API_URL}/addQcomment`, data)
    return res.data;
}


export { addQcomment };