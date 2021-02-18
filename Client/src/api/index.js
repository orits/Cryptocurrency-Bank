import axios from "axios";

const apiCRUD = axios.create({
  baseURL: "http://localhost:8080/api",
  headers:{
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
  }
});

export const getCoinsPie = () => apiCRUD.get(`/coin/pie`);
export const getCoins = () => apiCRUD.get(`/coin`);
export const getCoinsTypes = () => apiCRUD.get(`/coin/types`);
export const getCoinsByType = (type) => apiCRUD.get(`/coin/${type}`);
export const getCurrencyTypes = () => apiCRUD.get(`/coin/currency`);
export const addNewCoin = (payload) => apiCRUD.post(`/coin`, payload);
export const deleteCoinById = (id) => apiCRUD.delete(`/coin/${id}`);
export const updateCoinById = (id, payload) => apiCRUD.put(`/coin/${id}`, payload);
export const getConversion = (from, to, quantity) => apiCRUD.get(`/coin/conversion/from/${from}/to/${to}/quantity/${quantity}`);

const apis = {
  getCoinsPie,
  getCoins,
  getCoinsTypes,
  getCoinsByType,
  getCurrencyTypes,
  addNewCoin,
  deleteCoinById,
  updateCoinById,
  getConversion,
};

export default apis;
