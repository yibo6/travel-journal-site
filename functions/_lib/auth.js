import { error } from "./http.js";

const COOKIE_NAME = "ying_atlas_admin";

function cookieValue(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function isAuthed(request, env) {
  return Boolean(env.ADMIN_PASSWORD && cookieValue(request, COOKIE_NAME) === env.ADMIN_PASSWORD);
}

export function requireAdmin(request, env) {
  if (!isAuthed(request, env)) {
    return error("Unauthorized", 401);
  }
  return null;
}

export function loginCookie(env) {
  return `${COOKIE_NAME}=${encodeURIComponent(env.ADMIN_PASSWORD)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
}

export function logoutCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
