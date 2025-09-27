import { useState, useEffect, useRef } from "react";

const RazorTextAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [razorPosition, setRazorPosition] = useState(-200);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [reverseAnimationTriggered, setReverseAnimationTriggered] = useState(false);
  const [textChangeTriggered, setTextChangeTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);

  const sentences = [
    "Her erkek bir centilmen olmayı hak eder",
    "Uzman ellerde mükemmel dönüşüm"
  ];

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Razor size based on device
  const getRazorSize = () => {
    if (isMobile) return { width: "20rem", height: "20rem" };
    if (isTablet) return { width: "35rem", height: "35rem" };
    return { width: "50rem", height: "50rem" };
  };

  // Section height based on device
  const getSectionHeight = () => {
    if (isMobile) return "300vh";
    if (isTablet) return "350vh";
    return "400vh";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Section görünür aralıkta mı kontrol et
      if (rect.bottom < 0 || rect.top > windowHeight) {
        return;
      }

      // Scroll progress hesapla - mobile'da daha yumuşak
      const scrollProgress = Math.max(0, Math.min(1, 
        (-rect.top) / (sectionHeight - windowHeight * (isMobile ? 0.8 : 1))
      ));

      // Traş makinesini scroll ile hareket ettir - cihaza göre hız ayarla
      const screenWidth = window.innerWidth;
      const startOffset = isMobile ? -150 : -200;
      const endOffset = isMobile ? 300 : 400;
      const newRazorPosition = (scrollProgress * (screenWidth + endOffset)) + startOffset;
      setRazorPosition(newRazorPosition);

      // Text değişimi için threshold'lar - cihaza göre ayarla
      const textChangeThreshold = isMobile ? 0.5 : 0.6;
      const textResetThreshold = isMobile ? 0.25 : 0.3;

      if (scrollProgress > textChangeThreshold && activeIndex === 0 && !textChangeTriggered) {
        setActiveIndex(1);
        setTextChangeTriggered(true);
      } else if (scrollProgress < textResetThreshold && activeIndex === 1 && textChangeTriggered) {
        setActiveIndex(0);
        setTextChangeTriggered(false);
      }

      // Animation triggers - mobile'da daha erken tetikleme
      const animationStartThreshold = isMobile ? 0.2 : 0.25;
      const animationResetThreshold = isMobile ? 0.15 : 0.2;

      // Aşağı scroll - İlk kez threshold'a ulaştığında animasyonu tetikle
      if (scrollProgress > animationStartThreshold && !animationTriggered) {
        setAnimationTriggered(true);
        setReverseAnimationTriggered(false);
        triggerCuttingEffect();
      }
      // Yukarı scroll - threshold'e geri döndüğünde ters animasyonu tetikle
      else if (scrollProgress < animationResetThreshold && animationTriggered && !reverseAnimationTriggered) {
        setReverseAnimationTriggered(true);
        setAnimationTriggered(false);
        triggerCuttingEffect();
      }
    };

    const triggerCuttingEffect = () => {
      setIsAnimating(true);

      // Animasyon bitişi - mobile'da daha kısa
      setTimeout(() => {
        setIsAnimating(false);
      }, isMobile ? 800 : 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationTriggered, reverseAnimationTriggered, activeIndex, textChangeTriggered, isMobile]);

  const razorSize = getRazorSize();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: getSectionHeight() }}
    >
      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0" />
        
        {/* Animated razor */}
        <div
          className="absolute top-1/2 z-20 transition-all duration-300 ease-out"
          style={{
            left: `${razorPosition}px`,
            transform: "translate(-55%, -50%)",
            width: razorSize.width,
            height: razorSize.height,
          }}
        >
          <img
            src="/index/tras_makinesi.jpg"
            alt="Traş Makinesi"
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{
              filter: "brightness(1.2) contrast(1.1)",
            }}
          />
          
          {/* Cutting effect trail */}
          {isAnimating && (
            <div
              className={`absolute top-1/2 ${isMobile ? '-right-10' : '-right-20'} h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-white to-transparent`}
              style={{
                width: "0",
                transform: "translateY(-50%)",
                animation: `sparkle ${isMobile ? '0.8s' : '1s'} ease-out`,
              }}
            />
          )}
        </div>

        {/* Main text */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-sm sm:max-w-2xl md:max-w-4xl">
          <div className={`relative ${isMobile ? 'h-24' : 'h-28 sm:h-32'} flex items-center justify-center`}>
            {sentences.map((sentence, index) => (
              <h1
                key={index}
                className={`absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-white transition-all duration-500 leading-tight ${
                  index === activeIndex
                    ? "opacity-100 transform translate-y-0 scale-100"
                    : "opacity-0 transform translate-y-4 sm:translate-y-8 scale-95"
                }`}
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {sentence.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block transition-all duration-200"
                    style={{
                      animationDelay: `${charIndex * (isMobile ? 0.02 : 0.03)}s`,
                      animation: index === activeIndex && !isAnimating 
                        ? `slideInChar ${isMobile ? '0.4s' : '0.6s'} ease-out forwards` 
                        : "slideInChar"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            ))}
          </div>

          {/* Cutting line effect */}
          {isAnimating && (
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
              style={{
                transform: "translateY(-50%)",
                animation: `cuttingLine ${isMobile ? '0.8s' : '1s'} ease-in-out`,
              }}
            />
          )}
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes slideInChar {
          0% {
            opacity: 0;
            transform: translateY(10px) rotateX(-45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        
        @keyframes sparkle {
          0% {
            opacity: 0;
            width: 0;
          }
          100% {
            opacity: 1;
            width: ${isMobile ? '200px' : isTablet ? '350px' : '500px'};
          }
        }
        
        @keyframes cuttingLine {
          0% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) scaleX(1);
          }
        }

        /* Mobile optimizations */
        @media (max-width: 767px) {
          @keyframes slideInChar {
            0% {
              opacity: 0;
              transform: translateY(8px) rotateX(-30deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default RazorTextAnimation;