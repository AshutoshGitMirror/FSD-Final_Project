
  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 9-10 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 9–10...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Coordinate Geometry', questions: [
    { q: 'The point (0, 0) is called the:', options: ['Vertex', 'Origin', 'Centre', 'Mid-point'], ans: 1 },
    { q: 'The point (3, -2) lies in quadrant:', options: ['I', 'II', 'III', 'IV'], ans: 3 },
    { q: 'The x-coordinate of a point on the y-axis is:', options: ['1', '-1', '0', 'Undefined'], ans: 2 },
    { q: 'The abscissa of point (5, 7) is:', options: ['5', '7', '12', '35'], ans: 0 },
    { q: 'Point (-4, -3) lies in which quadrant?', options: ['I', 'II', 'III', 'IV'], ans: 2 },
    { q: 'The ordinate of point (2, 9) is:', options: ['2', '9', '11', '18'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Linear Equations in Two Variables', questions: [
    { q: 'The equation y = 2x + 3 passes through:', options: ['(0, 3)', '(3, 0)', '(1, 1)', '(0, 0)'], ans: 0 },
    { q: 'A linear equation in two variables has ___ solutions', options: ['One', 'Two', 'No', 'Infinitely many'], ans: 3 },
    { q: 'The graph of x = 5 is a line parallel to:', options: ['x-axis', 'y-axis', 'Both axes', 'Neither axis'], ans: 1 },
    { q: 'The graph of y = 0 represents the:', options: ['y-axis', 'x-axis', 'Origin', 'A point'], ans: 1 },
    { q: 'If 2x + 3y = 12, when x = 0, y = ?', options: ['2', '3', '4', '6'], ans: 2 },
    { q: 'The standard form of a linear equation is:', options: ['y = mx + c', 'ax + by + c = 0', 'x + y = 0', 'ax² + bx + c = 0'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Heron\'s Formula', questions: [
    { q: 'Heron\'s formula gives the area of a:', options: ['Circle', 'Rectangle', 'Triangle', 'Square'], ans: 2 },
    { q: 'In Heron\'s formula, s stands for:', options: ['Side', 'Sum', 'Semi-perimeter', 'Square'], ans: 2 },
    { q: 'If sides of a triangle are 3, 4, 5, then s = ?', options: ['4', '5', '6', '12'], ans: 2 },
    { q: 'For a triangle with sides 3, 4, 5, area = ?', options: ['6', '10', '12', '20'], ans: 0 },
    { q: 'Heron\'s formula is: Area = √(s(s-a)(s-b)(s-c)). What is s?', options: ['a+b+c', '(a+b+c)/2', '(a+b+c)/3', 'a×b×c'], ans: 1 },
    { q: 'An equilateral triangle with side 6 cm has s = ?', options: ['6', '9', '12', '18'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Structure of the Atom', questions: [
    { q: 'Who discovered the electron?', options: ['Rutherford', 'J.J. Thomson', 'Bohr', 'Chadwick'], ans: 1 },
    { q: 'Neutrons were discovered by:', options: ['Thomson', 'Rutherford', 'Chadwick', 'Bohr'], ans: 2 },
    { q: 'In Rutherford\'s gold foil experiment, most alpha particles:', options: ['Were deflected', 'Were absorbed', 'Passed through', 'Bounced back'], ans: 2 },
    { q: 'The atomic number = number of:', options: ['Neutrons', 'Protons', 'Electrons + Neutrons', 'Protons + Neutrons'], ans: 1 },
    { q: 'Mass number = protons + ___', options: ['Electrons', 'Neutrons', 'Photons', 'Positrons'], ans: 1 },
    { q: 'Isotopes have same ___ but different ___', options: ['Mass number, atomic number', 'Atomic number, mass number', 'Electrons, protons', 'Protons, electrons'], ans: 1 },
    { q: 'Maximum electrons in the 2nd shell:', options: ['2', '8', '18', '32'], ans: 1 },
    { q: 'The valency of sodium (Na, Z=11) is:', options: ['1', '2', '3', '8'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'The Fundamental Unit of Life', questions: [
    { q: 'Who discovered cells?', options: ['Leeuwenhoek', 'Robert Hooke', 'Schleiden', 'Schwann'], ans: 1 },
    { q: 'The cell membrane is:', options: ['Fully permeable', 'Selectively permeable', 'Impermeable', 'Only found in plants'], ans: 1 },
    { q: 'The jelly-like substance inside the cell is:', options: ['Nucleus', 'Cytoplasm', 'Vacuole', 'Chloroplast'], ans: 1 },
    { q: 'Which organelle is called the "suicide bag"?', options: ['Mitochondria', 'Lysosome', 'Ribosome', 'Golgi body'], ans: 1 },
    { q: 'Chromosomes are found in the:', options: ['Cell wall', 'Cytoplasm', 'Nucleus', 'Vacuole'], ans: 2 },
    { q: 'Prokaryotic cells lack a:', options: ['Cell membrane', 'Ribosome', 'Well-defined nucleus', 'DNA'], ans: 2 },
    { q: 'Osmosis is the movement of ___ through a semi-permeable membrane', options: ['Solute', 'Air', 'Water', 'Food'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Gravitation', questions: [
    { q: 'The value of g on Earth is approximately:', options: ['6.67 m/s²', '9.8 m/s²', '10.8 m/s²', '3.14 m/s²'], ans: 1 },
    { q: 'Weight = mass × ___', options: ['Velocity', 'Acceleration due to gravity', 'Height', 'Speed'], ans: 1 },
    { q: 'The SI unit of weight is:', options: ['kg', 'Newton', 'Joule', 'Watt'], ans: 1 },
    { q: 'Mass of an object on Moon is ___ its mass on Earth', options: ['Less than', 'More than', 'Same as', '1/6 of'], ans: 2 },
    { q: 'Weight on Moon is ___ of weight on Earth', options: ['1/2', '1/4', '1/6', '1/10'], ans: 2 },
    { q: 'Gravitational force is ___ proportional to distance²', options: ['Directly', 'Inversely', 'Not', 'Exponentially'], ans: 1 },
    { q: 'In free fall, all objects have ___ acceleration', options: ['Zero', 'Different', 'Same', 'Increasing'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Work and Energy', questions: [
    { q: 'Work = Force × ___', options: ['Time', 'Mass', 'Displacement', 'Velocity'], ans: 2 },
    { q: 'The SI unit of work is:', options: ['Newton', 'Watt', 'Joule', 'Pascal'], ans: 2 },
    { q: 'Kinetic energy = ?', options: ['½mv', '½mv²', 'mgh', 'Fd'], ans: 1 },
    { q: 'Potential energy = ?', options: ['½mv²', 'mgh', 'Fd', 'mv'], ans: 1 },
    { q: 'Power = Work / ___', options: ['Force', 'Distance', 'Time', 'Mass'], ans: 2 },
    { q: 'The SI unit of power is:', options: ['Joule', 'Newton', 'Watt', 'Pascal'], ans: 2 },
    { q: '1 kWh = ___ Joules', options: ['1000', '3600', '3.6 × 10⁶', '36 × 10⁶'], ans: 2 }
  ]});

  // Class 10 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Pair of Linear Equations in Two Variables', questions: [
    { q: 'A pair of linear equations is consistent if it has:', options: ['No solution', 'At least one solution', 'Exactly two solutions', 'Infinite solutions only'], ans: 1 },
    { q: 'Parallel lines have ___ solution(s)', options: ['One', 'No', 'Infinite', 'Two'], ans: 1 },
    { q: 'Coincident lines have ___ solution(s)', options: ['One', 'No', 'Infinite', 'Two'], ans: 2 },
    { q: 'Intersecting lines have ___ solution(s)', options: ['One unique', 'No', 'Infinite', 'Two'], ans: 0 },
    { q: 'For the system a₁x + b₁y = c₁ and a₂x + b₂y = c₂, if a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are:', options: ['Intersecting', 'Parallel', 'Coincident', 'Perpendicular'], ans: 1 },
    { q: 'Solve by elimination: x + y = 5 and x - y = 1. x = ?', options: ['2', '3', '4', '5'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Arithmetic Progressions', questions: [
    { q: 'In the AP 2, 5, 8, 11..., the common difference is:', options: ['2', '3', '5', '8'], ans: 1 },
    { q: 'The 10th term of the AP 3, 7, 11, 15... is:', options: ['35', '39', '43', '47'], ans: 1 },
    { q: 'The formula for nth term is:', options: ['a + nd', 'a + (n-1)d', 'a × n × d', 'a × (n-1)d'], ans: 1 },
    { q: 'Sum of first n terms: Sₙ = ?', options: ['n/2 × (a + l)', 'n × (a + l)', 'n/2 × d', 'n × a × d'], ans: 0 },
    { q: 'Is 101 a term in the AP 1, 4, 7, 10...?', options: ['Yes, it\'s the 34th term', 'No', 'Yes, it\'s the 33rd term', 'Yes, it\'s the 35th term'], ans: 0 },
    { q: 'Sum of first 10 natural numbers:', options: ['45', '50', '55', '100'], ans: 2 },
    { q: 'If a = 5, d = 3, n = 20, then the 20th term is:', options: ['57', '60', '62', '65'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Triangles', questions: [
    { q: 'If two triangles are similar, their corresponding angles are:', options: ['Different', 'Equal', 'Supplementary', 'Complementary'], ans: 1 },
    { q: 'BPT stands for:', options: ['Basic Proportionality Theorem', 'Base Point Theorem', 'Bisector Property Theorem', 'Basic Parallel Theorem'], ans: 0 },
    { q: 'In ΔABC, if DE ∥ BC and AD/DB = 2/3, then AE/EC = ?', options: ['3/2', '2/3', '2/5', '3/5'], ans: 1 },
    { q: 'Pythagorean theorem: c² = ?', options: ['a + b', 'a² - b²', 'a² + b²', '2ab'], ans: 2 },
    { q: 'In a right triangle with legs 6 and 8, the hypotenuse is:', options: ['7', '10', '14', '48'], ans: 1 },
    { q: 'AA similarity criterion needs:', options: ['Two equal angles', 'Two equal sides', 'Three equal angles', 'One equal side'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Circles', questions: [
    { q: 'A tangent to a circle touches it at ___ point(s)', options: ['0', '1', '2', 'Infinite'], ans: 1 },
    { q: 'The tangent at any point is ___ to the radius at that point', options: ['Parallel', 'Perpendicular', 'Equal', 'Opposite'], ans: 1 },
    { q: 'From an external point, ___ tangent(s) can be drawn to a circle', options: ['0', '1', '2', '3'], ans: 2 },
    { q: 'Lengths of tangents from an external point are:', options: ['Different', 'Equal', 'Zero', 'Infinite'], ans: 1 },
    { q: 'A secant intersects a circle at ___ points', options: ['0', '1', '2', '3'], ans: 2 },
    { q: 'The angle between a tangent and a radius at the point of tangency is:', options: ['0°', '45°', '90°', '180°'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Carbon and its Compounds', questions: [
    { q: 'Carbon has ___ valence electrons', options: ['1', '2', '4', '6'], ans: 2 },
    { q: 'The bonds in diamond are:', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], ans: 1 },
    { q: 'The functional group -OH is called:', options: ['Aldehyde', 'Ketone', 'Alcohol', 'Carboxylic acid'], ans: 2 },
    { q: 'Methane (CH₄) has ___ covalent bonds', options: ['1', '2', '3', '4'], ans: 3 },
    { q: 'Ethanol is used as:', options: ['Fuel and solvent', 'Food', 'Medicine only', 'Fertilizer'], ans: 0 },
    { q: 'The general formula for alkanes is:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], ans: 1 },
    { q: 'Soaps are sodium or potassium salts of:', options: ['Mineral acids', 'Fatty acids', 'Amino acids', 'Nucleic acids'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Metals and Non-Metals', questions: [
    { q: 'Most metals are:', options: ['Soft', 'Hard and lustrous', 'Gaseous', 'Transparent'], ans: 1 },
    { q: 'The most reactive metal is:', options: ['Gold', 'Iron', 'Potassium', 'Copper'], ans: 2 },
    { q: 'Metals are good conductors of:', options: ['Heat only', 'Electricity only', 'Heat and electricity', 'Neither'], ans: 2 },
    { q: 'Gold and platinum are called noble metals because they:', options: ['Are expensive', 'Are shiny', 'Do not corrode easily', 'Are heavy'], ans: 2 },
    { q: 'Ionic compounds have ___ melting points', options: ['Low', 'High', 'Zero', 'Variable'], ans: 1 },
    { q: 'The ore of aluminium is:', options: ['Haematite', 'Bauxite', 'Galena', 'Cinnabar'], ans: 1 },
    { q: 'Corrosion of iron is called:', options: ['Tarnishing', 'Rusting', 'Galvanization', 'Anodising'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Heredity and Evolution', questions: [
    { q: 'The father of genetics is:', options: ['Darwin', 'Mendel', 'Lamarck', 'Watson'], ans: 1 },
    { q: 'Genes are located on:', options: ['Cell wall', 'Cytoplasm', 'Chromosomes', 'Cell membrane'], ans: 2 },
    { q: 'In Mendel\'s cross TT × tt, all F1 offspring are:', options: ['TT', 'tt', 'Tt', 'T or t'], ans: 2 },
    { q: 'The phenotypic ratio in F2 of a monohybrid cross is:', options: ['1:1', '1:2:1', '3:1', '9:3:3:1'], ans: 2 },
    { q: 'Sex in humans is determined by:', options: ['X chromosome of mother', 'Y chromosome of father', 'Autosome', 'Random'], ans: 1 },
    { q: 'Evolution is based on:', options: ['Use and disuse', 'Natural selection', 'Mutation only', 'Lamarckism'], ans: 1 },
    { q: 'Homologous organs have similar ___ but different ___', options: ['Function, structure', 'Structure, function', 'Size, shape', 'Colour, size'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Magnetic Effects of Electric Current', questions: [
    { q: 'A compass needle is a:', options: ['Permanent magnet', 'Electromagnet', 'Conductor', 'Insulator'], ans: 0 },
    { q: 'Oersted discovered that electricity produces:', options: ['Light', 'Sound', 'Magnetism', 'Heat only'], ans: 2 },
    { q: 'Fleming\'s Left Hand Rule is used for:', options: ['Generators', 'Motors', 'Transformers', 'Batteries'], ans: 1 },
    { q: 'An electric motor converts:', options: ['Mechanical to electrical', 'Electrical to mechanical', 'Chemical to electrical', 'Electrical to chemical'], ans: 1 },
    { q: 'A generator converts:', options: ['Mechanical to electrical', 'Electrical to mechanical', 'Chemical to electrical', 'Electrical to chemical'], ans: 0 },
    { q: 'The domestic supply in India is ___ Hz', options: ['50', '60', '100', '220'], ans: 0 },
    { q: 'A fuse wire has ___ melting point and ___ resistance', options: ['High, low', 'Low, high', 'High, high', 'Low, low'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The Rise of Nationalism in Europe', questions: [
    { q: 'Who unified Germany?', options: ['Garibaldi', 'Mazzini', 'Bismarck', 'Napoleon'], ans: 2 },
    { q: 'The unification of Italy was completed in:', options: ['1850', '1861', '1871', '1890'], ans: 1 },
    { q: 'The concept of "nation-states" emerged in:', options: ['15th century', '17th century', '19th century', '20th century'], ans: 2 },
    { q: 'The French Revolution occurred in:', options: ['1776', '1789', '1848', '1871'], ans: 1 },
    { q: 'Garibaldi was associated with the unification of:', options: ['Germany', 'France', 'Italy', 'Poland'], ans: 2 },
    { q: 'The Vienna Congress was held in:', options: ['1800', '1815', '1848', '1870'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Federalism', questions: [
    { q: 'In a federal system, power is divided between:', options: ['Two parties', 'Three parties', 'Central and state governments', 'People and government'], ans: 2 },
    { q: 'India is a ___ type of federation', options: ['Coming together', 'Holding together', 'Military', 'Unitary'], ans: 1 },
    { q: 'How many states does India currently have?', options: ['25', '28', '29', '36'], ans: 1 },
    { q: 'Panchayati Raj is a system of:', options: ['Central government', 'State government', 'Local self-government', 'Military government'], ans: 2 },
    { q: 'The Concurrent List contains subjects on which ___ can make laws', options: ['Only Centre', 'Only State', 'Both Centre and State', 'Neither'], ans: 2 },
    { q: 'Defence is in the ___ List', options: ['Union', 'State', 'Concurrent', 'Residuary'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Money and Credit', questions: [
    { q: 'The modern form of money includes:', options: ['Gold coins', 'Currency notes and coins', 'Barter goods', 'Salt'], ans: 1 },
    { q: 'In India, currency is issued by:', options: ['SBI', 'RBI', 'Finance Ministry', 'Prime Minister'], ans: 1 },
    { q: 'A bank charges a higher interest on ___ than it pays on ___', options: ['Deposits, loans', 'Loans, deposits', 'Both same', 'Neither'], ans: 1 },
    { q: 'SHG stands for:', options: ['State Help Group', 'Self Help Group', 'Social Help Group', 'Small Help Group'], ans: 1 },
    { q: 'Collateral is:', options: ['A type of loan', 'An asset pledged against a loan', 'A bank account', 'A credit card'], ans: 1 },
    { q: 'Which is a formal source of credit?', options: ['Moneylender', 'Bank', 'Employer', 'Relative'], ans: 1 }
  ]});
