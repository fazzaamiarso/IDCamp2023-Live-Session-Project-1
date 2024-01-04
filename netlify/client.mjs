import axios from 'axios'

const COUNTRY_API_BASE = "https://restcountries.com/v3.1/";
const countryClient = axios.create({ baseURL: COUNTRY_API_BASE });

export { countryClient }