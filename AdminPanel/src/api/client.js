import axios from "axios";

const client = axios.create({baseURL: "http://localhost:4848/api/"});

export default client;