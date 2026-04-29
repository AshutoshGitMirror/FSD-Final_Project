
  // ═══════════════════════════════════════════════════════════
  // CLASS 6
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 6...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Knowing Our Numbers', description: 'Comparing numbers, Indian and International place value, estimation' },
      { chapterName: 'Whole Numbers', description: 'Natural numbers, whole numbers, number line, properties' },
      { chapterName: 'Playing with Numbers', description: 'Factors, multiples, prime, composite, HCF, LCM' },
      { chapterName: 'Basic Geometrical Ideas', description: 'Points, lines, line segments, rays, curves, polygons' },
      { chapterName: 'Understanding Elementary Shapes', description: 'Angles, triangles, quadrilaterals, 3D shapes' },
      { chapterName: 'Integers', description: 'Negative numbers, number line, addition and subtraction of integers' },
      { chapterName: 'Fractions', description: 'Types of fractions, comparison, addition, subtraction' },
      { chapterName: 'Decimals', description: 'Place value, comparison, operations on decimals' },
      { chapterName: 'Data Handling', description: 'Pictograph, bar graph, mean, median, mode basics' },
      { chapterName: 'Mensuration', description: 'Perimeter and area of rectangles, squares, composite figures' },
      { chapterName: 'Algebra', description: 'Variables, expressions, equations — introduction' },
      { chapterName: 'Ratio and Proportion', description: 'Ratios, equivalent ratios, unitary method, proportion' },
      { chapterName: 'Symmetry', description: 'Lines of symmetry, reflectional symmetry' },
      { chapterName: 'Practical Geometry', description: 'Constructions using ruler and compass' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Food: Where Does It Come From?', description: 'Sources of food, food variety, herbivores, carnivores, omnivores' },
      { chapterName: 'Components of Food', description: 'Nutrients — carbohydrates, proteins, fats, vitamins, minerals' },
      { chapterName: 'Fibre to Fabric', description: 'Plant and animal fibres, spinning, weaving' },
      { chapterName: 'Sorting Materials into Groups', description: 'Properties of materials — transparency, solubility, appearance' },
      { chapterName: 'Separation of Substances', description: 'Handpicking, sieving, filtration, evaporation, sedimentation' },
      { chapterName: 'Changes Around Us', description: 'Reversible and irreversible changes' },
      { chapterName: 'Getting to Know Plants', description: 'Parts of plant, herbs, shrubs, trees, functions' },
      { chapterName: 'Body Movements', description: 'Human skeletal system, joints, movement in animals' },
      { chapterName: 'The Living Organisms and Their Surroundings', description: 'Habitat, adaptation, biotic and abiotic' },
      { chapterName: 'Motion and Measurement of Distances', description: 'Types of motion, standard units of measurement' },
      { chapterName: 'Light, Shadows and Reflections', description: 'Sources of light, shadows, transparent, translucent, opaque' },
      { chapterName: 'Electricity and Circuits', description: 'Electric cell, circuits, conductors, insulators' },
      { chapterName: 'Fun with Magnets', description: 'Properties of magnets, poles, magnetic and non-magnetic' },
      { chapterName: 'Water', description: 'Water cycle, states of water, conservation' },
      { chapterName: 'Air Around Us', description: 'Composition of air, properties, importance' },
      { chapterName: 'Garbage In, Garbage Out', description: 'Waste management, composting, vermicomposting, reduce-reuse-recycle' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'What, Where, How and When?', description: 'History — sources, timeline, archaeological evidence' },
      { chapterName: 'On the Trail of the Earliest People', description: 'Hunter-gatherers, stone tools, cave paintings' },
      { chapterName: 'From Gathering to Growing Food', description: 'Neolithic revolution, farming, domestication' },
      { chapterName: 'In the Earliest Cities', description: 'Harappan civilization, urban planning, trade' },
      { chapterName: 'Kingdoms, Kings and an Early Republic', description: 'Mahajanapadas, republics, Magadha' },
      { chapterName: 'The Earth in the Solar System', description: 'Geography — planets, sun, moon, stars' },
      { chapterName: 'Globe: Latitudes and Longitudes', description: 'Geographical grid, coordinates, time zones' },
      { chapterName: 'Motions of the Earth', description: 'Rotation, revolution, seasons, day and night' },
      { chapterName: 'Maps', description: 'Components of maps, scale, symbols, types' },
      { chapterName: 'Understanding Diversity', description: 'Civics — social, cultural, religious diversity in India' },
      { chapterName: 'Diversity and Discrimination', description: 'Prejudice, stereotypes, inequality, Constitution' },
      { chapterName: 'What is Government?', description: 'Levels of government, democracy, decision making' },
      { chapterName: 'Key Elements of a Democratic Government', description: 'Participation, accountability, justice, equality' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Who Did Patrick\'s Homework?', description: 'Story — a boy and an elf, responsibility' },
      { chapterName: 'How the Dog Found Himself a New Master', description: 'Story — a dog seeking the most powerful master' },
      { chapterName: 'Taro\'s Reward', description: 'Story — Japanese tale, filial duty, honesty' },
      { chapterName: 'An Indian — American Woman in Space: Kalpana Chawla', description: 'Biography — space, inspiration, perseverance' },
      { chapterName: 'A Different Kind of School', description: 'Story — empathy, understanding disabilities' },
      { chapterName: 'Who I Am', description: 'Self-descriptions — identity, aspirations, diversity' },
      { chapterName: 'Fair Play', description: 'Story — justice, cricket, sportsmanship' },
      { chapterName: 'A Game of Chance', description: 'Story — village fair, luck vs skill' },
      { chapterName: 'Desert Animals', description: 'Informational — camels, snakes, desert adaptations' },
      { chapterName: 'The Banyan Tree', description: 'Story — nature, animals, observation of a fight' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'वह चिड़िया जो', description: 'कविता — प्रकृति प्रेम, स्वतंत्रता' },
      { chapterName: 'बचपन', description: 'संस्मरण — बचपन की यादें' },
      { chapterName: 'नादान दोस्त', description: 'कहानी — पक्षी, करुणा' },
      { chapterName: 'चाँद से थोड़ी-सी गप्पें', description: 'कविता — चाँद, कल्पना' },
      { chapterName: 'अक्षरों का महत्व', description: 'निबंध — लिपि, भाषा का विकास' },
      { chapterName: 'पार नज़र के', description: 'कहानी — विज्ञान कथा' },
      { chapterName: 'साथी हाथ बढ़ाना', description: 'कविता — सहयोग, एकता' },
      { chapterName: 'ऐसे-ऐसे', description: 'एकांकी — हास्य, नाटक' },
      { chapterName: 'टिकट-अलबम', description: 'कहानी — शौक, दोस्ती' },
      { chapterName: 'झाँसी की रानी', description: 'कविता — वीरता, देशभक्ति' },
      { chapterName: 'जो देखकर भी नहीं देखते', description: 'निबंध — हेलेन केलर, अनुभूति' },
      { chapterName: 'संसार पुस्तक है', description: 'पत्र — जवाहरलाल नेहरू, ज्ञान' }
    ]
  });
