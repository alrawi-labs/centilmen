import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Star,
  Instagram,
  Facebook,
  MessageCircle,
  Youtube,
  Crown,
  Heart,
  Sparkles,
  Shield,
  Award,
  Users,
  Leaf,
  Sun,
  Moon,
  Coffee,
  Wifi,
  Music,
  Droplets,
  Zap,
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroProps";

function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      <HeroSection
        words={["İLETİŞİM", "RANDEVU", "REZERVASYON"]}
        p1="Bize ulaşın, hayallerinizdeki görünümü birlikte yaratalım. "
        p2="Centilmen Erkek Kuaförü"
        p3="ailesi olarak sizleri bekliyoruz!"
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
      <ContactScrollSection />
      <ContactFormSection />
      <MapAndInfoSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}
// ["İLETİŞİM", "RANDEVU", "REZERVASYON"]
// Bize ulaşın, hayallerinizdeki görünümü birlikte yaratalım.
// Centilmen Erkek Kuaförü
// ailesi olarak sizleri bekliyoruz!

// quickOptions={[
//     { icon: Shield, title: "Premium Hijyen", desc: "Steril ortam garantisi" },
//     { icon: Crown, title: "VIP Deneyim", desc: "Kişiye özel hizmet" },
//     { icon: Sparkles, title: "Lüks Konfor", desc: "5 yıldız salon standardı" },
//   ]}
// function HeroSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentWord, setCurrentWord] = useState(0);
//   const words = ["İLETİŞİM", "RANDEVU", "REZERVASYON"];

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setCurrentWord(prev => (prev + 1) % words.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/20 via-black to-gray-900" />
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#9c6f4f]/30 to-transparent rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />

//         {/* Floating particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-[#9c6f4f]/40 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
//         {/* Main title with word animation */}
//         <div className="mb-8">
//           <div className="relative h-32 md:h-40 flex items-center justify-center">
//             {words.map((word, index) => (
//               <h1
//                 key={word}
//                 className={`absolute text-6xl md:text-8xl lg:text-9xl font-black transition-all duration-1000 ${
//                   index === currentWord
//                     ? 'opacity-100 scale-100 rotate-0'
//                     : 'opacity-0 scale-75 rotate-12'
//                 }`}
//               >
//                 <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent drop-shadow-2xl">
//                   {word}
//                 </span>
//               </h1>
//             ))}
//           </div>

//           <div className="flex justify-center items-center gap-4 mt-4">
//             <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#9c6f4f] to-transparent rounded-full" />
//             <Heart className="text-[#9c6f4f] w-8 h-8 animate-pulse" />
//             <div className="h-1 w-16 bg-gradient-to-l from-transparent via-[#9c6f4f] to-transparent rounded-full" />
//           </div>
//         </div>

//         <p className={`text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           Bize ulaşın, hayallerinizdeki görünümü birlikte yaratalım.
//           <span className="text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text font-semibold"> Centilmen Erkek Kuaförü </span>
//           ailesi olarak sizleri bekliyoruz!
//         </p>

//         {/* Quick contact options */}
//         <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-1000 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
//         }`}>
//           {[
//             { icon: Shield, title: "Premium Hijyen", desc: "Steril ortam garantisi" },
//             { icon: Crown, title: "VIP Deneyim", desc: "Kişiye özel hizmet" },
//             { icon: Sparkles, title: "Lüks Konfor", desc: "5 yıldız salon standardı" }
//           ].map((item, index) => (
//             <div key={index} className="group">
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
//                 <item.icon className="text-[#9c6f4f] w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
//                 <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
//                 <p className="text-white/70 text-sm">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-20px) rotate(120deg); }
//           66% { transform: translateY(-10px) rotate(240deg); }
//         }
//         .animate-float {
//           animation: float linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

function ContactScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const contactReasons = [
    {
      id: 1,
      title: "Hemen Randevu Alın",
      description:
        "Online sistemimizle kolay ve hızlı randevu oluşturun. Uygun saatleri görün ve anında rezervasyon yapın.",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
      icon: Clock,
      color: "from-[#9c6f4f] to-[#7a5740]",
      features: ["7/24 online sistem", "Esnek saatler", "Anında onay"],
    },
    {
      id: 2,
      title: "Ücretsiz Danışmanlık",
      description:
        "Hangi saç modelinin size uygun olduğunu merak ediyorsanız, uzman stilistlerimizden ücretsiz danışın.",
      image:
        "https://images.unsplash.com/photo-1559599101-f09722fb494?q=80&w=1200&auto=format&fit=crop",
      icon: Heart,
      color: "from-blue-500 to-blue-700",
      features: ["Kişiye özel öneri", "Uzman görüşü", "Trend bilgisi"],
    },
    {
      id: 3,
      title: "Özel Etkinlik Rezervasyonu",
      description:
        "Düğün, mezuniyet veya özel günleriniz için grup rezervasyonu yapabilir, premium hizmet alabilirsiniz.",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a3e?q=80&w=1200&auto=format&fit=crop",
      icon: Crown,
      color: "from-purple-600 to-indigo-700",
      features: [
        "Grup rezervasyon",
        "Özel hizmet paketleri",
        "Premium deneyim",
      ],
    },
    {
      id: 4,
      title: "Geri Bildiriminizi Paylaşın",
      description:
        "Deneyiminizi paylaşın, öneri ve şikayetlerinizi iletin. Görüşleriniz bizim için çok değerli.",
      image:
        "https://images.unsplash.com/photo-1556745757-8d76bdb698b?q=80&w=1200&auto=format&fit=crop",
      icon: Star,
      color: "from-amber-500 to-orange-600",
      features: ["Memnuniyet anketi", "Hızlı dönüş", "Sürekli gelişim"],
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

  const activeItem = contactReasons[activeIndex];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="relative">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Size Nasıl
                  <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
                    Yardımcı Olabiliriz?
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
                {contactReasons.map((_, index) => (
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

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    "Erkek Saç Kesimi",
    "Kadın Saç Kesimi",
    "Saç Boyama",
    "Sakal Bakımı",
    "Kaş Tasarımı",
    "Cilt Bakımı",
    "Manikür & Pedikür",
    "Gelin Saçı & Makyajı",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      `Mesajınız başarıyla gönderildi! ${formData.name}, en kısa sürede size dönüş yapacağız.`,
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      preferredTime: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-[#9c6f4f]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hemen
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
              İletişime Geçin
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Formu doldurun, size en kısa sürede dönüş yapalım! Centilmen Erkek
            Kuaförü ailesi olarak sizleri bekliyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Form */}
          <div className="relative">
            <div className="relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-8 group overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/20 via-transparent to-blue-500/20"></div>
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-[#9c6f4f] mb-2 group-hover:text-blue-400 transition-all duration-300">
                  Hemen İletişime Geçin
                </h3>
                <p className="text-white/80 mb-8">
                  Formu doldurun, size en kısa sürede dönüş yapalım!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group/input relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-white/70"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>
                    <div className="group/input relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-white/70"
                        placeholder="E-posta Adresiniz"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group/input relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-white/70"
                        placeholder="Telefon Numaranız"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>
                    <div className="group/input relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl"
                      >
                        <option value="" className="bg-gray-800">
                          Hizmet Seçin
                        </option>
                        {services.map((service, idx) => (
                          <option
                            key={idx}
                            value={service}
                            className="bg-gray-800"
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div className="group/input relative">
                    <input
                      type="datetime-local"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                  </div>

                  {/* Message */}
                  <div className="group/input relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm px-6 py-4 text-sm text-white transition-all duration-500 focus:ring-4 focus:ring-[#9c6f4f]/20 focus:border-[#9c6f4f] focus:bg-white/30 group-hover/input:border-[#9c6f4f]/50 focus:scale-[1.02] focus:shadow-xl placeholder:text-white/70 resize-none"
                      placeholder="Mesajınız..."
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9c6f4f]/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#9c6f4f] to-[#7a5740] hover:from-[#b8825f] hover:to-[#9c6f4f] transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden text-white"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Mesajı Gönder
                        </>
                      )}
                    </span>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right side - Contact Info Cards */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {/* Address Card */}
              <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#9c6f4f] mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      Adres
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      Kızılay Mahallesi, Atatürk Bulvarı No: 123, Çankaya/Ankara
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#9c6f4f] mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      Telefon
                    </h3>
                    <p className="text-white/80 text-xl font-mono">
                      +90 312 123 45 67
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Tıklayarak arayın
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#9c6f4f] mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      E-posta
                    </h3>
                    <p className="text-white/80">info@centilmensalon.com</p>
                    <p className="text-xs text-white/70 mt-1">
                      Mail göndermek için tıklayın
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#9c6f4f] group-hover:text-violet-400 transition-colors duration-300">
                    Çalışma Saatleri
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { day: "Pazartesi - Cuma", hours: "09:00 - 20:00" },
                    { day: "Cumartesi", hours: "09:00 - 19:00" },
                    { day: "Pazar", hours: "10:00 - 18:00" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 px-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 group-hover:border-violet-400/30 transition-all duration-300"
                    >
                      <span className="font-medium text-white">{item.day}</span>
                      <span className="text-[#9c6f4f] font-mono">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapAndInfoSection() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Konum ve
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text">
              Sosyal Medya
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Bizi bulun ve takip edin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Interactive Map */}
          <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-[#9c6f4f] mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  Salonumuzun Konumu
                </h3>
              </div>

              {/* Map Container */}
              <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-b-3xl overflow-hidden">
                {/* Animated map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9c6f4f] to-[#7a5740] rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Centilmen Salon
                      </p>
                      <p className="text-white/70 text-sm">Kızılay, Ankara</p>
                    </div>
                  </div>
                </div>

                {/* Animated grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="mapGrid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-cyan-400"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                  </svg>
                </div>

                {/* Pulsing circles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 border border-[#9c6f4f]/30 rounded-full animate-ping"></div>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#9c6f4f]/50 rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Social Media */}
          <div className="group relative rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-700 p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-red-500/5 group-hover:from-pink-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-[#9c6f4f] mb-6 group-hover:text-pink-400 transition-colors duration-300">
                Sosyal Medya
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Instagram",
                    icon: Instagram,
                    color: "from-pink-500 to-purple-600",
                    followers: "10.2K",
                    desc: "Son çalışmalarımız",
                  },
                  {
                    name: "Facebook",
                    icon: Facebook,
                    color: "from-blue-600 to-blue-700",
                    followers: "5.8K",
                    desc: "Güncel haberler",
                  },
                  {
                    name: "WhatsApp",
                    icon: MessageCircle,
                    color: "from-green-500 to-green-600",
                    followers: "Mesaj",
                    desc: "Hızlı iletişim",
                  },
                  {
                    name: "YouTube",
                    icon: Youtube,
                    color: "from-red-500 to-red-600",
                    followers: "2.1K",
                    desc: "Eğitim videoları",
                  },
                ].map((social, idx) => (
                  <div
                    key={idx}
                    className="group/social relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm p-4 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHoveredSocial(idx)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover/social:opacity-10 transition-all duration-500`}
                    ></div>
                    <div className="relative z-10 text-center space-y-2">
                      <div
                        className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center group-hover/social:scale-110 transition-transform duration-300`}
                      >
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {social.name}
                      </div>
                      <div className="text-xs text-[#9c6f4f] font-mono">
                        {social.followers}
                      </div>
                      <div className="text-xs text-white/70">{social.desc}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover/social:translate-x-full transition-transform duration-700 ease-out"></div>
                  </div>
                ))}
              </div>

              {/* Additional info */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/80 text-sm text-center">
                  Bizi takip edin, en son trendleri ve özel kampanyalarımızı
                  kaçırmayın!
                </p>
              </div>
            </div>
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
        "Bu kadar konforlu ve profesyonel bir berber deneyimi yaşamamıştım. Her detay mükemmel düşünülmüş, ekip son derece ilgili.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Mehmet Özkan",
      role: "Avukat",
      comment:
        "Hijyen standartları ve premium hizmet kalitesi gerçekten etkileyici. Centilmen Salon'u herkese tavsiye ederim.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Can Demir",
      role: "Mimar",
      comment:
        "Sadece saç kesimi değil, gerçek bir rahatlama ve bakım deneyimi. Atmosfer harika, personel çok profesyonel.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-[#9c6f4f]/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-l from-pink-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
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
            Hayallerinizdeki Görünümü
            <span className="block text-transparent bg-gradient-to-r from-[#9c6f4f] via-[#b8825f] to-[#9c6f4f] bg-clip-text animate-gradient">
              Yakalayın!
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Centilmen Salon'da uzman ekibimiz, size özel tasarımlarla tarzınızı
            ortaya çıkarıyor.
            <span className="text-[#9c6f4f] font-semibold">
              {" "}
              Randevunuzu hemen alın{" "}
            </span>
            ve farkı hissedin!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            {/* Primary CTA */}
            <button
              className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white font-bold text-lg shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Phone className="w-6 h-6" />
                Hemen Ara
                <Sparkles
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "rotate-180" : "rotate-0"}`}
                />
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Secondary CTA */}
            <button className="group px-12 py-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white font-semibold text-lg border border-white/20 hover:bg-white/20 hover:border-[#9c6f4f]/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#9c6f4f]" />
                Online Randevu
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
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&auto=format&fit=crop&ixlib=rb-4.0.3",
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

export default ContactPage;
