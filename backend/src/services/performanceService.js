const PerformanceLevel = require('../models/PerformanceLevel');

const STAR_NAMES = {
  1: '🌱 Sprout',
  2: '🌿 Learner',
  3: '🌳 Star',
  4: '⭐ Superstar',
  5: '👑 Genius'
};

function calculateStarLevel(averageScore, currentLevel) {
  let raw = 1;
  if (averageScore >= 90) raw = 5;
  else if (averageScore >= 75) raw = 4;
  else if (averageScore >= 55) raw = 3;
  else if (averageScore >= 35) raw = 2;

  // Hysteresis: prevent oscillation at boundaries
  if (raw > currentLevel) return { level: raw, changed: raw > currentLevel };
  if (raw < currentLevel) {
    const diff = currentLevel - raw;
    if (diff >= 2) return { level: raw, changed: true };
    return { level: currentLevel, changed: false };
  }
  return { level: currentLevel, changed: false };
}

async function updateAfterQuiz(userId, subjectName, score, totalQuestions) {
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Atomic upsert: $inc totalQuizzes, recompute average via $set
  const perf = await PerformanceLevel.findOneAndUpdate(
    { userId, subjectName },
    {
      $inc: { totalQuizzes: 1 },
      $setOnInsert: {
        starLevel: 1,
        confidence: 0.5,
        averageScore: pct
      }
    },
    { upsert: true, returnDocument: 'after' }
  );

  const newTotal = perf.totalQuizzes;
  const newAvg = Math.round(((perf.averageScore * (newTotal - 1)) + pct) / newTotal);
  const oldLevel = perf.starLevel;
  const result = calculateStarLevel(newAvg, oldLevel);

  const updateFields = { averageScore: newAvg, confidence: Math.min(1, perf.confidence + 0.05) };

  if (result.changed) {
    updateFields.starLevel = result.level;
    updateFields.$push = {
      levelHistory: {
        fromLevel: oldLevel,
        toLevel: result.level,
        reason: `Average ${newAvg}% after ${newTotal} quizzes`
      }
    };
  }

  const updated = await PerformanceLevel.findOneAndUpdate(
    { _id: perf._id },
    updateFields,
    { returnDocument: 'after' }
  );

  return {
    starLevel: updated.starLevel,
    starName: STAR_NAMES[updated.starLevel] || '🌱 Sprout',
    averageScore: newAvg,
    totalQuizzes: newTotal,
    leveledUp: result.changed && result.level > oldLevel,
    oldLevel: result.changed ? oldLevel : undefined,
    confidence: updated.confidence
  };
}

async function getLevel(userId, subjectName) {
  const perf = await PerformanceLevel.findOne({ userId, subjectName });
  if (!perf) {
    return { starLevel: 1, starName: STAR_NAMES[1], totalQuizzes: 0, averageScore: 0, confidence: 0.5 };
  }
  return {
    starLevel: perf.starLevel,
    starName: STAR_NAMES[perf.starLevel] || '🌱 Sprout',
    totalQuizzes: perf.totalQuizzes,
    averageScore: perf.averageScore,
    confidence: perf.confidence,
    levelHistory: perf.levelHistory
  };
}

async function getAllLevels(userId) {
  const levels = await PerformanceLevel.find({ userId }).sort({ subjectName: 1 });
  return levels.map(p => ({
    subjectName: p.subjectName,
    starLevel: p.starLevel,
    starName: STAR_NAMES[p.starLevel] || '🌱 Sprout',
    totalQuizzes: p.totalQuizzes,
    averageScore: p.averageScore
  }));
}

function getAdaptivePrompt(starLevel) {
  if (starLevel <= 2) {
    return 'This student is at an early learning stage. Use very simple language, short sentences, many real-life examples, and lots of encouragement. Avoid jargon.';
  }
  if (starLevel === 3) {
    return 'This student is at an intermediate stage. Use clear explanations with some technical terms explained simply. Mix easy and challenging concepts.';
  }
  return 'This student is at an advanced stage. Use proper terminology, dive deeper, and challenge them with complex examples. They can handle detailed explanations.';
}

module.exports = { updateAfterQuiz, getLevel, getAllLevels, getAdaptivePrompt, STAR_NAMES };
