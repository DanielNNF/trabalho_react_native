import axios from 'axios';

const api = axios.create({
   //baseURL: "http://localhost:3333"
  baseURL: "http://192.168.0.102:3333" // Daniel
});

export default api; 

// Para liberar porta
// json-server --watch db.json --port 3333
// Instalar ngrok
// ./ngrok http 8080
//o que é dar um host??
//json-server --watch db.json --host 192.168.0.102  --port 3333