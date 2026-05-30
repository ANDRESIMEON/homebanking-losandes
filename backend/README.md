# Home Banking — CRAC Los Andes 🏔️
**Estudiante:** SIMEON GABRIEL, ANDRE DAVID | Código: 73892555  
**Curso:** Desarrollo de Aplicaciones Web 2026  
**Framework:** Node.js + React + Supabase

---

## Estructura del proyecto

```
/
├── losandes_backend/      ← API REST Node.js + Supabase
│   ├── app.js
│   ├── package.json
│   ├── .env               ← (NO subir a GitHub)
│   ├── .env.example
│   └── src/
│       ├── config/supabase.js
│       ├── repositories/authRepository.js
│       ├── services/authService.js
│       ├── controllers/authController.js
│       └── routes/authRoutes.js
│
└── losandes_frontend/     ← React (Vite)
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── pages/
        │   ├── LandingPage.jsx   ← Página principal CRAC Los Andes
        │   ├── LoginPage.jsx     ← Banca por Internet
        │   └── DashboardPage.jsx ← Panel del cliente
        ├── components/
        │   └── ProtectedRoute.jsx
        └── services/
            └── authService.js
```

---

## Cómo correr el proyecto

### 1. Backend (Terminal 1)

```bash
cd losandes_backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm run dev
```
→ Servidor en http://localhost:3000

### 2. Frontend (Terminal 2)

```bash
cd losandes_frontend
npm install
npm run dev
```
→ App en http://localhost:5173

---

## Variables de entorno (.env)

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key
JWT_SECRET=losandes_secreto_2026
PORT=3000
```

---

## Endpoints API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET  | `/` | Verificar servidor |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET  | `/api/auth/me` | Datos del usuario (requiere token) |

---

## Flujo de la aplicación

1. **Landing** → Página pública con productos de CRAC Los Andes
2. **Login** → Formulario que conecta con el backend Node.js
3. **Dashboard** → Panel privado (protegido, solo con sesión activa)
4. **Cerrar sesión** → Elimina el token y redirige al inicio

---

## Referencia

- Backend base: https://github.com/u2008113935/devappweb_s2_m1_node_supabase
- Entidad asignada: CRAC Los Andes → https://losandes.pe/
