import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Clock, Scissors } from 'lucide-react';
import { HeroSection } from "@/components/sections/HeroProps";


export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ekip üyeleri verisi aynı
  const teamMembers = [
    { id: 1, name: "Ahmet Yılmaz", role: "Kuaför & Salon Sahibi", experience: "15+ yıl deneyim", specialties: ["Erkek Kuaförü", "Saç Tasarımı", "Sakal Bakımı"], image: "/api/placeholder/300/400", description: "Sektörde 15 yılı aşkın deneyimi ile müşterilerimize en kaliteli hizmeti sunuyor.", rating: 4.9 },
    { id: 2, name: "Ayşe Demir", role: "Kadın Kuaförü", experience: "12 yıl deneyim", specialties: ["Kadın Kuaförü", "Saç Boyama", "Fön & Makyaj"], image: "/api/placeholder/300/400", description: "Kadın saç tasarımında uzman, trend takipçisi ve yaratıcı yaklaşımlarıyla tanınır.", rating: 4.8 },
    { id: 3, name: "Mehmet Kaya", role: "Berber", experience: "8 yıl deneyim", specialties: ["Klasik Tıraş", "Modern Kesimler", "Sakal Şekillendirme"], image: "/api/placeholder/300/400", description: "Klasik berberlik sanatını modern tekniklerle harmanlayan yetenekli berberimiz.", rating: 4.7 },
    { id: 4, name: "Zeynep Özkan", role: "Güzellik Uzmanı", experience: "10 yıl deneyim", specialties: ["Cilt Bakımı", "Kaş Tasarımı", "Manikür & Pedikür"], image: "/api/placeholder/300/400", description: "Güzellik ve bakım alanında uzman, kişisel bakım konusunda danışmanlık sağlar.", rating: 4.9 },
    { id: 5, name: "Can Arslan", role: "Saç Tasarım Uzmanı", experience: "6 yıl deneyim", specialties: ["Trend Kesimler", "Saç Boyama", "Styling"], image: "/api/placeholder/300/400", description: "Genç ve dinamik yaklaşımıyla saç tasarımında yenilikçi çözümler sunuyor.", rating: 4.6 },
    { id: 6, name: "Selin Çelik", role: "Nail Art Uzmanı", experience: "5 yıl deneyim", specialties: ["Nail Art", "Jel Oje", "Tırnak Tasarımı"], image: "/api/placeholder/300/400", description: "Tırnak sanatında yaratıcı tasarımlarıyla müşterilerimizi büyülüyor.", rating: 4.8 }
  ];

  const handleMemberClick = (member) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedMember(selectedMember?.id === member.id ? null : member);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Sadeleştirilmiş Hareketli Arka Plan */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9c6f4f]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Ana içerik */}
      <HeroSection words={["Uzman", "Ekibimiz"]} p1="Alanında uzman, deneyimli ve tutkulu ekibimizle size en kaliteli hizmeti sunuyoruz." p2="Centilmen Erkek Kuaförü" p3="Her biri kendi alanında ustalaşmış profesyonellerimizle tanışın." />
      {/* DEĞİŞİKLİK: Mobil için dikey padding ayarlandı */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 relative z-10">

        {/* Ekip başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent">
              Ekibimizle Tanışın
            </span>
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#9c6f4f] to-transparent rounded-full" />
            <Scissors className="text-[#9c6f4f] w-6 h-6" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent via-[#9c6f4f] to-transparent rounded-full" />
          </div>
        </div>

        {/* Ekip kartları (Yapısı zaten mobil uyumlu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative cursor-pointer transition-all duration-700 hover:scale-105 ${
                isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
              }}
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#9c6f4f]/10 via-black/40 to-gray-900/60 backdrop-blur-sm border border-[#9c6f4f]/20 shadow-lg hover:shadow-[#9c6f4f]/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-30">
                    <div className="flex items-center gap-1 bg-[#9c6f4f]/20 backdrop-blur-md rounded-full px-3 py-1 border border-[#9c6f4f]/30">
                      <Star className="w-3 h-3 text-[#9c6f4f] fill-current" />
                      <span className="text-white text-sm font-semibold">{member.rating}</span>
                    </div>
                  </div>
                </div>
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
                  <div className="flex items-center text-sm font-medium">
                    <span className="bg-gradient-to-r from-[#9c6f4f] to-white bg-clip-text text-transparent">Detayları Gör</span>
                    <svg className="w-4 h-4 ml-2 text-[#9c6f4f] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              {selectedMember?.id === member.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] rounded-3xl blur opacity-75 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Mobil için İyileştirilmiş Detay Paneli */}
        {selectedMember && (
          <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
             {/* DEĞİŞİKLİK: Mobil için duyarlı padding */}
            <div className={`bg-gradient-to-br from-[#9c6f4f]/20 via-black/80 to-gray-900/80 backdrop-blur-md rounded-3xl border border-[#9c6f4f]/30 p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-500 ${
              isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}>
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#9c6f4f]/20 hover:bg-[#9c6f4f]/30 backdrop-blur-sm border border-[#9c6f4f]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* İçerik (Yapısı zaten mobil uyumlu: flex-col md:flex-row) */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#9c6f4f]/30 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#9c6f4f]/20 backdrop-blur-md rounded-full px-3 py-1 border border-[#9c6f4f]/30">
                      <Star className="w-4 h-4 text-[#9c6f4f] fill-current" />
                      <span className="text-white font-semibold">{selectedMember.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  {/* DEĞİŞİKLİK: Mobil için duyarlı font boyutu */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent">
                      {selectedMember.name}
                    </span>
                  </h2>
                  {/* DEĞİŞİKLİK: Mobil için duyarlı font boyutu */}
                  <p className="text-lg md:text-xl text-white/80 mb-1 font-medium">{selectedMember.role}</p>
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
                  {/* Button yapısı zaten mobil uyumlu (w-full md:w-auto) */}
                  <Button className="w-full md:w-auto bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] hover:from-[#8a5d43] hover:to-[#a67350] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#9c6f4f]/20 text-white font-semibold px-8 py-3 rounded-full">
                    Randevu Al
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}