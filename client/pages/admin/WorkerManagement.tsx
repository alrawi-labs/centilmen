import { useState, useMemo } from "react";
import {
  Users,
  User,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Activity,
  Shield,
  ShieldCheck,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Scissors,
  BarChart3,
  Target,
  Award
} from "lucide-react";

// Mock Components (same as original)
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
const MOCK_EMPLOYEES = [
  {
    id: 1,
    firstName: "Duran",
    lastName: "Koçak",
    email: "duran@berberturkiye.com",
    phone: "0532 XXX XX 01",
    role: "Senior Kuaför",
    isActive: true,
    joinDate: "2023-01-15",
    avatar: null,
    permissions: ["appointments", "customers", "reports"],
    stats: {
      totalAppointments: 156,
      completedAppointments: 148,
      pendingAppointments: 5,
      cancelledAppointments: 3,
      rating: 4.8,
      completionRate: 94.9,
      monthlyRevenue: 12400
    }
  },
  {
    id: 2,
    firstName: "Deniz",
    lastName: "Haznedar",
    email: "deniz@berberturkiye.com",
    phone: "0543 XXX XX 02",
    role: "Kuaför",
    isActive: true,
    joinDate: "2023-03-20",
    avatar: null,
    permissions: ["appointments", "customers"],
    stats: {
      totalAppointments: 134,
      completedAppointments: 125,
      pendingAppointments: 7,
      cancelledAppointments: 2,
      rating: 4.6,
      completionRate: 93.3,
      monthlyRevenue: 10200
    }
  },
  {
    id: 3,
    firstName: "Feyzullah",
    lastName: "Acar",
    email: "feyzullah@berberturkiye.com",
    phone: "0555 XXX XX 03",
    role: "Junior Kuaför",
    isActive: true,
    joinDate: "2023-07-10",
    avatar: null,
    permissions: ["appointments"],
    stats: {
      totalAppointments: 89,
      completedAppointments: 82,
      pendingAppointments: 4,
      cancelledAppointments: 3,
      rating: 4.4,
      completionRate: 92.1,
      monthlyRevenue: 7800
    }
  },
  {
    id: 4,
    firstName: "Mehmet",
    lastName: "Özkan",
    email: "mehmet@berberturkiye.com",
    phone: "0536 XXX XX 04",
    role: "Kuaför",
    isActive: false,
    joinDate: "2022-11-05",
    avatar: null,
    permissions: ["appointments", "customers"],
    stats: {
      totalAppointments: 67,
      completedAppointments: 60,
      pendingAppointments: 0,
      cancelledAppointments: 7,
      rating: 4.2,
      completionRate: 89.6,
      monthlyRevenue: 0
    }
  }
];

const MOCK_UPCOMING_APPOINTMENTS = [
  { id: 1, employeeId: 1, customerName: "Ahmet Yılmaz", service: "Fade Cut", time: "10:00", status: "confirmed" },
  { id: 2, employeeId: 1, customerName: "Can Özdemir", service: "Pompadour", time: "11:00", status: "pending" },
  { id: 3, employeeId: 2, customerName: "Mehmet Demir", service: "Klasik Erkek", time: "14:30", status: "confirmed" },
  { id: 4, employeeId: 2, customerName: "Emre Şahin", service: "Buzz Cut", time: "15:30", status: "pending" },
  { id: 5, employeeId: 3, customerName: "Burak Arslan", service: "Sakal Düzeltme", time: "13:00", status: "confirmed" }
];

const ROLE_OPTIONS = [
  { value: "Senior Kuaför", label: "Senior Kuaför" },
  { value: "Kuaför", label: "Kuaför" },
  { value: "Junior Kuaför", label: "Junior Kuaför" },
  { value: "Berber", label: "Berber" },
  { value: "Asistan", label: "Asistan" }
];

const PERMISSION_OPTIONS = [
  { value: "appointments", label: "Randevu Yönetimi", desc: "Randevuları görüntüleme ve yönetme" },
  { value: "customers", label: "Müşteri Yönetimi", desc: "Müşteri bilgilerini görüntüleme ve düzenleme" },
  { value: "reports", label: "Raporlar", desc: "Performans raporlarını görüntüleme" },
  { value: "settings", label: "Ayarlar", desc: "Sistem ayarlarına erişim" },
  { value: "employees", label: "Çalışan Yönetimi", desc: "Diğer çalışanları yönetme" }
];

export default function EmployeeManagement() {
  const [view, setView] = useState("list"); // list, performance
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all"
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = !filters.search || 
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.phone.includes(filters.search);
      
      const matchesRole = filters.role === "all" || employee.role === filters.role;
      const matchesStatus = filters.status === "all" || 
        (filters.status === "active" && employee.isActive) ||
        (filters.status === "inactive" && !employee.isActive);
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, filters]);

  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      joinDate: new Date().toISOString().split('T')[0],
      stats: {
        totalAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0,
        cancelledAppointments: 0,
        rating: 0,
        completionRate: 0,
        monthlyRevenue: 0
      }
    };
    setEmployees(prev => [...prev, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employeeData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp
    ));
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Bu çalışanı silmek istediğinizden emin misiniz?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    }
  };

  const handleToggleStatus = (employeeId) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId ? { ...emp, isActive: !emp.isActive } : emp
    ));
  };

  const getEmployeeAppointments = (employeeId) => {
    return MOCK_UPCOMING_APPOINTMENTS.filter(apt => apt.employeeId === employeeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Çalışan Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  {filteredEmployees.length} çalışan listeleniyor
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
              >
                <Users className="w-4 h-4 mr-2" />
                Çalışanlar
              </Button>
              <Button
                variant={view === "performance" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("performance")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Performans
              </Button>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Çalışan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        {view === "list" && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex-1 min-w-64">
                <Input
                  placeholder="Çalışan adı, e-posta veya telefon ara..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtreler
                {(filters.role !== "all" || filters.status !== "all") && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </div>

            {showFilters && (
              <div className="bg-card/60 border border-border/40 rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pozisyon</label>
                    <Select
                      value={filters.role}
                      onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    >
                      <option value="all">Tüm Pozisyonlar</option>
                      {ROLE_OPTIONS.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Durum</label>
                    <Select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content based on view */}
        {view === "list" ? (
          <EmployeeList 
            employees={filteredEmployees}
            onViewDetails={(employee) => {
              setSelectedEmployee(employee);
              setShowDetailModal(true);
            }}
            onEdit={(employee) => {
              setSelectedEmployee(employee);
              setShowEditModal(true);
            }}
            onDelete={handleDeleteEmployee}
            onToggleStatus={handleToggleStatus}
            onViewPerformance={(employee) => {
              setSelectedEmployee(employee);
              setShowPerformanceModal(true);
            }}
          />
        ) : (
          <PerformanceView employees={employees} />
        )}
      </div>

      {/* Add Employee Modal */}
      <EmployeeFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddEmployee}
        title="Yeni Çalışan Ekle"
      />

      {/* Edit Employee Modal */}
      <EmployeeFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleEditEmployee}
        employee={selectedEmployee}
        title="Çalışan Düzenle"
      />

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee && showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedEmployee(null);
        }}
        appointments={selectedEmployee ? getEmployeeAppointments(selectedEmployee.id) : []}
      />

      {/* Performance Modal */}
      <PerformanceDetailModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee && showPerformanceModal}
        onClose={() => {
          setShowPerformanceModal(false);
          setSelectedEmployee(null);
        }}
      />
    </div>
  );
}

function EmployeeList({ employees, onViewDetails, onEdit, onDelete, onToggleStatus, onViewPerformance }) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Çalışan bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla çalışan görebilirsiniz
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onViewDetails={() => onViewDetails(employee)}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee.id)}
          onToggleStatus={() => onToggleStatus(employee.id)}
          onViewPerformance={() => onViewPerformance(employee)}
        />
      ))}
    </div>
  );
}

function EmployeeCard({ employee, onViewDetails, onEdit, onDelete, onToggleStatus, onViewPerformance }) {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{employee.firstName} {employee.lastName}</h3>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>
        
        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
          
          {showActions && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-card/95 border border-border/40 rounded-xl shadow-lg z-10 backdrop-blur-sm">
              <div className="p-2">
                <button
                  onClick={() => {
                    onViewDetails();
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Detayları Görüntüle
                </button>
                <button
                  onClick={() => {
                    onEdit();
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => {
                    onViewPerformance();
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Performans
                </button>
                <button
                  onClick={() => {
                    onToggleStatus();
                    setShowActions(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                    employee.isActive ? 'text-orange-600' : 'text-green-600'
                  }`}
                >
                  {employee.isActive ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  {employee.isActive ? 'Pasifleştir' : 'Aktifleştir'}
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${employee.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${employee.isActive ? 'text-green-600' : 'text-red-600'}`}>
          {employee.isActive ? 'Aktif' : 'Pasif'}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          {employee.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          {employee.phone}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{employee.stats.completedAppointments}</p>
          <p className="text-xs text-muted-foreground">Tamamlanan</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <p className="text-lg font-bold">{employee.stats.rating}</p>
          </div>
          <p className="text-xs text-muted-foreground">Puan</p>
        </div>
      </div>
    </div>
  );
}

function EmployeeFormModal({ isOpen, onClose, onSubmit, employee = null, title }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Kuaför',
    isActive: true,
    permissions: ['appointments']
  });

  // Update form data when employee prop changes
  useState(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role || 'Kuaför',
        isActive: employee.isActive ?? true,
        permissions: employee.permissions || ['appointments']
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Kuaför',
        isActive: true,
        permissions: ['appointments']
      });
    }
  },);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form if adding new employee
    if (!employee) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Kuaför',
        isActive: true,
        permissions: ['appointments']
      });
    }
  };

  const handlePermissionChange = (permission, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ad</label>
            <Input
              placeholder="Ad"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Soyad</label>
            <Input
              placeholder="Soyad"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">E-posta</label>
            <Input
              type="email"
              placeholder="E-posta adresi"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <Input
              placeholder="Telefon numarası"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Pozisyon</label>
            <Select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            >
              {ROLE_OPTIONS.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Durum</label>
            <Select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'active' }))}
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </Select>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-sm font-medium mb-4">Yetkiler</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERMISSION_OPTIONS.map(permission => (
              <div key={permission.value} className="flex items-start gap-3 p-3 bg-background/60 rounded-xl">
                <input
                  type="checkbox"
                  id={permission.value}
                  checked={formData.permissions.includes(permission.value)}
                  onChange={(e) => handlePermissionChange(permission.value, e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor={permission.value} className="font-medium text-sm cursor-pointer">
                    {permission.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{permission.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Password field for new employees */}
        {!employee && (
          <div>
            <label className="block text-sm font-medium mb-2">Şifre</label>
            <Input
              type="password"
              placeholder="Güvenli bir şifre oluşturun"
              required
            />
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            {employee ? 'Güncelle' : 'Çalışan Ekle'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EmployeeDetailModal({ employee, isOpen, onClose, appointments }) {
  if (!employee) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Çalışan Detayları" size="lg">
      <div className="p-6 space-y-6">
        {/* Employee Info */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Kişisel Bilgiler
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Ad Soyad</label>
              <p className="font-medium">{employee.firstName} {employee.lastName}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Pozisyon</label>
              <p className="font-medium">{employee.role}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">E-posta</label>
              <p className="font-medium">{employee.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Telefon</label>
              <p className="font-medium">{employee.phone}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">İşe Başlama</label>
              <p className="font-medium">{new Date(employee.joinDate).toLocaleDateString('tr-TR')}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Durum</label>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${employee.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${employee.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {employee.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Yetkiler
          </h4>
          <div className="flex flex-wrap gap-2">
            {employee.permissions.map(permission => {
              const permissionInfo = PERMISSION_OPTIONS.find(p => p.value === permission);
              return (
                <span key={permission} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {permissionInfo?.label || permission}
                </span>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{employee.stats.totalAppointments}</div>
            <div className="text-xs text-muted-foreground">Toplam Randevu</div>
          </div>
          <div className="bg-background/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{employee.stats.completedAppointments}</div>
            <div className="text-xs text-muted-foreground">Tamamlanan</div>
          </div>
          <div className="bg-background/60 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold">{employee.stats.rating}</span>
            </div>
            <div className="text-xs text-muted-foreground">Müşteri Puanı</div>
          </div>
          <div className="bg-background/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{employee.stats.completionRate}%</div>
            <div className="text-xs text-muted-foreground">Başarı Oranı</div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Bugünkü Randevular
          </h4>
          {appointments.length === 0 ? (
            <p className="text-muted-foreground text-sm">Bugün için randevu bulunmuyor</p>
          ) : (
            <div className="space-y-2">
              {appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-card/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{apt.time}</div>
                    <div className="w-px h-6 bg-border/40"></div>
                    <div>
                      <p className="font-medium text-sm">{apt.customerName}</p>
                      <p className="text-xs text-muted-foreground">{apt.service}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    apt.status === 'confirmed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {apt.status === 'confirmed' ? 'Onaylandı' : 'Bekliyor'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
          <Button variant="outline" onClick={onClose}>Kapat</Button>
        </div>
      </div>
    </Modal>
  );
}

function PerformanceDetailModal({ employee, isOpen, onClose }) {
  if (!employee) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${employee.firstName} ${employee.lastName} - Performans Detayları`} size="lg">
      <div className="p-6 space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{employee.stats.totalAppointments}</div>
            <div className="text-sm text-blue-600/80">Toplam Randevu</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{employee.stats.completionRate}%</div>
            <div className="text-sm text-green-600/80">Başarı Oranı</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-4 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{employee.stats.rating}</div>
            <div className="text-sm text-yellow-600/80">Müşteri Puanı</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Detaylı İstatistikler
          </h4>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tamamlanan Randevular</span>
                <span className="font-semibold text-green-600">{employee.stats.completedAppointments}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bekleyen Randevular</span>
                <span className="font-semibold text-orange-600">{employee.stats.pendingAppointments}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">İptal Edilen</span>
                <span className="font-semibold text-red-600">{employee.stats.cancelledAppointments}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Aylık Gelir</span>
                <span className="font-semibold text-primary">₺{employee.stats.monthlyRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ortalama Randevu/Gün</span>
                <span className="font-semibold">{Math.round(employee.stats.totalAppointments / 30)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">İşe Başlama</span>
                <span className="font-semibold">{new Date(employee.joinDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-background/60 rounded-xl p-4">
          <h4 className="font-semibold mb-4">Performans Göstergeleri</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Başarı Oranı</span>
                <span>{employee.stats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${employee.stats.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Müşteri Memnuniyeti</span>
                <span>{employee.stats.rating}/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(employee.stats.rating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Aktivite Seviyesi</span>
                <span>{employee.isActive ? 'Yüksek' : 'Düşük'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${employee.isActive ? 'bg-blue-500' : 'bg-red-500'}`} 
                  style={{ width: employee.isActive ? '85%' : '20%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
          <Button variant="outline" onClick={onClose}>Kapat</Button>
        </div>
      </div>
    </Modal>
  );
}

function PerformanceView({ employees }) {
  const activeEmployees = employees.filter(emp => emp.isActive);
  
  const totalStats = activeEmployees.reduce((acc, emp) => ({
    totalAppointments: acc.totalAppointments + emp.stats.totalAppointments,
    completedAppointments: acc.completedAppointments + emp.stats.completedAppointments,
    monthlyRevenue: acc.monthlyRevenue + emp.stats.monthlyRevenue,
    averageRating: acc.averageRating + emp.stats.rating
  }), { totalAppointments: 0, completedAppointments: 0, monthlyRevenue: 0, averageRating: 0 });

  totalStats.averageRating = activeEmployees.length > 0 ? totalStats.averageRating / activeEmployees.length : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{activeEmployees.length}</span>
          </div>
          <p className="text-sm text-blue-600/80">Aktif Çalışan</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{totalStats.totalAppointments}</span>
          </div>
          <p className="text-sm text-green-600/80">Toplam Randevu</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">{totalStats.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-yellow-600/80">Ort. Puan</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">₺{totalStats.monthlyRevenue.toLocaleString()}</span>
          </div>
          <p className="text-sm text-purple-600/80">Aylık Gelir</p>
        </div>
      </div>

      {/* Performance Ranking */}
      <div className="bg-card/60 border border-border/40 rounded-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-border/20">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Performans Sıralaması
          </h3>
          <p className="text-sm text-muted-foreground">Çalışanların başarı oranına göre sıralanmış performansları</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {activeEmployees
              .sort((a, b) => b.stats.completionRate - a.stats.completionRate)
              .map((employee, index) => (
              <div key={employee.id} className="flex items-center gap-4 p-4 bg-background/60 rounded-xl">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                
                {/* Employee Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{employee.firstName} {employee.lastName}</h4>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-lg font-bold text-primary">{employee.stats.completedAppointments}</p>
                    <p className="text-xs text-muted-foreground">Tamamlanan</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{employee.stats.completionRate}%</p>
                    <p className="text-xs text-muted-foreground">Başarı</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <p className="text-lg font-bold">{employee.stats.rating}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Puan</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">₺{employee.stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Gelir</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}