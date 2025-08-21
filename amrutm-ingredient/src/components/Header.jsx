import React, { useState, useEffect } from 'react';
import { ChevronLeft, LogOut, User, Edit, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage
    const loadProfileData = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          setProfileData(JSON.parse(savedProfile));
        } catch (error) {
          console.error('Error parsing profile data:', error);
        }
      }
    };

    // Load initial data
    loadProfileData();
    setImgError(false);

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'userProfile') {
        loadProfileData();
      }
    };

    // Listen for custom profile update events
    const handleProfileUpdate = () => {
      loadProfileData();
      setImgError(false);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => {
      // Clear localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      
      // Redirect to login page
      navigate('/');
  };

  const handleBack = () => {
    // Go back one step in browser history
    navigate(-1);
  };

  return (
      <div className="bg-white border-bottom p-3 sticky-top">
        <div className="d-flex align-items-center justify-content-between">
          {/* Back button and breadcrumb */}
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-light me-3"
              onClick={handleBack}
              title="Go Back"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center me-2 bg-light rounded" 
                   style={{width: '32px', height: '32px'}}>
                <img src='/Logo.png' className="small fw-medium text-muted" style={{width: '100%', height: '100%', objectFit: 'cover'}}></img>
              </div>
              <span className="h5 mb-0 fw-bold">AMRUTAM</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="d-flex align-items-center">
            <div className="text-end me-3">
              <p className="mb-0 small fw-medium">
                {profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Admin'}
              </p>
              <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
                {profileData?.email || 'Department'}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-medium me-2"
                style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #9ca3af, #6b7280)', cursor: 'pointer'}}
                onClick={() => navigate('/profile')}
                title="View Profile"
              >
                {profileData?.profileImage && !imgError ? (
                  <img 
                    src={profileData.profileImage}
                    alt="Profile"
                    className="rounded-circle"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span 
                    className="d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{width: '100%', height: '100%', fontSize: '16px'}}
                  >
                    {profileData?.firstName ? profileData.firstName.charAt(0).toUpperCase() : 'A'}
                  </span>
                )}
              </div>
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm d-flex align-items-center"
              >
                <LogOut size={16} className="me-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

  );
}