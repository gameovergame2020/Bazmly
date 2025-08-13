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
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [customTime, setCustomTime] = useState<string>('10:00'); // Yangi state: custom vaqt uchun

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

  // Doimiy vaqt slotlari
  const generateTimeSlots = (available: boolean) => {
    if (!available) return [];

    const allSlots = [
      { time: '10:00', available: true },
      { time: '14:00', available: true },
      { time: '18:00', available: true },
      { time: '20:00', available: true }
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

      // Agar ma'lumot mavjud emas, doimiy qiymat beramiz
      if (!dayAvailability) {
        // O'tgan kunlarni band qilamiz
        if (dateString < today) {
          isAvailable = false;
        } else {
          // Kelajak kunlar uchun doimiy pattern
          const dayOfMonth = new Date(dateString).getDate();
          isAvailable = dayOfMonth % 3 !== 0; // Har 3-kun band bo'ladi
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

    // Agar ma'lumot yo'q bo'lsa, doimiy pattern ishlatamiz
    if (!dayData && selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      const dayOfMonth = new Date(selectedDate).getDate();
      const isAvailable = selectedDate >= today && dayOfMonth % 3 !== 0;

      // Doimiy vaqt slotlari yaratish
      const timeSlots = isAvailable ? [
        { time: '10:00', available: dayOfMonth % 4 !== 1 },
        { time: '14:00', available: dayOfMonth % 4 !== 2 },
        { time: '18:00', available: dayOfMonth % 4 !== 3 },
        { time: '20:00', available: dayOfMonth % 4 !== 0 }
      ] : [];

      dayData = {
        date: selectedDate,
        available: isAvailable,
        timeSlots: timeSlots
      };
    }

    return dayData;
  };

  const handleBooking = () => {
    const finalTime = selectedTime || customTime;
    if (selectedDate && finalTime && clientName && clientPhone) {
      alert(`Band qilindi!\nSana: ${selectedDate}\nVaqt: ${finalTime}\nMijoz: ${clientName}\nTelefon: ${clientPhone}`);
      setShowBookingForm(false);
      setShowTimeModal(false);
      setSelectedDate('');
      setSelectedTime('');
      setCustomTime('10:00');
      setClientName('');
      setClientPhone('');
    } else {
      alert('Iltimos barcha ma\'lumotlarni to\'ldiring!');
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
                    setCustomTime('10:00'); // Modal yopilganda custom vaqtni reset qilish
                    setClientName('');
                    setClientPhone('');
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
              {/* Time Selection */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Vaqt tanlash
                </h4>

                {/* Custom Time Selection */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200 mb-6">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    O'zingiz vaqt belgilang (To'yxona ish vaqti: 08:00 - 23:00)
                  </h5>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kerakli vaqtni tanlang:
                      </label>
                      <input
                        type="time"
                        min="08:00"
                        max="23:00"
                        step="1800"
                        value={customTime}
                        onChange={(e) => {
                          setCustomTime(e.target.value);
                          setSelectedTime(e.target.value);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                        style={{ appearance: 'textfield' }}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        To'yxona 08:00 dan 23:00 gacha ishlaydi
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Tanlangan vaqt:</div>
                      <div className="font-bold text-xl text-blue-600">
                        {customTime || '08:00'}
                      </div>
                      <div className="text-sm font-medium text-green-600 mt-1">
                        Narx: {
                          customTime && parseInt(customTime.split(':')[0]) >= 18 ? '$2,000' :
                          customTime && parseInt(customTime.split(':')[0]) >= 10 ? '$1,500' : '$1,200'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>

              {/* Client Booking Form */}
              {selectedTime && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h5 className="font-bold text-gray-900 text-xl mb-6">Ma'lumotlarni to'ldiring:</h5>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Booking Summary */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border">
                        <h6 className="font-semibold text-gray-900 mb-3">Tanlangan vaqt:</h6>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sana:</span>
                            <span className="font-medium">{new Date(selectedDate).toLocaleDateString('uz-UZ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vaqt:</span>
                            <span className="font-medium">{selectedTime || customTime}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Narx:</span>
                            <span className="font-bold text-green-600">
                              {(selectedTime || customTime) && parseInt((selectedTime || customTime).split(':')[0]) >= 18 ? '$2,000' : 
                               (selectedTime || customTime) && parseInt((selectedTime || customTime).split(':')[0]) >= 10 ? '$1,500' : '$1,200'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Client Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ism Familiya *
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Ismingiz va familiyangizni kiriting"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon raqam *
                        </label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {(selectedTime || customTime) && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowTimeModal(false);
                      setSelectedDate('');
                      setSelectedTime('');
                      setCustomTime('10:00'); // Modal yopilganda custom vaqtni reset qilish
                      setClientName('');
                      setClientPhone('');
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!clientName.trim() || !clientPhone.trim()}
                    className={`flex-1 flex items-center justify-center space-x-3 px-6 py-3 rounded-lg transition-all font-bold text-lg shadow-lg ${
                      clientName.trim() && clientPhone.trim()
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-6 h-6" />
                    <span>Band qilish</span>
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