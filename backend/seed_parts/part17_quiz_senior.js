
  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 11–12
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 11–12...');

  // Class 11 Physics
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Units and Measurements', questions: [
    { q: 'The SI unit of luminous intensity is:', options: ['Lumen', 'Candela', 'Lux', 'Watt'], ans: 1 },
    { q: 'Dimensional formula of force is:', options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻²]', '[M²LT⁻²]'], ans: 1 },
    { q: 'Number of significant figures in 0.0045 is:', options: ['1', '2', '3', '4'], ans: 1 },
    { q: '1 parsec = ?', options: ['3.26 light years', '1 AU', '1 km', '3.08 × 10¹⁶ m'], ans: 3 },
    { q: 'The principle of homogeneity of dimensions states:', options: ['All terms must have same units', 'All terms must have same dimensions', 'All terms must be equal', 'Dimensions can be different'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Laws of Motion', questions: [
    { q: 'A body of mass 5 kg is acted upon by a force of 10 N. The acceleration is:', options: ['2 m/s²', '5 m/s²', '10 m/s²', '50 m/s²'], ans: 0 },
    { q: 'In a tug of war, the rope does not accelerate because:', options: ['No force acts', 'Forces are unbalanced', 'Forces are balanced', 'Friction is zero'], ans: 2 },
    { q: 'The coefficient of static friction is generally ___ kinetic friction', options: ['Less than', 'Equal to', 'Greater than', 'Half of'], ans: 2 },
    { q: 'A person in a lift feels heavier when lift accelerates:', options: ['Downward', 'Upward', 'Horizontally', 'At constant speed'], ans: 1 },
    { q: 'Banking of roads helps in providing:', options: ['Friction', 'Centripetal force', 'Gravitational force', 'Magnetic force'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Thermodynamics', questions: [
    { q: 'In an isothermal process, the temperature:', options: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'], ans: 2 },
    { q: 'The efficiency of a Carnot engine depends on:', options: ['Working substance', 'Temperature of source and sink', 'Pressure', 'Volume'], ans: 1 },
    { q: 'The first law of thermodynamics is a statement of:', options: ['Conservation of mass', 'Conservation of energy', 'Conservation of momentum', 'Entropy'], ans: 1 },
    { q: 'In an adiabatic process:', options: ['ΔQ = 0', 'ΔW = 0', 'ΔU = 0', 'ΔT = 0'], ans: 0 },
    { q: 'Entropy of the universe always:', options: ['Decreases', 'Remains constant', 'Increases', 'Oscillates'], ans: 2 }
  ]});

  // Class 11 Chemistry
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Some Basic Concepts of Chemistry', questions: [
    { q: 'The number of moles in 36g of water is:', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Avogadro\'s number is:', options: ['6.022 × 10²³', '6.022 × 10²²', '3.011 × 10²³', '1.6 × 10⁻¹⁹'], ans: 0 },
    { q: 'Molarity is defined as moles of solute per:', options: ['kg of solvent', 'litre of solution', 'litre of solvent', 'g of solution'], ans: 1 },
    { q: 'The law of definite proportions was given by:', options: ['Dalton', 'Proust', 'Lavoisier', 'Avogadro'], ans: 1 },
    { q: 'Empirical formula of glucose (C₆H₁₂O₆) is:', options: ['C₆H₁₂O₆', 'CH₂O', 'C₃H₆O₃', 'CHO'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Chemical Bonding and Molecular Structure', questions: [
    { q: 'The shape of methane (CH₄) is:', options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Square planar'], ans: 2 },
    { q: 'Hybridization of carbon in ethene is:', options: ['sp', 'sp²', 'sp³', 'sp³d'], ans: 1 },
    { q: 'A sigma bond is formed by:', options: ['Lateral overlap', 'Head-on overlap', 'No overlap', 'Sidewise overlap'], ans: 1 },
    { q: 'The bond angle in water molecule is about:', options: ['90°', '104.5°', '109.5°', '120°'], ans: 1 },
    { q: 'Ionic bonds are formed between:', options: ['Two metals', 'Two non-metals', 'Metal and non-metal', 'Noble gases'], ans: 2 }
  ]});

  // Class 11 Biology
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Cell: The Unit of Life', questions: [
    { q: 'The fluid mosaic model of cell membrane was proposed by:', options: ['Robert Hooke', 'Singer and Nicolson', 'Watson and Crick', 'Schleiden'], ans: 1 },
    { q: 'Ribosomes are the site of:', options: ['Respiration', 'Protein synthesis', 'Photosynthesis', 'Lipid synthesis'], ans: 1 },
    { q: 'The Golgi apparatus was discovered by:', options: ['Robert Brown', 'Camillo Golgi', 'Robert Hooke', 'Schleiden'], ans: 1 },
    { q: 'Which organelle is absent in animal cells?', options: ['Mitochondria', 'Plastids', 'Ribosomes', 'Nucleus'], ans: 1 },
    { q: 'The cell wall in plants is made of:', options: ['Protein', 'Lipids', 'Cellulose', 'Starch'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Photosynthesis in Higher Plants', questions: [
    { q: 'The light reaction of photosynthesis occurs in:', options: ['Stroma', 'Thylakoid', 'Cytoplasm', 'Nucleus'], ans: 1 },
    { q: 'The enzyme that fixes CO₂ in C3 plants is:', options: ['PEPcase', 'RuBisCO', 'ATP synthase', 'Kinase'], ans: 1 },
    { q: 'PS I has its reaction centre at:', options: ['P680', 'P700', 'P600', 'P720'], ans: 1 },
    { q: 'In C4 plants, the first stable product is:', options: ['PGA', 'OAA', 'RuBP', 'G3P'], ans: 1 },
    { q: 'The dark reactions occur in:', options: ['Thylakoid', 'Stroma', 'Cell membrane', 'Cytoplasm'], ans: 1 }
  ]});

  // Class 12 Physics
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Electric Charges and Fields', questions: [
    { q: 'Coulomb\'s law is analogous to:', options: ['Newton\'s law of gravitation', 'Ohm\'s law', 'Faraday\'s law', 'Ampere\'s law'], ans: 0 },
    { q: 'The SI unit of electric field is:', options: ['V', 'N/C', 'C/m', 'J/C'], ans: 1 },
    { q: 'Electric field lines never:', options: ['Start from positive charge', 'End at negative charge', 'Cross each other', 'Curve'], ans: 2 },
    { q: 'The total electric flux through a closed surface with charge q inside is:', options: ['q/ε₀', 'qε₀', 'q²/ε₀', '0'], ans: 0 },
    { q: 'Like charges:', options: ['Attract', 'Repel', 'Have no effect', 'Neutralize'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Current Electricity', questions: [
    { q: 'The resistance of a wire is directly proportional to its:', options: ['Area', 'Length', 'Temperature only', 'Current'], ans: 1 },
    { q: 'Kirchhoff\'s junction rule is based on conservation of:', options: ['Energy', 'Charge', 'Momentum', 'Mass'], ans: 1 },
    { q: 'In a Wheatstone bridge at balance:', options: ['Current is zero', 'Galvanometer shows zero', 'Voltage is maximum', 'Resistance is zero'], ans: 1 },
    { q: 'The internal resistance of an ideal battery is:', options: ['Infinite', 'Very high', 'Zero', '1 Ohm'], ans: 2 },
    { q: 'Drift velocity is proportional to:', options: ['Electric field', 'Resistance', 'Temperature', 'Cross section area'], ans: 0 }
  ]});

  // Class 12 Chemistry
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Solutions', questions: [
    { q: 'Raoult\'s law is obeyed by:', options: ['Real solutions', 'Ideal solutions', 'All solutions', 'Colloidal solutions'], ans: 1 },
    { q: 'Molality is expressed as:', options: ['mol/L', 'mol/kg', 'g/L', 'g/mol'], ans: 1 },
    { q: 'The elevation in boiling point is a ___ property', options: ['Colligative', 'Additive', 'Constitutive', 'Extensive'], ans: 0 },
    { q: 'Osmotic pressure (π) = ?', options: ['nRT', 'CRT', 'PV', 'nR/T'], ans: 1 },
    { q: 'Henry\'s law relates to:', options: ['Solubility of gas in liquid', 'Boiling point', 'Freezing point', 'Vapour pressure'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Electrochemistry', questions: [
    { q: 'In a galvanic cell, oxidation occurs at:', options: ['Cathode', 'Anode', 'Salt bridge', 'Electrolyte'], ans: 1 },
    { q: 'The Nernst equation relates EMF to:', options: ['Temperature only', 'Concentration of reactants and products', 'Pressure only', 'Volume'], ans: 1 },
    { q: 'The SI unit of molar conductivity is:', options: ['S m² mol⁻¹', 'S cm⁻¹', 'Ω m', 'S/m'], ans: 0 },
    { q: 'Rusting of iron is an example of:', options: ['Chemical corrosion', 'Electrochemical corrosion', 'Erosion', 'Physical change'], ans: 1 },
    { q: 'Faraday\'s first law relates mass deposited to:', options: ['Voltage', 'Resistance', 'Quantity of charge', 'Temperature'], ans: 2 }
  ]});

  // Class 12 Biology
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Molecular Basis of Inheritance', questions: [
    { q: 'DNA replication is:', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Random'], ans: 1 },
    { q: 'The central dogma of molecular biology is:', options: ['DNA→RNA→Protein', 'RNA→DNA→Protein', 'Protein→RNA→DNA', 'DNA→Protein→RNA'], ans: 0 },
    { q: 'The genetic code is:', options: ['Doublet', 'Triplet', 'Quadruplet', 'Singlet'], ans: 1 },
    { q: 'The enzyme that synthesizes DNA from DNA template is:', options: ['RNA polymerase', 'DNA polymerase', 'Ligase', 'Helicase'], ans: 1 },
    { q: 'HGP stands for:', options: ['Human Gene Project', 'Human Genome Project', 'Human Genetic Program', 'Higher Genome Pattern'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Biotechnology: Principles and Processes', questions: [
    { q: 'The "molecular scissors" used in rDNA technology are:', options: ['Ligases', 'Restriction enzymes', 'Polymerases', 'Helicases'], ans: 1 },
    { q: 'PCR stands for:', options: ['Protein Chain Reaction', 'Polymerase Chain Reaction', 'Plasmid Copy Reaction', 'Primer Chain Recombination'], ans: 1 },
    { q: 'pBR322 is a:', options: ['Gene', 'Cloning vector', 'Host organism', 'Restriction enzyme'], ans: 1 },
    { q: 'Gel electrophoresis separates DNA fragments by:', options: ['Colour', 'Size', 'Shape', 'Charge only'], ans: 1 },
    { q: 'The bacterium commonly used in genetic engineering is:', options: ['Bacillus', 'E. coli', 'Streptococcus', 'Staphylococcus'], ans: 1 }
  ]});

  // Class 12 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Relations and Functions', questions: [
    { q: 'A relation that is reflexive, symmetric, and transitive is:', options: ['Partial order', 'Equivalence relation', 'Function', 'Total order'], ans: 1 },
    { q: 'A function f: A→B is onto if:', options: ['f is one-one', 'Range of f = B', 'A = B', 'f is constant'], ans: 1 },
    { q: 'The number of equivalence relations on {1,2,3} is:', options: ['3', '5', '8', '15'], ans: 1 },
    { q: 'If f(x) = x² and g(x) = √x, then (gof)(4) = ?', options: ['2', '4', '16', '8'], ans: 1 },
    { q: 'An injective function is also called:', options: ['Onto', 'One-one', 'Bijective', 'Surjective'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Probability', questions: [
    { q: 'If P(A) = 0.4 and P(B) = 0.5 and A, B are independent, then P(A∩B) = ?', options: ['0.2', '0.9', '0.1', '0.45'], ans: 0 },
    { q: 'Bayes\' theorem is used when:', options: ['Events are impossible', 'Prior probabilities are known', 'All events are independent', 'Only one event exists'], ans: 1 },
    { q: 'For a binomial distribution, the mean is:', options: ['np', 'npq', '√npq', 'n/p'], ans: 0 },
    { q: 'P(A|B) = P(A∩B) / ?', options: ['P(A)', 'P(B)', 'P(A∪B)', '1'], ans: 1 },
    { q: 'If X follows B(n,p), the variance is:', options: ['np', 'npq', 'nq', 'p/n'], ans: 1 }
  ]});

  console.log('✅ All quiz data seeded!');
