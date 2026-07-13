import { json } from "../../_lib/http.js";
import { logoutCookie } from "../../_lib/auth.js";

export async function onRequestPost() {
  return json({ ok: true }, 200, { "Set-Cookie": logoutCookie() });
}
