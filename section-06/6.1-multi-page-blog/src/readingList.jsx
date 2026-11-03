// Each user has their own list of post ids in localStorage.
function getKey(username) {
  return "readingList_" + username;
}

export function getReadingList(username) {
  const saved = localStorage.getItem(getKey(username));
  return saved ? JSON.parse(saved) : [];
}

export function saveReadingList(username, ids) {
  localStorage.setItem(getKey(username), JSON.stringify(ids));
}
