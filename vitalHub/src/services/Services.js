import axios from "axios";

export const externalApiUrl = `https://viacep.com.br/ws/`;

// const api = axios.create({
//   baseURL: externalApiUrl,
// });

// declarar  a porta da api
const portaApi = "4466";

// declarar o ip da maquina
const ip = "172.20.10.13";

//definir a url padrao
const apiUrlLocal = `http://${ip}:${portaApi}/api`;

//trazer configurações da axios
const api = axios.create({
  baseURL: apiUrlLocal,
});

export default api;
