import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const externalApiClient = axios.create({
  baseURL: "http://localhost:5235",
  headers: {
    Accept: "application/json",
    "x-api-key": process.env.API_KEY,
  },
  httpsAgent: agent,
  withCredentials: true,
});
