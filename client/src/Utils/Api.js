import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const loginUser = payload => api.post(`/login`, payload);

export const getAllUsers = () => api.get(`/users`)
    .then((res)=>{
            console.log(res.data)
            return res.data.data;
    });