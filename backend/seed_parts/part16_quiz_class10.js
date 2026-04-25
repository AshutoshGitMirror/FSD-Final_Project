
  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Class 10
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Class 10...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Real Numbers', questions: [
    { q: 'The HCF of 26 and 91 is:', options: ['13', '26', '91', '7'], ans: 0 },
    { q: 'The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of:', options: ['Two numbers', 'Primes', 'Even numbers', 'Odd numbers'], ans: 1 },
    { q: 'If HCF(a,b) = 1, then a and b are called:', options: ['Prime', 'Composite', 'Co-prime', 'Twin primes'], ans: 2 },
    { q: 'LCM(12, 18) = ?', options: ['6', '12', '36', '216'], ans: 2 },
    { q: 'HCF × LCM of two numbers equals:', options: ['Sum of numbers', 'Difference', 'Product of numbers', 'Quotient'], ans: 2 },
    { q: 'The decimal expansion of 17/8 is:', options: ['Terminating', 'Non-terminating repeating', 'Non-terminating non-repeating', 'None'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Quadratic Equations', questions: [
    { q: 'The roots of x² - 5x + 6 = 0 are:', options: ['2, 3', '1, 6', '-2, -3', '-1, -6'], ans: 0 },
    { q: 'The discriminant of ax² + bx + c = 0 is:', options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', '2b - ac'], ans: 0 },
    { q: 'If discriminant = 0, the equation has:', options: ['No real roots', 'Two distinct roots', 'Two equal roots', 'Infinite roots'], ans: 2 },
    { q: 'The sum of roots of x² - 7x + 10 = 0 is:', options: ['7', '-7', '10', '-10'], ans: 0 },
    { q: 'Which is a quadratic equation?', options: ['x + 1 = 0', 'x² + x = 0', 'x³ = 1', '1/x = 2'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Trigonometry', questions: [
    { q: 'sin 30° = ?', options: ['0', '1/2', '1/√2', '√3/2'], ans: 1 },
    { q: 'cos 0° = ?', options: ['0', '1/2', '1', '√3/2'], ans: 2 },
    { q: 'tan 45° = ?', options: ['0', '1', '√3', 'Undefined'], ans: 1 },
    { q: 'sin²θ + cos²θ = ?', options: ['0', '1', '2', 'sinθ'], ans: 1 },
    { q: 'The value of sec 60° is:', options: ['1', '√2', '2', '1/2'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Probability', questions: [
    { q: 'Probability of getting a head when tossing a coin is:', options: ['0', '1/4', '1/2', '1'], ans: 2 },
    { q: 'The probability of an impossible event is:', options: ['0', '1/2', '1', '-1'], ans: 0 },
    { q: 'A die is thrown. P(getting 6) = ?', options: ['1/2', '1/3', '1/6', '6'], ans: 2 },
    { q: 'P(E) + P(not E) = ?', options: ['0', '1/2', '1', '2'], ans: 2 },
    { q: 'Two dice are thrown. Total outcomes = ?', options: ['6', '12', '24', '36'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Chemical Reactions and Equations', questions: [
    { q: 'A balanced chemical equation has equal number of ___ on both sides', options: ['Molecules', 'Atoms of each element', 'Compounds', 'Reactions'], ans: 1 },
    { q: 'Rusting of iron is an example of:', options: ['Combination', 'Decomposition', 'Oxidation', 'Reduction'], ans: 2 },
    { q: 'In a decomposition reaction, a single reactant breaks into:', options: ['One product', 'Two or more products', 'No products', 'Water only'], ans: 1 },
    { q: 'Fe + CuSO₄ → FeSO₄ + Cu is a ___ reaction', options: ['Combination', 'Decomposition', 'Displacement', 'Double displacement'], ans: 2 },
    { q: 'The burning of magnesium ribbon produces:', options: ['MgO', 'MgCl₂', 'Mg(OH)₂', 'MgSO₄'], ans: 0 },
    { q: 'An exothermic reaction ___ heat', options: ['Absorbs', 'Releases', 'Neither', 'Both'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Acids, Bases and Salts', questions: [
    { q: 'The pH of a neutral solution is:', options: ['0', '7', '14', '1'], ans: 1 },
    { q: 'Which turns blue litmus red?', options: ['Base', 'Acid', 'Salt', 'Water'], ans: 1 },
    { q: 'The formula of baking soda is:', options: ['NaCl', 'NaHCO₃', 'Na₂CO₃', 'NaOH'], ans: 1 },
    { q: 'Acid + Base → ___ + Water', options: ['Acid', 'Base', 'Salt', 'Gas'], ans: 2 },
    { q: 'Tooth decay is caused by pH ___ than 5.5', options: ['Greater', 'Less', 'Equal', 'None'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Life Processes', questions: [
    { q: 'The process by which organisms obtain energy from food is:', options: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'], ans: 1 },
    { q: 'Photosynthesis occurs in:', options: ['Roots', 'Leaves', 'Stem', 'Flowers'], ans: 1 },
    { q: 'The human heart has ___ chambers', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Xylem transports ___ in plants', options: ['Food', 'Water and minerals', 'Hormones', 'Oxygen'], ans: 1 },
    { q: 'The main excretory organ in humans is:', options: ['Liver', 'Lungs', 'Kidney', 'Skin'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Electricity', questions: [
    { q: 'The SI unit of electric current is:', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], ans: 2 },
    { q: 'V = IR is called:', options: ['Faraday\'s law', 'Ohm\'s law', 'Kirchhoff\'s law', 'Coulomb\'s law'], ans: 1 },
    { q: 'In a series circuit, the current is:', options: ['Different everywhere', 'Same everywhere', 'Zero', 'Infinite'], ans: 1 },
    { q: 'Electric power P = ?', options: ['V/I', 'V × I', 'I/V', 'V + I'], ans: 1 },
    { q: '1 kWh = ?', options: ['3.6 × 10⁶ J', '3600 J', '360 J', '36 J'], ans: 0 },
    { q: 'The resistance of a conductor ___ with increase in temperature', options: ['Decreases', 'Increases', 'Remains same', 'Becomes zero'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Light — Reflection and Refraction', questions: [
    { q: 'The angle of incidence equals the angle of reflection. This is:', options: ['Snell\'s law', 'Law of reflection', 'Law of refraction', 'Hooke\'s law'], ans: 1 },
    { q: 'A concave mirror converges light at its:', options: ['Centre', 'Pole', 'Focus', 'Radius'], ans: 2 },
    { q: 'The refractive index of glass is about:', options: ['1.0', '1.3', '1.5', '2.0'], ans: 2 },
    { q: 'When light goes from air to water, it bends ___ the normal', options: ['Away from', 'Towards', 'Parallel to', 'Does not bend'], ans: 1 },
    { q: 'The mirror formula is:', options: ['1/f = 1/v - 1/u', '1/f = 1/v + 1/u', 'f = v + u', 'f = v × u'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Nationalism in India', questions: [
    { q: 'The Non-Cooperation Movement was launched in:', options: ['1919', '1920', '1930', '1942'], ans: 1 },
    { q: 'The Salt March was also known as:', options: ['Quit India March', 'Dandi March', 'Long March', 'Freedom March'], ans: 1 },
    { q: 'Who led the Civil Disobedience Movement?', options: ['Nehru', 'Subhas Bose', 'Mahatma Gandhi', 'Patel'], ans: 2 },
    { q: 'The Jallianwala Bagh massacre happened in:', options: ['Delhi', 'Mumbai', 'Amritsar', 'Kolkata'], ans: 2 },
    { q: 'The Simon Commission was boycotted because:', options: ['It was too large', 'It had no Indian member', 'It was too late', 'It was unofficial'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Resources and Development', questions: [
    { q: 'Resources which are surveyed and their quality and quantity determined are called:', options: ['Potential', 'Developed', 'Stock', 'Reserve'], ans: 1 },
    { q: 'Soil formed by intense leaching in heavy rainfall areas is:', options: ['Alluvial', 'Black', 'Laterite', 'Red'], ans: 2 },
    { q: 'Which soil is ideal for cotton cultivation?', options: ['Alluvial', 'Black (Regur)', 'Red', 'Laterite'], ans: 1 },
    { q: 'Land degradation is caused by:', options: ['Afforestation', 'Overgrazing', 'Terracing', 'Contour ploughing'], ans: 1 },
    { q: 'The percentage of plain area in India is about:', options: ['23%', '30%', '43%', '60%'], ans: 2 }
  ]});
