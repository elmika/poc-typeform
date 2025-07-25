# Typeform Webhook PoC – Mediala Tech

Esta prueba de concepto conecta un formulario Typeform con un backend Node.js para:

- Mostrar el formulario incrustado en una modal
- Pasar campos ocultos (`userId`, `email`) desde la URL
- Recibir respuestas vía webhook
- Persistir las respuestas completas en una tabla PostgreSQL (`JSONB`)

---

## 📦 Stack

- Node.js + Express
- PostgreSQL (Render)
- Typeform API (webhook + embed)
- Arquitectura preparada para evolución hexagonal [Pending]

---

## 🚀 Cómo usar

### 1. Clonar y configurar

```bash
git clone https://github.com/tu-usuario/poc-typeform.git
cd poc-typeform
npm install
```

### 2. Variables de entorno

Crea un archivo `.env`:

```env
DATABASE_URL=postgres://usuario:clave@host:puerto/db?sslmode=require
```

> Nota: Render inyecta automáticamente `DATABASE_URL`.

Edita el id de tu formulario en index.js (const formId = 'XXX'; // <-- tu FORM ID en live mode)

---

### 3. Lanzar en local

```bash
npm run dev
```

Navega a:  
`http://localhost:3000/survey?userId=abc123&email=test@example.com`

---

### 4. Probar el webhook

- Desde Typeform, configura un webhook apuntando a:  
  `https://<tu-app>.onrender.com/webhook/typeform`
- El backend lo persistirá en PostgreSQL (tabla `typeform_responses`)

---

## 📁 Estructura del proyecto

```
.
├── index.js            # Servidor Express
├── db.js               # Conexión PostgreSQL + funciones
├── .env                # Variables locales (no subir)
├── package.json
└── README.md
```

---

## 🧪 Base de datos

Crea la tabla typeform_responses con el SQL de create_typeform_responses.sql

---

## ✨ Pendiente

- [ ] Listar respuestas desde `/responses`
- [ ] Detectar respuestas duplicadas (`userId`)
- [ ] Validaciones en capa de dominio
- [ ] Evolucionar a arquitectura hexagonal completa
- [ ] Introducir auth en el webhook
- [ ] Convertir todo el flujo a un script

---

## 🧠 Autor

Mika — [mediala.tech](https://mediala.tech)  
Proyecto interno para gestión de clima laboral y conflictos en organizaciones.
