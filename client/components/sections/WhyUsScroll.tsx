import { useState, useEffect, useRef } from "react";
import { FiUsers, FiTrendingUp, FiClock, FiSmile } from "react-icons/fi";
import { GiBrokenHeartZone } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPeopleLine } from "react-icons/fa6";
const WhyUsScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const contentData = [
  {
    id: 1,
    title: "Uzman Kadro",
    description:
      "Tecrübeli stylistlerimiz ve tıraş ustalarımız, her müşteriye özel stil sunuyor.",
    image:
      "index/uzman_kadro.jpg",
    icon: <FaPeopleLine className="text-6xl text-primary mb-4" />,
  },
  {
    id: 2,
    title: "Modern ve Şık Hizmet",
    description:
      "Güncel trendleri takip eden modern saç kesimleri ve sakal tıraşı ile tarzınızı yansıtıyoruz.",
    image:
      "index/hizmet.jpg",
    icon: <MdMiscellaneousServices className="text-6xl text-primary mb-4" />,
  },
  {
    id: 3,
    title: "Kolay ve Hızlı Randevu",
    description:
      "Online platformumuz sayesinde dilediğiniz saati kolayca seçip randevunuzu oluşturabilirsiniz.",
    image:
      "index/randevu.jpg",
    icon: <FaClock className="text-5xl text-primary mb-4" />,
  },
  {
    id: 4,
    title: "Müşteri Memnuniyeti ve Konfor",
    description:
      "Rahat ve güvenli ortamımız, hijyen ve kişiye özel ilgi ile her ziyaretinizi keyifli kılar.",
    image:
      "index/memnuniyet.jpg",
    icon: <GiBrokenHeartZone  className="text-5xl text-primary mb-4" />,
  },
];


  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Section tam görünür aralıkta mı kontrol et
      if (rect.bottom < 0 || rect.top > windowHeight) {
        return;
      }

      // Section içindeki scroll progress'i hesapla
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (sectionHeight - windowHeight)),
      );

      // Progress'e göre aktif index'i belirle
      let newIndex = 0;
      if (scrollProgress > 0.75) {
        newIndex = 3;
      } else if (scrollProgress > 0.5) {
        newIndex = 2;
      } else if (scrollProgress > 0.25) {
        newIndex = 1;
      } else {
        newIndex = 0;
      }

      setActiveIndex(newIndex);
      setIsInView(true);
    };

    // İlk yükleme
    handleScroll();

    // Scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeContent = contentData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="container mx-auto max-w-6xl px-4"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-10 py-14">
        {/* Ana başlık */}

        {/* İçerik container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Sol taraf - Görsel */}
          <div className="order-2 md:order-1">
            <div className="relative h-80 md:h-96 lg:h-[32rem] xl:h-[40rem] overflow-hidden rounded-2xl">
              <img
                key={activeContent.id}
                src={activeContent.image}
                alt={activeContent.title}
                className="w-full h-full object-cover transition-all duration-500 ease-out transform"
                style={{
                  animation: isInView ? "fadeInScale 0.6s ease-out" : "none",
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {contentData.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sağ taraf - İçerik */}
          <div className="order-1 md:order-2 space-y-6 h-full flex flex-col justify-top items-top text-left">
            <h2 className="text-3xl font-semibold mb-8 mb-40 mt-10">
              Müşterilerimiz neden Centilmen'i tercih ediyor
            </h2>
            <div
              key={`${activeContent.id}-content`}
              className="transform transition-all duration-500 ease-out"
              style={{
                animation: isInView ? "slideInFromRight 0.6s ease-out" : "none",
              }}
            >
              {activeContent.icon}
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-primary py-10">
                {activeContent.title}
              </h3>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {activeContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default WhyUsScroll;
