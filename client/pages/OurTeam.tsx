import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, Award, Clock, Scissors } from 'lucide-react';
import { HeroSection } from "@/components/sections/HeroProps";


export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ekip üyeleri
  const teamMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Kuaför & Salon Sahibi",
      experience: "15+ yıl deneyim",
      specialties: ["Erkek Kuaförü", "Saç Tasarımı", "Sakal Bakımı"],
      image: "/api/placeholder/300/400",
      description: "Sektörde 15 yılı aşkın deneyimi ile müşterilerimize en kaliteli hizmeti sunuyor.",
      rating: 4.9
    },
    {
      id: 2,
      name: "Ayşe Demir",
      role: "Kadın Kuaförü",
      experience: "12 yıl deneyim",
      specialties: ["Kadın Kuaförü", "Saç Boyama", "Fön & Makyaj"],
      image: "/api/placeholder/300/400",
      description: "Kadın saç tasarımında uzman, trend takipçisi ve yaratıcı yaklaşımlarıyla tanınır.",
      rating: 4.8
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      role: "Berber",
      experience: "8 yıl deneyim",
      specialties: ["Klasik Tıraş", "Modern Kesimler", "Sakal Şekillendirme"],
      image: "/api/placeholder/300/400",
      description: "Klasik berberlik sanatını modern tekniklerle harmanlayan yetenekli berberimiz.",
      rating: 4.7
    },
    {
      id: 4,
      name: "Zeynep Özkan",
      role: "Güzellik Uzmanı",
      experience: "10 yıl deneyim",
      specialties: ["Cilt Bakımı", "Kaş Tasarımı", "Manikür & Pedikür"],
      image: "/api/placeholder/300/400",
      description: "Güzellik ve bakım alanında uzman, kişisel bakım konusunda danışmanlık sağlar.",
      rating: 4.9
    },
    {
      id: 5,
      name: "Can Arslan",
      role: "Saç Tasarım Uzmanı",
      experience: "6 yıl deneyim",
      specialties: ["Trend Kesimler", "Saç Boyama", "Styling"],
      image: "/api/placeholder/300/400",
      description: "Genç ve dinamik yaklaşımıyla saç tasarımında yenilikçi çözümler sunuyor.",
      rating: 4.6
    },
    {
      id: 6,
      name: "Selin Çelik",
      role: "Nail Art Uzmanı",
      experience: "5 yıl deneyim",
      specialties: ["Nail Art", "Jel Oje", "Tırnak Tasarımı"],
      image: "/api/placeholder/300/400",
      description: "Tırnak sanatında yaratıcı tasarımlarıyla müşterilerimizi büyülüyor.",
      rating: 4.8
    }
  ];

  const handleMemberClick = (member) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedMember(selectedMember?.id === member.id ? null : member);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/20 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background - Hero tarzında */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#9c6f4f]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-900/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Ana içerik */}
        <HeroSection words={["Uzman", "Ekibimiz"]} p1="Alanında uzman, deneyimli ve tutkulu ekibimizle size en kaliteli hizmeti sunuyoruz." p2="Centilmen Erkek Kuaförü" p3="Her biri kendi alanında ustalaşmış profesyonellerimizle tanışın." />
      <div className="container mx-auto max-w-7xl px-4 py-16 relative z-10">

        {/* Ekip başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent drop-shadow-2xl">
              Ekibimizle Tanışın
            </span>
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#9c6f4f] to-transparent rounded-full" />
            <Scissors className="text-[#9c6f4f] w-6 h-6" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent via-[#9c6f4f] to-transparent rounded-full" />
          </div>
        </div>

        {/* Ekip kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative cursor-pointer transition-all duration-700 hover:scale-105 ${
                isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
              }}
              onClick={() => handleMemberClick(member)}
            >
              {/* Kart - Hero tarzında */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#9c6f4f]/10 via-black/40 to-gray-900/60 backdrop-blur-sm border border-[#9c6f4f]/20 shadow-2xl hover:shadow-[#9c6f4f]/20 transition-all duration-500">
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                
                {/* Resim */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <div className="flex items-center gap-1 bg-[#9c6f4f]/20 backdrop-blur-md rounded-full px-3 py-1 border border-[#9c6f4f]/30">
                      <Star className="w-3 h-3 text-[#9c6f4f] fill-current" />
                      <span className="text-white text-sm font-semibold">{member.rating}</span>
                    </div>
                  </div>

                  {/* Experience badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                      <Award className="w-3 h-3 text-[#9c6f4f]" />
                      <span className="text-white text-xs font-medium">Expert</span>
                    </div>
                  </div>
                </div>
                
                {/* İçerik */}
                <div className="p-6 relative z-30">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-white to-[#9c6f4f] bg-clip-text text-transparent">
                      {member.name}
                    </span>
                  </h3>
                  <p className="text-white/70 mb-1 font-medium">{member.role}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-[#9c6f4f]" />
                    <span className="text-[#9c6f4f] text-sm font-medium">{member.experience}</span>
                  </div>
                  
                  {/* Uzmanlık alanları */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.specialties.slice(0, 2).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-[#9c6f4f]/20 text-[#9c6f4f] rounded-full border border-[#9c6f4f]/30 backdrop-blur-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {member.specialties.length > 2 && (
                      <span className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full border border-white/20 backdrop-blur-sm">
                        +{member.specialties.length - 2}
                      </span>
                    )}
                  </div>
                  
                  {/* Detay butonu */}
                  <div className="flex items-center text-sm font-medium">
                    <span className="bg-gradient-to-r from-[#9c6f4f] to-white bg-clip-text text-transparent">Detayları Gör</span>
                    <svg className="w-4 h-4 ml-2 text-[#9c6f4f] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Shine efekti */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9c6f4f]/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-40" />
              </div>
              
              {/* Seçili member indicator */}
              {selectedMember?.id === member.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] rounded-3xl blur opacity-75 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Detay paneli */}
        {selectedMember && (
          <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-500 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className={`bg-gradient-to-br from-[#9c6f4f]/20 via-black/80 to-gray-900/80 backdrop-blur-md rounded-3xl border border-[#9c6f4f]/30 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative transform transition-all duration-500 ${
              isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}>
              
              {/* Floating particles in modal */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#9c6f4f]/40 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}

              {/* Kapatma butonu */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#9c6f4f]/20 hover:bg-[#9c6f4f]/30 backdrop-blur-sm border border-[#9c6f4f]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* İçerik */}
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                {/* Resim */}
                <div className="md:w-1/3">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#9c6f4f]/30 via-transparent to-transparent" />
                    
                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#9c6f4f]/20 backdrop-blur-md rounded-full px-3 py-1 border border-[#9c6f4f]/30">
                      <Star className="w-4 h-4 text-[#9c6f4f] fill-current" />
                      <span className="text-white font-semibold">{selectedMember.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bilgiler */}
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent">
                      {selectedMember.name}
                    </span>
                  </h2>
                  <p className="text-xl text-white/80 mb-1 font-medium">{selectedMember.role}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-[#9c6f4f]" />
                    <span className="text-[#9c6f4f] font-medium">{selectedMember.experience}</span>
                  </div>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">{selectedMember.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-[#9c6f4f]" />
                      Uzmanlık Alanları
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-[#9c6f4f]/20 text-[#9c6f4f] rounded-full border border-[#9c6f4f]/30 backdrop-blur-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full md:w-auto bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] hover:from-[#8a5d43] hover:to-[#a67350] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#9c6f4f]/20 text-white font-semibold px-8 py-3 rounded-full">
                    Randevu Al
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}