import { countryClient } from "../client.mjs";

export default async (req) => {
    const params = (new URL(req.url).searchParams.getAll("countryCodes"))
    const countryCodes = params[0].split(",")

    try {
        const promises = await Promise.all(
            countryCodes.map(async (code) => {
                return await countryClient.get(`alpha/${code.toLowerCase()}`, {
                    params: {
                        fields: ["name", "cca3"],
                    },
                    paramsSerializer: { indexes: null },
                });
            })
        );

        console.log("PARAMS:", JSON.stringify(params))
        console.log("PROMISES:", promises)

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