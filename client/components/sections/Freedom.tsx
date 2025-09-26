import React, { useState, useEffect, useRef } from 'react';
import { Check, Crown, Star, Sparkles, Zap, Clock, User, Scissors, Heart, Palette } from 'lucide-react';

function Freedom() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const items = [
    {
      title: "Saç Modeli Seçimi",
      desc: "Hayalinizdeki saç modeli artık hayal değil. Binlerce model arasından size en yakışanı seçin, kendi stilinizi yaratın.",
      icon: Scissors,
      gradient: "from-[#9c6f4f] to-[#7a5740]",
      bgGradient: "from-[#9c6f4f]/20 to-[#7a5740]/10",
      accentColor: "text-[#9c6f4f]",
      shadowColor: "shadow-[#9c6f4f]/30",
      ringColor: "ring-[#9c6f4f]/50",
      decorativeIcon: Palette,
      feature: "Kişisel Stil Danışmanlığı"
    },
    {
      title: "Uzman Kuaför Seçimi", 
      desc: "Alanında uzman, deneyimli kuaförlerimiz arasından size en uygun olanını seçin. Her biri sanat eseri yaratmaya hazır.",
      icon: User,
      gradient: "from-[#9c6f4f] to-[#8b6248]",
      bgGradient: "from-[#9c6f4f]/20 to-[#8b6248]/10", 
      accentColor: "text-[#9c6f4f]",
      shadowColor: "shadow-[#9c6f4f]/30",
      ringColor: "ring-[#9c6f4f]/50",
      decorativeIcon: Crown,
      feature: "Profesyonel Deneyim"
    },
    {
      title: "Esnek Saat Seçimi",
      desc: "7/24 esnek randevu sistemi ile istediğiniz saatte, istediğiniz gün randevunuzu alın. Özgürlük sizin elinizde.",
      icon: Clock,
      gradient: "from-[#9c6f4f] to-[#a67c5a]",
      bgGradient: "from-[#9c6f4f]/20 to-[#a67c5a]/10",
      accentColor: "text-[#9c6f4f]", 
      shadowColor: "shadow-[#9c6f4f]/30",
      ringColor: "ring-[#9c6f4f]/50",
      decorativeIcon: Zap,
      feature: "7/24 Esnek Sistem"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      if (rect.bottom < 0 || rect.top > windowHeight) {
        return;
      }

      const rawProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + sectionHeight)
      ));
      
      setScrollProgress(rawProgress);

      if (rawProgress < 0.15) {
        setCurrentItemIndex(-1);
        setIsCompleted(false);
      } else if (rawProgress < 0.4) {
        setCurrentItemIndex(0);
        setIsCompleted(false);
      } else if (rawProgress < 0.65) {
        setCurrentItemIndex(1);
        setIsCompleted(false);
      } else if (rawProgress < 0.9) {
        setCurrentItemIndex(2);
        setIsCompleted(false);
      } else {
        setCurrentItemIndex(2);
        setIsCompleted(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getItemProgress = (itemIndex) => {
    const itemStart = 0.15 + (itemIndex * 0.25);
    const itemEnd = itemStart + 0.25;
    
    if (scrollProgress < itemStart) return 0;
    if (scrollProgress > itemEnd) return 1;
    
    return (scrollProgress - itemStart) / 0.25;
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-b from-gray-900 via-black to-[#1b1d27]"
      style={{ 
        height: '600vh',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#9c6f4f]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#9c6f4f]/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div 
        ref={containerRef} 
        className="sticky top-0 flex items-center justify-center min-h-screen px-4"
      >
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center mb-20 relative z-20">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight relative mt-[150px]">
                <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent drop-shadow-2xl">
                  ÖZGÜRLÜK
                </span>
              </h1>
              
              <Crown 
                className="absolute -top-12 -left-12 w-16 h-16 text-yellow-400 mt-[150px]" 
                style={{
                  opacity: scrollProgress > 0.05 ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              />
              <Scissors 
                className="absolute -top-8 -right-16 w-12 h-12 text-[#9c6f4f] mt-[350px]" 
                style={{
                  opacity: scrollProgress > 0.08 ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              />
              <Heart 
                className="absolute -bottom-10 left-1/2 w-14 h-14 text-[#9c6f4f]/80" 
                style={{
                  opacity: scrollProgress > 0.12 ? 1 : 0,
                  transition: 'opacity 0.5s ease-out',
                  transform: 'translateX(-50%)'
                }}
              />
              <Sparkles 
                className="absolute top-1/2 -right-20 w-10 h-10 text-[#9c6f4f]/70" 
                style={{
                  opacity: scrollProgress > 0.1 ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              />
            </div>
            
            <p 
              className="text-3xl text-white/90 mt-12 font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
              style={{
                opacity: scrollProgress > 0.1 ? 1 : 0,
                transform: `translateY(${scrollProgress > 0.1 ? 0 : 40}px)`,
                transition: 'all 1s ease-out'
              }}
            >
              Seçim özgürlüğünüz bizim <span className="text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text font-semibold">önceliğimiz</span>
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[200px] relative z-10">
            
            {items.map((item, index) => {
              const isCurrentItem = currentItemIndex === index;
              const itemProgress = getItemProgress(index);
              const Icon = item.icon;
              const DecorativeIcon = item.decorativeIcon;
              
              const shouldShow = isCurrentItem;
              
              let opacity = 0;
              let scale = 0.7;
              
              if (isCurrentItem) {
                opacity = Math.min(1, itemProgress * 1.5);
                scale = 0.6 + (itemProgress * 0.3);
              }
              
              return (
                <div
                  key={item.title}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    left: '36%',
                    marginLeft: '-240px',
                    width: '780px'
                  }}
                >
                  <div className={`relative rounded-lg bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl border border-white/30 overflow-hidden shadow-2xl ${item.shadowColor} group`}
                       style={{ 
                         height: isCompleted ? '320px' : '400px',
                         padding: isCompleted ? '1.5rem' : '2rem'
                       }}>
                    
                    <div className="absolute inset-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`} />
                    </div>
                    
                    <div className="relative z-10 flex justify-center mb-6">
                      <div 
                        className={`relative w-16 h-16 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-2xl ${item.shadowColor}`}
                      >
                        <Icon className="w-8 h-8 text-white drop-shadow-xl" />
                        
                        <div className="absolute -top-2 -right-2">
                          <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                            <DecorativeIcon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <h3 
                        className="font-bold text-white mb-4"
                        style={{
                          fontSize: isCompleted ? '1.25rem' : '2.75rem',
                          lineHeight: isCompleted ? '1.75rem' : '2.25rem'
                        }}
                      >
                        {item.title}
                      </h3>
                      
                      <p 
                        className="text-white/80 leading-relaxed mb-4"
                        style={{
                          fontSize: isCompleted ? '0.875rem' : '1.2rem',
                          lineHeight: isCompleted ? '1.25rem' : '1.5rem'
                        }}
                      >
                        {item.desc}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/30 text-xs font-semibold text-white/90">
                        <Star className={`w-3 h-3 ${item.accentColor}`} />
                        {item.feature}
                      </div>
                    </div>
                    
                    <div 
                      className="absolute top-4 right-4"
                      style={{
                        opacity: isCurrentItem ? itemProgress : (isCompleted ? 1 : 0),
                        transition: 'opacity 0.5s ease-out'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400/25 to-emerald-500/25 flex items-center justify-center backdrop-blur-sm border border-green-400/50 shadow-lg">
                        <Check className="w-4 h-4 text-green-400 drop-shadow-sm" />
                      </div>
                    </div>
                    
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${item.gradient} transition-all duration-500`}
                      style={{
                        opacity: isCurrentItem ? 0.6 + (itemProgress * 0.4) : (isCompleted ? 1 : 0)
                      }}
                    />

                    {isCurrentItem && (
                      <div 
                        className={`absolute inset-0 rounded-lg border-2 ${item.ringColor}`}
                        style={{ opacity: itemProgress * 0.8 }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {!isCompleted && currentItemIndex >= 0 && (
            <div className="flex justify-center mt-16 space-x-4 relative z-10">
              {items.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className={`h-3 rounded-sm transition-all duration-500 ${
                      index === currentItemIndex 
                        ? `w-16 bg-gradient-to-r ${item.gradient}` 
                        : index < currentItemIndex 
                          ? 'w-12 bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'w-8 bg-white/20'
                    }`}
                    style={{
                      opacity: index === currentItemIndex ? getItemProgress(index) * 0.8 + 0.2 : 1
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          
          {scrollProgress < 0.05 && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center relative overflow-hidden">
                  <div className="w-2 h-4 bg-gradient-to-b from-rose-400 to-blue-400 rounded-full mt-2"></div>
                </div>
                <span className="text-sm font-light tracking-wide">Keşfetmek için kaydırın</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #9c6f4f, #b8825f);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #8b6248, #a67c5a);
        }
      `}</style>
    </section>
  );
}

export default Freedom;