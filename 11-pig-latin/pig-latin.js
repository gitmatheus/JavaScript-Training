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

function isVowel(letter) {
  return "aeiou".includes(letter.toLowerCase());
}

function isLastLetter(word, index) {
  return index == word.length - 1;
}

function appendSuffix(word, suffix) {
  return `${word}-${suffix}`;
}

function translatePigLatin(word) {
  if (!word || word.length <= 1) return word;

  // The first letter is a vowel
  if (isVowel(word[0])) {
    return normalizeCase(word, appendSuffix(word, vowelSuffix));
  }

  // If the first letter is not a vowel
  // Create a cluster of consonants and append the suffix accordingly

  // Match leading consonant cluster and the rest
  const match = word.match(/(^[^aeiou]+)(.*)/i);
  if (match) {
    const [, cluster, rest] = match;

    // Fallback for words without vowels (unlikely in English, but just in case)
    if (!rest) return normalizeCase(word, appendSuffix(word, consSuffix));

    return normalizeCase(word, appendSuffix(rest, `${cluster}${consSuffix}`));
  }

  return word;
}

console.log(translatePigLatin(null));
console.log(translatePigLatin(""));
console.log(translatePigLatin("X"));
console.log(translatePigLatin("Matheus"));
console.log(translatePigLatin("Avocado"));
console.log(translatePigLatin("Brush"));
console.log(translatePigLatin("Hymn"));
console.log(translatePigLatin("hello"));
console.log(translatePigLatin("switch"));
console.log(translatePigLatin("glove"));
console.log(translatePigLatin("fruit"));
console.log(translatePigLatin("smoothie"));
console.log(translatePigLatin("Can't"));
console.log(translatePigLatin("Pseudo-science"));
console.log(translatePigLatin("Renata"));

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
