
  // ═══════════════════════════════════════════════════════════
  // CLASS 8
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 8...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'Rational Numbers', description: 'Properties of rational numbers, representation on number line' },
      { chapterName: 'Linear Equations in One Variable', description: 'Solving equations with variable on both sides' },
      { chapterName: 'Understanding Quadrilaterals', description: 'Types of quadrilaterals, angle sum property' },
      { chapterName: 'Practical Geometry', description: 'Constructing quadrilaterals with given measurements' },
      { chapterName: 'Data Handling', description: 'Organising data, pie charts, probability' },
      { chapterName: 'Squares and Square Roots', description: 'Perfect squares, patterns, finding square roots' },
      { chapterName: 'Cubes and Cube Roots', description: 'Perfect cubes, prime factorization method' },
      { chapterName: 'Comparing Quantities', description: 'Ratios, percentages, compound interest, discount, tax' },
      { chapterName: 'Algebraic Expressions and Identities', description: 'Multiplication, standard identities, factorization' },
      { chapterName: 'Visualising Solid Shapes', description: 'Views of 3D shapes, Euler\'s formula, mapping' },
      { chapterName: 'Mensuration', description: 'Area of trapezium, polygon; surface area and volume of cube, cuboid, cylinder' },
      { chapterName: 'Exponents and Powers', description: 'Negative exponents, standard form, laws' },
      { chapterName: 'Direct and Inverse Proportions', description: 'Direct proportion, inverse proportion, applications' },
      { chapterName: 'Factorisation', description: 'Common factors, regrouping, division of polynomials' },
      { chapterName: 'Introduction to Graphs', description: 'Linear graphs, reading graphs, plotting points' },
      { chapterName: 'Playing with Numbers', description: 'Divisibility rules, puzzles with numbers' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'Crop Production and Management', description: 'Agricultural practices, irrigation, harvesting, storage' },
      { chapterName: 'Microorganisms: Friend and Foe', description: 'Bacteria, virus, fungi, antibiotics, vaccines' },
      { chapterName: 'Synthetic Fibres and Plastics', description: 'Types of synthetic fibres, plastics, 4R principle' },
      { chapterName: 'Materials: Metals and Non-Metals', description: 'Physical and chemical properties, reactivity, uses' },
      { chapterName: 'Coal and Petroleum', description: 'Fossil fuels, formation, exhaustible resources' },
      { chapterName: 'Combustion and Flame', description: 'Ignition temperature, types of combustion, flame zones' },
      { chapterName: 'Conservation of Plants and Animals', description: 'Deforestation, biodiversity, endangered species, biosphere reserves' },
      { chapterName: 'Cell — Structure and Functions', description: 'Cell theory, organelles, plant vs animal cell' },
      { chapterName: 'Reproduction in Animals', description: 'Sexual and asexual reproduction, fertilization, embryo' },
      { chapterName: 'Reaching the Age of Adolescence', description: 'Puberty, hormones, reproductive health' },
      { chapterName: 'Force and Pressure', description: 'Contact and non-contact forces, pressure, atmospheric pressure' },
      { chapterName: 'Friction', description: 'Types of friction, factors affecting friction, reducing friction' },
      { chapterName: 'Sound', description: 'Vibration, frequency, amplitude, human ear, noise pollution' },
      { chapterName: 'Chemical Effects of Electric Current', description: 'Conductors, electroplating, LED' },
      { chapterName: 'Some Natural Phenomena', description: 'Lightning, earthquakes, electroscope, earthing' },
      { chapterName: 'Light', description: 'Laws of reflection, regular and diffuse reflection, human eye, Braille' },
      { chapterName: 'Stars and the Solar System', description: 'Celestial objects, constellations, planets, moon' },
      { chapterName: 'Pollution of Air and Water', description: 'Air and water pollutants, effects, purification' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'How, When and Where', description: 'History — importance of dates, surveys, official records' },
      { chapterName: 'From Trade to Territory', description: 'East India Company, establishment of British rule' },
      { chapterName: 'Ruling the Countryside', description: 'Permanent Settlement, Mahalwari, Ryotwari systems' },
      { chapterName: 'Tribals, Dikus and the Vision of a Golden Age', description: 'Tribal revolts, Birsa Munda' },
      { chapterName: 'When People Rebel — 1857 and After', description: 'Revolt of 1857, causes, consequences' },
      { chapterName: 'Resources', description: 'Geography — types of resources, conservation, sustainable development' },
      { chapterName: 'Land, Soil, Water, Natural Vegetation and Wildlife', description: 'Land use, soil types, water resources' },
      { chapterName: 'Mineral and Power Resources', description: 'Types of minerals, conventional and non-conventional energy' },
      { chapterName: 'Agriculture', description: 'Types of farming, major crops, agricultural development' },
      { chapterName: 'Industries', description: 'Classification, iron and steel, textile, IT industry' },
      { chapterName: 'The Indian Constitution', description: 'Civics — Preamble, fundamental rights, directive principles' },
      { chapterName: 'Understanding Secularism', description: 'Secularism in Indian context, separation of religion and state' },
      { chapterName: 'Parliament and the Making of Laws', description: 'Lok Sabha, Rajya Sabha, law-making process' },
      { chapterName: 'The Judiciary', description: 'Courts structure, independence, judicial review, PIL' },
      { chapterName: 'Understanding Marginalisation', description: 'Adivasis, minorities, social justice' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'The Best Christmas Present in the World', description: 'Story — WWI, letters, peace, humanity' },
      { chapterName: 'The Tsunami', description: 'Real accounts — natural disaster, survival, bravery' },
      { chapterName: 'Glimpses of the Past', description: 'Comic format — Indian independence movement' },
      { chapterName: 'Bepin Choudhury\'s Lapse of Memory', description: 'Story — Satyajit Ray, humor, memory' },
      { chapterName: 'The Summit Within', description: 'Essay — Everest climb, inner and outer summit' },
      { chapterName: 'This is Jody\'s Fawn', description: 'Story — The Yearling, caring for animals' },
      { chapterName: 'A Visit to Cambridge', description: 'Interview — Stephen Hawking, disability, achievement' },
      { chapterName: 'A Short Monsoon Diary', description: 'Diary entries — Ruskin Bond, monsoon in Mussoorie' },
      { chapterName: 'The Great Stone Face I', description: 'Story — Nathaniel Hawthorne, character, goodness' },
      { chapterName: 'The Great Stone Face II', description: 'Story — continuation, true greatness' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'ध्वनि', description: 'कविता — सूर्योदय, नई शुरुआत' },
      { chapterName: 'लाख की चूड़ियाँ', description: 'कहानी — ग्रामीण कला, आजीविका' },
      { chapterName: 'बस की यात्रा', description: 'व्यंग्य — खराब सड़कें, परिवहन' },
      { chapterName: 'दीवानों की हस्ती', description: 'कविता — फकीरी, जीवन दर्शन' },
      { chapterName: 'चिट्ठियों की अनूठी दुनिया', description: 'निबंध — पत्र लेखन, संचार' },
      { chapterName: 'भगवान के डाकिए', description: 'कविता — प्रकृति, संदेशवाहक' },
      { chapterName: 'क्या निराश हुआ जाए', description: 'निबंध — आशावाद, मानवता' },
      { chapterName: 'यह सबसे कठिन समय नहीं', description: 'कविता — उम्मीद, हिम्मत' },
      { chapterName: 'कबीर की साखियाँ', description: 'दोहे — कबीर, जीवन ज्ञान' },
      { chapterName: 'कामचोर', description: 'कहानी — हास्य, आलस्य' },
      { chapterName: 'जब सिनेमा ने बोलना सीखा', description: 'लेख — भारतीय सिनेमा का इतिहास' },
      { chapterName: 'सुदामा चरित', description: 'कविता — कृष्ण-सुदामा, मित्रता' }
    ]
  });
