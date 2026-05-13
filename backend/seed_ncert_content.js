require('dotenv').config();
const mongoose = require('mongoose');
const NcertContent = require('./src/models/NcertContent');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

const CHAPTERS = [
  // ═══ CLASS 10 SCIENCE ═══
  {
    std: 10, subject: 'Science', chapter: 'Chemical Reactions and Equations',
    keyPoints: [
      'A chemical reaction involves rearrangement of atoms to form new substances',
      'Reactants are substances that start a reaction, products are formed',
      'Chemical equations are balanced to satisfy law of conservation of mass',
      'Types: Combination, Decomposition, Displacement, Double Displacement, Redox',
      'Oxidation = gain of oxygen / loss of hydrogen. Reduction = opposite',
      'Corrosion is oxidation of metals. Rancidity is oxidation of oils/fats'
    ]
  },
  {
    std: 10, subject: 'Science', chapter: 'Acids Bases and Salts',
    keyPoints: [
      'Acids taste sour, turn blue litmus red. Bases taste bitter, turn red litmus blue',
      'pH scale: 0-6 acidic, 7 neutral, 8-14 basic',
      'Strong acids fully dissociate in water. Weak acids partially dissociate',
      'Reaction of acid with base = neutralization, producing salt and water',
      'Common salts: NaCl (table salt), NaHCO3 (baking soda), CaOCl2 (bleaching powder)',
      'Washing soda Na2CO3·10H2O used in glass/soap industries'
    ]
  },
  {
    std: 10, subject: 'Science', chapter: 'Life Processes',
    keyPoints: [
      'Life processes: Nutrition, Respiration, Transportation, Excretion',
      'Autotrophic nutrition: plants use photosynthesis - CO2 + H2O → glucose + O2',
      'Heterotrophic nutrition: herbivores, carnivores, omnivores, decomposers',
      'Human digestive system: mouth → esophagus → stomach → small intestine → large intestine',
      'Human respiratory system: nose → pharynx → trachea → bronchi → alveoli',
      'Transport in humans: heart pumps blood through arteries, veins, capillaries'
    ]
  },
  {
    std: 10, subject: 'Science', chapter: 'Electricity',
    keyPoints: [
      'Electric current I = Q/t measured in amperes',
      'Ohm\'s law: V = IR (voltage = current × resistance)',
      'Resistance depends on material, length, cross-section area, temperature',
      'Resistors in series: Rtotal = R1 + R2 + R3. In parallel: 1/Rtotal = 1/R1 + 1/R2',
      'Power P = VI = I²R = V²/R measured in watts',
      'Heating effect: H = I²Rt. Used in electric bulbs, heaters, fuses'
    ]
  },
  // ═══ CLASS 10 MATHEMATICS ═══
  {
    std: 10, subject: 'Mathematics', chapter: 'Real Numbers',
    keyPoints: [
      'Euclid\'s division lemma: a = bq + r where 0 ≤ r < b',
      'Euclid\'s algorithm finds HCF of two numbers',
      'Fundamental Theorem of Arithmetic: every composite number has unique prime factorization',
      'Rational numbers can be expressed as p/q where q ≠ 0',
      'Decimal expansions: terminating if prime factors of denominator are 2 or 5 only',
      '√2, √3, √5 are irrational numbers'
    ]
  },
  {
    std: 10, subject: 'Mathematics', chapter: 'Polynomials',
    keyPoints: [
      'Polynomial: expression with variables and coefficients, non-negative integer exponents',
      'Degree is the highest power of the variable',
      'Zeroes of a polynomial p(x) are values of x where p(x) = 0',
      'For quadratic ax² + bx + c: sum of roots = -b/a, product = c/a',
      'Graph of linear = straight line, quadratic = parabola',
      'Division algorithm: Dividend = Divisor × Quotient + Remainder'
    ]
  },
  {
    std: 10, subject: 'Mathematics', chapter: 'Trigonometry',
    keyPoints: [
      'sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent',
      'Reciprocal: cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ',
      'Identities: sin²θ + cos²θ = 1, sec²θ - tan²θ = 1, cosec²θ - cot²θ = 1',
      'Values: sin 0°=0, sin 30°=½, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1',
      'Angle of elevation measured upward from horizontal',
      'Angle of depression measured downward from horizontal'
    ]
  },
  // ═══ CLASS 9 SCIENCE ═══
  {
    std: 9, subject: 'Science', chapter: 'Matter in Our Surroundings',
    keyPoints: [
      'Matter is anything that has mass and occupies space',
      'Three states: solid (fixed shape/volume), liquid (fixed volume), gas (no fixed shape/volume)',
      'Diffusion: spontaneous mixing of particles due to kinetic energy',
      'Melting point: temp at which solid becomes liquid at 1 atm',
      'Boiling point: temp at which liquid becomes gas',
      'Evaporation is surface phenomenon; increases with temp, surface area, wind speed'
    ]
  },
  {
    std: 9, subject: 'Science', chapter: 'Motion',
    keyPoints: [
      'Distance is scalar (only magnitude), displacement is vector (magnitude + direction)',
      'Speed = distance/time, Velocity = displacement/time',
      'Acceleration a = (v - u)/t where u=initial velocity, v=final velocity',
      'First equation of motion: v = u + at',
      'Second equation: s = ut + ½at²',
      'Third equation: v² = u² + 2as'
    ]
  },
  {
    std: 9, subject: 'Science', chapter: 'Force and Laws of Motion',
    keyPoints: [
      'First law: object at rest stays at rest, in motion stays in motion unless acted upon',
      'Second law: F = ma, force equals mass times acceleration',
      'Third law: every action has equal and opposite reaction',
      'Momentum p = mv, measured in kg·m/s',
      'Impulse = change in momentum = F × t',
      'Law of conservation of momentum: total momentum of isolated system is constant'
    ]
  },
  // ═══ CLASS 9 MATHEMATICS ═══
  {
    std: 9, subject: 'Mathematics', chapter: 'Number Systems',
    keyPoints: [
      'Natural numbers N = {1, 2, 3,...}, Whole numbers W = {0, 1, 2,...}',
      'Integers Z = {...-2, -1, 0, 1, 2...}, Rational numbers Q = p/q form',
      'Irrational numbers cannot be expressed as p/q (e.g., √2, π)',
      'Real numbers = rational ∪ irrational',
      'Every real number corresponds to a unique point on the number line',
      'Laws of exponents for real numbers: a^m × a^n = a^(m+n), (a^m)^n = a^(mn)'
    ]
  },
  {
    std: 9, subject: 'Mathematics', chapter: 'Coordinate Geometry',
    keyPoints: [
      'Cartesian plane: x-axis (horizontal) and y-axis (vertical) intersect at origin (0,0)',
      'Point is identified by ordered pair (x, y) called coordinates',
      'x-coordinate = abscissa, y-coordinate = ordinate',
      'Four quadrants: I(+,+), II(-,+), III(-,-), IV(+,-)',
      'Distance formula: √[(x₂-x₁)² + (y₂-y₁)²]',
      'Section formula: point dividing line in ratio m:n = (mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)'
    ]
  },
  {
    std: 9, subject: 'Mathematics', chapter: 'Probability',
    keyPoints: [
      'Probability = number of favorable outcomes / total number of possible outcomes',
      'Range: 0 ≤ P(E) ≤ 1 where 0 = impossible, 1 = certain',
      'Complementary event: P(not E) = 1 - P(E)',
      'Experimental probability approaches theoretical probability as trials increase',
      'Sample space: set of all possible outcomes',
      'Equally likely outcomes have same chance of occurring'
    ]
  },
  // ═══ CLASS 7 SCIENCE ═══
  {
    std: 7, subject: 'Science', chapter: 'Nutrition in Plants',
    keyPoints: [
      'Photosynthesis: plants make food using CO2 + H2O + sunlight → glucose + O2',
      'Chlorophyll in chloroplasts captures sunlight energy',
      'Stomata are tiny pores on leaves for gas exchange',
      'Autotrophs make their own food, heterotrophs depend on others',
      'Parasitic plants (Cuscuta) derive nutrition from host plants',
      'Insectivorous plants (Pitcher plant) trap insects for nitrogen'
    ]
  },
  {
    std: 7, subject: 'Science', chapter: 'Heat',
    keyPoints: [
      'Heat is energy, temperature is measure of hotness',
      'Three heat transfer methods: conduction (solids), convection (fluids), radiation (no medium)',
      'Conductors allow heat flow, insulators resist heat flow',
      'Sea breeze: land heats faster during day, cool air moves from sea to land',
      'Greenhouse effect: trapped infrared radiation warms Earth\'s atmosphere',
      'Clinical thermometer: 35°C to 42°C, Digital thermometers use thermistors'
    ]
  },
  // ═══ CLASS 7 MATHEMATICS ═══
  {
    std: 7, subject: 'Mathematics', chapter: 'Integers',
    keyPoints: [
      'Integers: ..., -3, -2, -1, 0, 1, 2, 3, ...',
      'Multiplication rules: +×+=+, +×-=-, -×+=+, -×-=+',
      'Addition of two negatives: add absolute values, put negative sign',
      'Subtraction: add the opposite (a - b = a + (-b))',
      'Integers are closed under addition, subtraction, multiplication',
      'Absolute value = distance from zero, always positive or zero'
    ]
  },
  {
    std: 7, subject: 'Mathematics', chapter: 'Fractions and Decimals',
    keyPoints: [
      'Fraction = numerator/denominator. Proper: numerator < denominator',
      'Improper fraction can be converted to mixed fraction',
      'To add/subtract fractions: find common denominator first',
      'To multiply fractions: multiply numerators and denominators directly',
      'Decimal = fraction with denominator 10, 100, 1000...',
      'To divide fractions: multiply by the reciprocal'
    ]
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  await NcertContent.deleteMany({});
  console.log('Cleared existing content\n');

  for (const ch of CHAPTERS) {
    await NcertContent.create({
      std: ch.std,
      board: 'CBSE',
      subjectName: ch.subject,
      chapterName: ch.chapter,
      content: ch.keyPoints.join('\n'),
      summary: `Key concepts from NCERT ${ch.subject} Chapter: ${ch.chapter}`,
      keyPoints: ch.keyPoints
    });
    console.log(`  ✓ Std ${ch.std} ${ch.subject} — ${ch.chapter}`);
  }

  await mongoose.disconnect();
  console.log(`\n✅ Seeded ${CHAPTERS.length} chapters with NCERT key points.`);
}

seed().catch(err => { console.error(err); process.exit(1); });
