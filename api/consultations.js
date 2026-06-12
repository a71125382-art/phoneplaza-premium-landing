const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT id, name, phone, contact_time, message, page, created_at
      FROM consultations
      ORDER BY created_at DESC
      LIMIT 200
    `;
    res.status(200).json({ items: rows });
  } catch (err) {
    console.error('consultations error:', err);
    res.status(500).json({ error: 'server_error' });
  }
};
