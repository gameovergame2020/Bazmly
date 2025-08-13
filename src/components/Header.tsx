import React from 'react';
import { Bell, Search, Menu, LogOut, User } from 'lucide-react';
import { User as UserType } from '../App';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  onToggleSidebar,
  sidebarCollapsed 
}) => {
  const getRoleColor = (role: string) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      sales: 'bg-green-100 text-green-800',
      kitchen: 'bg-orange-100 text-orange-800',
      staff: 'bg-gray-100 text-gray-800',
      client: 'bg-pink-100 text-pink-800',
      vendor: 'bg-yellow-100 text-yellow-800',
      accountant: 'bg-indigo-100 text-indigo-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">BH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Banquet Hall Pro</h1>
              <p className="text-xs text-gray-500">Multi-tenant SaaS Platform</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bookings, clients, contracts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <div className="flex items-center justify-end space-x-1">
                <span className={`px-2 py-0.5 text-xs rounded-full ${getRoleColor(user.role)}`}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};