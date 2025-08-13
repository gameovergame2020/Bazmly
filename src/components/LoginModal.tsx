import React, { useState } from 'react';
import { User, UserRole } from '../App';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const demoUsers: Array<{ name: string; email: string; role: UserRole }> = [
  { name: 'Sarah Admin', email: 'admin@banquethall.uz', role: 'admin' },
  { name: 'Alex Sales', email: 'sales@banquethall.uz', role: 'sales' },
  { name: 'Chef Maria', email: 'kitchen@banquethall.uz', role: 'kitchen' },
  { name: 'John Staff', email: 'staff@banquethall.uz', role: 'staff' },
  { name: 'Client Ahmed', email: 'client@banquethall.uz', role: 'client' },
  { name: 'Vendor Supply', email: 'vendor@banquethall.uz', role: 'vendor' },
  { name: 'Anna Accountant', email: 'finance@banquethall.uz', role: 'accountant' },
  { name: 'Super Admin', email: 'superadmin@banquethall.uz', role: 'super_admin' }
];

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleLogin = () => {
    const userData = demoUsers.find(user => user.role === selectedRole);
    console.log('Selected role:', selectedRole);
    console.log('Found user data:', userData);
    if (userData) {
      const loginData = {
        id: Math.random().toString(36),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        tenantId: 'uzbekistan-main'
      };
      console.log('Logging in with:', loginData);
      onLogin(loginData);
    }
  };

  const getRoleDescription = (role: UserRole) => {
    const descriptions = {
      super_admin: 'Full system access, manage tenants',
      admin: 'Venue management, full access',
      sales: 'Lead management, bookings',
      kitchen: 'Menu management, orders',
      staff: 'Day-to-day operations',
      client: 'Book events, view history',
      vendor: 'Supply management',
      accountant: 'Financial management'
    };
    return descriptions[role];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">BH</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Banquet Hall Pro</h2>
          <p className="text-gray-600">Select a role to explore the platform</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose User Role
          </label>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {demoUsers.map((user) => (
              <option key={user.role} value={user.role}>
                {user.name} ({user.role.replace('_', ' ').toUpperCase()})
              </option>
            ))}
          </select>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Access Level:</span> {getRoleDescription(selectedRole)}
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors"
            >
              Login as {selectedRole.replace('_', ' ')}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>🇺🇿 Uzbekistan</span>
            <span>•</span>
            <span>Multi-tenant SaaS</span>
            <span>•</span>
            <span>Demo Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};