const express = require('express');
const service = require('./service');
const { PORT } = require('./config');

const routes = express.Router();

routes.get('/:id', async (req, res) => {
  const id = String(req.params.id);
  try {
    const url = await service.getLongUrl(id);
    res.redirect(url);
  } catch (e) {
    res.status(400).send({ ok: false, message: e.message });
  }
});
routes.post('/generate', async (req, res) => {
  try {
    const longUrl = req.body.url;
    const id = await service.shortenURL(longUrl);
    const shortUrl = `http://localhost:${PORT}/${id}`;
    res.json({
      ok: true,
      id,
      shortUrl,
      longUrl,
    });
  } catch (e) {
    const { message } = e;
    res.status(400).json({
      ok: false,
      message,
    });
  }
});

module.exports = routes;
