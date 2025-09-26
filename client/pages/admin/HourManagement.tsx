import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Save,
  X,
  Check,
  AlertCircle,
  CheckCircle,
  User,
  Settings,
  CalendarX,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from "lucide-react";

// Mock Components (same style as employee management)
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
          : variant === "success"
            ? "bg-green-500 text-white hover:bg-green-600"
            : variant === "warning"
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : variant === "danger"
                ? "bg-red-500 text-white hover:bg-red-600"
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

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Modal = ({ isOpen, onClose, children, title, size = "default" }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-card/95 border border-border/40 rounded-2xl mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm ${
        size === "lg" ? "max-w-4xl w-full" : "max-w-2xl w-full"
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h3 className="text-xl font-bold">{title}</h3>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Mock Data
const MOCK_HAIRDRESSERS = [
  { id: 1, firstName: "Duran", lastName: "Koçak", role: "Senior Kuaför" },
  { id: 2, firstName: "Deniz", lastName: "Haznedar", role: "Kuaför" },
  { id: 3, firstName: "Feyzullah", lastName: "Acar", role: "Junior Kuaför" }
];

const DAYS_OF_WEEK = [
  { value: 0, label: 'Pazartesi' },
  { value: 1, label: 'Salı' },
  { value: 2, label: 'Çarşamba' },
  { value: 3, label: 'Perşembe' },
  { value: 4, label: 'Cuma' },
  { value: 5, label: 'Cumartesi' },
  { value: 6, label: 'Pazar' }
];

const MOCK_WORKING_DAYS = [
  {
    id: 1,
    hairdresserId: 1,
    hairdresser: "Duran Koçak",
    dayOfWeek: 0,
    isOpen: true,
    hours: [
      { id: 1, startTime: "09:00", endTime: "13:00" },
      { id: 2, startTime: "14:00", endTime: "18:00" }
    ]
  },
  {
    id: 2,
    hairdresserId: 1,
    hairdresser: "Duran Koçak",
    dayOfWeek: 1,
    isOpen: true,
    hours: [
      { id: 3, startTime: "09:00", endTime: "18:00" }
    ]
  },
  {
    id: 3,
    hairdresserId: 1,
    hairdresser: "Duran Koçak",
    dayOfWeek: 6,
    isOpen: false,
    hours: []
  }
];

const MOCK_EXCEPTIONS = [
  {
    id: 1,
    hairdresserId: 1,
    hairdresser: "Duran Koçak",
    date: "2024-01-15",
    startTime: null,
    endTime: null,
    message: "Hastalık izni",
    isClosedAllDay: true
  },
  {
    id: 2,
    hairdresserId: 2,
    hairdresser: "Deniz Haznedar",
    date: "2024-01-20",
    startTime: "14:00",
    endTime: "16:00",
    message: "Özel randevu",
    isClosedAllDay: false
  }
];

export default function ScheduleManagement() {
  const [view, setView] = useState("working-days"); // working-days, exceptions
  const [selectedHairdresser, setSelectedHairdresser] = useState("all");
  const [workingDays, setWorkingDays] = useState(MOCK_WORKING_DAYS);
  const [exceptions, setExceptions] = useState(MOCK_EXCEPTIONS);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showExceptionModal, setShowExceptionModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredWorkingDays = useMemo(() => {
    if (selectedHairdresser === "all") return workingDays;
    return workingDays.filter(day => day.hairdresserId === parseInt(selectedHairdresser));
  }, [workingDays, selectedHairdresser]);

  const filteredExceptions = useMemo(() => {
    if (selectedHairdresser === "all") return exceptions;
    return exceptions.filter(exc => exc.hairdresserId === parseInt(selectedHairdresser));
  }, [exceptions, selectedHairdresser]);

  const handleSaveSchedule = (scheduleData) => {
    if (selectedSchedule) {
      setWorkingDays(prev => prev.map(day => 
        day.id === selectedSchedule.id ? { ...day, ...scheduleData } : day
      ));
    } else {
      const newSchedule = {
        id: Date.now(),
        ...scheduleData,
        hairdresser: MOCK_HAIRDRESSERS.find(h => h.id === scheduleData.hairdresserId)?.firstName + " " + MOCK_HAIRDRESSERS.find(h => h.id === scheduleData.hairdresserId)?.lastName
      };
      setWorkingDays(prev => [...prev, newSchedule]);
    }
    setShowScheduleModal(false);
    setSelectedSchedule(null);
  };

  const handleSaveException = (exceptionData) => {
    const newException = {
      id: Date.now(),
      ...exceptionData,
      hairdresser: MOCK_HAIRDRESSERS.find(h => h.id === exceptionData.hairdresserId)?.firstName + " " + MOCK_HAIRDRESSERS.find(h => h.id === exceptionData.hairdresserId)?.lastName,
      isClosedAllDay: !exceptionData.startTime && !exceptionData.endTime
    };
    setExceptions(prev => [...prev, newException]);
    setShowExceptionModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Çalışma Saatleri Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  Kuaförlerin çalışma programlarını yönetin
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                value={selectedHairdresser}
                onChange={(e) => setSelectedHairdresser(e.target.value)}
                className="w-48"
              >
                <option value="all">Tüm Kuaförler</option>
                {MOCK_HAIRDRESSERS.map(hairdresser => (
                  <option key={hairdresser.id} value={hairdresser.id}>
                    {hairdresser.firstName} {hairdresser.lastName}
                  </option>
                ))}
              </Select>
              
              <Button
                variant={view === "working-days" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("working-days")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Çalışma Günleri
              </Button>
              
              <Button
                variant={view === "exceptions" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("exceptions")}
              >
                <CalendarX className="w-4 h-4 mr-2" />
                İstisnalar
              </Button>
              
              <Button onClick={() => view === "working-days" ? setShowScheduleModal(true) : setShowExceptionModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {view === "working-days" ? "Çalışma Günü Ekle" : "İstisna Ekle"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {view === "working-days" ? (
          <WorkingDaysView 
            workingDays={filteredWorkingDays}
            onEdit={(schedule) => {
              setSelectedSchedule(schedule);
              setShowScheduleModal(true);
            }}
            onDelete={(id) => setWorkingDays(prev => prev.filter(day => day.id !== id))}
          />
        ) : (
          <ExceptionsView 
            exceptions={filteredExceptions}
            onDelete={(id) => setExceptions(prev => prev.filter(exc => exc.id !== id))}
          />
        )}
      </div>

      {/* Working Schedule Modal */}
      <WorkingScheduleModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleSaveSchedule}
        schedule={selectedSchedule}
        hairdressers={MOCK_HAIRDRESSERS}
      />

      {/* Exception Modal */}
      <ExceptionModal
        isOpen={showExceptionModal}
        onClose={() => setShowExceptionModal(false)}
        onSubmit={handleSaveException}
        hairdressers={MOCK_HAIRDRESSERS}
      />
    </div>
  );
}

function WorkingDaysView({ workingDays, onEdit, onDelete }) {
  const groupedByHairdresser = useMemo(() => {
    const grouped = {};
    workingDays.forEach(day => {
      if (!grouped[day.hairdresser]) {
        grouped[day.hairdresser] = [];
      }
      grouped[day.hairdresser].push(day);
    });
    return grouped;
  }, [workingDays]);

  return (
    <div className="space-y-6">
      {Object.keys(groupedByHairdresser).length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
            Çalışma programı bulunamadı
          </h3>
          <p className="text-sm text-muted-foreground">
            Kuaförler için çalışma günleri ekleyin
          </p>
        </div>
      ) : (
        Object.entries(groupedByHairdresser).map(([hairdresser, days]) => (
          <HairdresserScheduleCard
            key={hairdresser}
            hairdresser={hairdresser}
            workingDays={days}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

function HairdresserScheduleCard({ hairdresser, workingDays, onEdit, onDelete }) {
  const weeklySchedule = DAYS_OF_WEEK.map(day => {
    const workingDay = workingDays.find(wd => wd.dayOfWeek === day.value);
    return {
      ...day,
      workingDay: workingDay || null
    };
  });

  return (
    <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{hairdresser}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {weeklySchedule.map((day) => (
          <div key={day.value} className="bg-background/60 rounded-xl p-4">
            <div className="text-center mb-3">
              <h4 className="font-medium text-sm">{day.label}</h4>
              <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                day.workingDay?.isOpen ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
            
            {day.workingDay?.isOpen ? (
              <div className="space-y-2">
                {day.workingDay.hours.map((hour, index) => (
                  <div key={index} className="bg-primary/10 rounded-lg p-2 text-center">
                    <div className="text-xs font-medium text-primary">
                      {hour.startTime} - {hour.endTime}
                    </div>
                  </div>
                ))}
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => onEdit(day.workingDay)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="flex-1 text-xs"
                    onClick={() => onDelete(day.workingDay.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-muted-foreground">
                Kapalı
                {day.workingDay && (
                  <div className="flex gap-1 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => onEdit(day.workingDay)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="flex-1 text-xs"
                      onClick={() => onDelete(day.workingDay.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExceptionsView({ exceptions, onDelete }) {
  if (exceptions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          İstisna bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Özel günler için istisna ekleyin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exceptions.map(exception => (
        <ExceptionCard
          key={exception.id}
          exception={exception}
          onDelete={() => onDelete(exception.id)}
        />
      ))}
    </div>
  );
}

function ExceptionCard({ exception, onDelete }) {
  return (
    <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            exception.isClosedAllDay 
              ? 'bg-red-100 text-red-600' 
              : 'bg-orange-100 text-orange-600'
          }`}>
            {exception.isClosedAllDay ? (
              <CalendarX className="w-5 h-5" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{exception.hairdresser}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(exception.date).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
        
        <Button
          size="sm"
          variant="danger"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
          exception.isClosedAllDay 
            ? 'bg-red-100 text-red-600' 
            : 'bg-orange-100 text-orange-600'
        }`}>
          {exception.isClosedAllDay 
            ? 'Tüm Gün Kapalı' 
            : `${exception.startTime} - ${exception.endTime} Kapalı`
          }
        </div>
        
        {exception.message && (
          <div className="bg-background/60 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">{exception.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkingScheduleModal({ isOpen, onClose, onSubmit, schedule, hairdressers }) {
  const [formData, setFormData] = useState({
    hairdresserId: '',
    dayOfWeek: 0,
    isOpen: true,
    hours: [{ startTime: '09:00', endTime: '17:00' }]
  });

  useState(() => {
    if (schedule) {
      setFormData({
        hairdresserId: schedule.hairdresserId,
        dayOfWeek: schedule.dayOfWeek,
        isOpen: schedule.isOpen,
        hours: schedule.hours.length > 0 ? schedule.hours : [{ startTime: '09:00', endTime: '17:00' }]
      });
    } else {
      setFormData({
        hairdresserId: '',
        dayOfWeek: 0,
        isOpen: true,
        hours: [{ startTime: '09:00', endTime: '17:00' }]
      });
    }
  },);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      hours: [...prev.hours, { startTime: '09:00', endTime: '17:00' }]
    }));
  };

  const removeTimeSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      hours: prev.hours.filter((_, i) => i !== index)
    }));
  };

  const updateTimeSlot = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      hours: prev.hours.map((hour, i) => 
        i === index ? { ...hour, [field]: value } : hour
      )
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={schedule ? "Çalışma Günü Düzenle" : "Yeni Çalışma Günü"}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kuaför</label>
            <Select
              value={formData.hairdresserId}
              onChange={(e) => setFormData(prev => ({ ...prev, hairdresserId: e.target.value }))}
              required
            >
              <option value="">Kuaför Seçin</option>
              {hairdressers.map(hairdresser => (
                <option key={hairdresser.id} value={hairdresser.id}>
                  {hairdresser.firstName} {hairdresser.lastName}
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Gün</label>
            <Select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData(prev => ({ ...prev, dayOfWeek: parseInt(e.target.value) }))}
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isOpen}
              onChange={(e) => setFormData(prev => ({ ...prev, isOpen: e.target.checked }))}
            />
            <span className="text-sm font-medium">Bu günde açık</span>
          </label>
        </div>

        {formData.isOpen && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium">Çalışma Saatleri</label>
              <Button type="button" size="sm" onClick={addTimeSlot}>
                <Plus className="w-4 h-4 mr-2" />
                Saat Aralığı Ekle
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.hours.map((hour, index) => (
                <div key={index} className="flex items-center gap-3 bg-background/60 rounded-xl p-3">
                  <Input
                    type="time"
                    placeholder="Başlangıç"
                    value={hour.startTime}
                    onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="time"
                    value={hour.endTime}
                    placeholder="Bitiş"
                    onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                    className="flex-1"
                  />
                  {formData.hours.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => removeTimeSlot(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            {schedule ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ExceptionModal({ isOpen, onClose, onSubmit, hairdressers }) {
  const [formData, setFormData] = useState({
    hairdresserId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    message: '',
    isAllDay: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      hairdresserId: parseInt(formData.hairdresserId),
      date: formData.date,
      startTime: formData.isAllDay ? null : formData.startTime,
      endTime: formData.isAllDay ? null : formData.endTime,
      message: formData.message
    });
    
    setFormData({
      hairdresserId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '',
      endTime: '',
      message: '',
      isAllDay: false
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni İstisna Ekle">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kuaför</label>
            <Select
              value={formData.hairdresserId}
              onChange={(e) => setFormData(prev => ({ ...prev, hairdresserId: e.target.value }))}
              required
            >
              <option value="">Kuaför Seçin</option>
              {hairdressers.map(hairdresser => (
                <option key={hairdresser.id} value={hairdresser.id}>
                  {hairdresser.firstName} {hairdresser.lastName}
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tarih</label>
            <Input
              type="date"
              value={formData.date}
              placeholder="Tarih Seçin"
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isAllDay}
              onChange={(e) => setFormData(prev => ({ ...prev, isAllDay: e.target.checked }))}
            />
            <span className="text-sm font-medium">Tüm gün kapalı</span>
          </label>
        </div>

        {!formData.isAllDay && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Başlangıç Saati</label>
              <Input
                type="time"
                value={formData.startTime}
                placeholder={"Başlangıç Saati"}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bitiş Saati</label>
              <Input
                type="time"
                value={formData.endTime}
                placeholder={"Bitiş Saati"}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Açıklama (İsteğe bağlı)</label>
          <Input
            placeholder="Örn: Hastalık izni, özel randevu..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            İstisna Ekle
          </Button>
        </div>
      </form>
    </Modal>
  );
}