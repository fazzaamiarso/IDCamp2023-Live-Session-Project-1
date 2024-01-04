import { countryClient } from "../client.mjs";

export default async (req) => {
    const params = (new URL(req.url).searchParams.getAll("countryCodes"))
    console.log(params)
    const countryCodes = params[0].split(",")


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