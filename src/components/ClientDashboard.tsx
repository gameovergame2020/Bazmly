
import React, { useState } from 'react';
import { Calendar, Clock, Check, X } from 'lucide-react';
import { User } from '../App';

interface ClientDashboardProps {
  user: User;
}

interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

interface DayAvailability {
  date: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Demo ma'lumotlar - real holatda server'dan keladi
  const availability: DayAvailability[] = [
    {
      date: '2025-01-18',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: false },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-19',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: false },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-20',
      available: false,
      timeSlots: []
    },
    {
      date: '2025-01-21',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: true },
        { time: '20:00', available: false }
      ]
    }
  ];

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Oldingi oyning qolgan kunlari
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, -i);
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate.toISOString().split('T')[0],
        available: false
      });
    }

    // Joriy oyning kunlari
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const dateString = currentDate.toISOString().split('T')[0];
      const dayAvailability = availability.find(a => a.date === dateString);
      
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: dateString,
        available: dayAvailability?.available || false
      });
    }

    return days;
  };

  const getSelectedDayAvailability = () => {
    return availability.find(a => a.date === selectedDate);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Band qilindi: ${selectedDate} ${selectedTime}`);
      setShowBookingForm(false);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Banket Zali</h1>
              <p className="text-gray-600">Salom, {user.name}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Bugun</p>
              <p className="font-medium">{new Date().toLocaleDateString('uz-UZ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Vaqt Band Qilish</h2>
                <p className="text-gray-600">Kerakli sana va vaqtni tanlang</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Calendar Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {new Date().toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Mavjud</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span>Band</span>
                  </div>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  const isSelected = day.fullDate === selectedDate;
                  const isToday = day.fullDate === new Date().toISOString().split('T')[0];
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (day.isCurrentMonth && day.available) {
                          setSelectedDate(day.fullDate);
                          setSelectedTime('');
                        }
                      }}
                      disabled={!day.isCurrentMonth || !day.available}
                      className={`
                        min-h-16 p-2 rounded-lg border transition-all relative
                        ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                        ${isToday ? 'ring-2 ring-blue-500' : ''}
                        ${isSelected ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}
                        ${day.available && day.isCurrentMonth 
                          ? 'hover:bg-green-50 hover:border-green-300 cursor-pointer' 
                          : 'cursor-not-allowed'
                        }
                        ${!day.available && day.isCurrentMonth ? 'bg-red-50 border-red-200' : ''}
                      `}
                    >
                      <div className="text-sm font-medium">{day.date}</div>
                      {day.isCurrentMonth && (
                        <div className="absolute top-1 right-1">
                          {day.available ? (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          ) : (
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {new Date(selectedDate).toLocaleDateString('uz-UZ', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })} uchun vaqtlar
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {getSelectedDayAvailability()?.timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`
                        p-3 rounded-lg border text-center transition-all
                        ${selectedTime === slot.time 
                          ? 'bg-blue-100 border-blue-300 text-blue-700' 
                          : ''
                        }
                        ${slot.available 
                          ? 'hover:bg-green-50 hover:border-green-300 cursor-pointer border-gray-300' 
                          : 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="font-medium">{slot.time}</div>
                      <div className="text-xs mt-1">
                        {slot.available ? 'Mavjud' : 'Band'}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Booking Button */}
                {selectedTime && (
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Tanlangan vaqt:</h5>
                        <p className="text-lg font-bold text-blue-600">
                          {new Date(selectedDate).toLocaleDateString('uz-UZ')} - {selectedTime}
                        </p>
                      </div>
                      <button
                        onClick={handleBooking}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <Check className="w-5 h-5" />
                        <span>Band qilish</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
