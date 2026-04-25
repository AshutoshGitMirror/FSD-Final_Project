
  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 6–8
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 6–8...');

  // Class 6 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Knowing Our Numbers', questions: [
    { q: 'The smallest 4-digit number is:', options: ['999', '1000', '1001', '9999'], ans: 1 },
    { q: 'In the Indian system, 1 lakh = ?', options: ['10,000', '1,00,000', '10,00,000', '1,000'], ans: 1 },
    { q: 'Which is the greatest: 9999, 10000, 9990, 10001?', options: ['9999', '10000', '9990', '10001'], ans: 3 },
    { q: 'The Roman numeral for 50 is:', options: ['V', 'X', 'L', 'C'], ans: 2 },
    { q: 'Estimation of 578 + 212 to nearest hundred is:', options: ['700', '800', '790', '900'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Playing with Numbers', questions: [
    { q: 'HCF of 12 and 18 is:', options: ['2', '4', '6', '12'], ans: 2 },
    { q: 'LCM of 4 and 6 is:', options: ['2', '6', '12', '24'], ans: 2 },
    { q: 'Which is a prime number?', options: ['4', '9', '13', '15'], ans: 2 },
    { q: 'A number divisible by 2 and 3 both is divisible by:', options: ['5', '6', '7', '8'], ans: 1 },
    { q: 'The smallest prime number is:', options: ['0', '1', '2', '3'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Algebra', questions: [
    { q: 'If x = 3, what is 2x + 1?', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'Which is a variable?', options: ['5', '10', 'x', '100'], ans: 2 },
    { q: 'The expression for "3 more than a number n" is:', options: ['n - 3', '3n', 'n + 3', 'n/3'], ans: 2 },
    { q: '5x means:', options: ['5 + x', '5 × x', '5 - x', '5 ÷ x'], ans: 1 },
    { q: 'If 2x = 10, then x = ?', options: ['2', '5', '10', '20'], ans: 1 }
  ]});

  // Class 6 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Components of Food', questions: [
    { q: 'Which nutrient gives us energy?', options: ['Vitamins', 'Minerals', 'Carbohydrates', 'Water'], ans: 2 },
    { q: 'Deficiency of Vitamin C causes:', options: ['Rickets', 'Scurvy', 'Night blindness', 'Goitre'], ans: 1 },
    { q: 'Proteins are called:', options: ['Energy-giving food', 'Body-building food', 'Protective food', 'Junk food'], ans: 1 },
    { q: 'Iodine test is used to check for:', options: ['Protein', 'Fat', 'Starch', 'Vitamin'], ans: 2 },
    { q: 'Which is a balanced diet?', options: ['Only rice', 'Only fruits', 'All nutrients in right amounts', 'Only sweets'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Electricity and Circuits', questions: [
    { q: 'An electric cell has ___ terminals', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'A material that allows electric current to pass is called a:', options: ['Insulator', 'Conductor', 'Switch', 'Fuse'], ans: 1 },
    { q: 'Which is an insulator?', options: ['Copper', 'Iron', 'Rubber', 'Aluminium'], ans: 2 },
    { q: 'A switch is used to:', options: ['Generate electricity', 'Store electricity', 'Break or complete a circuit', 'Measure current'], ans: 2 },
    { q: 'In a torch, the source of electricity is:', options: ['Wire', 'Bulb', 'Cell/Battery', 'Switch'], ans: 2 }
  ]});

  // Class 7 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integers', questions: [
    { q: '(-3) × (-4) = ?', options: ['-12', '-7', '7', '12'], ans: 3 },
    { q: '(-5) + 8 = ?', options: ['-13', '-3', '3', '13'], ans: 2 },
    { q: 'The additive inverse of -7 is:', options: ['-7', '0', '7', '1/7'], ans: 2 },
    { q: '(-20) ÷ 5 = ?', options: ['-4', '-15', '4', '15'], ans: 0 },
    { q: 'Which is the smallest: -5, -3, 0, 2?', options: ['-5', '-3', '0', '2'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Comparing Quantities', questions: [
    { q: '25% of 200 is:', options: ['25', '50', '75', '100'], ans: 1 },
    { q: 'A shirt costs Rs 500. A 10% discount means you pay:', options: ['Rs 400', 'Rs 450', 'Rs 490', 'Rs 500'], ans: 1 },
    { q: 'Simple interest on Rs 1000 at 5% for 2 years is:', options: ['Rs 50', 'Rs 100', 'Rs 150', 'Rs 200'], ans: 1 },
    { q: 'Ratio of 15 to 25 in simplest form is:', options: ['15:25', '3:5', '5:3', '1:2'], ans: 1 },
    { q: 'If CP = Rs 200 and SP = Rs 250, then profit is:', options: ['Rs 25', 'Rs 50', 'Rs 200', 'Rs 250'], ans: 1 }
  ]});

  // Class 7 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Nutrition in Plants', questions: [
    { q: 'The process by which plants make food is called:', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Excretion'], ans: 1 },
    { q: 'Which gas do plants take in during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], ans: 2 },
    { q: 'The green pigment in leaves is:', options: ['Haemoglobin', 'Chlorophyll', 'Melanin', 'Keratin'], ans: 1 },
    { q: 'Cuscuta is an example of a ___ plant', options: ['Insectivorous', 'Saprotrophic', 'Parasitic', 'Autotrophic'], ans: 2 },
    { q: 'Venus flytrap is a ___ plant', options: ['Parasitic', 'Insectivorous', 'Saprophytic', 'Symbiotic'], ans: 1 }
  ]});

  // Class 8 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Squares and Square Roots', questions: [
    { q: 'Square of 12 is:', options: ['24', '122', '144', '124'], ans: 2 },
    { q: 'Square root of 49 is:', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'Which is a perfect square?', options: ['50', '63', '81', '90'], ans: 2 },
    { q: 'How many non-square numbers lie between 4² and 5²?', options: ['6', '7', '8', '9'], ans: 2 },
    { q: '√169 = ?', options: ['11', '12', '13', '14'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Comparing Quantities', questions: [
    { q: 'Compound interest formula is:', options: ['P×R×T/100', 'A = P(1+R/100)^n', 'P+R+T', 'A = P×R×n'], ans: 1 },
    { q: 'A shopkeeper marks a shirt at Rs 500 and gives 20% discount. SP = ?', options: ['Rs 400', 'Rs 300', 'Rs 450', 'Rs 480'], ans: 0 },
    { q: 'GST stands for:', options: ['General Sales Tax', 'Goods and Services Tax', 'Global Standard Tax', 'Grand State Tax'], ans: 1 },
    { q: 'If Rs 10000 is invested at 10% CI for 2 years, amount is:', options: ['Rs 12000', 'Rs 12100', 'Rs 11000', 'Rs 11100'], ans: 1 },
    { q: 'Loss % = ?', options: ['(Loss/SP)×100', '(Loss/CP)×100', '(CP-SP)×100', '(SP/CP)×100'], ans: 1 }
  ]});

  // Class 8 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Cell — Structure and Functions', questions: [
    { q: 'The basic structural and functional unit of life is:', options: ['Tissue', 'Organ', 'Cell', 'System'], ans: 2 },
    { q: 'Which organelle is called the "powerhouse of the cell"?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], ans: 1 },
    { q: 'Plant cells have ___ that animal cells don\'t', options: ['Nucleus', 'Cell wall', 'Mitochondria', 'Cytoplasm'], ans: 1 },
    { q: 'The control centre of the cell is:', options: ['Cytoplasm', 'Cell membrane', 'Nucleus', 'Vacuole'], ans: 2 },
    { q: 'Robert Hooke discovered cells in:', options: ['1565', '1665', '1765', '1865'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Friction', questions: [
    { q: 'Friction acts in the ___ direction of motion', options: ['Same', 'Opposite', 'Perpendicular', 'No specific'], ans: 1 },
    { q: 'Which surface produces more friction?', options: ['Glass', 'Ice', 'Rough road', 'Wet floor'], ans: 2 },
    { q: 'Friction can be reduced by:', options: ['Making surfaces rough', 'Using lubricants', 'Increasing weight', 'Removing wheels'], ans: 1 },
    { q: 'Static friction is ___ sliding friction', options: ['Less than', 'Equal to', 'Greater than', 'Same as'], ans: 2 },
    { q: 'Ball bearings help to:', options: ['Increase friction', 'Reduce friction', 'Stop motion', 'Create heat'], ans: 1 }
  ]});
