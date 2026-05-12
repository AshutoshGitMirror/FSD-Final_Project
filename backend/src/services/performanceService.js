const PerformanceLevel = require('../models/PerformanceLevel');

const STAR_NAMES = {
  1: '🌱 Sprout',
  2: '🌿 Learner',
  3: '🌳 Star',
  4: '⭐ Superstar',
  5: '👑 Genius'
};

function calculateStarLevel(averageScore, totalQuizzes, currentLevel) {
  if (totalQuizzes < 2) return { level: 1, changed: false };

  let newLevel = 1;
  if (averageScore >= 90) newLevel = 5;
  else if (averageScore >= 75) newLevel = 4;
  else if (averageScore >= 55) newLevel = 3;
  else if (averageScore >= 35) newLevel = 2;
  else newLevel = 1;

  if (newLevel === currentLevel) return { level: currentLevel, changed: false };
  return { level: newLevel, changed: true };
}

async function updateAfterQuiz(userId, subjectName, score, totalQuestions) {
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  let perf = await PerformanceLevel.findOne({ userId, subjectName });
  if (!perf) {
    perf = await PerformanceLevel.create({ userId, subjectName });
  }

  const oldLevel = perf.starLevel;
  const newTotal = perf.totalQuizzes + 1;
  const newAvg = Math.round(((perf.averageScore * perf.totalQuizzes) + pct) / newTotal);

  perf.totalQuizzes = newTotal;
  perf.averageScore = newAvg;
  perf.confidence = Math.min(1, perf.confidence + 0.05);

  const result = calculateStarLevel(newAvg, newTotal, oldLevel);
  if (result.changed) {
    perf.starLevel = result.level;
    perf.levelHistory.push({
      fromLevel: oldLevel,
      toLevel: result.level,
      reason: `Average score ${newAvg}% after ${newTotal} quizzes`
    });
  }

  await perf.save();

  return {
    starLevel: perf.starLevel,
    starName: STAR_NAMES[perf.starLevel] || '🌱 Sprout',
    averageScore: newAvg,
    totalQuizzes: newTotal,
    leveledUp: result.changed && result.level > oldLevel,
    oldLevel: result.changed ? oldLevel : undefined,
    confidence: perf.confidence
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
    return 'This student is at a intermediate stage. Use clear explanations with some technical terms explained simply. Mix easy and challenging concepts.';
  }
  return 'This student is at an advanced stage. Use proper terminology, dive deeper, and challenge them with complex examples. They can handle detailed explanations.';
}

module.exports = { updateAfterQuiz, getLevel, getAllLevels, getAdaptivePrompt, STAR_NAMES };
