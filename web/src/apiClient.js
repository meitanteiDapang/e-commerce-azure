const rawBase =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.origin.includes("localhost") ? "/api" : "https://api.dapang.live");

const API_BASE = rawBase.replace(/\/$/, "");

export const apiUrl = (path) =>
  `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
