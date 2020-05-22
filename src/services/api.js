import axios from 'axios';

const api = axios.create({
  // se for android emulador inserir: http://10.0.2.2:...
  // se for android genymotion inserir: http://10.0.3.2:...
  // se for dispositivo fisico inserir: http://O_IP_DA_SUA_MAQUINA:...
  baseURL: 'http://localhost:3333',
});

export default api;
