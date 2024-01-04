import { countryClient } from "../client.mjs";
import qs from "query-string";

export default async (req) => {
    const { q } = qs.parseUrl(req.url).query

    try {
        const res = await countryClient.get(`name/${q}`);
        return new Response(JSON.stringify(res.data));
    } catch (e) {
        throw new Error("Something went wrong!");
    }
}