# 🔐 Authentication Feature — Implementation Guide

**Branch:** `@authFeature`  
**Stack:** Express + MySQL (Backend) | React + Vite (Frontend)  
**Strategy:** JWT + bcrypt (stateless, token-based auth)

---

## New Dependencies

| Package | Side | Purpose |
|---------|------|---------|
| `jsonwebtoken` | Backend | Generate & verify JWT tokens |
| `bcryptjs` | Backend | Hash & compare passwords |
| `react-router-dom` | Frontend | Page routing (Login, Register, Home) |

---

## Backend Implementation

### Step 1 — Create `users` Table in MySQL

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2 — Install Packages

```bash
npm install jsonwebtoken bcryptjs
```

### Step 3 — Add to `.env`

```
JWT_SECRET=your_random_secret_key
JWT_EXPIRES_IN=7d
```

### Step 4 — New Files (following existing layered pattern)

| # | File | Purpose |
|---|------|---------|
| 1 | `repositories/userRepository.js` | `findByEmail()`, `findByUsername()`, `createUser()` |
| 2 | `services/authService.js` | Hash password, compare password, generate JWT |
| 3 | `controllers/authController.js` | Handle `register` & `login` requests |
| 4 | `routes/authRoutes.js` | `POST /api/auth/register`, `POST /api/auth/login` |
| 5 | `middleware/authMiddleware.js` | Verify JWT from `Authorization` header |

### Step 5 — Wire into `app.js`

```js
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Optionally protect quote routes
const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/quotes', authMiddleware, quoteRoutes);
```

### Step 6 — Test with Postman

- `POST /api/auth/register` → send `{ username, email, password }`
- `POST /api/auth/login` → send `{ email, password }` → get JWT
- `GET /api/quotes` → send with `Authorization: Bearer <token>`

---

## Frontend Implementation

### Step 7 — Install Packages

```bash
npm install react-router-dom
```

### Step 8 — New Files

| # | File | Purpose |
|---|------|---------|
| 1 | `services/authService.js` | API calls for login & register |
| 2 | `context/AuthContext.jsx` | Global auth state (`user`, `login()`, `logout()`) |
| 3 | `pages/LoginPage.jsx` | Login form UI |
| 4 | `pages/RegisterPage.jsx` | Registration form UI |
| 5 | `components/ProtectedRoute.jsx` | Redirect to login if not authenticated |

### Step 9 — Token Handling

- Store JWT in `localStorage` on login
- Attach to every API request via `Authorization: Bearer <token>` header
- Remove from `localStorage` on logout

### Step 10 — Update `App.jsx` with Routing

```jsx
<AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

---

## Auth Flow Summary

```
Register → hash password → save to DB → return JWT → store in localStorage
Login    → verify password → return JWT → store in localStorage
API Call → attach JWT in header → middleware verifies → allow/deny
Logout   → remove JWT from localStorage → redirect to /login
```

---

## ✅ Implementation Order

- [ ] Create `users` table in MySQL
- [ ] `npm install jsonwebtoken bcryptjs` (backend)
- [ ] Add `JWT_SECRET` to `.env`
- [ ] `userRepository.js`
- [ ] `authService.js`
- [ ] `authController.js`
- [ ] `authRoutes.js`
- [ ] `authMiddleware.js`
- [ ] Wire routes in `app.js`
- [ ] Test APIs with Postman
- [x] `npm install react-router-dom` (frontend)
- [x] `authService.js` (frontend)
- [x] Redux store (`store/authSlice.js`, `store/index.js`)
- [x] `LoginPage.jsx` + `RegisterPage.jsx`
- [x] `ProtectedRoute.jsx`
- [x] Update `App.jsx` with routing
- [ ] End-to-end testing
