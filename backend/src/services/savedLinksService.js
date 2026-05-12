const SavedLinks = require('../models/SavedLinks');

const normalizeLinkInput = ({ url, title, source } = {}) => {
  if (!url) {
    const error = new Error('url is required');
    error.statusCode = 400;
    throw error;
  }

  try {
    new URL(url);
  } catch {
    const error = new Error('Invalid URL format');
    error.statusCode = 400;
    throw error;
  }

  const validSources = ['youtube', 'shaalaa'];
  const normalizedSource = source && validSources.includes(source) ? source : 'youtube';
  const normalizedTitle =
    (title && String(title).trim()) ||
    (normalizedSource === 'youtube' ? 'YouTube Resource' : 'Shaalaa Resource');

  return {
    url,
    title: normalizedTitle,
    source: normalizedSource
  };
};

const listLinksForUser = async (userId) => {
  return await SavedLinks.find({ userId }).sort({ createdAt: -1 }).exec();
};

const createSavedLink = async (userId, payload) => {
  const linkInput = normalizeLinkInput(payload);

  const link = await SavedLinks.findOneAndUpdate(
    {
      userId,
      url: linkInput.url,
      source: linkInput.source
    },
    {
      $setOnInsert: {
        userId,
        ...linkInput
      }
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );

  const created = link.createdAt.getTime() === link.updatedAt.getTime();

  return { link, created };
};

module.exports = {
  listLinksForUser,
  createSavedLink
};
