import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

// Animasyonun tamamlanması için ne kadar scroll mesafesi gerektiğini belirler.
// Değeri artırmak animasyonu yavaşlatır, azaltmak hızlandırır.
// Örneğin 2, ekran yüksekliğinin 2 katı kadar kaydırma gerektiğini belirtir.
const ANIMATION_SCROLL_FACTOR = 2; 

function ScrollRevealAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const progressAccumulator = useRef(0);
  const lastTouchY = useRef(0);

  const items = [
    {
      title: "Profesyonel Dokunuş",
      desc: "Alanında uzman berberlerden hizmet alırsınız.",
      shortDesc: "Uzman berberlerden profesyonel hizmet.",
    },
    {
      title: "Kişiye Özel Yaklaşım",
      desc: "Yüz hatlarınıza uygun stil önerileri.",
      shortDesc: "Yüz hatlarınıza uygun stil önerileri.",
    },
    {
      title: "Keyifli Atmosfer",
      desc: "Rahat ve centilmence tasarlanmış ortamda hizmet.",
      shortDesc: "Rahat ve centilmence ortam.",
    },
  ];

  // Cihaz boyutunu kontrol et
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Ana scroll ve event dinleyicileri
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalAnimationScroll = window.innerHeight * ANIMATION_SCROLL_FACTOR;

    // Hem tekerlek hem de dokunma için ilerlemeyi güncelleyen merkezi fonksiyon
    const updateProgress = (delta) => {
      progressAccumulator.current += delta;
      
      // İlerlemeyi 0 ile toplam mesafe arasında sınırla
      progressAccumulator.current = Math.max(0, Math.min(totalAnimationScroll, progressAccumulator.current));

      const newProgress = progressAccumulator.current / totalAnimationScroll;
      setScrollProgress(newProgress);

      // Animasyon tamamlandığında kilidi kaldır
      if (newProgress >= 1) {
        setIsLocked(false);
      } else if (section.getBoundingClientRect().top <= 0) {
        // Animasyon bitmediyse ve hala tepedeysek kilitli kal
        setIsLocked(true);
      }
    };
    
    // Sayfa scroll pozisyonunu dinleyerek kilidi ne zaman başlatacağını veya sıfırlayacağını belirler
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      
      // Animasyon alanı ekranın tepesine ulaştığında kilitlemeyi başlat
      if (rect.top <= 0 && scrollProgress < 1) {
        if (!isLocked) setIsLocked(true);
      }
      
      // Kullanıcı yukarı kaydırıp animasyon alanından tamamen çıktığında her şeyi sıfırla
      if (rect.top > 0) {
        if (isLocked) setIsLocked(false);
        if (scrollProgress > 0) {
            setScrollProgress(0);
            progressAccumulator.current = 0;
        }
      }

      // Kilitliyken sayfanın kaymasını engelle
      if (isLocked) {
        section.scrollIntoView();
      }
    };

    // Fare tekerleği olayını dinle
    const handleWheel = (e) => {
      if (isLocked) {
        e.preventDefault();
        updateProgress(e.deltaY);
      }
    };

    // Dokunmatik olayları dinle
    const handleTouchStart = (e) => {
      if (isLocked) {
        lastTouchY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (isLocked) {
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const delta = lastTouchY.current - touchY; // Ters yönde delta
        updateProgress(delta * 1.5); // Dokunma hassasiyetini artır
        lastTouchY.current = touchY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLocked, scrollProgress]);

  const revealWidth = scrollProgress * 100;

  return (
    // Animasyonun gerçekleşmesi için scroll alanı yarat
    <div style={{ height: `${(ANIMATION_SCROLL_FACTOR + 1) * 100}vh` }}>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden sticky top-0"
      >
        {/* Arka Plan (Karalama) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("index/sketch_once.png")`,
            backgroundPosition: isMobile ? "center top" : "center",
          }}
        />

        {/* Ön Plan (Gerçek Fotoğraf) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("index/sketch_sonra.png")`,
            backgroundPosition: isMobile ? "center top" : "center",
            clipPath: `inset(0 ${100 - revealWidth}% 0 0)`,
          }}
        />

        {/* Ayırıcı Çizgi */}
        <div
          className={`absolute top-0 bottom-0 ${isMobile ? 'w-0.5' : 'w-1'} bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400`}
          style={{
            left: `${revealWidth}%`,
            boxShadow: `0 0 ${isMobile ? 15 : 30}px rgba(251, 191, 36, 0.8), 0 0 ${isMobile ? 30 : 60}px rgba(251, 191, 36, 0.4)`,
            filter: `blur(${isMobile ? 0.3 : 0.5}px)`,
            opacity: scrollProgress > 0 && scrollProgress < 1 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Yazı İçeriği */}
        <div className={`absolute ${
            isMobile 
              ? "bottom-4 left-4 right-4" 
              : "bottom-0 left-0 p-8 lg:p-16 max-w-lg"
        }`}>
          {items.map((item, index) => {
            const itemDelay = 0.1 + index * 0.15;
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - itemDelay) * 2.5));

            return (
              <div
                key={item.title}
                className={`transition-all duration-500 ease-out ${isMobile ? 'mb-3' : 'mb-6'}`}
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${20 - itemProgress * 20}px)`,
                }}
              >
                <div className={`flex items-start gap-3 ${isMobile ? 'p-3' : 'p-4'} rounded-xl backdrop-blur-md bg-white/20 border border-white/30`}>
                    <div
                      className="flex-shrink-0 text-amber-400 pt-0.5"
                    >
                      <ShieldCheck className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white font-bold mb-1 text-shadow`}>
                          {item.title}
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/80 leading-relaxed text-shadow-sm`}>
                          {isMobile ? item.shortDesc : item.desc}
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ScrollRevealAnimation;