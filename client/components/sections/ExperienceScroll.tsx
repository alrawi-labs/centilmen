import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

function ScrollRevealAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const animationSectionRef = useRef(null);
  const lockedScrollPosition = useRef(0);
  const wheelEventRef = useRef(0);

  const items = [
    {
      title: "Profesyonel Dokunuş",
      desc: "Alanında uzman berberlerden hizmet alırsınız.",
    },
    {
      title: "Kişiye Özel Yaklaşım",
      desc: "Yüz hatlarınıza uygun stil önerileri.",
    },
    {
      title: "Keyifli Atmosfer",
      desc: "Rahat ve centilmence tasarlanmış ortamda hizmet.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!animationSectionRef.current) return;

      const rect = animationSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animasyon bölümüne ulaştığımızda
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        if (!isLocked && !animationComplete) {
          setIsLocked(true);
          lockedScrollPosition.current = window.scrollY;
        }

        // Animasyon devam ediyorsa scroll'u sabitle
        if (!animationComplete) {
          window.scrollTo(0, lockedScrollPosition.current);
        }
      }

      // Animasyon bölümünden çıkıldığında reset
      if (rect.top > 0) {
        setScrollProgress(0);
        setIsLocked(false);
        setAnimationComplete(false);
        wheelEventRef.current = 0;
      }
    };

    const handleWheel = (e) => {
      if (!isLocked || animationComplete) return;

      e.preventDefault();

      // Wheel delta'sını normalize et (farklı cihazlar için)
      const delta = Math.sign(e.deltaY);

      if (delta > 0) {
        // Aşağı scroll
        wheelEventRef.current += 1;

        // Daha yavaş ilerleme için daha büyük bölme değeri kullan
        const newProgress = Math.min(wheelEventRef.current / 150, 1); // 150 wheel event = %100
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setAnimationComplete(true);
          setIsLocked(false);
          // Biraz gecikme ile normal scroll'a geç
          setTimeout(() => {
            window.scrollTo(0, lockedScrollPosition.current + 1);
          }, 100);
        }
      } else {
        // Yukarı scroll
        wheelEventRef.current = Math.max(wheelEventRef.current - 1, 0);
        const newProgress = Math.max(wheelEventRef.current / 150, 0);
        setScrollProgress(newProgress);

        if (newProgress < 1) {
          setAnimationComplete(false);
          setIsLocked(true);
        }
      }
    };

    // Event listener'ları ekle
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    // İlk kontrol
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isLocked, animationComplete]);

  const revealWidth = scrollProgress * 100;

  return (
    <div className="min-h-[300vh]">
      {/* Locked Animation Section */}
      <section
        ref={animationSectionRef}
        className="relative h-screen w-full overflow-hidden sticky top-0"
      >
        {/* Sketch Image (Background - Full Screen) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url("index/sketch_once.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Realistic Photo (Revealed from left to right) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-75 ease-linear"
          style={{
            backgroundImage: `url("index/sketch_sonra.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `inset(0 ${100 - revealWidth}% 0 0)`,
          }}
        />

        {/* Reveal Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 transition-all duration-75 ease-linear"
          style={{
            left: `${revealWidth}%`,
            boxShadow:
              "0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4)",
            filter: "blur(0.5px)",
            opacity: revealWidth > 0 ? 1 : 0,
          }}
        />

        {/* Text Content - Bottom Left */}
        <div className="absolute bottom-0 left-0 p-8 lg:p-16 max-w-lg">
          {items.map((item, index) => {
            const itemDelay = 0.2 + index * 0.15;
            const itemProgress = Math.max(
              0,
              Math.min((scrollProgress - itemDelay) * 2, 1),
            );

            return (
              <div
                key={item.title}
                className="mb-6 transition-all duration-300 ease-out"
                style={{
                  opacity: itemProgress,
                  transform: `translateX(${Math.max(-50 + itemProgress * 50, 0)}px) translateY(${Math.max(10 - itemProgress * 10, 0)}px)`,
                }}
              >
                <div className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30">
                  <div
                    className="flex-shrink-0 transition-all duration-300"
                    style={{
                      transform: `scale(${0.8 + itemProgress * 0.2})`,
                      color: itemProgress > 0.5 ? "#f59e0b" : "#9ca3af",
                    }}
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div
                      className="text-base font-bold mb-1 transition-colors duration-300"
                      style={{
                        color:
                          itemProgress > 0.3
                            ? "#ffffff"
                            : "rgba(255,255,255,0.6)",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm leading-relaxed transition-colors duration-300"
                      style={{
                        color:
                          itemProgress > 0.3
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(255,255,255,0.5)",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.desc}
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
