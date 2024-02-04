# Pig Latin Translation Script

## Introduction

This Pig Latin translation script is part of a personal project aimed at deepening understanding and proficiency in JavaScript. The script offers a practical application of JavaScript fundamentals through the challenge of translating English phrases into Pig Latin. By tackling the peculiarities of English phonetics and the logic of this pseudo-language, the project serves as a hands-on learning experience, now shared with others for educational purposes.

## Project Goals

- **Learn JavaScript**: Apply and reinforce JavaScript concepts in a real-world scenario.
- **Understand Phonetics Handling**: Explore how to programmatically handle English phonetics, including vowels, consonants, and special cases like the letter "Y".
- **Share Knowledge**: Provide a resource for others learning JavaScript or interested in language processing.

## Key Features

- **Rule-Based Translation**: Implements Pig Latin translation rules, addressing initial vowels and consonants, including special handling for "Y".
- **Case Sensitivity**: Maintains the case of the original text's first letter in the translation, reflecting a nuanced understanding of string manipulation in JavaScript.
- **Whitespace Normalization**: Demonstrates string cleaning techniques by eliminating extra spaces, showcasing error handling, and input sanitization.
- **Dynamic Handling of Vowels and Consonants**: Illustrates conditional logic and string operations through the treatment of different characters as vowels or consonants under varying conditions.

## Learning Highlights

- **Suffix Application**: Shows how to dynamically append strings based on word starting characters, using "`yay`" for vowels and "`ay`" for consonants.
- **Punctuation Preservation**: Maintains original text punctuation in the translated output, teaching string manipulation, and regular expressions.
- **Normalization Functions**: Includes functions to normalize text, such as adjusting case and managing spaces, demonstrating string functions and methods in JavaScript.
- **Test Driven Development**: Features test cases and an assertion method to validate the script's functionality.

## How to Use

To utilize this script, call the `translatePigLatin(text)` function with an English word or phrase as the argument. Designed to facilitate learning through doing, this function provides immediate feedback on the application of JavaScript to solve a specific problem.

### Recommendation

If you're a [Visual Studio Code](https://marketplace.visualstudio.com/vscode) user, consider installing this extension to see the results in the code editor:

- [**Code Runner**](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

## Contributing to Learning

This project is open for contributions, whether they be additional features, improvements, or educational resources related to JavaScript. By sharing challenges, solutions, and learning experiences, we can foster a community of practice around JavaScript and language processing.

## Future Enhancements (ToDo)

- **Compound Word Handling**: Identifies a path for future learning by exploring how to tackle compound words such as "`bedroom`" (`bed + room`), or "`toothbrush`" (`tooth + brush`).
- **Language Support Expansion**: Extend the project to include translation logic for languages beyond English, offering a broader scope for applying JavaScript in varied contexts. This expansion encourages exploration into handling more accented vowels and special characters that are prevalent in many languages.

This README is crafted to outline the educational journey of developing a Pig Latin Translation Script in JavaScript. It highlights the project's purpose, learning outcomes, and potential for future exploration, inviting collaboration and shared growth in the JavaScript community.

---

## The Four Rules of Pig Latin

**Rules**: [https://www.wikihow.com/Speak-Pig-Latin](https://www.wikihow.com/Speak-Pig-Latin)

Master these four basic rules of Pig Latin to instantly convert any English sentence. For more detailed rules, visit [this guide on how to speak Pig Latin](https://www.wikihow.com/Speak-Pig-Latin).

1. **Words Beginning With Consonants or Consonant Clusters:**

   - For words starting with a consonant or a consonant cluster, move it/them to the end of the word and add the suffix "-ay".
   - Examples: `"Duck"` becomes `"Uck-day"`, `"Move"` becomes `"Ove-may"`, `"Scratch"` becomes `"Atch-scray"`.

2. **Words Beginning With Vowels:**

   - For words starting with a vowel, simply add the suffix "-yay" to the end of the word.
   - Examples: `"Oval"` becomes `"Oval-yay"`, `"Ultimate"` becomes `"Ultimate-yay"`, `"Odd"` becomes `"Odd-yay"`.

3. **Treatment of the Letter 'Y':**

   - 'Y' at the start acts as a consonant: move 'Y' to the end and add "-ay" (e.g., `"Yellow"` becomes `"Ellow-yay"`).
   - 'Y' not at the start and followed by a consonant acts as a vowel (e.g., `"Bypass"` becomes `"Ypass-bay"`).
   - 'Y' not at the start but followed by a vowel acts as a consonant (e.g., `"Cyan"` becomes `"An-cyay"`).

4. **Handling Compound Words** [ToDo]:
   - Splitting compound words before translation makes them less comprehensible, thus better disguising the original words.
   - Examples: `"Bedroom"` becomes `"Ed-bay oom-ray"`, `"Toothbrush"` becomes `"Ooth-tay ush-bray"`.

Understanding these rules allows for the efficient and accurate translation of English into Pig Latin, enhancing both the fun and challenge of the language.
