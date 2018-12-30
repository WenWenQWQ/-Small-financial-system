import axios from 'axios';
const api=process.env.REACT_APP_RECORDS_API_URL||"https://5c2852b8dc7d0a00144c2e0a.mockapi.io"
export const getAll=() =>axios.get(`${api}/api/records`);
export const create=(body)=>
    axios.post(`${api}/api/records`,body);
export const update=(id,body)=>
    axios.put(`${api}/api/records/${id}`,body);
export const remove=(id)=>
    axios.delete(`${api}/api/records/${id}`);