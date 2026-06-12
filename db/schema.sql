CREATE TABLE IF NOT EXISTS consultations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  contact_time TEXT,
  message TEXT,
  page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
