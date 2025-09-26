import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Verified, Heart, MessageCircle, Award, Users, TrendingUp } from 'lucide-react';

// Mock data - premium testimonials
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    role: "İş İnsanı",
    avatar: "👨‍💼",
    rating: 5,
    text: "20 yıldır hiç bu kadar memnun kalmamıştım. Gerçek bir centilmen oldum. Artık tüm arkadaşlarım bana berberini soruyor!",
    verified: true,
    date: "2 gün önce",
    service: "High Fade + Sakal"
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "Mimar",
    avatar: "👨‍🎨",
    rating: 5,
    text: "Harika bir deneyim! Sadece saç kesimi değil, tam bir bakım hizmeti aldım. Çok profesyonel ve temiz.",
    verified: true,
    date: "1 hafta önce",
    service: "Pompadour + Yıkama"
  },
  {
    id: 3,
    name: "Can Özkan",
    role: "Mühendis",
    avatar: "👨‍💻",
    rating: 5,
    text: "İlk defa böyle özenli bir hizmet gördüm. Her detay mükemmel düşünülmüş. Kesinlikle tavsiye ederim.",
    verified: true,
    date: "3 gün önce",
    service: "Undercut + Sakal Şekillendirme"
  },
  {
    id: 4,
    name: "Emre Kaya",
    role: "Doktor",
    avatar: "👨‍⚕️",
    rating: 5,
    text: "Hijyen ve kalite bir arada. Çok rahatladım ve kendimi yenilenmiş hissediyorum. Sürekli müşterisi olacağım.",
    verified: true,
    date: "5 gün önce",
    service: "Klasik Kesim + Yıkama"
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-play carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % TESTIMONIALS.length;
      visible.push(TESTIMONIALS[index]);
    }
    return visible;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative container mx-auto max-w-7xl px-4 py-24 overflow-hidden"
    >
      {/* Epic background decorations */}
      <div className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
      <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-tr from-primary/15 via-primary/8 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rounded-full animate-bounce" style={{animationDuration: '3s'}} />
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-primary/20 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
      
      {/* Header Section */}
      <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        
        {/* Premium badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 rounded-full border border-primary/20 backdrop-blur-sm">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-primary tracking-wide">MÜŞTERI DENEYİMLERİ</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-primary">4.9/5</span>
          </div>
        </div>
        
        {/* Main title */}
        <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Müşterilerimiz
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Ne Diyor?
          </span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Centilmen dönüşümlerinin gerçek hikayelerini keşfedin
        </p>
        
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <Verified className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">Doğrulanmış yorumlar</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">500+ mutlu müşteri</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">%98 memnuniyet</span>
          </div>
        </div>
      </div>

      {/* Main testimonials grid */}
      <div className={`relative ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
        
        {/* Navigation buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}`}
              className={`group relative transform transition-all duration-700 ${
                index === 1 ? 'scale-105 z-10' : 'scale-100'
              } ${
                index === 0 ? 'md:-rotate-1' : index === 2 ? 'md:rotate-1' : ''
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible ? 'cardSlideIn 0.8s ease-out forwards' : 'none'
              }}
              onMouseEnter={() => setActiveCard(testimonial.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Premium card */}
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
                activeCard === testimonial.id 
                  ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105' 
                  : 'border-border/30 hover:border-primary/30'
              }`}>
                
                {/* Quote decoration */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" 
                      style={{
                        animation: `starGlow 2s ease-in-out infinite ${i * 0.2}s`
                      }}
                    />
                  ))}
                  <div className="ml-2 px-2 py-1 bg-primary/10 rounded-full">
                    <span className="text-xs font-bold text-primary">5.0</span>
                  </div>
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-base leading-relaxed mb-6 text-foreground/90 font-medium">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Service tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                  <Award className="h-3 w-3 text-primary" />
                  <span className="text-xs font-semibold text-primary">{testimonial.service}</span>
                </div>
                
                {/* Customer info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xl shadow-lg">
                      {testimonial.avatar}
                    </div>
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                        <Verified className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary/70 mt-1">{testimonial.date}</div>
                  </div>
                  
                  <Heart className={`h-5 w-5 transition-all duration-300 ${
                    activeCard === testimonial.id 
                      ? 'text-red-500 fill-red-500 scale-125' 
                      : 'text-muted-foreground'
                  }`} />
                </div>
                
                {/* Premium glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 ${
                  activeCard === testimonial.id ? 'opacity-100' : ''
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className={`mt-16 text-center ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
        
        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
        
        {/* CTA section */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
          <p className="text-xl font-semibold mb-4">
            Sen de bir centilmen dönüşümü yaşamak istiyor musun?
          </p>
          <p className="text-muted-foreground mb-6">
            Randevu al, dönüşümünü yaşa, sonra senin de yorumun burada olsun!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/randevu"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Hemen Randevu Al
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-1">
                {['👨‍💼', '👨‍🎨', '👨‍💻', '👨‍⚕️'].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs">
                    {emoji}
                  </div>
                ))}
              </div>
              <span>Bu ay 127+ kişi randevu aldı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Epic custom animations */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes cardSlideIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes starGlow {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 transparent);
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.6));
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;