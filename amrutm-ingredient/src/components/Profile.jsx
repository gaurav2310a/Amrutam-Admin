import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User, Mail, Phone, MapPin, Calendar, Edit, UserCheck } from 'lucide-react';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleEditProfile = () => {
    navigate('/profile-edit');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="main-content">
            <div className="profile-container">
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="profile-container">
            <div className="mb-4">
              <h2 className="mb-2">Profile</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/ingredients" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active fw-medium text-dark">Profile</li>
                </ol>
              </nav>
            </div>
            
            <div className="profile-content">
              {!profileData ? (
                <div className="empty-profile">
                  <div className="empty-profile-icon">
                    <UserCheck size={64} className="text-muted" />
                  </div>
                  <h3 className="text-muted mb-3">No Profile Information</h3>
                  <p className="text-muted mb-4">You haven't set up your profile yet. Click the button below to get started.</p>
                  <button 
                    onClick={handleEditProfile}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Edit size={16} />
                    Create Profile
                  </button>
                </div>
              ) : (
                <div className="profile-card">
                  {/* Profile Header */}
                  <div className="profile-header">
                    <div className="profile-image-section">
                      <img 
                        src={profileData.profileImage || "/image.png"} 
                        alt="Profile" 
                        className="profile-image-display" 
                        onError={(e) => {
                          // If image fails to load, show placeholder
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="profile-image-placeholder-display d-none">
                        <User size={48} className="text-muted" />
                      </div>
                    </div>
                    <div className="profile-header-info">
                      <h3 className="profile-name">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="profile-email text-muted">{profileData.email}</p>
                      {profileData.updatedAt && (
                        <p className="profile-updated text-muted small">
                          Last updated: {formatDate(profileData.updatedAt)}
                        </p>
                      )}
                    </div>
                    <div className="profile-actions">
                      <button 
                        onClick={handleEditProfile}
                        className="btn btn-outline-primary d-flex align-items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="profile-details">
                    <h4 className="section-title">Personal Information</h4>
                    <div className="profile-info-grid">
                      <div className="profile-info-item">
                        <div className="profile-info-label">
                          <User size={16} className="me-2" />
                          First Name
                        </div>
                        <div className="profile-info-value">
                          {profileData.firstName || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">
                          <User size={16} className="me-2" />
                          Last Name
                        </div>
                        <div className="profile-info-value">
                          {profileData.lastName || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">
                          <Mail size={16} className="me-2" />
                          Email Address
                        </div>
                        <div className="profile-info-value">
                          {profileData.email || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">
                          <Phone size={16} className="me-2" />
                          Phone Number
                        </div>
                        <div className="profile-info-value">
                          {profileData.phone || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">
                          <Calendar size={16} className="me-2" />
                          Date of Birth
                        </div>
                        <div className="profile-info-value">
                          {formatDate(profileData.dateOfBirth)}
                        </div>
                      </div>
                    </div>

                    <h4 className="section-title">Address Information</h4>
                    <div className="profile-info-grid">
                      <div className="profile-info-item full-width">
                        <div className="profile-info-label">
                          <MapPin size={16} className="me-2" />
                          Street Address
                        </div>
                        <div className="profile-info-value">
                          {profileData.address || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">City</div>
                        <div className="profile-info-value">
                          {profileData.city || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">State</div>
                        <div className="profile-info-value">
                          {profileData.state || 'Not provided'}
                        </div>
                      </div>

                      <div className="profile-info-item">
                        <div className="profile-info-label">Zip Code</div>
                        <div className="profile-info-value">
                          {profileData.zipCode || 'Not provided'}
                        </div>
                      </div>
                    </div>

                    {profileData.bio && (
                      <>
                        <h4 className="section-title">Bio</h4>
                        <div className="profile-bio">
                          <p>{profileData.bio}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;