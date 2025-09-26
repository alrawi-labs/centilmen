import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Sparkles,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Coffee,
  Wifi,
  Music,
  Droplets,
  Zap,
  Award,
  Users,
  Crown,
  Leaf,
  Sun,
  Moon,
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroProps";

function ComfortCarePage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      <HeroSection
        words={["RAHATLIK", "KONFOR", "HUZUR", "BAKIM"]}
        p1="Size sadece saç kesimi değil,"
        p2="tam bir yaşam deneyimi"
        p3="sunuyoruz"
        quickOptions={[
          {
            icon: Shield,
            title: "Premium Hijyen",
            desc: "Steril ortam garantisi",
          },
          { icon: Crown, title: "VIP Deneyim", desc: "Kişiye özel hizmet" },
          {
            icon: Sparkles,
            title: "Lüks Konfor",
            desc: "5 yıldız salon standardı",
          },
        ]}
      />
      <ComfortScrollSection />
      <ServicesGrid />
      <PremiumExperienceSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}

function ComfortScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const comfortItems = [
    {
      id: 1,
      title: "Lüks Salon Atmosferi",
      description:
        "Modern tasarım, ambient ışıklandırma ve premium mobilyalar ile kendinizi özel hissedin.",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
      icon: Crown,
      color: "from-[#9c6f4f] to-[#7a5740]",
      features: ["Premium koltuklar", "Ambient ışık", "Sessiz ortam"],
    },
    {
      id: 2,
      title: "Hijyen ve Temizlik",
      description:
        "UV sterilizasyon, tek kullanımlık malzemeler ve sürekli temizlik protokolleri.",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
      icon: Shield,
      color: "from-blue-500 to-blue-700",
      features: ["UV sterilizasyon", "Tek kullanımlık", "WHO standartları"],
    },
    {
      id: 3,
      title: "Özel İkramlar",
      description:
        "Türk kahvesi, premium çaylar, taze meyve suları ve atıştırmalıklarla misafirperverlik.",
      image:
        "https://images.unsplash.com/photo-1559305616-f7a1d1ee6833?q=80&w=1200&auto=format&fit=crop",
      icon: Coffee,
      color: "from-amber-600 to-orange-700",
      features: ["Türk kahvesi", "Premium çay", "Taze ikramlar"],
    },
    {
      id: 4,
      title: "Teknoloji ve Konfor",
      description:
        "Ücretsiz WiFi, şarj istasyonları, klima sistemi ile tam konfor.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      icon: Wifi,
      color: "from-purple-600 to-indigo-700",
      features: ["Ücretsiz WiFi", "Şarj istasyonu", "Premium ses sistemi"],
    },
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

      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (sectionHeight - windowHeight)),
      );

      let newIndex = 0;
      if (scrollProgress > 0.75) newIndex = 3;
      else if (scrollProgress > 0.5) newIndex = 2;
      else if (scrollProgress > 0.25) newIndex = 1;

      setActiveIndex(newIndex);
      setIsInView(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeItem = comfortItems[activeIndex];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="relative">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Konfor ve
                  <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
                    Rahatlık
                  </span>
                </h2>

                <div className="absolute -top-4 -left-4 w-2 h-2 bg-[#9c6f4f] rounded-full animate-ping" />
              </div>

              <div
                key={activeItem.id}
                className="transition-all duration-700 ease-out"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${activeItem.color} shadow-2xl`}
                  >
                    <activeItem.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>

                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {activeItem.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeItem.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/90 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                  style={{
                    animation: isInView ? "fadeInScale 0.8s ease-out" : "none",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Progress indicators */}
              <div className="flex justify-center mt-6 space-x-3">
                {comfortItems.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-12 bg-gradient-to-r from-[#9c6f4f] to-[#b8825f]"
                        : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(1.1) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}

function ServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Spa Deneyimi",
      description:
        "Saç yıkama sırasında kafa masajı ve aromaterapi ile tam rahatlama",
      icon: Droplets,
      gradient: "from-teal-400 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Profesyonel Dokunuş",
      description: "Kişiye özel saç modeli seçimi ve stil önerileri",
      icon: Music,
      gradient: "from-purple-500 to-pink-600",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Premium Ürünler",
      description: "Doğal ve organik saç bakım ürünleri ile özel bakım",
      icon: Leaf,
      gradient: "from-green-400 to-emerald-600",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Kişiye Özel İlgi",
      description: "Her müşteriye özel yaklaşım ve detaylı danışmanlık",
      icon: Heart,
      gradient: "from-rose-400 to-red-600",
      image:
        "https://images.unsplash.com/photo-156232214-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Bekleme Salonu",
      description: "Konforlu bekleme alanı, dergi ve içecek servisi",
      icon: Users,
      gradient: "from-indigo-400 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "After Care Hizmet",
      description: "Kesim sonrası bakım önerileri ve ücretsiz dokunuş",
      icon: Award,
      gradient: "from-yellow-400 to-orange-600",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Sunduğumuz
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
              Premium Hizmetler
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Her detay sizin konforunuz için düşünülmüş özel hizmetler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Background image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradient} mb-4 shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/80 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <div
                    className={`h-1 bg-gradient-to-r ${service.gradient} rounded-full transform transition-all duration-500 ${
                      hoveredCard === service.id
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }`}
                  />
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumExperienceSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef(null);

  const experienceSteps = [
    {
      title: "Karşılama",
      description: "Sıcak bir karşılama ve ikram servisi ile başlayın",
      icon: Heart,
      color: "text-rose-400",
      bgColor: "from-rose-500/20 to-pink-500/20",
    },
    {
      title: "Danışmanlık",
      description: "Uzman stilist ile kişiye özel stil danışmanlığı",
      icon: Users,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Rahatlama",
      description: "Spa benzeri ortamda saç yıkama ve masaj deneyimi",
      icon: Droplets,
      color: "text-teal-400",
      bgColor: "from-teal-500/20 to-cyan-500/20",
    },
    {
      title: "Styling",
      description: "Profesyonel kesim ve styling ile dönüşümünüz",
      icon: Sparkles,
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % experienceSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-[#9c6f4f]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
              Deneyim Süreci
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Adım adım size sunduğumuz lüks berber deneyimi
          </p>
        </div>

        {/* Steps visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experienceSteps.map((step, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${
                  currentStep === index ? "scale-110" : "scale-100 opacity-70"
                }`}
              >
                {/* Step card */}
                <div
                  className={`relative h-80 rounded-2xl bg-gradient-to-br ${step.bgColor} backdrop-blur-xl border border-white/20 p-6 transition-all duration-500 group-hover:shadow-2xl`}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-br from-[#9c6f4f] to-[#7a5740] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  <div className="flex flex-col items-center text-center h-full justify-center">
                    {/* Icon */}
                    <div
                      className={`mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-300 ${
                        currentStep === index
                          ? "scale-110 shadow-lg"
                          : "scale-100"
                      }`}
                    >
                      <step.icon className={`w-12 h-12 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {currentStep === index && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#9c6f4f]/50 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex justify-center mt-12 space-x-2">
            {experienceSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentStep
                    ? "w-12 bg-gradient-to-r from-[#9c6f4f] to-[#b8825f]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ahmet Kaya",
      role: "İş İnsanı",
      comment:
        "Bu kadar konforlu bir berber deneyimi yaşamamıştım. Her detay mükemmel düşünülmüş.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Mehmet Özkan",
      role: "Avukat",
      comment:
        "Hijyen standartları ve premium hizmet kalitesi gerçekten etkileyici. Herkese tavsiye ederim.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Can Demir",
      role: "Mimar",
      comment:
        "Sadece saç kesimi değil, gerçek bir rahatlama deneyimi. Atmosfer harika, personel çok ilgili.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Müşteri
            <span className="text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
              Yorumları
            </span>
          </h2>
          <p className="text-white/80 text-lg">
            Deneyimleyen müşterilerimizin gerçek yorumları
          </p>
        </div>

        <div className="relative h-96 flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentTestimonial
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-95 rotate-1"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl h-full flex flex-col justify-center">
                {/* Stars */}
                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-xl md:text-2xl text-center mb-8 font-light leading-relaxed italic">
                  "{testimonial.comment}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-[#9c6f4f]/50"
                  />
                  <div>
                    <div className="text-white font-semibold text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-[#9c6f4f] text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "w-8 bg-gradient-to-r from-[#9c6f4f] to-[#b8825f]"
                  : "w-3 bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/30 via-black to-gray-900" />

        {/* Moving gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#9c6f4f]/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        {/* Main CTA */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Lüks Deneyimi
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] via-[#b8825f] to-[#9c6f4f] bg-clip-text animate-gradient">
              Yaşamaya Hazır mısınız?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Premium konfor ve profesyonel hizmet bir arada.
            <span className="text-[#9c6f4f] font-semibold"> Size özel </span>
            deneyimi hemen rezerve edin.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            {/* Primary CTA */}
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-[#9c6f4f] to-[#7a5740] rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-[#9c6f4f]/30 transition-all duration-300 hover:scale-105 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Crown className="w-6 h-6" />
                Hemen Randevu Al
                <Sparkles
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "rotate-180" : "rotate-0"}`}
                />
              </span>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8825f] to-[#9c6f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Secondary CTA */}
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white font-semibold text-lg border border-white/20 hover:bg-white/20 hover:border-[#9c6f4f]/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#9c6f4f]" />
                Müsait Saatleri Gör
              </span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              {
                icon: Shield,
                text: "100% Hijyen Garantisi",
                color: "text-green-400",
              },
              {
                icon: Award,
                text: "Premium Hizmet Kalitesi",
                color: "text-yellow-400",
              },
              {
                icon: Heart,
                text: "Müşteri Memnuniyeti",
                color: "text-rose-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-white/80"
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border border-white/30"
                  />
                ))}
              </div>
              <span>1000+ müşteri bu deneyimi yaşadı</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default ComfortCarePage;
