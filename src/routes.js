const express = require('express');
const bodyParser = require('body-parser');
const service = require('./service');

const PORT = 3000;
const jsonParser = bodyParser.json();
const routes = express.Router();

routes.get('/:id', async (req, res) => {
  const id = String(req.params.id);
  try {
    const url = await service.getLongUrl(id);
    res.redirect(url);
  } catch (e) {
    res.send({ ok: false, message: e.message });
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
  } catch (err) {
    res.json({
      ok: false,
      err,
    });
  }
});

module.exports = routes;
