const Achievement = require('../models/Achievement');
const DailyReward = require('../models/DailyReward');
const PerformanceLevel = require('../models/PerformanceLevel');
const Progress = require('../models/Progress');
const SavedLinks = require('../models/SavedLinks');

const ACHIEVEMENTS = {
  first_quiz:    { name: 'First Quiz',    icon: '🎯', desc: 'Complete your first quiz',                maxProgress: 1, xpReward: 50 },
  star_learner:  { name: 'Star Learner',  icon: '🌳', desc: 'Reach Star Level 3 in any subject',      maxProgress: 3, xpReward: 100 },
  perfect_score: { name: 'Perfect Score', icon: '💯', desc: 'Get 100% on a quiz',                     maxProgress: 1, xpReward: 150 },
  streak_master: { name: 'Streak Master', icon: '🔥', desc: '7-day streak',                           maxProgress: 7, xpReward: 200 },
  bookworm:      { name: 'Bookworm',      icon: '📖', desc: 'Watch 10 educational videos',               maxProgress: 10, xpReward: 100 },
  teacher:       { name: 'Teacher',       icon: '👨‍🏫', desc: 'Use Teach Mode 5 times',                  maxProgress: 5, xpReward: 150 },
  explorer:      { name: 'Explorer',      icon: '🧭', desc: 'Visit all subjects',                      maxProgress: 1, xpReward: 100 },
  genius:        { name: 'Genius',        icon: '👑', desc: 'Reach Star Level 5 in any subject',      maxProgress: 5, xpReward: 500 },
  dedicated:     { name: 'Dedicated',     icon: '⭐', desc: 'Complete 20 quizzes',                     maxProgress: 20, xpReward: 200 },
  all_rounder:   { name: 'All-Rounder',   icon: '🌟', desc: 'Star Level 3 in ALL subjects',            maxProgress: 1, xpReward: 1000 },
};

async function ensureAchievement(userId, achievementId) {
  let ach = await Achievement.findOne({ userId, achievementId });
  if (!ach) {
    ach = await Achievement.create({
      userId, achievementId,
      maxProgress: ACHIEVEMENTS[achievementId]?.maxProgress || 1
    });
  }
  return ach;
}

async function checkAndAward(userId, action, metadata = {}) {
  const newAchievements = [];
  const earned = [];

  if (action === 'quiz_complete') {
    const count = await Progress.countDocuments({ userId });
    await updateProgress(userId, 'first_quiz', count >= 1, 1, newAchievements, earned);
    await updateProgress(userId, 'perfect_score', metadata.score === 100, 1, newAchievements, earned);
    await updateProgress(userId, 'dedicated', Math.min(count, 20), 20, newAchievements, earned);
  }

  if (action === 'star_level_up') {
    await updateProgress(userId, 'star_learner', (metadata.starLevel || 0) >= 3, 3, newAchievements, earned);
    await updateProgress(userId, 'genius', (metadata.starLevel || 0) >= 5, 5, newAchievements, earned);
  }

  if (action === 'view_video') {
    const count = await SavedLinks.countDocuments({ userId, source: 'youtube' });
    await updateProgress(userId, 'bookworm', Math.min(count, 10), 10, newAchievements, earned);
  }

  if (action === 'teach_mode') {
    const existing = await Achievement.findOne({ userId, achievementId: 'teacher' });
    const count = existing?.progress || 0;
    await updateProgress(userId, 'teacher', Math.min(count + 1, 5), 5, newAchievements, earned);
  }

  if (action === 'streak_update') {
    await ensureAchievement(userId, 'streak_master');
    await updateProgress(userId, 'streak_master', Math.min(metadata.streak || 0, 7), 7, newAchievements, earned);
  }

  if (action === 'all_subjects') {
    const levels = await PerformanceLevel.find({ userId });
    const allAbove3 = levels.length >= 3 && levels.every(l => l.starLevel >= 3);
    await updateProgress(userId, 'all_rounder', allAbove3 ? 1 : 0, 1, newAchievements, earned);
  }

  if (action === 'review_complete') {
    await ensureAchievement(userId, 'teacher');
    const existing = await Achievement.findOne({ userId, achievementId: 'teacher' });
    const count = existing?.progress || 0;
    await updateProgress(userId, 'teacher', Math.min(count + 1, 5), 5, newAchievements, earned);
  }

  return { newAchievements: earned, achievements: newAchievements };
}

async function updateProgress(userId, achievementId, condition, maxProgress, achievementsArr, earnedArr) {
  const ach = await ensureAchievement(userId, achievementId);
  if (ach.unlockedAt) return;

  let newProgress;
  if (typeof condition === 'number') {
    newProgress = Math.min(condition, maxProgress);
  } else if (condition) {
    newProgress = maxProgress;
  } else {
    newProgress = ach.progress;
  }
  ach.progress = newProgress;
  ach.maxProgress = maxProgress;

  if (condition && newProgress >= maxProgress && !ach.unlockedAt) {
    ach.unlockedAt = new Date();
    earnedArr.push({
      achievementId,
      name: ACHIEVEMENTS[achievementId]?.name || achievementId,
      icon: ACHIEVEMENTS[achievementId]?.icon || '🏆',
      desc: ACHIEVEMENTS[achievementId]?.desc || '',
      xpReward: ACHIEVEMENTS[achievementId]?.xpReward || 0
    });
  }

  await ach.save();
  achievementsArr.push(ach);
}

async function claimDailyReward(userId) {
  const today = new Date().toISOString().split('T')[0];
  let reward = await DailyReward.findOne({ userId });
  if (!reward) {
    reward = await DailyReward.create({ userId, currentStreak: 1, lastClaimDate: today, claimedDates: [today] });
    return { streak: 1, xpEarned: 50, isNew: true };
  }

  if (reward.claimedDates.includes(today)) {
    return { streak: reward.currentStreak, xpEarned: 0, alreadyClaimed: true };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (reward.lastClaimDate === yesterday) {
    reward.currentStreak += 1;
  } else if (reward.lastClaimDate !== today) {
    reward.currentStreak = 1;
  }

  reward.lastClaimDate = today;
  reward.claimedDates.push(today);
  const day = reward.currentStreak;
  const xpMap = { 1: 50, 2: 75, 3: 100, 4: 150, 5: 200, 6: 250, 7: 500 };
  const xpEarned = xpMap[Math.min(day, 7)] || 100;
  reward.totalXpEarned += xpEarned;

  await reward.save();

  if (day >= 7) {
    await checkAndAward(userId, 'streak_update', { streak: day });
  }

  return { streak: reward.currentStreak, xpEarned, isNew: false };
}

async function getUserAchievements(userId) {
  const achievements = await Achievement.find({ userId });
  const result = [];

  for (const [id, def] of Object.entries(ACHIEVEMENTS)) {
    const existing = achievements.find(a => a.achievementId === id);
    result.push({
      achievementId: id,
      name: def.name,
      icon: def.icon,
      desc: def.desc,
      unlocked: existing?.unlockedAt ? true : false,
      unlockedAt: existing?.unlockedAt || null,
      progress: existing?.progress || 0,
      maxProgress: def.maxProgress,
      xpReward: def.xpReward
    });
  }

  return result;
}

async function getGamificationDashboard(userId) {
  const reward = await DailyReward.findOne({ userId });
  const achievements = await Achievement.find({ userId });
  const recentUnlocks = achievements.filter(a => a.unlockedAt).sort((a, b) => b.unlockedAt - a.unlockedAt).slice(0, 3);
  const today = new Date().toISOString().split('T')[0];
  const canClaim = !reward?.claimedDates?.includes(today);

  return {
    streak: reward?.currentStreak || 0,
    canClaimDaily: canClaim,
    totalXpEarned: reward?.totalXpEarned || 0,
    recentAchievements: recentUnlocks.map(a => ({
      achievementId: a.achievementId,
      name: ACHIEVEMENTS[a.achievementId]?.name || a.achievementId,
      icon: ACHIEVEMENTS[a.achievementId]?.icon || '🏆',
      unlockedAt: a.unlockedAt
    })),
    unlockedCount: achievements.filter(a => a.unlockedAt).length,
    totalCount: Object.keys(ACHIEVEMENTS).length
  };
}

module.exports = { checkAndAward, claimDailyReward, getUserAchievements, getGamificationDashboard, ACHIEVEMENTS };
