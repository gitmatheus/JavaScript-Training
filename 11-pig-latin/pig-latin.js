/* Matheus Gonçalves - 2023/JAN
   Simplifying Pig Latin translation by excluding compound words and vowels that sound like consonants at the start of sentences. 
   Vowels are "AaEeIiOoUu" and "Y" under specific conditions.
*/

const vowelSuffix = "yay";
const consSuffix = "ay";

// Converts the first letter of the translated word
// if the original was capitalized
function normalizeCase(oldWord, newWord) {
  const prefix =
    oldWord[0] === oldWord[0].toUpperCase()
      ? newWord.charAt(0).toUpperCase()
      : newWord.charAt(0);
  return prefix + newWord.slice(1).toLowerCase();
}

// Removes trailing, leading, and duplicate spaces
function normalizeSpaces(term) {
  return term.trim().replace(/\s+/g, " ");
}

function isPhrase(term) {
  return term.length >= 3 && term.includes(" ");
}

function isVowel(word, index) {
  // Directly return false if the index is out of bounds
  if (index < 0 || index >= word.length) return false;
  const letter = word[index].toLowerCase();

  const vowels = "aeiou";

  // Check for standard vowels
  if (vowels.includes(letter)) return true;

  // Handling the special case for 'y'
  // 'y' is considered a vowel when:
  //  - it is not at the start or end of a word
  //  - it is not followed by another vowel
  if (letter === "y") {
    // Check 'y' is not at the start and not at the end
    if (index > 0 && index < word.length - 1) {
      // Ensure the next letter is not a vowel for 'y' to be considered as a vowel
      const nextLetter = word[index + 1].toLowerCase();
      return !vowels.includes(nextLetter);
    }
  }

  // If none of the above conditions are met, the letter is not a vowel
  return false;
}
function appendSuffix(word, suffix) {
  return `${word}-${suffix}`;
}

function translatePigLatinPhrase(phrase) {
  // Split the input string into an array of words
  const wordsArray = phrase.split(" ");

  // Map over the array, translating each word to Pig Latin
  const translatedWordsArray = wordsArray.map((word) =>
    translatePigLatin(word)
  );

  // Join the translated words back into a single string, with spaces in between
  return translatedWordsArray.join(" ");
}

function translatePigLatin(word) {
  if (!word) return word;

  // Normalize spaces
  const term = normalizeSpaces(word);

  // ToDo: split compound words, perhaps with a predefined dictionary of root words

  // If the string contains more than one word
  if (isPhrase(term)) {
    return translatePigLatinPhrase(term);
  }

  // Check if the word starts with a vowel
  if (isVowel(term, 0)) {
    return normalizeCase(term, appendSuffix(term, vowelSuffix));
  }

  // If the first letter is not a vowel, we find the first vowel using isVowel
  let firstVowelIndex = -1;
  for (let i = 0; i < word.length; i++) {
    if (isVowel(word, i)) {
      firstVowelIndex = i;
      break;
    }
  }

  // If no vowel found in the word, treat the whole word as a consonant cluster
  if (firstVowelIndex === -1) {
    return normalizeCase(word, appendSuffix(word, consSuffix));
  }

  // Split the word into the consonant cluster and the rest, then append the suffix
  const cluster = word.substring(0, firstVowelIndex);
  const rest = word.substring(firstVowelIndex);
  return normalizeCase(word, appendSuffix(rest, `${cluster}${consSuffix}`));
}

function assertEquals(value, expected) {
  const actual = translatePigLatin(value);
  console.log(`Match: ${expected === actual} | ${value} | ${actual}`);
}

assertEquals("Matheus", "Atheus-may");
assertEquals("Avocado", "Avocado-yay");
assertEquals("Brush", "Ush-bray");
assertEquals("Hymn", "Ymn-hay");
assertEquals("hello", "ello-hay");
assertEquals("switch", "itch-sway");
assertEquals("Avocado is a fruit", "Avocado-yay is-yay a-yay uit-fray");
assertEquals("fruit smoothie", "uit-fray oothie-smay");
assertEquals("Can't", "An't-cay");
assertEquals("Pseudo science", "Eudo-psay ience-scay");
assertEquals(
  "Sam is  the  real  hero ",
  "Am-say is-yay e-thay eal-ray ero-hay"
);
assertEquals("yellow", "ellow-yay");
assertEquals("Year", "Ear-yay");
assertEquals("bypass", "ypass-bay");
assertEquals("Rhythm", "Ythm-rhay");
assertEquals("tooth brush", "ooth-tay ush-bray");

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
