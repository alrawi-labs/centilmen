import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PersonDetailPage() {
  const [particles, setParticles] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Örnek kişi verisi
  const person = {
    name: "Ahmet Yılmaz",
    role: "Master Kuaför & Salon Sahibi",
    experience: "15+ yıl deneyim",
    mainImage: "/api/placeholder/400/600",
    backgroundImage: "/api/placeholder/800/400",
    galleryImages: [
      "/api/placeholder/300/300",
      "/api/placeholder/300/300", 
      "/api/placeholder/300/300",
      "/api/placeholder/300/300",
      "/api/placeholder/300/300",
      "/api/placeholder/300/300"
    ],
    specialties: ["Erkek Kuaförü", "Saç Tasarımı", "Sakal Bakımı", "Klasik Tıraş", "Modern Kesimler"],
    about: "Sektörde 15 yılı aşkın deneyimi ile müşterilerimize en kaliteli hizmeti sunuyor. Klasik berberlik sanatını modern tekniklerle harmanlayarak, her müşteriye özel yaklaşım sergiliyor. Sürekli kendini geliştiren ve trend takipçisi olan Ahmet, müşteri memnuniyetini her zaman ön planda tutuyor.",
    skills: [
      { name: "Erkek Kuaförü", level: 95 },
      { name: "Saç Tasarımı", level: 90 },
      { name: "Sakal Bakımı", level: 88 },
      { name: "Klasik Tıraş", level: 92 },
      { name: "Müşteri İlişkileri", level: 96 }
    ],
    achievements: [
      "15+ Yıl Sektör Deneyimi",
      "1000+ Memnun Müşteri",
      "Kuaförlük Sertifikası",
      "Saç Tasarımı Uzmanlığı",
      "Müşteri Memnuniyet Ödülü"
    ],
    workingHours: {
      "Pazartesi": "09:00 - 19:00",
      "Salı": "09:00 - 19:00", 
      "Çarşamba": "09:00 - 19:00",
      "Perşembe": "09:00 - 19:00",
      "Cuma": "09:00 - 19:00",
      "Cumartesi": "09:00 - 18:00",
      "Pazar": "Kapalı"
    },
    services: [
      { name: "Erkek Saç Kesimi", price: "150₺", duration: "45 dk" },
      { name: "Sakal Bakımı", price: "100₺", duration: "30 dk" },
      { name: "Klasik Tıraş", price: "80₺", duration: "30 dk" },
      { name: "Saç + Sakal Kombo", price: "220₺", duration: "60 dk" },
      { name: "Özel Saç Tasarımı", price: "300₺", duration: "90 dk" }
    ]
  };

  // Parçacık efekti
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.4 + 0.1,
        delay: Math.random() * 3,
        duration: Math.random() * 5 + 3
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    generateParticles();
    const interval = setInterval(generateParticles, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Arka plan efektleri */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background"></div>
        
        {/* Parçacık efektleri */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        {/* Gradient daireler */}
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-gradient-to-l from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Geri dönüş butonu */}
      <div className="absolute top-8 left-8 z-50">
        <Button 
          variant="ghost" 
          className="bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 hover:scale-105 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri Dön
        </Button>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Hero Bölümü */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Sol taraf - Resim */}
          <div className="relative">
            <div className="sticky top-8">
              {/* Ana resim */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <img
                    src={person.mainImage}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                  
                  {/* Hover shine efekti */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>
                
                {/* Alt bilgi kartı */}
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Deneyim</p>
                      <p className="font-semibold text-primary">{person.experience}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Galeri önizlemesi */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {person.galleryImages.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf - İçerik */}
          <div className="space-y-8">
            {/* Başlık */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                {person.name}
              </h1>
              <p className="text-xl text-muted-foreground">{person.role}</p>
              
              {/* Uzmanlık alanları */}
              <div className="flex flex-wrap gap-2">
                {person.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Tab menü */}
            <div className="border-b border-border/50">
              <div className="flex gap-8">
                {[
                  { id: 'about', label: 'Hakkında', icon: '👤' },
                  { id: 'skills', label: 'Yetenekler', icon: '⭐' },
                  { id: 'services', label: 'Hizmetler', icon: '✂️' },
                  { id: 'schedule', label: 'Çalışma Saatleri', icon: '🕐' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`pb-4 px-2 text-sm font-medium border-b-2 transition-all duration-300 hover:text-primary ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab içerikleri */}
            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-lg">{person.about}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                      <h3 className="font-semibold text-primary mb-4">Başarılar</h3>
                      <ul className="space-y-2">
                        {person.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                      <h3 className="font-semibold text-primary mb-4">İstatistikler</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Deneyim</span>
                          <span className="font-semibold">15+ Yıl</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Memnun Müşteri</span>
                          <span className="font-semibold">1000+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uzmanlık Alanı</span>
                          <span className="font-semibold">{person.specialties.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {person.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-primary font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${idx * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  {person.services.map((service, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{service.price}</p>
                          <Button size="sm" className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            Randevu Al
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  {Object.entries(person.workingHours).map(([day, hours], idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                      <span className="font-medium">{day}</span>
                      <span className={`font-semibold ${hours === 'Kapalı' ? 'text-red-500' : 'text-primary'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Butonları */}
            <div className="flex gap-4 pt-8">
              <Button className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-105 hover:shadow-lg py-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Randevu Al
              </Button>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.436L3 21l1.436-5.094A8.959 8.959 0 011 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                Mesaj Gönder
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
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
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}