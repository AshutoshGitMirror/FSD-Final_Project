const savedLinksService = require('../services/savedLinksService');

const listSavedLinks = async (req, res) => {
  try {
    const links = await savedLinksService.listLinksForUser(req.user.userId);
    res.json(links);
  } catch {
    res.status(500).json({ error: 'Failed to fetch saved links' });
  }
};

const saveLink = async (req, res) => {
  try {
    const { link, created } = await savedLinksService.createSavedLink(req.user.userId, req.body);
    res.status(created ? 201 : 200).json(link);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : 'Failed to save link'
    });
  }
};

module.exports = {
  listSavedLinks,
  saveLink
};
