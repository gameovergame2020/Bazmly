import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    {
      label: 'Today\'s Bookings',
      value: '12',
      change: '+8%',
      icon: <Calendar className="w-6 h-6" />,
      color: 'blue'
    },
    {
      label: 'Total Revenue',
      value: '$24,500',
      change: '+12%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'green'
    },
    {
      label: 'Active Clients',
      value: '1,234',
      change: '+5%',
      icon: <Users className="w-6 h-6" />,
      color: 'purple'
    },
    {
      label: 'Occupancy Rate',
      value: '85%',
      change: '+3%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'orange'
    }
  ];

  const recentBookings = [
    { id: 1, client: 'Wedding - Aziza & Bobur', date: '2025-01-18', time: '18:00', guests: 200, status: 'confirmed' },
    { id: 2, client: 'Corporate Event - TechCorp', date: '2025-01-19', time: '14:00', guests: 150, status: 'pending' },
    { id: 3, client: 'Birthday - Olim Karimov', date: '2025-01-20', time: '19:00', guests: 80, status: 'confirmed' },
    { id: 4, client: 'Business Meeting - StartupUz', date: '2025-01-21', time: '10:00', guests: 50, status: 'confirmed' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Prepare menu for Aziza & Bobur wedding', priority: 'high', dueDate: '2025-01-18' },
    { id: 2, task: 'Confirm catering for TechCorp event', priority: 'medium', dueDate: '2025-01-19' },
    { id: 3, task: 'Setup decorations for birthday party', priority: 'low', dueDate: '2025-01-20' },
    { id: 4, task: 'Invoice processing for last week', priority: 'high', dueDate: '2025-01-22' }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 text-gray-600';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-green-200 bg-green-50'
    };
    return colors[priority as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()}, {user.name}!
        </h1>
        <p className="text-blue-100 mb-4">
          Welcome to your {user.role.replace('_', ' ')} dashboard. Here's what's happening today.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <p className="text-gray-600 text-sm mt-1">Latest event reservations</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{booking.client}</h4>
                    <p className="text-sm text-gray-600">{booking.date} at {booking.time} • {booking.guests} guests</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    {booking.status === 'confirmed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {booking.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <p className="text-gray-600 text-sm mt-1">Your priorities</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">{task.task}</p>
                      <p className="text-xs text-gray-600">Due: {task.dueDate}</p>
                    </div>
                    {task.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">New Booking</h4>
            <p className="text-xs text-gray-600 mt-1">Schedule event</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Add Client</h4>
            <p className="text-xs text-gray-600 mt-1">Create profile</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <DollarSign className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Process Payment</h4>
            <p className="text-xs text-gray-600 mt-1">Handle invoice</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Star className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">View Reports</h4>
            <p className="text-xs text-gray-600 mt-1">Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
};