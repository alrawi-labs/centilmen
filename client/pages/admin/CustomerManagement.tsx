import { useState, useMemo } from "react";
import {
  Users,
  User,
  Phone,
  Mail,
  Calendar,
  Scissors,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  MessageCircle,
  Clock,
  TrendingUp,
  CreditCard,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  Heart,
  Grid3X3,
  List,
  StickyNote,
  Bell,
  MoreVertical
} from "lucide-react";

// Mock Components (same as appointment management)
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

const Textarea = ({ placeholder, className = "", rows = 3, ...props }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 resize-none ${className}`}
    {...props}
  />
);

const Modal = ({ isOpen, onClose, children, title, size = "default" }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-card/95 border border-border/40 rounded-2xl w-full mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm ${
        size === "lg" ? "max-w-4xl" : "max-w-2xl"
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
const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    phone: "0532 XXX XX 11",
    email: "ahmet@example.com",
    joinDate: "2024-01-15",
    lastVisit: "2024-09-25",
    totalAppointments: 15,
    totalSpent: "₺2,850",
    favoriteServices: ["Fade Cut", "Sakal Düzeltme"],
    favoriteStylist: "Duran Koçak",
    notes: "Her zaman aynı stili tercih ediyor. Sakal kesimini de çok seviyor.",
    loyaltyLevel: "gold",
    birthday: "1990-03-15",
    preferences: ["Kısa saç", "Modern stil", "Sakal bakımı"],
    appointmentHistory: [
      { date: "2024-09-25", service: "Fade Cut", stylist: "Duran Koçak", price: "₺200", status: "completed" },
      { date: "2024-09-10", service: "Sakal Düzeltme", stylist: "Duran Koçak", price: "₺80", status: "completed" },
      { date: "2024-08-20", service: "Fade Cut", stylist: "Duran Koçak", price: "₺200", status: "completed" }
    ]
  },
  {
    id: 2,
    name: "Mehmet Demir",
    phone: "0543 XXX XX 22",
    email: "mehmet@example.com",
    joinDate: "2024-02-20",
    lastVisit: "2024-09-20",
    totalAppointments: 8,
    totalSpent: "₺1,440",
    favoriteServices: ["Klasik Erkek"],
    favoriteStylist: "Deniz Haznedar",
    notes: "Çok düzenli müşteri. Klasik tarzı seviyor.",
    loyaltyLevel: "silver",
    birthday: "1985-07-22",
    preferences: ["Klasik stil", "Hafif kesim"],
    appointmentHistory: [
      { date: "2024-09-20", service: "Klasik Erkek", stylist: "Deniz Haznedar", price: "₺150", status: "completed" },
      { date: "2024-08-25", service: "Klasik Erkek", stylist: "Deniz Haznedar", price: "₺150", status: "completed" }
    ]
  },
  {
    id: 3,
    name: "Ali Kaya",
    phone: "0555 XXX XX 33",
    email: "ali@example.com",
    joinDate: "2024-03-10",
    lastVisit: "2024-09-18",
    totalAppointments: 12,
    totalSpent: "₺2,160",
    favoriteServices: ["Undercut", "Sakal Düzeltme"],
    favoriteStylist: "Feyzullah",
    notes: "Modern tarzları deniyor. Sakal bakımına önem veriyor.",
    loyaltyLevel: "gold",
    birthday: "1992-11-08",
    preferences: ["Undercut", "Sakal", "Modern stil"],
    appointmentHistory: [
      { date: "2024-09-18", service: "Undercut", stylist: "Feyzullah", price: "₺180", status: "completed" }
    ]
  },
  {
    id: 4,
    name: "Can Özdemir",
    phone: "0536 XXX XX 44",
    email: "can@example.com",
    joinDate: "2024-04-05",
    lastVisit: "2024-09-15",
    totalAppointments: 6,
    totalSpent: "₺900",
    favoriteServices: ["Pompadour"],
    favoriteStylist: "Duran Koçak",
    notes: "Yeni müşteri. Pompadour stilini çok beğendi.",
    loyaltyLevel: "bronze",
    birthday: "1988-05-12",
    preferences: ["Pompadour", "Wax"],
    appointmentHistory: [
      { date: "2024-09-15", service: "Pompadour", stylist: "Duran Koçak", price: "₺180", status: "completed" }
    ]
  },
  {
    id: 5,
    name: "Emre Şahin",
    phone: "0544 XXX XX 55",
    email: "emre@example.com",
    joinDate: "2024-01-08",
    lastVisit: "2024-08-20",
    totalAppointments: 4,
    totalSpent: "₺480",
    favoriteServices: ["Buzz Cut"],
    favoriteStylist: "Deniz Haznedar",
    notes: "Sade tarzları tercih ediyor.",
    loyaltyLevel: "bronze",
    birthday: "1995-09-30",
    preferences: ["Buzz Cut", "Sade"],
    appointmentHistory: [
      { date: "2024-08-20", service: "Buzz Cut", stylist: "Deniz Haznedar", price: "₺120", status: "completed" }
    ]
  }
];

const LOYALTY_LEVELS = {
  bronze: { label: "Bronz", color: "bg-amber-100 text-amber-700", icon: "🥉" },
  silver: { label: "Gümüş", color: "bg-gray-100 text-gray-700", icon: "🥈" },
  gold: { label: "Altın", color: "bg-yellow-100 text-yellow-700", icon: "🥇" },
  platinum: { label: "Platin", color: "bg-purple-100 text-purple-700", icon: "💎" }
};

export default function CustomerManagement() {
  const [view, setView] = useState("list"); // list, cards
  const [filters, setFilters] = useState({
    search: "",
    loyaltyLevel: "all",
    favoriteStylist: "all",
    sortBy: "name"
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Filter customers based on current filters
  const filteredCustomers = useMemo(() => {
    let filtered = MOCK_CUSTOMERS.filter(customer => {
      const matchesSearch = !filters.search || 
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.phone.includes(filters.search) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLoyalty = filters.loyaltyLevel === "all" || customer.loyaltyLevel === filters.loyaltyLevel;
      
      const matchesStylist = filters.favoriteStylist === "all" || 
        customer.favoriteStylist.toLowerCase().includes(filters.favoriteStylist.toLowerCase());
      
      return matchesSearch && matchesLoyalty && matchesStylist;
    });

    // Sort customers
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "lastVisit":
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case "totalAppointments":
          return b.totalAppointments - a.totalAppointments;
        case "totalSpent":
          return parseInt(b.totalSpent.replace(/[^\d]/g, '')) - parseInt(a.totalSpent.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [MOCK_CUSTOMERS, filters]);

  const handleDeleteCustomer = (customerId) => {
    if (confirm("Bu müşteriyi silmek istediğinizden emin misiniz?")) {
      console.log(`Deleting customer ${customerId}`);
      // In real app, would delete the customer
    }
  };

  const handleAddNote = (customerId, note) => {
    console.log(`Adding note to customer ${customerId}:`, note);
    // In real app, would save the note
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
                <h1 className="text-2xl font-bold">Müşteri Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  {filteredCustomers.length} müşteri listeleniyor
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
                variant={view === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("cards")}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Kartlar
              </Button>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Müşteri
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{MOCK_CUSTOMERS.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Müşteri</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{MOCK_CUSTOMERS.filter(c => c.loyaltyLevel === 'gold').length}</p>
                <p className="text-sm text-muted-foreground">Altın Müşteri</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {MOCK_CUSTOMERS.reduce((sum, c) => sum + c.totalAppointments, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Toplam Randevu</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ₺{MOCK_CUSTOMERS.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[^\d]/g, '')), 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Toplam Ciro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Müşteri adı, telefon veya e-posta ara..."
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
              {(filters.loyaltyLevel !== "all" || filters.favoriteStylist !== "all") && (
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
                  <label className="block text-sm font-medium mb-2">Sadakat Seviyesi</label>
                  <Select
                    value={filters.loyaltyLevel}
                    onChange={(e) => setFilters(prev => ({ ...prev, loyaltyLevel: e.target.value }))}
                  >
                    <option value="all">Tüm Seviyeler</option>
                    <option value="bronze">Bronz</option>
                    <option value="silver">Gümüş</option>
                    <option value="gold">Altın</option>
                    <option value="platinum">Platin</option>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Favori Kuaför</label>
                  <Select
                    value={filters.favoriteStylist}
                    onChange={(e) => setFilters(prev => ({ ...prev, favoriteStylist: e.target.value }))}
                  >
                    <option value="all">Tüm Kuaförler</option>
                    <option value="duran">Duran Koçak</option>
                    <option value="deniz">Deniz Haznedar</option>
                    <option value="feyzullah">Feyzullah</option>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sıralama</label>
                  <Select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  >
                    <option value="name">İsim</option>
                    <option value="lastVisit">Son Ziyaret</option>
                    <option value="totalAppointments">Randevu Sayısı</option>
                    <option value="totalSpent">Harcama</option>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on view */}
        {view === "list" ? (
          <CustomerList 
            customers={filteredCustomers}
            onViewDetails={setSelectedCustomer}
            onEdit={setEditingCustomer}
            onDelete={handleDeleteCustomer}
          />
        ) : (
          <CustomerCards 
            customers={filteredCustomers}
            onViewDetails={setSelectedCustomer}
            onEdit={setEditingCustomer}
            onDelete={handleDeleteCustomer}
          />
        )}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onEdit={setEditingCustomer}
          onAddNote={handleAddNote}
        />
      )}

      {/* Add/Edit Customer Modal */}
      {(showAddModal || editingCustomer) && (
        <CustomerFormModal
          customer={editingCustomer}
          isOpen={showAddModal || !!editingCustomer}
          onClose={() => {
            setShowAddModal(false);
            setEditingCustomer(null);
          }}
        />
      )}
    </div>
  );
}

function CustomerList({ customers, onViewDetails, onEdit, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Müşteri bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla müşteri görebilirsiniz
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
              <th className="text-left p-4 font-semibold">İletişim</th>
              <th className="text-left p-4 font-semibold">Sadakat</th>
              <th className="text-left p-4 font-semibold">Son Ziyaret</th>
              <th className="text-left p-4 font-semibold">Randevu Sayısı</th>
              <th className="text-left p-4 font-semibold">Toplam Harcama</th>
              <th className="text-right p-4 font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className={`hover:bg-card/40 transition-colors duration-200 ${index !== customers.length - 1 ? 'border-b border-border/10' : ''}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">Üye: {new Date(customer.joinDate).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{customer.phone}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <LoyaltyBadge level={customer.loyaltyLevel} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{new Date(customer.lastVisit).toLocaleDateString('tr-TR')}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{customer.totalAppointments}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-primary">{customer.totalSpent}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(customer)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(customer)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(customer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

function CustomerCards({ customers, onViewDetails, onEdit, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Müşteri bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla müşteri görebilirsiniz
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer) => (
        <div key={customer.id} className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
              </div>
            </div>
            <LoyaltyBadge level={customer.loyaltyLevel} />
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Son Ziyaret</span>
              <span className="font-medium">{new Date(customer.lastVisit).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Randevu Sayısı</span>
              <span className="font-medium">{customer.totalAppointments}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Toplam Harcama</span>
              <span className="font-medium text-primary">{customer.totalSpent}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Favori Kuaför:</span>
              <span className="font-medium ml-1">{customer.favoriteStylist}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onViewDetails(customer)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Detay
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(customer)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(customer.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoyaltyBadge({ level }) {
  const config = LOYALTY_LEVELS[level];
  
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}

function CustomerDetailModal({ customer, isOpen, onClose, onEdit, onAddNote }) {
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState("info");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(customer.id, newNote.trim());
      setNewNote("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={customer.name} size="lg">
      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border/20">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "info" 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bilgiler
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "history" 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Randevu Geçmişi
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "notes" 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Notlar
          </button>
        </div>

        {activeTab === "info" && (
          <div className="space-y-6">
            {/* Customer Overview */}
            <div className="bg-background/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{customer.name}</h3>
                    <p className="text-muted-foreground">
                      Üye: {new Date(customer.joinDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <LoyaltyBadge level={customer.loyaltyLevel} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-card/60 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold">{customer.totalAppointments}</p>
                  <p className="text-sm text-muted-foreground">Randevu</p>
                </div>
                <div className="text-center p-3 bg-card/60 rounded-xl">
                  <CreditCard className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold">{customer.totalSpent}</p>
                  <p className="text-sm text-muted-foreground">Harcama</p>
                </div>
                <div className="text-center p-3 bg-card/60 rounded-xl">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                  <p className="text-lg font-bold">{customer.favoriteServices.length}</p>
                  <p className="text-sm text-muted-foreground">Favori Hizmet</p>
                </div>
                <div className="text-center p-3 bg-card/60 rounded-xl">
                  <Scissors className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm font-bold">{customer.favoriteStylist}</p>
                  <p className="text-sm text-muted-foreground">Favori Kuaför</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-background/60 rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                İletişim Bilgileri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Telefon</label>
                  <p className="font-medium flex items-center gap-2">
                    {customer.phone}
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">E-posta</label>
                  <p className="font-medium flex items-center gap-2">
                    {customer.email}
                    <Button size="sm" variant="outline">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </p>
                </div>
                {customer.birthday && (
                  <div>
                    <label className="text-sm text-muted-foreground">Doğum Tarihi</label>
                    <p className="font-medium">{new Date(customer.birthday).toLocaleDateString('tr-TR')}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-muted-foreground">Son Ziyaret</label>
                  <p className="font-medium">{new Date(customer.lastVisit).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-background/60 rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Tercihler
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Favori Hizmetler</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {customer.favoriteServices.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Stil Tercihleri</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {customer.preferences.map((preference, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {preference}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Randevu Geçmişi</h4>
              <p className="text-sm text-muted-foreground">
                Son {customer.appointmentHistory.length} randevu
              </p>
            </div>
            
            {customer.appointmentHistory.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Henüz randevu geçmişi bulunmuyor</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customer.appointmentHistory.map((appointment, index) => (
                  <div key={index} className="bg-background/60 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Scissors className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">{appointment.service}</h5>
                          <p className="text-sm text-muted-foreground">
                            {appointment.stylist} • {new Date(appointment.date).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{appointment.price}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                          {appointment.status === 'completed' ? 'Tamamlandı' : appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className="bg-background/60 rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <StickyNote className="w-4 h-4" />
                Mevcut Notlar
              </h4>
              {customer.notes ? (
                <p className="text-sm text-muted-foreground">{customer.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">Henüz not eklenmemiş</p>
              )}
            </div>

            <div className="bg-background/60 rounded-xl p-4">
              <h4 className="font-semibold mb-3">Yeni Not Ekle</h4>
              <div className="space-y-3">
                <Textarea
                  placeholder="Müşteri hakkında notlar..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    <Plus className="w-4 h-4 mr-1" />
                    Not Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-border/20">
          <Button variant="outline" onClick={() => onEdit(customer)}>
            <Edit className="w-4 h-4 mr-1" />
            Düzenle
          </Button>
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function CustomerFormModal({ customer, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    birthday: customer?.birthday || "",
    notes: customer?.notes || "",
    favoriteStylist: customer?.favoriteStylist || "",
    preferences: customer?.preferences?.join(", ") || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving customer:", formData);
    // In real app, would save the customer data
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={customer ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ad Soyad *</label>
            <Input
              placeholder="Müşteri adı soyadı"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telefon *</label>
            <Input
              placeholder="0xxx xxx xx xx"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">E-posta</label>
            <Input
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Doğum Tarihi</label>
            <Input
              type="date"
              placeholder="Doğum tarihi seçiniz"
              value={formData.birthday}
              onChange={(e) => handleInputChange("birthday", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Favori Kuaför</label>
            <Select
              value={formData.favoriteStylist}
              onChange={(e) => handleInputChange("favoriteStylist", e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option value="Duran Koçak">Duran Koçak</option>
              <option value="Deniz Haznedar">Deniz Haznedar</option>
              <option value="Feyzullah">Feyzullah</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stil Tercihleri</label>
            <Input
              placeholder="Kısa saç, Modern stil, Sakal (virgülle ayırın)"
              value={formData.preferences}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Notlar</label>
          <Textarea
            placeholder="Müşteri hakkında notlar..."
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            <Check className="w-4 h-4 mr-1" />
            {customer ? "Güncelle" : "Kaydet"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}