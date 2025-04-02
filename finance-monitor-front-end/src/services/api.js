import axios from "axios";

// Definindo o baseURL para a URL base da API
const api = axios.create({
    baseURL: "http://localhost:8080",  // URL base da API
});

export default api;
