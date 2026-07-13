import { error, json, requireBinding } from "../_lib/http.js";
import { readTrips } from "../_lib/trips.js";

export async function onRequestGet({ env }) {
  try {
    const db = requireBinding(env, "DB");
    const trips = await readTrips(db);
    return json({ trips });
  } catch (err) {
    return error(err.message, 503);
  }
}
