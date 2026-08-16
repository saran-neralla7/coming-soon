# neralla.in — 3D Animated Coming Soon Landing Page

A high-performance, 3D animated landing page for **Saran Neralla** (`www.neralla.in`). Showcases expertise as a **Full-Stack Software Engineer** specializing in **College & Enterprise Automation, Custom ERP Systems, Autonomous AI Agents, and Web Applications**.

![neralla.in](https://img.shields.io/badge/Domain-neralla.in-0284c7?style=for-the-badge&logo=vercel)
![Status](https://img.shields.io/badge/System_Status-Online-10b981?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_19_|_Three.js_|_Tailwind_v4_|_TypeScript-8b5cf6?style=for-the-badge)

---

## ⚡ Features

1. **3D WebGL Scene (`Three.js`)**: Interactive 3D wireframe core (TorusKnot & Icosahedron), floating 3D skill orbiters (AI Node, Automation Torus, ERP Cylinder, Web Box), and 1,200+ particle constellation starfield reacting dynamically to mouse movement.
2. **Dynamic Headline & Typewriter Engine**: Animated headline cycling between AI Agents, College Automation, ERP Platforms, and Full-Stack Web.
3. **Showcase Grid**: 4 glassmorphic speciality cards with hover glow effects and a live simulated ERP Telemetry metric monitor.
4. **Interactive CLI / Terminal (`$ open_terminal`)**: Embedded retro-futuristic developer terminal supporting interactive commands (`help`, `about`, `skills`, `projects`, `contact`, `matrix`, `launch`, `clear`, `sudo`).
5. **Early Access / Waitlist Form**: Email subscription box with instant validation, `canvas-confetti` particle explosion on success, and `localStorage` persistence.
6. **Web Audio Sound Effects**: Pure Web Audio API synthesized cyber drone and interactive button click sound effects (with mute/unmute control).
7. **Contact Modal**: Direct connect modal with 1-click clipboard email copy (`saran@neralla.in`) and social handles (GitHub, LinkedIn, Twitter/X).
8. **Vercel & Custom Domain Ready**: Includes `vercel.json` and optimized build configuration for static edge deployment on `neralla.in` & `www.neralla.in`.

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start local development server**:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

4. **Test production build**:
   ```bash
   npm run build
   ```

---

## 🌐 How to Deploy to Vercel & Bind Domain (`neralla.in`)

### Option A: Using Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy project**:
   ```bash
   vercel --prod
   ```

3. **Add your custom domain**:
   ```bash
   vercel domains add www.neralla.in
   vercel domains add neralla.in
   ```

---

### Option B: Via Vercel Dashboard & GitHub

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.
8. In Vercel Project Settings -> **Domains**:
   - Add `neralla.in`
   - Add `www.neralla.in` (recommended to set redirect from `neralla.in` to `www.neralla.in`).

### DNS Configuration for `neralla.in` (in your domain registrar e.g. GoDaddy/Namecheap):
- **A Record**: `@` -> `76.76.21.21`
- **CNAME Record**: `www` -> `cname.vercel-dns.com`

---

## 📁 Project Structure

```
coming-soon-page/
├── public/
├── src/
│   ├── components/
│   │   ├── ThreeCanvas.tsx       # 3D WebGL Three.js background canvas
│   │   ├── Navbar.tsx            # Header with sound toggle & CLI button
│   │   ├── HeroSection.tsx       # Typewriter title, domain callout & CTAs
│   │   ├── ShowcaseGrid.tsx      # Specialities grid & live ERP telemetry
│   │   ├── TerminalConsole.tsx   # Interactive retro CLI terminal & easter eggs
│   │   ├── EarlyAccessForm.tsx   # Email waitlist signup & confetti effect
│   │   ├── ContactModal.tsx      # Contact modal & 1-click email copy
│   │   └── Footer.tsx            # Copyright & edge ping status
│   ├── utils/
│   │   └── audioEngine.ts        # Web Audio API sound synthesizer
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Tailwind v4, glassmorphism & cyber grid styles
│   └── main.tsx                  # React entry point
├── vercel.json                   # Vercel deployment routing config
├── index.html                    # SEO meta tags & Google fonts
├── package.json
└── vite.config.ts
```
