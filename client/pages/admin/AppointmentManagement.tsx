import { useState, useMemo, useEffect } from "react"; // useEffect eklendi
import {
  Calendar,
  Users,
  Scissors,
  Clock,
  Filter,
  Search,
  Plus,
  Eye,
  Check,
  X,
  Edit,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Star,
  MessageCircle,
  Bell,
  MoreVertical,
  Save
} from "lucide-react";

// Mock Components
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

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card/95 border border-border/40 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm animate-in fade-in-0 zoom-in-95">
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
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    customerName: "Ahmet Yılmaz",
    customerPhone: "0532 XXX XX 11",
    customerEmail: "ahmet@example.com",
    stylist: "Duran Koçak",
    service: "Fade Cut",
    price: "₺200",
    date: "2024-09-25",
    time: "10:00",
    status: "pending",
    notes: "Sakal da kesilecek",
    customerPreferences: ["Kısa saç", "Modern stil"],
    createdAt: "2024-09-24T15:30:00",
  },
  {
    id: 2,
    customerName: "Mehmet Demir",
    customerPhone: "0543 XXX XX 22",
    customerEmail: "mehmet@example.com",
    stylist: "Deniz Haznedar",
    service: "Klasik Erkek",
    price: "₺150",
    date: "2024-09-25",
    time: "14:30",
    status: "confirmed",
    notes: "",
    customerPreferences: ["Klasik stil"],
    createdAt: "2024-09-23T09:15:00",
  },
  {
    id: 3,
    customerName: "Ali Kaya",
    customerPhone: "0555 XXX XX 33",
    customerEmail: "ali@example.com",
    stylist: "Feyzullah",
    service: "Undercut",
    price: "₺180",
    date: "2024-09-25",
    time: "16:00",
    status: "completed",
    notes: "Müşteri çok memnun kaldı",
    customerPreferences: ["Undercut", "Sakal"],
    createdAt: "2024-09-22T12:45:00",
  },
  {
    id: 4,
    customerName: "Can Özdemir",
    customerPhone: "0536 XXX XX 44",
    customerEmail: "can@example.com",
    stylist: "Duran Koçak",
    service: "Pompadour",
    price: "₺180",
    date: "2024-09-26",
    time: "11:00",
    status: "pending",
    notes: "İlk defa gelecek",
    customerPreferences: ["Pompadour", "Wax"],
    createdAt: "2024-09-24T18:20:00",
  },
  {
    id: 5,
    customerName: "Emre Şahin",
    customerPhone: "0544 XXX XX 55",
    customerEmail: "emre@example.com",
    stylist: "Deniz Haznedar",
    service: "Buzz Cut",
    price: "₺120",
    date: "2024-09-26",
    time: "15:30",
    status: "cancelled",
    notes: "Müşteri iptal etti",
    customerPreferences: ["Buzz Cut"],
    createdAt: "2024-09-21T16:10:00",
  },
  {
    id: 6,
    customerName: "Burak Arslan",
    customerPhone: "0537 XXX XX 66",
    customerEmail: "burak@example.com",
    stylist: "Feyzullah",
    service: "Sakal Düzeltme",
    price: "₺80",
    date: "2024-09-27",
    time: "13:00",
    status: "confirmed",
    notes: "",
    customerPreferences: ["Sakal bakımı"],
    createdAt: "2024-09-25T08:30:00",
  },
];

const STYLISTS = [
  { id: "all", name: "Tüm Kuaförler" },
  { id: "duran", name: "Duran Koçak" },
  { id: "deniz", name: "Deniz Haznedar" },
  { id: "feyzullah", name: "Feyzullah" },
];

const SERVICES = [
  { id: "all", name: "Tüm Hizmetler" },
  { id: "fade", name: "Fade Cut" },
  { id: "classic", name: "Klasik Erkek" },
  { id: "undercut", name: "Undercut" },
  { id: "pompadour", name: "Pompadour" },
  { id: "buzz", name: "Buzz Cut" },
  { id: "beard", name: "Sakal Düzeltme" },
];

const STATUS_CONFIG = {
  pending: {
    label: "Bekliyor",
    color: "bg-orange-100 text-orange-600",
    icon: AlertCircle,
  },
  confirmed: {
    label: "Onaylandı",
    color: "bg-blue-100 text-blue-600",
    icon: CheckCircle,
  },
  completed: {
    label: "Tamamlandı",
    color: "bg-green-100 text-green-600",
    icon: CheckCircle,
  },
  cancelled: {
    label: "İptal",
    color: "bg-red-100 text-red-600",
    icon: XCircle,
  },
};

// =================================================================
// YENİ EKLENDİ: Yeni Randevu Ekleme Modalı
// =================================================================
function AddAppointmentModal({ isOpen, onClose, onSave, stylists }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    stylist: stylists.find(s => s.id !== 'all')?.name || '',
    time: '',
    status: 'confirmed', // Otomatik 'Onaylandı' seçili
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      ...formData,
      customerName: `${formData.firstName} ${formData.lastName}`,
    };
    onSave(newAppointment);
    // Formu sıfırlayıp kapatabilirsiniz
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      stylist: stylists.find(s => s.id !== 'all')?.name || '',
      time: '',
      status: 'confirmed',
      date: '',
    });
  };
  
  // Kuaför listesinden 'Tüm Kuaförler' seçeneğini çıkar
  const availableStylists = stylists.filter(s => s.id !== 'all');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Randevu Oluştur">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="firstName" placeholder="Müşteri Adı" value={formData.firstName} onChange={handleChange} required />
            <Input name="lastName" placeholder="Müşteri Soyadı" value={formData.lastName} onChange={handleChange} required />
          </div>
          <Input name="email" type="email" placeholder="Müşteri E-Postası" value={formData.email} onChange={handleChange} required />
          <Input name="phone" type="tel" placeholder="Müşteri Telefon Numarası" value={formData.phone} onChange={handleChange} required />
          <div >
            <Select name="stylist" value={formData.stylist} onChange={handleChange}>
              {availableStylists.map(stylist => (
                <option key={stylist.id} value={stylist.name}>{stylist.name}</option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="date" type="date" placeholder="Randevu Saati" value={formData.date} onChange={handleChange} required />
            <Input name="time" type="time" placeholder="Randevu Saati" value={formData.time} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Onay Durumu</label>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <option value="confirmed">Onaylanmış</option>
              <option value="pending">Bekliyor</option>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Randevu Oluştur
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// =================================================================
// YENİ EKLENDİ: Randevu Düzenleme Modalı
// =================================================================
function EditAppointmentModal({ isOpen, onClose, onSave, appointment, stylists }) {
  const [formData, setFormData] = useState({
    stylist: '',
    time: '',
    date: ''
  });

  useEffect(() => {
    // Modal açıldığında mevcut randevu bilgileriyle formu doldur
    if (appointment) {
      setFormData({
        stylist: appointment.stylist,
        time: appointment.time,
        date: appointment.date,
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...appointment, ...formData });
  };

  // Kuaför listesinden 'Tüm Kuaförler' seçeneğini çıkar
  const availableStylists = stylists.filter(s => s.id !== 'all');
  
  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Randevu Düzenle: ${appointment.customerName}`}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kuaför</label>
            <Select name="stylist" value={formData.stylist} onChange={handleChange}>
              {availableStylists.map(stylist => (
                <option key={stylist.id} value={stylist.name}>{stylist.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tarih</label>
            <Input name="date" type="date" placeholder="Randevu Tarihi" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Saat</label>
            <Input name="time" type="time" placeholder="Randevu Saati" value={formData.time} onChange={handleChange} required />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Güncelle
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AppointmentManagement() {
  const [view, setView] = useState("list"); // list, calendar
  const [selectedDate, setSelectedDate] = useState("2024-09-25");
  const [filters, setFilters] = useState({
    search: "",
    stylist: "all",
    service: "all",
    status: "all",
    dateRange: "today",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // YENİ EKLENDİ: Modal state'leri
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Filter appointments based on current filters
  const filteredAppointments = useMemo(() => {
    return MOCK_APPOINTMENTS.filter((appointment) => {
      const matchesSearch =
        !filters.search ||
        appointment.customerName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        appointment.customerPhone.includes(filters.search) ||
        appointment.customerEmail
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStylist =
        filters.stylist === "all" ||
        appointment.stylist.toLowerCase().includes(filters.stylist.toLowerCase());

      const matchesService =
        filters.service === "all" ||
        appointment.service.toLowerCase().includes(filters.service.toLowerCase());

      const matchesStatus =
        filters.status === "all" || appointment.status === filters.status;

      let matchesDate = true;
      if (filters.dateRange === "today") {
        matchesDate = appointment.date === selectedDate;
      } else if (filters.dateRange === "week") {
        // Simple week filter - in real app would be more sophisticated
        matchesDate = true;
      }

      return (
        matchesSearch &&
        matchesStylist &&
        matchesService &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [MOCK_APPOINTMENTS, filters, selectedDate]);

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
    // In real app, would update the appointment status
  };
  
  // YENİ EKLENDİ: Yeni randevu ekleme handler'ı
  const handleAddAppointment = (newAppointmentData) => {
    console.log("Yeni Randevu Eklenecek:", {
      id: Date.now(), // Geçici ID
      ...newAppointmentData,
      date: new Date().toISOString().split('T')[0], // Bugünün tarihi
      price: '₺150', // Örnek fiyat
      service: 'Klasik Erkek', // Örnek hizmet
    });
    // Gerçek uygulamada burada state'i güncellersiniz:
    // setAppointments(prev => [...prev, newAppointmentObject]);
    setIsAddModalOpen(false); // Modalı kapat
  };

  // YENİ EKLENDİ: Randevu güncelleme handler'ı
  const handleUpdateAppointment = (updatedAppointment) => {
    console.log("Randevu Güncellenecek:", updatedAppointment);
    // Gerçek uygulamada burada state'i güncellersiniz:
    // setAppointments(prev => prev.map(app => app.id === updatedAppointment.id ? updatedAppointment : app));
    setEditingAppointment(null); // Modalı kapat
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
                <h1 className="text-2xl font-bold">Randevu Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  {filteredAppointments.length} randevu listeleniyor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Takvim
              </Button>
              {/* GÜNCELLENDİ: Yeni randevu butonu artık modalı açıyor */}
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Randevu
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Müşteri adı, telefon veya e-posta ara..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtreler
              {(filters.stylist !== "all" ||
                filters.service !== "all" ||
                filters.status !== "all") && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-card/60 border border-border/40 rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kuaför
                  </label>
                  <Select
                    value={filters.stylist}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        stylist: e.target.value,
                      }))
                    }
                  >
                    {STYLISTS.map((stylist) => (
                      <option key={stylist.id} value={stylist.id}>
                        {stylist.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hizmet
                  </label>
                  <Select
                    value={filters.service}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        service: e.target.value,
                      }))
                    }
                  >
                    {SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Durum
                  </label>
                  <Select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="pending">Bekliyor</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">İptal</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tarih
                  </label>
                  <Select
                    value={filters.dateRange}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: e.target.value,
                      }))
                    }
                  >
                    <option value="today">Bugün</option>
                    <option value="week">Bu Hafta</option>
                    <option value="month">Bu Ay</option>
                    <option value="all">Tüm Tarihler</option>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on view */}
        {view === "list" ? (
          <AppointmentList
            appointments={filteredAppointments}
            onViewDetails={setSelectedAppointment}
            onStatusChange={handleStatusChange}
            onEdit={setEditingAppointment} // GÜNCELLENDİ: onEdit prop'u eklendi
          />
        ) : (
          <CalendarView
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onViewDetails={setSelectedAppointment}
          />
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStatusChange={handleStatusChange}
        />
      )}
      
      {/* YENİ EKLENDİ: Yeni randevu ve düzenleme modallarının render edilmesi */}
      <AddAppointmentModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAppointment}
        stylists={STYLISTS}
      />
      
      {editingAppointment && (
        <EditAppointmentModal
          isOpen={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSave={handleUpdateAppointment}
          appointment={editingAppointment}
          stylists={STYLISTS}
        />
      )}

    </div>
  );
}

// GÜNCELLENDİ: onEdit prop'u AppointmentList'e eklendi
function AppointmentList({ appointments, onViewDetails, onStatusChange, onEdit }) {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Randevu bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla randevu görebilirsiniz
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/60 border border-border/40 rounded-2xl backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card/80 border-b border-border/20">
            <tr>
              <th className="text-left p-4 font-semibold">Müşteri</th>
              <th className="text-left p-4 font-semibold">Kuaför</th>
              <th className="text-left p-4 font-semibold">Hizmet</th>
              <th className="text-left p-4 font-semibold">Tarih & Saat</th>
              <th className="text-left p-4 font-semibold">Durum</th>
              <th className="text-left p-4 font-semibold">Ücret</th>
              <th className="text-right p-4 font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`hover:bg-card/40 transition-colors duration-200 ${
                  index !== appointments.length - 1
                    ? "border-b border-border/10"
                    : ""
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.customerPhone}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-primary" />
                    <span className="font-medium">{appointment.stylist}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {appointment.service}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString(
                          "tr-TR"
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="p-4">
                  <span className="font-semibold text-primary">
                    {appointment.price}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(appointment)}
                      title="Detayları Görüntüle"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    {/* YENİ EKLENDİ: Düzenle butonu */}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onEdit(appointment)}
                      title="Randevuyu Düzenle"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    {appointment.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            onStatusChange(appointment.id, "confirmed")
                          }
                          title="Onayla"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            onStatusChange(appointment.id, "cancelled")
                          }
                          title="İptal Et"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================================
// Buradan sonraki kodda değişiklik yapılmamıştır.
// =====================================================================

function CalendarView({ selectedDate, onDateChange, onViewDetails }) {
  const appointments = MOCK_APPOINTMENTS.filter(app => app.date === selectedDate);
  
  // Generate calendar days (simplified - in real app would be more robust)
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = -3; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date: dateString,
        day: date.getDate(),
        dayName: date.toLocaleDateString('tr-TR', { weekday: 'short' }),
        isSelected: dateString === selectedDate,
        isToday: dateString === today.toISOString().split('T')[0],
        appointmentCount: MOCK_APPOINTMENTS.filter(app => app.date === dateString).length
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Tarih Seçimi</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {calendarDays.map((day) => (
            <div
              key={day.date}
              onClick={() => onDateChange(day.date)}
              className={`flex-shrink-0 p-4 rounded-xl text-center cursor-pointer transition-all duration-300 min-w-[80px] ${
                day.isSelected 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-background/60 hover:bg-primary/10 hover:border-primary/20"
              }`}
            >
              <div className="text-sm font-medium">{day.dayName}</div>
              <div className="text-2xl font-bold my-1">{day.day}</div>
              {day.appointmentCount > 0 && (
                <div className={`text-xs px-2 py-1 rounded-full ${
                  day.isSelected ? "bg-white/20" : "bg-primary/10 text-primary"
                }`}>
                  {day.appointmentCount} randevu
                </div>
              )}
              {day.isToday && !day.isSelected && (
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-card/60 border border-border/40 rounded-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-border/20">
          <h3 className="font-semibold text-lg">
            {new Date(selectedDate).toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-muted-foreground">{appointments.length} randevu</p>
        </div>
        
        <div className="p-6">
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Bu tarih için randevu bulunmuyor</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center gap-4 p-4 bg-background/60 rounded-xl hover:bg-card/40 transition-colors duration-200 cursor-pointer"
                  onClick={() => onViewDetails(appointment)}
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-lg font-bold">{appointment.time}</div>
                  </div>
                  
                  <div className="w-px h-12 bg-border/40"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{appointment.customerName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.stylist} • {appointment.service}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <StatusBadge status={appointment.status} />
                        <span className="font-semibold text-primary">{appointment.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function AppointmentDetailModal({
  appointment,
  isOpen,
  onClose,
  onStatusChange,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Randevu Detayları">
      <div className="p-6 space-y-6">
        {/* Customer Info */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Müşteri Bilgileri
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Ad Soyad</label>
              <p className="font-medium">{appointment.customerName}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Telefon</label>
              <p className="font-medium flex items-center gap-2">
                {appointment.customerPhone}
                <Button size="sm" variant="outline">
                  <Phone className="w-3 h-3" />
                </Button>
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-muted-foreground">E-posta</label>
              <p className="font-medium flex items-center gap-2">
                {appointment.customerEmail}
                <Button size="sm" variant="outline">
                  <Mail className="w-3 h-3" />
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            Randevu Bilgileri
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Kuaför</label>
              <p className="font-medium">{appointment.stylist}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Hizmet</label>
              <p className="font-medium">{appointment.service}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Tarih</label>
              <p className="font-medium">
                {new Date(appointment.date).toLocaleDateString("tr-TR")}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Saat</label>
              <p className="font-medium">{appointment.time}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Ücret</label>
              <p className="font-medium text-primary">{appointment.price}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Durum</label>
              <StatusBadge status={appointment.status} />
            </div>
          </div>
        </div>

        {/* Notes & Preferences */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Notlar & Müşteri Tercihleri
          </h4>
          <div className="space-y-2">
            {appointment.notes && (
              <p className="text-sm text-muted-foreground">
                Not: {appointment.notes}
              </p>
            )}
            {appointment.customerPreferences?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {appointment.customerPreferences.map((pref, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Change Buttons */}
        <div className="flex gap-3 justify-end">
          {appointment.status === "pending" && (
            <>
              <Button
                variant="success"
                onClick={() => onStatusChange(appointment.id, "confirmed")}
              >
                <Check className="w-4 h-4 mr-1" />
                Onayla
              </Button>
              <Button
                variant="danger"
                onClick={() => onStatusChange(appointment.id, "cancelled")}
              >
                <X className="w-4 h-4 mr-1" />
                İptal Et
              </Button>
            </>
          )}
          {appointment.status === "confirmed" && (
            <Button
              variant="success"
              onClick={() => onStatusChange(appointment.id, "completed")}
            >
              <Check className="w-4 h-4 mr-1" />
              Tamamlandı
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
        </div>
      </div>
    </Modal>
  );
}