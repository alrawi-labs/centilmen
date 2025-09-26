import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function UltimateContactPage() {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredTime: ''
  });
  const [ripples, setRipples] = useState([]);
  const mapRef = useRef(null);
  const [magneticElements, setMagneticElements] = useState([]);

  // Dinamik parçacık sistemi
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
        hue: Math.random() * 360,
        life: Math.random() * 100 + 50
      });
    }
    setParticles(newParticles);
  };

  // Mouse tracking için
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parçacık animasyonu
  useEffect(() => {
    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX,
        y: particle.y + particle.velocityY,
        life: particle.life - 1,
        opacity: particle.life > 10 ? particle.opacity : particle.opacity * 0.95
      })).filter(particle => particle.life > 0));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Input focus efekti
    createRipple(e.target);
  };

  // Ripple efekti
  const createRipple = (element) => {
    const rect = element.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      size: 0
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Mesajınız başarıyla gönderildi! ${formData.name}, en kısa sürede size dönüş yapacağız.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      preferredTime: ''
    });
    setIsFormSubmitting(false);
  };

  // Salon bilgileri
  const contactInfo = {
    address: "Kızılay Mahallesi, Atatürk Bulvarı No: 123, Çankaya/Ankara",
    phone: "+90 312 123 45 67",
    email: "info@centilmensalon.com",
    workingHours: {
      "Pazartesi - Cuma": "09:00 - 20:00",
      "Cumartesi": "09:00 - 19:00",
      "Pazar": "10:00 - 18:00"
    }
  };

  const services = [
    "Erkek Saç Kesimi",
    "Kadın Saç Kesimi", 
    "Saç Boyama",
    "Sakal Bakımı",
    "Kaş Tasarımı",
    "Cilt Bakımı",
    "Manikür & Pedikür",
    "Gelin Saçı & Makyajı"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ultra Advanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-900/5 to-background"></div>
        
        {/* Dynamic particle system */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full transition-all duration-100"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`,
              boxShadow: `0 0 ${particle.size * 2}px hsla(${particle.hue}, 70%, 60%, 0.5)`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
        
        {/* Mouse follower gradient */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out opacity-20"
          style={{
            background: `radial-gradient(circle, 
              hsla(220, 70%, 60%, 0.4) 0%, 
              hsla(280, 70%, 60%, 0.3) 50%, 
              transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            pointerEvents: 'none'
          }}
        />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-l from-pink-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute border-2 border-primary/30 rounded-full animate-ping"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: '50px',
              height: '50px'
            }}
          />
        ))}
        
        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float blur-sm"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-20 relative">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-black  my-6 animate-gradient-flow relative">
              İLETİŞİM
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#9c6f4f]/20 via-purple-500/20 to-[#9c6f4f]/20 rounded-2xl blur-xl animate-pulse"></div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bize ulaşın, hayallerinizdeki görünümü birlikte yaratalım. 
            <span className="text-primary font-semibold"> Centilmen Erkek Kuaförü</span> ailesi olarak sizleri bekliyoruz!
          </p>
          
          {/* Animated underline */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-gradient-flow"></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Form */}
          <div className="space-y-8">
            <div className="relative">
              {/* Form Container */}
              <div className="relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-8 group overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Animated corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 group-hover:border-primary transition-all duration-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 group-hover:border-primary transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 group-hover:border-primary transition-all duration-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 group-hover:border-primary transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-primary mb-2 group-hover:text-blue-400 transition-all duration-300">
                    Hemen İletişime Geçin
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Formu doldurun, size en kısa sürede dönüş yapalım!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group/input relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-muted-foreground/70"
                          placeholder="Adınız Soyadınız"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                      </div>
                      <div className="group/input relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-muted-foreground/70"
                          placeholder="E-posta Adresiniz"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                      </div>
                    </div>

                    {/* Phone & Service Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group/input relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-muted-foreground/70"
                          placeholder="Telefon Numaranız"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                      </div>
                      <div className="group/input relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl"
                        >
                          <option value="">Hizmet Seçin</option>
                          {services.map((service, idx) => (
                            <option key={idx} value={service}>{service}</option>
                          ))}
                        </select>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                      </div>
                    </div>

                    {/* Preferred Time */}
                    <div className="group/input relative">
                      <input
                        type="datetime-local"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>

                    {/* Message */}
                    <div className="group/input relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-2xl border border-input/50 bg-background/30 backdrop-blur-sm px-6 py-4 text-sm transition-all duration-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background/70 group-hover/input:border-blue-400/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-muted-foreground/70 resize-none"
                        placeholder="Mesajınız..."
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      disabled={isFormSubmitting}
                      className="w-full py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isFormSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Mesajı Gönder
                          </>
                        )}
                      </span>
                      
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </Button>
                  </form>
                </div>

                {/* Form shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out rounded-3xl"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {/* Address Card */}
              <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-blue-400 transition-colors duration-300">Adres</h3>
                    <p className="text-muted-foreground leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-emerald-400 transition-colors duration-300">Telefon</h3>
                    <p className="text-muted-foreground text-xl font-mono">{contactInfo.phone}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Tıklayarak arayın</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-orange-400 transition-colors duration-300">E-posta</h3>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Mail göndermek için tıklayın</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary group-hover:text-violet-400 transition-colors duration-300">Çalışma Saatleri</h3>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(contactInfo.workingHours).map(([day, hours], idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 px-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/20 group-hover:border-violet-400/30 transition-all duration-300">
                      <span className="font-medium text-foreground">{day}</span>
                      <span className="text-primary font-mono">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-primary mb-4 group-hover:text-cyan-400 transition-colors duration-300">Konum</h3>
                </div>
                
                {/* Map Container */}
                <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-b-3xl overflow-hidden">
                  {/* Animated map placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Centilmen Salon</p>
                        <p className="text-white/70 text-sm">Kızılay, Ankara</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated grid overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mapGrid)" />
                    </svg>
                  </div>
                  
                  {/* Pulsing circles */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border border-cyan-400/30 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  {/* Interactive elements */}
                  <div className="absolute bottom-4 right-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="group relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-red-500/5 group-hover:from-pink-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-primary mb-6 group-hover:text-pink-400 transition-colors duration-300">Sosyal Medya</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-600', followers: '10.2K' },
                    { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700', followers: '5.8K' },
                    { name: 'WhatsApp', icon: '💬', color: 'from-green-500 to-green-600', followers: 'Mesaj' },
                    { name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600', followers: '2.1K' }
                  ].map((social, idx) => (
                    <div key={idx} className="group/social relative rounded-2xl border border-border/30 bg-background/30 backdrop-blur-sm p-4 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover/social:opacity-10 transition-all duration-500`}></div>
                      <div className="relative z-10 text-center space-y-2">
                        <div className="text-2xl">{social.icon}</div>
                        <div className="text-sm font-semibold">{social.name}</div>
                        <div className="text-xs text-muted-foreground">{social.followers}</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover/social:translate-x-full transition-transform duration-700 ease-out"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl shadow-2xl p-12 max-w-4xl">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                Hayallerinizdeki Görünümü Yakalayın!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Centilmen Salon'da uzman ekibimiz, size özel tasarımlarla tarzınızı ortaya çıkarıyor. 
                Randevunuzu hemen alın ve farkı hissedin!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="px-12 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hemen Ara
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Button>
                
                <Button variant="outline" className="px-12 py-4 text-lg font-semibold rounded-2xl border-2 border-primary/50 hover:bg-primary/10 hover:border-primary hover:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Online Randevu
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations & Styles */}
      <style >{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) rotate(90deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
          75% {
            transform: translateY(-45px) rotate(270deg);
          }
        }
        
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        /* Glow effects */
        .glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .glow-purple {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
        }
        
        .glow-pink {
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  );
}