import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3333"
  // baseURL: "http://192.168.0.108:3333"
});

export default api; 

// Para liberar porta
// json-server --watch db.json --port 3333
// Instalar ngrok
// ./ngrok http 8080