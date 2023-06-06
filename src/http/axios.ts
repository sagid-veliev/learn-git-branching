import axios from 'axios';

const config = {
    baseURL: 'http://localhost:8080/',
};

const api = axios.create(config);

export default api;
