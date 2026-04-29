
  // ═══════════════════════════════════════════════════════════
  // KNOWLEDGE GRAPH SEED DATA
  // ═══════════════════════════════════════════════════════════
  console.log('🧠 Seeding Knowledge Graphs...');

  // Class 10 Mathematics Knowledge Graph
  await upsertGraph({
    subjectName: 'Mathematics', std: 10, board: BOARD,
    nodes: [
      { chapterName: 'Real Numbers', concepts: ['Euclid\'s Division Lemma', 'Fundamental Theorem of Arithmetic', 'HCF and LCM', 'Irrational Numbers', 'Decimal Expansions'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Polynomials', concepts: ['Zeroes of Polynomial', 'Relationship between zeroes and coefficients', 'Division Algorithm'], prerequisites: ['Real Numbers'], difficulty: 3 },
      { chapterName: 'Pair of Linear Equations in Two Variables', concepts: ['Graphical Method', 'Substitution', 'Elimination', 'Cross-multiplication', 'Consistency'], prerequisites: ['Polynomials'], difficulty: 3 },
      { chapterName: 'Quadratic Equations', concepts: ['Factorization', 'Completing the Square', 'Quadratic Formula', 'Discriminant', 'Nature of Roots'], prerequisites: ['Polynomials', 'Real Numbers'], difficulty: 4 },
      { chapterName: 'Arithmetic Progressions', concepts: ['Common Difference', 'nth Term Formula', 'Sum of n Terms', 'Applications'], prerequisites: ['Pair of Linear Equations in Two Variables'], difficulty: 3 },
      { chapterName: 'Triangles', concepts: ['Similarity Criteria', 'BPT', 'AAA, AA, SSS, SAS Similarity', 'Pythagoras Theorem'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Coordinate Geometry', concepts: ['Distance Formula', 'Section Formula', 'Area of Triangle', 'Collinearity'], prerequisites: ['Pair of Linear Equations in Two Variables', 'Triangles'], difficulty: 3 },
      { chapterName: 'Introduction to Trigonometry', concepts: ['Trigonometric Ratios', 'Ratios of Standard Angles', 'Complementary Angles', 'Trigonometric Identities'], prerequisites: ['Triangles'], difficulty: 4 },
      { chapterName: 'Some Applications of Trigonometry', concepts: ['Heights and Distances', 'Angle of Elevation', 'Angle of Depression'], prerequisites: ['Introduction to Trigonometry'], difficulty: 4 },
      { chapterName: 'Circles', concepts: ['Tangent Properties', 'Number of Tangents from External Point', 'Length of Tangent'], prerequisites: ['Triangles'], difficulty: 3 },
      { chapterName: 'Areas Related to Circles', concepts: ['Sector Area', 'Segment Area', 'Combination of Figures'], prerequisites: ['Circles', 'Introduction to Trigonometry'], difficulty: 3 },
      { chapterName: 'Surface Areas and Volumes', concepts: ['Combination of Solids', 'Conversion of Shapes', 'Frustum of Cone'], prerequisites: ['Areas Related to Circles'], difficulty: 4 },
      { chapterName: 'Statistics', concepts: ['Mean of Grouped Data', 'Median of Grouped Data', 'Mode of Grouped Data', 'Ogive Curves'], prerequisites: ['Real Numbers'], difficulty: 3 },
      { chapterName: 'Probability', concepts: ['Classical Definition', 'Complementary Events', 'Elementary Events', 'Simple Problems'], prerequisites: ['Statistics', 'Real Numbers'], difficulty: 2 }
    ]
  });

  // Class 10 Science Knowledge Graph
  await upsertGraph({
    subjectName: 'Science', std: 10, board: BOARD,
    nodes: [
      { chapterName: 'Chemical Reactions and Equations', concepts: ['Balancing Equations', 'Types of Reactions', 'Oxidation and Reduction', 'Corrosion', 'Rancidity'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Acids, Bases and Salts', concepts: ['Indicators', 'pH Scale', 'Neutralization', 'Salt Preparation', 'Baking Soda Uses'], prerequisites: ['Chemical Reactions and Equations'], difficulty: 3 },
      { chapterName: 'Metals and Non-Metals', concepts: ['Physical Properties', 'Chemical Properties', 'Reactivity Series', 'Ionic Bonding', 'Extraction', 'Corrosion'], prerequisites: ['Chemical Reactions and Equations'], difficulty: 3 },
      { chapterName: 'Carbon and its Compounds', concepts: ['Covalent Bonding', 'Versatile Nature of Carbon', 'Homologous Series', 'Functional Groups', 'Chemical Properties'], prerequisites: ['Chemical Reactions and Equations', 'Metals and Non-Metals'], difficulty: 4 },
      { chapterName: 'Life Processes', concepts: ['Autotrophic Nutrition', 'Heterotrophic Nutrition', 'Respiration', 'Transportation', 'Excretion'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Control and Coordination', concepts: ['Nervous System', 'Reflex Arc', 'Brain Structure', 'Hormones in Animals', 'Plant Hormones'], prerequisites: ['Life Processes'], difficulty: 4 },
      { chapterName: 'How do Organisms Reproduce?', concepts: ['Asexual Reproduction', 'Sexual Reproduction', 'Reproductive Health', 'Contraception'], prerequisites: ['Life Processes', 'Control and Coordination'], difficulty: 3 },
      { chapterName: 'Heredity and Evolution', concepts: ['Mendel\'s Laws', 'Sex Determination', 'Evolution Theories', 'Natural Selection', 'Speciation'], prerequisites: ['How do Organisms Reproduce?'], difficulty: 5 },
      { chapterName: 'Light — Reflection and Refraction', concepts: ['Laws of Reflection', 'Mirror Formula', 'Laws of Refraction', 'Lens Formula', 'Sign Convention', 'Magnification'], prerequisites: [], difficulty: 4 },
      { chapterName: 'The Human Eye and the Colourful World', concepts: ['Eye Defects', 'Atmospheric Refraction', 'Dispersion', 'Scattering of Light'], prerequisites: ['Light — Reflection and Refraction'], difficulty: 3 },
      { chapterName: 'Electricity', concepts: ['Ohm\'s Law', 'Resistance', 'Series and Parallel', 'Electric Power', 'Energy Calculations'], prerequisites: [], difficulty: 4 },
      { chapterName: 'Magnetic Effects of Electric Current', concepts: ['Magnetic Field', 'Fleming\'s Rules', 'Electromagnets', 'Electric Motor', 'Generator', 'Domestic Circuits'], prerequisites: ['Electricity'], difficulty: 4 },
      { chapterName: 'Our Environment', concepts: ['Ecosystems', 'Food Chains', 'Food Webs', 'Ozone Layer', 'Biodegradable Waste'], prerequisites: ['Life Processes'], difficulty: 2 }
    ]
  });

  // Class 9 Science Knowledge Graph
  await upsertGraph({
    subjectName: 'Science', std: 9, board: BOARD,
    nodes: [
      { chapterName: 'Matter in Our Surroundings', concepts: ['States of Matter', 'Change of State', 'Evaporation', 'Latent Heat'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Is Matter Around Us Pure', concepts: ['Mixtures', 'Solutions', 'Separation Techniques', 'Compounds vs Mixtures'], prerequisites: ['Matter in Our Surroundings'], difficulty: 3 },
      { chapterName: 'Atoms and Molecules', concepts: ['Dalton\'s Theory', 'Atomic Mass', 'Molecular Mass', 'Mole Concept', 'Chemical Formula'], prerequisites: ['Is Matter Around Us Pure'], difficulty: 4 },
      { chapterName: 'Structure of the Atom', concepts: ['Thomson Model', 'Rutherford Model', 'Bohr Model', 'Electron Configuration', 'Valency'], prerequisites: ['Atoms and Molecules'], difficulty: 4 },
      { chapterName: 'The Fundamental Unit of Life', concepts: ['Cell Structure', 'Organelles', 'Prokaryotic vs Eukaryotic', 'Cell Theory'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Tissues', concepts: ['Plant Tissues', 'Animal Tissues', 'Meristematic', 'Permanent Tissues'], prerequisites: ['The Fundamental Unit of Life'], difficulty: 3 },
      { chapterName: 'Diversity in Living Organisms', concepts: ['Five Kingdom Classification', 'Nomenclature', 'Taxonomic Hierarchy'], prerequisites: ['The Fundamental Unit of Life', 'Tissues'], difficulty: 3 },
      { chapterName: 'Motion', concepts: ['Distance vs Displacement', 'Speed vs Velocity', 'Acceleration', 'Equations of Motion', 'Graphs'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Force and Laws of Motion', concepts: ['Newton\'s First Law', 'Second Law', 'Third Law', 'Momentum', 'Conservation of Momentum'], prerequisites: ['Motion'], difficulty: 4 },
      { chapterName: 'Gravitation', concepts: ['Universal Gravitation', 'Free Fall', 'Weight vs Mass', 'Kepler\'s Laws'], prerequisites: ['Force and Laws of Motion'], difficulty: 4 },
      { chapterName: 'Work and Energy', concepts: ['Work', 'Kinetic Energy', 'Potential Energy', 'Conservation of Energy', 'Power'], prerequisites: ['Force and Laws of Motion'], difficulty: 3 },
      { chapterName: 'Sound', concepts: ['Production', 'Propagation', 'Speed of Sound', 'Echo', 'Human Ear', 'Ultrasound'], prerequisites: ['Motion'], difficulty: 3 }
    ]
  });

  // Class 9 Mathematics Knowledge Graph
  await upsertGraph({
    subjectName: 'Mathematics', std: 9, board: BOARD,
    nodes: [
      { chapterName: 'Number Systems', concepts: ['Rational Numbers', 'Irrational Numbers', 'Real Numbers', 'Number Line', 'Laws of Exponents'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Polynomials', concepts: ['Degree', 'Zeroes', 'Remainder Theorem', 'Factor Theorem', 'Algebraic Identities'], prerequisites: ['Number Systems'], difficulty: 3 },
      { chapterName: 'Coordinate Geometry', concepts: ['Cartesian Plane', 'Quadrants', 'Plotting Points', 'Axes'], prerequisites: ['Number Systems'], difficulty: 2 },
      { chapterName: 'Linear Equations in Two Variables', concepts: ['Writing Equations', 'Solutions', 'Graphing Lines'], prerequisites: ['Polynomials', 'Coordinate Geometry'], difficulty: 3 },
      { chapterName: 'Introduction to Euclid\'s Geometry', concepts: ['Axioms', 'Postulates', 'Theorems', 'Euclid\'s Five Postulates'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Lines and Angles', concepts: ['Types of Angles', 'Parallel Lines', 'Transversal', 'Angle Sum Property'], prerequisites: ['Introduction to Euclid\'s Geometry'], difficulty: 2 },
      { chapterName: 'Triangles', concepts: ['Congruence Criteria', 'SAS', 'ASA', 'SSS', 'RHS', 'Inequalities'], prerequisites: ['Lines and Angles'], difficulty: 3 },
      { chapterName: 'Quadrilaterals', concepts: ['Properties', 'Parallelogram Theorems', 'Mid-Point Theorem'], prerequisites: ['Triangles'], difficulty: 3 },
      { chapterName: 'Circles', concepts: ['Chords', 'Arcs', 'Inscribed Angles', 'Cyclic Quadrilaterals'], prerequisites: ['Triangles', 'Lines and Angles'], difficulty: 4 },
      { chapterName: 'Heron\'s Formula', concepts: ['Semi-perimeter', 'Area of Triangle', 'Application to Quadrilaterals'], prerequisites: ['Triangles'], difficulty: 2 },
      { chapterName: 'Surface Areas and Volumes', concepts: ['Cube', 'Cuboid', 'Cylinder', 'Cone', 'Sphere'], prerequisites: ['Heron\'s Formula'], difficulty: 3 },
      { chapterName: 'Statistics', concepts: ['Data Collection', 'Frequency Distribution', 'Mean', 'Median', 'Mode', 'Histograms'], prerequisites: ['Number Systems'], difficulty: 2 }
    ]
  });

  console.log('✅ Knowledge Graphs seeded!');
