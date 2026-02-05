const API_URL = import.meta.env.VITE_API_URL;

export async function apiPost(path, data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function apiGet(path) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Authorization": token ? `Bearer ${token}` : ""
    }
  });

  return res.json();
}