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
  clientPhone?: string;
  date: string;
  time: string;
  endTime: string;
  guests: number;
  venue: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: 'wedding' | 'corporate' | 'birthday' | 'meeting' | 'other';
  price?: number;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<Booking | null>(null);

  const bookings: Booking[] = [
    {
      id: '1',
      title: 'Aziza & Bobur Wedding',
      client: 'Aziza Karimova',
      clientPhone: '+998 90 123 45 67',
      date: '2025-01-18',
      time: '18:00',
      endTime: '23:00',
      guests: 200,
      venue: 'Grand Hall A',
      status: 'confirmed',
      type: 'wedding',
      price: 2000
    },
    {
      id: '2',
      title: 'TechCorp Annual Meeting',
      client: 'TechCorp Ltd',
      clientPhone: '+998 93 567 89 01',
      date: '2025-01-19',
      time: '14:00',
      endTime: '17:00',
      guests: 150,
      venue: 'Conference Center',
      status: 'pending',
      type: 'corporate',
      price: 900
    },
    {
      id: '3',
      title: 'Olim\'s 50th Birthday',
      client: 'Olim Karimov',
      clientPhone: '+998 97 987 65 43',
      date: '2025-01-20',
      time: '19:00',
      endTime: '22:00',
      guests: 80,
      venue: 'Garden Terrace',
      status: 'confirmed',
      type: 'birthday',
      price: 600
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
                          onClick={() => {
                            setSelectedBookingDetails(booking);
                            setShowBookingDetailsModal(true);
                          }}
                          className={`p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(booking.type)}`}
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

      {/* Booking Details Modal */}
      {showBookingDetailsModal && selectedBookingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-xl shadow-2xl sm:max-h-[95vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Rezervatsiya Tafsilotlari</span>
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowBookingDetailsModal(false);
                  setSelectedBookingDetails(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                {/* Event Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{selectedBookingDetails.title}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Mijoz:</span>
                        <span className="font-semibold text-gray-800">{selectedBookingDetails.client}</span>
                      </div>
                      {selectedBookingDetails.clientPhone && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Telefon:</span>
                          <span className="font-semibold text-gray-800">{selectedBookingDetails.clientPhone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Sana:</span>
                        <span className="font-semibold text-gray-800">
                          {new Date(selectedBookingDetails.date).toLocaleDateString('uz-UZ', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Vaqt:</span>
                        <span className="font-semibold text-gray-800">
                          {selectedBookingDetails.time} - {selectedBookingDetails.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Mehmonlar:</span>
                        <span className="font-semibold text-gray-800">{selectedBookingDetails.guests} kishi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Zal:</span>
                        <span className="font-semibold text-gray-800">{selectedBookingDetails.venue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Holat:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedBookingDetails.status)}`}>
                          {selectedBookingDetails.status === 'confirmed' ? 'Tasdiqlangan' :
                           selectedBookingDetails.status === 'pending' ? 'Kutilmoqda' :
                           'Bekor qilingan'}
                        </span>
                      </div>
                      {selectedBookingDetails.price && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Narxi:</span>
                          <span className="font-bold text-lg text-green-600">${selectedBookingDetails.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-2">Davomiylik Ma'lumoti</h5>
                  <div className="text-sm text-blue-700">
                    {(() => {
                      const [startHour, startMin] = selectedBookingDetails.time.split(':').map(Number);
                      const [endHour, endMin] = selectedBookingDetails.endTime.split(':').map(Number);
                      const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;
                      return hours > 0 && minutes > 0
                        ? `${hours} soat ${minutes} daqiqa`
                        : hours > 0
                          ? `${hours} soat`
                          : `${minutes} daqiqa`;
                    })()}
                  </div>
                </div>

                {/* Event Type */}
                <div className={`border-l-4 pl-4 py-2 ${
                  selectedBookingDetails.type === 'wedding' ? 'border-l-pink-400 bg-pink-50' :
                  selectedBookingDetails.type === 'corporate' ? 'border-l-blue-400 bg-blue-50' :
                  selectedBookingDetails.type === 'birthday' ? 'border-l-green-400 bg-green-50' :
                  selectedBookingDetails.type === 'meeting' ? 'border-l-purple-400 bg-purple-50' :
                  'border-l-gray-400 bg-gray-50'
                }`}>
                  <h5 className="font-medium text-gray-800 mb-1">Tadbir Turi</h5>
                  <div className="text-sm text-gray-600">
                    {selectedBookingDetails.type === 'wedding' ? 'To\'y' :
                     selectedBookingDetails.type === 'corporate' ? 'Korporativ' :
                     selectedBookingDetails.type === 'birthday' ? 'Tug\'ilgan kun' :
                     selectedBookingDetails.type === 'meeting' ? 'Uchrashuv' :
                     'Boshqa'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-between items-center sticky bottom-0 sm:static">
              <div className="text-sm text-gray-600">
                ID: {selectedBookingDetails.id}
              </div>
              <button
                onClick={() => {
                  setShowBookingDetailsModal(false);
                  setSelectedBookingDetails(null);
                }}
                className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};