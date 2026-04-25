
  // ═══════════════════════════════════════════════════════════
  // CLASS 3
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 3...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Where to Look From', description: 'Perspective and viewpoints, top view, front view' },
      { chapterName: 'Fun with Numbers', description: 'Numbers up to 1000, comparison, ordering' },
      { chapterName: 'Give and Take', description: 'Addition and subtraction of 3-digit numbers' },
      { chapterName: 'Long and Short', description: 'Measuring length in cm and m, estimation' },
      { chapterName: 'Shapes and Designs', description: 'Tiling patterns, symmetry, rangoli' },
      { chapterName: 'Fun with Give and Take', description: 'Word problems on addition and subtraction' },
      { chapterName: 'Time Goes On', description: 'Reading clock — hours and minutes, calendar' },
      { chapterName: 'Who is Heavier?', description: 'Weighing in grams and kilograms' },
      { chapterName: 'How Many Times?', description: 'Introduction to multiplication — groups and repeated addition' },
      { chapterName: 'Play with Patterns', description: 'Number patterns, growing patterns, magic squares' },
      { chapterName: 'Jugs and Mugs', description: 'Measuring capacity in litres and millilitres' },
      { chapterName: 'Can We Share?', description: 'Introduction to division — equal sharing' },
      { chapterName: 'Smart Charts', description: 'Bar graphs, pictographs, data interpretation' },
      { chapterName: 'Rupees and Paise', description: 'Money — bills, making change, simple transactions' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Good Morning', description: 'Poem — greetings, nature in the morning' },
      { chapterName: 'The Magic Garden', description: 'Story — imagination, descriptive vocabulary' },
      { chapterName: 'Bird Talk', description: 'Poem — birds, sounds of nature' },
      { chapterName: 'Nina and the Baby Sparrows', description: 'Story — caring for animals, empathy' },
      { chapterName: 'The Little Fish', description: 'Poem — contentment, moral values' },
      { chapterName: 'The Enormous Turnip', description: 'Story — teamwork, cooperation' },
      { chapterName: 'Sea Song', description: 'Poem — ocean, marine life vocabulary' },
      { chapterName: 'A Little Turtle', description: 'Poem — animals, movement verbs' },
      { chapterName: 'The Balloon Man', description: 'Poem — colours, festival atmosphere' },
      { chapterName: 'The Story of the Road', description: 'Story — transportation, community helpers' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'कक्कू', description: 'कविता — पक्षी कोयल, ऋतु बसंत' },
      { chapterName: 'शेखीबाज़ मक्खी', description: 'कहानी — घमंड का परिणाम' },
      { chapterName: 'चाँद वाली अम्मा', description: 'कहानी — दादी माँ, पारिवारिक प्रेम' },
      { chapterName: 'मन करता है', description: 'कविता — बचपन की इच्छाएँ' },
      { chapterName: 'हमसे सब कहते', description: 'कहानी — बच्चों की जिज्ञासा' },
      { chapterName: 'सबसे अच्छा पेड़', description: 'कहानी — पेड़ों का महत्व, पर्यावरण' },
      { chapterName: 'टिपटिपवा', description: 'कविता — बारिश, मौसम' },
      { chapterName: 'बंदर बाँट', description: 'कहानी — न्याय, बँटवारा' },
      { chapterName: 'अक्ल बड़ी या भैंस', description: 'कहानी — बुद्धि का उपयोग' },
      { chapterName: 'क्योंजीमल और कैसे कैसलिया', description: 'कहानी — जिज्ञासा, प्रश्न पूछना' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Poonam\'s Day Out', description: 'Observing animals, their homes and habits' },
      { chapterName: 'The Plant Fairy', description: 'How plants grow, parts of plants' },
      { chapterName: 'Water O Water', description: 'Sources of water, conservation, water cycle' },
      { chapterName: 'Our First School', description: 'Family as first school, learning from elders' },
      { chapterName: 'Chhotu\'s House', description: 'Different types of houses, materials used' },
      { chapterName: 'Foods We Eat', description: 'Variety of food across India, cooking methods' },
      { chapterName: 'Saying Without Speaking', description: 'Animal communication, body language' },
      { chapterName: 'Flying High', description: 'Birds — types, features, nests, migration' },
      { chapterName: 'It\'s Raining', description: 'Rain, weather changes, daily life effects' },
      { chapterName: 'What is Cooking?', description: 'Fuels for cooking, kitchen safety, utensils' },
      { chapterName: 'From Here to There', description: 'Communication and transport — past and present' },
      { chapterName: 'Work We Do', description: 'Different occupations, respect for all work' }
    ]
  });
