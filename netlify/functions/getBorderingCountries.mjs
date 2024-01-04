import { countryClient } from "../client.mjs";
import qs from "query-string";

export default async (req) => {
    // const { countryCodes } = qs.parseUrl(req.url, { arrayFormat: "bracket" }).query
    const parsedQuery = qs.parseUrl(req.url, { arrayFormat: "none" }).query
    const countryCodes = parsedQuery.countryCodes.split(",")

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
        return new Response(JSON.stringify(data));
    } catch (e) {
        throw new Error("Something went wrong!");
    }
}