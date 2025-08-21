import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/logInPage';
import IngredientList from './pages/ingredientList';
import AddIngredient from './pages/addIngredient';
import ProfileEditPage from './pages/profileEditPage';
import ProfilePage from './pages/profilePage';
import DashboardPage from './pages/dashboardPage';
import IngredientOverviewPage from './pages/ingredientOverview';

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
      </Routes>
      </Router>
  );
}

export default App;