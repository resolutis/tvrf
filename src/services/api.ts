import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://fwe6dswqx2.execute-api.eu-west-2.amazonaws.com/prod";
const API_KEY = import.meta.env.VITE_API_KEY || "your-secure-api-key-here";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
});

// ... existing code ...
