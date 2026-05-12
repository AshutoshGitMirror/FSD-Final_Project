const SavedLinks = require('../models/SavedLinks');

const normalizeLinkInput = ({ url, title, source } = {}) => {
  if (!url) {
    const error = new Error('url is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedSource = source === 'shaalaa' ? 'shaalaa' : 'youtube';
  const normalizedTitle =
    (title && String(title).trim()) ||
    (normalizedSource === 'youtube' ? 'YouTube Resource' : 'Shaalaa Resource');

  return {
    url,
    title: normalizedTitle,
    source: normalizedSource
  };
};

const listLinksForUser = (userId) => (
  SavedLinks.find({ userId }).sort({ createdAt: -1 })
);

const createSavedLink = async (userId, payload) => {
  const linkInput = normalizeLinkInput(payload);
  const existing = await SavedLinks.findOne({
    userId,
    url: linkInput.url,
    source: linkInput.source
  });

  if (existing) {
    return { link: existing, created: false };
  }

  const link = await SavedLinks.create({
    userId,
    ...linkInput
  });

  return { link, created: true };
};

module.exports = {
  listLinksForUser,
  createSavedLink
};
