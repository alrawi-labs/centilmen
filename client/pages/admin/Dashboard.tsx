import { useState } from "react";
import {
  Calendar,
  Users,
  Scissors,
  Clock,
  TrendingUp,
  Bell,
  Plus,
  BarChart3,
  PieChart,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Star,
  Eye,
  Filter,
  Search,
  MoreVertical,
  Settings
} from "lucide-react";
import AppointmentDetailModal from "@/components/admin/ui/AppointmentDetailModal"; // 1. Modal import edildi

// Mock Components (using your existing styles)
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
        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
    } ${size === "lg" ? "px-8 py-4 text-lg" : size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-card/60 border border-border/40 rounded-2xl backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-border/20 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Mock Data
const DASHBOARD_STATS = {
  today: {
    appointments: 12,
    completed: 8,
    pending: 4,
    revenue: "₺2,400"
  },
  week: {
    appointments: 89,
    completed: 72,
    pending: 17,
    revenue: "₺15,680"
  },
  month: {
    appointments: 324,
    completed: 298,
    pending: 26,
    revenue: "₺58,920"
  }
};

const PENDING_APPOINTMENTS = [
  {
    id: 1,
    customerName: "Ahmet Yılmaz",
    phone: "0532 XXX XX XX",
    stylist: "Duran Koçak",
    service: "Fade Cut",
    time: "14:30",
    date: "Bugün",
    price: "₺200",
    status: "pending",
    notes: "Sakal da kesilecek.",
    customerEmail: "ahmet@example.com",
    duration: "45 dk",
    createdAt: "2024-09-24T15:30:00",
    updatedAt: "2024-09-24T16:45:00",
    // EKSİK OLAN KISIM BURASIYDI
    serviceDetails: {
      basePrice: "₺150",
      extras: [{ name: "Sakal Düzeltme", price: "₺50" }],
      discount: "₺0",
      total: "₺200"
    }
  },
  {
    id: 2,
    customerName: "Mehmet Demir",
    phone: "0543 XXX XX XX",
    stylist: "Deniz Haznedar",
    service: "Klasik Erkek",
    time: "15:00",
    date: "Bugün",
    price: "₺150",
    status: "pending",
    notes: "Sadece saç kesimi.",
    customerEmail: "mehmet@example.com",
    duration: "30 dk",
    createdAt: "2024-09-25T11:00:00",
    updatedAt: "2024-09-25T11:00:00",
    // EKSİK OLAN KISIM BURASIYDI
    serviceDetails: {
      basePrice: "₺150",
      extras: [],
      discount: "₺0",
      total: "₺150"
    }
  },
  {
    id: 3,
    customerName: "Ali Kaya",
    phone: "0555 XXX XX XX",
    stylist: "Feyzullah",
    service: "Sakal Düzeltme",
    time: "16:00",
    date: "Yarın",
    price: "₺80",
    status: "pending",
    notes: "",
    customerEmail: "ali@example.com",
    duration: "20 dk",
    createdAt: "2024-09-25T14:20:00",
    updatedAt: "2024-09-25T14:20:00",
    // EKSİK OLAN KISIM BURASIYDI
    serviceDetails: {
      basePrice: "₺80",
      extras: [],
      discount: "₺0",
      total: "₺80"
    }
  }
];

const POPULAR_SERVICES = [
  { name: "Fade Cut", count: 45, percentage: 32, revenue: "₺9,000" },
  { name: "Klasik Erkek", count: 38, percentage: 27, revenue: "₺5,700" },
  { name: "Undercut", count: 28, percentage: 20, revenue: "₺5,040" },
  { name: "Sakal Düzeltme", count: 21, percentage: 15, revenue: "₺1,680" },
  { name: "Pompadour", count: 8, percentage: 6, revenue: "₺1,440" }
];

const STAFF_PERFORMANCE = [
  {
    name: "Duran Koçak",
    appointments: 42,
    completion: 98,
    rating: 4.9,
    revenue: "₺8,400"
  },
  {
    name: "Deniz Haznedar",
    appointments: 35,
    completion: 94,
    rating: 4.8,
    revenue: "₺6,300"
  },
  {
    name: "Feyzullah",
    appointments: 28,
    completion: 96,
    rating: 4.7,
    revenue: "₺4,480"
  }
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // 2. Modal'ın durumunu yönetmek için state'ler
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const currentStats = DASHBOARD_STATS[selectedPeriod];
  const occupancyRate = Math.round((currentStats.completed / currentStats.appointments) * 100);

  // 3. Modal'ı açmak ve kapatmak için fonksiyonlar
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
        {/* Header */}
        <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground text-sm">Kuaför Yönetim Paneli</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Bildirimler
                  <span className="ml-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Ayarlar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Period Selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {[
                { key: "today", label: "Bugün" },
                { key: "week", label: "Bu Hafta" },
                { key: "month", label: "Bu Ay" }
              ].map((period) => (
                <Button
                  key={period.key}
                  variant={selectedPeriod === period.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.key)}
                >
                  {period.label}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="relative"
              >
                <Plus className="w-4 h-4 mr-2" />
                Hızlı İşlemler
              </Button>
            </div>
          </div>

          {/* Quick Actions Dropdown */}
          {showQuickActions && (
            <div className="fixed top-20 right-6 z-50 bg-card/90 border border-border/40 rounded-2xl p-4 backdrop-blur-sm shadow-2xl animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="w-4 h-4 mr-3" />
                  Yeni Randevu Ekle
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <User className="w-4 h-4 mr-3" />
                  Yeni Müşteri Ekle
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-3" />
                  Çalışan Ekle
                </Button>
              </div>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Toplam Randevu"
              value={currentStats.appointments}
              icon={Calendar}
              color="primary"
              trend="+12%"
            />
            <StatCard
              title="Tamamlanan"
              value={currentStats.completed}
              icon={CheckCircle}
              color="success"
              trend="+8%"
            />
            <StatCard
              title="Onay Bekleyen"
              value={currentStats.pending}
              icon={AlertCircle}
              color="warning"
              trend="-3%"
            />
            <StatCard
              title="Gelir"
              value={currentStats.revenue}
              icon={TrendingUp}
              color="primary"
              trend="+15%"
            />
          </div>

          {/* Occupancy Rate */}
          <div className="mb-8">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Doluluk Oranı</h3>
                  <span className="text-2xl font-bold text-primary">{occupancyRate}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/70 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${occupancyRate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentStats.completed} / {currentStats.appointments} randevu tamamlandı
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pending Appointments */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Onay Bekleyen Randevular</h3>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      {PENDING_APPOINTMENTS.length} bekliyor
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {PENDING_APPOINTMENTS.map((appointment, index) => (
                      <div key={appointment.id} className={`p-6 ${index !== PENDING_APPOINTMENTS.length - 1 ? 'border-b border-border/20' : ''} hover:bg-card/40 transition-colors duration-200`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{appointment.customerName}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                              <p className="text-sm">
                                <span className="text-primary font-medium">{appointment.stylist}</span> • 
                                <span className="ml-1">{appointment.service}</span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{appointment.date} - {appointment.time}</p>
                            <p className="text-sm text-muted-foreground">{appointment.price}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="success" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Onayla
                              </Button>
                              {/* 4. Butona onClick olayı eklendi */}
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => handleOpenModal(appointment)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Detay
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Services */}
            <div>
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-lg">Popüler Hizmetler</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {POPULAR_SERVICES.map((service, index) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{service.name}</span>
                            <span className="text-xs text-muted-foreground">{service.count} adet</span>
                          </div>
                          <div className="w-full bg-muted/20 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                index === 0 ? 'bg-primary' : 
                                index === 1 ? 'bg-blue-500' : 
                                index === 2 ? 'bg-green-500' : 
                                index === 3 ? 'bg-orange-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${service.percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">%{service.percentage}</span>
                            <span className="text-xs font-medium text-primary">{service.revenue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Staff Performance */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-lg">Personel Performansı</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {STAFF_PERFORMANCE.map((staff) => (
                    <div key={staff.name} className="bg-background/60 rounded-2xl p-6 space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Scissors className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold">{staff.name}</h4>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{staff.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Randevular</span>
                          <span className="font-semibold">{staff.appointments}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Tamamlama</span>
                          <span className="font-semibold text-green-600">%{staff.completion}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Gelir</span>
                          <span className="font-semibold text-primary">{staff.revenue}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border/20">
                        <Button size="sm" variant="outline" className="w-full">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Detayları Gör
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Button className="px-8">
              <Calendar className="w-4 h-4 mr-2" />
              Randevu Yönetimi
            </Button>
            <Button variant="outline" className="px-8">
              <Users className="w-4 h-4 mr-2" />
              Müşteri Yönetimi
            </Button>
            <Button variant="outline" className="px-8">
              <BarChart3 className="w-4 h-4 mr-2" />
              Detaylı Raporlar
            </Button>
          </div>
        </div>
      </div>
      
      {/* 5. Modal'ı koşullu olarak render et */}
      {selectedAppointment && (
        <AppointmentDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          appointment={selectedAppointment}
          // onStatusChange prop'unu isteğe bağlı olarak ekleyebilirsiniz
        />
      )}
    </>
  );
}

function StatCard({ title, value, icon: Icon, color, trend }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p className={`text-sm mt-1 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
              {trend} önceki döneme göre
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          color === 'success' ? 'bg-green-500/10' :
          color === 'warning' ? 'bg-orange-500/10' :
          'bg-primary/10'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'success' ? 'text-green-600' :
            color === 'warning' ? 'text-orange-600' :
            'text-primary'
          }`} />
        </div>
      </CardContent>
    </Card>
  );
}