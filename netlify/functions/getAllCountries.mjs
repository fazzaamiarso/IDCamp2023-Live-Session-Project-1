import { countryClient } from "../client.mjs";

export default async () => {
  try {
    const res = await countryClient.get("all");
    const countries = res.data.map(country => {
      return {
        name: country.name.common,
        flagSrc: country.flags.png,
        cca3: country.cca3,
        population: country.population,
        region: country.region,
        capital: country.capital
      }
    })
    return Response.json(countries);
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message)
  }
};