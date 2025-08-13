import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BookingCalendar } from './components/BookingCalendar';
import { Analytics } from './components/Analytics';
import { CRM } from './components/CRM';
import { Payments } from './components/Payments';
import { Contracts } from './components/Contracts';
import { MenuInventory } from './components/MenuInventory';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { LoginModal } from './components/LoginModal';
import { ClientDashboard } from './components/ClientDashboard';

export type UserRole = 'super_admin' | 'admin' | 'sales' | 'kitchen' | 'staff' | 'client' | 'vendor' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  tenantId: string;
}

export type ActiveView = 'dashboard' | 'bookings' | 'crm' | 'contracts' | 'payments' | 'menu' | 'analytics' | 'settings' | 'users';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('banquet_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('banquet_user', JSON.stringify(userData));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('banquet_user');
    setShowLoginModal(true);
    setActiveView('dashboard');
  };

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">BH</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Banquet Hall Pro</h1>
            <p className="text-gray-600">Professional Banquet Management System</p>
          </div>
        </div>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  // Mijoz uchun alohida MVP interfeysi
  console.log('Current user:', user);
  console.log('User role:', user.role);
  console.log('Is client?', user.role === 'client');
  
  if (user.role === 'client') {
    return <ClientDashboard user={user} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'bookings':
        return <BookingCalendar user={user} />;
      case 'crm':
        return <CRM user={user} />;
      case 'contracts':
        return <Contracts user={user} />;
      case 'payments':
        return <Payments user={user} />;
      case 'menu':
        return <MenuInventory user={user} />;
      case 'analytics':
        return <Analytics user={user} />;
      case 'users':
        return <UserManagement user={user} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="flex">
        <Sidebar 
          user={user}
          activeView={activeView}
          onViewChange={setActiveView}
          collapsed={sidebarCollapsed}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="p-6">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;