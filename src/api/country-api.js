import axios from "axios";


const NETLIFY_FUNCTIONS_DIR = "/.netlify/functions/"
const client = axios.create({ baseURL: NETLIFY_FUNCTIONS_DIR })

export const getAllCountries = async () => {
  try {
    const res = await client.get("getAllCountries");
    return res.data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};

export const getCountryByCode = async (countryCode) => {
  try {
    const res = await client.get("getByCountryCode", { params: { countryCode } });
    return res.data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};

export const getCountryByName = async (searchQuery, signal) => {
  try {
    const res = await client.get("searchCountries", { params: { q: searchQuery }, signal });
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getBorderingCountries = async (countryCodes) => {
  try {
    const res = await client.get("getBorderingCountries", {
      params: { countryCodes }, paramsSerializer: { indexes: null },
    });

    return res.data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};
