import { countryClient } from "../client.mjs";
import qs from "query-string";

export default async (req) => {
    const { q } = qs.parseUrl(req.url).query

    try {
        const res = await countryClient.get(`name/${q}`);
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
        throw new Error("Something went wrong!");
    }
}