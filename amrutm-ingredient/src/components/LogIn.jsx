import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Admin credentials
  const ADMIN_EMAIL = 'gouravaggarwal12349@gmail.com';
  const ADMIN_PASSWORD = '123456789';
  const ADMIN_EMAIL_2 = 'admin';
  const ADMIN_PASSWORD_2 = 'admin';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        if (formData.remember) localStorage.setItem('rememberMe', 'true');
        navigate('/ingredients');
      } else if (formData.email === ADMIN_EMAIL_2 && formData.password === ADMIN_PASSWORD_2) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        if (formData.remember) localStorage.setItem('rememberMe', 'true');
        navigate('/ingredients');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <img src="/Logo.png" alt="Amrutm" className="brand-logo" />
          <div className="brand-text">
            <h1>Welcome back</h1>
            <p>Please sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error && <div className="alert-error">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <span className="prefix">@</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <button
                type="button"
                className="suffix-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="form-row between">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">Sign In</button>

          <div className="aux">
            <span className="line" />
            <span className="or">OR</span>
            <span className="line" />
          </div>
          <button type="button" className="btn-outline" onClick={() => navigate('/dashboard')}>
            Continue as guest
          </button>
        </form>
      </div>

      <div className="auth-hero">
        <div className="hero-overlay">
          <h2>Amrutm Admin</h2>
          <p>Manage ingredients, profiles, and more</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;