import axios from 'axios';

const serviceBaseUrl = 'http://localhost:8888/api/';

const axiosService = axios.create({
    baseURL: serviceBaseUrl,
});

export default axiosService;
