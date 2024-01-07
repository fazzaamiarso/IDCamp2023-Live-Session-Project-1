import { countryClient } from "../client.mjs";

export default async (req) => {
    const params = (new URL(req.url).searchParams.getAll("countryCodes"))
    const countryCodes = params[0].split(",")

    try {
        const res = await countryClient.get(`alpha`, {
            params: {
                codes: countryCodes
            },
            paramsSerializer: { indexes: null },

        })


        const data = res.data.map((country) => ({
            name: country.name.common,
            code: country.cca3.toLowerCase(),
        }));
        return Response.json(data);
    } catch (e) {
        throw new Error(e);
    }
}