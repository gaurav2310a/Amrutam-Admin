# Amrutm — React Frontend (Vite)

A React + Vite frontend for managing ingredients and a clinic-style dashboard. It includes authentication, a dashboard with sidebar navigation, ingredient CRUD flows, profile management (with image upload and validation), and informational pages (doctors, patients, appointments, specialties, coupons, concerns, referrals, customization, wallet, refund).

## Key Features

- **Authentication**: `LogIn` flow (`/`)
- **Dashboard**: Sidebar + header layout with quick stats
- **Ingredients**:
  - List view: `IngredientTable` with search/filter
  - Add form: `IngredientForm` with stepper and validations
  - Detail view: `IngredientOverview` page
- **Profile Management**:
  - `Profile` view (`/profile`)
  - `ProfileEdit` with picture upload, personal/address fields, validation, responsive layout (`/profile-edit`)
- **Additional Pages**: Doctors, Patients, Appointments, Specialties, Coupons, Concerns, Referral, Customization, Wallet, Refund
- **Responsive UI** with an emerald/green design system and Bootstrap utilities

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Routing**: react-router-dom 7
- **UI/UX**: Bootstrap 5, motion (animations), lucide-react (icons)
- **Linting**: ESLint 9

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```
Starts Vite dev server with HMR. Open the printed local URL in your browser.

### Build

```bash
npm run build
```
Outputs a production build to `dist/`.

### Preview

```bash
npm run preview
```
Serves the production build locally.

### Lint

```bash
npm run lint
```

## Project Structure

```
amrutm-ingredient/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.jsx               # React root
│  ├─ App.jsx                # Routes
│  ├─ index.css              # Global styles
│  ├─ components/
│  │  ├─ Sidebar.jsx
│  │  ├─ Header.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ IngredientForm.jsx
│  │  ├─ IngredientTable.jsx
│  │  ├─ ProgressStepper.jsx
│  │  ├─ Profile.jsx
│  │  └─ ProfileEdit.jsx
│  ├─ pages/
│  │  ├─ logInPage.jsx        # route: /
│  │  ├─ dashboardPage.jsx    # /dashboard
│  │  ├─ ingredientList.jsx   # /ingredients
│  │  ├─ addIngredient.jsx    # /add-ingredient
│  │  ├─ ingredientOverview.jsx # /ingredients/:id
│  │  ├─ profilePage.jsx      # /profile
│  │  ├─ profileEditPage.jsx  # /profile-edit
│  │  ├─ doctorsPage.jsx      # /doctors
│  │  ├─ patientsPage.jsx     # /patients
│  │  ├─ appointmentsPage.jsx # /appointments
│  │  ├─ specialtiesPage.jsx  # /specialties
│  │  ├─ couponsPage.jsx      # /coupons
│  │  ├─ concernsPage.jsx     # /concerns
│  │  ├─ referralPage.jsx     # /referral
│  │  ├─ customizationPage.jsx# /customization
│  │  ├─ walletPage.jsx       # /wallet
│  │  └─ refundPage.jsx       # /refund
│  └─ styles/                 # Component-specific CSS (e.g., ProfileEdit.css)
└─ public/
```

## Routing

Routes are defined in `src/App.jsx` using `react-router-dom`:

```jsx
<Routes>
  <Route path="/" element={<LogInPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/ingredients" element={<IngredientList />} />
  <Route path="/add-ingredient" element={<AddIngredient />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/profile-edit" element={<ProfileEditPage />} />
  <Route path="/ingredients/:id" element={<IngredientOverviewPage />} />
  <Route path="/doctors" element={<DoctorsPage />} />
  <Route path="/patients" element={<PatientsPage />} />
  <Route path="/appointments" element={<AppointmentsPage />} />
  <Route path="/specialties" element={<SpecialtiesPage />} />
  <Route path="/coupons" element={<CouponsPage />} />
  <Route path="/concerns" element={<ConcernsPage />} />
  <Route path="/referral" element={<ReferralPage />} />
  <Route path="/customization" element={<CustomizationPage />} />
  <Route path="/wallet" element={<WalletPage />} />
  <Route path="/refund" element={<RefundPage />} />
</Routes>
```

## Styling

- Global styles: `src/index.css`
- Component styles: `src/styles/` (e.g., `ProfileEdit.css`) using an emerald green theme
- Bootstrap utility classes where helpful

## Notable Components

- `IngredientForm.jsx`: Multi-step form with validations and a `ProgressStepper`
- `IngredientTable.jsx`: List with actions (view/edit)
- `ProfileEdit.jsx`: Image upload + preview, email validation, responsive grid
- `Dashboard.jsx`, `Sidebar.jsx`, `Header.jsx`: Shell and navigation

## Scripts (package.json)

- `dev`: Vite dev server
- `build`: Production build
- `preview`: Preview built app
- `lint`: ESLint

## Environment & Configuration

- No external API keys required by default. If you add APIs, prefer environment variables via Vite (`import.meta.env`).

## License

Private / internal project. Add a license if needed.

