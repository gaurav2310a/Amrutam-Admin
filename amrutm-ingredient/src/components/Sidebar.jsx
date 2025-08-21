import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Activity,
  Pill,
  List,
  Plus,
  Tag,
  Leaf,
  CreditCard,
  RotateCcw,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const menuItems = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: '/dashboard' 
  },
  { 
    id: 'doctors',
    icon: Users, 
    label: 'Doctor', 
    path: '/doctors' 
  },
  { 
    id: 'patients',
    icon: UserCheck, 
    label: 'Patients', 
    path: '/patients' 
  },
  { 
    id: 'appointments',
    icon: Calendar, 
    label: 'Appointment', 
    path: '/appointments' 
  },
  { 
    id: 'specialties',
    icon: Activity, 
    label: 'Specialties', 
    path: '/specialties' 
  },
  {
    id: 'ingredients',
    icon: Pill,
    label: 'Ingredients',
    submenu: [
      { 
        id: 'ingredients-list',
        label: 'Ingredients List', 
        path: '/ingredients' 
      },
      { 
        id: 'add-ingredients',
        label: 'Add Ingredients', 
        path: '/add-ingredient' 
      }
    ]
  },
  { 
    id: 'coupons',
    icon: Tag, 
    label: 'Coupons', 
    path: '/coupons' 
  },
  { 
    id: 'concerns',
    icon: Leaf, 
    label: 'Concerns', 
    path: '/concerns' 
  },
  { 
    id: 'referral',
    icon: CreditCard, 
    label: 'Referral', 
    path: '/referral' 
  },
  { 
    id: 'customization',
    icon: List, 
    label: 'Customization', 
    path: '/customization' 
  },
  { 
    id: 'wallet',
    icon: CreditCard, 
    label: 'Wallet', 
    path: '/wallet' 
  },
  { 
    id: 'refund',
    icon: RotateCcw, 
    label: 'Refund', 
    path: '/refund' 
  }
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState('ingredients');

  const isActive = (path) => location.pathname === path;
  const isMenuExpanded = (id) => expandedItem === id;

  const handleMenuClick = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="sidebar bg-white border-end" style={{ width: '240px', height: '100vh', position: 'fixed', overflowY: 'auto' }}>
      <div className="p-3">
        <nav>
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                // Menu item with submenu
                <div>
                  <div
                    className={`nav-item d-flex align-items-center justify-content-between p-2 mb-1 rounded ${
                      isMenuExpanded(item.id) ? 'bg-light' : ''
                    }`}
                    onClick={() => handleMenuClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <item.icon className={`me-3 ${isMenuExpanded(item.id) ? 'text-success' : 'text-secondary'}`} size={20} />
                      <span className={`small fw-medium ${isMenuExpanded(item.id) ? 'text-success' : 'text-secondary'}`}>
                        {item.label}
                      </span>
                    </div>
                    {isMenuExpanded(item.id) ? (
                      <ChevronDown className="text-success" size={16} />
                    ) : (
                      <ChevronRight className="text-secondary" size={16} />
                    )}
                  </div>
                  {isMenuExpanded(item.id) && (
                    <div className="ms-4 mt-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className="text-decoration-none"
                        >
                          <div
                            className={`d-flex align-items-center p-2 rounded small ${
                              isActive(subItem.path) ? 'text-success fw-medium' : 'text-secondary'
                            }`}
                          >
                            <div
                              className={`rounded-circle me-2 ${
                                isActive(subItem.path) ? 'bg-success' : 'bg-secondary'
                              }`}
                              style={{ width: '8px', height: '8px' }}
                            />
                            <span>{subItem.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular menu item
                <Link
                  to={item.path}
                  className="text-decoration-none"
                >
                  <div
                    className={`nav-item d-flex align-items-center p-2 mb-1 rounded ${
                      isActive(item.path) ? 'bg-light' : ''
                    }`}
                  >
                    <item.icon
                      className={`me-3 ${isActive(item.path) ? 'text-success' : 'text-secondary'}`}
                      size={20}
                    />
                    <span
                      className={`small fw-medium ${
                        isActive(item.path) ? 'text-success' : 'text-secondary'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}