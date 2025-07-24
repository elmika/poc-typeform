const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Webhook server is running');
});


app.post('/webhook/typeform', (req, res) => {
  console.log('Webhook recibido:', req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ${PORT}`));

