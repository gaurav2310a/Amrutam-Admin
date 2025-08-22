import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Activity,
  Pill,
  Tag,
  Leaf,
  CreditCard,
  List,
  RotateCcw,
  Plus,
  Eye,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 'doctors',
      title: 'Doctors',
      description: 'Manage doctor profiles and information',
      icon: Users,
      path: '/doctors',
      color: 'primary',
      stats: '25 Active'
    },
    {
      id: 'patients',
      title: 'Patients',
      description: 'View and manage patient records',
      icon: UserCheck,
      path: '/patients',
      color: 'success',
      stats: '150 Registered'
    },
    {
      id: 'appointments',
      title: 'Appointments',
      description: 'Schedule and manage appointments',
      icon: Calendar,
      path: '/appointments',
      color: 'info',
      stats: '12 Today'
    },
    {
      id: 'specialties',
      title: 'Specialties',
      description: 'Medical specialties and categories',
      icon: Activity,
      path: '/specialties',
      color: 'warning',
      stats: '8 Categories'
    },
    {
      id: 'ingredients-list',
      title: 'Ingredients List',
      description: 'View all available ingredients',
      icon: Pill,
      path: '/ingredients',
      color: 'success',
      stats: '45 Items'
    },
    {
      id: 'add-ingredient',
      title: 'Add Ingredient',
      description: 'Add new ingredients to the system',
      icon: Plus,
      path: '/add-ingredient',
      color: 'primary',
      stats: 'Quick Add'
    },
    {
      id: 'coupons',
      title: 'Coupons',
      description: 'Manage discount coupons and offers',
      icon: Tag,
      path: '/coupons',
      color: 'danger',
      stats: '5 Active'
    },
    {
      id: 'concerns',
      title: 'Concerns',
      description: 'Health concerns and conditions',
      icon: Leaf,
      path: '/concerns',
      color: 'success',
      stats: '20 Types'
    },
    {
      id: 'referral',
      title: 'Referral',
      description: 'Referral program management',
      icon: CreditCard,
      path: '/referral',
      color: 'info',
      stats: '30 Referrals'
    },
    {
      id: 'customization',
      title: 'Customization',
      description: 'Customize system settings',
      icon: List,
      path: '/customization',
      color: 'secondary',
      stats: 'Settings'
    },
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'Manage wallet and payments',
      icon: CreditCard,
      path: '/wallet',
      color: 'success',
      stats: '₹15,000'
    },
    {
      id: 'refund',
      title: 'Refund',
      description: 'Process refunds and returns',
      icon: RotateCcw,
      path: '/refund',
      color: 'warning',
      stats: '3 Pending'
    }
  ];

  const quickStats = [
    {
      title: 'Total Revenue',
      value: '--------',
      change: '+--%',
      icon: TrendingUp,
      color: 'success'
    },
    {
      title: 'Active Patients',
      value: '--------',
      change: '+--%',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Appointments Today',
      value: '--',
      change: '+--%',
      icon: Calendar,
      color: 'info'
    },
    {
      title: 'Average Rating',
      value: '--',
      change: '+--',
      icon: Star,
      color: 'warning'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h2 className="dashboard-title">Dashboard</h2>
              <p className="dashboard-subtitle">
                Welcome back! Here's what's happening with your Amrutam platform.
                <br />
                <br />
                <br />
                This is only visualization of dashboard.
              </p>
            </div>

            <div className="quick-stats">
              <div className="row g-4 mb-5">
                {quickStats.map((stat, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <div className="stat-card">
                      <div className="stat-card-body">
                        <div className="stat-icon-wrapper">
                          <stat.icon className={`stat-icon text-${stat.color}`} size={24} />
                        </div>
                        <div className="stat-content">
                          <h3 className="stat-value">{stat.value}</h3>
                          <p className="stat-title">{stat.title}</p>
                          <span className={`stat-change text-${stat.color}`}>
                            {stat.change} from last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-grid">
              <h3 className="section-title">Quick Actions</h3>
              <div className="row g-4">
                {dashboardCards.map((card) => (
                  <div key={card.id} className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="dashboard-card"
                      onClick={() => handleCardClick(card.path)}
                    >
                      <div className="dashboard-card-body">
                        <div className="card-header">
                          <div className={`card-icon bg-${card.color}`}>
                            <card.icon className="text-white" size={24} />
                          </div>
                          <div className="card-stats">
                            <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
                              {card.stats}
                            </span>
                          </div>
                        </div>
                        <div className="card-content">
                          <h4 className="card-title">{card.title}</h4>
                          <p className="card-description">{card.description}</p>
                        </div>
                        <div className="card-footer">
                          <span className="card-action">
                            View Details
                            <Eye size={16} className="ms-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
