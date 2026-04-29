
  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 11-12 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 11–12...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Sets', questions: [
    { q: 'The set of natural numbers is:', options: ['Finite', 'Infinite', 'Empty', 'Singleton'], ans: 1 },
    { q: 'A ∪ A = ?', options: ['∅', 'A', 'U', 'A\''], ans: 1 },
    { q: 'A ∩ ∅ = ?', options: ['A', '∅', 'U', 'A\''], ans: 1 },
    { q: 'If A = {1,2,3} and B = {2,3,4}, then A ∩ B = ?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '∅'], ans: 1 },
    { q: 'n(A ∪ B) = n(A) + n(B) - ?', options: ['n(A)', 'n(B)', 'n(A ∩ B)', 'n(A × B)'], ans: 2 },
    { q: 'Power set of {a, b} has ___ elements', options: ['2', '3', '4', '8'], ans: 2 },
    { q: 'A - B means elements in ___ but not in ___', options: ['B, A', 'A, B', 'A ∩ B', 'A ∪ B'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Trigonometric Functions', questions: [
    { q: 'π radians = ___ degrees', options: ['90', '180', '270', '360'], ans: 1 },
    { q: 'sin(90° + θ) = ?', options: ['sinθ', '-sinθ', 'cosθ', '-cosθ'], ans: 2 },
    { q: 'The period of sin x is:', options: ['π', '2π', 'π/2', '4π'], ans: 1 },
    { q: 'cos²x - sin²x = ?', options: ['1', 'cos2x', 'sin2x', '2sinxcosx'], ans: 1 },
    { q: 'sin(A+B) = sinAcosB + ?', options: ['sinBcosA', 'cosAcosB', 'sinAsinB', '-sinBcosA'], ans: 0 },
    { q: 'tan45° = ?', options: ['0', '1', '√3', 'undefined'], ans: 1 },
    { q: 'The range of sinx is:', options: ['[0, 1]', '[-1, 1]', '(-∞, ∞)', '[0, ∞)'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Permutations and Combinations', questions: [
    { q: '5! = ?', options: ['20', '60', '100', '120'], ans: 3 },
    { q: '⁶P₂ = ?', options: ['12', '15', '30', '36'], ans: 2 },
    { q: '⁵C₃ = ?', options: ['6', '10', '20', '60'], ans: 1 },
    { q: '0! = ?', options: ['0', '1', 'Undefined', '∞'], ans: 1 },
    { q: 'ⁿCₙ = ?', options: ['0', '1', 'n', 'n!'], ans: 1 },
    { q: 'ⁿC₀ = ?', options: ['0', '1', 'n', 'Undefined'], ans: 1 },
    { q: 'The number of ways to arrange 4 books on a shelf:', options: ['4', '12', '16', '24'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Limits and Derivatives', questions: [
    { q: 'lim(x→0) sin(x)/x = ?', options: ['0', '1', '∞', 'Undefined'], ans: 1 },
    { q: 'd/dx (x²) = ?', options: ['x', '2x', 'x²', '2'], ans: 1 },
    { q: 'd/dx (sin x) = ?', options: ['-sin x', 'cos x', '-cos x', 'tan x'], ans: 1 },
    { q: 'd/dx (eˣ) = ?', options: ['xeˣ⁻¹', 'eˣ', 'xeˣ', 'eˣ/x'], ans: 1 },
    { q: 'lim(x→2) (x²-4)/(x-2) = ?', options: ['0', '2', '4', '∞'], ans: 2 },
    { q: 'd/dx (constant) = ?', options: ['1', '0', 'constant', '∞'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Motion in a Straight Line', questions: [
    { q: 'A body at rest has velocity:', options: ['1 m/s', 'Infinite', '0', 'Negative'], ans: 2 },
    { q: 'The slope of a position-time graph gives:', options: ['Acceleration', 'Velocity', 'Displacement', 'Force'], ans: 1 },
    { q: 'The area under a v-t graph gives:', options: ['Velocity', 'Acceleration', 'Displacement', 'Force'], ans: 2 },
    { q: 'v = u + at is the ___ equation of motion', options: ['First', 'Second', 'Third', 'Fourth'], ans: 0 },
    { q: 'If u=0 and a=10, velocity after 5 seconds is:', options: ['10 m/s', '25 m/s', '50 m/s', '100 m/s'], ans: 2 },
    { q: 'Negative acceleration is called:', options: ['Speed', 'Retardation', 'Displacement', 'Velocity'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Work, Energy and Power', questions: [
    { q: 'Work done by a force perpendicular to displacement is:', options: ['Maximum', 'Minimum', 'Zero', 'Negative'], ans: 2 },
    { q: 'KE of a body of mass 2 kg moving at 3 m/s is:', options: ['3 J', '6 J', '9 J', '18 J'], ans: 2 },
    { q: 'In an elastic collision, ___ is conserved', options: ['Only momentum', 'Only KE', 'Both momentum and KE', 'Neither'], ans: 2 },
    { q: '1 HP = ___ watts', options: ['500', '746', '1000', '1500'], ans: 1 },
    { q: 'A spring stores ___ energy', options: ['Kinetic', 'Potential (elastic)', 'Chemical', 'Nuclear'], ans: 1 },
    { q: 'The work-energy theorem states: net work = change in ___', options: ['PE', 'KE', 'Total energy', 'Momentum'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Gravitation', questions: [
    { q: 'Kepler\'s second law deals with:', options: ['Elliptical orbits', 'Equal areas in equal times', 'T² ∝ R³', 'Gravitational force'], ans: 1 },
    { q: 'The escape velocity from Earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '15 km/s', '3 × 10⁸ m/s'], ans: 1 },
    { q: 'g at the centre of Earth is:', options: ['9.8 m/s²', 'Infinite', '0', 'Maximum'], ans: 2 },
    { q: 'Geostationary satellites orbit with period:', options: ['12 hours', '24 hours', '48 hours', '7 days'], ans: 1 },
    { q: 'Gravitational PE = ?', options: ['½mv²', '-GMm/r', 'mgh only', 'GMm/r²'], ans: 1 },
    { q: 'The value of G is approximately:', options: ['6.67 × 10⁻¹¹ Nm²/kg²', '9.8 m/s²', '6.67 × 10¹¹', '3 × 10⁸'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Equilibrium', questions: [
    { q: 'At equilibrium, the rate of forward reaction is:', options: ['Zero', 'Maximum', 'Equal to reverse reaction', 'Infinite'], ans: 2 },
    { q: 'Le Chatelier\'s principle predicts the effect of:', options: ['Temperature only', 'Pressure only', 'Stress on equilibrium', 'Catalysts only'], ans: 2 },
    { q: 'pH of pure water is:', options: ['0', '7', '14', '1'], ans: 1 },
    { q: 'A buffer solution resists changes in:', options: ['Temperature', 'Pressure', 'pH', 'Volume'], ans: 2 },
    { q: 'Kw at 25°C is:', options: ['10⁻⁷', '10⁻¹⁴', '7', '14'], ans: 1 },
    { q: 'If Kc > 1, the equilibrium favours:', options: ['Reactants', 'Products', 'Neither', 'Both equally'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Structure of Atom', questions: [
    { q: 'Heisenberg\'s uncertainty principle states we cannot simultaneously know:', options: ['Mass and charge', 'Position and momentum', 'Spin and colour', 'Protons and neutrons'], ans: 1 },
    { q: 'The quantum number "l" defines:', options: ['Shell', 'Subshell (shape)', 'Orientation', 'Spin'], ans: 1 },
    { q: 'Maximum electrons in a subshell with l=2 is:', options: ['2', '6', '10', '14'], ans: 2 },
    { q: 'Aufbau principle states electrons fill:', options: ['Highest energy first', 'Lowest energy first', 'Randomly', 'All at once'], ans: 1 },
    { q: 'Hund\'s rule states electrons ___ before pairing', options: ['Pair up', 'Singly occupy orbitals', 'Leave orbitals empty', 'Fill s-orbital'], ans: 1 },
    { q: 'The electron configuration of Na (Z=11) is:', options: ['2,8,2', '2,8,1', '2,9', '1,8,2'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Biomolecules', questions: [
    { q: 'Enzymes are chemically:', options: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'], ans: 2 },
    { q: 'The monomer of proteins is:', options: ['Glucose', 'Amino acid', 'Fatty acid', 'Nucleotide'], ans: 1 },
    { q: 'DNA stands for:', options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Dinucleotide Acid', 'Dual Nucleic Acid'], ans: 1 },
    { q: 'Cellulose is a:', options: ['Protein', 'Lipid', 'Polysaccharide', 'Nucleic acid'], ans: 2 },
    { q: 'The bond between amino acids is called:', options: ['Glycosidic bond', 'Peptide bond', 'Phosphodiester bond', 'Hydrogen bond'], ans: 1 },
    { q: 'Starch is a polymer of:', options: ['Amino acids', 'Glucose', 'Fatty acids', 'Nucleotides'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Cell Cycle and Cell Division', questions: [
    { q: 'Mitosis produces ___ daughter cells', options: ['1', '2', '4', '8'], ans: 1 },
    { q: 'Meiosis produces ___ daughter cells', options: ['1', '2', '4', '8'], ans: 2 },
    { q: 'Crossing over occurs in ___ of meiosis', options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Telophase I'], ans: 0 },
    { q: 'The phase where DNA replication occurs is:', options: ['G1', 'S phase', 'G2', 'M phase'], ans: 1 },
    { q: 'Mitosis maintains the ___ number of chromosomes', options: ['Haploid', 'Diploid', 'Triploid', 'Aneuploid'], ans: 1 },
    { q: 'Meiosis is also called ___ division', options: ['Equational', 'Reductional', 'Amitotic', 'Binary'], ans: 1 }
  ]});

  // Class 12 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Matrices', questions: [
    { q: 'A matrix with m rows and n columns is called:', options: ['m×n matrix', 'n×m matrix', 'Square matrix', 'Identity matrix'], ans: 0 },
    { q: 'A square matrix with all diagonal elements 1 and rest 0 is:', options: ['Zero matrix', 'Identity matrix', 'Scalar matrix', 'Diagonal matrix'], ans: 1 },
    { q: 'If A is 3×2 and B is 2×4, then AB is:', options: ['3×4', '2×2', '3×2', 'Not possible'], ans: 0 },
    { q: '(AB)ᵀ = ?', options: ['AᵀBᵀ', 'BᵀAᵀ', 'AB', 'BA'], ans: 1 },
    { q: 'A + B = B + A is called ___ property', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], ans: 1 },
    { q: 'A symmetric matrix satisfies:', options: ['A = -Aᵀ', 'A = Aᵀ', 'A = A²', 'A = A⁻¹'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Determinants', questions: [
    { q: 'The determinant of a 1×1 matrix [5] is:', options: ['0', '1', '5', 'Undefined'], ans: 2 },
    { q: 'If |A| = 0, the matrix is called:', options: ['Identity', 'Singular', 'Non-singular', 'Symmetric'], ans: 1 },
    { q: 'det(AB) = ?', options: ['det(A) + det(B)', 'det(A) × det(B)', 'det(A) - det(B)', 'det(A)/det(B)'], ans: 1 },
    { q: 'A⁻¹ exists only if:', options: ['|A| = 0', '|A| ≠ 0', 'A is square', 'Both B and C'], ans: 3 },
    { q: 'adj(A) is the transpose of the ___ matrix', options: ['Minor', 'Cofactor', 'Inverse', 'Identity'], ans: 1 },
    { q: 'A⁻¹ = (1/|A|) × ?', options: ['A', 'Aᵀ', 'adj(A)', '|A|'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integrals', questions: [
    { q: '∫ xⁿ dx = ? (n ≠ -1)', options: ['xⁿ⁺¹ + C', 'xⁿ⁺¹/(n+1) + C', 'nxⁿ⁻¹ + C', 'xⁿ/n + C'], ans: 1 },
    { q: '∫ cos x dx = ?', options: ['-sin x + C', 'sin x + C', '-cos x + C', 'tan x + C'], ans: 1 },
    { q: '∫ eˣ dx = ?', options: ['xeˣ + C', 'eˣ + C', 'eˣ/x + C', 'eˣ⁻¹ + C'], ans: 1 },
    { q: '∫ 1/x dx = ?', options: ['x + C', 'ln|x| + C', '-1/x² + C', 'eˣ + C'], ans: 1 },
    { q: 'The fundamental theorem of calculus connects:', options: ['Limits and continuity', 'Differentiation and integration', 'Algebra and geometry', 'Sets and functions'], ans: 1 },
    { q: '∫₀¹ 2x dx = ?', options: ['0', '1', '2', '4'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Electromagnetic Induction', questions: [
    { q: 'Faraday\'s law relates induced EMF to:', options: ['Current', 'Rate of change of flux', 'Resistance', 'Charge'], ans: 1 },
    { q: 'Lenz\'s law is consistent with the law of conservation of:', options: ['Charge', 'Mass', 'Energy', 'Momentum'], ans: 2 },
    { q: 'Self-inductance is measured in:', options: ['Farad', 'Henry', 'Ohm', 'Weber'], ans: 1 },
    { q: 'Eddy currents can be minimized by:', options: ['Using solid cores', 'Using laminated cores', 'Increasing current', 'Using thicker wires'], ans: 1 },
    { q: 'The device that works on electromagnetic induction is:', options: ['Battery', 'Resistor', 'Generator', 'Capacitor'], ans: 2 },
    { q: 'Magnetic flux Φ = ?', options: ['B × A × cosθ', 'B × A × sinθ', 'B / A', 'B + A'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Semiconductor Electronics', questions: [
    { q: 'Silicon has ___ valence electrons', options: ['1', '2', '3', '4'], ans: 3 },
    { q: 'In a p-type semiconductor, the majority carriers are:', options: ['Electrons', 'Holes', 'Protons', 'Neutrons'], ans: 1 },
    { q: 'A diode allows current in ___ direction(s)', options: ['Both', 'One', 'No', 'All'], ans: 1 },
    { q: 'AND gate gives output 1 when:', options: ['Any input is 1', 'All inputs are 1', 'All inputs are 0', 'No input'], ans: 1 },
    { q: 'OR gate gives output 0 when:', options: ['Any input is 1', 'All inputs are 1', 'All inputs are 0', 'One input is 1'], ans: 2 },
    { q: 'NOT gate is also called:', options: ['Buffer', 'Inverter', 'Amplifier', 'Oscillator'], ans: 1 },
    { q: 'LED stands for:', options: ['Light Emitting Device', 'Light Emitting Diode', 'Low Energy Diode', 'Laser Emitting Diode'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Chemical Kinetics', questions: [
    { q: 'Rate of reaction increases with:', options: ['Decrease in temperature', 'Increase in temperature', 'Decrease in concentration', 'Increase in volume'], ans: 1 },
    { q: 'A catalyst ___ the activation energy', options: ['Increases', 'Decreases', 'Does not change', 'Doubles'], ans: 1 },
    { q: 'The order of a reaction is determined by:', options: ['Balanced equation', 'Experiment', 'Molecular formula', 'Temperature'], ans: 1 },
    { q: 'For a first-order reaction, t₁/₂ = ?', options: ['0.693/k', '1/k', '2/k', 'k/0.693'], ans: 0 },
    { q: 'Molecularity of a reaction can be:', options: ['0', 'Fractional', '1, 2, or 3', 'Any number'], ans: 2 },
    { q: 'The Arrhenius equation relates rate constant to:', options: ['Pressure', 'Volume', 'Temperature', 'Concentration'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Principles of Inheritance and Variation', questions: [
    { q: 'Mendel worked with:', options: ['Fruit flies', 'Garden peas', 'Mice', 'Bacteria'], ans: 1 },
    { q: 'A test cross involves crossing with:', options: ['Dominant homozygous', 'Recessive homozygous', 'Heterozygous', 'Hybrid'], ans: 1 },
    { q: 'Blood group inheritance is an example of:', options: ['Dominance', 'Co-dominance', 'Incomplete dominance', 'Epistasis'], ans: 1 },
    { q: 'Down syndrome is due to trisomy of chromosome:', options: ['18', '21', '13', 'X'], ans: 1 },
    { q: 'Colour blindness is a ___ linked trait', options: ['Y', 'X', 'Autosomal', 'Mitochondrial'], ans: 1 },
    { q: 'The dihybrid ratio in F2 is:', options: ['3:1', '1:2:1', '9:3:3:1', '1:1:1:1'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Ecosystem', questions: [
    { q: 'Producers in an ecosystem are:', options: ['Herbivores', 'Carnivores', 'Green plants', 'Decomposers'], ans: 2 },
    { q: 'Energy flow in an ecosystem is:', options: ['Bidirectional', 'Unidirectional', 'Circular', 'Random'], ans: 1 },
    { q: 'The 10% law was given by:', options: ['Odum', 'Lindeman', 'Tansley', 'Haeckel'], ans: 1 },
    { q: 'GPP - Respiration = ?', options: ['Total energy', 'NPP', 'Biomass', 'Entropy'], ans: 1 },
    { q: 'Detritivores feed on:', options: ['Living plants', 'Living animals', 'Dead organic matter', 'Minerals'], ans: 2 },
    { q: 'Which pyramid is always upright?', options: ['Pyramid of numbers', 'Pyramid of biomass', 'Pyramid of energy', 'All pyramids'], ans: 2 }
  ]});

  console.log('✅ All EXPANDED quizzes seeded!');
