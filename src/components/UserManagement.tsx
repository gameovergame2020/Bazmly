import React, { useState } from 'react';
import { User, UserRole } from '../App';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Shield,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash,
  Eye
} from 'lucide-react';

interface UserManagementProps {
  user: User;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  tenantId: string;
  permissions: string[];
  avatar?: string;
}

export const UserManagement: React.FC<UserManagementProps> = ({ user }) => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  const systemUsers: SystemUser[] = [
    {
      id: '1',
      name: 'Sarah Admin',
      email: 'admin@banquethall.uz',
      phone: '+998901234567',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-17',
      createdAt: '2024-12-01',
      tenantId: 'uzbekistan-main',
      permissions: ['manage_bookings', 'manage_users', 'view_analytics', 'manage_payments']
    },
    {
      id: '2',
      name: 'Alex Sales',
      email: 'sales@banquethall.uz',
      phone: '+998701234567',
      role: 'sales',
      status: 'active',
      lastLogin: '2025-01-17',
      createdAt: '2024-12-15',
      tenantId: 'uzbekistan-main',
      permissions: ['manage_bookings', 'manage_crm', 'view_contracts']
    },
    {
      id: '3',
      name: 'Chef Maria',
      email: 'kitchen@banquethall.uz',
      phone: '+998551234567',
      role: 'kitchen',
      status: 'active',
      lastLogin: '2025-01-16',
      createdAt: '2025-01-02',
      tenantId: 'uzbekistan-main',
      permissions: ['manage_menu', 'view_bookings', 'manage_inventory']
    },
    {
      id: '4',
      name: 'John Staff',
      email: 'staff@banquethall.uz',
      phone: '+998331234567',
      role: 'staff',
      status: 'active',
      lastLogin: '2025-01-17',
      createdAt: '2024-11-20',
      tenantId: 'uzbekistan-main',
      permissions: ['view_bookings', 'manage_inventory']
    },
    {
      id: '5',
      name: 'Anna Accountant',
      email: 'finance@banquethall.uz',
      phone: '+998781234567',
      role: 'accountant',
      status: 'active',
      lastLogin: '2025-01-16',
      createdAt: '2024-12-10',
      tenantId: 'uzbekistan-main',
      permissions: ['manage_payments', 'view_analytics', 'manage_contracts']
    },
    {
      id: '6',
      name: 'Client Ahmed',
      email: 'client@banquethall.uz',
      phone: '+998501234567',
      role: 'client',
      status: 'active',
      lastLogin: '2025-01-15',
      createdAt: '2025-01-05',
      tenantId: 'uzbekistan-main',
      permissions: ['view_bookings', 'make_payments']
    },
    {
      id: '7',
      name: 'Vendor Supply',
      email: 'vendor@banquethall.uz',
      phone: '+998991234567',
      role: 'vendor',
      status: 'pending',
      lastLogin: 'Never',
      createdAt: '2025-01-16',
      tenantId: 'uzbekistan-main',
      permissions: ['view_orders', 'update_inventory']
    }
  ];

  const rolePermissions = {
    super_admin: ['full_access'],
    admin: ['manage_bookings', 'manage_users', 'view_analytics', 'manage_payments', 'manage_contracts'],
    sales: ['manage_bookings', 'manage_crm', 'view_contracts', 'view_analytics'],
    kitchen: ['manage_menu', 'view_bookings', 'manage_inventory'],
    staff: ['view_bookings', 'manage_inventory', 'basic_operations'],
    client: ['view_bookings', 'make_payments', 'view_contracts'],
    vendor: ['view_orders', 'update_inventory', 'manage_supplies'],
    accountant: ['manage_payments', 'view_analytics', 'manage_contracts', 'financial_reports']
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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

  const filteredUsers = selectedRole === 'all' 
    ? systemUsers 
    : systemUsers.filter(user => user.role === selectedRole);

  const roleCounts = {
    all: systemUsers.length,
    super_admin: systemUsers.filter(u => u.role === 'super_admin').length,
    admin: systemUsers.filter(u => u.role === 'admin').length,
    sales: systemUsers.filter(u => u.role === 'sales').length,
    kitchen: systemUsers.filter(u => u.role === 'kitchen').length,
    staff: systemUsers.filter(u => u.role === 'staff').length,
    client: systemUsers.filter(u => u.role === 'client').length,
    vendor: systemUsers.filter(u => u.role === 'vendor').length,
    accountant: systemUsers.filter(u => u.role === 'accountant').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+5</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{systemUsers.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Users</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">Active</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{systemUsers.filter(u => u.status === 'active').length}</h3>
            <p className="text-gray-600 text-sm mt-1">Active Users</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-yellow-500 text-sm font-medium">Pending</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{systemUsers.filter(u => u.status === 'pending').length}</h3>
            <p className="text-gray-600 text-sm mt-1">Pending Approval</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-blue-500 text-sm font-medium">Roles</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">8</h3>
            <p className="text-gray-600 text-sm mt-1">User Roles</p>
          </div>
        </div>
      </div>

      {/* Role Filter */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(roleCounts).map(([role, count]) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRole === role
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {role === 'all' ? 'All Users' : role.replace('_', ' ').toUpperCase()} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full w-fit ${getRoleColor(user.role)}`}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full w-fit ${getStatusColor(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>Last login: {user.lastLogin}</div>
                    <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map(permission => (
                        <span key={permission} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                      {user.permissions.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          +{user.permissions.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Permissions Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-900">Role</th>
                <th className="text-center py-3 font-medium text-gray-900">Bookings</th>
                <th className="text-center py-3 font-medium text-gray-900">CRM</th>
                <th className="text-center py-3 font-medium text-gray-900">Contracts</th>
                <th className="text-center py-3 font-medium text-gray-900">Payments</th>
                <th className="text-center py-3 font-medium text-gray-900">Menu</th>
                <th className="text-center py-3 font-medium text-gray-900">Analytics</th>
                <th className="text-center py-3 font-medium text-gray-900">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <tr key={role}>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)}`}>
                      {role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_bookings') || permissions.includes('full_access') ? '✅' : permissions.includes('view_bookings') ? '👁️' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_crm') || permissions.includes('full_access') ? '✅' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_contracts') || permissions.includes('full_access') ? '✅' : permissions.includes('view_contracts') ? '👁️' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_payments') || permissions.includes('full_access') ? '✅' : permissions.includes('make_payments') ? '💳' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_menu') || permissions.includes('full_access') ? '✅' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('view_analytics') || permissions.includes('full_access') ? '✅' : '❌'}
                  </td>
                  <td className="text-center py-3">
                    {permissions.includes('manage_users') || permissions.includes('full_access') ? '✅' : '❌'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center space-x-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <span>✅</span>
            <span>Full Access</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👁️</span>
            <span>View Only</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💳</span>
            <span>Limited Access</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>❌</span>
            <span>No Access</span>
          </div>
        </div>
      </div>

      {/* Multi-tenant Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Multi-Tenant User Management</h3>
        </div>
        <p className="text-gray-700 mb-4">
          User management is designed for multi-tenant architecture. Each tenant has isolated user data 
          with cross-tenant super admin capabilities for regional expansion management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Tenant isolation by default</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Role-based access control</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Cross-regional user sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};