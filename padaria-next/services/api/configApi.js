import axios from 'axios';

const baseUrl = "http://192.168.43.72:8080";

const configApi = axios.create({
  baseURL: baseUrl,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }
});

export default configApi;
