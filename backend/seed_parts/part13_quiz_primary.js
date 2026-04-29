
  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 1–5
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 1–5...');

  // Class 1 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Shapes and Space', questions: [
    { q: 'Which shape has 3 sides?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], ans: 2 },
    { q: 'A ball is shaped like a ___', options: ['Cube', 'Sphere', 'Cone', 'Cylinder'], ans: 1 },
    { q: 'How many corners does a rectangle have?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Which shape has no corners?', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], ans: 2 },
    { q: 'A dice is shaped like a ___', options: ['Sphere', 'Cylinder', 'Cube', 'Cone'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Addition', questions: [
    { q: 'What is 3 + 4?', options: ['6', '7', '8', '5'], ans: 1 },
    { q: 'What is 5 + 2?', options: ['3', '6', '7', '8'], ans: 2 },
    { q: '2 + 2 = ?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '6 + 1 = ?', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'If you have 4 apples and get 3 more, how many do you have?', options: ['5', '6', '7', '8'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Subtraction', questions: [
    { q: 'What is 7 - 3?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '9 - 5 = ?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: 'You have 8 candies and eat 2. How many left?', options: ['4', '5', '6', '7'], ans: 2 },
    { q: '6 - 6 = ?', options: ['0', '1', '6', '12'], ans: 0 },
    { q: 'What is 5 - 1?', options: ['3', '4', '5', '6'], ans: 1 }
  ]});

  // Class 1 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'My Family', questions: [
    { q: 'Your father\'s mother is your ___', options: ['Mother', 'Aunt', 'Grandmother', 'Sister'], ans: 2 },
    { q: 'Who is usually the youngest in a family?', options: ['Father', 'Mother', 'Grandparent', 'Baby'], ans: 3 },
    { q: 'A family that lives together helps each other. True or false?', options: ['True', 'False', 'Sometimes', 'Never'], ans: 0 },
    { q: 'Your mother\'s sister is your ___', options: ['Mother', 'Aunt', 'Grandmother', 'Cousin'], ans: 1 },
    { q: 'Which is NOT a family member?', options: ['Father', 'Brother', 'Teacher', 'Sister'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Plants Around Us', questions: [
    { q: 'Which part of the plant is underground?', options: ['Leaf', 'Stem', 'Root', 'Flower'], ans: 2 },
    { q: 'Trees are ___ plants', options: ['Small', 'Big and tall', 'Tiny', 'Floating'], ans: 1 },
    { q: 'We get fruits from ___', options: ['Roots', 'Leaves', 'Plants', 'Soil'], ans: 2 },
    { q: 'Flowers are usually ___', options: ['Colourful', 'Black', 'Invisible', 'Square'], ans: 0 },
    { q: 'Plants need ___ to grow', options: ['Toys', 'Water and sunlight', 'Stones', 'Darkness'], ans: 1 }
  ]});

  // Class 3 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'How Many Times?', questions: [
    { q: '3 × 4 = ?', options: ['7', '10', '12', '14'], ans: 2 },
    { q: '5 groups of 2 makes ___', options: ['7', '10', '12', '25'], ans: 1 },
    { q: '2 × 6 = ?', options: ['8', '10', '12', '14'], ans: 2 },
    { q: 'If each box has 4 pencils and there are 3 boxes, total pencils = ?', options: ['7', '12', '10', '15'], ans: 1 },
    { q: '1 × 9 = ?', options: ['0', '1', '9', '10'], ans: 2 }
  ]});

  // Class 3 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Water O Water', questions: [
    { q: 'Which of these is a source of water?', options: ['Mountain', 'River', 'Desert', 'Fire'], ans: 1 },
    { q: 'We should ___ water', options: ['Waste', 'Pollute', 'Save', 'Colour'], ans: 2 },
    { q: 'Rain water comes from ___', options: ['Rivers', 'Clouds', 'Mountains', 'Ground'], ans: 1 },
    { q: 'Which is NOT a use of water?', options: ['Drinking', 'Cooking', 'Bathing', 'Flying'], ans: 3 },
    { q: 'Water that is safe to drink is called ___', options: ['Salt water', 'Dirty water', 'Potable water', 'River water'], ans: 2 }
  ]});

  // Class 5 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Parts and Wholes', questions: [
    { q: 'What fraction of a pizza is 1 slice out of 4 equal slices?', options: ['1/2', '1/3', '1/4', '1/8'], ans: 2 },
    { q: 'Which is greater: 1/2 or 1/4?', options: ['1/4', '1/2', 'Both equal', 'Cannot compare'], ans: 1 },
    { q: '2/4 is the same as ___', options: ['1/4', '1/2', '3/4', '1/3'], ans: 1 },
    { q: 'Half of 10 is ___', options: ['2', '4', '5', '10'], ans: 2 },
    { q: 'If you eat 3/8 of a cake, what fraction is left?', options: ['3/8', '5/8', '1/8', '4/8'], ans: 1 }
  ]});

  // Class 5 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Super Senses', questions: [
    { q: 'Which animal can see well in the dark?', options: ['Cow', 'Owl', 'Hen', 'Sheep'], ans: 1 },
    { q: 'Dogs have a strong sense of ___', options: ['Sight', 'Hearing', 'Smell', 'Taste'], ans: 2 },
    { q: 'Snakes sense vibrations through their ___', options: ['Eyes', 'Ears', 'Body', 'Tongue'], ans: 2 },
    { q: 'Which insect uses antennae to sense?', options: ['Spider', 'Ant', 'Frog', 'Fish'], ans: 1 },
    { q: 'Dolphins communicate using ___', options: ['Light', 'Sound', 'Smell', 'Touch'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Every Drop Counts', questions: [
    { q: 'Rainwater harvesting means ___', options: ['Wasting rain', 'Collecting rain for use', 'Drinking rain directly', 'Playing in rain'], ans: 1 },
    { q: 'Which uses the MOST water?', options: ['Brushing teeth', 'Washing a car', 'Filling a swimming pool', 'Drinking a glass'], ans: 2 },
    { q: 'A dripping tap wastes ___', options: ['No water', 'Very little water', 'A lot of water over time', 'Only cold water'], ans: 2 },
    { q: 'To save water while brushing, you should ___', options: ['Keep tap running', 'Turn off tap', 'Use a hose', 'Brush faster'], ans: 1 },
    { q: 'Which is a sign of water scarcity?', options: ['Floods', 'Rivers drying up', 'Heavy rainfall', 'Full dams'], ans: 1 }
  ]});
