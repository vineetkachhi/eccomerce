import axios from 'axios';
import Config from '../config';
export default axios.create({
    baseURL: Config.API_BASE_URL,
});