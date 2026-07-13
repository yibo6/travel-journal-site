export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

export function error(message, status = 400) {
  return json({ error: message }, status);
}

export function requireBinding(env, name) {
  if (!env[name]) {
    throw new Error(`Missing Cloudflare binding: ${name}`);
  }
  return env[name];
}
