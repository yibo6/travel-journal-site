import { error, json, requireBinding } from "../../_lib/http.js";
import { requireAdmin } from "../../_lib/auth.js";

function cleanName(name) {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "photo"}.${ext}`;
}

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    const db = requireBinding(env, "DB");
    const bucket = requireBinding(env, "PHOTOS");
    const data = await request.formData();
    const cityId = data.get("city_id");
    const file = data.get("photo");

    if (!cityId || !file || typeof file === "string") {
      return error("城市和照片都要选。", 400);
    }

    const city = await db.prepare("SELECT country_id FROM cities WHERE id = ?").bind(cityId).first();
    if (!city) return error("找不到这个城市。", 404);

    const key = `${cityId}/${Date.now()}-${cleanName(file.name)}`;
    await bucket.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || "image/jpeg" },
    });

    await db
      .prepare(
        `INSERT INTO photos
          (country_id, city_id, category, r2_key, src, caption, order_index)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        city.country_id,
        cityId,
        data.get("category") || "scenery",
        key,
        "",
        data.get("caption") || file.name,
        Date.now(),
      )
      .run();

    return json({ ok: true, key });
  } catch (err) {
    return error(err.message, 503);
  }
}
