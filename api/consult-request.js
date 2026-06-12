const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const { name, phone, contact_time, message, page } = req.body || {};

  if (!name || typeof name !== 'string' || !phone || typeof phone !== 'string') {
    res.status(400).json({ error: 'name과 phone은 필수입니다.' });
    return;
  }
  if (name.length > 30 || phone.length > 20 || (message && message.length > 500)) {
    res.status(400).json({ error: 'invalid_length' });
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO consultations (name, phone, contact_time, message, page)
      VALUES (${name}, ${phone}, ${contact_time || null}, ${message || null}, ${page || null})
    `;
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('consult-request error:', err);
    res.status(500).json({ error: 'server_error' });
  }
};
