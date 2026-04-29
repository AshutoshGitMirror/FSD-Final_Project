
  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Class 9
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Class 9...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Number Systems', questions: [
    { q: 'Which of the following is irrational?', options: ['3/4', '√2', '0.5', '22/7'], ans: 1 },
    { q: 'Every rational number is:', options: ['An integer', 'A natural number', 'A real number', 'An irrational number'], ans: 2 },
    { q: 'The decimal expansion of √2 is:', options: ['Terminating', 'Non-terminating repeating', 'Non-terminating non-repeating', 'None'], ans: 2 },
    { q: 'Between 3 and 4, the number of irrational numbers is:', options: ['0', '1', '10', 'Infinite'], ans: 3 },
    { q: 'The value of 64^(1/3) is:', options: ['2', '4', '8', '16'], ans: 1 },
    { q: 'Which represents a rational number?', options: ['π', '√3', '0.333...', '√5'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Polynomials', questions: [
    { q: 'The degree of 5x³ + 4x² - 7 is:', options: ['1', '2', '3', '5'], ans: 2 },
    { q: 'A polynomial of degree 2 is called:', options: ['Linear', 'Quadratic', 'Cubic', 'Constant'], ans: 1 },
    { q: 'The zero of p(x) = 2x - 6 is:', options: ['2', '3', '6', '-3'], ans: 1 },
    { q: 'If x = 1 is a zero of p(x), then:', options: ['p(0) = 0', 'p(1) = 0', 'p(-1) = 0', 'p(2) = 0'], ans: 1 },
    { q: 'How many zeroes can a cubic polynomial have at most?', options: ['1', '2', '3', '4'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Triangles', questions: [
    { q: 'If two triangles are congruent, they have:', options: ['Same area only', 'Same shape only', 'Same shape and size', 'Different sizes'], ans: 2 },
    { q: 'SAS congruence means:', options: ['Side-Angle-Side', 'Side-Area-Side', 'Sum-Angle-Sum', 'Straight-Angle-Side'], ans: 0 },
    { q: 'The sum of angles of a triangle is:', options: ['90°', '180°', '270°', '360°'], ans: 1 },
    { q: 'In a triangle, the side opposite to the largest angle is:', options: ['Shortest', 'Equal', 'Longest', 'Medium'], ans: 2 },
    { q: 'An equilateral triangle has ___ lines of symmetry', options: ['0', '1', '2', '3'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Matter in Our Surroundings', questions: [
    { q: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], ans: 0 },
    { q: 'The process of conversion from liquid to gas is called:', options: ['Condensation', 'Evaporation', 'Sublimation', 'Freezing'], ans: 1 },
    { q: 'Dry ice is solid form of:', options: ['Water', 'Oxygen', 'Carbon dioxide', 'Nitrogen'], ans: 2 },
    { q: 'Which has the highest kinetic energy of particles?', options: ['Solid', 'Liquid', 'Gas', 'All equal'], ans: 2 },
    { q: 'The boiling point of water is:', options: ['0°C', '100°C', '212°F', 'Both B and C'], ans: 3 },
    { q: 'Sublimation is the conversion from:', options: ['Solid to liquid', 'Liquid to gas', 'Solid to gas', 'Gas to solid'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Atoms and Molecules', questions: [
    { q: 'The law of conservation of mass was given by:', options: ['Dalton', 'Lavoisier', 'Proust', 'Avogadro'], ans: 1 },
    { q: 'The chemical formula of water is:', options: ['HO', 'H₂O', 'H₂O₂', 'OH₂'], ans: 1 },
    { q: 'One mole of any substance contains ___ particles', options: ['6.022 × 10²³', '6.022 × 10²²', '3.011 × 10²³', '1.6 × 10⁻¹⁹'], ans: 0 },
    { q: 'Atomic mass of carbon is:', options: ['6 u', '12 u', '14 u', '16 u'], ans: 1 },
    { q: 'The valency of oxygen is:', options: ['1', '2', '3', '4'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Motion', questions: [
    { q: 'SI unit of velocity is:', options: ['m/s²', 'm/s', 'km/h', 'm'], ans: 1 },
    { q: 'Acceleration due to gravity on Earth is approximately:', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '6.8 m/s²'], ans: 1 },
    { q: 'A body at rest has speed equal to:', options: ['1 m/s', '-1 m/s', '0 m/s', 'Infinity'], ans: 2 },
    { q: 'The area under a velocity-time graph gives:', options: ['Speed', 'Acceleration', 'Displacement', 'Force'], ans: 2 },
    { q: 'If a car moves in a circle at constant speed, its velocity is:', options: ['Constant', 'Changing', 'Zero', 'Infinite'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Force and Laws of Motion', questions: [
    { q: 'Newton\'s first law is also called the law of:', options: ['Momentum', 'Inertia', 'Action-reaction', 'Gravitation'], ans: 1 },
    { q: 'F = ma is Newton\'s ___ law', options: ['First', 'Second', 'Third', 'Zeroth'], ans: 1 },
    { q: 'Action and reaction forces act on:', options: ['Same body', 'Different bodies', 'No body', 'Only heavy bodies'], ans: 1 },
    { q: 'The SI unit of force is:', options: ['kg', 'Newton', 'Joule', 'Watt'], ans: 1 },
    { q: 'Momentum = mass × ___', options: ['Acceleration', 'Force', 'Velocity', 'Distance'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The French Revolution', questions: [
    { q: 'The French Revolution began in:', options: ['1776', '1789', '1804', '1815'], ans: 1 },
    { q: 'The slogan of the French Revolution was:', options: ['Bread and Peace', 'Liberty, Equality, Fraternity', 'Workers Unite', 'Power to People'], ans: 1 },
    { q: 'The Bastille was a:', options: ['Palace', 'Church', 'Prison-fortress', 'University'], ans: 2 },
    { q: 'Who was the king of France during the Revolution?', options: ['Louis XIV', 'Louis XV', 'Louis XVI', 'Napoleon'], ans: 2 },
    { q: 'The Declaration of the Rights of Man was adopted in:', options: ['1789', '1791', '1793', '1799'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'What is Democracy? Why Democracy?', questions: [
    { q: 'Democracy is a form of government where rulers are elected by:', options: ['Military', 'King', 'People', 'Judges'], ans: 2 },
    { q: 'Which is NOT a feature of democracy?', options: ['Free elections', 'Equal rights', 'Rule of one person', 'Free press'], ans: 2 },
    { q: 'India became a democratic republic in:', options: ['1947', '1949', '1950', '1952'], ans: 2 },
    { q: 'In a democracy, the final decision-making power rests with:', options: ['Army', 'Judiciary', 'Elected representatives', 'Business leaders'], ans: 2 },
    { q: 'Which country is NOT a democracy?', options: ['India', 'USA', 'North Korea', 'Japan'], ans: 2 }
  ]});
