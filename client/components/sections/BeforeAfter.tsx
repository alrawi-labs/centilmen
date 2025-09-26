import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Sparkles, Star, Users, Award, ArrowRight, Play } from 'lucide-react';

// Mock BeforeAfter component with proper aspect ratio
const BeforeAfter = ({ beforeSrc, afterSrc, alt }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-crosshair"
      style={{ aspectRatio: '633/896' }}
    >
      {/* After image (full) */}
      <img
        src={afterSrc}
        alt={`${alt} - Sonra`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Before image (clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} - Önce`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      
      {/* Slider line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider handle */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform"
          onMouseDown={handleMouseDown}
        >
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm font-medium rounded-full backdrop-blur-sm">
        Önce
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 text-black text-sm font-medium rounded-full backdrop-blur-sm">
        Sonra
      </div>
      
      {/* Premium overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Drag instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-xs font-medium rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        ← Sürükleyerek karşılaştır →
      </div>
    </div>
  );
};

function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section 
      ref={sectionRef}
      className="relative container mx-auto max-w-7xl px-4 py-20 overflow-hidden "
    >
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        {/* Sol taraf - Content */}
        <div className={`space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
          
          {/* Header section */}
          <div className="space-y-6">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Premium Dönüşümler</span>
            </div>
            
            {/* Main title */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Yaptığımız
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Centilmenleri
                </span>
                <br />
                Görün
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Bize güvenen misafirlerimizin centilmene gerçek dönüşümlerini keşfedin. Her kesim, bir sanat eseri.
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm border border-border/40">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm border border-border/40">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                <Star className="h-6 w-6 text-primary fill-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Ortalama Puan</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm border border-border/40">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Yıl Deneyim</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#galeri"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg hover:from-primary/90 hover:to-primary hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Galeriyi Görün
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button className="group inline-flex items-center gap-3 border-2 border-primary/20 text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Videoları İzle
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 pt-4 ">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                  {i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                +95
              </div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">Bu ay 100+ dönüşüm</div>
              <div className="text-muted-foreground">Güvenilir berber deneyimi</div>
            </div>
          </div>
        </div>

        {/* Sağ taraf - Before/After Image */}
        <div className={`relative ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
          
          {/* Premium frame */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/20 shadow-2xl transform scale-90">
            
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />
            
            {/* Main image container */}
            <BeforeAfter
              beforeSrc="index/kesim_once.png"
              afterSrc="index/kesim_sonra.png"
              alt="Centilmen Dönüşümü"
            />
            
            {/* Premium badge on image */}
            <div className="absolute top-10 left-10 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-sm font-bold rounded-full shadow-lg backdrop-blur-sm">
              Önce
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl animate-pulse">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{animationDuration: '3s'}}>
            <Star className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out 0.2s forwards;
        }
      `}</style>
    </section>
  );
}

export default Gallery;