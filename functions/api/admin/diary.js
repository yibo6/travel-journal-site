import { error, json, requireBinding } from "../../_lib/http.js";
import { requireAdmin } from "../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    const db = requireBinding(env, "DB");
    const entry = await request.json();
    if (!entry.city_id || !entry.memory) return error("城市和记忆都要填。", 400);

    const city = await db
      .prepare("SELECT country_id FROM cities WHERE id = ?")
      .bind(entry.city_id)
      .first();
    if (!city) return error("找不到这个城市。", 404);

    await db
      .prepare(
        `INSERT INTO diary_entries
          (country_id, city_id, date, memory, order_index)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(city.country_id, entry.city_id, entry.date || "待更新", entry.memory, Date.now())
      .run();

    return json({ ok: true });
  } catch (err) {
    return error(err.message, 503);
  }
}
