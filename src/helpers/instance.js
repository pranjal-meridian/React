import axios from 'axios';


const instance = axios.create({
    // baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export default instance;
