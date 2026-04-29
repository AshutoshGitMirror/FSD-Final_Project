
  // ═══════════════════════════════════════════════════════════
  // CLASS 5
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 5...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'The Fish Tale', description: 'Large numbers, place value, Indian numbering system' },
      { chapterName: 'Shapes and Angles', description: 'Types of angles — right, acute, obtuse; shapes' },
      { chapterName: 'How Many Squares?', description: 'Area — counting squares, sq cm, sq m' },
      { chapterName: 'Parts and Wholes', description: 'Fractions — equivalent, comparing, mixed numbers' },
      { chapterName: 'Does It Look the Same?', description: 'Symmetry — line of symmetry, mirror images' },
      { chapterName: 'Be My Multiple, I\'ll Be Your Factor', description: 'Multiples, factors, prime and composite' },
      { chapterName: 'Can You See the Pattern?', description: 'Number and shape patterns, rules of patterns' },
      { chapterName: 'Mapping Your Way', description: 'Maps, scale, directions, coordinates' },
      { chapterName: 'Boxes and Sketches', description: '3D shapes — cubes, cuboids, nets of shapes' },
      { chapterName: 'Tenths and Hundredths', description: 'Decimals — introduction, place value, money' },
      { chapterName: 'Area and Its Boundary', description: 'Area vs perimeter, composite shapes' },
      { chapterName: 'Smart Charts', description: 'Pie charts, bar graphs, data interpretation' },
      { chapterName: 'Ways to Multiply and Divide', description: 'Multi-digit multiplication and long division' },
      { chapterName: 'How Big? How Heavy?', description: 'Volume, weight, real-life measurement problems' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'Ice Cream Man', description: 'Poem — summer, ice cream vendor' },
      { chapterName: 'Wonderful Waste!', description: 'Story — recycling, composting, waste management' },
      { chapterName: 'Teamwork', description: 'Poem — cooperation, working together' },
      { chapterName: 'Flying Together', description: 'Story — birds, migration, unity' },
      { chapterName: 'My Shadow', description: 'Poem — Robert Louis Stevenson, observation' },
      { chapterName: 'Robinson Crusoe', description: 'Story — adventure, survival, resilience' },
      { chapterName: 'Crying', description: 'Poem — emotions, expression' },
      { chapterName: 'My Elder Brother', description: 'Story — Premchand, sibling relationships' },
      { chapterName: 'The Lazy Frog', description: 'Poem — humor, laziness' },
      { chapterName: 'Rip Van Winkle', description: 'Story — classic tale, passage of time' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'राख की रस्सी', description: 'कहानी — अकबर-बीरबल, बुद्धिमत्ता' },
      { chapterName: 'फ़सलों के त्योहार', description: 'लेख — भारत के त्योहार, खेती' },
      { chapterName: 'खिलौनेवाला', description: 'कविता — बचपन, खिलौने' },
      { chapterName: 'नन्हा फ़नकार', description: 'कहानी — कला, प्रतिभा' },
      { chapterName: 'जहाँ चाह वहाँ राह', description: 'कहानी — संकल्प, मेहनत' },
      { chapterName: 'चिट्ठी का सफ़र', description: 'लेख — डाक सेवा, संचार का इतिहास' },
      { chapterName: 'डाकिए की कहानी, कँवरसिंह की ज़ुबानी', description: 'साक्षात्कार — सेवा, समर्पण' },
      { chapterName: 'वे दिन भी क्या दिन थे', description: 'कहानी — विज्ञान कथा, भविष्य' },
      { chapterName: 'पानी रे पानी', description: 'लेख — जल संरक्षण, जल संकट' },
      { chapterName: 'बिशन की दिलेरी', description: 'कहानी — बहादुरी, साहस' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'Super Senses', description: 'Animal senses — sight, smell, hearing compared to humans' },
      { chapterName: 'A Snake Charmer\'s Story', description: 'Snakes, wildlife protection laws' },
      { chapterName: 'From Tasting to Digesting', description: 'Digestive system, taste buds, nutrition' },
      { chapterName: 'Mangoes Round the Year', description: 'Food preservation — drying, pickling, freezing' },
      { chapterName: 'Seeds and Seeds', description: 'Seed dispersal, germination, plant reproduction' },
      { chapterName: 'Every Drop Counts', description: 'Water scarcity, rainwater harvesting, conservation' },
      { chapterName: 'Experiments with Water', description: 'Solubility, filtration, sedimentation' },
      { chapterName: 'A Treat for Mosquitoes', description: 'Malaria, dengue, disease prevention' },
      { chapterName: 'Up You Go!', description: 'Mountains, altitude, life in hilly areas' },
      { chapterName: 'Walls Tell Stories', description: 'Historical monuments, architecture, heritage' },
      { chapterName: 'Sunita in Space', description: 'Sunita Williams, space exploration, gravity' },
      { chapterName: 'What If It Finishes?', description: 'Fossil fuels, renewable energy, conservation' },
      { chapterName: 'A Shelter So High!', description: 'Houses in different climates, building materials' },
      { chapterName: 'When the Earth Shook!', description: 'Earthquakes, disaster preparedness, safety' },
      { chapterName: 'Blow Hot, Blow Cold', description: 'Breathing, air, lungs, respiratory system basics' }
    ]
  });
