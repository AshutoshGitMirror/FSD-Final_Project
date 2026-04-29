
  // ═══════════════════════════════════════════════════════════
  // CLASS 7
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 7...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Integers', description: 'Properties of integers, multiplication and division of integers' },
      { chapterName: 'Fractions and Decimals', description: 'Multiplication and division of fractions and decimals' },
      { chapterName: 'Data Handling', description: 'Mean, median, mode, bar graphs, probability introduction' },
      { chapterName: 'Simple Equations', description: 'Solving linear equations in one variable' },
      { chapterName: 'Lines and Angles', description: 'Pairs of angles, parallel lines with transversal' },
      { chapterName: 'The Triangle and its Properties', description: 'Medians, altitudes, angle sum, Pythagoras intro' },
      { chapterName: 'Congruence of Triangles', description: 'SSS, SAS, ASA, RHS congruence criteria' },
      { chapterName: 'Comparing Quantities', description: 'Ratio, percentage, profit-loss, simple interest' },
      { chapterName: 'Rational Numbers', description: 'Positive and negative rationals, number line, operations' },
      { chapterName: 'Practical Geometry', description: 'Constructing triangles given SSS, SAS, ASA, RHS' },
      { chapterName: 'Perimeter and Area', description: 'Area of parallelograms, triangles, circles' },
      { chapterName: 'Algebraic Expressions', description: 'Terms, coefficients, like terms, addition and subtraction' },
      { chapterName: 'Exponents and Powers', description: 'Laws of exponents, expressing large numbers' },
      { chapterName: 'Symmetry', description: 'Lines of symmetry, rotational symmetry' },
      { chapterName: 'Visualising Solid Shapes', description: '3D shapes, faces, edges, vertices, nets' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Nutrition in Plants', description: 'Photosynthesis, parasitic and insectivorous plants' },
      { chapterName: 'Nutrition in Animals', description: 'Digestive system, digestion in ruminants, amoeba' },
      { chapterName: 'Fibre to Fabric', description: 'Animal fibres — wool, silk, sericulture' },
      { chapterName: 'Heat', description: 'Conduction, convection, radiation, thermometer' },
      { chapterName: 'Acids, Bases and Salts', description: 'Indicators, neutralization, everyday uses' },
      { chapterName: 'Physical and Chemical Changes', description: 'Types of changes, rusting, crystallization' },
      { chapterName: 'Weather, Climate and Adaptations', description: 'Weather elements, climate zones, animal adaptations' },
      { chapterName: 'Winds, Storms and Cyclones', description: 'Air pressure, wind currents, cyclone structure, safety' },
      { chapterName: 'Soil', description: 'Soil profile, types of soil, soil erosion, conservation' },
      { chapterName: 'Respiration in Organisms', description: 'Aerobic, anaerobic, breathing in different organisms' },
      { chapterName: 'Transportation in Animals and Plants', description: 'Circulatory system, blood, xylem, phloem' },
      { chapterName: 'Reproduction in Plants', description: 'Vegetative, asexual, sexual reproduction, pollination' },
      { chapterName: 'Motion and Time', description: 'Speed, distance-time graphs, oscillatory motion' },
      { chapterName: 'Electric Current and Its Effects', description: 'Heating effect, magnetic effect, electromagnets, fuses' },
      { chapterName: 'Light', description: 'Reflection, plane mirrors, concave/convex, sunlight spectrum' },
      { chapterName: 'Water: A Precious Resource', description: 'Water table, depletion, conservation strategies' },
      { chapterName: 'Forests: Our Lifeline', description: 'Forest ecosystem, food chains, deforestation' },
      { chapterName: 'Wastewater Story', description: 'Water treatment, sewage, sanitation' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Tracing Changes through a Thousand Years', description: 'History — medieval India, sources, periodization' },
      { chapterName: 'New Kings and Kingdoms', description: 'Rajputs, Cholas, administration, temples' },
      { chapterName: 'The Delhi Sultans', description: 'Delhi Sultanate, administration, architecture' },
      { chapterName: 'The Mughal Empire', description: 'Mughal rulers, administration, culture, decline' },
      { chapterName: 'Rulers and Buildings', description: 'Temple architecture, mosques, forts, gardens' },
      { chapterName: 'Environment', description: 'Geography — ecosystem, environment, human interaction' },
      { chapterName: 'Inside Our Earth', description: 'Interior of Earth, rocks, minerals' },
      { chapterName: 'Our Changing Earth', description: 'Lithospheric plates, earthquakes, volcanoes, weathering' },
      { chapterName: 'Air', description: 'Atmosphere layers, composition, weather and climate' },
      { chapterName: 'Water', description: 'Water cycle, ocean movements, tides, currents' },
      { chapterName: 'Equality in Indian Democracy', description: 'Civics — right to equality, discrimination' },
      { chapterName: 'Role of the Government in Health', description: 'Public health, healthcare, right to health' },
      { chapterName: 'How the State Government Works', description: 'Legislature, executive, MLAs, Chief Minister' },
      { chapterName: 'Growing Up as Boys and Girls', description: 'Gender roles, inequality, stereotypes' },
      { chapterName: 'Markets Around Us', description: 'Weekly markets, shops, malls, chain of markets' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Three Questions', description: 'Story — Leo Tolstoy, wisdom, present moment' },
      { chapterName: 'A Gift of Chappals', description: 'Story — kindness, children sharing with a music teacher' },
      { chapterName: 'Gopal and the Hilsa Fish', description: 'Story — wit, humor, problem solving' },
      { chapterName: 'The Ashes That Made Trees Bloom', description: 'Story — Japanese tale, kindness rewarded' },
      { chapterName: 'Quality', description: 'Story — John Galsworthy, craftsmanship, dedication' },
      { chapterName: 'Expert Detectives', description: 'Story — observation skills, mystery' },
      { chapterName: 'The Invention of Vita-Wonk', description: 'Story — Roald Dahl, imagination, invention' },
      { chapterName: 'Fire: Friend and Foe', description: 'Informational — fire safety, uses, dangers' },
      { chapterName: 'A Bicycle in Good Repair', description: 'Story — humor, cycling adventure' },
      { chapterName: 'The Story of Cricket', description: 'Informational — history and evolution of cricket' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'हम पंछी उन्मुक्त गगन के', description: 'कविता — स्वतंत्रता, पक्षी' },
      { chapterName: 'दादी माँ', description: 'कहानी — दादी का प्रेम, पारिवारिक मूल्य' },
      { chapterName: 'हिमालय की बेटियाँ', description: 'निबंध — नदियाँ, हिमालय' },
      { chapterName: 'कठपुतली', description: 'कविता — स्वतंत्रता, बंधन' },
      { chapterName: 'मिठाईवाला', description: 'कहानी — त्याग, बच्चों से प्रेम' },
      { chapterName: 'रक्त और हमारा शरीर', description: 'लेख — रक्त, स्वास्थ्य' },
      { chapterName: 'पापा खो गए', description: 'नाटक — बाल श्रम, सामाजिक चिंता' },
      { chapterName: 'शाम – एक किसान', description: 'कविता — प्रकृति, किसान' },
      { chapterName: 'चिड़िया की बच्ची', description: 'कहानी — स्वतंत्रता, करुणा' },
      { chapterName: 'अपूर्व अनुभव', description: 'कहानी — साइकिल चलाना, आत्मविश्वास' }
    ]
  });
