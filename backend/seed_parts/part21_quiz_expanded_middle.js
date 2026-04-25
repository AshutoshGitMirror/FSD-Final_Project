
  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 6-8 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 6–8...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integers', questions: [
    { q: '(-7) + 3 = ?', options: ['-10', '-4', '4', '10'], ans: 1 },
    { q: 'The absolute value of -15 is:', options: ['-15', '0', '15', '30'], ans: 2 },
    { q: 'Which is greater: -3 or -7?', options: ['-3', '-7', 'Both equal', 'Cannot compare'], ans: 0 },
    { q: '(-4) × (-5) = ?', options: ['-20', '-9', '9', '20'], ans: 3 },
    { q: '(-12) ÷ 4 = ?', options: ['-8', '-3', '3', '8'], ans: 1 },
    { q: 'On a number line, -3 is to the ___ of 0', options: ['Right', 'Left', 'Above', 'Below'], ans: 1 },
    { q: 'The sum of an integer and its additive inverse is:', options: ['-1', '0', '1', '2'], ans: 1 },
    { q: '(-6) - (-4) = ?', options: ['-10', '-2', '2', '10'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fractions and Decimals', questions: [
    { q: '3/4 × 2/5 = ?', options: ['5/9', '6/20', '3/10', '6/9'], ans: 2 },
    { q: '1/2 ÷ 1/4 = ?', options: ['1/8', '1/4', '2', '4'], ans: 2 },
    { q: '0.3 × 0.2 = ?', options: ['0.06', '0.6', '6', '0.006'], ans: 0 },
    { q: '2.5 ÷ 0.5 = ?', options: ['1.25', '2', '5', '12.5'], ans: 2 },
    { q: 'Convert 3/8 to decimal:', options: ['0.25', '0.375', '0.38', '0.3'], ans: 1 },
    { q: '7/10 + 3/10 = ?', options: ['10/20', '1', '10/10', 'Both B and C'], ans: 3 },
    { q: 'Which is greater: 2/3 or 3/5?', options: ['2/3', '3/5', 'Both equal', 'Cannot tell'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Simple Equations', questions: [
    { q: 'Solve: x + 5 = 12', options: ['5', '7', '12', '17'], ans: 1 },
    { q: 'Solve: 3x = 18', options: ['3', '6', '9', '15'], ans: 1 },
    { q: 'Solve: x - 4 = 9', options: ['5', '9', '13', '36'], ans: 2 },
    { q: 'If 2x + 3 = 11, then x = ?', options: ['3', '4', '5', '7'], ans: 1 },
    { q: 'Solve: x/4 = 5', options: ['1.25', '9', '20', '25'], ans: 2 },
    { q: 'If 5x - 10 = 15, then x = ?', options: ['1', '3', '5', '25'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Congruence of Triangles', questions: [
    { q: 'Two triangles are congruent if they have the same:', options: ['Colour', 'Shape only', 'Shape and size', 'Size only'], ans: 2 },
    { q: 'SSS stands for:', options: ['Side-Side-Straight', 'Side-Side-Side', 'Sum-Side-Sum', 'Same-Same-Same'], ans: 1 },
    { q: 'In SAS congruence, the angle must be:', options: ['Any angle', 'Included angle between the two sides', 'Largest angle', 'Right angle'], ans: 1 },
    { q: 'ASA congruence requires:', options: ['Two angles and included side', 'Two angles and any side', 'All angles', 'All sides'], ans: 0 },
    { q: 'RHS congruence applies to ___ triangles only', options: ['Equilateral', 'Isosceles', 'Right-angled', 'All'], ans: 2 },
    { q: 'If ΔABC ≅ ΔDEF, then AB = ?', options: ['DF', 'DE', 'EF', 'Cannot tell'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Perimeter and Area', questions: [
    { q: 'Area of a rectangle with length 8 cm and width 5 cm is:', options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], ans: 2 },
    { q: 'Area of a triangle = ?', options: ['base × height', '½ × base × height', '2 × base × height', 'base + height'], ans: 1 },
    { q: 'The area of a parallelogram with base 10 cm and height 6 cm is:', options: ['16 cm²', '32 cm²', '60 cm²', '120 cm²'], ans: 2 },
    { q: 'Area of a circle = ?', options: ['πr', '2πr', 'πr²', 'πd'], ans: 2 },
    { q: 'Circumference of a circle = ?', options: ['πr²', '2πr', 'πr', 'πd²'], ans: 1 },
    { q: 'If the radius of a circle is 7 cm, its area is approximately:', options: ['22 cm²', '44 cm²', '154 cm²', '308 cm²'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Nutrition in Animals', questions: [
    { q: 'The process of taking food into the body is called:', options: ['Digestion', 'Ingestion', 'Absorption', 'Egestion'], ans: 1 },
    { q: 'Saliva contains an enzyme called:', options: ['Pepsin', 'Trypsin', 'Salivary amylase', 'Lipase'], ans: 2 },
    { q: 'The inner lining of the stomach secretes:', options: ['Bile', 'Hydrochloric acid', 'Insulin', 'Saliva'], ans: 1 },
    { q: 'The longest part of the alimentary canal is:', options: ['Stomach', 'Large intestine', 'Small intestine', 'Oesophagus'], ans: 2 },
    { q: 'Amoeba captures food using:', options: ['Mouth', 'Tentacles', 'Pseudopodia', 'Cilia'], ans: 2 },
    { q: 'Bile juice is stored in the:', options: ['Liver', 'Pancreas', 'Gall bladder', 'Stomach'], ans: 2 },
    { q: 'Cud-chewing animals are called:', options: ['Herbivores', 'Ruminants', 'Omnivores', 'Carnivores'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Heat', questions: [
    { q: 'Heat flows from a ___ body to a ___ body', options: ['Cold to hot', 'Hot to cold', 'Big to small', 'Small to big'], ans: 1 },
    { q: 'A clinical thermometer reads temperatures from:', options: ['0°C to 100°C', '35°C to 42°C', '-10°C to 110°C', '30°C to 50°C'], ans: 1 },
    { q: 'Transfer of heat without any medium is called:', options: ['Conduction', 'Convection', 'Radiation', 'Absorption'], ans: 2 },
    { q: 'Metals are good ___ of heat', options: ['Insulators', 'Conductors', 'Radiators', 'Absorbers'], ans: 1 },
    { q: 'Woollen clothes keep us warm because wool is a:', options: ['Conductor', 'Radiator', 'Good insulator', 'Metal'], ans: 2 },
    { q: 'Land heats up ___ than water', options: ['Slower', 'Faster', 'At the same rate', 'Never'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Acids, Bases and Salts', questions: [
    { q: 'Lemon juice is:', options: ['Acidic', 'Basic', 'Neutral', 'Salty'], ans: 0 },
    { q: 'Soap solution is:', options: ['Acidic', 'Basic', 'Neutral', 'Salty'], ans: 1 },
    { q: 'Litmus paper is obtained from:', options: ['A plant', 'A mineral', 'Lichens', 'Bacteria'], ans: 2 },
    { q: 'Acid + Base → Salt + ___', options: ['Acid', 'Base', 'Water', 'Gas'], ans: 2 },
    { q: 'Turmeric is a ___ indicator', options: ['Synthetic', 'Natural', 'Chemical', 'Artificial'], ans: 1 },
    { q: 'A neutral solution has pH:', options: ['0', '3', '7', '14'], ans: 2 },
    { q: 'Ant bite causes pain because ants inject:', options: ['Acetic acid', 'Formic acid', 'Citric acid', 'Hydrochloric acid'], ans: 1 }
  ]});

  // Class 8 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Linear Equations in One Variable', questions: [
    { q: 'Solve: 2x - 5 = 3x + 1', options: ['-6', '-4', '4', '6'], ans: 0 },
    { q: 'Solve: 5(x - 2) = 3x + 6', options: ['4', '6', '8', '10'], ans: 2 },
    { q: 'If 3x + 7 = 22, then x = ?', options: ['3', '5', '7', '15'], ans: 1 },
    { q: 'Solve: (x + 3)/4 = 5', options: ['13', '17', '20', '23'], ans: 1 },
    { q: 'Solve: 7x - 3 = 4x + 9', options: ['2', '3', '4', '6'], ans: 2 },
    { q: 'A linear equation has the highest power of the variable as:', options: ['0', '1', '2', '3'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Algebraic Expressions and Identities', questions: [
    { q: '(a + b)² = ?', options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', '2a² + 2b²'], ans: 1 },
    { q: '(a - b)² = ?', options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', 'a² - b²'], ans: 2 },
    { q: '(a + b)(a - b) = ?', options: ['a² + b²', 'a² - b²', '2ab', 'a² + 2ab + b²'], ans: 1 },
    { q: 'Expand: (x + 3)²', options: ['x² + 6', 'x² + 9', 'x² + 3x + 9', 'x² + 6x + 9'], ans: 3 },
    { q: '(2x + 5)(2x - 5) = ?', options: ['4x² - 25', '4x² + 25', '4x² - 10x + 25', '2x² - 25'], ans: 0 },
    { q: 'How many terms in 3x²y + 5xy² - 7?', options: ['1', '2', '3', '4'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Mensuration', questions: [
    { q: 'Volume of a cuboid = ?', options: ['l + b + h', 'l × b × h', '2(lb + bh + lh)', 'l × b'], ans: 1 },
    { q: 'Surface area of a cube with side 3 cm is:', options: ['9 cm²', '18 cm²', '27 cm²', '54 cm²'], ans: 3 },
    { q: 'Area of a trapezium = ?', options: ['½(a+b)×h', 'a×b×h', '(a+b)×h', '½×a×b'], ans: 0 },
    { q: 'Volume of a cylinder = ?', options: ['2πrh', 'πr²h', 'πr²', '2πr²h'], ans: 1 },
    { q: 'Total surface area of a cylinder = ?', options: ['2πrh', 'πr²h', '2πr(r+h)', '2πr²'], ans: 2 },
    { q: 'Volume of a cube with side 4 cm is:', options: ['16 cm³', '48 cm³', '64 cm³', '96 cm³'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Microorganisms: Friend and Foe', questions: [
    { q: 'Which of these is a microorganism?', options: ['Ant', 'Bacteria', 'Spider', 'Frog'], ans: 1 },
    { q: 'Yeast is used to make:', options: ['Salt', 'Bread', 'Spices', 'Oil'], ans: 1 },
    { q: 'Antibiotics were discovered by:', options: ['Louis Pasteur', 'Alexander Fleming', 'Edward Jenner', 'Robert Koch'], ans: 1 },
    { q: 'Pasteurization is a process to preserve:', options: ['Bread', 'Milk', 'Meat', 'Vegetables'], ans: 1 },
    { q: 'Virus can reproduce only inside:', options: ['Water', 'Soil', 'A living cell', 'Air'], ans: 2 },
    { q: 'The first vaccine was developed for:', options: ['Cholera', 'Smallpox', 'Typhoid', 'Malaria'], ans: 1 },
    { q: 'Nitrogen-fixing bacteria are found in roots of:', options: ['Rose', 'Mango', 'Leguminous plants', 'Grass'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Force and Pressure', questions: [
    { q: 'A push or pull on an object is called:', options: ['Energy', 'Force', 'Pressure', 'Work'], ans: 1 },
    { q: 'Gravity is a ___ force', options: ['Contact', 'Non-contact', 'Muscular', 'Frictional'], ans: 1 },
    { q: 'Pressure = ?', options: ['Force × Area', 'Force / Area', 'Force + Area', 'Force - Area'], ans: 1 },
    { q: 'Atmospheric pressure is caused by:', options: ['Gravity', 'Weight of air', 'Wind', 'Rain'], ans: 1 },
    { q: 'A sharp knife cuts better because it has:', options: ['More area', 'Less area', 'More weight', 'More handle'], ans: 1 },
    { q: 'Magnetic force is a ___ force', options: ['Contact', 'Non-contact', 'Muscular', 'Frictional'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Sound', questions: [
    { q: 'Sound is produced by:', options: ['Light', 'Vibration', 'Heat', 'Colour'], ans: 1 },
    { q: 'Sound cannot travel through:', options: ['Air', 'Water', 'Vacuum', 'Steel'], ans: 2 },
    { q: 'The unit of frequency is:', options: ['Metre', 'Second', 'Hertz', 'Decibel'], ans: 2 },
    { q: 'Humans can hear sounds of frequency:', options: ['Below 20 Hz', '20 Hz to 20,000 Hz', 'Above 20,000 Hz', 'All frequencies'], ans: 1 },
    { q: 'Sounds above 20,000 Hz are called:', options: ['Infrasonic', 'Ultrasonic', 'Audible', 'Musical'], ans: 1 },
    { q: 'Noise pollution can cause:', options: ['Better hearing', 'Hearing loss', 'Improved sleep', 'Better focus'], ans: 1 },
    { q: 'The loudness of sound is measured in:', options: ['Hertz', 'Metres', 'Decibels', 'Joules'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Light', questions: [
    { q: 'The angle of incidence equals the angle of ___', options: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'], ans: 1 },
    { q: 'A kaleidoscope uses:', options: ['Lenses', 'Prisms', 'Mirrors', 'Magnets'], ans: 2 },
    { q: 'Braille system is used by:', options: ['Deaf people', 'Visually impaired people', 'Mute people', 'Everyone'], ans: 1 },
    { q: 'White light is made up of ___ colours', options: ['3', '5', '7', '12'], ans: 2 },
    { q: 'Regular reflection happens on ___ surfaces', options: ['Rough', 'Smooth', 'Curved', 'Broken'], ans: 1 },
    { q: 'The image formed by a plane mirror is:', options: ['Inverted', 'Magnified', 'Laterally inverted', 'Diminished'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The Indian Constitution', questions: [
    { q: 'The Indian Constitution came into effect on:', options: ['15 Aug 1947', '26 Jan 1950', '26 Nov 1949', '2 Oct 1950'], ans: 1 },
    { q: 'The Preamble starts with:', options: ['We, the citizens', 'We, the people', 'We, the government', 'We, the nation'], ans: 1 },
    { q: 'How many Fundamental Rights are there?', options: ['4', '5', '6', '7'], ans: 2 },
    { q: 'Right to Education is a:', options: ['Fundamental Right', 'Directive Principle', 'Fundamental Duty', 'Statutory Right'], ans: 0 },
    { q: 'Who is known as the Father of the Indian Constitution?', options: ['Gandhi', 'Nehru', 'Ambedkar', 'Patel'], ans: 2 },
    { q: 'The Constitution guarantees equality before ___', options: ['God', 'Society', 'Law', 'Parliament'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'When People Rebel — 1857 and After', questions: [
    { q: 'The Revolt of 1857 started from:', options: ['Delhi', 'Meerut', 'Lucknow', 'Kanpur'], ans: 1 },
    { q: 'The immediate cause of the 1857 revolt was:', options: ['Heavy taxes', 'Greased cartridges', 'Land grabbing', 'Religious conversion'], ans: 1 },
    { q: 'Who led the revolt in Jhansi?', options: ['Nana Saheb', 'Rani Laxmibai', 'Bahadur Shah', 'Tantia Tope'], ans: 1 },
    { q: 'Bahadur Shah Zafar was the last ___ emperor', options: ['British', 'Maratha', 'Mughal', 'Sikh'], ans: 2 },
    { q: 'After 1857, India was governed directly by the:', options: ['East India Company', 'British Crown', 'Indian leaders', 'French'], ans: 1 },
    { q: 'The revolt of 1857 is also called:', options: ['French Revolution', 'Sepoy Mutiny', 'Quit India', 'Civil War'], ans: 1 }
  ]});
