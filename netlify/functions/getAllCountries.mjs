import { countryClient } from "../client.mjs";

export default async (req, context) => {
    try {
        const res = await countryClient.get("all");
        return new Response(JSON.stringify(res.data));
      } catch (e) {
        throw new Error("Something went wrong!");
      }
  };