import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  UtensilsCrossed,
  BarChart3,
  Settings,
  UserCog,
  ChevronRight
} from 'lucide-react';
import { User, ActiveView, UserRole } from '../App';

interface SidebarProps {
  user: User;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  collapsed: boolean;
}

interface MenuItem {
  id: ActiveView;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'sales', 'kitchen', 'staff', 'client', 'vendor', 'accountant']
  },
  {
    id: 'bookings',
    label: 'Bookings & Calendar',
    icon: <Calendar className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'sales', 'staff']
  },
  {
    id: 'crm',
    label: 'CRM & Leads',
    icon: <Users className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'sales']
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: <FileText className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'sales', 'accountant']
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <CreditCard className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'accountant']
  },
  {
    id: 'menu',
    label: 'Menu & Inventory',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'kitchen', 'staff']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'accountant']
  },
  {
    id: 'users',
    label: 'User Management',
    icon: <UserCog className="w-5 h-5" />,
    roles: ['super_admin', 'admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    roles: ['super_admin', 'admin', 'sales', 'kitchen', 'staff', 'client', 'vendor', 'accountant']
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  activeView, 
  onViewChange, 
  collapsed 
}) => {
  const accessibleMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <nav className="p-4">
        <div className="space-y-2">
          {accessibleMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-all duration-200 group ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${
                  activeView === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
              {!collapsed && activeView === item.id && (
                <ChevronRight className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm mb-1">Regional Expansion</h3>
            <p className="text-xs opacity-90 mb-3">Ready for Kazakhstan, Kyrgyzstan & more</p>
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Multi-tenant Active</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};