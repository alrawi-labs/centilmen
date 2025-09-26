import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Heart,
  Settings,
  Edit,
  Shield,
  Bell,
  LogOut,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ============================================================================
// MOCK DATA (Giriş yapmış kullanıcı için API'den geleceği varsayılan veriler)
// ============================================================================
const MOCK_USER_DATA = {
  id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  username: "deniz_h",
  firstName: "Deniz",
  lastName: "Haznedar",
  email: "deniz.haznedar@example.com",
  phoneNumber: "555 123 4567",
  is_email_verified: true,
  is_phone_verified: false,
  created_at: "2023-05-15T10:00:00Z",
  favorite_hairdresser: {
    id: 1,
    name: "Duran Koçak",
  },
  favorite_hair_style: {
    id: 101,
    name: "Modern Undercut",
  },
  profile: {
    preferences: {
      email_notifications: true,
      sms_notifications: false,
      theme: "dark",
    },
  },
  upcoming_appointments: [
    {
      id: 201,
      date: "2025-10-05T14:00:00Z",
      hairdresser: "Duran Koçak",
      service: "Saç Kesimi",
    },
    {
      id: 202,
      date: "2025-10-25T11:30:00Z",
      hairdresser: "Feyzullah Acar",
      service: "Keratin Bakım",
    },
  ],
};

// ============================================================================
// HELPER COMPONENTS (Yardımcı Alt Bileşenler)
// ============================================================================

const ProfileCard = ({
  title,
  icon,
  children,
  onEdit,
  editLabel = "Düzenle",
}) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl backdrop-blur-sm overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          {icon}
          {title}
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm font-semibold text-primary hover:text-primary transition-colors flex items-center gap-1"
          >
            <Edit size={14} /> {editLabel}
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value, isVerified }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-400 flex items-center gap-3">
      {icon}
      {label}
    </span>
    <div className="text-white font-medium flex items-center gap-2">
      {value}
      {isVerified === true && (
        <CheckCircle size={16} className="text-green-500" />
      )}
      {isVerified === false && (
        <AlertCircle size={16} className="text-yellow-500" />
      )}
    </div>
  </div>
);

const ToggleSwitch = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-300 text-sm">{label}</span>
    <button
      onClick={onChange}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? "bg-primary" : "bg-gray-600"}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT (Ana Sayfa Bileşeni)
// ============================================================================

export default function UserProfilePage() {
  const [user, setUser] = useState(MOCK_USER_DATA);

  const handlePreferencesChange = (key) => {
    // API'ye PATCH isteği gönderilir ve başarılı olursa state güncellenir
    setUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        preferences: {
          ...prevUser.profile.preferences,
          [key]: !prevUser.profile.preferences[key],
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* --- SAYFA BAŞLIĞI --- */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Hesabım</h1>
          <p className="text-gray-400 mt-1">
            Hoş geldin, {user.firstName}! Profil bilgilerini ve ayarlarını
            buradan yönetebilirsin.
          </p>
        </div>

        {/* --- ANA İÇERİK (2 SÜTUNLU YAPI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* --- SOL SÜTUN --- */}
          <div className="md:col-span-2 space-y-8">
            {/* Profil Bilgileri Kartı */}
            <ProfileCard
              title="Profil Bilgileri"
              icon={<User className="text-primary" />}
              onEdit={() => alert("Profil düzenleme modal'ı açılacak.")}
            >
              <InfoRow
                icon={<User size={16} />}
                label="Ad Soyad"
                value={`${user.firstName} ${user.lastName}`}
                isVerified={true}
              />
              <InfoRow
                icon={<Mail size={16} />}
                label="E-posta Adresi"
                value={user.email}
                isVerified={user.is_email_verified}
              />
              <InfoRow
                icon={<Phone size={16} />}
                label="Telefon Numarası"
                value={user.phoneNumber}
                isVerified={user.is_phone_verified}
              />
            </ProfileCard>

            {/* Randevular Kartı */}
            <ProfileCard
              title="Randevularım"
              icon={<Heart className="text-primary" />}
              onEdit={() => alert("Favori düzenleme modal'ı açılacak.")}
            >
              {user.upcoming_appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center text-left"
                >
                  <div>
                    <p className="text-xs text-gray-400">Tarih</p>
                    <p className="font-semibold">{appointment.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Kuaför</p>
                    <p className="font-semibold">{appointment.hairdresser}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Hizmet</p>
                    <p className="font-semibold">{appointment.service}</p>
                  </div>
                </div>
              ))}
            </ProfileCard>

            {/* Favoriler Kartı */}
            <ProfileCard
              title="Favorilerim"
              icon={<Heart className="text-primary" />}
              onEdit={() => alert("Favori düzenleme modal'ı açılacak.")}
            >
              <div className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Favori Kuaför</p>
                  <p className="font-semibold">
                    {user.favorite_hairdresser.name}
                  </p>
                </div>
                <a
                  href="#"
                  className="text-primary text-xs font-bold hover:underline"
                >
                  PROFİLİ GÖR
                </a>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Favori Saç Stili</p>
                  <p className="font-semibold">
                    {user.favorite_hair_style.name}
                  </p>
                </div>
                <a
                  href="#"
                  className="text-primary text-xs font-bold hover:underline"
                >
                  DETAY
                </a>
              </div>
            </ProfileCard>
          </div>

          {/* --- SAĞ SÜTUN --- */}
          <div className="space-y-8">
            {/* Ayarlar Kartı */}
            <ProfileCard
              title="Güvenlik ve Ayarlar"
              icon={<Settings className="text-primary" />}
              onEdit={() => alert("Ayarlar modal'ı açılacak.")}
              editLabel="Ayarları Yönet"
            >
              <button className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-sm font-semibold flex items-center gap-3">
                <Shield size={16} /> Şifre Değiştir
              </button>
              <div className="border-t border-gray-700 my-2"></div>
              <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Bell size={16} /> Bildirim Tercihleri
              </h4>
              <ToggleSwitch
                label="E-posta Bildirimleri"
                enabled={user.profile.preferences.email_notifications}
                onChange={() => handlePreferencesChange("email_notifications")}
              />
              <ToggleSwitch
                label="SMS Bildirimleri"
                enabled={user.profile.preferences.sms_notifications}
                onChange={() => handlePreferencesChange("sms_notifications")}
              />
            </ProfileCard>

            {/* Hesap İşlemleri Kartı */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl backdrop-blur-sm p-6 space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-700 rounded-lg transition-colors text-sm font-semibold flex items-center gap-3">
                <LogOut size={16} /> Güvenli Çıkış Yap
              </button>
              <button className="w-full text-left p-3 hover:bg-red-900/50 rounded-lg transition-colors text-sm font-semibold flex items-center gap-3 text-red-400">
                Hesabı Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
