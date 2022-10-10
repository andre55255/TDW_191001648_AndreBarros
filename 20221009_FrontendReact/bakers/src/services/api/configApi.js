import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL_API || "";

const configApi = axios.create({
  baseURL: baseUrl,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }
});

export default configApi;
