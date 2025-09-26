import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

// TypeScript arayüz tanımlamaları
interface AuthFormAPI {
  switchToLogin: () => void;
  switchToRegister: () => void;
  getCurrentMode: () => 'giris' | 'kayit';
}

interface AuthFormProps {
  initialMode?: 'giris' | 'kayit';
  forceLogin?: boolean;
  onModeChange?: (mode: 'giris' | 'kayit') => void;
  // Ref ile dışarıdan erişim için
  ref?: React.RefObject<AuthFormAPI>;
}

// Global window tipini genişlet (opsiyonel)
declare global {
  interface Window {
    authForm?: AuthFormAPI;
  }
}

export default function Registration({ 
  initialMode = "kayit",
  forceLogin = false,
  onModeChange = null
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // initialMode veya forceLogin'e göre başlangıç modunu belirle
  const [isLogin, setIsLogin] = useState(() => {
    if (forceLogin) return true;
    return initialMode === "giris";
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
  }>>([]);

  // API fonksiyonları için ref
  const apiRef = useRef<AuthFormAPI>({
    switchToLogin: () => {},
    switchToRegister: () => {},
    getCurrentMode: () => 'kayit'
  });

  // URL parametrelerini kontrol et
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const action = urlParams.get('action');
    
    // URL'den gelen parametrelere göre modu belirle
    if (mode === 'giris' || action === 'giris') {
      setIsLogin(true);
    } else if (mode === 'kayit' || action === 'kayit') {
      setIsLogin(false);
    }
  }, []);

  // Parçacık efekti için
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 400,
        y: Math.random() * 300,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 0.8
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    generateParticles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Giriş yapılıyor:', { email: formData.email, password: formData.password });
      alert('Giriş yapılıyor...');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Şifreler eşleşmiyor!');
        return;
      }
      console.log('Kayıt yapılıyor:', formData);
      alert('Kayıt başarılı!');
    }
  };

  const handleModeSwitch = () => {
    setIsTransitioning(true);
    generateParticles();
    
    // Staggered animation timing
    setTimeout(() => {
      const newMode = !isLogin;
      setIsLogin(newMode);
      
      // Callback'i çağır (eğer varsa)
      if (onModeChange) {
        onModeChange(newMode ? 'giris' : 'kayit');
      }
      
      // URL'yi güncelle (opsiyonel)
      const url = new URL(window.location.href);
      url.searchParams.set('mode', newMode ? 'giris' : 'kayit');
      window.history.pushState({}, '', url.toString());
    }, 300);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Dışarıdan mod değiştirme fonksiyonları
  const switchToLogin = () => {
    if (!isLogin) {
      handleModeSwitch();
    }
  };

  const switchToRegister = () => {
    if (isLogin) {
      handleModeSwitch();
    }
  };

  const getCurrentMode = (): 'giris' | 'kayit' => {
    return isLogin ? 'giris' : 'kayit';
  };

  // API referansını güncelle
  useEffect(() => {
    apiRef.current = {
      switchToLogin,
      switchToRegister,
      getCurrentMode
    };

    // Global erişim (TypeScript uyumlu)
    if (typeof window !== 'undefined') {
      window.authForm = apiRef.current;
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.authForm;
      }
    };
  }, [isLogin]);

  // Custom hook olarak kullanım için
  const useAuthFormAPI = () => {
    return {
      switchToLogin,
      switchToRegister,
      getCurrentMode,
      isLogin,
      isTransitioning
    };
  };

  return (
    <section className="container mx-auto max-w-6xl px-4 py-14">
      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border/70 bg-card/40 md:grid-cols-2 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
        {/* Sol taraf - Görsel */}
        <div className="relative hidden md:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f212c]/20 via-[#9c6f4f]/20 to-[#1f212c]/20 z-10"></div>
          <img
            src="auth/login.png"
            alt="Salon"
            className={`h-full w-full object-cover transition-all duration-700 ${isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent z-20" />
          
          {/* Parçacık efektleri */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full bg-white/60 transition-all duration-1000 ${isTransitioning ? 'animate-ping' : ''}`}
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: isTransitioning ? particle.opacity : 0,
                  animationDelay: `${particle.delay}s`,
                  transform: isTransitioning ? `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)` : 'translate(0, 0)'
                }}
              />
            ))}
          </div>
          
          {/* Renk dalgaları */}
          <div className={`absolute inset-0 z-20 transition-all duration-1000 ${isTransitioning ? 'opacity-30' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/20 via-emerald-500/20 to-yellow-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Sağ taraf - Form */}
        <div className="p-8 relative overflow-hidden">
          {/* Arka plan efektleri */}
          <div className={`absolute inset-0 transition-all duration-1000 ${isTransitioning ? 'opacity-20' : 'opacity-0'}`}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/3 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/30 to-transparent rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-tr from-pink-400/30 to-transparent rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>

          {/* Form içeriği */}
          <div className="relative z-10">
            {/* Başlık bölümü */}
            <div className={`transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform -translate-x-8 scale-95' 
                : 'opacity-100 transform translate-x-0 scale-100'
            }`} style={{ transitionDelay: isTransitioning ? '0ms' : '200ms' }}>
              <h1 className="text-2xl font-semibold text-primary">
                {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLogin 
                  ? 'Hesabınızla devam edin veya telefon ile Hızlı Randevu alın.'
                  : 'Yeni hesap oluşturun ve randevularınızı kolayca yönetin.'
                }
              </p>
            </div>

            {/* Form alanları */}
            <div className={`mt-6 transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform translate-x-8 scale-95' 
                : 'opacity-100 transform translate-x-0 scale-100'
            }`} style={{ transitionDelay: isTransitioning ? '50ms' : '300ms' }}>
              <div className="space-y-3">
                {/* Kayıt formu için ekstra alanlar */}
                <div className={`transition-all duration-700 ease-out overflow-hidden ${
                  !isLogin ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-3 pb-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="group">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                          placeholder="Ad"
                        />
                      </div>
                      <div className="group">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                          placeholder="Soyad"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                        placeholder="Telefon Numarası (örn: 0532 123 45 67)"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Ortak alanlar */}
                <div className="space-y-3">
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                      placeholder="E-posta"
                    />
                  </div>
                  
                  <div className="group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                      placeholder="Şifre"
                    />
                  </div>
                </div>
                
                {/* Şifre tekrar alanı */}
                <div className={`transition-all duration-700 ease-out overflow-hidden ${
                  !isLogin ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                      placeholder="Şifre Tekrar"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmit} 
                  className="w-full mt-4 relative overflow-hidden bg-primary hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group"
                >
                  <span className="relative z-10 font-medium">
                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </Button>
              </div>
            </div>

            {/* OTP bölümü */}
            <div className={`mt-6 space-y-3 transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform -translate-x-8 scale-95' 
                : 'opacity-100 transform translate-x-0 scale-100'
            }`} style={{ transitionDelay: isTransitioning ? '100ms' : '400ms' }}>
              <div className="text-center text-xs text-muted-foreground relative">
                <span className="bg-background px-3 relative z-10">veya</span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  className="col-span-2 rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:scale-[1.02] focus:shadow-lg"
                  placeholder="Telefon"
                />
                <Button className="bg-gradient-to-r from-primary-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
                  OTP
                </Button>
              </div>
            </div>

            {/* Geçiş butonu */}
            <div className={`mt-8 text-center transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform translate-x-8 scale-95' 
                : 'opacity-100 transform translate-x-0 scale-100'
            }`} style={{ transitionDelay: isTransitioning ? '150ms' : '500ms' }}>
              <button
                onClick={handleModeSwitch}
                className="relative text-sm text-primary hover:text-primary/80 transition-all duration-300 group overflow-hidden rounded-lg px-4 py-2"
              >
                <span className="relative z-10 font-medium">
                  {isLogin 
                    ? 'Hesabınız yok mu? Kayıt olun'
                    : 'Zaten hesabınız var mı? Giriş yapın'
                  }
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
                <div className="absolute inset-0 border border-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Alt bilgi */}
            <div className={`mt-6 text-center text-sm text-muted-foreground transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform -translate-x-8 scale-95' 
                : 'opacity-100 transform translate-x-0 scale-100'
            }`} style={{ transitionDelay: isTransitioning ? '200ms' : '600ms' }}>
              "Randevu Sorgula" için hesabınıza giriş yapabilirsiniz.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}