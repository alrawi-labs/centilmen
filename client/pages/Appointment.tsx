import { useState, useEffect } from "react";
import {
  User,
  Clock,
  Scissors,
  Check,
  Bell,
  BellOff,
  Phone,
  MessageCircle,
} from "lucide-react";

// Mock components
const Button = ({
  size = "default",
  variant = "default",
  children,
  className = "",
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
      variant === "outline"
        ? "border border-border/40 bg-transparent hover:bg-card/80 hover:border-primary/30"
        : variant === "secondary"
          ? "bg-card/60 text-foreground hover:bg-card/80"
          : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
    } ${size === "lg" ? "px-8 py-4 text-lg" : size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ type = "text", placeholder, className = "", ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  />
);

// Mock data
const STYLISTS = [
  {
    id: 1,
    name: "Duran Koçak",
    role: "Usta Kuaför",
    image: "team/duran-body.png",
    background: "team/duran-background.png",
    rating: 4.9,
    experience: "15 yıl",
  },
  {
    id: 2,
    name: "Deniz Haznedar",
    role: "Stylist",
    image: "team/deniz-body.png",
    background: "team/duran-background.png",
    rating: 4.8,
    experience: "10 yıl",
  },
  {
    id: 3,
    name: "Feyzullah",
    role: "Saç Uzmanı",
    image: "team/feyzullah-body.png",
    background: "team/duran-background.png",
    rating: 4.7,
    experience: "8 yıl",
  },
];

const AVAILABLE_TIMES_BY_DATE = {
  Bugün: [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ], // Bugün için sadece öğleden sonra saatleri (geçen saatler yok)
  Yarın: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ], // Yarın için tüm saatler müsait
  "27 Eyl": [
    "09:00",
    "10:00",
    "10:30",
    "11:00",
    "13:00",
    "14:00",
    "15:30",
    "16:00",
    "17:00",
    "18:00",
  ], // 27 Eyl için bazı saatler dolu
  "28 Eyl": [
    "09:30",
    "11:00",
    "11:30",
    "13:30",
    "14:30",
    "16:30",
    "17:00",
    "17:30",
  ], // 28 Eyl için daha az müsait saat
};

const HAIR_CATEGORIES = [
  {
    id: 1,
    name: "Klasik Kesimler",
    models: [
      {
        id: 1,
        name: "Klasik Erkek",
        price: "₺150",
        image: "models/classic-1.jpg",
        faceTypes: ["oval", "kare"],
      },
      {
        id: 2,
        name: "Side Part",
        price: "₺150",
        image: "models/classic-2.jpg",
        faceTypes: ["oval", "uzun"],
      },
      {
        id: 3,
        name: "Pompadour",
        price: "₺180",
        image: "models/classic-3.jpg",
        faceTypes: ["kare", "kalp"],
      },
    ],
  },
  {
    id: 2,
    name: "Modern Stiller",
    models: [
      {
        id: 4,
        name: "Fade Cut",
        price: "₺200",
        image: "models/modern-1.jpg",
        faceTypes: ["oval", "kare", "yuvarlak"],
      },
      {
        id: 5,
        name: "Undercut",
        price: "₺180",
        image: "models/modern-2.jpg",
        faceTypes: ["oval", "uzun"],
      },
      {
        id: 6,
        name: "Buzz Cut",
        price: "₺120",
        image: "models/modern-3.jpg",
        faceTypes: ["kare", "oval"],
      },
    ],
  },
  {
    id: 3,
    name: "Sakal & Bıyık",
    models: [
      {
        id: 7,
        name: "Full Sakal",
        price: "₺100",
        image: "models/beard-1.jpg",
        faceTypes: ["uzun", "oval"],
      },
      {
        id: 8,
        name: "Sakal Düzeltme",
        price: "₺80",
        image: "models/beard-2.jpg",
        faceTypes: ["kare", "yuvarlak"],
      },
      {
        id: 9,
        name: "Bıyık Styling",
        price: "₺60",
        image: "models/mustache-1.jpg",
        faceTypes: ["oval", "kare"],
      },
    ],
  },
];

const FACE_TYPES = [
  { id: "oval", name: "Oval" },
  { id: "kare", name: "Kare" },
  { id: "yuvarlak", name: "Yuvarlak" },
  { id: "uzun", name: "Uzun" },
  { id: "kalp", name: "Kalp" },
];

export default function AppointmentBooking() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentStep, setCurrentStep] = useState("login"); // login, stylist, time, model, complete
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [faceTypeFilter, setFaceTypeFilter] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Bugün");

  // Simulated login check
  useEffect(() => {
    // Simulating user might be logged in
    const isUserLoggedIn = Math.random() > 0.5; // 50% chance
    setIsLoggedIn(isUserLoggedIn);
    if (isUserLoggedIn) {
      setCurrentStep("stylist");
    }
  }, []);

  const handleQuickBooking = () => {
    if (phoneNumber.trim()) {
      setCurrentStep("stylist");
    }
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    setCurrentStep("time");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep("model");
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentStep("complete");
  };

  const handleSkipModel = () => {
    setCurrentStep("complete");
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Eğer seçili saat yeni tarihte müsait değilse sıfırla
    if (
      selectedTime &&
      !AVAILABLE_TIMES_BY_DATE[newDate]?.includes(selectedTime)
    ) {
      setSelectedTime(null);
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const getFilteredModels = (models) => {
    if (!faceTypeFilter) return models;
    return models.filter((model) => model.faceTypes.includes(faceTypeFilter));
  };

  if (currentStep === "login" && !isLoggedIn) {
    return (
      <LoginStep
        onQuickBooking={handleQuickBooking}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    );
  }

  if (currentStep === "stylist") {
    return (
      <StylistStep
        onSelect={handleStylistSelect}
        selectedStylist={selectedStylist}
      />
    );
  }

  if (currentStep === "time") {
    return (
      <TimeStep
        selectedStylist={selectedStylist}
        onSelect={handleTimeSelect}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange} // Bu fonksiyonu kullan
      />
    );
  }

  if (currentStep === "model") {
    return (
      <ModelStep
        selectedStylist={selectedStylist}
        selectedTime={selectedTime}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedModel={selectedModel}
        onModelSelect={handleModelSelect}
        onSkip={handleSkipModel}
        faceTypeFilter={faceTypeFilter}
        setFaceTypeFilter={setFaceTypeFilter}
        getFilteredModels={getFilteredModels}
      />
    );
  }

  if (currentStep === "complete") {
    return (
      <CompleteStep
        selectedStylist={selectedStylist}
        selectedTime={selectedTime}
        selectedModel={selectedModel}
        notificationPermission={notificationPermission}
        onRequestNotification={requestNotificationPermission}
      />
    );
  }

  return null;
}

function LoginStep({ onQuickBooking, phoneNumber, setPhoneNumber }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-md px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Hoş Geldiniz</h1>
          <p className="text-muted-foreground text-lg">
            Randevu almak için giriş yapmanız gerekmektedir
          </p>
        </div>

        <div className="space-y-6">
          {/* Login Button */}
          <Button className="w-full py-4 text-lg">
            <User className="mr-3" />
            Giriş Yap
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                veya
              </span>
            </div>
          </div>

          {/* Quick Booking */}
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Hızlı Randevu
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Telefon numaranız ile hızlı randevu alabilirsiniz
            </p>

            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="0(5XX) XXX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg"
              />

              <Button
                onClick={onQuickBooking}
                disabled={!phoneNumber.trim()}
                className="w-full"
                variant={!phoneNumber.trim() ? "secondary" : "default"}
              >
                <Phone className="mr-2" />
                Hızlı Randevu Al
              </Button>
            </div>
          </div>

          {/* WhatsApp Option */}
          <Button
            variant="outline"
            className="w-full text-green-600 border-green-200 hover:bg-green-50"
          >
            <MessageCircle className="mr-2" />
            WhatsApp ile Randevu Al
          </Button>
        </div>
      </div>
    </div>
  );
}

function StylistStep({ onSelect, selectedStylist }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Kuaförünüzü Seçin
          </h1>
          <p className="text-muted-foreground text-lg">
            Size en uygun uzmanı seçin veya farketmez seçeneğini tercih edin
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {STYLISTS.map((stylist) => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
              onSelect={onSelect}
              isSelected={selectedStylist?.id === stylist.id}
            />
          ))}
        </div>

        {/* No Preference Option */}
        <div className="flex justify-center">
          <div
            className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 cursor-pointer group max-w-md"
            onClick={() =>
              onSelect({ id: "any", name: "Farketmez", role: "Uygun Uzman" })
            }
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Scissors className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                Farketmez
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Müsait olan uzman ile randevu
              </p>
              <Button
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Seç
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StylistCard({ stylist, onSelect, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${isSelected ? "scale-105" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(stylist)}
    >
      <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20">
              
              {/* Background Image (stays in place) */}
              <div className="aspect relative object-top overflow-hidden rounded-t-2xl">
                <img
                  src={stylist.background}
                  alt={`${stylist.name} background`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              {/* Body Image (floats outside card on hover) */}
              <div className="absolute top-[-7.5%] left-0 right-0 pointer-events-none z-20">
                <div className="h-full w-full transition-all duration-700 ease-out group-hover:scale-150 group-hover:-translate-y-12 group-hover:translate-x-4">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="h-full w-full object-cover object-top transition-all duration-700 rounded-t-2xl"
                    style={{
                      clipPath: 'polygon(25% 0%, 75% 0%, 85% 100%, 15% 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Overlay effect on hover */}
              <div className="absolute top-0 left-0 right-0 aspect-[3/5] bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none z-10"></div>
              
              {/* Content */}
              <div className="p-6 relative z-10 bg-card/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {stylist.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {stylist.role}
                </p>
                
                {/* Experience indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary transition-all duration-300`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Expert</span>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full"></div>
              </div>
            </div>
    </div>
  );
}

function TimeStep({
  selectedStylist,
  onSelect,
  selectedTime,
  selectedDate,
  setSelectedDate,
}) {
  const dateOptions = ["Bugün", "Yarın", "27 Eyl", "28 Eyl"];

  // Seçili tarihe göre müsait saatleri al
  const availableTimesForDate = AVAILABLE_TIMES_BY_DATE[selectedDate] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header with Selection Info */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Saati Seçin</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Uygun olan saati seçin
          </p>

          {/* Selected Stylist Info */}
          <div className="inline-flex items-center gap-3 bg-card/60 border border-border/40 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium">{selectedStylist.name}</span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Tarih Seçin
          </h3>
          <div className="flex gap-4 justify-center flex-wrap">
            {dateOptions.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "default" : "outline"}
                className="min-w-[100px] relative"
                onClick={() => {
                  setSelectedDate(date);
                  // Tarih değiştiğinde seçili saati sıfırla (eğer o tarihte müsait değilse)
                  if (
                    selectedTime &&
                    !AVAILABLE_TIMES_BY_DATE[date]?.includes(selectedTime)
                  ) {
                    // Ana bileşenden gelen onSelect fonksiyonunu kullanarak seçili saati temizle
                    // Bu durumda selectedTime state'ini parent'tan yönetmek gerekir
                  }
                }}
              >
                {date}
                {/* Müsait saat sayısını göster */}
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {AVAILABLE_TIMES_BY_DATE[date]?.length || 0}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-center">
            Müsait Saatler ({selectedDate})
          </h3>

          {availableTimesForDate.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableTimesForDate.map((time) => (
                <TimeSlot
                  key={time}
                  time={time}
                  onSelect={onSelect}
                  isSelected={selectedTime === time}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                Bu tarih için müsait saat yok
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lütfen başka bir tarih seçiniz
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <div className="bg-card/60 border border-border/40 rounded-2xl p-4 backdrop-blur-sm inline-block">
            <p className="text-sm text-muted-foreground mb-2">
              📅 Randevu süresi ortalama 45-60 dakikadır
            </p>
            <p className="text-xs text-muted-foreground">
              {availableTimesForDate.length} saat müsait • {selectedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeSlot({ time, onSelect, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? "scale-105" : isHovered ? "scale-102" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(time)}
    >
      <div
        className={`p-4 rounded-xl text-center font-medium transition-all duration-300 ${
          isSelected
            ? "bg-primary text-white border border-primary shadow-lg shadow-primary/20"
            : "bg-card/60 border border-border/40 hover:border-primary/30 hover:bg-card/80 backdrop-blur-sm"
        }`}
      >
        <div className="text-lg">{time}</div>
        <div
          className={`text-xs mt-1 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}
        >
          Müsait
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

function ModelStep({
  selectedStylist,
  selectedTime,
  selectedCategory,
  setSelectedCategory,
  onModelSelect,
  selectedModel,
  onSkip,
  faceTypeFilter,
  setFaceTypeFilter,
  getFilteredModels,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Saç Modeli Seçin
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            İstediğiniz saç modelini seçin veya uzmanımıza bırakın
          </p>

          {/* Selection Summary */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-card/60 border border-border/40 rounded-full px-4 py-2 backdrop-blur-sm">
              <Scissors className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">
                {selectedStylist.name}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 border border-border/40 rounded-full px-4 py-2 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">{selectedTime}</span>
            </div>
          </div>

          {/* Face Type Filter */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Size özel öneriler için yüz tipinizi seçebilirsiniz:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                size="sm"
                variant={!faceTypeFilter ? "default" : "outline"}
                onClick={() => setFaceTypeFilter(null)}
              >
                Tümü
              </Button>
              {FACE_TYPES.map((type) => (
                <Button
                  key={type.id}
                  size="sm"
                  variant={faceTypeFilter === type.id ? "default" : "outline"}
                  onClick={() => setFaceTypeFilter(type.id)}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {HAIR_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={setSelectedCategory}
                filteredCount={getFilteredModels(category.models).length}
              />
            ))}
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                ← Kategorilere Dön
              </Button>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getFilteredModels(selectedCategory.models).map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onSelect={onModelSelect}
                />
              ))}
            </div>

            {faceTypeFilter &&
              getFilteredModels(selectedCategory.models).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Bu kategori için{" "}
                    {FACE_TYPES.find((t) => t.id === faceTypeFilter)?.name} yüz
                    tipine uygun model bulunamadı.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setFaceTypeFilter(null)}
                  >
                    Tüm Modelleri Göster
                  </Button>
                </div>
              )}
          </div>
        )}

        {/* Skip Option */}
        <div className="text-center">
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm inline-block">
            <h3 className="font-semibold text-lg mb-3">Uzmanıma Bırakıyorum</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Size en uygun modeli uzmanımız belirlesin
            </p>
            <Button onClick={onSkip} variant="outline">
              Model Seçmeden Devam Et
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, onSelect, filteredCount }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(category)}
    >
      <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
        {/* Category Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
          <Scissors className="w-8 h-8 text-primary" />
        </div>

        {/* Content */}
        <h3 className="font-bold text-lg mb-2 text-center group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-4">
          {filteredCount} model mevcut
        </p>

        {/* Select Button */}
        <div className="text-center">
          <Button
            size="sm"
            className={`transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            Modelleri Gör
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModelCard({ model, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(model)}
    >
      <div className="bg-card/60 border border-border/40 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:scale-105">
        {/* Model Image */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={model.image}
            alt={model.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {model.price}
            </div>
          </div>

          {/* Select Button */}
          <div
            className={`absolute top-4 left-4 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <Button size="sm" className="shadow-lg">
              Seç
            </Button>
          </div>

          {/* Face Type Icons */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {model.faceTypes.slice(0, 2).map((type) => (
                  <div
                    key={type}
                    className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                  >
                    {FACE_TYPES.find((t) => t.id === type)?.name}
                  </div>
                ))}
                {model.faceTypes.length > 2 && (
                  <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    +{model.faceTypes.length - 2}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
            {model.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {model.faceTypes
              .map((type) => FACE_TYPES.find((t) => t.id === type)?.name)
              .join(", ")}{" "}
            yüz tipine uygun
          </p>
        </div>
      </div>
    </div>
  );
}

function CompleteStep({
  selectedStylist,
  selectedTime,
  selectedModel,
  notificationPermission,
  onRequestNotification,
}) {
  const [showNotificationRequest, setShowNotificationRequest] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotificationRequest(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNotificationYes = () => {
    onRequestNotification();
    setShowNotificationRequest(null);
  };

  const handleNotificationNo = () => {
    setShowNotificationRequest(null);
    setTimeout(() => {
      setShowNotificationRequest("declined");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20 flex items-center justify-center">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Success Animation Container */}
        <div className="text-center">
          {/* Success Icon */}
          <div className="relative mx-auto mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Check className="w-12 h-12 text-white" />
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 w-24 h-24 border-4 border-green-500/30 rounded-full animate-ping"></div>
            <div
              className="absolute inset-0 w-24 h-24 border-2 border-green-500/20 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Success Message */}
          <div className="bg-card/60 border border-border/40 rounded-3xl p-8 backdrop-blur-sm mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-600">
              🎉 Randevunuz Alındı!
            </h1>

            <div className="space-y-4 text-lg">
              <p className="text-muted-foreground">
                Randevunuz başarıyla oluşturuldu ve{" "}
                <span className="text-primary font-semibold">
                  onay bekliyor
                </span>
                .
              </p>

              {/* Appointment Details */}
              <div className="bg-background/60 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Kuaför:</span>
                  <span className="font-semibold">{selectedStylist.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Saat:</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                {selectedModel && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-semibold">{selectedModel.name}</span>
                  </div>
                )}
                <div className="border-t border-border/40 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Durum:</span>
                    <span className="text-orange-600 font-semibold">
                      ⏳ Onay Bekliyor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Permission Request */}
          {showNotificationRequest === true && (
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 backdrop-blur-sm animate-in slide-in-from-bottom-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-2">Bildirim İzni</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Randevunuz onaylandığında veya randevu saatinize yarım saat
                    kala size bildirim göndermemizi ister misiniz?
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handleNotificationYes} size="sm">
                      <Bell className="mr-2" />
                      Evet, Gönder
                    </Button>
                    <Button
                      onClick={handleNotificationNo}
                      variant="outline"
                      size="sm"
                    >
                      Hayır
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Declined Notification Message */}
          {showNotificationRequest === "declined" && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-6 backdrop-blur-sm animate-in slide-in-from-bottom-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BellOff className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-2 text-orange-600">
                    Bildirim Gönderilemiyor
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Bildirim göndermek için tarayıcınızın bildirim iznine
                    ihtiyacımız var. İsterseniz tarayıcı ayarlarından
                    bildirimleri açabilirsiniz.
                  </p>
                  <Button
                    onClick={onRequestNotification}
                    variant="outline"
                    size="sm"
                    className="text-orange-600 border-orange-200"
                  >
                    Bildirim İznini Aç
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Permission Granted */}
          {notificationPermission === "granted" && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  Bildirim izni verildi! Size bildirim göndereceğiz.
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8">Ana Sayfaya Dön</Button>
            <Button variant="outline" className="px-8">
              Randevularım
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-card/40 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-3">
              Sorularınız için bize ulaşabilirsiniz:
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" className="text-green-600">
                <MessageCircle className="mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="mr-2" />
                Ara
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
