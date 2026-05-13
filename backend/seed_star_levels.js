require('dotenv').config();
const mongoose = require('mongoose');
const KnowledgeGraph = require('./src/models/KnowledgeGraph');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

// Star level requirements: easier chapters = lower star level
// 1 = Sprout (basic), 2 = Learner, 3 = Star, 4 = Superstar, 5 = Genius (mastery)
// Chapters towards the end of each subject get higher requirements
async function seedStarLevels() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  const graphs = await KnowledgeGraph.find({});
  let updated = 0;

  for (const graph of graphs) {
    const totalNodes = graph.nodes.length;
    let changed = false;

    for (let i = 0; i < totalNodes; i++) {
      const node = graph.nodes[i];
      const position = (i / totalNodes); // 0 to 1
      const prereqCount = (node.prerequisites || []).length;
      const prereqStarLevels = node.prerequisites
        .map(name => {
          const prereqNode = graph.nodes.find(n => n.chapterName === name);
          return prereqNode ? (prereqNode.minStarLevel || 1) : 0;
        })
        .filter(Boolean);

      // Base level from position in curriculum
      let minStar = Math.max(1, Math.ceil(position * 5));

      // Harder topics get +1
      if (node.difficulty >= 4) minStar = Math.min(5, minStar + 1);

      // Chapters with many prerequisites need higher level
      if (prereqCount >= 2) minStar = Math.min(5, minStar + 1);

      // Ensure it's at least as high as the highest prerequisite
      if (prereqStarLevels.length > 0) {
        minStar = Math.max(minStar, Math.max(...prereqStarLevels));
      }

      // Ensure first 2 chapters are always accessible
      if (i < 2) minStar = 1;

      if (node.minStarLevel !== minStar) {
        node.minStarLevel = minStar;
        changed = true;
      }
    }

    if (changed) {
      await graph.save();
      updated++;
      const levels = graph.nodes.map(n => `${n.chapterName.slice(0,20)}:⭐${n.minStarLevel}`);
      console.log(`  ✓ Std ${graph.std} ${graph.subjectName}`);
      levels.forEach(l => console.log(`    ${l}`));
    }
  }

  await mongoose.disconnect();
  console.log(`\n✅ Updated star levels for ${updated} subjects.`);
}

seedStarLevels().catch(err => { console.error(err); process.exit(1); });
