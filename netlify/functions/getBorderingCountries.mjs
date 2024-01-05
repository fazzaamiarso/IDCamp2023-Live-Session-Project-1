import { countryClient } from "../client.mjs";

export default async (req) => {
    const params = (new URL(req.url).searchParams.getAll("countryCodes"))
    const countryCodes = params[0].split(",")

    try {
        const promiseArray = countryCodes.map((code) => {
            return countryClient.get(`alpha/${code.toLowerCase()}`, {
                params: {
                    fields: ["name", "cca3"],
                },
                paramsSerializer: { indexes: null },
            });
        })
        const promises = await Promise.all(promiseArray);

        console.log("PARAMS:", JSON.stringify(params))
        console.log("PROMISES ARRAY:", JSON.stringify(promiseArray))
        console.log("PROMISES:", JSON.stringify(promises))

        const data = promises.map((country) => ({
            name: country.data.name.common,
            code: country.data.cca3.toLowerCase(),
        }));
        console.log("BORDERS:", data)
        return Response.json(data);
    } catch (e) {
        throw new Error("Something went wrong!");
    }
}