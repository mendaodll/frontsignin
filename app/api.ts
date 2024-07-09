import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth'
});

export const loginFn = async (email: string, password: string) => {
    return api.post('/login', {email, password});
};

export const registerFn = async (name: string, email: string, password: string) => {
    return api.post('/register', {name, email, password});
};

export default api;