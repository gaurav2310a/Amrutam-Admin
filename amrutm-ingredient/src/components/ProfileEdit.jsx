import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User, Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react';
import '../styles/ProfileEdit.css';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  
  // Prefill form with previously saved profile data (if any)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const { profileImage: savedImage, updatedAt, ...rest } = parsed || {};
        setFormData(prev => ({ ...prev, ...rest }));
        if (savedImage) setPreview(savedImage);
      }
    } catch (e) {
      console.error('Failed to load saved profile', e);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
      setProfileImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    // if (!formData.firstName || !formData.lastName || !formData.email) {
    //   setError('Please fill in all required fields');
    //   return;
    // }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Create form data for submission
      const submitData = new FormData();
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // Save profile data to localStorage (use data URL preview for persistence)
      const profileData = {
        ...formData,
        profileImage: preview ?? formData.profileImage,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profileData }));
      
      console.log('Profile updated:', profileData);
      
      // Navigate back to profile page after successful submission
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="profile-edit-container">
            <div className="mb-4">
              <h2 className="mb-2">Edit Profile</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Profile
                    </Link>
                  </li>
                  <li className="breadcrumb-item active fw-medium text-dark">Edit Profile</li>
                </ol>
              </nav>
            </div>
            
            <form className="profile-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              {/* Profile Picture Section */}
              <div className="profile-picture-section">
                <h3>Profile Picture</h3>
                <div className="profile-image-upload">
                  <div className="profile-image-container">
                    {preview ? (
                      <img src={preview} alt="Profile Preview" className="profile-image-preview" />
                    ) : (
                      <div className="profile-image-placeholder">
                        <User size={48} className="text-muted" />
                      </div>
                    )}
                    <label htmlFor="profile-image" className="profile-image-upload-btn">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="profile-image"
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div className="profile-image-info">
                    <p className="mb-1 fw-medium">Upload Profile Picture</p>
                    <p className="text-muted small mb-0">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <User size={16} className="me-2" />
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">
                    <User size={16} className="me-2" />
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name" 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} className="me-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={16} className="me-2" />
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number" 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">
                    <Calendar size={16} className="me-2" />
                    Date of Birth
                  </label>
                  <input 
                    type="date" 
                    id="dateOfBirth" 
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Address Information */}
              <h3>Address Information</h3>
              <div className="form-row">
                <div className="form-group address-group">
                  <label htmlFor="address">
                    <MapPin size={16} className="me-2" />
                    Street Address
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter street address" 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    id="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter zip code" 
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="form-row">
                <div className="form-group bio-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;