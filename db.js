require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario para Render
  }
});

async function saveResponse(msg) {
  const form_id = msg.form_response.form_id;
  const submitted_at = msg.form_response.submitted_at;
  const payload = msg;

  const query = `
    INSERT INTO typeform_responses (form_id, submitted_at, payload)
    VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(query, [form_id, submitted_at, payload]);
    console.log('Respuesta guardada');
  } catch (err) {
    console.error('Error al guardar respuesta:', err);
  }
}

module.exports = { saveResponse };
