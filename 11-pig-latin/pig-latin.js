/* Matheus Gonçalves - 2023/JAN
   Pig Latin translation that manages vowels, treats 'Y' under specific conditions, 
   respects case sensitivity, and handles punctuation.
*/

const vowelSuffix = "yay"; // Suffix for words beginning with vowels
const consSuffix = "ay"; // Suffix for words beginning with consonants

/**
 * Adjusts the case of the new text to match the original text's first letter case.
 *
 * @param {string} oldText - The original text.
 * @param {string} newText - The translated text in Pig Latin.
 * @returns {string} - The new text with the case of its first letter adjusted.
 */
function normalizeCase(oldText, newText) {
  const isCapitalized = oldText[0] === oldText[0].toUpperCase();
  const prefix = isCapitalized
    ? newText.charAt(0).toUpperCase()
    : newText.charAt(0);
  return prefix + newText.slice(1).toLowerCase();
}

/**
 * Removes leading, trailing, and consecutive duplicate spaces from a term.
 *
 * @param {string} term - The input string to clean.
 * @returns {string} - The cleaned string.
 */
function normalizeSpaces(term) {
  return term.trim().replace(/\s+/g, " ");
}

/**
 * Determines if a character at a given index in a word is a vowel.
 *
 * @param {string} text - The word to check.
 * @param {number} index - The index of the character in the word.
 * @returns {boolean} - True if the character is a vowel, false otherwise.
 */
function isVowel(text, index) {
  if (index < 0 || index >= text.length) return false;
  const letter = text[index].toLowerCase();
  const vowels = "aeiouAEIOUàáâãäåæÀÁÂÃÄÅÆèéêëÈÉÊËìíîïÌÍÎÏòóôõöøÒÓÔÕÖØùúûüÙÚÛÜ";

  // Directly handles when the letter is a known vowel
  if (vowels.includes(letter)) return true;

  // Directly handles when the letter is not a known vowel, nor 'y'
  if (letter !== "y") return false;

  // 'y' is a special case:
  // Considered a vowel when at the end of the word
  if (index === text.length - 1) return true;

  // Considered a vowel when not at the start and not followed by another vowel
  if (index > 0 && index < text.length - 1) {
    return !vowels.includes(text[index + 1].toLowerCase());
  }

  return false;
}

/**
 * Finds the index of the first vowel in a word
 *
 * @param {string} text - The word to check.
 * @returns {number} - The index of the first vowel or -1 if no vowel is found.
 */
function getFirstVowelIndex(text) {
  return Array.from(text).findIndex((_, index) => isVowel(text, index));
}

/**
 * Builds the translated text in Pig Latin, normalizes its case, appends the appropriate suffix,
 * and adds any punctuation back to the end.
 *
 * @param {string} baseText - The original text to be translated.
 * @param {string} rest - The rest of the word after removing the initial consonant cluster, if any.
 * @param {string} cluster - The initial consonant cluster, if the word starts with a consonant(s).
 * @param {string} suffix - The suffix to be appended ("yay" for vowel start, "ay" for consonant start).
 * @param {string} punctuation - Any punctuation to be appended at the end of the translated word.
 * @returns {string} - The fully translated word or phrase in Pig Latin.
 */
function buildTranslation(baseText, rest, cluster, suffix, punctuation) {
  // Determine the text to append the suffix to (rest + cluster for consonant-starting words, baseText for vowel-starting words)
  const appendedText = rest
    ? `${rest}-${cluster}${suffix}${punctuation}`
    : `${baseText}-${suffix}${punctuation}`;

  // Normalize the case based on the original text
  return normalizeCase(baseText, appendedText);
}

/**
 * Convenience method to call buildTranslation() with less parameters
 *
 * @param {string} baseText - The original text to be translated.
 * @param {string} suffix - The suffix to be appended ("yay" for vowel start, "ay" for consonant start).
 * @param {string} punctuation - Any punctuation to be appended at the end of the translated word.
 * @returns {string} - The fully translated word or phrase in Pig Latin.
 */
function buildBaseTranslation(baseText, suffix, punctuation) {
  return buildTranslation(baseText, null, null, suffix, punctuation);
}

/**
 * Translates a phrase (multiple words) into Pig Latin by translating each word individually.
 *
 * @param {string} phrase - The phrase to translate.
 * @returns {string} - The translated phrase.
 */
function translatePigLatinPhrase(phrase) {
  return phrase.split(" ").map(translatePigLatin).join(" ");
}

/**
 * Translates a single word or a phrase into Pig Latin.
 *
 * @param {string} text - The word or phrase to translate.
 * @returns {string} - The translated word or phrase.
 */
function translatePigLatin(text) {
  if (!text) return text;
  const normalizedText = normalizeSpaces(text);

  // Split and translate phrases (multiple words)
  if (normalizedText.includes(" ")) {
    return translatePigLatinPhrase(normalizedText);
  }

  const punctuation = normalizedText.match(/[.,!?]+$/)?.[0] || "";
  const baseText = normalizedText.replace(/[.,!?]+$/, "");

  // Translate single word based on the presence of vowels
  if (isVowel(baseText, 0)) {
    return buildBaseTranslation(baseText, vowelSuffix, punctuation);
  }

  const firstVowelIndex = getFirstVowelIndex(baseText);
  if (firstVowelIndex === -1) {
    return buildBaseTranslation(baseText, consSuffix, punctuation);
  }

  // Handle consonant clusters at the start of words
  const cluster = baseText.substring(0, firstVowelIndex);
  const rest = baseText.substring(firstVowelIndex);
  return buildTranslation(baseText, rest, cluster, consSuffix, punctuation);
}

/**
 * Asserts the equality of the expected value and the actual value, logging the result.
 *
 * @param {string} value - The input value to test.
 * @param {string} expected - The expected outcome.
 */
function assertEquals(value, expected) {
  const actual = translatePigLatin(value);
  console.log(`Match: ${expected === actual} | ${value} | ${actual}`);
}

// Define test cases as an array of objects with word and expected properties
const testCases = [
  { word: "Avocado", expected: "Avocado-yay" },
  { word: "Avocado is a fruit", expected: "Avocado-yay is-yay a-yay uit-fray" },
  { word: "Brush", expected: "Ush-bray" },
  { word: "bypass", expected: "ypass-bay" },
  { word: "Can't", expected: "An't-cay" },
  { word: "cão", expected: "ão-cay" },
  { word: "duck", expected: "uck-day" },
  { word: "egg", expected: "egg-yay" },
  { word: "fruit smoothie", expected: "uit-fray oothie-smay" },
  { word: "glove", expected: "ove-glay" },
  { word: "hello", expected: "ello-hay" },
  { word: "Hymn", expected: "Ymn-hay" },
  { word: "I", expected: "I-yay" },
  { word: "inbox", expected: "inbox-yay" },
  { word: "it", expected: "it-yay" },
  { word: "Matheus", expected: "Atheus-may" },
  { word: "Move", expected: "Ove-may" },
  { word: "my", expected: "y-may" },
  { word: "ocean", expected: "ocean-yay" },
  { word: "Odd", expected: "Odd-yay" },
  {
    word: "Oh My!! Where are you!?!",
    expected: "Oh-yay Y-may!! Ere-whay are-yay ou-yay!?!",
  },
  { word: "Oval", expected: "Oval-yay" },
  { word: "Pig Latin", expected: "Ig-pay Atin-lay" },
  { word: "Pseudo science", expected: "Eudo-psay ience-scay" },
  { word: "Rhythm", expected: "Ythm-rhay" },
  {
    word: "Sam is  the  real  hero ",
    expected: "Am-say is-yay e-thay eal-ray ero-hay",
  },
  { word: "scratch", expected: "atch-scray" },
  { word: "switch", expected: "itch-sway" },
  { word: "tooth brush", expected: "ooth-tay ush-bray" },
  { word: "Ultimate", expected: "Ultimate-yay" },
  { word: "What's up?", expected: "At's-whay up-yay?" },
  { word: "X", expected: "X-ay" },
  { word: "y", expected: "y-yay" },
  { word: "Year", expected: "Ear-yay" },
  { word: "yellow", expected: "ellow-yay" },
  { word: "you", expected: "ou-yay" },
];

// Loop through each test case and run assertions
testCases.forEach((testCase) => {
  assertEquals(testCase.word, testCase.expected);
});

/*
===========================================================================================
The Four Rules of Pig Latin
Rules: https://www.wikihow.com/Speak-Pig-Latin
===========================================================================================
Master these four basic rules of Pig Latin to instantly convert any English sentence.

1. Words Beginning With Consonants or Consonant Clusters:
- For words starting with a consonant or a consonant cluster, move it/them to the end of the word and add the suffix "-ay".
- Examples: "Duck" becomes "uck-day", "Move" becomes "ove-may", "Scratch" becomes "atch-scray".

2. Words Beginning With Vowels:
- For words starting with a vowel, simply add the suffix "-yay" to the end of the word.
- Examples: "Oval" becomes "Oval-yay", "Ultimate" becomes "Ultimate-yay", "Odd" becomes "Odd-yay".

3. Treatment of the Letter 'Y':
- 'Y' at the start acts as a consonant: move 'Y' to the end and add "-ay" (e.g., "Yellow" becomes "ellow-yay").
- 'Y' not at the start and followed by a consonant acts as a vowel (e.g., "Bypass" becomes "ypass-bay").
- 'Y' not at the start but followed by a vowel acts as a consonant (e.g., "Cyan" becomes "an-cyay").

4. [ToDo] Handling Compound Words:
- Splitting compound words before translation makes them less comprehensible, thus better disguising the original words.
- Examples: "Bedroom" becomes "ed-bay oom-ray", "Toothbrush" becomes "ooth-tay ush-bray".

Understanding these rules allows for the efficient and accurate translation of English into Pig Latin, 
enhancing both the fun and challenge of the language.
*/
