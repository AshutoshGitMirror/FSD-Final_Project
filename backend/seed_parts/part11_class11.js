
  // ═══════════════════════════════════════════════════════════
  // CLASS 11
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 11...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Sets', description: 'Types of sets, Venn diagrams, operations, complement' },
      { chapterName: 'Relations and Functions', description: 'Cartesian product, relations, functions, domain and range' },
      { chapterName: 'Trigonometric Functions', description: 'Radian measure, identities, graphs, general solutions' },
      { chapterName: 'Principle of Mathematical Induction', description: 'Proof technique using induction' },
      { chapterName: 'Complex Numbers and Quadratic Equations', description: 'Algebra of complex numbers, Argand plane, quadratic equations' },
      { chapterName: 'Linear Inequalities', description: 'Solving inequalities, graphical representation' },
      { chapterName: 'Permutations and Combinations', description: 'Fundamental principle of counting, nPr, nCr' },
      { chapterName: 'Binomial Theorem', description: 'Binomial expansion, general and middle terms, Pascal\'s triangle' },
      { chapterName: 'Sequences and Series', description: 'AP, GP, relationship between AM and GM, sum to n terms' },
      { chapterName: 'Straight Lines', description: 'Slope, various forms of equations, distance of a point from line' },
      { chapterName: 'Conic Sections', description: 'Circles, ellipses, parabolas, hyperbolas' },
      { chapterName: 'Introduction to Three Dimensional Geometry', description: 'Coordinate axes, distance formula, section formula in 3D' },
      { chapterName: 'Limits and Derivatives', description: 'Intuitive idea of limits, derivatives from first principles' },
      { chapterName: 'Mathematical Reasoning', description: 'Statements, logical connectives, quantifiers, proofs' },
      { chapterName: 'Statistics', description: 'Mean deviation, variance, standard deviation' },
      { chapterName: 'Probability', description: 'Random experiments, events, axiomatic probability' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Physics', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Physical World', description: 'Scope of physics, fundamental forces, scientific method' },
      { chapterName: 'Units and Measurements', description: 'SI units, dimensional analysis, significant figures, errors' },
      { chapterName: 'Motion in a Straight Line', description: 'Position, velocity, acceleration, kinematic equations, graphs' },
      { chapterName: 'Motion in a Plane', description: 'Vectors, projectile motion, uniform circular motion' },
      { chapterName: 'Laws of Motion', description: 'Newton\'s laws, friction, circular motion dynamics, problem solving' },
      { chapterName: 'Work, Energy and Power', description: 'Work-energy theorem, potential energy, conservation, collisions' },
      { chapterName: 'System of Particles and Rotational Motion', description: 'Centre of mass, torque, angular momentum, moment of inertia' },
      { chapterName: 'Gravitation', description: 'Kepler\'s laws, gravitational potential energy, escape velocity, satellites' },
      { chapterName: 'Mechanical Properties of Solids', description: 'Stress, strain, Hooke\'s law, elastic moduli' },
      { chapterName: 'Mechanical Properties of Fluids', description: 'Pressure, Pascal\'s law, viscosity, Bernoulli\'s principle, surface tension' },
      { chapterName: 'Thermal Properties of Matter', description: 'Temperature, thermal expansion, calorimetry, heat transfer' },
      { chapterName: 'Thermodynamics', description: 'Zeroth, first, second laws, isothermal and adiabatic processes, Carnot engine' },
      { chapterName: 'Kinetic Theory', description: 'Molecular nature of matter, ideal gas, kinetic theory of gases' },
      { chapterName: 'Oscillations', description: 'SHM, spring-mass system, pendulum, damped and forced oscillations' },
      { chapterName: 'Waves', description: 'Transverse and longitudinal, speed, superposition, standing waves, beats, Doppler effect' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Chemistry', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Some Basic Concepts of Chemistry', description: 'Atomic and molecular masses, mole concept, stoichiometry' },
      { chapterName: 'Structure of Atom', description: 'Subatomic particles, Bohr model, quantum mechanics, orbitals, electronic configuration' },
      { chapterName: 'Classification of Elements and Periodicity', description: 'Periodic table, periodic trends, electronegativity, ionization energy' },
      { chapterName: 'Chemical Bonding and Molecular Structure', description: 'Ionic, covalent, VSEPR, hybridization, molecular orbital theory' },
      { chapterName: 'States of Matter', description: 'Gas laws, ideal gas equation, liquefaction, liquid state' },
      { chapterName: 'Thermodynamics', description: 'Enthalpy, Hess\'s law, entropy, Gibbs free energy, spontaneity' },
      { chapterName: 'Equilibrium', description: 'Chemical equilibrium, Le Chatelier, ionic equilibrium, pH, buffers' },
      { chapterName: 'Redox Reactions', description: 'Oxidation numbers, balancing redox equations, electrode processes' },
      { chapterName: 'Hydrogen', description: 'Position, isotopes, dihydrogen, water, hydrogen peroxide, hydrides' },
      { chapterName: 'The s-Block Elements', description: 'Alkali and alkaline earth metals, properties, diagonal relationship' },
      { chapterName: 'The p-Block Elements', description: 'Group 13 and 14, boron, aluminium, carbon, silicon, important compounds' },
      { chapterName: 'Organic Chemistry — Some Basic Principles', description: 'IUPAC nomenclature, isomerism, electronic effects, reaction mechanisms' },
      { chapterName: 'Hydrocarbons', description: 'Alkanes, alkenes, alkynes, aromatic hydrocarbons, reactions' },
      { chapterName: 'Environmental Chemistry', description: 'Air and water pollution, ozone, smog, greenhouse effect, green chemistry' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Biology', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'The Living World', description: 'Biodiversity, taxonomy, classification systems' },
      { chapterName: 'Biological Classification', description: 'Five kingdom classification, viruses, viroids, lichens' },
      { chapterName: 'Plant Kingdom', description: 'Algae, bryophytes, pteridophytes, gymnosperms, angiosperms' },
      { chapterName: 'Animal Kingdom', description: 'Basis of classification, phylum characteristics, examples' },
      { chapterName: 'Morphology of Flowering Plants', description: 'Root, stem, leaf, flower, fruit, seed modifications' },
      { chapterName: 'Anatomy of Flowering Plants', description: 'Tissues, tissue systems, dicot vs monocot anatomy' },
      { chapterName: 'Structural Organisation in Animals', description: 'Animal tissues, organ systems, earthworm, cockroach, frog' },
      { chapterName: 'Cell: The Unit of Life', description: 'Cell theory, prokaryotic and eukaryotic cells, organelles' },
      { chapterName: 'Biomolecules', description: 'Carbohydrates, proteins, lipids, nucleic acids, enzymes' },
      { chapterName: 'Cell Cycle and Cell Division', description: 'Mitosis, meiosis, significance, cell cycle regulation' },
      { chapterName: 'Transport in Plants', description: 'Osmosis, plasmolysis, phloem transport, transpiration' },
      { chapterName: 'Mineral Nutrition', description: 'Essential minerals, deficiency symptoms, nitrogen metabolism' },
      { chapterName: 'Photosynthesis in Higher Plants', description: 'Light and dark reactions, C3 and C4 pathways, photorespiration' },
      { chapterName: 'Respiration in Plants', description: 'Glycolysis, TCA cycle, ETS, fermentation' },
      { chapterName: 'Plant Growth and Development', description: 'Growth phases, plant hormones, photoperiodism, vernalisation' },
      { chapterName: 'Digestion and Absorption', description: 'Human digestive system, digestion process, disorders' },
      { chapterName: 'Breathing and Exchange of Gases', description: 'Respiratory organs, mechanism, gas transport, disorders' },
      { chapterName: 'Body Fluids and Circulation', description: 'Blood, lymph, human heart, cardiac cycle, disorders' },
      { chapterName: 'Excretory Products and their Elimination', description: 'Kidney structure, urine formation, regulation, disorders' },
      { chapterName: 'Locomotion and Movement', description: 'Types of movement, skeletal system, muscle contraction, joints' },
      { chapterName: 'Neural Control and Coordination', description: 'Neuron, CNS, PNS, reflex action, sense organs' },
      { chapterName: 'Chemical Coordination and Integration', description: 'Endocrine glands, hormones, mechanism of action, disorders' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'The Portrait of a Lady', description: 'Prose — Khushwant Singh, grandmother, bond and change' },
      { chapterName: 'We\'re Not Afraid to Die', description: 'Prose — Gordon Cook, sea survival, courage' },
      { chapterName: 'Discovering Tut: The Saga Continues', description: 'Prose — Tutankhamun, archaeology, CT scan' },
      { chapterName: 'Landscape of the Soul', description: 'Prose — Chinese and European art, perspective' },
      { chapterName: 'The Ailing Planet: the Green Movement\'s Role', description: 'Prose — environment, sustainability' },
      { chapterName: 'The Browning Version', description: 'Prose — Terence Rattigan, play, teacher-student' },
      { chapterName: 'The Adventure', description: 'Prose — Jayant Narlikar, parallel universes, science fiction' },
      { chapterName: 'Silk Road', description: 'Prose — Nick Middleton, travel, Tibet' },
      { chapterName: 'A Photograph', description: 'Poetry — Shirley Toulson, memory, loss' },
      { chapterName: 'The Laburnum Top', description: 'Poetry — Ted Hughes, nature, goldfinch' },
      { chapterName: 'The Voice of the Rain', description: 'Poetry — Walt Whitman, rain cycle' },
      { chapterName: 'Childhood', description: 'Poetry — Marcus Natten, growing up, individuality' }
    ]
  });
