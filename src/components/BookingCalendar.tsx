import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Filter, Search } from 'lucide-react';
import { User } from '../App';

interface BookingCalendarProps {
  user: User;
}

interface Booking {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  endTime: string;
  guests: number;
  venue: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: 'wedding' | 'corporate' | 'birthday' | 'meeting' | 'other';
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const bookings: Booking[] = [
    {
      id: '1',
      title: 'Aziza & Bobur Wedding',
      client: 'Aziza Karimova',
      date: '2025-01-18',
      time: '18:00',
      endTime: '23:00',
      guests: 200,
      venue: 'Grand Hall A',
      status: 'confirmed',
      type: 'wedding'
    },
    {
      id: '2',
      title: 'TechCorp Annual Meeting',
      client: 'TechCorp Ltd',
      date: '2025-01-19',
      time: '14:00',
      endTime: '17:00',
      guests: 150,
      venue: 'Conference Center',
      status: 'pending',
      type: 'corporate'
    },
    {
      id: '3',
      title: 'Olim\'s 50th Birthday',
      client: 'Olim Karimov',
      date: '2025-01-20',
      time: '19:00',
      endTime: '22:00',
      guests: 80,
      venue: 'Garden Terrace',
      status: 'confirmed',
      type: 'birthday'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      wedding: 'bg-pink-50 border-l-pink-400',
      corporate: 'bg-blue-50 border-l-blue-400',
      birthday: 'bg-green-50 border-l-green-400',
      meeting: 'bg-purple-50 border-l-purple-400',
      other: 'bg-gray-50 border-l-gray-400'
    };
    return colors[type as keyof typeof colors];
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, -i);
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate.toISOString().split('T')[0]
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: currentDate.toISOString().split('T')[0]
      });
    }

    return days;
  };

  const getDayBookings = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Calendar</h1>
          <p className="text-gray-600 mt-1">Manage events and reservations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
            
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => {
                const dayBookings = getDayBookings(day.fullDate);
                const isToday = day.fullDate === new Date().toISOString().split('T')[0];
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-100 rounded-lg ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    } ${isToday ? 'text-blue-600' : ''}`}>
                      {day.date}
                    </div>
                    <div className="space-y-1">
                      {dayBookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className={`p-1 rounded text-xs ${getTypeColor(booking.type)}`}
                        >
                          <div className="font-medium truncate">{booking.title}</div>
                          <div className="text-gray-600">{booking.time}</div>
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Bookings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {bookings.map(booking => (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{booking.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{booking.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time} - {booking.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.venue}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {booking.guests} guests expected
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};