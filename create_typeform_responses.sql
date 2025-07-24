CREATE TABLE typeform_responses (
  id SERIAL PRIMARY KEY,
  form_id TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL
);
