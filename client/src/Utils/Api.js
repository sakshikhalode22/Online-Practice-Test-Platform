import axios from "axios";

const baseURL = "http://localhost:5000";
const api = axios.create({
  baseURL: baseURL,
});

export const getAllUsers = async () =>
  await api
    .get(`/users`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err;
    });

export const getExams = async (userInfo) =>
  await api
    .get(`/exams/${userInfo?.id}`)
    .then((res) => {
      return res.data.data.exams;
    })
    .catch((err) => {
      return err;
    });
export const loginURL = `${baseURL}/login`;
export const signUpUrl = `${baseURL}/addusers`;
export const submitTestUrl = `${baseURL}/addexam`;
