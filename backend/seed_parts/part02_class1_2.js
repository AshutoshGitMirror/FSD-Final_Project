
  // ═══════════════════════════════════════════════════════════
  // CLASS 1
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 1...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'Shapes and Space', description: 'Identifying basic shapes — circles, squares, triangles, rectangles in surroundings' },
      { chapterName: 'Numbers from One to Nine', description: 'Counting, reading and writing numbers 1-9' },
      { chapterName: 'Addition', description: 'Adding single-digit numbers using objects and pictures' },
      { chapterName: 'Subtraction', description: 'Taking away — understanding subtraction with visuals' },
      { chapterName: 'Numbers from Ten to Twenty', description: 'Place value introduction, teen numbers' },
      { chapterName: 'Time', description: 'Understanding earlier, later, morning, evening concepts' },
      { chapterName: 'Measurement', description: 'Comparing lengths, weights — longer, shorter, heavier, lighter' },
      { chapterName: 'Numbers from Twenty-one to Fifty', description: 'Reading, writing and ordering numbers to 50' },
      { chapterName: 'Data Handling', description: 'Collecting and recording simple data using pictures' },
      { chapterName: 'Patterns', description: 'Recognizing and extending simple patterns' },
      { chapterName: 'Numbers', description: 'Numbers up to 100, skip counting by 2s, 5s, 10s' },
      { chapterName: 'Money', description: 'Identifying coins and notes, simple transactions' },
      { chapterName: 'How Many', description: 'Counting in groups, estimation' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'A Happy Child', description: 'Poem — rhyming words, basic vocabulary' },
      { chapterName: 'Three Little Kittens', description: 'Story — reading comprehension, animal vocabulary' },
      { chapterName: 'After a Bath', description: 'Poem — daily routine vocabulary, action words' },
      { chapterName: 'The Bubble, the Straw and the Shoe', description: 'Story — friendship, cooperation' },
      { chapterName: 'One Little Kitten', description: 'Poem — counting, animal names' },
      { chapterName: 'Lalu and Peelu', description: 'Story — colours, descriptions' },
      { chapterName: 'Once I Saw a Little Bird', description: 'Poem — nature, observation' },
      { chapterName: 'Mittu and the Yellow Mango', description: 'Story — fruits, sharing' },
      { chapterName: 'Merry-Go-Round', description: 'Poem — playground, fun activities' },
      { chapterName: 'Circle', description: 'Story — shapes in everyday life' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'झूला', description: 'कविता — खेल और प्रकृति' },
      { chapterName: 'आम की कहानी', description: 'कहानी — फलों के नाम, ऋतुएँ' },
      { chapterName: 'आम की टोकरी', description: 'कविता — गिनती, फल' },
      { chapterName: 'पत्ते ही पत्ते', description: 'कहानी — पेड़-पौधे, पत्तों की विविधता' },
      { chapterName: 'पकौड़ी', description: 'कविता — भोजन, स्वाद' },
      { chapterName: 'छोटी का कमाल', description: 'कहानी — बहादुरी, आत्मविश्वास' },
      { chapterName: 'रसोईघर', description: 'कविता — रसोई की वस्तुएँ' },
      { chapterName: 'चूहो! म्याऊँ सो रही है', description: 'कहानी — जानवर, चतुराई' },
      { chapterName: 'बंदर और गिलहरी', description: 'कविता — जानवर, दोस्ती' },
      { chapterName: 'पगड़ी', description: 'कहानी — पहनावा, परंपरा' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'My Family', description: 'Family members, relationships, living together' },
      { chapterName: 'My Body', description: 'Body parts, senses, personal hygiene' },
      { chapterName: 'Food We Eat', description: 'Types of food, healthy eating habits' },
      { chapterName: 'Our Clothes', description: 'Types of clothes, weather-appropriate dressing' },
      { chapterName: 'Our House', description: 'Types of houses, rooms, keeping house clean' },
      { chapterName: 'Plants Around Us', description: 'Parts of a plant, types of plants' },
      { chapterName: 'Animals Around Us', description: 'Domestic and wild animals, pet care' },
      { chapterName: 'Water', description: 'Uses of water, sources, conservation' },
      { chapterName: 'Weather and Seasons', description: 'Rainy, summer, winter — changes in nature' },
      { chapterName: 'Transport', description: 'Modes of transport, road safety basics' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 2
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 2...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'What is Long, What is Round?', description: 'Shapes and their properties, 3D shapes introduction' },
      { chapterName: 'Counting in Groups', description: 'Skip counting, grouping objects in 2s, 5s, 10s' },
      { chapterName: 'How Much Can You Carry?', description: 'Weight comparison — heavier, lighter, balancing' },
      { chapterName: 'Counting in Tens', description: 'Place value — tens and ones, numbers up to 100' },
      { chapterName: 'Patterns', description: 'Growing patterns, number patterns, tiling' },
      { chapterName: 'Footprints', description: 'Measurement using non-standard units — foot lengths, handspans' },
      { chapterName: 'Jugs and Mugs', description: 'Capacity — comparing volumes, full, half, empty' },
      { chapterName: 'Tens and Ones', description: 'Two-digit numbers, expanded form' },
      { chapterName: 'My Funday', description: 'Reading a calendar, days of the week, dates' },
      { chapterName: 'Add Our Points', description: 'Addition of two-digit numbers with and without carry' },
      { chapterName: 'Lines and Lines', description: 'Straight lines, curved lines, standing and sleeping lines' },
      { chapterName: 'Give and Take', description: 'Subtraction of two-digit numbers, word problems' },
      { chapterName: 'The Longest Step', description: 'Measuring length — estimation and comparison' },
      { chapterName: 'Birds Come, Birds Go', description: 'Data collection using tally marks, pictographs' },
      { chapterName: 'How Many Ponytails?', description: 'Data handling, counting and comparing' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'First Day at School', description: 'Poem — school life, feelings, rhyming' },
      { chapterName: 'Haldi\'s Adventure', description: 'Story — animal adventure, comprehension' },
      { chapterName: 'I am Lucky!', description: 'Poem — gratitude, self-awareness' },
      { chapterName: 'I Want', description: 'Story — wishes, imagination, descriptive writing' },
      { chapterName: 'A Smile', description: 'Poem — kindness, happiness' },
      { chapterName: 'The Wind and the Sun', description: 'Story — Aesop\'s fable, persuasion vs force' },
      { chapterName: 'Rain', description: 'Poem — weather, nature vocabulary' },
      { chapterName: 'Zoo Manners', description: 'Story — animals, proper behavior' },
      { chapterName: 'Greetings', description: 'Poem — social skills, politeness' },
      { chapterName: 'The Grasshopper and the Ant', description: 'Story — hard work, planning ahead' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'ऊँट चला', description: 'कविता — जानवर, हास्य' },
      { chapterName: 'भालू ने खेली फुटबॉल', description: 'कहानी — खेल, जानवर' },
      { chapterName: 'म्याऊँ, म्याऊँ!!', description: 'कविता — बिल्ली, ध्वनि' },
      { chapterName: 'अधिक बलवान कौन?', description: 'कहानी — प्रकृति की शक्तियाँ' },
      { chapterName: 'दोस्त की मदद', description: 'कहानी — मित्रता, सहयोग' },
      { chapterName: 'बहुत हुआ', description: 'कविता — पर्यावरण, जागरूकता' },
      { chapterName: 'मेरी किताब', description: 'कविता — पढ़ाई का महत्व' },
      { chapterName: 'तितली और कली', description: 'कविता — प्रकृति, सुंदरता' },
      { chapterName: 'बुलबुल', description: 'कहानी — पक्षी, स्वतंत्रता' },
      { chapterName: 'मीठी सारंगी', description: 'कहानी — संगीत, कला' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'My Neighbourhood', description: 'People around us, helpers in the community' },
      { chapterName: 'Our School', description: 'School environment, classrooms, playground' },
      { chapterName: 'Good Habits', description: 'Cleanliness, manners, daily routine' },
      { chapterName: 'Air and Water', description: 'Importance of clean air and water, pollution basics' },
      { chapterName: 'Our Earth', description: 'Land forms, water bodies on Earth' },
      { chapterName: 'Food and Health', description: 'Balanced diet, junk food vs healthy food' },
      { chapterName: 'Safety Rules', description: 'Road safety, fire safety, stranger danger' },
      { chapterName: 'National Symbols', description: 'Flag, emblem, anthem, national animal and bird' },
      { chapterName: 'Festivals of India', description: 'Major festivals, unity in diversity' },
      { chapterName: 'The World of Animals', description: 'Habitats, food habits, baby animals' }
    ]
  });

