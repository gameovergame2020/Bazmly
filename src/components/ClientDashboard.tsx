import React, { useState, useEffect } from 'react';
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
  const [guestCount, setGuestCount] = useState<number>(0);
  const [selectedPricing, setSelectedPricing] = useState<any>(null); // Will be set to default after pricingPackages is defined
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [expandedPackage, setExpandedPackage] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showSaveCalculationModal, setShowSaveCalculationModal] = useState<boolean>(false);


  const [storedBookings, setStoredBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('testBookings');
      if (saved && saved.trim() !== '' && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
      return [];
    } catch (error) {
      console.error('Error parsing stored bookings:', error);
      localStorage.removeItem('testBookings'); // Buzuk ma'lumotni tozalash
      return [];
    }
  });

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
  const defaultBookings: Booking[] = [
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

  // Default va saqlangan bookinglarni birlashtirish
  const bookedTimeSlots: Booking[] = [...defaultBookings, ...storedBookings];


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

  // Set default pricing package after component mounts
  useEffect(() => {
    if (!selectedPricing && pricingPackages.length > 0) {
      setSelectedPricing(pricingPackages[0]); // Default to "Asosiy To'y Paketi"
    }
  }, [selectedPricing]);

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

      // O'tgan kunlarni band qilamiz
      if (dateString < today) {
        days.push({
          date: day,
          isCurrentMonth: true,
          fullDate: dateString,
          available: false
        });
        continue;
      }

      // Barcha mavjud vaqt slotlari (8:00 dan 22:00 gacha)
      const allTimeSlots = Array.from({ length: 15 }, (_, i) => {
        const hour = i + 8;
        if (hour > 22) return null;
        return `${hour.toString().padStart(2, '0')}:00`;
      }).filter(Boolean);

      const dayBookings = bookedTimeSlots.filter(slot => slot.date === dateString);
      const bookedHours = new Set();

      dayBookings.forEach(booking => {
        const [startHour] = booking.time.split(':').map(Number);
        const [endHour, endMin] = booking.endTime.split(':').map(Number);

        for (let hour = startHour; hour < endHour || (hour === endHour && endMin > 0); hour++) {
          if (hour < endHour) {
            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
          } else if (hour === endHour && endMin > 0) {
            // Tugash soati qisman band (faqat daqiqalargacha)
            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
          }
        }
      });

      // Hozirgi tanlangan vaqt oralig'ini hisobga olish (faqat booking jarayonida)
      if (dateString === selectedDate && selectedTime && selectedEndTime) {
        const [selectedStartHour, selectedStartMin] = selectedTime.split(':').map(Number);
        const [selectedEndHour, selectedEndMin] = selectedEndTime.split(':').map(Number);

        const selectedStartMinutes = selectedStartHour * 60 + selectedStartMin;
        const selectedEndMinutes = selectedEndHour * 60 + selectedEndMin;

        // Faqat to'liq band qilinayotgan soatlarni qo'shish
        for (let hour = selectedStartHour; hour < selectedEndHour; hour++) {
          const hourStartMinutes = hour * 60;
          const hourEndMinutes = hour * 60 + 59;

          // Agar soat to'liq tanlangan oraliqda yotsa
          if (selectedStartMinutes <= hourStartMinutes && selectedEndMinutes > hourEndMinutes) {
            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
          }
          // Yoki boshlanish soati bo'lsa va to'liq soat tanlangan bo'lsa (00 daqiqadan boshlanib, keyingi soat 00 daqiqasigacha)
          else if (hour === selectedStartHour && selectedStartMin === 0 && selectedEndMinutes > hourEndMinutes) {
            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
          }
          // Yoki tugash soati bo'lsa va to'liq soat tanlangan bo'lsa
          else if (hour === selectedEndHour - 1 && selectedEndMin === 0 && selectedStartMinutes <= hourStartMinutes) {
            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
          }
        }

        // Tugash soatini ham tekshirish - faqat to'liq soat band qilingan holatda
        if (selectedEndMin === 0 && selectedEndHour > selectedStartHour) {
          const endHour = selectedEndHour - 1;
          const endHourStartMinutes = endHour * 60;
          if (selectedStartMinutes <= endHourStartMinutes) {
            bookedHours.add(`${endHour.toString().padStart(2, '0')}:00`);
          }
        }
      }

      // Availability ma'lumotlaridan ham band qilingan vaqtlarni olish
      const dayAvailability = availability.find(a => a.date === dateString);
      if (dayAvailability?.timeSlots) {
        dayAvailability.timeSlots.forEach(slot => {
          if (slot.booked || !slot.available) {
            bookedHours.add(slot.time);
          }
        });
      }

      // Agar barcha vaqt slotlari band bo'lsa, kun to'liq band
      // Aks holda qisman mavjud hisoblanadi
      const isFullyBooked = allTimeSlots.every(time => bookedHours.has(time));
      const hasAnyAvailableSlot = allTimeSlots.some(time => !bookedHours.has(time));

      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: dateString,
        available: hasAnyAvailableSlot, // Agar kamida bitta slot mavjud bo'lsa, kun mavjud
        partiallyBooked: bookedHours.size > 0 && !isFullyBooked // Qisman band qilingan
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

    // 15 daqiqadan 8 soatgacha - qisqa vaqt oraliqlarini ham qo'llab-quvvatlash
    for (let minutes = 15; minutes <= 480; minutes += 15) {
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
    if (endHour >= 23 && endMin > 0) {
      alert('Tugash vaqti 23:00 dan oshmasligi kerak!');
      return;
    }
    if (totalEndMinutes > 23 * 60) {
        alert('Tugash vaqti 23:00 dan oshmasligi kerak!');
        return;
    }

    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;

    // Tanlangan vaqt oralig'ini saqlash
    setSelectedTime(tempStartTime);
    setSelectedEndTime(endTimeStr);
    setShowDurationModal(false);
    setTempStartTime(''); // Temp vaqtni tozalash
  };

  const handleBooking = () => {
    // Telefon raqam validatsiyasi
    const phoneNumbers = clientPhone.replace(/\s/g, '');
    const validOperatorCodes = ['90', '91', '93', '94', '95', '97', '98', '99'];
    const operatorCode = phoneNumbers.substring(0, 2);

    const isValidPhone = phoneNumbers.length === 9 && validOperatorCodes.includes(operatorCode);

    if (selectedDate && selectedTime && selectedEndTime && clientName.trim() && isValidPhone) {
      // Tasdiqlash modalini ko'rsatish
      setShowConfirmationModal(true);
    } else {
      if (!selectedDate) {
        alert('Iltimos sana tanlang!');
      } else if (!selectedTime || !selectedEndTime) {
        alert('Iltimos vaqt oralig\'ini tanlang!');
      } else if (!clientName.trim()) {
        alert('Iltimos ism familiyangizni kiriting!');
      } else if (!isValidPhone) {
        if (phoneNumbers.length !== 9) {
          alert('Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak!');
        } else {
          alert(`Noto'g'ri operator kodi! Foydalaning: ${validOperatorCodes.join(', ')}`);
        }
      }
    }
  };

  const confirmBooking = () => {
    const formattedPhone = `+998 ${clientPhone}`;

    // Yangi booking yaratish
    const [startHour, startMin] = selectedTime.split(':').map(Number);
    const [endHour, endMin] = selectedEndTime.split(':').map(Number);
    const durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationStr = hours > 0 && minutes > 0
      ? `${hours} soat ${minutes} daqiqa`
      : hours > 0
        ? `${hours} soat`
        : `${minutes} daqiqa`;

    const hourlyRate = startHour >= 18 ? 400 : startHour >= 10 ? 300 : 200;
    const totalPrice = Math.ceil(durationMinutes / 60) * hourlyRate;

    const newBooking: Booking = {
      id: 'test-' + Date.now(),
      date: selectedDate,
      time: selectedTime,
      endTime: selectedEndTime,
      clientName: clientName.trim(),
      clientPhone: formattedPhone,
      duration: durationStr,
      price: totalPrice
    };

    // Yangi bookingni saqlash
    const updatedBookings = [...storedBookings, newBooking];
    setStoredBookings(updatedBookings);
    localStorage.setItem('testBookings', JSON.stringify(updatedBookings));

    // Band qilishdan so'ng barcha ma'lumotlarni tozalash
    setSelectedTime('');
    setSelectedEndTime('');
    setShowTimeRangeSelector(false);
    setTempStartTime('');
    setClientName('');
    setClientPhone('');
    setShowBookingModal(false);
    setShowConfirmationModal(false);
    setSelectedDate(''); // Sanani ham tozalash

    // Alert ogohlantirish olib tashlandi - foydalanuvchi muvaffaqiyatli booking qilganini modal orqali ko'radi
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
                <h3 className="hidden sm:block text-lg sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
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

                <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    <span>Mavjud</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="flex space-x-0.5">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span>Qisman</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                    <span>To'liq band</span>
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

                  // Band qilingan vaqtlarni hisoblash
                  const dayBookings = bookedTimeSlots.filter(slot => slot.date === day.fullDate);
                  const bookedHours = new Set();

                  dayBookings.forEach(booking => {
                    const [startHour] = booking.time.split(':').map(Number);
                    const [endHour, endMin] = booking.endTime.split(':').map(Number);

                    // Band qilingan vaqt oralig'idagi soatlarni qo'shish
                    // Tugash vaqti faqat daqiqa 0 bo'lgan holatda band hisoblanadi
                    for (let hour = startHour; hour < endHour || (hour === endHour && endMin > 0); hour++) {
                      if (hour < endHour) {
                        bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                      } else if (hour === endHour && endMin > 0) {
                        // Tugash soati qisman band (faqat daqiqalargacha)
                        bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                      }
                    }
                  });

                  const isPartiallyBooked = day.partiallyBooked || bookedHours.size > 0;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (day.isCurrentMonth) {
                          setSelectedDate(day.fullDate);
                          setSelectedTime('');
                          setSelectedEndTime('');
                          setShowBookingModal(true);
                        }
                      }}
                      className={`
                        min-h-12 sm:min-h-16 p-1 sm:p-2 rounded-md sm:rounded-lg border transition-all relative
                        ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                        ${isToday ? 'ring-1 sm:ring-2 ring-blue-500' : ''}
                        ${isSelected ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}
                        ${day.available && day.isCurrentMonth
                          ? isPartiallyBooked
                            ? 'hover:bg-yellow-50 hover:border-yellow-300 cursor-pointer hover:shadow-md bg-yellow-25 border-yellow-200'
                            : 'hover:bg-green-50 hover:border-green-300 cursor-pointer hover:shadow-md'
                          : day.isCurrentMonth && !day.available
                            ? 'hover:bg-red-100 hover:border-red-300 cursor-pointer hover:shadow-md bg-red-50 border-red-200'
                            : 'cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="text-xs sm:text-sm font-medium">{day.date}</div>
                      {day.isCurrentMonth && (
                        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex space-x-0.5">
                          {day.available ? (
                            isPartiallyBooked ? (
                              <>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                              </>
                            ) : (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                            )
                          ) : (
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                          )}
                        </div>
                      )}
                      {/* Qisman band qilingan kunlar uchun qo'shimcha indikator */}
                      {isPartiallyBooked && day.available && day.isCurrentMonth && (
                        <div className="absolute bottom-0.5 left-0.5 text-xs font-bold text-yellow-600">
                          {bookedHours.size}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>



        {/* Pricing and Menu Modal */}
        {showPricingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-2 sm:p-4">
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
                        Mehmonlar Soni *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={guestCount === 0 ? '' : guestCount}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Faqat raqamlarni qabul qilish
                          if (value === '' || /^\d+$/.test(value)) {
                            if (value === '') {
                              setGuestCount(0); // Bo'sh qoldirish majburiy maydon uchun
                            } else {
                              const numValue = Number(value);
                              // Minimum 1, maksimum 1000
                              if (numValue >= 1 && numValue <= 1000) {
                                setGuestCount(numValue);
                              } else if (numValue > 1000) {
                                setGuestCount(1000);
                              }
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
                        placeholder="Masalan: 50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Majburiy maydon. Minimum 1, maksimum 1000 kishi
                      </p>
                    </div>

                    <div className="space-y-3">
                      {pricingPackages.map(pkg => {
                        const isExpanded = expandedPackage === pkg.id;
                        const isSelected = selectedPricing?.id === pkg.id;

                        return (
                          <div
                            key={pkg.id}
                            className={`rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : pkg.color + ' hover:border-blue-300'
                            }`}
                          >
                            {/* Package Header - Always visible and clickable for selection */}
                            <div
                              onClick={() => {
                                // Toggle selection instead of expanding
                                setSelectedPricing(isSelected ? null : pkg);
                                // Also expand/collapse
                                setExpandedPackage(isExpanded ? '' : pkg.id);
                              }}
                              className="p-3 sm:p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h5 className={`font-bold text-sm sm:text-base ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>{pkg.name}</h5>
                                  {isSelected && (
                                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                  <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`font-bold text-lg ${isSelected ? 'text-blue-700' : 'text-blue-600'}`}>${pkg.price}</div>
                                  <div className="text-xs text-gray-600">per person</div>
                                </div>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">{pkg.description}</p>
                            </div>

                            {/* Package Details - Collapsible */}
                            {isExpanded && (
                              <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-200 bg-white bg-opacity-50">
                                <div className="space-y-2 mt-3">
                                  <h6 className="font-medium text-gray-800 text-sm">Paketga kiradigan xizmatlar:</h6>
                                  <div className="space-y-1">
                                    {pkg.includes.map((item, idx) => (
                                      <div key={idx} className="flex items-center text-xs text-gray-700">
                                        <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{item}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Price Summary - Only show when selected */}
                                  {isSelected && (
                                    <div className="pt-3 border-t border-gray-200">
                                      <div className={`font-bold text-center ${
                                        guestCount === 0 ? 'text-red-600' : 'text-green-600'
                                      }`}>
                                        Jami: ${guestCount === 0 ? 0 : pkg.price * guestCount}
                                      </div>
                                      <div className={`text-xs text-center ${
                                        guestCount === 0 ? 'text-red-600' : 'text-gray-600'
                                      }`}>
                                        {guestCount === 0
                                          ? 'Mehmonlar sonini kiriting!'
                                          : `$${pkg.price} × ${guestCount} kishi`
                                        }
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                        <span className={`font-medium ${
                          guestCount === 0 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {guestCount === 0 ? 'Kiriting!' : `${guestCount} kishi`}
                        </span>
                      </div>

                      {selectedPricing && (
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{selectedPricing.name}</span>
                            <span className="font-bold text-blue-600">
                              ${guestCount === 0 ? 0 : selectedPricing.price * guestCount}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {guestCount === 0
                              ? 'Mehmonlar soni belgilanmagan'
                              : `$${selectedPricing.price} × ${guestCount} kishi`
                            }
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
                          if (guestCount === 0) {
                            alert('Iltimos mehmonlar sonini kiriting!');
                            return;
                          }
                          setShowSaveCalculationModal(true);
                        }}
                        disabled={guestCount === 0}
                        className={`w-full py-2 rounded-lg transition-colors text-sm font-medium ${
                          guestCount === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
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
                    <span className="truncate">
                      {(() => {
                        if (!selectedDate) return "Vaqt va Ma'lumotlarni To'ldiring";

                        // Band qilingan vaqtlarni tekshirish
                        const allTimeSlots = Array.from({ length: 15 }, (_, i) => {
                          const hour = i + 8;
                          if (hour > 22) return null;
                          return `${hour.toString().padStart(2, '0')}:00`;
                        }).filter(Boolean);

                        const dayBookings = bookedTimeSlots.filter(slot => slot.date === selectedDate);
                        const bookedHours = new Set();

                        dayBookings.forEach(booking => {
                          const [startHour] = booking.time.split(':').map(Number);
                          const [endHour, endMin] = booking.endTime.split(':').map(Number);

                          for (let hour = startHour; hour < endHour || (hour === endHour && endMin > 0); hour++) {
                            if (hour < endHour) {
                              bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                            } else if (hour === endHour && endMin > 0) {
                              // Tugash soati qisman band (faqat daqiqalargacha)
                              bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                            }
                          }
                        });

                        const isFullyBooked = allTimeSlots.every(time => bookedHours.has(time));
                        const isPartiallyBooked = bookedHours.size > 0 && !isFullyBooked;

                        if (isFullyBooked) {
                          return "Band Qilingan Kun - Vaqt Tanlash";
                        } else if (isPartiallyBooked) {
                          return "Qisman Band Qilingan Kun - Vaqt Tanlash";
                        } else {
                          return "Vaqt va Ma'lumotlarni To'ldiring";
                        }
                      })()}
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">
                    {(() => {
                      if (!selectedDate) return "Kerakli vaqt va shaxsiy ma'lumotlaringizni kiriting";

                      // Band qilingan vaqtlarni tekshirish
                      const allTimeSlots = Array.from({ length: 15 }, (_, i) => {
                        const hour = i + 8;
                        if (hour > 22) return null;
                        return `${hour.toString().padStart(2, '0')}:00`;
                      }).filter(Boolean);

                      const dayBookings = bookedTimeSlots.filter(slot => slot.date === selectedDate);
                      const bookedHours = new Set();

                      dayBookings.forEach(booking => {
                        const [startHour] = booking.time.split(':').map(Number);
                        const [endHour, endMin] = booking.endTime.split(':').map(Number);

                        for (let hour = startHour; hour < endHour || (hour === endHour && endMin > 0); hour++) {
                          if (hour < endHour) {
                            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                          } else if (hour === endHour && endMin > 0) {
                            // Tugash soati qisman band (faqat daqiqalargacha)
                            bookedHours.add(`${hour.toString().padStart(2, '0')}:00`);
                          }
                        }
                      });

                      const isFullyBooked = allTimeSlots.every(time => bookedHours.has(time));
                      const isPartiallyBooked = bookedHours.size > 0 && !isFullyBooked;

                      if (isFullyBooked) {
                        return `${new Date(selectedDate).toLocaleDateString('uz-UZ', {
                          day: 'numeric',
                          month: 'long'
                        })} kuni to'liq band qilingan. Boshqa vaqtni tanlang.`;
                      } else if (isPartiallyBooked) {
                        return `${new Date(selectedDate).toLocaleDateString('uz-UZ', {
                          day: 'numeric',
                          month: 'long'
                        })} kuni qisman band qilingan. Mavjud vaqtlarni ko'ring.`;
                      } else {
                        return "Kerakli vaqt va shaxsiy ma'lumotlaringizni kiriting";
                      }
                    })()}
                  </p>
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

                            // Soat uchun band qilingan daqiqalarni hisoblash
                            const hourStartMinutes = hour * 60;
                            const hourEndMinutes = hour * 60 + 59;

                            let totalBookedMinutes = 0;

                            bookedTimeSlots.forEach(slot => {
                              if (slot.date !== selectedDate) return;

                              const [bookingStartHour, bookingStartMin] = slot.time.split(':').map(Number);
                              const [bookingEndHour, bookingEndMin] = slot.endTime.split(':').map(Number);
                              const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;
                              const bookingEndMinutes = bookingEndHour * 60 + bookingEndMin;

                              // Agar booking bu soatni qamrab olsa
                              if (bookingStartMinutes <= hourEndMinutes && bookingEndMinutes >= hourStartMinutes) {
                                const overlapStart = Math.max(hourStartMinutes, bookingStartMinutes);
                                const overlapEnd = Math.min(hourEndMinutes + 1, bookingEndMinutes); // +1 chunki soat 59 daqiqagacha
                                const overlapDuration = Math.max(0, overlapEnd - overlapStart);
                                totalBookedMinutes += overlapDuration;
                              }
                            });

                            // Qisman mavjud vaqtni tekshirish - soat ichida mavjud daqiqalar bormi?
                            const partiallyAvailable = totalBookedMinutes > 0 && totalBookedMinutes < 60 && bookedTimeSlots.find(slot => {
                              if (slot.date !== selectedDate) return false;

                              const [endHour, endMin] = slot.endTime.split(':').map(Number);
                              // Agar slot tugash vaqti hozirgi soat ichida bo'lsa va mavjud vaqt qolsa
                              return endHour === hour && endMin > 0;
                            });

                            const isBooked = totalBookedMinutes >= 60 || dayData?.timeSlots.some(slot =>
                              slot.time === timeStr && slot.booked
                            );

                            // Tanlangan vaqt oralig'ini tekshirish - butun tanlangan oraliqni ko'rsatish
                            const isInSelectedRange = selectedTime && selectedEndTime && (() => {
                              const [startHour] = selectedTime.split(':').map(Number);
                              const [endHour] = selectedEndTime.split(':').map(Number);

                              // Tanlangan vaqt oralig'idagi faqat band qilinayotgan soatlarni ko'rsatish
                              // Tugash vaqti alohida ko'rsatiladi
                              // Masalan: 08:00-09:00 tanlanganda faqat 08:00 to'liq ko'k, 09:00 tugash indikatori
                              return hour >= startHour && hour < endHour;
                            })();

                            // Vaqt tanlanmoqda holatini tekshirish (davomiylik modal ochiq va temp vaqt belgilangan)
                            const isBeingSelected = showDurationModal && tempStartTime === timeStr;

                            // Tugash vaqti indikatorini tekshirish
                            const isEndTimeIndicator = selectedTime && selectedEndTime && (() => {
                              const [endHour] = selectedEndTime.split(':').map(Number);
                              return hour === endHour;
                            })();

                            return (
                              <button
                                key={hour}
                                onClick={() => {
                                  if (!isBooked || partiallyAvailable) {
                                    if (partiallyAvailable) {
                                      // Qisman mavjud vaqt uchun boshlanish vaqtini tugash vaqtiga o'rnatish
                                      const availableTime = partiallyAvailable.endTime;
                                      handleTimeClick(availableTime);
                                    } else {
                                      handleTimeClick(timeStr);
                                    }
                                  }
                                }}
                                className={`
                                  px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all border-2 relative
                                  ${partiallyAvailable
                                    ? 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200 cursor-pointer'
                                    : isBooked
                                      ? 'bg-red-100 text-red-600 border-red-300 cursor-not-allowed'
                                      : isBeingSelected
                                        ? 'bg-yellow-200 text-yellow-800 border-yellow-400 shadow-lg ring-2 ring-yellow-300'
                                        : isEndTimeIndicator
                                          ? 'bg-blue-200 text-blue-800 border-blue-400 shadow-lg ring-2 ring-blue-300'
                                          : isInSelectedRange && !isEndTimeIndicator
                                            ? 'bg-blue-200 text-blue-800 border-blue-400 shadow-lg ring-2 ring-blue-300'
                                            : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400'
                                    }
                                `}
                              >
                                <div className="flex flex-col items-center">
                                  {timeStr}
                                  {partiallyAvailable && (
                                    <div className="text-xs text-orange-600 mt-1">
                                      {partiallyAvailable.endTime} dan
                                    </div>
                                  )}
                                </div>
                                {isBooked && !partiallyAvailable && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                                )}
                                {partiallyAvailable && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                                )}
                                {isBeingSelected && (
                                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                )}
                                {isInSelectedRange && (
                                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                )}
                                {/* Tanlangan oraliq tugashi indikatori */}
                                {selectedTime && selectedEndTime && (() => {
                                  const [endHour] = selectedEndTime.split(':').map(Number);
                                  return hour === endHour;
                                })() && (
                                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-300 rounded-full"></div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-3 sm:mt-4 text-xs sm:text-sm flex-wrap gap-1">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                            <span className="text-gray-700">Mavjud</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
                            <span className="text-gray-700">Qisman mavjud</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-700">Davomiylik tanlanmoqda</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-700">Band qilinayotgan</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-700">Tugash vaqti</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                            <span className="text-gray-700">Band</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vaqt ma'lumotlarini faqat kun to'liq band qilinmagan holatda ko'rsatish */}
                  {(() => {
                    // Band qilingan vaqtlarni tekshirish
                    const allTimeSlots = Array.from({ length: 15 }, (_, i) => {
                      const hour = i + 8;
                      if (hour > 22) return null;
                      return `${hour.toString().padStart(2, '0')}:00`;
                    }).filter(Boolean);

                    const dayBookings = bookedTimeSlots.filter(slot => slot.date === selectedDate);
                    const bookedHours = new Set();

                    // Har bir soat uchun band qilingan daqiqalarni tekshirish
                    for (let hour = 8; hour <= 22; hour++) {
                      const hourStr = `${hour.toString().padStart(2, '0')}:00`;
                      const hourStartMinutes = hour * 60;
                      const hourEndMinutes = hour * 60 + 59;

                      let coveredMinutes = 0;

                      dayBookings.forEach(booking => {
                        const [bookingStartHour, bookingStartMin] = booking.time.split(':').map(Number);
                        const [bookingEndHour, bookingEndMin] = booking.endTime.split(':').map(Number);
                        const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;
                        const bookingEndMinutes = bookingEndHour * 60 + bookingEndMin;

                        // Agar booking bu soatni qamrab olsa
                        if (bookingStartMinutes <= hourEndMinutes && bookingEndMinutes >= hourStartMinutes) {
                          const overlapStart = Math.max(hourStartMinutes, bookingStartMinutes);
                          const overlapEnd = Math.min(hourEndMinutes + 1, bookingEndMinutes); // +1 chunki soat 59 daqiqagacha
                          const overlapDuration = Math.max(0, overlapEnd - overlapStart);
                          coveredMinutes += overlapDuration;
                        }
                      });

                      // Agar soatning 60 daqiqasi to'liq yoki deyarli to'liq band bo'lsa
                      if (coveredMinutes >= 60) {
                        bookedHours.add(hourStr);
                      }
                    }

                    const isFullyBooked = allTimeSlots.every(time => bookedHours.has(time));

                    // To'liq band qilingan kunlar uchun hech narsa ko'rsatmaslik
                    if (isFullyBooked) {
                      return null;
                    }

                    // Qisman band yoki mavjud kunlar uchun forma ko'rsatish
                    return (
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                          <span className="text-gray-600 font-medium text-sm sm:text-base">Tanlangan vaqt oralig'i:</span>
                          <span className="font-bold text-base sm:text-xl text-blue-600">
                            {selectedTime && selectedEndTime
                              ? `${selectedTime} - ${selectedEndTime}`
                              : 'Vaqt oralig\'i tanlanmagan'}
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
                    );
                  })()}
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
                          {(() => {
                            // Mavjud vaqtni hisoblash
                            const [startHour, startMin] = tempStartTime.split(':').map(Number);
                            const startTotalMinutes = startHour * 60 + startMin;
                            const maxWorkMinutes = 23 * 60; // 23:00 = 1380 daqiqa

                            // Band qilingan vaqtlarni tekshirish
                            const dayBookings = bookedTimeSlots.filter(slot => slot.date === selectedDate);
                            let maxAvailableMinutes = maxWorkMinutes;

                            dayBookings.forEach(booking => {
                              const [bookingStartHour, bookingStartMin] = booking.time.split(':').map(Number);
                              const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;

                              // Agar booking boshlanish vaqtidan keyin boshlanayotgan bo'lsa
                              if (bookingStartMinutes > startTotalMinutes) {
                                maxAvailableMinutes = Math.min(maxAvailableMinutes, bookingStartMinutes);
                              }
                            });

                            // Mavjud vaqt daqiqalarda
                            const availableMinutes = maxAvailableMinutes - startTotalMinutes;
                            const isShortTimeSlot = availableMinutes < 60;

                            if (isShortTimeSlot) {
                              // Qisqa vaqt oralig'i - faqat daqiqalar, soat tanlovchisiz
                              // Soatni 0 ga o'rnatish va faqat daqiqalar bilan ishlash
                              if (selectedHours !== 0) {
                                setTimeout(() => {
                                  setSelectedHours(0);
                                }, 0);
                              }
                              
                              return (
                                <div className="w-full">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Davomiylik (daqiqa)
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={selectedMinutes}
                                      onChange={(e) => {
                                        setSelectedHours(0); // Soatni har doim 0 da ushlab turish
                                        setSelectedMinutes(Number(e.target.value));
                                      }}
                                      className="w-full px-3 py-3 text-lg font-mono border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                                    >
                                      {(() => {
                                        // Faqat mavjud daqiqalarni ko'rsatish (15 daqiqa intervallarda)
                                        const possibleMinutes = [];
                                        for (let minute = 15; minute <= availableMinutes && minute < 60; minute += 15) {
                                          possibleMinutes.push(minute);
                                        }
                                        
                                        // Agar hozirgi tanlangan daqiqa mavjud emas bo'lsa, birinchi mavjud daqiqani tanlash
                                        if (possibleMinutes.length > 0 && !possibleMinutes.includes(selectedMinutes)) {
                                          setTimeout(() => {
                                            setSelectedHours(0);
                                            setSelectedMinutes(possibleMinutes[0]);
                                          }, 0);
                                        }

                                        return possibleMinutes.map(minute => (
                                          <option key={minute} value={minute}>
                                            {minute} daqiqa
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
                                  <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    Mavjud vaqt: {availableMinutes} daqiqa
                                  </div>
                                  <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                    Qisqa vaqt oralig'i: Faqat daqiqalar tanlanadi
                                  </div>
                                </div>
                              );
                            } else {
                              // Uzun vaqt oralig'i - soat va daqiqalar
                              return (
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
                                          const maxHours = Math.min(8, Math.floor(availableMinutes / 60)); // Maksimum 8 soat
                                          return Array.from({ length: maxHours + 1 }, (_, i) => i).map(hour => (
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
                                          const availableTimeMinutes = availableMinutes;
                                          const standardMinutes = [0, 15, 30, 45];

                                          // Oddiy holat - soat tanlangan yoki yetarli vaqt mavjud
                                          const minimumMinutes = selectedHours === 0 ? 15 : 0;
                                          const validMinutes = selectedHours === 0 ? [15, 30, 45] : standardMinutes;

                                          const filteredMinutes = validMinutes.filter(minute => {
                                            const totalDuration = selectedHours * 60 + minute;
                                            const endTime = startTotalMinutes + totalDuration;
                                            return endTime <= maxAvailableMinutes && totalDuration >= minimumMinutes;
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
                              );
                            }
                          })()}
                        </div>

                        {/* Preview */}
                        <div className="mt-3 sm:mt-4 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                          <div className="text-center">
                            <div className="text-xs sm:text-sm text-green-600 mb-1">Tanlangan Vaqt Oralig'i</div>
                            <div className="text-base sm:text-lg font-bold text-green-800">
                              {tempStartTime} - {(() => {
                                const [startHour, startMin] = tempStartTime.split(':').map(Number);
                                const totalMinutes = startHour * 60 + startMin + selectedHours * 60 + selectedMinutes;
                                const endHour = Math.floor(totalMinutes / 60);
                                const endMin = totalMinutes % 60;
                                
                                // 23:00 dan oshmasligini ta'minlash
                                if (endHour >= 23 && endMin > 0) {
                                  return "23:00";
                                }
                                if (endHour > 23) {
                                  return "23:00";
                                }
                                
                                return `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
                              })()}
                            </div>
                            <div className="text-xs sm:text-sm text-green-600 mt-1">
                              Davomiylik: {(() => {
                                const [startHour, startMin] = tempStartTime.split(':').map(Number);
                                const totalMinutes = startHour * 60 + startMin + selectedHours * 60 + selectedMinutes;
                                const startTotalMinutes = startHour * 60 + startMin;
                                const actualDuration = totalMinutes - startTotalMinutes;
                                const hours = Math.floor(actualDuration / 60);
                                const minutes = actualDuration % 60;
                                
                                if (hours > 0 && minutes > 0) {
                                  return `${hours} soat ${minutes} daqiqa`;
                                } else if (hours > 0) {
                                  return `${hours} soat`;
                                } else if (minutes > 0) {
                                  return `${minutes} daqiqa`;
                                } else {
                                  return 'Minimum 15 daqiqa';
                                }
                              })()}
                            </div>
                            <div className="text-xs sm:text-sm text-green-500 mt-2 px-2 py-1 bg-green-100 rounded">
                              Misol: 1 soat tanlanganda {tempStartTime} dan {(() => {
                                const [startHour] = tempStartTime.split(':').map(Number);
                                return `${(startHour + 1).toString().padStart(2, '0')}:00`;
                              })()} gacha vaqt band qilinadi
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
                          disabled={selectedHours === 0 && selectedMinutes < 15}
                          className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                            selectedHours === 0 && selectedMinutes < 15
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

              {/* Right side - Client Form or Booking Info */}
              <div className="space-y-4 sm:space-y-6">
                {(() => {
                  // Check if the selected date is fully booked
                  if (!selectedDate) {
                    return (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-600 text-lg mb-2">Sana Tanlanmagan</h4>
                        <p className="text-gray-500">Iltimos, avval kalendardan sana tanlang</p>
                      </div>
                    );
                  }

                  // Calculate if date is fully booked
                  const allTimeSlots = Array.from({ length: 15 }, (_, i) => {
                    const hour = i + 8;
                    if (hour > 22) return null;
                    return `${hour.toString().padStart(2, '0')}:00`;
                  }).filter(Boolean);

                  const dayBookings = bookedTimeSlots.filter(slot => slot.date === selectedDate);
                  const bookedHours = new Set();

                  // Har bir soat uchun band qilingan daqiqalarni tekshirish
                  for (let hour = 8; hour <= 22; hour++) {
                    const hourStr = `${hour.toString().padStart(2, '0')}:00`;
                    const hourStartMinutes = hour * 60;
                    const hourEndMinutes = hour * 60 + 59;

                    let coveredMinutes = 0;

                    dayBookings.forEach(booking => {
                      const [bookingStartHour, bookingStartMin] = booking.time.split(':').map(Number);
                      const [bookingEndHour, bookingEndMin] = booking.endTime.split(':').map(Number);
                      const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;
                      const bookingEndMinutes = bookingEndHour * 60 + bookingEndMin;

                      // Agar booking bu soatni qamrab olsa
                      if (bookingStartMinutes <= hourEndMinutes && bookingEndMinutes >= hourStartMinutes) {
                        const overlapStart = Math.max(hourStartMinutes, bookingStartMinutes);
                        const overlapEnd = Math.min(hourEndMinutes + 1, bookingEndMinutes); // +1 chunki soat 59 daqiqagacha
                        const overlapDuration = Math.max(0, overlapEnd - overlapStart);
                        coveredMinutes += overlapDuration;
                      }
                    });

                    // Agar soatning 60 daqiqasi to'liq yoki deyarli to'liq band bo'lsa
                    if (coveredMinutes >= 60) {
                      bookedHours.add(hourStr);
                    }
                  }

                  const isFullyBooked = allTimeSlots.every(time => bookedHours.has(time));

                  // To'liq band qilingan kunlar uchun hech narsa ko'rsatmaslik
                  if (isFullyBooked) {
                    return null;
                  }

                  // Qisman band yoki mavjud kunlar uchun forma ko'rsatish
                  return (
                    <>
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
                    </>
                  );
                })()}
              </div>
            </div>


          </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-between space-x-2 sm:space-x-3 sticky bottom-0 sm:static">
                <button
                  onClick={() => setShowPricingModal(true)}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium text-sm sm:text-base shadow-md"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Narxlar va Ovqatlar</span>
                </button>
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

        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-2 sm:p-4">
            <div className="bg-white w-full max-w-md sm:rounded-xl shadow-2xl p-4 sm:p-6 mx-2">
              {/* Modal Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Rezervatsiyani Tasdiqlang
                </h3>
                <p className="text-sm text-gray-600">
                  Quyidagi ma'lumotlarni tekshiring va tasdiqlang
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sana:</span>
                  <span className="font-medium text-sm sm:text-base">
                    {new Date(selectedDate).toLocaleDateString('uz-UZ', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vaqt:</span>
                  <span className="font-medium text-sm sm:text-base">
                    {selectedTime} - {selectedEndTime}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Davomiylik:</span>
                  <span className="font-medium text-sm sm:text-base">
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

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mijoz:</span>
                  <span className="font-medium text-sm sm:text-base">{clientName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Telefon:</span>
                  <span className="font-medium text-sm sm:text-base">+998 {clientPhone}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Jami Narx:</span>
                  <span className="font-bold text-lg text-green-600">
                    ${(() => {
                      const [startHour] = selectedTime.split(':').map(Number);
                      const [endHour, endMin] = selectedEndTime.split(':').map(Number);
                      const totalMinutes = (endHour * 60 + endMin) - (startHour * 60);
                      const hours = Math.ceil(totalMinutes / 60);
                      const hourlyRate = startHour >= 18 ? 400 : startHour >= 10 ? 300 : 200;
                      return hours * hourlyRate;
                    })()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                >
                  Bekor Qilish
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium text-sm sm:text-base shadow-md"
                >
                  Tasdiqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Calculation Confirmation Modal */}
        {showSaveCalculationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-2 sm:p-4" data-save-modal>
            <div className="bg-white w-full max-w-lg sm:rounded-xl shadow-2xl p-4 sm:p-6 mx-2 modal-content">
              {/* Modal Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Hisob-kitobni Tasdiqlang
                </h3>
                <p className="text-sm text-gray-600">
                  Quyidagi hisob-kitob ma'lumotlarini saqlashni xohlaysizmi?
                </p>
              </div>

              {/* Calculation Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mehmonlar soni:</span>
                  <span className="font-medium text-sm sm:text-base">
                    {guestCount === 0 ? 'Belgilanmagan' : `${guestCount} kishi`}
                  </span>
                </div>

                {selectedPricing && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tanlangan paket:</span>
                    <span className="font-medium text-sm sm:text-base">{selectedPricing.name}</span>
                  </div>
                )}

                {selectedPricing && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Paket narxi:</span>
                    <span className="font-medium text-sm sm:text-base">
                      ${guestCount === 0 ? 0 : selectedPricing.price * guestCount}
                    </span>
                  </div>
                )}

                {selectedMenuItems.length > 0 && (
                  <div className="border-t pt-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">Qo'shimcha ovqatlar:</div>
                    {selectedMenuItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs mb-1">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 pt-1 border-t">
                      <span>Ovqatlar jami:</span>
                      <span>${selectedMenuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-bold text-gray-900">Umumiy jami:</span>
                  <span className="font-bold text-lg text-green-600">
                    ${calculateTotal()}
                  </span>
                </div>

                <div className="text-center pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Sana: {new Date().toLocaleDateString('uz-UZ', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    Vaqt: {new Date().toLocaleTimeString('uz-UZ', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSaveCalculationModal(false)}
                  className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                >
                  Bekor Qilish
                </button>
                <button
                  onClick={() => {
                    // Hisob-kitobni saqlash logic
                    const calculationData = {
                      id: 'calc-' + Date.now(),
                      date: new Date().toISOString(),
                      guestCount,
                      selectedPricing,
                      selectedMenuItems,
                      totalAmount: calculateTotal(),
                      timestamp: new Date().toLocaleString('uz-UZ')
                    };

                    // LocalStorage ga saqlash
                    try {
                      const saved = localStorage.getItem('savedCalculations') || '[]';
                      const calculations = JSON.parse(saved);
                      calculations.push(calculationData);
                      localStorage.setItem('savedCalculations', JSON.stringify(calculations));
                      
                      // Muvaffaqiyat holatini ko'rsatish
                      setTimeout(() => {
                        setShowSaveCalculationModal(false);
                        setShowPricingModal(false);
                      }, 1500); // 1.5 soniya kutish
                      
                      // Modalda muvaffaqiyat xabarini ko'rsatish
                      const modal = document.querySelector('[data-save-modal]');
                      if (modal) {
                        const content = modal.querySelector('.modal-content');
                        if (content) {
                          content.innerHTML = `
                            <div class="text-center py-8">
                              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <h3 class="text-xl font-bold text-gray-900 mb-2">Muvaffaqiyatli Saqlandi!</h3>
                              <p class="text-gray-600">Hisob-kitob ma'lumotlari saqlandi.</p>
                            </div>
                          `;
                        }
                      }
                    } catch (error) {
                      console.error('Error saving calculation:', error);
                      // Error holatida ham alert o'rniga modal ichida xabar ko'rsatish
                      const modal = document.querySelector('[data-save-modal]');
                      if (modal) {
                        const content = modal.querySelector('.modal-content');
                        if (content) {
                          content.innerHTML = `
                            <div class="text-center py-8">
                              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </div>
                              <h3 class="text-xl font-bold text-gray-900 mb-2">Xatolik Yuz Berdi!</h3>
                              <p class="text-gray-600">Hisob-kitobni saqlashda muammo yuzaga keldi.</p>
                            </div>
                          `;
                        }
                      }
                      setTimeout(() => {
                        setShowSaveCalculationModal(false);
                      }, 2000);
                    }
                  }}
                  className="flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium text-sm sm:text-base shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}




      </div>
    </div>
  );
};