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

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  // character is alphanumeric (a-z, A-Z, 0-9)
  const isAlphaNumeric = (char) => /[a-zA-Z0-9]/.test(char);

  while (left < right) {
    while (left < right && !isAlphaNumeric(str[left])) {
      left++;
    }
    while (left < right && !isAlphaNumeric(str[right])) {
      right--;
    }

    // Compare characters ignoring case
    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
