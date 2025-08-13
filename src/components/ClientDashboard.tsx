import React, { useState } from 'react';
import { Calendar, Clock, Check, X, Users, DollarSign, Star } from 'lucide-react';
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
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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
    },
    {
      date: '2025-01-22',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-23',
      available: false,
      timeSlots: []
    },
    {
      date: '2025-01-24',
      available: true,
      timeSlots: [
        { time: '10:00', available: false },
        { time: '14:00', available: true },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-25',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: false },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-26',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: false },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-27',
      available: false,
      timeSlots: []
    },
    {
      date: '2025-01-28',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: true },
        { time: '20:00', available: false }
      ]
    },
    {
      date: '2025-01-29',
      available: true,
      timeSlots: [
        { time: '10:00', available: false },
        { time: '14:00', available: false },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-30',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: true },
        { time: '20:00', available: true }
      ]
    },
    {
      date: '2025-01-31',
      available: false,
      timeSlots: []
    }
  ];

  // Har xil oylar uchun tasodifiy ma'lumotlar yaratish funksiyasi
  const generateTimeSlots = (available: boolean) => {
    if (!available) return [];
    
    const allSlots = [
      { time: '10:00', available: Math.random() > 0.2 },
      { time: '14:00', available: Math.random() > 0.3 },
      { time: '18:00', available: Math.random() > 0.4 },
      { time: '20:00', available: Math.random() > 0.5 }
    ];
    
    return allSlots;
  };

  const generateCalendarDays = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date().toISOString().split('T')[0];

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
      const dayDate = new Date(currentYear, currentMonth, day);
      const dateString = dayDate.toISOString().split('T')[0];
      const dayAvailability = availability.find(a => a.date === dateString);
      
      // Agar ma'lumot yo'q bo'lsa, tasodifiy available qilamiz
      let isAvailable = dayAvailability?.available || false;
      
      // Agar ma'lumot mavjud emas, tasodifiy qiymat beramiz
      if (!dayAvailability) {
        // O'tgan kunlarni band qilamiz
        if (dateString < today) {
          isAvailable = false;
        } else {
          // Kelajak kunlar uchun tasodifiy available/band
          isAvailable = Math.random() > 0.3; // 70% available
        }
      }

      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: dateString,
        available: isAvailable
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    // Sana o'zgarganda tanlangan sanani tozalaymiz
    setSelectedDate('');
    setSelectedTime('');
  };

  const getSelectedDayAvailability = () => {
    let dayData = availability.find(a => a.date === selectedDate);
    
    // Agar ma'lumot yo'q bo'lsa, tasodifiy yaratamiz
    if (!dayData && selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      const isAvailable = selectedDate >= today && Math.random() > 0.3;
      
      dayData = {
        date: selectedDate,
        available: isAvailable,
        timeSlots: generateTimeSlots(isAvailable)
      };
    }
    
    return dayData;
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
              <h1 className="text-2xl font-bold text-gray-900">To'yxona</h1>
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
                  {currentDate.toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigateMonth('prev')}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Oldingi
                  </button>
                  <button 
                    onClick={() => navigateMonth('next')}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Keyingi →
                  </button>
                </div>
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
                          setShowTimeModal(true);
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

            
          </div>
        </div>
      </div>

      {/* Time Selection Modal */}
      {showTimeModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-7 h-7 mr-3 text-blue-600" />
                    {new Date(selectedDate).toLocaleDateString('uz-UZ', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h3>
                  <p className="text-gray-600 mt-1">Mavjud vaqtlar va qo'shimcha ma'lumotlar</p>
                </div>
                <button
                  onClick={() => {
                    setShowTimeModal(false);
                    setSelectedDate('');
                    setSelectedTime('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                  ✓ Mavjud kun
                </div>
                <p className="text-sm text-gray-500">
                  {getSelectedDayAvailability()?.timeSlots.filter(slot => slot.available).length || 0} ta vaqt mavjud
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Venue Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Zal Ma'lumotlari
                  </h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Sig'im:</span>
                      <span className="font-medium">200-300 kishi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maydon:</span>
                      <span className="font-medium">500 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lokatsiya:</span>
                      <span className="font-medium">Grand Hall</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Narxlar
                  </h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Kunlik (10:00-18:00):</span>
                      <span className="font-medium text-green-600">$1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kechki (18:00-24:00):</span>
                      <span className="font-medium text-blue-600">$2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>To'liq kun:</span>
                      <span className="font-medium text-purple-600">$3,200</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    Qo'shimcha Xizmatlar
                  </h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Texnika (audio/video)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Dekoratsiya</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Catering xizmati</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Mavjud vaqt oralig'i
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {getSelectedDayAvailability()?.timeSlots.map(slot => {
                    const isEvening = parseInt(slot.time.split(':')[0]) >= 18;
                    const isDaytime = parseInt(slot.time.split(':')[0]) >= 10 && parseInt(slot.time.split(':')[0]) < 18;

                    return (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`
                          p-6 rounded-xl border text-center transition-all relative shadow-sm
                          ${selectedTime === slot.time 
                            ? 'bg-blue-100 border-blue-300 text-blue-700 ring-2 ring-blue-500 scale-105' 
                            : ''
                          }
                          ${slot.available 
                            ? 'hover:bg-green-50 hover:border-green-300 cursor-pointer border-gray-300 hover:shadow-md hover:scale-105' 
                            : 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed opacity-60'
                          }
                        `}
                      >
                        <div className="font-bold text-xl mb-2">{slot.time}</div>
                        <div className="text-sm mb-2">
                          {slot.available ? '✓ Mavjud' : '✗ Band'}
                        </div>
                        {slot.available && (
                          <div className="text-sm font-bold text-green-600">
                            {isEvening ? '$2,000' : isDaytime ? '$1,500' : '$1,200'}
                          </div>
                        )}
                        {slot.available && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Confirmation */}
              {selectedTime && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 text-xl mb-4">Tanlangan rezervatsiya:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <p className="text-gray-600 text-sm mb-1">Sana</p>
                          <p className="font-bold text-gray-900">
                            {new Date(selectedDate).toLocaleDateString('uz-UZ')}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <p className="text-gray-600 text-sm mb-1">Vaqt</p>
                          <p className="font-bold text-gray-900">{selectedTime}</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <p className="text-gray-600 text-sm mb-1">Narx</p>
                          <p className="font-bold text-green-600 text-lg">
                            {parseInt(selectedTime.split(':')[0]) >= 18 ? '$2,000' : 
                             parseInt(selectedTime.split(':')[0]) >= 10 ? '$1,500' : '$1,200'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {selectedTime && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowTimeModal(false);
                      setSelectedDate('');
                      setSelectedTime('');
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={() => {
                      handleBooking();
                      setShowTimeModal(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-bold text-lg shadow-lg"
                  >
                    <Check className="w-6 h-6" />
                    <span>Tasdiqlayman</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};