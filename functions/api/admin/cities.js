import { error, json, requireBinding } from "../../_lib/http.js";
import { requireAdmin } from "../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    const db = requireBinding(env, "DB");
    const city = await request.json();
    if (!city.id || !city.country_id || !city.name) {
      return error("城市 ID、国家和城市名都要填。", 400);
    }

    await db
      .prepare(
        `INSERT INTO cities
          (id, country_id, name, date, summary, map_label, map_x, map_y, visited, order_index)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
         ON CONFLICT(id) DO UPDATE SET
          country_id = excluded.country_id,
          name = excluded.name,
          date = excluded.date,
          summary = excluded.summary,
          map_label = excluded.map_label,
          map_x = excluded.map_x,
          map_y = excluded.map_y,
          visited = excluded.visited`,
      )
      .bind(
        city.id,
        city.country_id,
        city.name,
        city.date || "待更新",
        city.summary || "",
        city.name,
        Number(city.map_x || 50),
        Number(city.map_y || 50),
        Date.now(),
      )
      .run();

    return json({ ok: true });
  } catch (err) {
    return error(err.message, 503);
  }
}
