import axios from "axios";

const COUNTRY_API_BASE = "https://restcountries.com/v3.1/";

const countryClient = axios.create({ baseURL: COUNTRY_API_BASE });

export const getAllCountries = async () => {
  try {
    const res = await countryClient.get("all");
    return res.data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};

export const getCountryByCode = async (countryCode) => {
  try {
    const res = await countryClient.get(`alpha/${countryCode}`);
    return res.data[0];
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};

export const getCountryByName = async (searchQuery) => {
  try {
    const res = await countryClient.get(`name/${searchQuery}`);
    return res.data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};

export const getBorderingCountries = async (countryCodes) => {
  try {
    const promises = await Promise.all(
      countryCodes.map(async (code) => {
        return countryClient.get(`alpha/${code.toLowerCase()}`, {
          params: {
            fields: ["name", "cca3"],
          },
          paramsSerializer: { indexes: null },
        });
      })
    );

    const data = promises.map((country) => ({
      name: country.data.name.common,
      code: country.data.cca3.toLowerCase(),
    }));
    return data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
};
