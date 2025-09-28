import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Award, Star, Crown, Zap, Phone } from 'lucide-react';

function UltimateBarberTeam() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const team = [
    {
      name: "Duran Koçak",
      role: "Usta Kuaför",
      image: "index/usta1.jpg",
      specialty: "Klasik Kesim",
      experience: "15+ Yıl",
      signature: "İmza Tıraş",
      icon: Crown,
      description: "Klasik kesim ve tıraş konusunda uzman. Geleneksel berberlik sanatının ustası."
    },
    {
      name: "Denizcim",
      role: "Master Stylist",
      image: "index/usta2.jpg",
      specialty: "Modern Stil",
      experience: "12+ Yıl",
      signature: "Fade Master",
      icon: Zap,
      description: "Modern saç kesim teknikleri ve fade konusunda uzman stylist."
    },
    {
      name: "Feyzullah",
      role: "Sakal Ustası",
      image: "index/usta3.jpg",
      specialty: "Sakal Şekillendirme",
      experience: "18+ Yıl",
      signature: "Ottoman Style",
      icon: Award,
      description: "Sakal şekillendirme ve klasik tıraş konusunda deneyimli usta."
    },
  ];

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative  py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Simple background decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <Scissors className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-primary font-semibold text-sm sm:text-base">Uzman Ekibimiz</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Ekibimizle Tanışın
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Alanında uzman, deneyimli ve tutkulu berberlerimiz sizin için burada
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {team.map((member, index) => {
            const Icon = member.icon;
            
            return (
              <div
                key={member.name}
                className={`group transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => !isMobile && setActiveCard(index)}
                onMouseLeave={() => !isMobile && setActiveCard(null)}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700  group-hover:border-primary/20">
                  
                  {/* Image Section */}
                  <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className={`absolute top-4 right-4 p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-500 ${
                      activeCard === index ? 'scale-110 bg-primary text-secondary' : 'text-primary'
                    }`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    
                    {/* Rating - Mobile visible, desktop on hover */}
                    <div className={`absolute top-4 left-4 flex items-center gap-1 bg-black/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 transition-all duration-500 ${
                      isMobile ? 'opacity-100' : activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs sm:text-sm font-semibold">5.0</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white-900 group-hover:text-primary transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-primary font-semibold text-sm sm:text-base">{member.role}</p>
                      </div>
                    </div>
                    
                    {/* Info Grid */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-br from-gray-900 via-secondary to-gray-900 rounded-lg">
                        <span className="text-gray-300 text-sm sm:text-base">Uzmanlık</span>
                        <span className="text-primary font-semibold text-sm sm:text-base">{member.specialty}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-br from-gray-900 via-secondary to-gray-900 rounded-lg">
                        <span className="text-gray-300 text-sm sm:text-base">Deneyim</span>
                        <span className="text-primary font-semibold text-sm sm:text-base">{member.experience}</span>
                      </div>
                    </div>
                    
                    
                    
                    {/* Book Button - Mobile always visible, desktop on hover */}
                    <div className={`mt-4 transition-all duration-500 ${
                      isMobile ? 'opacity-100' : activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <button className="w-full bg-primary text-white font-semibold py-2 sm:py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors duration-300 text-sm sm:text-base">
                        Randevu Al
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-12 sm:mt-16 lg:mt-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          
          <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl sm:rounded-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
              Hangi ustamızdan hizmet almak istersiniz?
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Uzman ekibimizden dilediğiniz kişiyi seçerek randevu alabilirsiniz
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/randevu"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Randevu Al
                <Scissors className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              
              <a
                href="tel:+90555123456"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-primary/20 hover:bg-primary/5 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UltimateBarberTeam;