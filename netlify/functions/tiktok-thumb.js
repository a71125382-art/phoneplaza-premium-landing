const https = require('https');

exports.handler = async function(event) {
  const videoId = event.queryStringParameters && event.queryStringParameters.id;
  const user    = (event.queryStringParameters && event.queryStringParameters.user) || 'phoneplaza_kr';
  if (!videoId) return { statusCode: 400, body: '{}' };

  const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${user}/video/${videoId}`;

  const body = await new Promise((resolve, reject) => {
    https.get(url, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve(buf));
    }).on('error', reject);
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
    body,
  };
};
