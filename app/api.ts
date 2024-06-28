import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth'
});

export const login = async (email: string, password: string) => {
    return api.post('/login', {email, password});
};

export const register = async (nome: string, email: string, password: string) => {
    return api.post('/register', {nome, email, password});
};

export default api;