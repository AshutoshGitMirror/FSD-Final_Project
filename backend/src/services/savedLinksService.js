const SavedLinks = require('../models/SavedLinks');

const listYoutubeLinksForUser = (userId) => (
  SavedLinks.find({ userId, source: 'youtube' }).sort({ createdAt: -1 })
);

const createSavedLink = (userId, payload) => {
  const link = new SavedLinks({ ...payload, userId });
  return link.save();
};

module.exports = {
  listYoutubeLinksForUser,
  createSavedLink
};
