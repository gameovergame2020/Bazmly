import React, { useState } from 'react';
import { Calendar, Clock, Check, X, Users, DollarSign, Star, ChefHat, Utensils, Calculator } from 'lucide-react';
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

interface Booking {
  id: string;
  date: string;
  time: string;
  endTime: string;
  clientName: string;
  clientPhone: string;
  duration: string;
  price: number;
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
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState<any[]>([]);
  const [guestCount, setGuestCount] = useState<number>(50);
  const [selectedPricing, setSelectedPricing] = useState<any>(null);
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<Booking | null>(null);

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

  // Maqsadli serverdan olinishi kerak bo'lgan rezervatsiya ma'lumotlari
  const bookedTimeSlots: Booking[] = [
    {
      id: 'booking1',
      date: '2025-01-18',
      time: '14:00',
      endTime: '16:00',
      clientName: 'Alijon Valiev',
      clientPhone: '+998 90 123 45 67',
      duration: '2 soat',
      price: 600
    },
    {
      id: 'booking2',
      date: '2025-01-18',
      time: '20:00',
      endTime: '22:00',
      clientName: 'Dilfuza Karimova',
      clientPhone: '+998 93 567 89 01',
      duration: '2 soat',
      price: 600
    },
    {
      id: 'booking3',
      date: '2025-01-19',
      time: '18:00',
      endTime: '21:00',
      clientName: 'Rustamjon Akbarov',
      clientPhone: '+998 97 987 65 43',
      duration: '3 soat',
      price: 900
    }
  ];


  // Narxlar va ovqatlar ma'lumotlari
  const pricingPackages = [
    {
      id: 'basic',
      name: 'Asosiy To\'y Paketi',
      price: 25,
      pricePerPerson: true,
      description: 'Oddiy to\'y uchun minimal paket',
      includes: [
        'Stol va stullar (10 kishi uchun 1 stol)',
        'Oddiy bezatish',
        'Asosiy ovqatlar (3 ta)',
        'Non va salat',
        'Choy va sharbat'
      ],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'premium',
      name: 'Premium To\'y Paketi',
      price: 45,
      pricePerPerson: true,
      description: 'Keng imkoniyatli to\'y paketi',
      includes: [
        'Bezatilgan stol va stullar',
        'Professional bezatish',
        'Maxsus ovqatlar (6 ta)',
        'Meva va shirinliklar',
        'Milliy ichimliklar',
        'Gul bezaklari'
      ],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'luxury',
      name: 'Hashamatli To\'y Paketi',
      price: 75,
      pricePerPerson: true,
      description: 'Eng yuqori darajadagi xizmat',
      includes: [
        'VIP stol va stullar',
        'Hashamatli bezatish',
        'Maxsus chef ovqatlari (10+ ta)',
        'Premium ichimliklar',
        'Professional fotograf',
        'Jonli musiqa',
        'Maxsus xizmat'
      ],
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  const menuCategories = [
    {
      id: 'main',
      name: 'Asosiy Ovqatlar',
      items: [
        { id: 1, name: 'Osh (1 kishi uchun)', price: 8, description: 'An\'anaviy o\'zbek oshi' },
        { id: 2, name: 'Manti (8 dona)', price: 6, description: 'Bug\'da pishirilgan manti' },
        { id: 3, name: 'Shashlik (1 porsiya)', price: 12, description: 'Qo\'zichoq go\'shti shashlik' },
        { id: 4, name: 'Lag\'mon', price: 7, description: 'Qo\'l tortma lag\'mon' },
        { id: 5, name: 'Somsa (1 dona)', price: 2, description: 'Tandir somsasi' }
      ]
    },
    {
      id: 'salads',
      name: 'Salatlar',
      items: [
        { id: 6, name: 'Achiq-chuchuk', price: 5, description: 'Pomidor va piyoz salati' },
        { id: 7, name: 'Olivye', price: 6, description: 'Klassik olivye salati' },
        { id: 8, name: 'Grek salati', price: 8, description: 'Yunon salati' },
        { id: 9, name: 'Sabzavot salati', price: 4, description: 'Mavsumiy sabzavotlar' }
      ]
    },
    {
      id: 'drinks',
      name: 'Ichimliklar',
      items: [
        { id: 10, name: 'Choy (1 piyola)', price: 1, description: 'Ko\'k va qora choy' },
        { id: 11, name: 'Sharbat (1 stakan)', price: 2, description: 'Tabiiy mevali sharbat' },
        { id: 12, name: 'Kola (0.5L)', price: 3, description: 'Gazlangan ichimlik' },
        { id: 13, name: 'Milliy ichimlik', price: 4, description: 'Maxsus tayyorlangan' }
      ]
    },
    {
      id: 'desserts',
      name: 'Shirinliklar',
      items: [
        { id: 14, name: 'To\'y torti (1 bo\'lak)', price: 8, description: 'Maxsus to\'y torti' },
        { id: 15, name: 'Halva', price: 3, description: 'An\'anaviy halva' },
        { id: 16, name: 'Meva tarelkasi', price: 10, description: 'Mavsumiy mevalar' },
        { id: 17, name: 'Paxlava', price: 5, description: 'Yong\'oqli paxlava' }
      ]
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

    // Current month's days
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

      // BookedTimeSlots mavjudligini tekshirish lekin kunni to'liq band qilmaslik
      const hasBooking = bookedTimeSlots.some(slot => slot.date === dateString);
      // Agar kun mavjud bo'lsa, buyurtma mavjudligi bilan ham mavjud qolsin
      if (!isAvailable && !hasBooking) {
        isAvailable = false;
      } else if (dateString >= today) {
        // Hozirgi va kelajak kunlar uchun mavjud qilish
        isAvailable = true;
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
    if (endHour >= 23 && endMin > 0) { // Agar soat 23:00 dan katta bo'lsa yoki 23:00 ga teng bo'lib daqiqa bor bo'lsa
      alert('Tugash vaqti 23:00 dan oshmasligi kerak!');
      return;
    }
    // Agar to'xtovsiz 23:00 ga teng bo'lsa ham, uni ham tekshirish (masalan, 22:30 + 1 soat = 23:30)
    if (totalEndMinutes > 23 * 60) {
        alert('Tugash vaqti 23:00 dan oshmasligi kerak!');
        return;
    }


    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;

    setSelectedTime(tempStartTime);
    setSelectedEndTime(endTimeStr);
    setShowDurationModal(false);
  };

  const handleBooking = () => {
    // Telefon raqam validatsiyasi
    const phoneNumbers = clientPhone.replace(/\s/g, '');
    const validOperatorCodes = ['90', '91', '93', '94', '95', '97', '98', '99'];
    const operatorCode = phoneNumbers.substring(0, 2);

    const isValidPhone = phoneNumbers.length === 9 && validOperatorCodes.includes(operatorCode);

    if (selectedDate && selectedTime && selectedEndTime && clientName.trim() && isValidPhone) {
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
      } else if (phoneNumbers.length !== 9) {
        alert('Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak!');
      } else if (!validOperatorCodes.includes(operatorCode)) {
        alert(`Noto'g'ri operator kodi! Foydalaning: ${validOperatorCodes.join(', ')}`);
      }
    }
  };

  const handleMenuItemToggle = (item: any) => {
    setSelectedMenuItems(prev => {
      const exists = prev.find(selected => selected.id === item.id);
      if (exists) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateMenuItemQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setSelectedMenuItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setSelectedMenuItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    const menuTotal = selectedMenuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const packageTotal = selectedPricing ? selectedPricing.price * guestCount : 0;
    return menuTotal + packageTotal;
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="p-3 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Vaqt Band Qilish</h2>
                  <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Kerakli sana va vaqtni tanlang</p>
                </div>
              </div>
              <button
                onClick={() => setShowPricingModal(true)}
                className="absolute top-0 right-0 sm:static flex items-center justify-center space-x-2 px-2 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium text-sm shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Narxlar va Ovqatlar</span>
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-6">
            {/* Calendar Grid */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                {/* Desktop layout - month with year on left */}
                <h3 className="hidden sm:block text-lg sm:text-xl font-bold text-gray-900 text-center sm:text-left">
                  {(() => {
                    const months = [
                      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
                      'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
                    ];
                    const monthIndex = currentDate.getMonth();
                    const year = currentDate.getFullYear();
                    return `${months[monthIndex]} ${year}`;
                  })()}
                </h3>

                {/* Mobile layout - navigation with month in center */}
                <div className="flex sm:hidden items-center justify-between w-full space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Oldingi
                  </button>
                  <h3 className="text-lg font-bold text-gray-900 text-center flex-1">
                    {(() => {
                      const months = [
                        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
                        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
                      ];
                      const monthIndex = currentDate.getMonth();
                      return months[monthIndex];
                    })()}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Keyingi
                  </button>
                </div>

                {/* Desktop navigation buttons */}
                <div className="hidden sm:flex justify-center sm:justify-start space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Oldingi
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Keyingi →
                  </button>
                </div>

                <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    <span>Mavjud</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                    <span>Band</span>
                  </div>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
                {['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'].map(day => (
                  <div key={day} className="p-1.5 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
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
                        } else if (day.isCurrentMonth && !day.available) {
                          // Band qilingan kunni bosganda tafsilotlarni ko'rsatish
                          const dayBookings = bookedTimeSlots.filter(slot => slot.date === day.fullDate);
                          if (dayBookings.length > 0) {
                            setSelectedBookingDetails(dayBookings[0]);
                            setShowBookingDetailsModal(true);
                          } else {
                            // Agar rezervatsiya ma'lumotlari yo'q bo'lsa, demo ma'lumot yaratish
                            const demoBooking = {
                              id: 'demo-' + day.fullDate,
                              date: day.fullDate,
                              time: '14:00',
                              endTime: '18:00',
                              clientName: 'Band qilingan kun',
                              clientPhone: '+998 -- --- -- --',
                              duration: '4 soat',
                              price: 1200
                            };
                            setSelectedBookingDetails(demoBooking);
                            setShowBookingDetailsModal(true);
                          }
                        }
                      }}
                      disabled={false} // Har doim bosilishi mumkin
                      className={`
                        min-h-12 sm:min-h-16 p-1 sm:p-2 rounded-md sm:rounded-lg border transition-all relative
                        ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                        ${isToday ? 'ring-1 sm:ring-2 ring-blue-500' : ''}
                        ${isSelected ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}
                        ${day.available && day.isCurrentMonth
                          ? 'hover:bg-green-50 hover:border-green-300 cursor-pointer hover:shadow-md'
                          : day.isCurrentMonth && !day.available
                            ? 'hover:bg-red-100 hover:border-red-300 cursor-pointer hover:shadow-md'
                            : 'cursor-not-allowed'
                        }
                        ${!day.available && day.isCurrentMonth ? 'bg-red-50 border-red-200' : ''}
                      `}
                    >
                      <div className="text-xs sm:text-sm font-medium">{day.date}</div>
                      {day.isCurrentMonth && (
                        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1">
                          {day.available ? (
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                          ) : (
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
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



        {/* Pricing and Menu Modal */}
        {showPricingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white w-full h-full sm:h-auto sm:max-w-7xl sm:rounded-xl shadow-2xl sm:max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center">
                    <ChefHat className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-green-600 flex-shrink-0" />
                    <span className="truncate">Narxlar va Ovqatlar</span>
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">To'y paketini tanlang va ovqatlarni hisoblang</p>
                </div>
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Left side - Packages */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                      To'y Paketlari
                    </h4>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mehmonlar Soni
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={guestCount}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Faqat raqamlarni qabul qilish va bo'sh stringni oldini olish
                          if (value === '' || /^\d+$/.test(value)) {
                            const numValue = value === '' ? 10 : Number(value);
                            // Minimum 10, maksimum 1000
                            if (numValue >= 10 && numValue <= 1000) {
                              setGuestCount(numValue);
                            } else if (numValue < 10 && value !== '') {
                              setGuestCount(10);
                            } else if (numValue > 1000) {
                              setGuestCount(1000);
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          // Faqat raqamlar va maxsus tugmalarni ruxsat berish
                          const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                          if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Minimum 10, maksimum 1000 kishi
                      </p>
                    </div>

                    <div className="space-y-3">
                      {pricingPackages.map(pkg => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPricing(pkg)}
                          className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPricing?.id === pkg.id
                              ? 'border-blue-500 bg-blue-50'
                              : pkg.color + ' hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-gray-900 text-sm sm:text-base">{pkg.name}</h5>
                            <div className="text-right">
                              <div className="font-bold text-lg text-blue-600">${pkg.price}</div>
                              <div className="text-xs text-gray-600">per person</div>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{pkg.description}</p>
                          <div className="space-y-1">
                            {pkg.includes.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="flex items-center text-xs text-gray-700">
                                <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                            {pkg.includes.length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{pkg.includes.length - 3} ko'proq
                              </div>
                            )}
                          </div>
                          {selectedPricing?.id === pkg.id && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="font-bold text-green-600">
                                Jami: ${pkg.price * guestCount}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle - Menu */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center">
                      <Utensils className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                      Qo'shimcha Ovqatlar
                    </h4>

                    <div className="space-y-3">
                      {menuCategories.map(category => {
                        const isExpanded = expandedCategory === category.id;

                        return (
                          <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            {/* Category Header - Clickable */}
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? '' : category.id)}
                              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 text-sm">{category.name}</span>
                                <span className="text-xs text-gray-500">({category.items.length} mahsulot)</span>
                              </div>
                              <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>

                            {/* Category Items - Collapsible */}
                            {isExpanded && (
                              <div className="p-3 bg-white border-t border-gray-100">
                                <div className="space-y-2">
                                  {category.items.map(item => {
                                    const selected = selectedMenuItems.find(selected => selected.id === item.id);
                                    return (
                                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
                                        <div className="flex-1">
                                          <div className="text-xs font-medium text-gray-900">{item.name}</div>
                                          <div className="text-xs text-gray-600">${item.price}</div>
                                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                                        </div>
                                        <div className="flex items-center space-x-1 ml-2">
                                          {selected ? (
                                            <>
                                              <button
                                                onClick={() => updateMenuItemQuantity(item.id, selected.quantity - 1)}
                                                className="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600 flex items-center justify-center"
                                              >
                                                -
                                              </button>
                                              <span className="w-8 text-center text-xs font-medium">{selected.quantity}</span>
                                              <button
                                                onClick={() => updateMenuItemQuantity(item.id, selected.quantity + 1)}
                                                className="w-6 h-6 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center justify-center"
                                              >
                                                +
                                              </button>
                                            </>
                                          ) : (
                                            <button
                                              onClick={() => handleMenuItemToggle(item)}
                                              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                                            >
                                              Qo'shish
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right - Summary */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                      Hisob-Kitob
                    </h4>

                    <div className="bg-white border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mehmonlar:</span>
                        <span className="font-medium">{guestCount} kishi</span>
                      </div>

                      {selectedPricing && (
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{selectedPricing.name}</span>
                            <span className="font-bold text-blue-600">
                              ${selectedPricing.price * guestCount}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            ${selectedPricing.price} × {guestCount} kishi
                          </div>
                        </div>
                      )}

                      {selectedMenuItems.length > 0 && (
                        <div className="border-t pt-3">
                          <div className="text-sm font-medium mb-2">Qo'shimcha Ovqatlar:</div>
                          {selectedMenuItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-xs mb-1">
                              <span>{item.name} × {item.quantity}</span>
                              <span>${item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">Jami:</span>
                          <span className="font-bold text-xl text-green-600">
                            ${calculateTotal()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          alert(`Hisob-kitob:\nMehmonlar: ${guestCount}\nJami summa: $${calculateTotal()}`);
                        }}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Hisob-kitobni Saqlash
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-end space-x-2 sm:space-x-3 sticky bottom-0 sm:static">
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}

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
                            // 22:00 gacha barcha vaqtlarni ko'rsatish (8:00 dan 22:00 gacha)
                            if (hour > 22) return null;

                            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                            const dayData = getSelectedDayAvailability();

                            // Band qilingan vaqtni tekshirish - vaqt oralig'i ichida yotganini tekshirish
                            const bookedSlot = bookedTimeSlots.find(slot => {
                              if (slot.date !== selectedDate) return false;

                              // Hozirgi vaqt slot time va endTime oralig'ida yotadimi?
                              const slotStartMinutes = parseInt(slot.time.split(':')[0]) * 60 + parseInt(slot.time.split(':')[1]);
                              const slotEndMinutes = parseInt(slot.endTime.split(':')[0]) * 60 + parseInt(slot.endTime.split(':')[1]);
                              const checkTimeMinutes = hour * 60;

                              // Agar hozirgi vaqt band qilingan oraliq ichida bo'lsa
                              return checkTimeMinutes >= slotStartMinutes && checkTimeMinutes < slotEndMinutes;
                            });

                            const isBooked = dayData?.timeSlots.some(slot =>
                              slot.time === timeStr && slot.booked
                            ) || !!bookedSlot;

                            return (
                              <button
                                key={hour}
                                onClick={() => {
                                  if (bookedSlot) {
                                    // Band qilingan vaqtni bosganida tafsilotlarni ko'rsatish
                                    setSelectedBookingDetails(bookedSlot);
                                    setShowBookingDetailsModal(true);
                                  } else if (!isBooked) {
                                    handleTimeClick(timeStr);
                                  }
                                }}
                                className={`
                                  px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all border-2 relative
                                  ${bookedSlot
                                    ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200 cursor-pointer'
                                    : isBooked
                                      ? 'bg-red-100 text-red-600 border-red-300 cursor-not-allowed'
                                      : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400'
                                  }
                                `}
                              >
                                {timeStr}
                                {bookedSlot && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
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
                            <span className="text-gray-700">Band</span>
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

                        <div className="space-y-4 sm:space-y-6">
                          <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {/* Soat tanlash */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Soat
                              </label>
                              <div className="relative">
                                <select
                                  value={selectedHours}
                                  onChange={(e) => setSelectedHours(Number(e.target.value))}
                                  className="w-full px-3 py-3 text-lg font-mono border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                                >
                                  {(() => {
                                    const [startHour] = tempStartTime.split(':').map(Number);
                                    const maxWorkHour = 23; // Ish vaqti 23:00 gacha
                                    const maxPossibleHours = maxWorkHour - startHour; // Ish vaqti doirasida qolgan soatlar
                                    const availableHours = Math.min(8, maxPossibleHours); // Maksimum 8 soat yoki ish vaqti oxirigacha

                                    return Array.from({ length: availableHours }, (_, i) => i + 1).map(hour => (
                                      <option key={hour} value={hour}>
                                        {hour.toString().padStart(2, '0')}
                                      </option>
                                    ));
                                  })()}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Daqiqa tanlash */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Daqiqa
                              </label>
                              <div className="relative">
                                <select
                                  value={selectedMinutes}
                                  onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                                  className="w-full px-3 py-3 text-lg font-mono border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                                >
                                  {(() => {
                                    const [startHour, startMin] = tempStartTime.split(':').map(Number);
                                    const startTotalMinutes = startHour * 60 + startMin;
                                    const maxWorkMinutes = 23 * 60; // 23:00 = 1380 daqiqa
                                    const availableMinutes = [0, 15, 30, 45];

                                    // Mavjud daqiqalarni filtrlash
                                    const filteredMinutes = availableMinutes.filter(minute => {
                                      const totalDuration = selectedHours * 60 + minute;
                                      const endTime = startTotalMinutes + totalDuration;
                                      return endTime <= maxWorkMinutes;
                                    });

                                    // Agar hozirgi tanlangan daqiqa mavjud emas bo'lsa, birinchi mavjud daqiqani tanlash
                                    if (filteredMinutes.length > 0 && !filteredMinutes.includes(selectedMinutes)) {
                                      // State ni o'zgartirish uchun setTimeout ishlatamiz
                                      setTimeout(() => {
                                        setSelectedMinutes(filteredMinutes[0]);
                                      }, 0);
                                    }

                                    return filteredMinutes.map(minute => (
                                      <option key={minute} value={minute}>
                                        {minute.toString().padStart(2, '0')}
                                      </option>
                                    ));
                                  })()}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
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
                            let value = e.target.value.replace(/[^\d\s]/g, '');
                            const numbersOnly = value.replace(/\s/g, '');

                            // Maksimum 9 ta raqam
                            if (numbersOnly.length <= 9) {
                              // Avtomatik formatlash: XX XXX XX XX
                              if (numbersOnly.length >= 2) {
                                value = numbersOnly.substring(0, 2);
                                if (numbersOnly.length >= 3) {
                                  value += ' ' + numbersOnly.substring(2, 5);
                                }
                                if (numbersOnly.length >= 6) {
                                  value += ' ' + numbersOnly.substring(5, 7);
                                }
                                if (numbersOnly.length >= 8) {
                                  value += ' ' + numbersOnly.substring(7, 9);
                                }
                              } else {
                                value = numbersOnly;
                              }
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
                      <div className="mt-1 text-xs text-gray-500">
                        <p>Operator kodlari: 90, 91, 93, 94, 95, 97, 98, 99</p>
                        <p>Format: 90 123 45 67</p>
                      </div>
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

        {/* Booking Details Modal - Qayta tartibga solingan */}
        {showBookingDetailsModal && selectedBookingDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white w-full h-full sm:h-auto sm:max-w-5xl sm:rounded-xl shadow-2xl sm:max-h-[95vh] overflow-y-auto">
              {/* Modal Header - Sticky */}
              <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                    <span className="truncate text-sm sm:text-base">To'yxona Band Qilish Ma'lumotlari</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block">
                    {new Date(selectedBookingDetails.date).toLocaleDateString('uz-UZ', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })} - Batafsil Ma'lumotlar
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowBookingDetailsModal(false);
                    setSelectedBookingDetails(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-lg sm:text-2xl p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-3 sm:p-6">
                <div className="space-y-4 sm:space-y-5">

                  {/* 1. ENG MUHIM - Vaqt va Buyurtmachi Ma'lumotlari */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 sm:p-6 border-2 border-blue-200 shadow-md">
                    <div className="text-center mb-4">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        🎉 {selectedBookingDetails.clientName}
                      </h4>
                      <div className="text-sm text-gray-600 mb-3">
                        📞 {selectedBookingDetails.clientPhone}
                      </div>
                    </div>

                    {/* Vaqt kartasi */}
                    <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-green-600 font-medium mb-1">📅 SANA</div>
                          <div className="font-bold text-green-900">
                            {new Date(selectedBookingDetails.date).toLocaleDateString('uz-UZ', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="text-xs text-blue-600 font-medium mb-1">⏰ VAQT</div>
                          <div className="font-bold text-blue-900 text-sm sm:text-base">
                            {selectedBookingDetails.time} - {selectedBookingDetails.endTime}
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <div className="text-xs text-purple-600 font-medium mb-1">⏱️ DAVOMIYLIK</div>
                          <div className="font-bold text-purple-900">{selectedBookingDetails.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Nima uchun band qilgan */}
                    <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-600 mb-2">🎯 NIMA UCHUN BAND QILGAN</div>
                        <div className="font-bold text-gray-900 text-sm sm:text-lg">
                          {selectedBookingDetails.id.includes('demo') ? 
                            '👰‍♀️ To\'y Marosimi va Katta Ziyofat' : 
                            selectedBookingDetails.clientName === 'Alijon Valiev' ? '💒 Nikoh To\'yi va Osh Berish' :
                            selectedBookingDetails.clientName === 'Dilfuza Karimova' ? '🎂 Tug\'ilgan Kun Nishonlash' :
                            selectedBookingDetails.clientName === 'Rustamjon Akbarov' ? '🏠 Oilaviy Bayram va Mehmonlar' :
                            '🎉 To\'y Marosimi'
                          }
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          👥 {selectedBookingDetails.id.includes('demo') ? 
                            '150-200 mehmon kutilmoqda' :
                            selectedBookingDetails.clientName === 'Alijon Valiev' ? '120 mehmon (nikoh marosimi)' :
                            selectedBookingDetails.clientName === 'Dilfuza Karimova' ? '80 mehmon (yubiley)' :
                            selectedBookingDetails.clientName === 'Rustamjon Akbarov' ? '150 mehmon (oilaviy bayram)' :
                            '100-150 mehmon'
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. SHU KUNDAGI BARCHA VAQTLAR - Eng kerakli */}
                  <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-md">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-center text-base sm:text-lg">
                      📊 {new Date(selectedBookingDetails.date).toLocaleDateString('uz-UZ', {
                        day: 'numeric',
                        month: 'long'
                      })} - Kunlik Vaqt Jadvali
                    </h4>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-xs sm:text-sm text-center text-gray-600">
                        🏢 To'yxona ish vaqti: 08:00 - 23:00 | Har bir soatning holati:
                      </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                      {Array.from({ length: 15 }, (_, i) => {
                        const hour = i + 8;
                        const timeStr = `${hour.toString().padStart(2, '0')}:00`;

                        const isCurrentBookingHour = (() => {
                          const [startHour] = selectedBookingDetails.time.split(':').map(Number);
                          const [endHour] = selectedBookingDetails.endTime.split(':').map(Number);
                          return hour >= startHour && hour < endHour;
                        })();

                        const otherBooking = bookedTimeSlots.find(slot => {
                          if (slot.date !== selectedBookingDetails.date || slot.id === selectedBookingDetails.id) return false;
                          const [startHour] = slot.time.split(':').map(Number);
                          const [endHour] = slot.endTime.split(':').map(Number);
                          return hour >= startHour && hour < endHour;
                        });

                        const hourStatus = isCurrentBookingHour ? 'current' : 
                                         otherBooking ? 'other' : 'available';

                        return (
                          <div 
                            key={hour}
                            className={`rounded-lg p-2 text-center border-2 transition-all cursor-pointer hover:shadow-md min-h-20 flex flex-col justify-center ${
                              hourStatus === 'current' ? 'bg-blue-100 border-blue-400 shadow-sm' :
                              hourStatus === 'other' ? 'bg-red-100 border-red-400 shadow-sm' :
                              'bg-green-50 border-green-300 hover:bg-green-100'
                            }`}
                            onClick={() => {
                              if (hourStatus === 'other' && otherBooking) {
                                setSelectedBookingDetails(otherBooking);
                              } else if (hourStatus === 'available') {
                                alert(`✅ ${timeStr} vaqti mavjud!\n\n📝 Bu vaqtni band qilish uchun asosiy sahifadagi kalendarga o'ting va buyurtma bering.`);
                              }
                            }}
                          >
                            <div className={`text-sm font-bold mb-1 ${
                              hourStatus === 'current' ? 'text-blue-800' :
                              hourStatus === 'other' ? 'text-red-800' :
                              'text-green-800'
                            }`}>
                              {timeStr}
                            </div>

                            {hourStatus === 'current' && (
                              <>
                                <div className="text-xs text-blue-700 font-medium">👤 {selectedBookingDetails.clientName.split(' ')[0]}</div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto"></div>
                              </>
                            )}

                            {hourStatus === 'other' && otherBooking && (
                              <>
                                <div className="text-xs text-red-700 font-medium">👤 {otherBooking.clientName.split(' ')[0]}</div>
                                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
                                <div className="text-xs text-red-600 font-medium mt-1">👆 Ko'rish</div>
                              </>
                            )}

                            {hourStatus === 'available' && (
                              <>
                                <div className="text-xs text-green-700 font-medium">✅ Mavjud</div>
                                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Ranglar ma'nosi */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">🔵 Shu buyurtma</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">🔴 Boshqa buyurtma</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">🟢 Bo'sh vaqt</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. TADBIR TAFSILOTLARI */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tadbir ma'lumotlari */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h5 className="font-bold text-purple-900 mb-3 flex items-center text-sm">
                        🎊 Tadbir Tafsilotlari
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <div className="text-xs font-medium text-purple-700 mb-1">📋 Tadbir Turi:</div>
                          <div className="font-semibold text-purple-900 text-sm">
                            {selectedBookingDetails.id.includes('demo') ? 
                              'To\'y marosimi va katta ziyofat' : 
                              selectedBookingDetails.clientName === 'Alijon Valiev' ? 'Nikoh to\'yi va milliy osh berish' :
                              selectedBookingDetails.clientName === 'Dilfuza Karimova' ? 'Tug\'ilgan kun va oilaviy yig\'ilish' :
                              selectedBookingDetails.clientName === 'Rustamjon Akbarov' ? 'Oilaviy bayram va mehmonlar qabuli' :
                              'To\'y marosimi'
                            }
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <div className="text-xs font-medium text-purple-700 mb-2">✨ Maxsus Talablar:</div>
                          <div className="text-xs text-purple-700 space-y-1">
                            {(() => {
                              let requirements = '';
                              if (selectedBookingDetails.id.includes('demo')) {
                                requirements = '🌸 Milliy bezatish va gul kompozitsiyalari|🍽️ Maxsus ovqatlar va ananaviy taomlar|🎵 Jonli musiqa va raqs dasturi';
                              } else if (selectedBookingDetails.clientName === 'Alijon Valiev') {
                                requirements = '💒 Nikoh marosimi uchun maxsus bezatish|🍚 Milliy osh va ananaviy taomlar|👨‍👩‍👧‍👦 Oilaviy yig\'ilish uchun tinch muhit';
                              } else if (selectedBookingDetails.clientName === 'Dilfuza Karimova') {
                                requirements = '🎂 Tug\'ilgan kun uchun maxsus dekoratsiya|🧁 Shirinliklar va tort|👨‍👩‍👧‍👦 Oilaviy atmosfera';
                              } else if (selectedBookingDetails.clientName === 'Rustamjon Akbarov') {
                                requirements = '🏠 Oilaviy bayram uchun qulay joylashtirish|🍽️ Katta ovqat uchun maxsus stol bezatish|👥 Mehmonlar uchun qulayliklar';
                              } else {
                                requirements = '🌸 Milliy an\'analar bo\'yicha bezatish|🍽️ Maxsus ovqatlar va taomlar';
                              }

                              return requirements.split('|').map((item, idx) => (
                                <div key={idx} className="mb-1 text-xs">{item}</div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tizim ma'lumotlari */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center text-sm">
                        📋 Tizim Ma'lumotlari
                      </h5>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">👤 Buyurtmachi:</span>
                          <span className="font-semibold text-gray-900">{selectedBookingDetails.clientName}</span>
                        </div>
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">🆔 ID:</span>
                          <span className="font-mono text-xs">{selectedBookingDetails.id}</span>
                        </div>
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">📱 Telefon:</span>
                          <span className="font-medium text-blue-600">{selectedBookingDetails.clientPhone}</span>
                        </div>
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">⏰ Vaqt:</span>
                          <span className="font-bold text-red-600">{selectedBookingDetails.time} - {selectedBookingDetails.endTime}</span>
                        </div>
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">✅ Holati:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Tasdiqlangan ✓
                          </span>
                        </div>
                        <div className="flex justify-between bg-white rounded p-2 border border-gray-100">
                          <span className="font-medium text-gray-600">📅 Yaratilgan:</span>
                          <span className="text-xs">{new Date().toLocaleDateString('uz-UZ')} {new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. AMALLAR - Foydalanuvchi uchun foydali */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                    <h5 className="font-bold text-orange-900 mb-3 text-center">🚀 Mumkin Bo'lgan Amallar</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      <div className="bg-white rounded-lg p-3 border border-yellow-200">
                        <div className="text-2xl mb-2">📞</div>
                        <div className="text-xs font-medium text-gray-700">Buyurtmachi bilan bog'lanish</div>
                        <div className="text-xs text-gray-500 mt-1">{selectedBookingDetails.clientPhone}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200 cursor-pointer hover:bg-green-50 transition-colors"
                           onClick={() => setShowBookingModal(true)}>
                        <div className="text-2xl mb-2">➕</div>
                        <div className="text-xs font-medium text-gray-700">Yangi buyurtma berish</div>
                        <div className="text-xs text-gray-500 mt-1">Bo'sh vaqtlarni band qilish</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors"
                           onClick={() => setShowPricingModal(true)}>
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-xs font-medium text-gray-700">Narxlar va Ovqatlar</div>
                        <div className="text-xs text-gray-500 mt-1">To'y paketlari ko'rish</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer - Sticky */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-between items-center sticky bottom-0 z-20 shadow-lg sm:shadow-none">
                <div className="text-xs text-gray-600 sm:hidden">
                  ⏰ {selectedBookingDetails.time} - {selectedBookingDetails.endTime}
                </div>
                <div className="hidden sm:block text-sm text-gray-700">
                  📊 Band qilingan: {selectedBookingDetails.duration} | 👤 {selectedBookingDetails.clientName}
                </div>
                <button
                  onClick={() => {
                    setShowBookingDetailsModal(false);
                    setSelectedBookingDetails(null);
                  }}
                  className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  ✅ Yopish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};