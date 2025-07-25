const express = require('express');
const { saveResponse, checkConnection } = require('./db');

const app = express();
app.use(express.json());

app.get('/test/server-up', (req, res) => {  
  res.send('Webhook server is running');
  console.log('Server running test.');
});

app.get('/test/db-check', async (req, res) => {
  try {
    const now = await checkConnection();
    res.status(200).json({ status: 'ok', timestamp: now }).send();
    console.log('Conexión exitosa:', now);
  } catch (error) {    
    res.status(500).json({ status: 'error', message: 'DB check failed' }).send();
    console.error('DB check failed:', error);
  }
});
  
app.post('/webhook/typeform', async (req, res) => {
  console.log('Webhook recibido:', req.body);
  await saveResponse(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ${PORT}`));

