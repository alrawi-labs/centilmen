import { useState, useEffect, useRef } from "react"; // useRef eklendi
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

// Mock components (değişiklik yok)
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
    } ${
      size === "lg"
        ? "px-8 py-4 text-lg"
        : size === "sm"
        ? "px-4 py-2 text-sm"
        : "px-6 py-3 text-base"
    } ${className}`}
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

// Mock data (değişiklik yok)
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
  ],
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
  ],
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
  ],
  "28 Eyl": [
    "09:30",
    "11:00",
    "11:30",
    "13:30",
    "14:30",
    "16:30",
    "17:00",
    "17:30",
  ],
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
    const isUserLoggedIn = Math.random() > 0.5;
    setIsLoggedIn(isUserLoggedIn);
    if (isUserLoggedIn) {
      setCurrentStep("stylist");
    }
  }, []);
  
  // YENİ EKLENDİ: Scroll to top effect
  useEffect(() => {
    // Randevu tamamlandığında veya yeni bir adıma geçildiğinde sayfanın başına scroll yap
    if (currentStep === "complete" || currentStep === "stylist" || currentStep === "time" || currentStep === "model") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentStep]); // Bu effect, currentStep her değiştiğinde çalışır

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
        setSelectedDate={handleDateChange}
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

// LoginStep (değişiklik yok)
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

        {/* DÜZENLENDİ: Mobil görünüm için grid-cols-2 ve boşluk ayarı yapıldı */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8">
          {STYLISTS.map((stylist) => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
              onSelect={onSelect}
              isSelected={selectedStylist?.id === stylist.id}
            />
          ))}
        </div>

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

// StylistCard (değişiklik yok)
function StylistCard({ stylist, onSelect, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isSelected ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(stylist)}
    >
      <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20">
        <div className="aspect relative object-top overflow-hidden rounded-t-2xl">
          <img
            src={stylist.background}
            alt={`${stylist.name} background`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute top-[-7.5%] left-0 right-0 pointer-events-none z-20">
          <div className="h-full w-full transition-all duration-700 ease-out group-hover:scale-150 group-hover:-translate-y-12 group-hover:translate-x-4">
            <img
              src={stylist.image}
              alt={stylist.name}
              className="h-full w-full object-cover object-top transition-all duration-700 rounded-t-2xl"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 85% 100%, 15% 100%)",
              }}
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 aspect-[3/5] bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none z-10"></div>
        <div className="p-6 relative z-10 bg-card/90 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {stylist.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">{stylist.role}</p>
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
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Expert
            </span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full"></div>
        </div>
      </div>
    </div>
  );
}

// TimeStep (değişiklik yok)
function TimeStep({
  selectedStylist,
  onSelect,
  selectedTime,
  selectedDate,
  setSelectedDate,
}) {
  const dateOptions = ["Bugün", "Yarın", "27 Eyl", "28 Eyl"];
  const availableTimesForDate = AVAILABLE_TIMES_BY_DATE[selectedDate] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
        {/* Mobilde daha kompakt header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">Saati Seçin</h1>
          <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-6">
            Uygun olan saati seçin
          </p>
          <div className="inline-flex items-center gap-2 md:gap-3 bg-card/60 border border-border/40 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Scissors className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </div>
            <span className="font-medium text-sm md:text-base">{selectedStylist.name}</span>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">
            Tarih Seçin
          </h3>
          <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
            {dateOptions.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "default" : "outline"}
                className="min-w-[80px] md:min-w-[100px] relative text-sm md:text-base"
                onClick={() => setSelectedDate(date)}
              >
                {date}
                <span className="absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-primary text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {AVAILABLE_TIMES_BY_DATE[date]?.length || 0}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-center">
            Müsait Saatler ({selectedDate})
          </h3>
          {availableTimesForDate.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
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
            <div className="text-center py-8 md:py-12">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-muted-foreground">
                Bu tarih için müsait saat yok
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lütfen başka bir tarih seçiniz
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-card/60 border border-border/40 rounded-2xl p-3 md:p-4 backdrop-blur-sm inline-block">
            <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
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


// TimeSlot (değişiklik yok)
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
          className={`text-xs mt-1 ${
            isSelected ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          Müsait
        </div>
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
  selectedModel,
  onModelSelect,
  onSkip,
  faceTypeFilter,
  setFaceTypeFilter,
  getFilteredModels,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16">
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
        {!selectedCategory ? (
          // Kategori kartları mobil için tek sütun kalabilir, daha iyi bir akış sağlar
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                ← Kategorilere Dön
              </Button>
            </div>

            {/* DÜZENLENDİ: Mobil görünüm için grid-cols-2 ve boşluk ayarı yapıldı */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {getFilteredModels(selectedCategory.models).map((model) => (
                <ModelCard key={model.id} model={model} onSelect={onModelSelect} />
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

// CategoryCard (değişiklik yok)
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
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
          <Scissors className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-2 text-center group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-4">
          {filteredCount} model mevcut
        </p>
        <div className="text-center">
          <Button
            size="sm"
            className={`transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Modelleri Gör
          </Button>
        </div>
      </div>
    </div>
  );
}

// ModelCard (değişiklik yok)
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
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={model.image}
            alt={model.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {model.price}
            </div>
          </div>
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
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
            {model.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

// CompleteStep (değişiklik yok)
function CompleteStep({
  selectedStylist,
  selectedTime,
  selectedModel,
  notificationPermission,
  onRequestNotification,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20 flex items-center justify-center">
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <div className="bg-card/60 border border-border/40 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl shadow-primary/10">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Randevunuz Alındı!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Seçimleriniz başarıyla kaydedildi. Sizi bekliyor olacağız.
          </p>

          <div className="text-left space-y-4 border-t border-b border-border/40 py-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kuaför</p>
                <p className="font-semibold">{selectedStylist.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tarih & Saat</p>
                <p className="font-semibold">Bugün, {selectedTime}</p>
              </div>
            </div>
            {selectedModel && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">{selectedModel.name}</p>
                </div>
              </div>
            )}
          </div>

          {notificationPermission !== "granted" && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Randevunuzu Unutmayın!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bildirimlere izin vererek randevu saatiniz yaklaştığında size
                hatırlatma göndermemizi sağlayabilirsiniz.
              </p>
              <Button onClick={onRequestNotification} variant="outline">
                {notificationPermission === "denied" ? (
                  <BellOff className="mr-2" />
                ) : (
                  <Bell className="mr-2" />
                )}
                {notificationPermission === "denied"
                  ? "Bildirim İzni Reddedildi"
                  : "Bildirimlere İzin Ver"}
              </Button>
            </div>
          )}

          <Button size="lg" className="w-full">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </div>
  );
}