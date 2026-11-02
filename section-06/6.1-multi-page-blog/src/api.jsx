const BASE_URL = "https://dummyjson.com";

// Gets data from the API. Returns null if it was not found.
export async function getJson(path) {
  const res = await fetch(BASE_URL + path);
  if (!res.ok) {
    return null;
  }
  return res.json();
}
