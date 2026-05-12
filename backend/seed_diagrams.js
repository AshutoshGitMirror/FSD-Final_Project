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
  }
];

async function seedDiagrams() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const diagram of DIAGRAMS) {
    const subjects = ['Science', 'Mathematics'];
    const stds = [7, 8, 9, 10];

    for (const subject of subjects) {
      for (const std of stds) {
        const result = await KnowledgeGraph.findOneAndUpdate(
          { std, board: 'CBSE', subjectName: subject },
          { $addToSet: { conceptDiagrams: diagram } },
          { new: true }
        );
        if (result) {
          console.log(`Added diagram "${diagram.conceptName}" to ${subject} Std ${std}`);
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
