import axios from 'axios';
import {APIConstants} from '../constants';

const instance = axios.create({
  baseURL: APIConstants.baseUrl,
  headers: {
    Authorization: process.env.AUTH_TOKEN,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
