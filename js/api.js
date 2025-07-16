const API_URL = "https://minecraft-cash-backend.vercel.app/api";

export async function post(path, data, token) {
  return fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export async function get(path, token) {
  return fetch(`${API_URL}/${path}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  }).then(r => r.json());
}
