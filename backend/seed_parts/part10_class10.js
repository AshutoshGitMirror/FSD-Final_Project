
  // ═══════════════════════════════════════════════════════════
  // CLASS 10
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 10...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'Real Numbers', description: 'Euclid\'s division lemma, Fundamental Theorem of Arithmetic, irrational and rational numbers' },
      { chapterName: 'Polynomials', description: 'Zeroes of polynomials, relationship between zeroes and coefficients, division algorithm' },
      { chapterName: 'Pair of Linear Equations in Two Variables', description: 'Graphical and algebraic methods — substitution, elimination, cross-multiplication' },
      { chapterName: 'Quadratic Equations', description: 'Solutions by factorization, completing the square, quadratic formula, discriminant' },
      { chapterName: 'Arithmetic Progressions', description: 'nth term, sum of n terms, applications' },
      { chapterName: 'Triangles', description: 'Similarity, BPT, criteria for similarity, Pythagoras theorem' },
      { chapterName: 'Coordinate Geometry', description: 'Distance formula, section formula, area of triangle' },
      { chapterName: 'Introduction to Trigonometry', description: 'Trigonometric ratios, ratios of complementary angles, identities' },
      { chapterName: 'Some Applications of Trigonometry', description: 'Heights and distances, angle of elevation and depression' },
      { chapterName: 'Circles', description: 'Tangent to a circle, number of tangents from a point, theorems' },
      { chapterName: 'Areas Related to Circles', description: 'Sector, segment, area of combinations of figures' },
      { chapterName: 'Surface Areas and Volumes', description: 'Combinations of solids, conversion of shapes, frustum' },
      { chapterName: 'Statistics', description: 'Mean, median, mode of grouped data, cumulative frequency, ogives' },
      { chapterName: 'Probability', description: 'Classical definition, simple problems on single events' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'Chemical Reactions and Equations', description: 'Types of reactions, balancing equations, effects of oxidation' },
      { chapterName: 'Acids, Bases and Salts', description: 'Properties, pH scale, indicators, salts preparation' },
      { chapterName: 'Metals and Non-Metals', description: 'Properties, reactivity series, ionic bonding, corrosion, extraction' },
      { chapterName: 'Carbon and its Compounds', description: 'Covalent bonding, versatile carbon, homologous series, functional groups' },
      { chapterName: 'Life Processes', description: 'Nutrition, respiration, transportation, excretion in plants and animals' },
      { chapterName: 'Control and Coordination', description: 'Nervous system, reflex arc, hormones in animals and plants' },
      { chapterName: 'How do Organisms Reproduce?', description: 'Asexual and sexual reproduction, reproductive health' },
      { chapterName: 'Heredity and Evolution', description: 'Mendel\'s laws, sex determination, evolution and classification' },
      { chapterName: 'Light — Reflection and Refraction', description: 'Laws of reflection/refraction, mirrors, lenses, sign convention' },
      { chapterName: 'The Human Eye and the Colourful World', description: 'Eye defects, atmospheric refraction, dispersion, scattering' },
      { chapterName: 'Electricity', description: 'Ohm\'s law, resistance, series/parallel circuits, power, energy' },
      { chapterName: 'Magnetic Effects of Electric Current', description: 'Magnetic field, electromagnets, Fleming\'s rules, motors, generators' },
      { chapterName: 'Our Environment', description: 'Ecosystem, food chains and webs, ozone depletion, waste management' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'The Rise of Nationalism in Europe', description: 'History — French Revolution impact, unification of Germany and Italy' },
      { chapterName: 'Nationalism in India', description: 'Non-Cooperation, Civil Disobedience, Quit India, different strands' },
      { chapterName: 'The Making of a Global World', description: 'Silk routes, colonialism, industrial revolution, globalization' },
      { chapterName: 'The Age of Industrialisation', description: 'Proto-industrialisation, factory system, industrialisation in India' },
      { chapterName: 'Print Culture and the Modern World', description: 'History of print, impact on society, censorship' },
      { chapterName: 'Resources and Development', description: 'Geography — types of resources, resource planning, land degradation' },
      { chapterName: 'Forest and Wildlife Resources', description: 'Conservation, biodiversity, community initiatives' },
      { chapterName: 'Water Resources', description: 'Dams, rainwater harvesting, watershed management' },
      { chapterName: 'Agriculture', description: 'Types of farming, cropping patterns, food security' },
      { chapterName: 'Minerals and Energy Resources', description: 'Types of minerals, conventional and non-conventional energy' },
      { chapterName: 'Manufacturing Industries', description: 'Industrial location, agro-based, mineral-based industries' },
      { chapterName: 'Lifelines of National Economy', description: 'Transport, communication, trade, tourism' },
      { chapterName: 'Power Sharing', description: 'Civics — Belgium and Sri Lanka, forms of power sharing' },
      { chapterName: 'Federalism', description: 'Federal provisions, linguistic states, decentralisation' },
      { chapterName: 'Gender, Religion and Caste', description: 'Social divisions in politics, communalism, secularism' },
      { chapterName: 'Political Parties', description: 'Types, party systems, national and state parties, challenges' },
      { chapterName: 'Outcomes of Democracy', description: 'Accountability, economic growth, inequality, dignity' },
      { chapterName: 'Development', description: 'Economics — income and other criteria, HDI, sustainability' },
      { chapterName: 'Sectors of the Indian Economy', description: 'Primary, secondary, tertiary, organised/unorganised' },
      { chapterName: 'Money and Credit', description: 'Modern forms of money, banking, credit, SHGs' },
      { chapterName: 'Globalisation and the Indian Economy', description: 'MNCs, liberalisation, WTO, impact on India' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'A Letter to God', description: 'Story — Gregorio Lopez, unshakeable faith' },
      { chapterName: 'Nelson Mandela: Long Walk to Freedom', description: 'Autobiography — apartheid, courage, inauguration' },
      { chapterName: 'Two Stories about Flying', description: 'His First Flight (Liam O\'Flaherty) and Black Aeroplane' },
      { chapterName: 'From the Diary of Anne Frank', description: 'Diary — WWII, adolescence, hiding' },
      { chapterName: 'Glimpses of India', description: 'A Baker from Goa, Coorg, Tea from Assam' },
      { chapterName: 'Mijbil the Otter', description: 'Story — Gavin Maxwell, unusual pet, travel' },
      { chapterName: 'Madam Rides the Bus', description: 'Story — Valliammai, curiosity, first bus ride' },
      { chapterName: 'The Sermon at Benares', description: 'Story — Buddha, suffering, acceptance' },
      { chapterName: 'The Proposal', description: 'Play — Anton Chekhov, comedy, marriage proposal' },
      { chapterName: 'A Triumph of Surgery', description: 'Supplementary — James Herriot, pampered dog' },
      { chapterName: 'The Thief\'s Story', description: 'Supplementary — Ruskin Bond, trust, transformation' },
      { chapterName: 'Footprints without Feet', description: 'Supplementary — H.G. Wells, invisible man' },
      { chapterName: 'The Making of a Scientist', description: 'Supplementary — Richard Ebright, curiosity, research' },
      { chapterName: 'The Necklace', description: 'Supplementary — Guy de Maupassant, vanity, irony' },
      { chapterName: 'Bholi', description: 'Supplementary — K.A. Abbas, education empowering women' },
      { chapterName: 'The Book That Saved the Earth', description: 'Supplementary — science fiction, humor' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'सूरदास के पद', description: 'कविता — कृष्ण भक्ति, विनय, वात्सल्य' },
      { chapterName: 'राम-लक्ष्मण-परशुराम संवाद', description: 'कविता — तुलसीदास, वीर रस' },
      { chapterName: 'आत्मकथ्य', description: 'कविता — जयशंकर प्रसाद, आत्मावलोकन' },
      { chapterName: 'उत्साह और अट नहीं रही है', description: 'कविता — निराला, बादल, बसंत' },
      { chapterName: 'यह दंतुरित मुस्कान और फसल', description: 'कविता — नागार्जुन, बाल सौंदर्य, कृषि' },
      { chapterName: 'छाया मत छूना', description: 'कविता — गिरिजाकुमार माथुर, यथार्थ' },
      { chapterName: 'नेताजी का चश्मा', description: 'कहानी — देशभक्ति, सम्मान' },
      { chapterName: 'बालगोबिन भगत', description: 'कहानी — सादा जीवन, भक्ति' },
      { chapterName: 'लखनवी अंदाज़', description: 'कहानी — नवाबी शैली, व्यंग्य' },
      { chapterName: 'एक कहानी यह भी', description: 'आत्मकथा — मन्नू भंडारी, संघर्ष' },
      { chapterName: 'स्त्री शिक्षा के विरोधी कुतर्कों का खंडन', description: 'निबंध — महावीरप्रसाद द्विवेदी' },
      { chapterName: 'संस्कृति', description: 'निबंध — भदंत आनंद कौसल्यायन' }
    ]
  });
