const https = require('https');

module.exports = async (req, res) => {
  const videoId = req.query && req.query.id;
  const user    = (req.query && req.query.user) || 'phoneplaza_kr';
  if (!videoId) return res.status(400).json({});

  const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${user}/video/${videoId}`;

  const body = await new Promise((resolve, reject) => {
    https.get(url, r => {
      let buf = '';
      r.on('data', c => buf += c);
      r.on('end', () => resolve(buf));
    }).on('error', reject);
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(body);
};
