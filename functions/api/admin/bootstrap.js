import { error, json, requireBinding } from "../../_lib/http.js";
import { requireAdmin } from "../../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    const db = requireBinding(env, "DB");
    const [countries, cities] = await Promise.all([
      db.prepare("SELECT id, title, place FROM countries ORDER BY order_index, title").all(),
      db.prepare("SELECT id, country_id, name FROM cities ORDER BY order_index, name").all(),
    ]);

    return json({
      countries: countries.results || [],
      cities: cities.results || [],
    });
  } catch (err) {
    return error(err.message, 503);
  }
}
