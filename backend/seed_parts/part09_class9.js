
  // ═══════════════════════════════════════════════════════════
  // CLASS 9
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 9...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'Number Systems', description: 'Rational and irrational numbers, real numbers, decimal expansions, number line' },
      { chapterName: 'Polynomials', description: 'Polynomials in one variable, zeroes, remainder and factor theorems' },
      { chapterName: 'Coordinate Geometry', description: 'Cartesian plane, plotting points, quadrants' },
      { chapterName: 'Linear Equations in Two Variables', description: 'Equations, solutions, graph of linear equation' },
      { chapterName: 'Introduction to Euclid\'s Geometry', description: 'Axioms, postulates, Euclid\'s five postulates' },
      { chapterName: 'Lines and Angles', description: 'Types of angles, parallel lines and transversal, angle sum' },
      { chapterName: 'Triangles', description: 'Congruence, inequalities in triangles, SAS, ASA, SSS, RHS' },
      { chapterName: 'Quadrilaterals', description: 'Properties, mid-point theorem, parallelogram theorems' },
      { chapterName: 'Circles', description: 'Chords, arcs, angles subtended, cyclic quadrilaterals' },
      { chapterName: 'Heron\'s Formula', description: 'Area of triangle using sides, application to quadrilaterals' },
      { chapterName: 'Surface Areas and Volumes', description: 'Cube, cuboid, cylinder, cone, sphere — SA and volume' },
      { chapterName: 'Statistics', description: 'Data collection, frequency distribution, mean, median, mode, bar/histogram' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'Matter in Our Surroundings', description: 'States of matter, change of state, evaporation' },
      { chapterName: 'Is Matter Around Us Pure', description: 'Mixtures, solutions, suspensions, colloids, separation techniques' },
      { chapterName: 'Atoms and Molecules', description: 'Laws of chemical combination, Dalton\'s theory, molecular and formula mass' },
      { chapterName: 'Structure of the Atom', description: 'Electrons, protons, neutrons, Thomson, Rutherford, Bohr models' },
      { chapterName: 'The Fundamental Unit of Life', description: 'Cell structure, organelles, prokaryotic vs eukaryotic' },
      { chapterName: 'Tissues', description: 'Plant and animal tissues — meristematic, permanent, epithelial, connective' },
      { chapterName: 'Diversity in Living Organisms', description: 'Classification, five kingdoms, nomenclature, hierarchy' },
      { chapterName: 'Motion', description: 'Distance, displacement, speed, velocity, acceleration, equations of motion, graphs' },
      { chapterName: 'Force and Laws of Motion', description: 'Newton\'s three laws, inertia, momentum, conservation' },
      { chapterName: 'Gravitation', description: 'Universal law of gravitation, free fall, weight vs mass, Kepler\'s laws' },
      { chapterName: 'Work and Energy', description: 'Work, kinetic energy, potential energy, conservation of energy, power' },
      { chapterName: 'Sound', description: 'Production, propagation, reflection, echo, human ear, ultrasound, sonar' },
      { chapterName: 'Why Do We Fall Ill', description: 'Health, disease, infectious agents, prevention, immunization' },
      { chapterName: 'Natural Resources', description: 'Air, water, soil — biogeochemical cycles, pollution' },
      { chapterName: 'Improvement in Food Resources', description: 'Crop and animal husbandry, green revolution, organic farming' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'The French Revolution', description: 'History — causes, events, impact, Napoleon' },
      { chapterName: 'Socialism in Europe and the Russian Revolution', description: 'Socialism vs capitalism, Bolsheviks, Lenin' },
      { chapterName: 'Nazism and the Rise of Hitler', description: 'Weimar Republic, Hitler, Holocaust, WWII causes' },
      { chapterName: 'Forest Society and Colonialism', description: 'Colonial forest policies, deforestation, resistance' },
      { chapterName: 'Pastoralists in the Modern World', description: 'Nomadic communities, colonial impact, modern pastoralism' },
      { chapterName: 'India — Size and Location', description: 'Geography — India\'s position, neighbours, extent' },
      { chapterName: 'Physical Features of India', description: 'Mountains, plains, plateaus, deserts, coastal plains' },
      { chapterName: 'Drainage', description: 'River systems — Himalayan and Peninsular, lakes' },
      { chapterName: 'Climate', description: 'Monsoon mechanism, seasons, climate controls' },
      { chapterName: 'Natural Vegetation and Wildlife', description: 'Vegetation types, wildlife, conservation' },
      { chapterName: 'Population', description: 'Size, distribution, growth, composition, migration' },
      { chapterName: 'What is Democracy? Why Democracy?', description: 'Civics — features of democracy, merits and demerits' },
      { chapterName: 'Constitutional Design', description: 'Making of Indian Constitution, Preamble, guiding values' },
      { chapterName: 'Electoral Politics', description: 'Elections, political competition, challenges' },
      { chapterName: 'Working of Institutions', description: 'Parliament, Executive, Judiciary — roles and functions' },
      { chapterName: 'Democratic Rights', description: 'Fundamental rights, expanding scope, right to constitutional remedies' },
      { chapterName: 'The Story of Village Palampur', description: 'Economics — factors of production, farming, non-farm activities' },
      { chapterName: 'People as Resource', description: 'Human capital, education, health, employment' },
      { chapterName: 'Poverty as a Challenge', description: 'Poverty measurement, causes, anti-poverty measures' },
      { chapterName: 'Food Security in India', description: 'PDS, buffer stock, food insecurity, government programs' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'The Fun They Had', description: 'Story — Isaac Asimov, future of education, technology' },
      { chapterName: 'The Sound of Music', description: 'Biographies — Evelyn Glennie and Bismillah Khan' },
      { chapterName: 'The Little Girl', description: 'Story — Katherine Mansfield, father-daughter relationship' },
      { chapterName: 'A Truly Beautiful Mind', description: 'Biography — Albert Einstein, genius, humanity' },
      { chapterName: 'The Snake and the Mirror', description: 'Story — humor, vanity, encounter with a snake' },
      { chapterName: 'My Childhood', description: 'Autobiography — APJ Abdul Kalam, early life, inspiration' },
      { chapterName: 'Reach for the Top', description: 'Biographies — Santosh Yadav and Maria Sharapova' },
      { chapterName: 'Kathmandu', description: 'Travel essay — Vikram Seth, contrasts, observations' },
      { chapterName: 'If I Were You', description: 'Play — suspense, identity, wit' },
      { chapterName: 'The Lost Child', description: 'Supplementary — Mulk Raj Anand, fair, parent-child bond' },
      { chapterName: 'The Adventures of Toto', description: 'Supplementary — Ruskin Bond, mischievous monkey' },
      { chapterName: 'In the Kingdom of Fools', description: 'Supplementary — Kannada folktale, wisdom' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'दो बैलों की कथा', description: 'कहानी — प्रेमचंद, स्वतंत्रता, मित्रता' },
      { chapterName: 'ल्हासा की ओर', description: 'यात्रा वृत्तांत — तिब्बत यात्रा' },
      { chapterName: 'उपभोक्तावाद की संस्कृति', description: 'निबंध — उपभोक्तावाद, विज्ञापन' },
      { chapterName: 'साँवले सपनों की याद', description: 'संस्मरण — पक्षी, प्रकृति प्रेम' },
      { chapterName: 'नाना साहब की पुत्री', description: 'कहानी — 1857 का विद्रोह, वीरता' },
      { chapterName: 'प्रेमचंद के फटे जूते', description: 'व्यंग्य — सादगी, साहित्यकार' },
      { chapterName: 'मेरे बचपन के दिन', description: 'संस्मरण — महादेवी वर्मा, बचपन' },
      { chapterName: 'एक कुत्ता और एक मैना', description: 'निबंध — हजारीप्रसाद द्विवेदी, पशु-प्रेम' },
      { chapterName: 'सखियाँ एवं सबद', description: 'कविता — कबीर, आध्यात्मिक ज्ञान' },
      { chapterName: 'वाख', description: 'कविता — ललद्यद, कश्मीरी रहस्यवाद' },
      { chapterName: 'रसखान के सवैये', description: 'कविता — कृष्ण भक्ति' },
      { chapterName: 'कैदी और कोकिला', description: 'कविता — माखनलाल चतुर्वेदी, स्वतंत्रता' }
    ]
  });
