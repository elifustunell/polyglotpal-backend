// Updated seed.js - Enhanced exercise formats for unified component

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

// Database connection
const MONGO_URI = 'mongodb+srv://user:user123456@cluster0.k0qenmz.mongodb.net/test?retryWrites=true&w=majority';

const allExercises = [
  // ============================================
  // ENGLISH EXERCISES
  // ============================================
  
  // ENGLISH FILL THE BLANKS - LEVEL 1
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'I _____ breakfast at 8 AM every day.',
        blank: true,
        options: ['eat', 'ate', 'eating', 'eaten'],
        correct: 'eat'
      },
      {
        speaker: 'B',
        text: 'That sounds like a good routine!',
        blank: false
      }
    ],
    answer: "eat",
    points: 20,
    difficulty: "easy",
    explanation: "Use simple present tense for daily habits and routines."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 2,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'She _____ to school by bus.',
        blank: true,
        options: ['go', 'goes', 'going', 'gone'],
        correct: 'goes'
      },
      {
        speaker: 'B',
        text: 'Is the bus service reliable?',
        blank: false
      }
    ],
    answer: "goes",
    points: 20,
    difficulty: "easy",
    explanation: "Third person singular adds 's' in present tense."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 3,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'They _____ football on weekends.',
        blank: true,
        options: ['play', 'plays', 'played', 'playing'],
        correct: 'play'
      },
      {
        speaker: 'B',
        text: 'Which team do they support?',
        blank: false
      }
    ],
    answer: "play",
    points: 20,
    difficulty: "easy",
    explanation: "Use base form with plural subjects in present tense."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 4,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'We _____ English every Monday.',
        blank: true,
        options: ['study', 'studies', 'studied', 'studying'],
        correct: 'study'
      },
      {
        speaker: 'B',
        text: 'How long are your lessons?',
        blank: false
      }
    ],
    answer: "study",
    points: 20,
    difficulty: "easy",
    explanation: "Present tense for regular scheduled activities."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 5,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'The cat _____ milk twice a day.',
        blank: true,
        options: ['drink', 'drinks', 'drank', 'drinking'],
        correct: 'drinks'
      },
      {
        speaker: 'B',
        text: 'Cats actually prefer water over milk.',
        blank: false
      }
    ],
    answer: "drinks",
    points: 20,
    difficulty: "easy",
    explanation: "Third person singular present tense with animals."
  },

  // ENGLISH FILL THE BLANKS - LEVEL 2
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'He _____ his homework before dinner.',
        blank: true,
        options: ['finishes', 'finished', 'finishing', 'finish'],
        correct: 'finishes'
      },
      {
        speaker: 'B',
        text: 'That\'s a good habit to have.',
        blank: false
      }
    ],
    answer: "finishes",
    points: 30,
    difficulty: "medium",
    explanation: "Present simple tense for habitual actions."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 2,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'We _____ a movie last night.',
        blank: true,
        options: ['watched', 'watch', 'watching', 'watches'],
        correct: 'watched'
      },
      {
        speaker: 'B',
        text: 'What movie did you watch?',
        blank: false
      }
    ],
    answer: "watched",
    points: 30,
    difficulty: "medium",
    explanation: "Use past simple for completed actions in the past."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 3,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'I _____ going to the party tomorrow.',
        blank: true,
        options: ['am', 'is', 'are', 'be'],
        correct: 'am'
      },
      {
        speaker: 'B',
        text: 'Should I pick you up?',
        blank: false
      }
    ],
    answer: "am",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'am' with 'I' for present continuous/future plans."
  },

  // ENGLISH VOCABULARY - LEVEL 1
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 1,
    question: "Match the English words with their Turkish translations",
    matchPairs: [
      { id: 1, source: "Hello", target: "Merhaba" },
      { id: 2, source: "Thank you", target: "Teşekkürler" },
      { id: 3, source: "Water", target: "Su" },
      { id: 4, source: "Book", target: "Kitap" },
      { id: 5, source: "House", target: "Ev" },
      { id: 6, source: "Friend", target: "Arkadaş" }
    ],
    answer: "match_pairs",
    points: 30,
    difficulty: "easy",
    explanation: "Basic English vocabulary for everyday communication."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 2,
    question: "Match the English words with their Turkish translations",
    matchPairs: [
      { id: 7, source: "Good", target: "İyi" },
      { id: 8, source: "Bad", target: "Kötü" },
      { id: 9, source: "Big", target: "Büyük" },
      { id: 10, source: "Small", target: "Küçük" },
      { id: 11, source: "Hot", target: "Sıcak" },
      { id: 12, source: "Cold", target: "Soğuk" }
    ],
    answer: "match_pairs",
    points: 30,
    difficulty: "easy",
    explanation: "Common adjectives used in daily conversations."
  },

  // ENGLISH GRAMMAR - LEVEL 1
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 1,
    question: "Which article is used before singular countable nouns beginning with a consonant?",
    options: ["a", "an", "the", "no article"],
    answer: "a",
    points: 20,
    difficulty: "easy",
    explanation: "Use 'a' before singular countable nouns starting with consonant sounds.",
    image: "https://via.placeholder.com/150x150/blue/white?text=A+vs+AN"
  },
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 2,
    question: "What is the plural form of 'child'?",
    options: ["childs", "children", "childes", "child"],
    answer: "children",
    points: 20,
    difficulty: "easy",
    explanation: "'Child' has an irregular plural form: 'children'.",
    image: "https://via.placeholder.com/150x150/green/white?text=Children"
  },

  // ENGLISH SENTENCES - LEVEL 1
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 1,
    question: "Arrange the words to form a correct question",
    target: "What is your name?",
    words: ["What", "is", "your", "name", "?"],
    scrambled: ["name", "What", "your", "is", "?"],
    hint: "A question asking for someone's identity",
    answer: "What is your name?",
    points: 25,
    difficulty: "easy",
    explanation: "Questions with 'what' follow the structure: What + be + subject?"
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 2,
    question: "Arrange the words to form a correct sentence",
    target: "I am a student.",
    words: ["I", "am", "a", "student", "."],
    scrambled: ["student", "a", "am", "I", "."],
    hint: "A statement about someone's occupation",
    answer: "I am a student.",
    points: 25,
    difficulty: "easy",
    explanation: "Use article 'a' before singular countable nouns like 'student'."
  },

  // ENGLISH IMAGE BASED - LEVEL 1
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 1,
    question: "What color is typically associated with apples?",
    options: ["Red", "Blue", "Purple", "Yellow"],
    answer: "Red",
    points: 20,
    difficulty: "easy",
    explanation: "Apples are commonly red, though they can be green or yellow too.",
    image: "https://via.placeholder.com/200x200/red/white?text=🍎"
  },
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 2,
    question: "Which animal says 'meow'?",
    options: ["Dog", "Cat", "Bird", "Fish"],
    answer: "Cat",
    points: 20,
    difficulty: "easy",
    explanation: "Cats make the sound 'meow'.",
    image: "https://via.placeholder.com/200x200/orange/white?text=🐱"
  },

  // ============================================
  // GERMAN EXERCISES
  // ============================================

  // GERMAN FILL THE BLANKS - LEVEL 1
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'Ich _____ aus Deutschland.',
        blank: true,
        options: ['bin', 'bist', 'ist', 'sind'],
        correct: 'bin'
      },
      {
        speaker: 'B',
        text: 'Wie schön! Aus welcher Stadt kommst du?',
        blank: false
      }
    ],
    answer: "bin",
    points: 20,
    difficulty: "easy",
    explanation: "'I am' is always 'ich bin' in German."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 2,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'Das ist _____ Hund.',
        blank: true,
        options: ['ein', 'eine', 'der', 'die'],
        correct: 'ein'
      },
      {
        speaker: 'B',
        text: 'Wie heißt er denn?',
        blank: false
      }
    ],
    answer: "ein",
    points: 20,
    difficulty: "easy",
    explanation: "'Hund' is masculine, so 'a dog' is 'ein Hund'."
  },

  // GERMAN VOCABULARY - LEVEL 1
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 1,
    question: "Match the German words with their English translations",
    matchPairs: [
      { id: 1, source: "Hallo", target: "Hello" },
      { id: 2, source: "Danke", target: "Thank you" },
      { id: 3, source: "Wasser", target: "Water" },
      { id: 4, source: "Buch", target: "Book" },
      { id: 5, source: "Haus", target: "House" },
      { id: 6, source: "Freund", target: "Friend" }
    ],
    answer: "match_pairs",
    points: 30,
    difficulty: "easy",
    explanation: "Basic German vocabulary for everyday communication."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 2,
    question: "Match the German words with their English translations",
    matchPairs: [
      { id: 7, source: "Gut", target: "Good" },
      { id: 8, source: "Schlecht", target: "Bad" },
      { id: 9, source: "Groß", target: "Big" },
      { id: 10, source: "Klein", target: "Small" },
      { id: 11, source: "Heiß", target: "Hot" },
      { id: 12, source: "Kalt", target: "Cold" }
    ],
    answer: "match_pairs",
    points: 30,
    difficulty: "easy",
    explanation: "Common German adjectives used in daily conversations."
  },

  // GERMAN GRAMMAR - LEVEL 1
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 1,
    question: "What is the correct article for 'Haus' (house)?",
    options: ["der", "die", "das", "den"],
    answer: "das",
    points: 20,
    difficulty: "easy",
    explanation: "'Haus' is neuter, so it takes the article 'das'.",
    image: "https://via.placeholder.com/150x150/blue/white?text=DAS+HAUS"
  },
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 2,
    question: "What is the correct article for 'Mann' (man)?",
    options: ["der", "die", "das", "den"],
    answer: "der",
    points: 20,
    difficulty: "easy",
    explanation: "'Mann' is masculine, so it takes the article 'der'.",
    image: "https://via.placeholder.com/150x150/blue/white?text=DER+MANN"
  },

  // GERMAN SENTENCES - LEVEL 1
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 1,
    question: "Arrange the words to form a correct German sentence",
    target: "Mein Name ist Anna",
    words: ["Mein", "Name", "ist", "Anna"],
    scrambled: ["ist", "Name", "Anna", "Mein"],
    hint: "How to introduce yourself in German",
    answer: "Mein Name ist Anna",
    points: 25,
    difficulty: "easy",
    explanation: "'Name' is masculine, so 'my name' is 'mein Name'."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 2,
    question: "Arrange the words to form a correct German sentence",
    target: "Ich wohne in Berlin",
    words: ["Ich", "wohne", "in", "Berlin"],
    scrambled: ["Berlin", "in", "wohne", "Ich"],
    hint: "How to say where you live",
    answer: "Ich wohne in Berlin",
    points: 25,
    difficulty: "easy",
    explanation: "'I live in' is 'ich wohne in' with cities."
  },

  // GERMAN IMAGE BASED - LEVEL 1
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 1,
    question: "What is 'cat' in German?",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    answer: "Katze",
    points: 20,
    difficulty: "easy",
    explanation: "'Cat' is 'Katze' in German (feminine: die Katze).",
    image: "https://via.placeholder.com/200x200/orange/white?text=🐱+KATZE"
  },
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 2,
    question: "What is 'apple' in German?",
    options: ["Apfel", "Orange", "Banane", "Birne"],
    answer: "Apfel",
    points: 20,
    difficulty: "easy",
    explanation: "'Apple' is 'Apfel' in German (masculine: der Apfel).",
    image: "https://via.placeholder.com/200x200/red/white?text=🍎+APFEL"
  },

  // ============================================
  // LEVEL 2 AND 3 EXERCISES (Sample)
  // ============================================

  // ENGLISH FILL THE BLANKS - LEVEL 2
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'They _____ in Paris since 2020.',
        blank: true,
        options: ['lived', 'have lived', 'live', 'are living'],
        correct: 'have lived'
      },
      {
        speaker: 'B',
        text: 'Do they like it there?',
        blank: false
      }
    ],
    answer: "have lived",
    points: 30,
    difficulty: "medium",
    explanation: "Present perfect is used for actions continuing to the present."
  },

  // ENGLISH FILL THE BLANKS - LEVEL 3
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'If I _____ rich, I would travel the world.',
        blank: true,
        options: ['were', 'was', 'am', 'will be'],
        correct: 'were'
      },
      {
        speaker: 'B',
        text: 'That sounds like a wonderful dream!',
        blank: false
      }
    ],
    answer: "were",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'were' in conditional sentences for all persons."
  },

  // GERMAN FILL THE BLANKS - LEVEL 2
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'Ich gebe _____ Mann das Buch.',
        blank: true,
        options: ['der', 'dem', 'den', 'des'],
        correct: 'dem'
      },
      {
        speaker: 'B',
        text: 'Das ist sehr nett von dir.',
        blank: false
      }
    ],
    answer: "dem",
    points: 30,
    difficulty: "medium",
    explanation: "Dative case: 'geben' requires dative for indirect object."
  },

  // GERMAN FILL THE BLANKS - LEVEL 3
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 1,
    question: "Complete the dialogue",
    dialogue: [
      {
        speaker: 'A',
        text: 'Ich wünschte, ich _____ mehr Zeit hätte.',
        blank: true,
        options: ['habe', 'hatte', 'hätte', 'haben'],
        correct: 'hätte'
      },
      {
        speaker: 'B',
        text: 'Das wünschen sich viele Menschen.',
        blank: false
      }
    ],
    answer: "hätte",
    points: 40,
    difficulty: "hard",
    explanation: "Subjunctive II: 'ich hätte' for hypothetical wishes."
  },

  // ADDITIONAL VOCABULARY EXERCISES - LEVEL 2
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 1,
    question: "Match the English words with their Turkish translations",
    matchPairs: [
      { id: 13, source: "Teacher", target: "Öğretmen" },
      { id: 14, source: "Doctor", target: "Doktor" },
      { id: 15, source: "Student", target: "Öğrenci" },
      { id: 16, source: "Engineer", target: "Mühendis" },
      { id: 17, source: "Lawyer", target: "Avukat" },
      { id: 18, source: "Nurse", target: "Hemşire" }
    ],
    answer: "match_pairs",
    points: 35,
    difficulty: "medium",
    explanation: "Professional occupations vocabulary."
  },

  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 1,
    question: "Match the German words with their English translations",
    matchPairs: [
      { id: 13, source: "Lehrer", target: "Teacher" },
      { id: 14, source: "Arzt", target: "Doctor" },
      { id: 15, source: "Student", target: "Student" },
      { id: 16, source: "Ingenieur", target: "Engineer" },
      { id: 17, source: "Anwalt", target: "Lawyer" },
      { id: 18, source: "Krankenschwester", target: "Nurse" }
    ],
    answer: "match_pairs",
    points: 35,
    difficulty: "medium",
    explanation: "Professional occupations vocabulary in German."
  },

  // ADDITIONAL GRAMMAR EXERCISES
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 1,
    question: "Which is the correct comparative form of 'good'?",
    options: ["gooder", "more good", "better", "best"],
    answer: "better",
    points: 30,
    difficulty: "medium",
    explanation: "'Good' has an irregular comparative form: 'better'.",
    image: "https://via.placeholder.com/150x150/green/white?text=GOOD+BETTER"
  },

  {
    language: "German",
    category: "grammar",
    level: 2,
    order: 1,
    question: "What is the accusative form of 'der Mann'?",
    options: ["der Mann", "den Mann", "dem Mann", "des Mannes"],
    answer: "den Mann",
    points: 30,
    difficulty: "medium",
    explanation: "In accusative case, 'der Mann' becomes 'den Mann'.",
    image: "https://via.placeholder.com/150x150/blue/white?text=DEN+MANN"
  },

  // ADDITIONAL SENTENCES EXERCISES
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 1,
    question: "Arrange the words to form a correct complex sentence",
    target: "Because it was raining, we stayed inside.",
    words: ["Because", "it", "was", "raining,", "we", "stayed", "inside."],
    scrambled: ["inside.", "stayed", "we", "raining,", "was", "it", "Because"],
    hint: "A sentence explaining cause and effect",
    answer: "Because it was raining, we stayed inside.",
    points: 35,
    difficulty: "medium",
    explanation: "Don't use 'so' with 'because' in the same sentence."
  },

  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 1,
    question: "Arrange the words to form a correct German sentence",
    target: "Morgen werde ich einkaufen gehen",
    words: ["Morgen", "werde", "ich", "einkaufen", "gehen"],
    scrambled: ["gehen", "einkaufen", "ich", "werde", "Morgen"],
    hint: "A sentence about future plans",
    answer: "Morgen werde ich einkaufen gehen",
    points: 35,
    difficulty: "medium",
    explanation: "When sentence starts with time, verb comes second: 'Morgen werde ich...'."
  },

  // ADDITIONAL IMAGE BASED EXERCISES
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 1,
    question: "What kitchen appliance is used to keep food cold?",
    options: ["Oven", "Microwave", "Refrigerator", "Dishwasher"],
    answer: "Refrigerator",
    points: 30,
    difficulty: "medium",
    explanation: "A refrigerator keeps food cold and fresh.",
    image: "https://via.placeholder.com/200x200/lightblue/white?text=❄️+FRIDGE"
  },

  {
    language: "German",
    category: "imagebased",
    level: 2,
    order: 1,
    question: "What is 'refrigerator' in German?",
    options: ["Ofen", "Kühlschrank", "Waschmaschine", "Geschirrspüler"],
    answer: "Kühlschrank",
    points: 30,
    difficulty: "medium",
    explanation: "'Refrigerator' is 'Kühlschrank' in German.",
    image: "https://via.placeholder.com/200x200/lightblue/white?text=❄️+KÜHLSCHRANK"
  }
];

// Database seeding function
async function seedAllExercises() {
  try {
    console.log('🌍 Starting enhanced multi-language database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing exercises
    await Exercise.deleteMany({});
    console.log('🧹 Cleared all existing exercises');

    // Insert all exercises
    const result = await Exercise.insertMany(allExercises);
    console.log(`📚 Inserted ${result.length} exercises successfully!`);

    // Display comprehensive summary
    const languageStats = {};
    
    allExercises.forEach(exercise => {
      const { language, category, level } = exercise;
      
      if (!languageStats[language]) {
        languageStats[language] = {
          totalExercises: 0,
          categories: {}
        };
      }
      
      if (!languageStats[language].categories[category]) {
        languageStats[language].categories[category] = {
          totalExercises: 0,
          levels: new Set()
        };
      }
      
      languageStats[language].totalExercises++;
      languageStats[language].categories[category].totalExercises++;
      languageStats[language].categories[category].levels.add(level);
    });

    console.log('\n🌍 ENHANCED DATABASE SUMMARY:');
    console.log('=====================================');
    
    Object.entries(languageStats).forEach(([language, stats]) => {
      const flag = language === 'English' ? '🇺🇸' : language === 'German' ? '🇩🇪' : '🌍';
      console.log(`\n${flag} ${language.toUpperCase()}: ${stats.totalExercises} exercises`);
      console.log('-------------------------------------');
      
      Object.entries(stats.categories).forEach(([category, categoryStats]) => {
        const levels = Array.from(categoryStats.levels).sort();
        const icon = {
          'filltheblanks': '💬',
          'vocabulary': '📝',
          'grammar': '📖',
          'sentences': '🔤',
          'imagebased': '🖼️'
        }[category] || '📚';
        console.log(`   ${icon} ${category}: ${categoryStats.totalExercises} exercises (Levels: ${levels.join(', ')})`);
      });
    });

    console.log('\n🎯 ENHANCED EXERCISE FORMATS:');
    console.log('=====================================');
    console.log('💬 Fill the Blanks: Interactive dialogues with multiple choice');
    console.log('📝 Vocabulary: Word matching with visual feedback');
    console.log('📖 Grammar: Rule-based questions with images');
    console.log('🔤 Sentences: Word arrangement with hints');
    console.log('🖼️ Image Based: Visual learning with pictures');

    console.log('\n🚀 NEW FEATURES:');
    console.log('=====================================');
    console.log('✨ Unified exercise component supporting all types');
    console.log('🎨 Enhanced visual design with icons and colors');
    console.log('💫 Interactive feedback for all exercise types');
    console.log('🎯 Category-specific UI adaptations');
    console.log('📊 Comprehensive progress tracking');
    console.log('🌐 Consistent experience across languages');

    console.log('\n✅ Enhanced database seeding completed successfully!');
    console.log('🚀 Ready to use unified multi-language learning app!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    console.log('🎉 Enhanced multi-language seeding process completed!');
  }
}

// Export functions and data
module.exports = { 
  seedAllExercises, 
  allExercises,
  
  // Language-specific data for easy access
  englishExercises: allExercises.filter(ex => ex.language === 'English'),
  germanExercises: allExercises.filter(ex => ex.language === 'German'),
  
  // Helper functions
  getExercisesByLanguage: (language) => allExercises.filter(ex => ex.language === language),
  getExercisesByCategory: (language, category) => allExercises.filter(ex => ex.language === language && ex.category === category),
  getExercisesByLevel: (language, category, level) => allExercises.filter(ex => ex.language === language && ex.category === category && ex.level === level),
  
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
  }
};

// Run the seeding if called directly
if (require.main === module) {
  seedAllExercises();
}