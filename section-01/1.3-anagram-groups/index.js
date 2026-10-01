function groupAnagrams(words) {
  if (!words || words.length === 0) return [];

  //Group words using normalized sorted strings as map keys
  const groupedMap = words.reduce((acc, word) => {
    // Normalize to lowercase, then sort letters alphabetically
    const key = word.toLowerCase().split("").sort().join("");

    //"act": ["cat", "act", "tac"]
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(word);

    return acc;
  }, {});

  return Object.values(groupedMap).sort((a, b) => b.length - a.length);
}
