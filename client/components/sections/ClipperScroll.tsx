import { useState, useEffect, useRef } from "react";

const RazorTextAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [razorPosition, setRazorPosition] = useState(-200);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [reverseAnimationTriggered, setReverseAnimationTriggered] = useState(false);
  const [textChangeTriggered, setTextChangeTriggered] = useState(false);
  const sectionRef = useRef(null);

  const sentences = [
    "Her erkek bir centilmen olmayı hak eder",
    "Uzman ellerde mükemmel dönüşüm"
  ];

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

      // Scroll progress hesapla
      const scrollProgress = Math.max(0, Math.min(1, 
        (-rect.top) / (sectionHeight - windowHeight)
      ));

      // Traş makinesini scroll ile hareket ettir
      const screenWidth = window.innerWidth;
      const newRazorPosition = (scrollProgress * (screenWidth + 400)) - 200;
      setRazorPosition(newRazorPosition);

      // Text değişimi için threshold'lar - sadece bir kez tetiklensin
      if (scrollProgress > 0.6 && activeIndex === 0 && !textChangeTriggered) {
        setActiveIndex(1);
        setTextChangeTriggered(true);
      } else if (scrollProgress < 0.3 && activeIndex === 1 && textChangeTriggered) {
        setActiveIndex(0);
        setTextChangeTriggered(false);
      }

      // Aşağı scroll - İlk kez %25'e ulaştığında animasyonu tetikle
      if (scrollProgress > 0.25 && !animationTriggered) {
        setAnimationTriggered(true);
        setReverseAnimationTriggered(false);
        triggerCuttingEffect();
      }
      // Yukarı scroll - %20'ye geri döndüğünde ters animasyonu tetikle
      else if (scrollProgress < 0.2 && animationTriggered && !reverseAnimationTriggered) {
        setReverseAnimationTriggered(true);
        setAnimationTriggered(false);
        triggerCuttingEffect();
      }
    };

    const triggerCuttingEffect = () => {
      setIsAnimating(true);

      // Animasyon bitişi
      setTimeout(() => {
        setIsAnimating(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationTriggered, reverseAnimationTriggered, activeIndex, textChangeTriggered]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 " />
        
        {/* Animated razor */}
        <div
          className="absolute top-1/2 z-20 w-[50rem] h-[50rem]"
          style={{
            left: `${razorPosition}px`,
            transform: "translate(-55%, -50%)",
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
              className="absolute top-1/2 -right-20 h-1 bg-gradient-to-r from-blue-400 via-white to-transparent"
              style={{
                width: "0",
                transform: "translateY(-50%)",
                animation: "sparkle 1s ease-out",
              }}
            />
          )}
        </div>

        {/* Main text */}
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <div className="relative h-32 flex items-center justify-center">
            {sentences.map((sentence, index) => (
              <h1
                key={index}
                className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl lg:text-7xl font-black text-white transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 transform translate-y-0 scale-100"
                    : "opacity-0 transform translate-y-8 scale-95"
                }`}
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {sentence.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block transition-all duration-200"
                    style={{
                      animationDelay: `${charIndex * 0.03}s`,
                      animation: index === activeIndex && !isAnimating 
                        ? "slideInChar 0.6s ease-out forwards" 
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
              className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
              style={{
                transform: "translateY(-50%)",
                animation: "cuttingLine 1s ease-in-out",
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
            transform: translateY(20px) rotateX(-90deg);
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
            width: 500px;
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
      `}</style>
    </section>
  );
};

export default RazorTextAnimation;