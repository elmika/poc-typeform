const express = require('express');
const { saveResponse } = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Webhook server is running');
});

app.post('/webhook/typeform', async (req, res) => {
  console.log('Webhook recibido:', req.body);
  await saveResponse(req.body);
  res.sendStatus(200);
});

app.get('/survey', (req, res) => {
  const userId = req.query.userId || 'anonymous';
  const email = req.query.email || 'none@example.com';
  const formId = '01K0YE8S2SHJA8XNNQ9G9ZWE7M'; // <-- tu FORM ID en live mode

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Survey Modal</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 50px; }
          #modal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 999;
            display: flex; justify-content: center; align-items: center;
          }
          #modalContent {
            background: white; padding: 2rem; border-radius: 8px;
            max-width: 90%; width: 600px;
          }
          button { margin-top: 1rem; padding: 0.5rem 1rem; }
        </style>
      </head>
      <body>
        <h1>Encuesta de Clima Laboral</h1>
        <button id="openModal">Responder ahora</button>

        <div id="modal">
          <div id="modalContent">
            <div
              data-tf-live="${formId}"
              data-tf-hidden="userId=${userId},email=${email}">
            </div>
            <button id="closeModal">Cerrar</button>
          </div>
        </div>

        <script src="https://embed.typeform.com/next/embed.js"></script>
        <script>
          const modal = document.getElementById('modal');
          document.getElementById('openModal').onclick = () => modal.style.display = 'flex';
          document.getElementById('closeModal').onclick = () => modal.style.display = 'none';
        </script>
      </body>
    </html>
  `;

  res.send(html);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ${PORT}`));

