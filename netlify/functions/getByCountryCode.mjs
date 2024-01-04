import qs from "query-string";
import { countryClient } from "../client.mjs";

export default async (req) => {
    const { countryCode } = qs.parseUrl(req.url).query

    try {
        const res = await countryClient.get(`alpha/${countryCode}`);
        return new Response(JSON.stringify(res.data[0]));
    } catch (e) {
        throw new Error("Something went wrong!");
    }
};