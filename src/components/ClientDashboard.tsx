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
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [showTimeRangeSelector, setShowTimeRangeSelector] = useState<boolean>(false);
  const [showDurationModal, setShowDurationModal] = useState<boolean>(false);
  const [tempStartTime, setTempStartTime] = useState<string>('');
  const [selectedHours, setSelectedHours] = useState<number>(1);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

  // Demo ma'lumotlar - real holatda server'dan keladi
  const availability: DayAvailability[] = [
    {
      date: '2025-01-18',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: false, booked: true },
        { time: '18:00', available: true },
        { time: '20:00', available: false, booked: true }
      ]
    },
    {
      date: '2025-01-19',
      available: true,
      timeSlots: [
        { time: '10:00', available: true },
        { time: '14:00', available: true },
        { time: '18:00', available: false, booked: true },
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

  // Vaqt oralig'ini hisoblash uchun yordamchi funksiya
  const generateEndTimeOptions = (startTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const options = [];
    
    // 30 daqiqadan 8 soatgacha
    for (let minutes = 30; minutes <= 480; minutes += 15) {
      const endMinutes = startMinutes + minutes;
      if (endMinutes >= 23 * 60) break; // 23:00 dan oshmasin
      
      const endHour = Math.floor(endMinutes / 60);
      const endMin = endMinutes % 60;
      const timeStr = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
      
      const duration = minutes < 60 ? `${minutes} daq` : 
                      minutes === 60 ? `1 soat` :
                      `${Math.floor(minutes / 60)} soat ${minutes % 60 ? (minutes % 60) + ' daq' : ''}`;
      
      options.push({ time: timeStr, duration, minutes });
    }
    
    return options;
  };

  const handleTimeClick = (timeStr: string) => {
    setTempStartTime(timeStr);
    setShowDurationModal(true);
    setSelectedHours(1);
    setSelectedMinutes(0);
    setSelectedTime('');
    setSelectedEndTime('');
  };

  const handleTimeRangeSelect = (endTime: string) => {
    setSelectedTime(tempStartTime);
    setSelectedEndTime(endTime);
    setShowTimeRangeSelector(false);
  };

  const handleDurationConfirm = () => {
    const [startHour, startMin] = tempStartTime.split(':').map(Number);
    const totalStartMinutes = startHour * 60 + startMin;
    const durationInMinutes = selectedHours * 60 + selectedMinutes;
    const totalEndMinutes = totalStartMinutes + durationInMinutes;
    
    const endHour = Math.floor(totalEndMinutes / 60);
    const endMin = totalEndMinutes % 60;
    
    // 23:00 dan oshmasligini tekshirish
    if (endHour >= 23) {
      alert('Tugash vaqti 23:00 dan oshmasligi kerak!');
      return;
    }
    
    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
    
    setSelectedTime(tempStartTime);
    setSelectedEndTime(endTimeStr);
    setShowDurationModal(false);
  };

  const handleBooking = () => {
    // Telefon raqam validatsiyasi - kamida 9 ta raqam bo'lishi kerak
    const phoneNumbers = clientPhone.replace(/\s/g, '');
    if (selectedDate && selectedTime && selectedEndTime && clientName.trim() && phoneNumbers.length >= 9) {
      const formattedPhone = `+998 ${clientPhone}`;
      alert(`Band qilindi!\nSana: ${selectedDate}\nVaqt: ${selectedTime} - ${selectedEndTime}\nMijoz: ${clientName}\nTelefon: ${formattedPhone}`);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedEndTime('');
      setShowTimeRangeSelector(false);
      setTempStartTime('');
      setClientName('');
      setClientPhone('');
      setShowBookingModal(false);
    } else {
      if (!selectedDate) {
        alert('Iltimos sana tanlang!');
      } else if (!selectedTime || !selectedEndTime) {
        alert('Iltimos vaqt oralig\'ini tanlang!');
      } else if (!clientName.trim()) {
        alert('Iltimos ism familiyangizni kiriting!');
      } else if (phoneNumbers.length < 9) {
        alert('Iltimos to\'liq telefon raqamini kiriting! (9 ta raqam)');
      }
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
                          setSelectedEndTime('');
                          setShowBookingModal(true);
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

        

        {/* Booking Form Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white w-full h-full sm:h-auto sm:max-w-7xl sm:rounded-xl shadow-2xl sm:max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                    <span className="truncate">Vaqt va Ma'lumotlarni To'ldiring</span>
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">Kerakli vaqt va shaxsiy ma'lumotlaringizni kiriting</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
        <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Left side - Time Selection */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-lg p-3 sm:p-6 border shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center text-base sm:text-lg">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Vaqt Tanlash
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">To'yxona ish vaqti: 08:00 - 23:00</p>

                  {/* Mavjud vaqtlar */}
                  {selectedDate && !showDurationModal && (
                    <div className="mb-4 sm:mb-6">
                      <div className="bg-white border-2 border-red-400 rounded-lg p-3 sm:p-4">
                        <h5 className="font-bold text-gray-900 mb-3 sm:mb-4 text-center text-sm sm:text-base">Mavjud vaqtlar:</h5>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-center">Boshlanish vaqtini tanlang</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                          {Array.from({ length: 15 }, (_, i) => {
                            const hour = i + 8;
                            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                            const dayData = getSelectedDayAvailability();
                            const isBooked = dayData?.timeSlots.some(slot => 
                              slot.time === timeStr && slot.booked
                            );
                            
                            return (
                              <button
                                key={hour}
                                onClick={() => {
                                  if (!isBooked) {
                                    handleTimeClick(timeStr);
                                  }
                                }}
                                disabled={isBooked}
                                className={`
                                  px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border-2
                                  ${isBooked 
                                    ? 'bg-red-100 text-red-600 border-red-300 cursor-not-allowed' 
                                    : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200 cursor-pointer'
                                  }
                                `}
                              >
                                {timeStr}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-center space-x-3 sm:space-x-6 mt-3 sm:mt-4 text-xs sm:text-sm">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                            <span className="text-gray-700">Mavjud</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                            <span className="text-gray-700">Band qilingan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Tanlangan vaqt:</span>
                      <span className="font-bold text-base sm:text-xl text-blue-600">
                        {selectedTime && selectedEndTime 
                          ? `${selectedTime} - ${selectedEndTime}` 
                          : 'Vaqt tanlanmagan'}
                      </span>
                    </div>
                    {selectedTime && selectedEndTime && (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Davomiylik:</span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {(() => {
                            const [startHour, startMin] = selectedTime.split(':').map(Number);
                            const [endHour, endMin] = selectedEndTime.split(':').map(Number);
                            const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;
                            return hours > 0 && minutes > 0 
                              ? `${hours} soat ${minutes} daqiqa`
                              : hours > 0 
                                ? `${hours} soat`
                                : `${minutes} daqiqa`;
                          })()}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Narx:</span>
                      <span className="font-bold text-base sm:text-lg text-green-600">
                        {selectedTime && selectedEndTime ? (() => {
                          const [startHour] = selectedTime.split(':').map(Number);
                          const [endHour, endMin] = selectedEndTime.split(':').map(Number);
                          const totalMinutes = (endHour * 60 + endMin) - (startHour * 60);
                          const hours = Math.ceil(totalMinutes / 60);
                          const hourlyRate = startHour >= 18 ? 400 : startHour >= 10 ? 300 : 200;
                          return `$${hours * hourlyRate}`;
                        })() : '$0'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Duration Modal */}
                {showDurationModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white w-full h-full sm:h-auto sm:rounded-xl border shadow-2xl p-4 sm:p-6 sm:max-w-md sm:w-full sm:mx-4 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-white pb-2 sm:pb-0 sm:static">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          Davomiylikni Tanlang
                        </h3>
                        <button
                          onClick={() => {
                            setShowDurationModal(false);
                            setTempStartTime('');
                          }}
                          className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl p-1 hover:bg-gray-100 rounded"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mb-4 sm:mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                          <div className="text-center">
                            <div className="text-xs sm:text-sm text-blue-600 mb-1">Boshlanish vaqti</div>
                            <div className="text-xl sm:text-2xl font-bold text-blue-800">{tempStartTime}</div>
                          </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          {/* Soat tanlash */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Soat
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                              {(() => {
                                const [startHour] = tempStartTime.split(':').map(Number);
                                const maxWorkHour = 23; // Ish vaqti 23:00 gacha
                                const maxPossibleHours = maxWorkHour - startHour; // Ish vaqti doirasida qolgan soatlar
                                const availableHours = Math.min(8, maxPossibleHours); // Maksimum 8 soat yoki ish vaqti oxirigacha
                                
                                return Array.from({ length: availableHours }, (_, i) => i + 1).map(hour => (
                                  <button
                                    key={hour}
                                    onClick={() => setSelectedHours(hour)}
                                    className={`
                                      px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border-2
                                      ${selectedHours === hour
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                                      }
                                    `}
                                  >
                                    {hour}
                                  </button>
                                ));
                              })()}
                            </div>
                          </div>

                          {/* Daqiqa tanlash */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Daqiqa
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {(() => {
                                const [startHour, startMin] = tempStartTime.split(':').map(Number);
                                const startTotalMinutes = startHour * 60 + startMin;
                                const maxWorkMinutes = 23 * 60; // 23:00 = 1380 daqiqa
                                const availableMinutes = [0, 15, 30, 45];
                                
                                // Agar tanlangan soat bilan birga daqiqa qo'shilganda 23:00 dan oshmasligini tekshirish
                                return availableMinutes.filter(minute => {
                                  const totalDuration = selectedHours * 60 + minute;
                                  const endTime = startTotalMinutes + totalDuration;
                                  return endTime <= maxWorkMinutes;
                                }).map(minute => (
                                  <button
                                    key={minute}
                                    onClick={() => setSelectedMinutes(minute)}
                                    className={`
                                      px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border-2
                                      ${selectedMinutes === minute
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                                      }
                                    `}
                                  >
                                    {minute === 0 ? '00' : minute}
                                  </button>
                                ));
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Preview */}
                        <div className="mt-3 sm:mt-4 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                          <div className="text-center">
                            <div className="text-xs sm:text-sm text-green-600 mb-1">Jami davomiylik</div>
                            <div className="text-base sm:text-lg font-bold text-green-800">
                              {selectedHours > 0 && selectedMinutes > 0 
                                ? `${selectedHours} soat ${selectedMinutes} daqiqa`
                                : selectedHours > 0 
                                  ? `${selectedHours} soat`
                                  : `${selectedMinutes} daqiqa`}
                            </div>
                            <div className="text-xs sm:text-sm text-green-600 mt-2">
                              Tugash: {(() => {
                                const [startHour, startMin] = tempStartTime.split(':').map(Number);
                                const totalMinutes = startHour * 60 + startMin + selectedHours * 60 + selectedMinutes;
                                const endHour = Math.floor(totalMinutes / 60);
                                const endMin = totalMinutes % 60;
                                return `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 sm:space-x-3 sticky bottom-0 bg-white pt-3 sm:pt-0 sm:static">
                        <button
                          onClick={() => {
                            setShowDurationModal(false);
                            setTempStartTime('');
                          }}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                        >
                          Bekor qilish
                        </button>
                        <button
                          onClick={handleDurationConfirm}
                          disabled={selectedHours === 0 && selectedMinutes === 0}
                          className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                            selectedHours === 0 && selectedMinutes === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Tasdiqlash
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                
              </div>

              {/* Right side - Client Form */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-lg p-3 sm:p-6 border shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center text-base sm:text-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Shaxsiy Ma'lumotlar
                  </h4>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Ism Familiya *
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ismingiz va familiyangizni kiriting"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Telefon Raqam *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm sm:text-base">+998</span>
                        </div>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => {
                            // Faqat raqamlar va bo'shliqlarni qabul qilish
                            const value = e.target.value.replace(/[^\d\s]/g, '');
                            // Maksimum 9 ta raqam (90 123 45 67 formatida)
                            if (value.replace(/\s/g, '').length <= 9) {
                              setClientPhone(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Faqat raqamlar, backspace, delete, arrow keys, space va tabni ruxsat berish
                            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', ' '];
                            if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="90 123 45 67"
                          className="w-full pl-12 sm:pl-16 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Format: 90 123 45 67
                      </p>
                    </div>

                    
                  </div>
                </div>

                {/* Action Button */}
                <div className="bg-white rounded-lg p-3 sm:p-6 border shadow-sm">
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !clientName.trim() || clientPhone.replace(/\s/g, '').length < 9 || !selectedTime || !selectedEndTime}
                    className={`w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-all font-bold text-sm sm:text-lg shadow-lg ${
                      selectedDate && clientName.trim() && clientPhone.replace(/\s/g, '').length >= 9 && selectedTime && selectedEndTime
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-center leading-tight">
                      {!selectedDate ? 'Avval sana tanlang' :
                       !selectedTime || !selectedEndTime ? 'Vaqt oralig\'ini tanlang' :
                       !clientName.trim() ? 'Ism familiyani kiriting' :
                       clientPhone.replace(/\s/g, '').length < 9 ? 'To\'liq telefon raqam kiriting' :
                       'Band Qilish'}
                    </span>
                  </button>

                  {selectedDate && (
                    <div className="mt-2 sm:mt-3 text-center">
                      <p className="text-xs sm:text-sm text-gray-600">
                        {new Date(selectedDate).toLocaleDateString('uz-UZ', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })} kuni band qilinyapti
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            
          </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-end space-x-2 sm:space-x-3 sticky bottom-0 sm:static">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};