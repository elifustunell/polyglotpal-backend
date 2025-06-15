// updated-seed.js - Exercise data for all types: vocabulary, grammar, filltheblanks, sentences, imagebased

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

const MONGO_URI = 'mongodb+srv://user:user123456@cluster0.k0qenmz.mongodb.net/test?retryWrites=true&w=majority';

const allExercises = [
  // ============================================
  // ENGLISH VOCABULARY EXERCISES (Matching Format)
  // ============================================
  
  // ENGLISH VOCABULARY - LEVEL 1
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 1,
    sourceWord: "Hello",
    targetWord: "Merhaba",
    points: 20,
    difficulty: "easy",
    explanation: "Basic greeting in English"
  },
  {
    language: "English", 
    category: "vocabulary",
    level: 1,
    order: 2,
    sourceWord: "Thank you",
    targetWord: "Teşekkürler",
    points: 20,
    difficulty: "easy",
    explanation: "Expression of gratitude"
  },
  {
    language: "English",
    category: "vocabulary", 
    level: 1,
    order: 3,
    sourceWord: "Water",
    targetWord: "Su",
    points: 20,
    difficulty: "easy",
    explanation: "Essential liquid for life"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 4,
    sourceWord: "Book",
    targetWord: "Kitap", 
    points: 20,
    difficulty: "easy",
    explanation: "Object used for reading"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 5,
    sourceWord: "House",
    targetWord: "Ev",
    points: 20,
    difficulty: "easy",
    explanation: "Place where people live"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 6,
    sourceWord: "Cat",
    targetWord: "Kedi",
    points: 20,
    difficulty: "easy",
    explanation: "Domestic pet animal"
  },

  // ============================================
  // ENGLISH GRAMMAR EXERCISES (Image + Multiple Choice)
  // ============================================
  
  // ENGLISH GRAMMAR - LEVEL 1
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 1,
    question: "Which article is used before singular countable nouns beginning with a consonant?",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "a",
    points: 20,
    difficulty: "easy",
    explanation: "Use 'a' before singular countable nouns starting with consonant sounds.",
    grammarRule: "Articles: 'a' is used before consonant sounds, 'an' before vowel sounds.",
    imageUrl: "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=A+Apple"
  },
  {
    language: "English",
    category: "grammar", 
    level: 1,
    order: 2,
    question: "What is the plural form of 'child'?",
    options: ["childs", "children", "childes", "child"],
    correctAnswer: "children",
    points: 20,
    difficulty: "easy",
    explanation: "'Child' has an irregular plural form: 'children'.",
    grammarRule: "Irregular plurals don't follow the standard -s/-es pattern.",
    imageUrl: "https://via.placeholder.com/200x200/2196F3/FFFFFF?text=Children"
  },
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 3,
    question: "Which pronoun replaces 'the book'?",
    options: ["he", "she", "it", "they"],
    correctAnswer: "it", 
    points: 20,
    difficulty: "easy",
    explanation: "Use 'it' for inanimate objects like books.",
    grammarRule: "Pronouns: Use 'it' for things, 'he/she' for people.",
    imageUrl: "https://via.placeholder.com/200x200/FF9800/FFFFFF?text=IT+Book"
  },

  // ============================================
  // ENGLISH FILL THE BLANKS EXERCISES (Dialogue Format)
  // ============================================
  
  // ENGLISH FILL THE BLANKS - LEVEL 1
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 1,
    question: "Complete the conversation about daily routine",
    dialogue: [
      {
        speaker: "A",
        text: "What time do you _____ breakfast every morning?",
        blank: true,
        options: ["eat", "drink", "make", "cook"],
        correct: "eat"
      },
      {
        speaker: "B", 
        text: "I usually eat breakfast at 8 AM before going to work.",
        blank: false
      }
    ],
    points: 20,
    difficulty: "easy",
    explanation: "Use 'eat' for consuming food items like breakfast."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 2,
    question: "Complete the conversation about transportation",
    dialogue: [
      {
        speaker: "A",
        text: "How do you get to school every day?",
        blank: false
      },
      {
        speaker: "B",
        text: "I _____ to school by bus every morning.",
        blank: true,
        options: ["go", "walk", "drive", "run"],
        correct: "go"
      }
    ],
    points: 20,
    difficulty: "easy", 
    explanation: "'Go' is used for general movement to a destination."
  },

  // ============================================
  // ENGLISH SENTENCES EXERCISES (Word Building Format)
  // ============================================
  
  // ENGLISH SENTENCES - LEVEL 1
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 1,
    question: "Build a sentence about self-introduction",
    targetSentence: "My name is Anna",
    hint: "Introduce yourself using 'My name is...'",
    words: ["My", "name", "is", "Anna"],
    points: 20,
    difficulty: "easy",
    explanation: "Basic self-introduction structure in English."
  },
  {
    language: "English",
    category: "sentences", 
    level: 1,
    order: 2,
    question: "Build a sentence about location", 
    targetSentence: "I live in Berlin",
    hint: "Express where you live using 'I live in...'",
    words: ["I", "live", "in", "Berlin"],
    points: 20,
    difficulty: "easy",
    explanation: "Standard structure for expressing residence."
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 3,
    question: "Build a question about time",
    targetSentence: "What time is it", 
    hint: "Ask about the current time",
    words: ["What", "time", "is", "it"],
    points: 20,
    difficulty: "easy",
    explanation: "Common way to ask for the time in English."
  },

  // ============================================
  // ENGLISH IMAGE BASED EXERCISES (Visual + Multiple Choice)
  // ============================================
  
  // ENGLISH IMAGE BASED - LEVEL 1
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 1,
    question: "What color is typically associated with this fruit?",
    options: ["Red", "Blue", "Purple", "Yellow"],
    correctAnswer: "Red",
    points: 20,
    difficulty: "easy",
    explanation: "Apples are commonly red, though they can be green or yellow too.",
    imageUrl: "https://via.placeholder.com/200x200/F44336/FFFFFF?text=🍎+Apple"
  },
  {
    language: "English",
    category: "imagebased", 
    level: 1,
    order: 2,
    question: "Which animal makes this sound: 'meow'?",
    options: ["Dog", "Cat", "Bird", "Fish"],
    correctAnswer: "Cat",
    points: 20,
    difficulty: "easy",
    explanation: "Cats make the distinctive 'meow' sound.",
    imageUrl: "https://via.placeholder.com/200x200/9C27B0/FFFFFF?text=🐱+Cat"
  },
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 3,
    question: "What do you use this object for?",
    options: ["Eating", "Writing", "Sleeping", "Driving"],
    correctAnswer: "Writing",
    points: 20,
    difficulty: "easy",
    explanation: "A pen is used for writing and drawing.",
    imageUrl: "https://via.placeholder.com/200x200/607D8B/FFFFFF?text=✏️+Pen"
  },

  // ============================================
  // GERMAN VOCABULARY EXERCISES (Matching Format)
  // ============================================
  
  // GERMAN VOCABULARY - LEVEL 1
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 1,
    sourceWord: "Hallo",
    targetWord: "Hello",
    points: 20,
    difficulty: "easy",
    explanation: "Basic greeting in German"
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 2,
    sourceWord: "Danke",
    targetWord: "Thank you", 
    points: 20,
    difficulty: "easy",
    explanation: "Expression of gratitude in German"
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 3,
    sourceWord: "Wasser",
    targetWord: "Water",
    points: 20,
    difficulty: "easy",
    explanation: "Essential liquid for life"
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 4,
    sourceWord: "Buch",
    targetWord: "Book",
    points: 20,
    difficulty: "easy",
    explanation: "Object used for reading"
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 5,
    sourceWord: "Haus",
    targetWord: "House",
    points: 20,
    difficulty: "easy",
    explanation: "Place where people live"
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 6,
    sourceWord: "Katze",
    targetWord: "Cat",
    points: 20,
    difficulty: "easy",
    explanation: "Domestic pet animal"
  },

  // ============================================
  // GERMAN GRAMMAR EXERCISES (Image + Multiple Choice)
  // ============================================
  
  // GERMAN GRAMMAR - LEVEL 1
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 1,
    question: "What is the correct article for 'Haus' (house)?",
    options: ["der", "die", "das", "den"],
    correctAnswer: "das",
    points: 20,
    difficulty: "easy",
    explanation: "'Haus' is neuter, so it takes the article 'das'.",
    grammarRule: "German nouns have three genders: masculine (der), feminine (die), neuter (das).",
    imageUrl: "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=das+Haus"
  },
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 2,
    question: "What is the correct article for 'Mann' (man)?",
    options: ["der", "die", "das", "den"],
    correctAnswer: "der",
    points: 20,
    difficulty: "easy",
    explanation: "'Mann' is masculine, so it takes the article 'der'.",
    grammarRule: "Masculine nouns in German use 'der' as the definite article.",
    imageUrl: "https://via.placeholder.com/200x200/2196F3/FFFFFF?text=der+Mann"
  },

  // ============================================
  // GERMAN FILL THE BLANKS EXERCISES (Dialogue Format)
  // ============================================
  
  // GERMAN FILL THE BLANKS - LEVEL 1
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 1,
    question: "Complete the conversation about origin",
    dialogue: [
      {
        speaker: "A",
        text: "Woher kommen Sie?",
        blank: false
      },
      {
        speaker: "B",
        text: "Ich _____ aus Deutschland.",
        blank: true,
        options: ["bin", "bist", "ist", "sind"],
        correct: "bin"
      }
    ],
    points: 20,
    difficulty: "easy",
    explanation: "'I am' is always 'ich bin' in German."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 2,
    question: "Complete the conversation about pets",
    dialogue: [
      {
        speaker: "A",
        text: "Haben Sie Haustiere?",
        blank: false
      },
      {
        speaker: "B",
        text: "Ja, ich habe _____ Hund.",
        blank: true,
        options: ["ein", "eine", "der", "die"],
        correct: "ein"
      }
    ],
    points: 20,
    difficulty: "easy",
    explanation: "'Hund' is masculine, so 'a dog' is 'ein Hund'."
  },

  // ============================================
  // GERMAN SENTENCES EXERCISES (Word Building Format)
  // ============================================
  
  // GERMAN SENTENCES - LEVEL 1
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 1,
    question: "Build a sentence about name introduction",
    targetSentence: "Mein Name ist Anna",
    hint: "Introduce your name using 'Mein Name ist...'",
    words: ["Mein", "Name", "ist", "Anna"],
    points: 20,
    difficulty: "easy",
    explanation: "'Name' is masculine in German, so 'my name' is 'mein Name'."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 2,
    question: "Build a sentence about residence",
    targetSentence: "Ich wohne in Berlin",
    hint: "Express where you live using 'Ich wohne in...'",
    words: ["Ich", "wohne", "in", "Berlin"],
    points: 20,
    difficulty: "easy",
    explanation: "'I live in' is 'ich wohne in' when referring to cities."
  },

  // ============================================
  // GERMAN IMAGE BASED EXERCISES (Visual + Multiple Choice)
  // ============================================
  
  // GERMAN IMAGE BASED - LEVEL 1
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 1,
    question: "What is this animal called in German?",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    correctAnswer: "Katze",
    points: 20,
    difficulty: "easy",
    explanation: "'Cat' is 'Katze' in German (feminine: die Katze).",
    imageUrl: "https://via.placeholder.com/200x200/9C27B0/FFFFFF?text=🐱+Katze"
  },
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 2,
    question: "What is this fruit called in German?",
    options: ["Apfel", "Orange", "Banane", "Birne"],
    correctAnswer: "Apfel",
    points: 20,
    difficulty: "easy",
    explanation: "'Apple' is 'Apfel' in German (masculine: der Apfel).",
    imageUrl: "https://via.placeholder.com/200x200/F44336/FFFFFF?text=🍎+Apfel"
  },

  // ============================================
  // LEVEL 2 EXERCISES (More Complex)
  // ============================================

  // ENGLISH VOCABULARY - LEVEL 2
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 1,
    sourceWord: "Teacher",
    targetWord: "Öğretmen",
    points: 30,
    difficulty: "medium",
    explanation: "Person who educates students"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 2,
    sourceWord: "Beautiful",
    targetWord: "Güzel",
    points: 30,
    difficulty: "medium",
    explanation: "Aesthetically pleasing to look at"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 3,
    sourceWord: "Difficult",
    targetWord: "Zor",
    points: 30,
    difficulty: "medium",
    explanation: "Not easy to do or understand"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 4,
    sourceWord: "Important",
    targetWord: "Önemli",
    points: 30,
    difficulty: "medium",
    explanation: "Having great significance or value"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 5,
    sourceWord: "Understand",
    targetWord: "Anlamak",
    points: 30,
    difficulty: "medium",
    explanation: "To comprehend the meaning of something"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 6,
    sourceWord: "Friendship",
    targetWord: "Dostluk",
    points: 30,
    difficulty: "medium",
    explanation: "A close relationship between people"
  },

  // ENGLISH GRAMMAR - LEVEL 2
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 1,
    question: "Which is the correct comparative form of 'good'?",
    options: ["gooder", "more good", "better", "best"],
    correctAnswer: "better",
    points: 30,
    difficulty: "medium",
    explanation: "'Good' has an irregular comparative form: 'better'.",
    grammarRule: "Irregular adjectives don't follow the standard -er/-est pattern.",
    imageUrl: "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=Good+Better+Best"
  },
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 2,
    question: "What is the correct question tag: 'She is coming, ___?'",
    options: ["isn't she", "is she", "doesn't she", "does she"],
    correctAnswer: "isn't she",
    points: 30,
    difficulty: "medium",
    explanation: "Use negative tag with positive statement.",
    grammarRule: "Question tags: positive statement + negative tag, negative statement + positive tag.",
    imageUrl: "https://via.placeholder.com/200x200/2196F3/FFFFFF?text=Question+Tags"
  },

  // ENGLISH FILL THE BLANKS - LEVEL 2
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "Complete the conversation about past activities",
    dialogue: [
      {
        speaker: "A",
        text: "What did you do last weekend?",
        blank: false
      },
      {
        speaker: "B",
        text: "I _____ a movie with my friends at the cinema.",
        blank: true,
        options: ["watched", "watch", "watching", "watches"],
        correct: "watched"
      }
    ],
    points: 30,
    difficulty: "medium",
    explanation: "Use past simple 'watched' for completed actions in the past."
  },

  // ENGLISH SENTENCES - LEVEL 2
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 1,
    question: "Build a sentence about future plans",
    targetSentence: "I am going to the party tomorrow",
    hint: "Express future plans using 'I am going to...'",
    words: ["I", "am", "going", "to", "the", "party", "tomorrow"],
    points: 30,
    difficulty: "medium",
    explanation: "Use 'am going to' for planned future activities."
  },

  // ENGLISH IMAGE BASED - LEVEL 2
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 1,
    question: "What kitchen appliance keeps food cold?",
    options: ["Oven", "Microwave", "Refrigerator", "Dishwasher"],
    correctAnswer: "Refrigerator",
    points: 30,
    difficulty: "medium",
    explanation: "A refrigerator keeps food cold and fresh.",
    imageUrl: "https://via.placeholder.com/200x200/607D8B/FFFFFF?text=🧊+Fridge"
  },

  // ============================================
  // LEVEL 3 EXERCISES (Advanced)
  // ============================================

  // ENGLISH VOCABULARY - LEVEL 3
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 1,
    sourceWord: "Magnificent",
    targetWord: "Muhteşem",
    points: 40,
    difficulty: "hard",
    explanation: "Extremely beautiful or impressive"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 2,
    sourceWord: "Comprehend",
    targetWord: "Kavramak",
    points: 40,
    difficulty: "hard",
    explanation: "To understand fully or grasp mentally"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 3,
    sourceWord: "Perseverance",
    targetWord: "Azim",
    points: 40,
    difficulty: "hard",
    explanation: "Persistence in doing something despite difficulties"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 4,
    sourceWord: "Eloquent",
    targetWord: "Güzel konuşan",
    points: 40,
    difficulty: "hard",
    explanation: "Fluent and persuasive in speaking or writing"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 5,
    sourceWord: "Innovative",
    targetWord: "Yenilikçi",
    points: 40,
    difficulty: "hard",
    explanation: "Introducing new ideas or methods"
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 6,
    sourceWord: "Resilient",
    targetWord: "Dayanıklı",
    points: 40,
    difficulty: "hard",
    explanation: "Able to recover quickly from difficulties"
  },

  // ENGLISH GRAMMAR - LEVEL 3
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 1,
    question: "Which sentence shows correct subjunctive mood?",
    options: ["I suggest he goes", "I suggest he go", "I suggest he will go", "I suggest he going"],
    correctAnswer: "I suggest he go",
    points: 40,
    difficulty: "hard",
    explanation: "Use base form of verb in subjunctive after 'suggest'.",
    grammarRule: "Subjunctive mood uses the base form of the verb after certain expressions.",
    imageUrl: "https://via.placeholder.com/200x200/9C27B0/FFFFFF?text=Subjunctive"
  },
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 2,
    question: "What is the correct form: 'Had I known, I ___ come earlier'?",
    options: ["will", "would", "would have", "will have"],
    correctAnswer: "would have",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'would have' in third conditional sentences.",
    grammarRule: "Third conditional: If + past perfect, would have + past participle.",
    imageUrl: "https://via.placeholder.com/200x200/FF5722/FFFFFF?text=3rd+Conditional"
  }
];

// Database seeding function getFormatDescription(category) {
  switch (category) {
    case 'vocabulary':
      return 'Word Matching (Source ↔ Target pairs)';
    case 'grammar':
      return 'Image + Multiple Choice + Grammar Rules';
    case 'filltheblanks':
      return 'Dialogue with Blanks to Fill';
    case 'sentences':
      return 'Word Building/Sentence Construction';
    case 'imagebased':
      return 'Visual Analysis + Multiple Choice';
    default:
      return 'Unknown Format';
  }

// Export functions and data
module.exports = { 
  seedAllExercises, 
  allExercises,
  
  // Language-specific data for easy access
  englishExercises: allExercises.filter(ex => ex.language === 'English'),
  germanExercises: allExercises.filter(ex => ex.language === 'German'),
  
  // Category-specific data
  vocabularyExercises: allExercises.filter(ex => ex.category === 'vocabulary'),
  grammarExercises: allExercises.filter(ex => ex.category === 'grammar'),
  fillTheBlanksExercises: allExercises.filter(ex => ex.category === 'filltheblanks'),
  sentencesExercises: allExercises.filter(ex => ex.category === 'sentences'),
  imageBasedExercises: allExercises.filter(ex => ex.category === 'imagebased'),
  
  // Helper functions
  getExercisesByLanguage: (language) => allExercises.filter(ex => ex.language === language),
  getExercisesByCategory: (language, category) => allExercises.filter(ex => ex.language === language && ex.category === category),
  getExercisesByLevel: (language, category, level) => allExercises.filter(ex => ex.language === language && ex.category === category && ex.level === level),
  
  // Format validation helpers
  validateVocabularyFormat: (exercise) => {
    return exercise.sourceWord && exercise.targetWord;
  },
  
  validateGrammarFormat: (exercise) => {
    return exercise.question && exercise.options && exercise.correctAnswer && exercise.grammarRule;
  },
  
  validateFillTheBlanksFormat: (exercise) => {
    return exercise.dialogue && Array.isArray(exercise.dialogue) && 
           exercise.dialogue.some(line => line.blank === true);
  },
  
  validateSentencesFormat: (exercise) => {
    return exercise.targetSentence && exercise.words && Array.isArray(exercise.words);
  },
  
  validateImageBasedFormat: (exercise) => {
    return exercise.question && exercise.options && exercise.correctAnswer && exercise.imageUrl;
  },
  
  // Statistics
  getLanguageStats: () => {
    const stats = {};
    allExercises.forEach(ex => {
      if (!stats[ex.language]) stats[ex.language] = 0;
      stats[ex.language]++;
    });
    return stats;
  },
  
  getCategoryStats: (language) => {
    const stats = {};
    allExercises.filter(ex => ex.language === language).forEach(ex => {
      if (!stats[ex.category]) stats[ex.category] = 0;
      stats[ex.category]++;
    });
    return stats;
  },

  getFormatStats: () => {
    const stats = {};
    allExercises.forEach(ex => {
      const key = `${ex.language}-${ex.category}`;
      if (!stats[key]) {
        stats[key] = {
          language: ex.language,
          category: ex.category,
          format: getFormatDescription(ex.category),
          count: 0,
          levels: new Set()
        };
      }
      stats[key].count++;
      stats[key].levels.add(ex.level);
    });
    
    // Convert Set to Array for levels
    Object.keys(stats).forEach(key => {
      stats[key].levels = Array.from(stats[key].levels).sort();
    });
    
    return stats;
  },

  // Data integrity checks
  validateAllExercises: () => {
    const errors = [];
    
    allExercises.forEach((exercise, index) => {
      // Check required fields
      if (!exercise.language || !exercise.category || !exercise.level) {
        errors.push(`Exercise ${index}: Missing required fields (language, category, level)`);
      }
      
      // Check format-specific fields
      switch (exercise.category) {
        case 'vocabulary':
          if (!exercise.sourceWord || !exercise.targetWord) {
            errors.push(`Exercise ${index}: Vocabulary missing sourceWord or targetWord`);
          }
          break;
          
        case 'grammar':
          if (!exercise.question || !exercise.options || !exercise.correctAnswer) {
            errors.push(`Exercise ${index}: Grammar missing required fields`);
          }
          if (exercise.options && !exercise.options.includes(exercise.correctAnswer)) {
            errors.push(`Exercise ${index}: Grammar correctAnswer not in options`);
          }
          break;
          
        case 'filltheblanks':
          if (!exercise.dialogue || !Array.isArray(exercise.dialogue)) {
            errors.push(`Exercise ${index}: FillTheBlanks missing dialogue array`);
          } else {
            const hasBlank = exercise.dialogue.some(line => line.blank === true);
            if (!hasBlank) {
              errors.push(`Exercise ${index}: FillTheBlanks has no blank fields`);
            }
          }
          break;
          
        case 'sentences':
          if (!exercise.targetSentence || !exercise.words) {
            errors.push(`Exercise ${index}: Sentences missing targetSentence or words`);
          }
          break;
          
        case 'imagebased':
          if (!exercise.question || !exercise.options || !exercise.correctAnswer) {
            errors.push(`Exercise ${index}: ImageBased missing required fields`);
          }
          break;
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      totalExercises: allExercises.length
    };
  }
};

// Run the seeding if called directly
if (require.main === module) {
  seedAllExercises();
}

// Example usage and testing
console.log('\n🧪 TESTING DATA STRUCTURE:');
console.log('=====================================');

// Test each format
const testExercises = {
  vocabulary: allExercises.find(ex => ex.category === 'vocabulary'),
  grammar: allExercises.find(ex => ex.category === 'grammar'),
  filltheblanks: allExercises.find(ex => ex.category === 'filltheblanks'),
  sentences: allExercises.find(ex => ex.category === 'sentences'),
  imagebased: allExercises.find(ex => ex.category === 'imagebased')
};

Object.entries(testExercises).forEach(([category, exercise]) => {
  if (exercise) {
    console.log(`✅ ${category.toUpperCase()}: Valid structure`);
    console.log(`   - Language: ${exercise.language}`);
    console.log(`   - Level: ${exercise.level}`);
    console.log(`   - Points: ${exercise.points}`);
    console.log(`   - Difficulty: ${exercise.difficulty}`);
    
    switch (category) {
      case 'vocabulary':
        console.log(`   - Source: "${exercise.sourceWord}" → Target: "${exercise.targetWord}"`);
        break;
      case 'grammar':
        console.log(`   - Question: "${exercise.question.substring(0, 50)}..."`);
        console.log(`   - Options: ${exercise.options.length} choices`);
        console.log(`   - Has Grammar Rule: ${!!exercise.grammarRule}`);
        break;
      case 'filltheblanks':
        console.log(`   - Dialogue Lines: ${exercise.dialogue.length}`);
        console.log(`   - Has Blanks: ${exercise.dialogue.some(line => line.blank)}`);
        break;
      case 'sentences':
        console.log(`   - Target: "${exercise.targetSentence}"`);
        console.log(`   - Words: ${exercise.words.length} words`);
        console.log(`   - Has Hint: ${!!exercise.hint}`);
        break;
      case 'imagebased':
        console.log(`   - Question: "${exercise.question.substring(0, 50)}..."`);
        console.log(`   - Options: ${exercise.options.length} choices`);
        console.log(`   - Has Image: ${!!exercise.imageUrl}`);
        break;
    }
    console.log('');
  } else {
    console.log(`❌ ${category.toUpperCase()}: No exercise found`);
  }
});

console.log('🔍 Data validation result:');
const validation = module.exports.validateAllExercises();
if (validation.isValid) {
  console.log(`✅ All ${validation.totalExercises} exercises are valid!`);
} else {
  console.log(`❌ Found ${validation.errors.length} validation errors:`);
  validation.errors.forEach(error => console.log(`   - ${error}`));
}
async function seedAllExercises() {
  try {
    console.log('🌍 Starting complete multi-format database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing exercises
    await Exercise.deleteMany({});
    console.log('🧹 Cleared all existing exercises');

    // Insert all exercises
    const result = await Exercise.insertMany(allExercises);
    console.log(`📚 Inserted ${result.length} exercises successfully!`);

    // Display comprehensive summary by format
    const formatStats = {};
    
    allExercises.forEach(exercise => {
      const { language, category, level } = exercise;
      const key = `${language}-${category}`;
      
      if (!formatStats[key]) {
        formatStats[key] = {
          language,
          category,
          totalExercises: 0,
          levels: new Set(),
          format: getFormatDescription(category)
        };
      }
      
      formatStats[key].totalExercises++;
      formatStats[key].levels.add(level);
    });

    console.log('\n🎯 EXERCISE FORMATS SUMMARY:');
    console.log('=====================================');
    
    Object.entries(formatStats).forEach(([key, stats]) => {
      const flag = stats.language === 'English' ? '🇺🇸' : '🇩🇪';
      const levels = Array.from(stats.levels).sort();
      console.log(`${flag} ${stats.language} ${stats.category.toUpperCase()}:`);
      console.log(`   📝 Format: ${stats.format}`);
      console.log(`   📊 ${stats.totalExercises} exercises across ${levels.length} levels (${levels.join(', ')})`);
      console.log('');
    });

    console.log('\n🔧 FORMAT SPECIFICATIONS:');
    console.log('=====================================');
    console.log('📝 VOCABULARY: sourceWord + targetWord (matching pairs)');
    console.log('📝 GRAMMAR: question + options + correctAnswer + grammarRule + imageUrl');
    console.log('📝 FILLTHEBLANKS: dialogue array with speaker/text/blank/options');
    console.log('📝 SENTENCES: targetSentence + hint + words array');
    console.log('📝 IMAGEBASED: question + options + correctAnswer + imageUrl');

    console.log('\n📊 TOTAL STATISTICS:');
    console.log('=====================================');
    const totalEnglish = allExercises.filter(ex => ex.language === 'English').length;
    const totalGerman = allExercises.filter(ex => ex.language === 'German').length;
    const grandTotal = totalEnglish + totalGerman;
    
    console.log(`   🇺🇸 English exercises: ${totalEnglish}`);
    console.log(`   🇩🇪 German exercises: ${totalGerman}`);
    console.log(`   🌍 Total exercises: ${grandTotal}`);
    console.log(`   📚 Languages supported: 2`);
    console.log(`   📂 Exercise types: 5 (vocabulary, grammar, filltheblanks, sentences, imagebased)`);
    console.log(`   📈 Levels per type: 1-3`);

    console.log('\n🚀 FRONTEND USAGE:');
    console.log('=====================================');
    console.log('1. 🔧 exercise-detail.tsx automatically detects format by category');
    console.log('2. 📱 Each category renders with its specific UI:');
    console.log('   • vocabulary → matching grid (left/right columns)');
    console.log('   • grammar → image + multiple choice with grammar rules');
    console.log('   • filltheblanks → dialogue format with blanks to fill');
    console.log('   • sentences → word building/reordering interface');
    console.log('   • imagebased → large image + enhanced multiple choice');
    console.log('');
    console.log('3. 🎯 Data structure matches exactly what unified component expects');
    console.log('4. 🔄 No code changes needed - just use existing exercise-detail.tsx');

    console.log('\n✅ Multi-format database seeding completed successfully!');
    console.log('🚀 Ready to use all exercise types with proper formatting!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    console.log('🎉 Multi-format seeding process completed!');
  }
}

function getFormatDescription(category) {  // Yeni fonksiyon başlıyor
    switch (category) {
      case 'vocabulary':
        return 'Word Matching (Source ↔ Target pairs)';
      case 'grammar':
        return 'Image + Multiple Choice + Grammar Rules';
      case 'filltheblanks':
        return 'Dialogue with Blanks to Fill';
      case 'sentences':
        return 'Word Building/Sentence Construction';
      case 'imagebased':
        return 'Visual Analysis + Multiple Choice';
      default:
        return 'Unknown Format';
    }
  }