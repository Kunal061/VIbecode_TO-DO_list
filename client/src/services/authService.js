import api from '../api';

const login = async (identifier, password) => {
    const response = await api.post('/auth/login', { identifier, password });
    return response.data;
};

const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
};

const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export default {
    login,
    register,
    getMe,
};
