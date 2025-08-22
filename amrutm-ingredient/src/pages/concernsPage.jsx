import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import '../styles/IngredientForm.css';

export default function ConcernsPage() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="ingredient-form-container">
            <div className="mb-4">
              <h2 className="mb-2">Concerns</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></li>
                  <li className="breadcrumb-item active fw-medium text-dark">Concerns</li>
                </ol>
              </nav>
            </div>
            <div className="section-card">
              <p className="text-muted mb-0">Just for sample</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
