
  // ═══════════════════════════════════════════════════════════
  // CLASS 4
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 4...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Building with Bricks', description: 'Patterns using bricks, floor plans, area concepts' },
      { chapterName: 'Long and Short', description: 'Measuring length, converting km-m-cm' },
      { chapterName: 'A Trip to Bhopal', description: 'Reading maps, distance, fare charts' },
      { chapterName: 'Tick Tick Tick', description: 'Time — reading clocks, duration, timetables' },
      { chapterName: 'The Way the World Looks', description: 'Mapping, directions, bird\'s eye view' },
      { chapterName: 'The Junk Seller', description: 'Weight — kg and g, weighing balance' },
      { chapterName: 'Jugs and Mugs', description: 'Volume and capacity, litres and ml' },
      { chapterName: 'Carts and Wheels', description: 'Circles, radius, drawing circles' },
      { chapterName: 'Halves and Quarters', description: 'Fractions — half, quarter, three-fourths' },
      { chapterName: 'Play with Patterns', description: 'Number sequences, magic triangles, tessellations' },
      { chapterName: 'Tables and Shares', description: 'Multiplication tables up to 10, division' },
      { chapterName: 'How Heavy? How Light?', description: 'Estimation of weight, standard units' },
      { chapterName: 'Fields and Fences', description: 'Perimeter — calculating boundary lengths' },
      { chapterName: 'Smart Charts', description: 'Data handling using bar graphs and tables' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Wake Up!', description: 'Poem — morning, nature, seasons' },
      { chapterName: 'Neha\'s Alarm Clock', description: 'Story — responsibility, time management' },
      { chapterName: 'Noses', description: 'Poem — animals and their noses, comparisons' },
      { chapterName: 'The Little Fir Tree', description: 'Story — contentment, wishing for change' },
      { chapterName: 'Run!', description: 'Poem — exercise, outdoor activities' },
      { chapterName: 'Nasruddin\'s Aim', description: 'Story — humor, wit, Nasruddin tales' },
      { chapterName: 'Why?', description: 'Poem — curiosity, questioning nature' },
      { chapterName: 'Alice in Wonderland', description: 'Story — fantasy, imagination, adventure' },
      { chapterName: 'Don\'t Be Afraid of the Dark', description: 'Poem — courage, overcoming fear' },
      { chapterName: 'Helen Keller', description: 'Biography — determination, overcoming disability' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'मन के भोले-भाले बादल', description: 'कविता — बादल, कल्पना' },
      { chapterName: 'जैसा सवाल वैसा जवाब', description: 'कहानी — चतुराई, बुद्धिमत्ता' },
      { chapterName: 'किरमिच की गेंद', description: 'कहानी — खेल, दोस्ती' },
      { chapterName: 'पापा जब बच्चे थे', description: 'कहानी — बचपन की यादें' },
      { chapterName: 'दोस्त की पोशाक', description: 'कहानी — बाहरी दिखावा vs असली गुण' },
      { chapterName: 'नाव बनाओ नाव बनाओ', description: 'कविता — बारिश, कागज़ की नाव' },
      { chapterName: 'दान का हिसाब', description: 'कहानी — ईमानदारी, गणित' },
      { chapterName: 'ऐसे-ऐसे', description: 'कहानी — हास्य, बीमारी का बहाना' },
      { chapterName: 'स्वतंत्रता की ओर', description: 'कहानी — देशभक्ति' },
      { chapterName: 'थप्प रोटी थप्प दाल', description: 'कविता — भोजन, खेल' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Going to School', description: 'Different ways children reach school across India' },
      { chapterName: 'Ear to Ear', description: 'Hearing, sound, caring for ears' },
      { chapterName: 'A Day with Nandu', description: 'Elephants — habitat, family, conservation' },
      { chapterName: 'The Story of Amrita', description: 'Trees, Bishnoi community, environmental protection' },
      { chapterName: 'Anita and the Honeybees', description: 'Bees, honey making, pollination' },
      { chapterName: 'Omana\'s Journey', description: 'Kerala backwaters, water transport' },
      { chapterName: 'From the Window', description: 'Observing from a train, landscapes' },
      { chapterName: 'Reaching Grandmother\'s House', description: 'Different terrains, travel' },
      { chapterName: 'Changing Families', description: 'Family structures, joint and nuclear families' },
      { chapterName: 'The World in My Home', description: 'Diversity, religions, languages' },
      { chapterName: 'The Valley of Flowers', description: 'Mountains, flora, national parks' },
      { chapterName: 'Changing Times', description: 'How things have changed — then and now' }
    ]
  });
