const express = require('express');
const bodyParser = require('body-parser');

const service = require('./service');

const app = express();
const jsonParser = bodyParser.json();

app.get('/:id', async (req, res) => {
  const id = String(req.params.id);
  try {
    const url = await service.getLongUrl(id);
    res.redirect(url);
  } catch (e) {
    res.send({ ok: false, message: e.message });
  }
});

app.post('/generate', jsonParser, async (req, res, next) => {
  try {
    const longUrl = req.body.url;
    const shortUrl = await service.shortenURL(longUrl);
    res.json({
      ok: true,
      shortUrl,
    });
  } catch (e) {
    next(e);
  }
});

app.use(jsonParser);

app.listen(3000);
