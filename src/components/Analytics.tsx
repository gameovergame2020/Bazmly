import React, { useState } from 'react';
import { User } from '../App';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  Target,
  PieChart,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsProps {
  user: User;
}

export const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$125,750',
      change: '+12.5%',
      changeType: 'increase',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'Total Bookings',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: <Calendar className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Active Clients',
      value: '1,234',
      change: '+5.1%',
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'purple'
    },
    {
      title: 'Avg Event Value',
      value: '$4,850',
      change: '+15.3%',
      changeType: 'increase',
      icon: <Target className="w-6 h-6" />,
      color: 'orange'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 25000, bookings: 32 },
    { month: 'Feb', revenue: 28000, bookings: 35 },
    { month: 'Mar', revenue: 32000, bookings: 42 },
    { month: 'Apr', revenue: 35000, bookings: 48 },
    { month: 'May', revenue: 38000, bookings: 52 },
    { month: 'Jun', revenue: 42000, bookings: 58 }
  ];

  const eventTypes = [
    { name: 'Weddings', value: 45, color: '#EF4444' },
    { name: 'Corporate Events', value: 25, color: '#3B82F6' },
    { name: 'Birthday Parties', value: 15, color: '#10B981' },
    { name: 'Conferences', value: 10, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#8B5CF6' }
  ];

  const topVenues = [
    { name: 'Grand Hall A', bookings: 45, revenue: 67500 },
    { name: 'Conference Center', bookings: 32, revenue: 48000 },
    { name: 'Garden Terrace', bookings: 28, revenue: 35000 },
    { name: 'Rooftop Venue', bookings: 22, revenue: 28000 },
    { name: 'Private Dining', bookings: 18, revenue: 22500 }
  ];

  const clientSatisfaction = [
    { rating: 5, count: 89, percentage: 72 },
    { rating: 4, count: 28, percentage: 23 },
    { rating: 3, count: 6, percentage: 5 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 }
  ];

  const getMetricColor = (color: string) => {
    const colors = {
      green: 'bg-green-50 text-green-600',
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 text-gray-600';
  };

  const regionalStats = [
    { region: 'Tashkent', revenue: 75000, bookings: 92, growth: '+15%' },
    { region: 'Samarkand', revenue: 35000, bookings: 45, growth: '+8%' },
    { region: 'Bukhara', revenue: 15750, bookings: 19, growth: '+12%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track performance, revenue, and business insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${getMetricColor(metric.color)}`}>
                {metric.icon}
              </div>
              <div className={`text-sm font-medium ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedMetric === 'revenue' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Revenue
              </button>
              <button 
                onClick={() => setSelectedMetric('bookings')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedMetric === 'bookings' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Bookings
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {revenueData.map((data, index) => {
              const value = selectedMetric === 'revenue' ? data.revenue : data.bookings;
              const maxValue = Math.max(...revenueData.map(d => selectedMetric === 'revenue' ? d.revenue : d.bookings));
              const height = (value / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-gray-600 font-medium">
                      {selectedMetric === 'revenue' ? `$${(value / 1000).toFixed(0)}k` : value}
                    </div>
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">{data.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Types Distribution</h3>
          <div className="space-y-4">
            {eventTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{type.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${type.value}%`, 
                        backgroundColor: type.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{type.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Venues */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Venues</h3>
          <div className="space-y-3">
            {topVenues.map((venue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{venue.name}</p>
                    <p className="text-sm text-gray-600">{venue.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${venue.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Satisfaction */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Client Satisfaction</h3>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-yellow-500">4.7</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {clientSatisfaction.map((rating, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex text-yellow-400 text-sm">
                  {rating.rating} ★
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{rating.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Based on 123 reviews this month
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionalStats.map((region, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{region.region}</h4>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">${region.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{region.bookings} bookings</p>
                <p className="text-sm font-medium text-green-600">{region.growth} growth</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-tenant Expansion Ready */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Multi-Tenant Analytics Ready</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Analytics system is designed for multi-tenant expansion across Central Asia. 
          Each tenant gets isolated analytics with regional performance tracking.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Kazakhstan expansion ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Kyrgyzstan integration planned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Multi-currency support</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Real-time data sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};