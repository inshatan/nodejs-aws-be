require('dotenv').config();
const express = require('express');
const axios = require('axios').default;

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/*', async (req, res) => {
  const { originalUrl, method, body } = req;
  const urlParts = originalUrl.split('/');
  const recipientUrl = process.env[urlParts[1]];

  if (!recipientUrl) {
    console.log(`Cannot process request for: "${urlParts[1]}"`);
    return res.status(502).json({ error: 'Cannot process request' });
  }

  try {
    const { data } = await axios({
      method,
      url: `${recipientUrl}/${urlParts.slice(2).join('/')}`,
      ...(Object.keys(body || {}).length > 0 && { data: req.body }),
    });
    console.log('... response', data);
    res.json(data);
  } catch (error) {
    console.log('... error', error.message);
    if (error.response) {
      const { status, data } = error.response;
      res.status(status).json(data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(port, () => {
  console.log('... ready');
  console.log(`start listening on port ${port}`);
});
