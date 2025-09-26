import { useState } from "react";
import {
  Calendar,
  Users,
  Scissors,
  Clock,
  X,
  Check,
  Edit,
  Phone,
  Mail,
  User,
  Star,
  MessageCircle,
  MapPin,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  History,
  Bell,
  Heart,
  Copy,
  Share2,
  Printer,
  MoreHorizontal
} from "lucide-react";

// Mock Components (same as your existing ones)
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
        size === "lg" ? "max-w-4xl" : size === "xl" ? "max-w-5xl" : "max-w-2xl"
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

// Mock appointment data (enhanced version)
const MOCK_APPOINTMENT = {
  id: 1,
  customerName: "Ahmet Yılmaz",
  customerPhone: "0532 XXX XX 11",
  customerEmail: "ahmet@example.com",
  stylist: "Duran Koçak",
  service: "Fade Cut",
  price: "₺200",
  date: "2024-09-25",
  time: "10:00",
  duration: "45 dk",
  status: "confirmed",
  notes: "Sakal da kesilecek. Müşteri her zaman aynı stili tercih ediyor.",
  customerPreferences: ["Kısa saç", "Modern stil", "Sakal bakımı"],
  createdAt: "2024-09-24T15:30:00",
  updatedAt: "2024-09-24T16:45:00",
  paymentMethod: "Nakit",
  reminderSent: true,
  customerRating: 4.8,
  previousVisits: 12,
  customerNotes: "Çok düzenli müşteri. Her 3 haftada bir geliyor.",
  stylistNotes: "Saç yapısı kalın. Fade için 2 numara kullanıyor.",
  estimatedEndTime: "10:45",
  serviceDetails: {
    basePrice: "₺150",
    extras: [
      { name: "Sakal Düzeltme", price: "₺50" }
    ],
    discount: "₺0",
    total: "₺200"
  }
};

const STATUS_CONFIG = {
  pending: { label: "Bekliyor", color: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertCircle },
  confirmed: { label: "Onaylandı", color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
  completed: { label: "Tamamlandı", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  cancelled: { label: "İptal", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle }
};

export default function AppointmentDetailModal({ appointment, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("details");
  const [newNote, setNewNote] = useState("");
  
  if (!appointment) return null;

  const handleStatusChange = (newStatus) => {
    console.log(`Changing appointment ${appointment.id} to ${newStatus}`);
    
    // In real app, would update the appointment status
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Adding note:", newNote.trim());
      setNewNote("");
      // In real app, would save the note
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In real app, would show a toast notification
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Randevu Detayları" 
      size="lg"
    >
      <div className="p-6">
        {/* Header with customer info and status */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{appointment.customerName}</h2>
                <p className="text-muted-foreground">{appointment.customerPhone}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{appointment.customerRating || "4.5"}/5</span>
                  <span className="text-sm text-muted-foreground">• {appointment.previousVisits || "5"} ziyaret</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge status={appointment.status} />
              <p className="text-2xl font-bold text-primary mt-2">{appointment.price}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Button size="sm" variant="outline" onClick={() => copyToClipboard(appointment.customerPhone)}>
            <Phone className="w-4 h-4 mr-2" />
            Ara
          </Button>
          <Button size="sm" variant="outline" onClick={() => copyToClipboard(appointment.customerEmail)}>
            <Mail className="w-4 h-4 mr-2" />
            E-posta
          </Button>
          <Button size="sm" variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Kopyala
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Paylaş
          </Button>
          <Button size="sm" variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Yazdır
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border/20">
          {[
            { id: "details", label: "Detaylar", icon: Calendar },
            { id: "customer", label: "Müşteri", icon: User },
            { id: "service", label: "Hizmet", icon: Scissors },
            { id: "notes", label: "Notlar", icon: MessageCircle },
            { id: "history", label: "Geçmiş", icon: History }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Details */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Randevu Bilgileri
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarih</span>
                    <span className="font-medium">{new Date(appointment.date).toLocaleDateString('tr-TR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saat</span>
                    <span className="font-medium">{appointment.time} - {appointment.estimatedEndTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Süre</span>
                    <span className="font-medium">{appointment.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kuaför</span>
                    <span className="font-medium flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-primary" />
                      {appointment.stylist}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ödeme</span>
                    <span className="font-medium flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      {appointment.paymentMethod || "Nakit"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service & Pricing */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-primary" />
                  Hizmet Detayları
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{appointment.service}</span>
                    <span className="text-primary font-semibold">{appointment.serviceDetails.basePrice}</span>
                  </div>
                  {appointment.serviceDetails.extras.map((extra, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">+ {extra.name}</span>
                      <span className="text-muted-foreground">{extra.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-border/20 pt-3">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Toplam</span>
                      <span className="font-bold text-primary">{appointment.serviceDetails.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Status & Actions */}
              <div className="md:col-span-2">
                <div className="bg-background/60 rounded-xl p-4">
                  <h4 className="font-semibold mb-4">Durum Yönetimi</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <StatusBadge status={appointment.status} />
                      <div className="text-sm text-muted-foreground">
                        Son güncelleme: {new Date(appointment.updatedAt).toLocaleString('tr-TR')}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {appointment.status === "pending" && (
                        <>
                          <Button size="sm" variant="success" onClick={() => handleStatusChange("confirmed")}>
                            <Check className="w-4 h-4 mr-1" />
                            Onayla
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleStatusChange("cancelled")}>
                            <X className="w-4 h-4 mr-1" />
                            İptal Et
                          </Button>
                        </>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button size="sm" variant="success" onClick={() => handleStatusChange("completed")}>
                          <Check className="w-4 h-4 mr-1" />
                          Tamamlandı
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Düzenle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="space-y-6">
              {/* Customer Profile */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Müşteri Profili
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Ad Soyad</label>
                    <p className="font-medium">{appointment.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Telefon</label>
                    <p className="font-medium flex items-center gap-2">
                      {appointment.customerPhone}
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(appointment.customerPhone)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">E-posta</label>
                    <p className="font-medium flex items-center gap-2">
                      {appointment.customerEmail}
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(appointment.customerEmail)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Toplam Ziyaret</label>
                    <p className="font-medium">{appointment.previousVisits} randevu</p>
                  </div>
                </div>
              </div>

              {/* Customer Preferences */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Tercihler
                </h4>
                <div className="flex flex-wrap gap-2">
                  {appointment.customerPreferences.map((preference, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {preference}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customer Notes */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-3">Müşteri Notları</h4>
                <p className="text-sm text-muted-foreground">{appointment.customerNotes}</p>
              </div>
            </div>
          )}

          {activeTab === "service" && (
            <div className="space-y-6">
              {/* Service Details */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-primary" />
                  Hizmet Detayları
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <h5 className="font-semibold text-lg">{appointment.service}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Profesyonel fade kesim tekniği ile modern ve şık bir görünüm
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Tahmini Süre</label>
                      <p className="font-medium">{appointment.duration}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Fiyat</label>
                      <p className="font-medium text-primary">{appointment.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stylist Notes */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-3">Kuaför Notları</h4>
                <p className="text-sm text-muted-foreground">{appointment.stylistNotes}</p>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              {/* Existing Notes */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Mevcut Notlar
                </h4>
                {appointment.notes ? (
                  <div className="p-3 bg-card/60 rounded-lg">
                    <p className="text-sm">{appointment.notes}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(appointment.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Henüz not eklenmemiş</p>
                )}
              </div>

              {/* Add New Note */}
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-3">Yeni Not Ekle</h4>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Randevu hakkında notlar..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Not Ekle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="bg-background/60 rounded-xl p-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Aktivite Geçmişi
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-card/40 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Randevu onaylandı</p>
                      <p className="text-xs text-muted-foreground">{new Date(appointment.updatedAt).toLocaleString('tr-TR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/40 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Randevu oluşturuldu</p>
                      <p className="text-xs text-muted-foreground">{new Date(appointment.createdAt).toLocaleString('tr-TR')}</p>
                    </div>
                  </div>
                  {appointment.reminderSent && (
                    <div className="flex items-center gap-3 p-3 bg-card/40 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Hatırlatma gönderildi</p>
                        <p className="text-xs text-muted-foreground">SMS ile müşteriye bilgilendirme yapıldı</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-border/20">
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Düzenle
          </Button>
          <Button>
            <Check className="w-4 h-4 mr-2" />
            İşlemi Tamamla
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border ${config.color}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
}