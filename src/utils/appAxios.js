import axios from "axios";
import store from "../store/index";


export const appAxios = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// add to Bearer token
appAxios.interceptors.request.use(config => {
    const token = store.state.user?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});