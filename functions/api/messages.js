import { error, json, requireBinding } from "../_lib/http.js";

export async function onRequestGet({ env }) {
  try {
    const db = requireBinding(env, "DB");
    const result = await db
      .prepare("SELECT id, name, message, created_at FROM messages ORDER BY id DESC LIMIT 30")
      .all();

    return json({ messages: result.results || [] });
  } catch (err) {
    return error(err.message, 503);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const db = requireBinding(env, "DB");
    const body = await request.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 20);
    const message = String(body.message || "").trim().slice(0, 200);

    if (!name || !message) {
      return error("昵称和留言都要填。", 400);
    }

    await db.prepare("INSERT INTO messages (name, message) VALUES (?, ?)").bind(name, message).run();

    return json({ ok: true });
  } catch (err) {
    return error(err.message, 503);
  }
}
