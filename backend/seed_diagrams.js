require('dotenv').config();
const mongoose = require('mongoose');
const KnowledgeGraph = require('./src/models/KnowledgeGraph');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

const DIAGRAMS = [
  {
    conceptName: 'Photosynthesis',
    diagramType: 'flowchart',
    caption: 'Photosynthesis — how plants make food',
    mermaidDefinition: `graph TD
    A[Sunlight] --> C[Chlorophyll in Leaves]
    B[Water from Roots] --> C
    D[CO₂ from Air] --> C
    C --> E[Glucose 🍬]
    C --> F[Oxygen 💨]
    E --> G[Used for Energy & Growth]
    F --> H[Released into Air]`
  },
  {
    conceptName: 'Water Cycle',
    diagramType: 'flowchart',
    caption: 'The continuous movement of water in nature',
    mermaidDefinition: `graph LR
    A[🌊 Ocean & Lakes] -->|Evaporation ☀️| B[Water Vapor]
    B -->|Condensation ❄️| C[Clouds ☁️]
    C -->|Precipitation 🌧️| D[Rain & Snow]
    D -->|Runoff| A
    D -->|Groundwater| E[💧 Underground Water]
    E -->|Springs| A`
  },
  {
    conceptName: 'Digestive System',
    diagramType: 'flowchart',
    caption: 'Path of food through the human digestive system',
    mermaidDefinition: `graph TD
    A[👄 Mouth] -->|Chewing + Saliva| B[Esophagus]
    B -->|Peristalsis| C[Stomach 🫃]
    C -->|Acid + Enzymes| D[Small Intestine]
    D -->|Nutrients Absorbed| E[🩸 Bloodstream]
    D --> F[Large Intestine]
    F -->|Water Absorbed| G[🚽 Excretion]`
  },
  {
    conceptName: 'Pythagoras Theorem',
    diagramType: 'flowchart',
    caption: 'a² + b² = c² — relationship in a right triangle',
    mermaidDefinition: `graph LR
    A[Right Triangle 📐] --> B[Side a: Perpendicular]
    A --> C[Side b: Base]
    A --> D[Side c: Hypotenuse]
    E[a² + b² = c²] --> F[Find any side if other two known]
    F --> G[Used in: Construction, Navigation, Physics]`
  },
  {
    conceptName: 'Electric Circuit',
    diagramType: 'flowchart',
    caption: 'Simple electric circuit with a battery and bulb',
    mermaidDefinition: `graph LR
    A[🔋 Battery] -->|Current flows| B[Switch 🔘]
    B -->|Closed| C[💡 Bulb]
    C --> D[Glows 💡]
    C --> E[📏 Ammeter measures current]
    E --> A`
  },
  {
    conceptName: 'Solar System',
    diagramType: 'flowchart',
    caption: 'Our solar system — Sun and orbiting planets',
    mermaidDefinition: `graph TD
    A[☀️ Sun] --> B[Mercury]
    A --> C[Venus]
    A --> D[🌍 Earth]
    A --> E[Mars]
    A --> F[Jupiter]
    A --> G[Saturn]
    A --> H[Uranus]
    A --> I[Neptune]
    D --> J[🌙 Moon orbits Earth]`
  },
  {
    conceptName: 'Food Chain',
    diagramType: 'flowchart',
    caption: 'Energy flow in an ecosystem',
    mermaidDefinition: `graph LR
    A[☀️ Sun] --> B[🌱 Producer Plants]
    B --> C[🐇 Primary Consumer Herbivore]
    C --> D[🦊 Secondary Consumer Carnivore]
    D --> E[🦅 Tertiary Consumer]
    E --> F[🦠 Decomposers]
    F -->|Returns nutrients| B`
  },
  {
    conceptName: 'Types of Triangles',
    diagramType: 'flowchart',
    caption: 'Classification of triangles by sides and angles',
    mermaidDefinition: `graph TD
    A[Triangles 📐] --> B[By Sides]
    A --> C[By Angles]
    B --> D[Equilateral 📏 All sides equal]
    B --> E[Isosceles 📏 Two sides equal]
    B --> F[Scalene 📏 No sides equal]
    C --> G[Acute 🔺 All angles < 90°]
    C --> H[Right 🔺 One angle = 90°]
    C --> I[Obtuse 🔺 One angle > 90°]`
  },
  {
    conceptName: 'Respiratory System',
    diagramType: 'flowchart',
    caption: 'How we breathe — the path of air through the respiratory system',
    mermaidDefinition: `graph TD
    A[👃 Nose] -->|Inhale| B[Trachea]
    B --> C[Bronchi]
    C --> D[Bronchioles]
    D --> E[Alveoli 🫁]
    E -->|O₂ enters blood| F[🩸 Bloodstream]
    E -->|CO₂ leaves blood| G[Exhale 💨]
    F --> H[Oxygen carried to all body cells]`
  },
  {
    conceptName: 'Gravity',
    diagramType: 'flowchart',
    caption: 'Gravity — the force that pulls everything toward Earth',
    mermaidDefinition: `graph TD
    A[🌍 Earth] -->|Gravitational Force| B[Pulls objects down]
    B --> C[🍎 Apple falls]
    B --> D[🏀 Ball comes down]
    B --> E[🌊 Ocean tides]
    C --> F[Acceleration = 9.8 m/s²]
    D --> F
    E -->|Moon's gravity| G[🌙 Moon]`
  },
  {
    conceptName: 'Magnetism',
    diagramType: 'flowchart',
    caption: 'Magnetism — attraction and repulsion between magnetic poles',
    mermaidDefinition: `graph LR
    A[🧲 Bar Magnet] --> B[North Pole N]
    A --> C[South Pole S]
    B -->|Attracts| D[Opposite Pole S]
    B -->|Repels| E[Same Pole N]
    A --> H[🪙 Attracts Iron, Nickel, Cobalt]
    A --> I[🧭 Compass points North]`
  },
  {
    conceptName: 'Fractions',
    diagramType: 'flowchart',
    caption: 'Fractions — parts of a whole with numerator and denominator',
    mermaidDefinition: `graph TD
    A[🍕 Pizza cut into 8 slices] --> B[You eat 3 slices]
    B --> C[Numerator = 3 parts taken]
    A --> D[Total = 8 slices]
    D --> E[Denominator = 8 total parts]
    C --> F[Fraction = ³⁄₈]
    E --> F
    F --> G[Types: Proper ⅗, Improper ⁵⁄₃, Mixed 1⅔, Equivalent ½ = ²⁄₄]`
  },
  {
    conceptName: 'Types of Angles',
    diagramType: 'flowchart',
    caption: 'Classification of angles by their measure in degrees',
    mermaidDefinition: `graph TD
    A[Angles 📐] --> B[Acute < 90°]
    A --> C[Right = 90°]
    A --> D[Obtuse > 90° and < 180°]
    A --> E[Straight = 180°]
    A --> F[Reflex > 180° and < 360°]
    A --> G[Full = 360°]
    B --> H[Example: 45° ✏️]
    C --> I[Corner of a book 📖]
    D --> J[Example: 120°]
    E --> K[Straight line 📏]`
  }
];

async function seedDiagrams() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const SCIENCE_ONLY = ['Photosynthesis', 'Water Cycle', 'Digestive System', 'Electric Circuit', 'Solar System', 'Food Chain', 'Respiratory System', 'Gravity', 'Magnetism'];
  const MATH_AND_SCIENCE = ['Pythagoras Theorem', 'Types of Triangles'];
  const MATH_ONLY = ['Fractions', 'Types of Angles'];

  for (const diagram of DIAGRAMS) {
    const isScienceOnly = SCIENCE_ONLY.includes(diagram.conceptName);
    const isMathOnly = MATH_ONLY.includes(diagram.conceptName);
    let subjects = ['Science', 'Mathematics'];
    if (isScienceOnly) subjects = ['Science'];
    if (isMathOnly) subjects = ['Mathematics'];
    const stds = [7, 8, 9, 10];

    for (const subject of subjects) {
      for (const std of stds) {
        const result = await KnowledgeGraph.findOneAndUpdate(
          { std, board: 'CBSE', subjectName: subject },
          { $addToSet: { conceptDiagrams: diagram } },
          { returnDocument: 'after' }
        );
        if (result) {
          console.log(`Added "${diagram.conceptName}" → ${subject} Std ${std}`);
        }
      }
    }
  }

  await mongoose.disconnect();
  console.log('Done seeding diagrams');
}

seedDiagrams().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
