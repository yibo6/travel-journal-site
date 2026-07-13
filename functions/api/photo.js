import { error, requireBinding } from "../_lib/http.js";

export async function onRequestGet({ request, env }) {
  try {
    const key = new URL(request.url).searchParams.get("key");
    if (!key) return error("Missing photo key", 400);

    const bucket = requireBinding(env, "PHOTOS");
    const object = await bucket.get(key);
    if (!object) return error("Photo not found", 404);

    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    return error(err.message, 503);
  }
}
