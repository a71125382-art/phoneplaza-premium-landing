const https = require('https');

const CHANNEL_ID = 'UCrLKQ081hfU1Sbp2_uycotQ';
const FEED_URL   = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

exports.handler = async function() {
  const xml = await new Promise((resolve, reject) => {
    https.get(FEED_URL, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve(buf));
    }).on('error', reject);
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=1800',
    },
    body: xml,
  };
};
