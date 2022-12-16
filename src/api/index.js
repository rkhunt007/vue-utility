import axios from 'axios';
import apiFields from '../constants'

const instance = axios.create({
  baseURL:  apiFields.BASE_URL,
});

export default instance;