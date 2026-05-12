const savedLinksService = require('../services/savedLinksService');

const listSavedLinks = async (req, res) => {
  try {
    const links = await savedLinksService.listYoutubeLinksForUser(req.user.userId);
    res.json(links);
  } catch {
    res.status(500).json({ error: 'Failed to fetch saved links' });
  }
};

const saveLink = async (req, res) => {
  try {
    const link = await savedLinksService.createSavedLink(req.user.userId, req.body);
    res.status(201).json(link);
  } catch {
    res.status(500).json({ error: 'Failed to save link' });
  }
};

module.exports = {
  listSavedLinks,
  saveLink
};
