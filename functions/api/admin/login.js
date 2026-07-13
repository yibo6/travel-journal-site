import { error, json } from "../../_lib/http.js";
import { loginCookie } from "../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_PASSWORD) return error("ADMIN_PASSWORD is not set", 503);

  const body = await request.json().catch(() => ({}));
  if (body.password !== env.ADMIN_PASSWORD) {
    return error("密码不对。", 401);
  }

  return json({ ok: true }, 200, { "Set-Cookie": loginCookie(env) });
}
