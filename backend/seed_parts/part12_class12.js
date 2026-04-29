
  // ═══════════════════════════════════════════════════════════
  // CLASS 12
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 12...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Relations and Functions', description: 'Types of relations, types of functions, composition, inverse' },
      { chapterName: 'Inverse Trigonometric Functions', description: 'Domain, range, principal value, properties' },
      { chapterName: 'Matrices', description: 'Types, operations, transpose, symmetric, elementary operations' },
      { chapterName: 'Determinants', description: 'Properties, cofactors, adjoint, inverse, Cramer\'s rule' },
      { chapterName: 'Continuity and Differentiability', description: 'Continuity, differentiability, chain rule, implicit, parametric, second order' },
      { chapterName: 'Application of Derivatives', description: 'Rate of change, tangents, maxima and minima, approximations' },
      { chapterName: 'Integrals', description: 'Indefinite integrals, methods, definite integrals, fundamental theorem' },
      { chapterName: 'Application of Integrals', description: 'Area under curves, area between curves' },
      { chapterName: 'Differential Equations', description: 'Order, degree, solving first-order equations, applications' },
      { chapterName: 'Vector Algebra', description: 'Types, addition, scalar and vector products, triple products' },
      { chapterName: 'Three Dimensional Geometry', description: 'Direction cosines, equations of line and plane, angles, distances' },
      { chapterName: 'Linear Programming', description: 'Mathematical formulation, graphical method, feasible region' },
      { chapterName: 'Probability', description: 'Conditional probability, Bayes\' theorem, random variables, binomial distribution' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Physics', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Electric Charges and Fields', description: 'Coulomb\'s law, electric field, dipole, Gauss\'s law' },
      { chapterName: 'Electrostatic Potential and Capacitance', description: 'Potential, equipotential surfaces, capacitors, dielectrics' },
      { chapterName: 'Current Electricity', description: 'Ohm\'s law, Kirchhoff\'s rules, Wheatstone bridge, potentiometer' },
      { chapterName: 'Moving Charges and Magnetism', description: 'Magnetic force, Biot-Savart law, Ampere\'s law, solenoid' },
      { chapterName: 'Magnetism and Matter', description: 'Bar magnets, Earth\'s magnetism, diamagnetic, paramagnetic, ferromagnetic' },
      { chapterName: 'Electromagnetic Induction', description: 'Faraday\'s laws, Lenz\'s law, eddy currents, self/mutual inductance' },
      { chapterName: 'Alternating Current', description: 'AC generator, phasor, LCR circuit, resonance, transformers' },
      { chapterName: 'Electromagnetic Waves', description: 'Displacement current, EM spectrum, properties and applications' },
      { chapterName: 'Ray Optics and Optical Instruments', description: 'Reflection, refraction, TIR, prism, lenses, microscopes, telescopes' },
      { chapterName: 'Wave Optics', description: 'Huygens\' principle, interference, diffraction, polarisation' },
      { chapterName: 'Dual Nature of Radiation and Matter', description: 'Photoelectric effect, Einstein\'s equation, de Broglie wavelength' },
      { chapterName: 'Atoms', description: 'Alpha particle scattering, Bohr model, hydrogen spectrum' },
      { chapterName: 'Nuclei', description: 'Nuclear size, mass defect, binding energy, radioactivity, fission, fusion' },
      { chapterName: 'Semiconductor Electronics', description: 'Energy bands, diodes, transistors, logic gates' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Chemistry', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'The Solid State', description: 'Crystal lattice, unit cell, packing, defects, electrical properties' },
      { chapterName: 'Solutions', description: 'Types, concentration, Raoult\'s law, colligative properties, osmotic pressure' },
      { chapterName: 'Electrochemistry', description: 'Redox, Nernst equation, conductance, electrolysis, batteries, corrosion' },
      { chapterName: 'Chemical Kinetics', description: 'Rate of reaction, order, molecularity, Arrhenius equation' },
      { chapterName: 'Surface Chemistry', description: 'Adsorption, catalysis, colloids, emulsions' },
      { chapterName: 'General Principles of Isolation of Elements', description: 'Metallurgy, reduction, refining, thermodynamic and electrochemical principles' },
      { chapterName: 'The p-Block Elements', description: 'Group 15-18 elements, oxides, oxyacids, interhalogen compounds' },
      { chapterName: 'The d- and f-Block Elements', description: 'Transition metals, properties, lanthanides, actinides' },
      { chapterName: 'Coordination Compounds', description: 'Werner theory, IUPAC naming, isomerism, bonding, applications' },
      { chapterName: 'Haloalkanes and Haloarenes', description: 'Classification, nomenclature, reactions, SN1, SN2, elimination' },
      { chapterName: 'Alcohols, Phenols and Ethers', description: 'Classification, properties, reactions, preparation' },
      { chapterName: 'Aldehydes, Ketones and Carboxylic Acids', description: 'Nomenclature, reactions, nucleophilic addition, acidity' },
      { chapterName: 'Amines', description: 'Classification, properties, diazonium salts, identification' },
      { chapterName: 'Biomolecules', description: 'Carbohydrates, proteins, nucleic acids, vitamins, hormones' },
      { chapterName: 'Polymers', description: 'Classification, polymerization, copolymers, rubber, biodegradable' },
      { chapterName: 'Chemistry in Everyday Life', description: 'Drugs, soaps, detergents, food additives, antioxidants' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Biology', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Reproduction in Organisms', description: 'Asexual and sexual reproduction, events in sexual reproduction' },
      { chapterName: 'Sexual Reproduction in Flowering Plants', description: 'Flower structure, pollination, fertilisation, embryo development' },
      { chapterName: 'Human Reproduction', description: 'Male and female reproductive systems, gametogenesis, menstrual cycle' },
      { chapterName: 'Reproductive Health', description: 'Family planning, STDs, infertility, ARTs' },
      { chapterName: 'Principles of Inheritance and Variation', description: 'Mendel\'s laws, linkage, sex-linked inheritance, chromosomal disorders' },
      { chapterName: 'Molecular Basis of Inheritance', description: 'DNA structure, replication, transcription, translation, genetic code, HGP' },
      { chapterName: 'Evolution', description: 'Origin of life, evidence, Darwin, Hardy-Weinberg, human evolution' },
      { chapterName: 'Human Health and Disease', description: 'Pathogens, immunity, AIDS, cancer, drugs and alcohol abuse' },
      { chapterName: 'Strategies for Enhancement in Food Production', description: 'Plant breeding, SCP, tissue culture, animal husbandry' },
      { chapterName: 'Microbes in Human Welfare', description: 'Fermentation, antibiotics, biogas, biocontrol, biofertilizers' },
      { chapterName: 'Biotechnology: Principles and Processes', description: 'rDNA technology, tools, PCR, gel electrophoresis, cloning vectors' },
      { chapterName: 'Biotechnology and its Applications', description: 'GM organisms, gene therapy, transgenic animals, biosafety, bioethics' },
      { chapterName: 'Organisms and Populations', description: 'Ecology — adaptations, population attributes, growth models, interactions' },
      { chapterName: 'Ecosystem', description: 'Structure, productivity, decomposition, energy flow, ecological pyramids' },
      { chapterName: 'Biodiversity and Conservation', description: 'Levels of biodiversity, patterns, loss, conservation strategies' },
      { chapterName: 'Environmental Issues', description: 'Pollution, solid waste, ozone depletion, deforestation, conservation acts' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'The Last Lesson', description: 'Prose — Alphonse Daudet, language loss, patriotism' },
      { chapterName: 'Lost Spring', description: 'Prose — Anees Jung, child labour, poverty' },
      { chapterName: 'Deep Water', description: 'Prose — William Douglas, fear and overcoming it' },
      { chapterName: 'The Rattrap', description: 'Prose — Selma Lagerlöf, human nature, kindness' },
      { chapterName: 'Indigo', description: 'Prose — Louis Fischer, Gandhi, Champaran movement' },
      { chapterName: 'Poets and Pancakes', description: 'Prose — Asokamitran, Gemini Studios, humor' },
      { chapterName: 'The Interview', description: 'Prose — Christopher Silvester, Umberto Eco' },
      { chapterName: 'Going Places', description: 'Prose — A.R. Barton, adolescence, dreams' },
      { chapterName: 'My Mother at Sixty-six', description: 'Poetry — Kamala Das, aging, love' },
      { chapterName: 'An Elementary School Classroom in a Slum', description: 'Poetry — Stephen Spender, inequality' },
      { chapterName: 'Keeping Quiet', description: 'Poetry — Pablo Neruda, introspection, peace' },
      { chapterName: 'A Thing of Beauty', description: 'Poetry — John Keats, beauty, joy' },
      { chapterName: 'Aunt Jennifer\'s Tigers', description: 'Poetry — Adrienne Rich, feminism, oppression' },
      { chapterName: 'The Third Level', description: 'Supplementary — Jack Finney, time travel, escapism' },
      { chapterName: 'The Tiger King', description: 'Supplementary — Kalki, satire, destiny' },
      { chapterName: 'The Enemy', description: 'Supplementary — Pearl S. Buck, humanity, war' },
      { chapterName: 'On the Face of It', description: 'Supplementary — Susan Hill, prejudice, friendship' },
      { chapterName: 'Memories of Childhood', description: 'Supplementary — Zitkala-Sa and Bama, discrimination' }
    ]
  });

  console.log('✅ All curriculum data seeded (Classes 1–12)!');
