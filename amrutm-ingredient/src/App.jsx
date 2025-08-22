import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/logInPage';
import IngredientList from './pages/ingredientList';
import AddIngredient from './pages/addIngredient';
import ProfileEditPage from './pages/profileEditPage';
import ProfilePage from './pages/profilePage';
import DashboardPage from './pages/dashboardPage';
import IngredientOverviewPage from './pages/ingredientOverview';
import DoctorsPage from './pages/doctorsPage';
import PatientsPage from './pages/patientsPage';
import AppointmentsPage from './pages/appointmentsPage';
import SpecialtiesPage from './pages/specialtiesPage';
import CouponsPage from './pages/couponsPage';
import ConcernsPage from './pages/concernsPage';
import ReferralPage from './pages/referralPage';
import CustomizationPage from './pages/customizationPage';
import WalletPage from './pages/walletPage';
import RefundPage from './pages/refundPage';

function App() {
  return (
    <Router>
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
      </Router>
  );
}

export default App;