import { useState, useMemo } from "react";
import {
  Calendar,
  Users,
  Scissors,
  Clock,
  Filter,
  Plus,
  Eye,
  Check,
  X,
  Grid3X3,
  List,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Menu
} from "lucide-react";

// Mock data for appointments
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    customerName: "Ali Veli",
    customerPhone: "5551234567",
    customerEmail: "ali@example.com",
    stylist: "1",
    service: "1",
    status: "pending",
    date: "2024-09-25",
    time: "10:00"
  },
  {
    id: 2,
    customerName: "Ayşe Fatma",
    customerPhone: "5559876543",
    customerEmail: "ayse@example.com",
    stylist: "2",
    service: "2",
    status: "confirmed",
    date: "2024-09-25",
    time: "11:00"
  }
  // Add more mock appointments as needed
];

// Mock data for stylists and services
const STYLISTS = [
  { id: "all", name: "Tüm Stilistler" },
  { id: "1", name: "Ali" },
  { id: "2", name: "Ayşe" }
];

const SERVICES = [
  { id: "all", name: "Tüm Servisler" },
  { id: "1", name: "Saç Kesimi" },
  { id: "2", name: "Manikür" }
];

// Mock Components (Button, Input, Select, Modal) burada önceki kodla aynı

export default function AppointmentManagementSidebar() {
  const [view, setView] = useState("list"); // list veya calendar
  const [selectedDate, setSelectedDate] = useState("2024-09-25");
  const [filters, setFilters] = useState({
    search: "",
    stylist: "all",
    service: "all",
    status: "all",
    dateRange: "today"
  });

  const Button = ({ children, ...props }: any) => <button {...props}>{children}</button>;
const Input = ({ ...props }: any) => <input {...props} />;
const Select = ({ children, ...props }: any) => <select {...props}>{children}</select>;


  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredAppointments = useMemo(() => {
    return MOCK_APPOINTMENTS.filter(appointment => {
      const matchesSearch =
        !filters.search ||
        appointment.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        appointment.customerPhone.includes(filters.search) ||
        appointment.customerEmail.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStylist =
        filters.stylist === "all" || appointment.stylist.toLowerCase().includes(filters.stylist.toLowerCase());
      const matchesService =
        filters.service === "all" || appointment.service.toLowerCase().includes(filters.service.toLowerCase());
      const matchesStatus =
        filters.status === "all" || appointment.status === filters.status;
      let matchesDate = true;
      if (filters.dateRange === "today") {
        matchesDate = appointment.date === selectedDate;
      }
      return matchesSearch && matchesStylist && matchesService && matchesStatus && matchesDate;
    });
  }, [filters, selectedDate]);

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background/95 to-card/20">
      {/* Sidebar */}
      <div className={`bg-card/60 border-r border-border/40 p-6 space-y-6 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Filtreler</h2>
          <Button  size="sm" variant="outline" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <Input
          placeholder="Müşteri ara..."
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
        <Select value={filters.stylist} onChange={e => setFilters(prev => ({ ...prev, stylist: e.target.value }))}>
          {STYLISTS.map(stylist => (
            <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
          ))}
        </Select>
        <Select value={filters.service} onChange={e => setFilters(prev => ({ ...prev, service: e.target.value }))}>
          {SERVICES.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </Select>
        <Select value={filters.status} onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}>
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="confirmed">Onaylandı</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal</option>
        </Select>
        <Select value={filters.dateRange} onChange={e => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}>
          <option value="today">Bugün</option>
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
          <option value="all">Tüm Tarihler</option>
        </Select>

        <div className="space-y-2">
          <Button fullWidth onClick={() => setView("list")}>
            <List className="w-4 h-4 mr-2" /> Liste
          </Button>
          <Button fullWidth onClick={() => setView("calendar")}>
            <Grid3X3 className="w-4 h-4 mr-2" /> Takvim
          </Button>
          <Button fullWidth>
            <Plus className="w-4 h-4 mr-2" /> Yeni Randevu
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <Button size="sm" variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Randevu Yönetimi</h1>
          <p className="text-muted-foreground">{filteredAppointments.length} randevu listeleniyor</p>
        </div>

        {/* {view === "list" ? (
          <AppointmentList
            appointments={filteredAppointments}
            onViewDetails={setSelectedAppointment}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <CalendarView
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onViewDetails={setSelectedAppointment}
          />
        )} */}
      </div>

      {/* Appointment Detail Modal */}
      {/* {selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStatusChange={handleStatusChange}
        />
      )} */}
    </div>
  );
}
