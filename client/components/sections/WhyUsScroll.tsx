import { useState, useEffect, useRef } from "react";
import { FaClock, FaPeopleLine } from "react-icons/fa6";
import { GiBrokenHeartZone } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import type { MutableRefObject } from "react";

// PERFORMANS İÇİN CUSTOM HOOK (Değişiklik yok)
const useInView = (
  options?: IntersectionObserverInit
): [MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};


const WhyUsScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const [sectionRef, isInView] = useInView({ threshold: 0 });

  const contentData = [
    {
      id: 1,
      title: "Uzman Kadro",
      description: "Tecrübeli stylistlerimiz ve tıraş ustalarımız, her müşteriye özel stil sunuyor.",
      image: "index/uzman_kadro.jpg",
      icon: <FaPeopleLine className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-3 sm:mb-4" />,
    },
    {
      id: 2,
      title: "Modern ve Şık Hizmet",
      description: "Güncel trendleri takip eden modern saç kesimleri ve sakal tıraşı ile tarzınızı yansıtıyoruz.",
      image: "index/hizmet.jpg",
      icon: <MdMiscellaneousServices className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-3 sm:mb-4" />,
    },
    {
      id: 3,
      title: "Kolay ve Hızlı Randevu",
      description: "Online platformumuz sayesinde dilediğiniz saati kolayca seçip randevunuzu oluşturabilirsiniz.",
      image: "index/randevu.jpg",
      icon: <FaClock className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-3 sm:mb-4" />,
    },
    {
      id: 4,
      title: "Müşteri Memnuniyeti",
      description: "Rahat ve güvenli ortamımız, hijyen ve kişiye özel ilgi ile her ziyaretinizi keyifli kılar.",
      image: "index/memnuniyet.jpg",
      icon: <GiBrokenHeartZone className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-3 sm:mb-4" />,
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isInView || isMobile) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      
      const newIndex = Math.min(
        contentData.length - 1,
        Math.floor(scrollProgress * contentData.length)
      );

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView, isMobile, contentData.length, activeIndex]);

  const activeContent = contentData[activeIndex];

  return (
    <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-24">
      <div
        ref={sectionRef}
        style={{ height: isMobile ? "auto" : "400vh", position: 'relative' }}
      >
        {/* DÜZENLEME: h-screen, flex ve items-center class'larına lg: ön eki eklendi. */}
        <div className="lg:sticky lg:top-10 lg:h-screen lg:flex lg:items-center">
          <div className="w-full">
            {/* MOBİL GÖRÜNÜM */}
            {isMobile && (
              <div className="space-y-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
                  Neden Centilmen'i Tercih Etmelisiniz?
                </h2>
                {contentData.map((item) => (
                  <div key={item.id} className="bg-card p-6 rounded-2xl shadow-lg border border-border/20">
                    <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="text-center">
                      {item.icon}
                      <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MASAÜSTÜ GÖRÜNÜM */}
            {!isMobile && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Sol taraf - Görsel */}
                <div className="order-2 lg:order-1">
                  <div className="relative h-[32rem] xl:h-[40rem] overflow-hidden rounded-2xl shadow-xl">
                    <img
                      key={activeContent.id}
                      src={activeContent.image}
                      alt={activeContent.title}
                      className="w-full h-full object-cover animate-fadeInScale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    {contentData.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sağ taraf - İçerik */}
                <div className="order-1 lg:order-2 flex flex-col justify-center h-full">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-8">
                    Müşterilerimiz neden bizi tercih ediyor?
                  </h2>
                  <div key={`${activeContent.id}-content`} className="animate-slideInFromRight">
                    {activeContent.icon}
                    <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                      {activeContent.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                      {activeContent.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS Animasyonları (Değişiklik yok) */}
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0.8; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInScale { animation: fadeInScale 0.6s ease-out forwards; }
        .animate-slideInFromRight { animation: slideInFromRight 0.6s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default WhyUsScroll;