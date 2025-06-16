// complete-seed.js - English ve German exercises birlikte

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
    question: "I ___ breakfast at 8 AM every day.",
    options: ["eat", "ate", "eating", "eaten"],
    answer: "eat",
    points: 20,
    difficulty: "easy",
    explanation: "Use simple present tense for daily habits."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 2,
    question: "She ___ to school by bus.",
    options: ["go", "goes", "going", "gone"],
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
    question: "They ___ football on weekends.",
    options: ["play", "plays", "played", "playing"],
    answer: "play",
    points: 20,
    difficulty: "easy",
    explanation: "Use base form with plural subjects."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 4,
    question: "We ___ English every Monday.",
    options: ["study", "studies", "studied", "studying"],
    answer: "study",
    points: 20,
    difficulty: "easy",
    explanation: "Present tense for regular activities."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 1,
    order: 5,
    question: "The cat ___ milk twice a day.",
    options: ["drink", "drinks", "drank", "drinking"],
    answer: "drinks",
    points: 20,
    difficulty: "easy",
    explanation: "Third person singular present tense."
  },

  // ENGLISH FILL THE BLANKS - LEVEL 2
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "He ___ his homework before dinner.",
    options: ["finishes", "finished", "finishing", "finish"],
    answer: "finishes",
    points: 30,
    difficulty: "medium",
    explanation: "Present simple tense for regular actions."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 2,
    question: "We ___ a movie last night.",
    options: ["watched", "watch", "watching", "watches"],
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
    question: "I ___ going to the party tomorrow.",
    options: ["am", "is", "are", "be"],
    answer: "am",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'am' with 'I' for present continuous/future plans."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 4,
    question: "They ___ in Paris since 2020.",
    options: ["lived", "have lived", "live", "are living"],
    answer: "have lived",
    points: 30,
    difficulty: "medium",
    explanation: "Present perfect is used for actions continuing to the present."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 2,
    order: 5,
    question: "The baby ___ now.",
    options: ["sleep", "sleeps", "is sleeping", "was sleeping"],
    answer: "is sleeping",
    points: 30,
    difficulty: "medium",
    explanation: "Use present continuous for ongoing actions."
  },

  // ENGLISH FILL THE BLANKS - LEVEL 3
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 1,
    question: "If I ___ rich, I would travel the world.",
    options: ["were", "was", "am", "will be"],
    answer: "were",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'were' in conditional sentences for all persons."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 2,
    question: "She ___ have finished her project by now.",
    options: ["should", "must", "can", "will"],
    answer: "should",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'should' to express expectation or probability."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 3,
    question: "The book ___ by millions of people last year.",
    options: ["read", "was read", "has read", "reading"],
    answer: "was read",
    points: 40,
    difficulty: "hard",
    explanation: "Use passive voice for past actions done to something."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 4,
    question: "I wish I ___ speak Chinese fluently.",
    options: ["can", "could", "will", "would"],
    answer: "could",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'could' in wish sentences for hypothetical abilities."
  },
  {
    language: "English",
    category: "filltheblanks",
    level: 3,
    order: 5,
    question: "By next year, they ___ their new house.",
    options: ["will build", "will have built", "build", "are building"],
    answer: "will have built",
    points: 40,
    difficulty: "hard",
    explanation: "Use future perfect for actions completed before a future time."
  },
  
  // ENGLISH VOCABULARY - LEVEL 1
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 1,
    question: "What does 'Hello' mean in Turkish?",
    options: ["Merhaba", "Güle güle", "Teşekkürler", "Özür dilerim"],
    answer: "Merhaba",
    points: 20,
    difficulty: "easy",
    explanation: "Hello is a basic greeting translated as 'Merhaba' in Turkish."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 2,
    question: "What does 'Thank you' mean in Turkish?",
    options: ["Merhaba", "Güle güle", "Teşekkürler", "Özür dilerim"],
    answer: "Teşekkürler",
    points: 20,
    difficulty: "easy",
    explanation: "Thank you is expressed as 'Teşekkürler' in Turkish."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 3,
    question: "What does 'Water' mean in Turkish?",
    options: ["Su", "Çay", "Kahve", "Süt"],
    answer: "Su",
    points: 20,
    difficulty: "easy",
    explanation: "Water is translated as 'Su' in Turkish."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 4,
    question: "What does 'Book' mean in Turkish?",
    options: ["Kitap", "Kalem", "Defter", "Masa"],
    answer: "Kitap",
    points: 20,
    difficulty: "easy",
    explanation: "Book is translated as 'Kitap' in Turkish."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 1,
    order: 5,
    question: "What does 'House' mean in Turkish?",
    options: ["Ev", "Okul", "Hastane", "Mağaza"],
    answer: "Ev",
    points: 20,
    difficulty: "easy",
    explanation: "House is translated as 'Ev' in Turkish."
  },

  // ENGLISH VOCABULARY - LEVEL 2
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 1,
    question: "What does 'Teacher' mean in Turkish?",
    options: ["Öğretmen", "Doktor", "Mühendis", "Avukat"],
    answer: "Öğretmen",
    points: 30,
    difficulty: "medium",
    explanation: "'Teacher' is translated as 'Öğretmen'."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 2,
    question: "What does 'Chair' mean in Turkish?",
    options: ["Sandalye", "Masa", "Kalem", "Kapı"],
    answer: "Sandalye",
    points: 30,
    difficulty: "medium",
    explanation: "'Chair' is translated as 'Sandalye'."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 3,
    question: "What does 'Cold' mean in Turkish?",
    options: ["Sıcak", "Soğuk", "Islak", "Kuru"],
    answer: "Soğuk",
    points: 30,
    difficulty: "medium",
    explanation: "'Cold' is translated as 'Soğuk'."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 4,
    question: "What does 'Fast' mean in Turkish?",
    options: ["Yavaş", "Hızlı", "Geç", "Erken"],
    answer: "Hızlı",
    points: 30,
    difficulty: "medium",
    explanation: "'Fast' is translated as 'Hızlı'."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 2,
    order: 5,
    question: "What does 'Window' mean in Turkish?",
    options: ["Pencere", "Kapı", "Duvar", "Tavan"],
    answer: "Pencere",
    points: 30,
    difficulty: "medium",
    explanation: "'Window' is translated as 'Pencere'."
  },

  // ENGLISH VOCABULARY - LEVEL 3
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 1,
    question: "What does 'Magnificent' mean in Turkish?",
    options: ["Muhteşem", "Korkunç", "Sıkıcı", "Basit"],
    answer: "Muhteşem",
    points: 40,
    difficulty: "hard",
    explanation: "'Magnificent' means 'Muhteşem' - something extremely beautiful."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 2,
    question: "What does 'Comprehend' mean in Turkish?",
    options: ["Anlamak", "Kaçmak", "Unutmak", "Başlamak"],
    answer: "Anlamak",
    points: 40,
    difficulty: "hard",
    explanation: "'Comprehend' means 'Anlamak' - to understand fully."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 3,
    question: "What does 'Perseverance' mean in Turkish?",
    options: ["Sabır", "Azim", "Korku", "Hız"],
    answer: "Azim",
    points: 40,
    difficulty: "hard",
    explanation: "'Perseverance' means 'Azim' - persistence in doing something."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 4,
    question: "What does 'Eloquent' mean in Turkish?",
    options: ["Belirsiz", "Akıcı", "Sessiz", "Yavaş"],
    answer: "Akıcı",
    points: 40,
    difficulty: "hard",
    explanation: "'Eloquent' means 'Akıcı' - fluent and persuasive in speaking."
  },
  {
    language: "English",
    category: "vocabulary",
    level: 3,
    order: 5,
    question: "What does 'Innovative' mean in Turkish?",
    options: ["Eski", "Yenilikçi", "Sıradan", "Karışık"],
    answer: "Yenilikçi",
    points: 40,
    difficulty: "hard",
    explanation: "'Innovative' means 'Yenilikçi' - introducing new ideas or methods."
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
    explanation: "Use 'a' before singular countable nouns starting with consonant sounds."
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
    explanation: "'Child' has an irregular plural form: 'children'."
  },
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 3,
    question: "Which pronoun replaces 'the book'?",
    options: ["he", "she", "it", "they"],
    answer: "it",
    points: 20,
    difficulty: "easy",
    explanation: "Use 'it' for inanimate objects like books."
  },
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 4,
    question: "What is the correct form: 'I ___ a student'?",
    options: ["am", "is", "are", "be"],
    answer: "am",
    points: 20,
    difficulty: "easy",
    explanation: "Use 'am' with the pronoun 'I'."
  },
  {
    language: "English",
    category: "grammar",
    level: 1,
    order: 5,
    question: "Which word order is correct?",
    options: ["Red big car", "Big red car", "Car red big", "Car big red"],
    answer: "Big red car",
    points: 20,
    difficulty: "easy",
    explanation: "Size adjectives come before color adjectives."
  },

  // ENGLISH GRAMMAR - LEVEL 2
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
    explanation: "'Good' has an irregular comparative form: 'better'."
  },
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 2,
    question: "What is the correct question tag: 'She is coming, ___?'",
    options: ["isn't she", "is she", "doesn't she", "does she"],
    answer: "isn't she",
    points: 30,
    difficulty: "medium",
    explanation: "Use negative tag with positive statement."
  },
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 3,
    question: "Which sentence uses the correct relative pronoun?",
    options: ["The man which I met", "The man who I met", "The man what I met", "The man where I met"],
    answer: "The man who I met",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'who' for people in relative clauses."
  },
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 4,
    question: "What is the correct form: 'There ___ many books on the shelf'?",
    options: ["is", "are", "was", "be"],
    answer: "are",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'are' with plural subjects in there is/are constructions."
  },
  {
    language: "English",
    category: "grammar",
    level: 2,
    order: 5,
    question: "Which is correct: 'I have ___ money'?",
    options: ["a few", "few", "a little", "little"],
    answer: "a little",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'a little' with uncountable nouns like money."
  },

  // ENGLISH GRAMMAR - LEVEL 3
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 1,
    question: "Which sentence shows correct subjunctive mood?",
    options: ["I suggest he goes", "I suggest he go", "I suggest he will go", "I suggest he going"],
    answer: "I suggest he go",
    points: 40,
    difficulty: "hard",
    explanation: "Use base form of verb in subjunctive after 'suggest'."
  },
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 2,
    question: "What is the correct form: 'Had I known, I ___ come earlier'?",
    options: ["will", "would", "would have", "will have"],
    answer: "would have",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'would have' in third conditional sentences."
  },
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 3,
    question: "Which sentence uses correct parallel structure?",
    options: ["She likes reading, writing, and to swim", "She likes reading, writing, and swimming", "She likes to read, writing, and swimming", "She likes read, write, and swim"],
    answer: "She likes reading, writing, and swimming",
    points: 40,
    difficulty: "hard",
    explanation: "Maintain parallel structure with gerunds: -ing forms."
  },
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 4,
    question: "What is the correct form: '___ he rich or poor, I'll marry him'?",
    options: ["Whether", "If", "Unless", "Though"],
    answer: "Whether",
    points: 40,
    difficulty: "hard",
    explanation: "Use 'whether' to present alternatives (or)."
  },
  {
    language: "English",
    category: "grammar",
    level: 3,
    order: 5,
    question: "Which shows correct inversion: 'Never ___ such a beautiful sunset'?",
    options: ["I have seen", "have I seen", "I saw", "did I saw"],
    answer: "have I seen",
    points: 40,
    difficulty: "hard",
    explanation: "Invert subject and auxiliary after negative adverbs like 'never'."
  },

  // ENGLISH SENTENCES - LEVEL 1
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 1,
    question: "Choose the correct sentence structure:",
    options: [
      "What is your name?",
      "What your name is?",
      "Is what your name?",
      "Your name what is?"
    ],
    answer: "What is your name?",
    points: 20,
    difficulty: "easy",
    explanation: "Questions with 'what' follow the structure: What + be + subject?"
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 2,
    question: "Which sentence is grammatically correct?",
    options: [
      "I am student.",
      "I am a student.",
      "I student am.",
      "Am I student."
    ],
    answer: "I am a student.",
    points: 20,
    difficulty: "easy",
    explanation: "Use article 'a' before singular countable nouns like 'student'."
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 3,
    question: "Select the proper sentence order:",
    options: [
      "Goes to school she.",
      "She to school goes.",
      "She goes to school.",
      "To school she goes."
    ],
    answer: "She goes to school.",
    points: 20,
    difficulty: "easy",
    explanation: "Basic English sentence structure: Subject + Verb + Object."
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 4,
    question: "Which question is formed correctly?",
    options: [
      "Do you like pizza?",
      "You do like pizza?",
      "Like you do pizza?",
      "Pizza you like do?"
    ],
    answer: "Do you like pizza?",
    points: 20,
    difficulty: "easy",
    explanation: "Yes/no questions start with auxiliary verb 'do/does'."
  },
  {
    language: "English",
    category: "sentences",
    level: 1,
    order: 5,
    question: "Choose the correct negative sentence:",
    options: [
      "I no like coffee.",
      "I not like coffee.",
      "I don't like coffee.",
      "I like not coffee."
    ],
    answer: "I don't like coffee.",
    points: 20,
    difficulty: "easy",
    explanation: "Use 'don't' (do not) for negative sentences with 'I'."
  },

  // ENGLISH SENTENCES - LEVEL 2
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 1,
    question: "Which complex sentence is correctly formed?",
    options: [
      "Because it was raining, so we stayed inside.",
      "Because it was raining, we stayed inside.",
      "It was raining, because we stayed inside.",
      "We stayed inside, because of it was raining."
    ],
    answer: "Because it was raining, we stayed inside.",
    points: 30,
    difficulty: "medium",
    explanation: "Don't use 'so' with 'because' in the same sentence."
  },
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 2,
    question: "Select the sentence with correct punctuation:",
    options: [
      "Although, it was late we continued working.",
      "Although it was late, we continued working.",
      "Although it was late we, continued working.",
      "Although it was, late we continued working."
    ],
    answer: "Although it was late, we continued working.",
    points: 30,
    difficulty: "medium",
    explanation: "Place comma after the dependent clause in complex sentences."
  },
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 3,
    question: "Which sentence uses correct reported speech?",
    options: [
      "She said that she is coming.",
      "She said that she was coming.",
      "She said that she will come.",
      "She said that she come."
    ],
    answer: "She said that she was coming.",
    points: 30,
    difficulty: "medium",
    explanation: "Use past tense in reported speech when reporting verb is past."
  },
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 4,
    question: "Choose the sentence with proper conditional structure:",
    options: [
      "If I will have money, I will buy a car.",
      "If I have money, I will buy a car.",
      "If I had money, I will buy a car.",
      "If I have money, I would buy a car."
    ],
    answer: "If I have money, I will buy a car.",
    points: 30,
    difficulty: "medium",
    explanation: "Use present tense in if-clause for first conditional."
  },
  {
    language: "English",
    category: "sentences",
    level: 2,
    order: 5,
    question: "Which sentence shows correct use of articles?",
    options: [
      "I saw a elephant at the zoo.",
      "I saw an elephant at a zoo.",
      "I saw an elephant at the zoo.",
      "I saw the elephant at a zoo."
    ],
    answer: "I saw an elephant at the zoo.",
    points: 30,
    difficulty: "medium",
    explanation: "Use 'an' before vowel sounds and 'the' for specific places."
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
    explanation: "Apples are commonly red, though they can be green or yellow too."
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
    explanation: "Cats make the sound 'meow'."
  },
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 3,
    question: "What do you use to write?",
    options: ["Spoon", "Pen", "Cup", "Plate"],
    answer: "Pen",
    points: 20,
    difficulty: "easy",
    explanation: "A pen is used for writing."
  },
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 4,
    question: "Where do fish live?",
    options: ["Tree", "Water", "Air", "Ground"],
    answer: "Water",
    points: 20,
    difficulty: "easy",
    explanation: "Fish live in water environments like lakes, rivers, and oceans."
  },
  {
    language: "English",
    category: "imagebased",
    level: 1,
    order: 5,
    question: "What do you wear on your feet?",
    options: ["Hat", "Shoes", "Gloves", "Scarf"],
    answer: "Shoes",
    points: 20,
    difficulty: "easy",
    explanation: "Shoes are worn on feet for protection and comfort."
  },

  // ENGLISH IMAGE BASED - LEVEL 2
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
    explanation: "A refrigerator keeps food cold and fresh."
  },
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 2,
    question: "Which transportation has two wheels and pedals?",
    options: ["Car", "Bicycle", "Bus", "Train"],
    answer: "Bicycle",
    points: 30,
    difficulty: "medium",
    explanation: "A bicycle has two wheels and is powered by pedaling."
  },
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 3,
    question: "What weather phenomenon produces lightning?",
    options: ["Snow", "Rain", "Thunderstorm", "Wind"],
    answer: "Thunderstorm",
    points: 30,
    difficulty: "medium",
    explanation: "Thunderstorms produce lightning and thunder."
  },
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 4,
    question: "Which tool is used for cutting wood?",
    options: ["Hammer", "Screwdriver", "Saw", "Pliers"],
    answer: "Saw",
    points: 30,
    difficulty: "medium",
    explanation: "A saw is the tool specifically designed for cutting wood."
  },
  {
    language: "English",
    category: "imagebased",
    level: 2,
    order: 5,
    question: "What part of a flower attracts insects?",
    options: ["Root", "Stem", "Leaf", "Petal"],
    answer: "Petal",
    points: 30,
    difficulty: "medium",
    explanation: "Colorful petals attract insects for pollination."
  },

  // ============================================
  // GERMAN EXERCISES
  // ============================================

  // GERMAN VOCABULARY - LEVEL 1
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 1,
    question: "What does 'Hallo' mean in English?",
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    answer: "Hello",
    points: 20,
    difficulty: "easy",
    explanation: "'Hallo' is the basic German greeting meaning 'Hello'."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 2,
    question: "What does 'Danke' mean in English?",
    options: ["Please", "Sorry", "Thank you", "Excuse me"],
    answer: "Thank you",
    points: 20,
    difficulty: "easy",
    explanation: "'Danke' means 'Thank you' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 3,
    question: "What does 'Wasser' mean in English?",
    options: ["Fire", "Water", "Air", "Earth"],
    answer: "Water",
    points: 20,
    difficulty: "easy",
    explanation: "'Wasser' means 'Water' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 4,
    question: "What does 'Buch' mean in English?",
    options: ["Book", "Pen", "Paper", "Desk"],
    answer: "Book",
    points: 20,
    difficulty: "easy",
    explanation: "'Buch' means 'Book' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 1,
    order: 5,
    question: "What does 'Haus' mean in English?",
    options: ["Car", "House", "School", "Store"],
    answer: "House",
    points: 20,
    difficulty: "easy",
    explanation: "'Haus' means 'House' in German."
  },

  // GERMAN VOCABULARY - LEVEL 2
  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 1,
    question: "What does 'Lehrer' mean in English?",
    options: ["Student", "Teacher", "Doctor", "Engineer"],
    answer: "Teacher",
    points: 30,
    difficulty: "medium",
    explanation: "'Lehrer' means 'Teacher' in German (masculine form)."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 2,
    question: "What does 'Freundschaft' mean in English?",
    options: ["Love", "Friendship", "Family", "Relationship"],
    answer: "Friendship",
    points: 30,
    difficulty: "medium",
    explanation: "'Freundschaft' means 'Friendship' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 3,
    question: "What does 'Arbeit' mean in English?",
    options: ["Rest", "Work", "Play", "Study"],
    answer: "Work",
    points: 30,
    difficulty: "medium",
    explanation: "'Arbeit' means 'Work' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 4,
    question: "What does 'Gesundheit' mean in English?",
    options: ["Sickness", "Health", "Medicine", "Hospital"],
    answer: "Health",
    points: 30,
    difficulty: "medium",
    explanation: "'Gesundheit' means 'Health' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 2,
    order: 5,
    question: "What does 'Reise' mean in English?",
    options: ["Journey", "Hotel", "Airplane", "Vacation"],
    answer: "Journey",
    points: 30,
    difficulty: "medium",
    explanation: "'Reise' means 'Journey' or 'Trip' in German."
  },

  // GERMAN VOCABULARY - LEVEL 3
  {
    language: "German",
    category: "vocabulary",
    level: 3,
    order: 1,
    question: "What does 'Verantwortung' mean in English?",
    options: ["Freedom", "Responsibility", "Authority", "Power"],
    answer: "Responsibility",
    points: 40,
    difficulty: "hard",
    explanation: "'Verantwortung' means 'Responsibility' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 3,
    order: 2,
    question: "What does 'Erfahrung' mean in English?",
    options: ["Knowledge", "Experience", "Education", "Skill"],
    answer: "Experience",
    points: 40,
    difficulty: "hard",
    explanation: "'Erfahrung' means 'Experience' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 3,
    order: 3,
    question: "What does 'Geduld' mean in English?",
    options: ["Anger", "Patience", "Hurry", "Stress"],
    answer: "Patience",
    points: 40,
    difficulty: "hard",
    explanation: "'Geduld' means 'Patience' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 3,
    order: 4,
    question: "What does 'Verständnis' mean in English?",
    options: ["Confusion", "Understanding", "Question", "Problem"],
    answer: "Understanding",
    points: 40,
    difficulty: "hard",
    explanation: "'Verständnis' means 'Understanding' in German."
  },
  {
    language: "German",
    category: "vocabulary",
    level: 3,
    order: 5,
    question: "What does 'Entwicklung' mean in English?",
    options: ["Development", "Creation", "Destruction", "Change"],
    answer: "Development",
    points: 40,
    difficulty: "hard",
    explanation: "'Entwicklung' means 'Development' in German."
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
    explanation: "'Haus' is neuter, so it takes the article 'das'."
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
    explanation: "'Mann' is masculine, so it takes the article 'der'."
  },
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 3,
    question: "What is the correct article for 'Frau' (woman)?",
    options: ["der", "die", "das", "den"],
    answer: "die",
    points: 20,
    difficulty: "easy",
    explanation: "'Frau' is feminine, so it takes the article 'die'."
  },
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 4,
    question: "How do you say 'I am' in German?",
    options: ["ich bin", "ich bist", "ich ist", "ich sind"],
    answer: "ich bin",
    points: 20,
    difficulty: "easy",
    explanation: "'I am' is 'ich bin' in German."
  },
  {
    language: "German",
    category: "grammar",
    level: 1,
    order: 5,
    question: "What is the plural of 'Kind' (child)?",
    options: ["Kinds", "Kinder", "Kindes", "Kindern"],
    answer: "Kinder",
    points: 20,
    difficulty: "easy",
    explanation: "The plural of 'Kind' is 'Kinder'."
  },

  // GERMAN GRAMMAR - LEVEL 2
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
    explanation: "In accusative case, 'der Mann' becomes 'den Mann'."
  },
  {
    language: "German",
    category: "grammar",
    level: 2,
    order: 2,
    question: "What is the correct form: 'Ich ___ ein Buch' (I have a book)?",
    options: ["haben", "habe", "hat", "habt"],
    answer: "habe",
    points: 30,
    difficulty: "medium",
    explanation: "'I have' is 'ich habe' in German."
  },
  {
    language: "German",
    category: "grammar",
    level: 2,
    order: 3,
    question: "What is the dative form of 'die Frau'?",
    options: ["die Frau", "der Frau", "den Frau", "das Frau"],
    answer: "der Frau",
    points: 30,
    difficulty: "medium",
    explanation: "In dative case, 'die Frau' becomes 'der Frau'."
  },
  {
    language: "German",
    category: "grammar",
    level: 2,
    order: 4,
    question: "Which preposition requires the dative case: 'with'?",
    options: ["für", "durch", "mit", "ohne"],
    answer: "mit",
    points: 30,
    difficulty: "medium",
    explanation: "'Mit' (with) always requires the dative case."
  },
  {
    language: "German",
    category: "grammar",
    level: 2,
    order: 5,
    question: "What is the past tense of 'gehen' (to go) for 'ich'?",
    options: ["ging", "gegangen", "gehe", "gehst"],
    answer: "ging",
    points: 30,
    difficulty: "medium",
    explanation: "'I went' is 'ich ging' in German (simple past)."
  },

  // GERMAN GRAMMAR - LEVEL 3
  {
    language: "German",
    category: "grammar",
    level: 3,
    order: 1,
    question: "Which is the correct subjunctive II form: 'If I were rich'?",
    options: ["Wenn ich reich bin", "Wenn ich reich wäre", "Wenn ich reich war", "Wenn ich reich hatte"],
    answer: "Wenn ich reich wäre",
    points: 40,
    difficulty: "hard",
    explanation: "Subjunctive II (Konjunktiv II) for 'sein' is 'wäre'."
  },
  {
    language: "German",
    category: "grammar",
    level: 3,
    order: 2,
    question: "What is the correct word order: 'I know that he comes'?",
    options: ["Ich weiß, dass er kommt", "Ich weiß, dass kommt er", "Ich weiß, er dass kommt", "Ich weiß, er kommt dass"],
    answer: "Ich weiß, dass er kommt",
    points: 40,
    difficulty: "hard",
    explanation: "In subordinate clauses with 'dass', the verb goes to the end."
  },
  {
    language: "German",
    category: "grammar",
    level: 3,
    order: 3,
    question: "Which is the correct passive construction: 'The house is built'?",
    options: ["Das Haus baut", "Das Haus wird gebaut", "Das Haus ist bauen", "Das Haus hat gebaut"],
    answer: "Das Haus wird gebaut",
    points: 40,
    difficulty: "hard",
    explanation: "Passive voice uses 'werden' + past participle."
  },
  {
    language: "German",
    category: "grammar",
    level: 3,
    order: 4,
    question: "What is the genitive form of 'das Kind'?",
    options: ["das Kind", "dem Kind", "den Kind", "des Kindes"],
    answer: "des Kindes",
    points: 40,
    difficulty: "hard",
    explanation: "Genitive of neuter nouns: 'des' + noun + 's/es'."
  },
  {
    language: "German",
    category: "grammar",
    level: 3,
    order: 5,
    question: "Which relative pronoun is correct: 'The man who lives here'?",
    options: ["Der Mann, der hier wohnt", "Der Mann, den hier wohnt", "Der Mann, das hier wohnt", "Der Mann, die hier wohnt"],
    answer: "Der Mann, der hier wohnt",
    points: 40,
    difficulty: "hard",
    explanation: "Relative pronoun agrees with gender/case: masculine nominative = 'der'."
  },

  // GERMAN FILL THE BLANKS - LEVEL 1
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 1,
    question: "Ich ___ aus Deutschland. (I am from Germany)",
    options: ["bin", "bist", "ist", "sind"],
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
    question: "Das ist ___ Hund. (This is a dog)",
    options: ["ein", "eine", "der", "die"],
    answer: "ein",
    points: 20,
    difficulty: "easy",
    explanation: "'Hund' is masculine, so 'a dog' is 'ein Hund'."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 3,
    question: "Wie ___ Sie? (How are you?)",
    options: ["geht", "gehst", "gehen", "ging"],
    answer: "geht",
    points: 20,
    difficulty: "easy",
    explanation: "'Wie geht es Ihnen?' - formal 'how are you' uses 'geht'."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 4,
    question: "Ich trinke ___. (I drink water)",
    options: ["Wasser", "Wassers", "Wassern", "Wässer"],
    answer: "Wasser",
    points: 20,
    difficulty: "easy",
    explanation: "'Wasser' doesn't change form as a direct object."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 1,
    order: 5,
    question: "___ Auto ist rot. (The car is red)",
    options: ["Das", "Der", "Die", "Den"],
    answer: "Das",
    points: 20,
    difficulty: "easy",
    explanation: "'Auto' is neuter, so it takes 'das'."
  },

  // GERMAN FILL THE BLANKS - LEVEL 2
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 1,
    question: "Ich gebe ___ Mann das Buch. (I give the man the book)",
    options: ["der", "dem", "den", "des"],
    answer: "dem",
    points: 30,
    difficulty: "medium",
    explanation: "Dative case: 'geben' requires dative for indirect object."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 2,
    question: "Gestern ___ ich ins Kino gegangen. (Yesterday I went to cinema)",
    options: ["bin", "habe", "war", "hatte"],
    answer: "bin",
    points: 30,
    difficulty: "medium",
    explanation: "Perfect tense with 'gehen' uses 'sein': ich bin gegangen."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 3,
    question: "Das Buch liegt ___ dem Tisch. (The book lies on the table)",
    options: ["auf", "in", "an", "über"],
    answer: "auf",
    points: 30,
    difficulty: "medium",
    explanation: "'On the table' is 'auf dem Tisch' (dative for location)."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 4,
    question: "Wenn es regnet, ___ ich zu Hause. (When it rains, I stay home)",
    options: ["bleibe", "bleibst", "bleibt", "blieb"],
    answer: "bleibe",
    points: 30,
    difficulty: "medium",
    explanation: "Present tense: 'ich bleibe' (I stay)."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 2,
    order: 5,
    question: "Er ist ___ als ich. (He is taller than me)",
    options: ["groß", "größer", "größte", "am größten"],
    answer: "größer",
    points: 30,
    difficulty: "medium",
    explanation: "Comparative form: 'größer' (taller)."
  },

  // GERMAN FILL THE BLANKS - LEVEL 3
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 1,
    question: "Ich wünschte, ich ___ mehr Zeit hätte. (I wish I had more time)",
    options: ["habe", "hatte", "hätte", "haben"],
    answer: "hätte",
    points: 40,
    difficulty: "hard",
    explanation: "Subjunctive II: 'ich hätte' for hypothetical wishes."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 2,
    question: "Das Auto ___ von dem Mann repariert. (The car is being repaired by the man)",
    options: ["ist", "wird", "war", "wurde"],
    answer: "wird",
    points: 40,
    difficulty: "hard",
    explanation: "Present passive: 'wird' + past participle."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 3,
    question: "Er sagte, dass er morgen ___. (He said that he would come tomorrow)",
    options: ["kommt", "kommen", "käme", "gekommen"],
    answer: "käme",
    points: 40,
    difficulty: "hard",
    explanation: "Indirect speech uses Subjunctive I or II: 'käme'."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 4,
    question: "Trotz ___ Regens gingen wir spazieren. (Despite the rain, we went walking)",
    options: ["der", "dem", "des", "den"],
    answer: "des",
    points: 40,
    difficulty: "hard",
    explanation: "'Trotz' requires genitive case: 'des Regens'."
  },
  {
    language: "German",
    category: "filltheblanks",
    level: 3,
    order: 5,
    question: "Je mehr ich lerne, ___ besser verstehe ich es. (The more I learn, the better I understand it)",
    options: ["desto", "umso", "mehr", "sehr"],
    answer: "desto",
    points: 40,
    difficulty: "hard",
    explanation: "'Je ... desto' construction for 'the more ... the more'."
  },

  // GERMAN SENTENCES - LEVEL 1
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 1,
    question: "How do you say 'My name is Anna' in German?",
    options: [
      "Mein Name ist Anna",
      "Meine Name ist Anna", 
      "Mein Namen ist Anna",
      "Ich Name ist Anna"
    ],
    answer: "Mein Name ist Anna",
    points: 20,
    difficulty: "easy",
    explanation: "'Name' is masculine, so 'my name' is 'mein Name'."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 2,
    question: "Which sentence correctly means 'I live in Berlin'?",
    options: [
      "Ich wohne in Berlin",
      "Ich lebe auf Berlin",
      "Ich bin in Berlin wohnen",
      "Berlin ich wohne in"
    ],
    answer: "Ich wohne in Berlin",
    points: 20,
    difficulty: "easy",
    explanation: "'I live in' is 'ich wohne in' with cities."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 3,
    question: "How do you ask 'What time is it?' in German?",
    options: [
      "Wie spät ist es?",
      "Was Zeit ist es?",
      "Wann ist Zeit?",
      "Welche Uhr ist es?"
    ],
    answer: "Wie spät ist es?",
    points: 20,
    difficulty: "easy",
    explanation: "'What time is it?' is 'Wie spät ist es?' in German."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 4,
    question: "Which sentence means 'I don't understand'?",
    options: [
      "Ich verstehe nicht",
      "Ich nicht verstehe",
      "Nicht ich verstehe",
      "Verstehe ich nicht"
    ],
    answer: "Ich verstehe nicht",
    points: 20,
    difficulty: "easy",
    explanation: "Negation with 'nicht' goes after the verb: 'Ich verstehe nicht'."
  },
  {
    language: "German",
    category: "sentences",
    level: 1,
    order: 5,
    question: "How do you say 'Thank you very much' in German?",
    options: [
      "Vielen Dank",
      "Sehr Danke",
      "Viel Danke",
      "Danke sehr viel"
    ],
    answer: "Vielen Dank",
    points: 20,
    difficulty: "easy",
    explanation: "'Thank you very much' is 'Vielen Dank' in German."
  },

  // GERMAN SENTENCES - LEVEL 2
  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 1,
    question: "Which sentence correctly uses the perfect tense: 'I have eaten'?",
    options: [
      "Ich habe gegessen",
      "Ich bin gegessen",
      "Ich hatte gegessen",
      "Ich esse gehabt"
    ],
    answer: "Ich habe gegessen",
    points: 30,
    difficulty: "medium",
    explanation: "'Essen' uses 'haben' in perfect tense: 'ich habe gegessen'."
  },
  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 2,
    question: "Which sentence has correct word order: 'Tomorrow I will go shopping'?",
    options: [
      "Morgen werde ich einkaufen gehen",
      "Morgen ich werde einkaufen gehen",
      "Ich werde morgen einkaufen gehen",
      "Werde ich morgen einkaufen gehen"
    ],
    answer: "Morgen werde ich einkaufen gehen",
    points: 30,
    difficulty: "medium",
    explanation: "When sentence starts with time, verb comes second: 'Morgen werde ich...'."
  },
  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 3,
    question: "Which sentence correctly means 'I can speak German well'?",
    options: [
      "Ich kann gut Deutsch sprechen",
      "Ich spreche kann gut Deutsch",
      "Gut ich kann Deutsch sprechen",
      "Deutsch sprechen ich kann gut"
    ],
    answer: "Ich kann gut Deutsch sprechen",
    points: 30,
    difficulty: "medium",
    explanation: "Modal verb 'kann' in position 2, infinitive 'sprechen' at end."
  },
  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 4,
    question: "Which question correctly asks 'Where do you come from?'?",
    options: [
      "Woher kommen Sie?",
      "Wo kommen Sie?",
      "Wann kommen Sie?",
      "Wie kommen Sie?"
    ],
    answer: "Woher kommen Sie?",
    points: 30,
    difficulty: "medium",
    explanation: "'Where from' is 'woher', so 'Woher kommen Sie?'."
  },
  {
    language: "German",
    category: "sentences",
    level: 2,
    order: 5,
    question: "Which sentence correctly uses dative: 'I help my friend'?",
    options: [
      "Ich helfe meinem Freund",
      "Ich helfe meinen Freund",
      "Ich helfe mein Freund",
      "Ich helfe meine Freund"
    ],
    answer: "Ich helfe meinem Freund",
    points: 30,
    difficulty: "medium",
    explanation: "'Helfen' requires dative case: 'meinem Freund'."
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
    explanation: "'Cat' is 'Katze' in German (feminine: die Katze)."
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
    explanation: "'Apple' is 'Apfel' in German (masculine: der Apfel)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 3,
    question: "What is 'car' in German?",
    options: ["Bus", "Auto", "Zug", "Flugzeug"],
    answer: "Auto",
    points: 20,
    difficulty: "easy",
    explanation: "'Car' is 'Auto' in German (neuter: das Auto)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 4,
    question: "What is 'sun' in German?",
    options: ["Mond", "Stern", "Sonne", "Himmel"],
    answer: "Sonne",
    points: 20,
    difficulty: "easy",
    explanation: "'Sun' is 'Sonne' in German (feminine: die Sonne)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 1,
    order: 5,
    question: "What is 'bread' in German?",
    options: ["Brot", "Kuchen", "Käse", "Fleisch"],
    answer: "Brot",
    points: 20,
    difficulty: "easy",
    explanation: "'Bread' is 'Brot' in German (neuter: das Brot)."
  },

  // GERMAN IMAGE BASED - LEVEL 2
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
    explanation: "'Refrigerator' is 'Kühlschrank' in German."
  },
  {
    language: "German",
    category: "imagebased",
    level: 2,
    order: 2,
    question: "What is 'bicycle' in German?",
    options: ["Motorrad", "Fahrrad", "Roller", "Skateboard"],
    answer: "Fahrrad",
    points: 30,
    difficulty: "medium",
    explanation: "'Bicycle' is 'Fahrrad' in German (neuter: das Fahrrad)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 2,
    order: 3,
    question: "What is 'thunderstorm' in German?",
    options: ["Regen", "Schnee", "Gewitter", "Wind"],
    answer: "Gewitter",
    points: 30,
    difficulty: "medium",
    explanation: "'Thunderstorm' is 'Gewitter' in German (neuter: das Gewitter)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 2,
    order: 4,
    question: "What is 'hammer' in German?",
    options: ["Säge", "Hammer", "Schraubenzieher", "Zange"],
    answer: "Hammer",
    points: 30,
    difficulty: "medium",
    explanation: "'Hammer' is 'Hammer' in German (masculine: der Hammer)."
  },
  {
    language: "German",
    category: "imagebased",
    level: 2,
    order: 5,
    question: "What is 'flower' in German?",
    options: ["Baum", "Blume", "Gras", "Blatt"],
    answer: "Blume",
    points: 30,
    difficulty: "medium",
    explanation: "'Flower' is 'Blume' in German (feminine: die Blume)."
  }
];

// Database seeding function
async function seedAllExercises() {
  try {
    console.log('🌍 Starting complete multi-language database seeding...');
    
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

    console.log('\n🌍 COMPLETE DATABASE SUMMARY:');
    console.log('=====================================');
    
    Object.entries(languageStats).forEach(([language, stats]) => {
      const flag = language === 'English' ? '🇺🇸' : language === 'German' ? '🇩🇪' : '🌍';
      console.log(`\n${flag} ${language.toUpperCase()}: ${stats.totalExercises} exercises`);
      console.log('-------------------------------------');
      
      Object.entries(stats.categories).forEach(([category, categoryStats]) => {
        const levels = Array.from(categoryStats.levels).sort();
        console.log(`   📖 ${category}: ${categoryStats.totalExercises} exercises (Levels: ${levels.join(', ')})`);
      });
    });

    console.log('\n🎯 AVAILABLE LEARNING PATHS:');
    console.log('=====================================');
    console.log('🇺🇸 ENGLISH (English → Turkish):');
    console.log('   Level 1-3: vocabulary, grammar, filltheblanks');
    console.log('   Level 1-2: sentences, imagebased');
    console.log('');
    console.log('🇩🇪 GERMAN (German → English):');
    console.log('   Level 1-3: vocabulary, grammar, filltheblanks');
    console.log('   Level 1-2: sentences, imagebased');

    console.log('\n📊 TOTAL STATISTICS:');
    console.log('=====================================');
    const totalEnglish = languageStats.English?.totalExercises || 0;
    const totalGerman = languageStats.German?.totalExercises || 0;
    const grandTotal = totalEnglish + totalGerman;
    
    console.log(`   🇺🇸 English exercises: ${totalEnglish}`);
    console.log(`   🇩🇪 German exercises: ${totalGerman}`);
    console.log(`   🌍 Total exercises: ${grandTotal}`);
    console.log(`   📚 Languages supported: ${Object.keys(languageStats).length}`);
    console.log(`   📂 Categories per language: 5`);
    console.log(`   📈 Levels per category: 2-3`);

    console.log('\n🚀 USAGE INSTRUCTIONS:');
    console.log('=====================================');
    console.log('1. 🔧 Backend API: Use language parameter in routes');
    console.log('   GET /api/progress/English/vocabulary');
    console.log('   GET /api/progress/German/grammar');
    console.log('');
    console.log('2. 📱 Frontend: Set targetLang in LanguageContext');
    console.log('   targetLang = "English" → English exercises');
    console.log('   targetLang = "German" → German exercises');
    console.log('');
    console.log('3. 🎯 Testing: Try different language/category combinations');
    console.log('   English vocabulary Level 3: Advanced English words');
    console.log('   German grammar Level 2: Cases and verb conjugation');
    console.log('   German filltheblanks Level 1: Basic sentence completion');

    console.log('\n🌟 LANGUAGE-SPECIFIC FEATURES:');
    console.log('=====================================');
    console.log('🇺🇸 English Learning:');
    console.log('   • English → Turkish translations');
    console.log('   • Grammar: Articles, tenses, conditionals');
    console.log('   • Vocabulary: Basic → Advanced English words');
    console.log('   • Focus: General English proficiency');
    console.log('');
    console.log('🇩🇪 German Learning:');
    console.log('   • German → English translations');
    console.log('   • Grammar: der/die/das, 4 cases, verb conjugation');
    console.log('   • Vocabulary: Basic → Advanced German words');
    console.log('   • Focus: German-specific challenges (cases, word order)');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('🚀 Ready to use multi-language learning app!');

    // Verify data integrity
    const verification = await Exercise.aggregate([
      {
        $group: {
          _id: { language: '$language', category: '$category', level: '$level' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: { language: '$_id.language', category: '$_id.category' },
          levels: { $addToSet: '$_id.level' },
          totalExercises: { $sum: '$count' }
        }
      }
    ]);

    console.log('\n🔍 DATA VERIFICATION:');
    console.log('=====================================');
    verification.forEach(item => {
      const { language, category } = item._id;
      const levels = item.levels.sort();
      console.log(`   ✅ ${language}/${category}: ${item.totalExercises} exercises, Levels ${levels.join(',')}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    console.log('🎉 Multi-language seeding process completed!');
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