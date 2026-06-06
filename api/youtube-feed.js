const https = require('https');

const CHANNEL_ID = 'UCrLKQ081hfU1Sbp2_uycotQ';
const FEED_URL   = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

module.exports = async (req, res) => {
  const xml = await new Promise((resolve, reject) => {
    https.get(FEED_URL, r => {
      let buf = '';
      r.on('data', c => buf += c);
      r.on('end', () => resolve(buf));
    }).on('error', reject);
  });

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=1800');
  res.status(200).send(xml);
};
