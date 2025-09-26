import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Award, Star, Sparkles, Crown, Zap } from 'lucide-react';

function UltimateBarberTeam() {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const team = [
    {
      name: "Duran Koçak",
      role: "Usta Kuaför",
      image: "index/usta1.jpg",
      specialty: "Klasik Kesim",
      experience: "15+ Yıl",
      signature: "İmza Tıraş",
      icon: Crown,
      particles: ["✂️", "👑", "⭐"]
    },
    {
      name: "Denizcim",
      role: "Master Stylist",
      image: "index/usta2.jpg",
      specialty: "Modern Stil",
      experience: "12+ Yıl",
      signature: "Fade Master",
      icon: Zap,
      particles: ["💫", "🌊", "✨"]
    },
    {
      name: "Feyzullah",
      role: "Sakal Ustası",
      image: "index/usta3.jpg",
      specialty: "Sakal Şekillendirme",
      experience: "18+ Yıl",
      signature: "Ottoman Style",
      icon: Award,
      particles: ["🧔", "⚔️", "🏆"]
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-20 overflow-hidden"
    >
      {/* EPIC BACKGROUND ANIMATIONS */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Scissors 
              className="text-amber-400/30 rotate-45" 
              size={Math.random() * 20 + 10}
              style={{
                transform: `rotate(${Math.sin(scrollY * 0.01 + i) * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* FLOATING ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 animate-pulse"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* EPIC TITLE SECTION */}
        <div className="text-center mb-20 relative">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="text-amber-400 animate-spin" size={20} />
              <span className="text-amber-300 font-medium">Ustalarımızla Tanışın</span>
              <Sparkles className="text-amber-400 animate-spin" size={20} />
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                EKİPİMİZ
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-orange-600/20 blur-2xl -z-10 animate-pulse" />
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Alanında <span className="text-amber-400 font-bold">uzman</span>, 
              deneyimli ve <span className="text-orange-400 font-bold">tutkulu</span> berberlerimiz
              sizin için burada
            </p>
          </div>
        </div>

        {/* LEGENDARY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => {
            const Icon = member.icon;
            const delay = index * 200;
            
            return (
              <div
                key={member.name}
                className={`group relative transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* CARD CONTAINER */}
                <div className="relative h-[600px] perspective-1000">
                  <div 
                    className={`relative h-full w-full transition-all duration-700 transform-style-3d ${
                      activeCard === index ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-500">
                        {/* GLOW EFFECTS */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl`} />
                        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                        
                        {/* IMAGE SECTION */}
                        <div className="relative h-80 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                          />
                          
                          {/* IMAGE OVERLAY */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                          <div className={`absolute inset-0 bg-gradient-to-t from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                          
                          {/* FLOATING PARTICLES */}
                          {member.particles.map((particle, i) => (
                            <div
                              key={i}
                              className="absolute text-2xl animate-bounce opacity-0 group-hover:opacity-100 transition-all duration-500"
                              style={{
                                left: `${20 + i * 25}%`,
                                top: `${10 + i * 15}%`,
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: `${2 + i * 0.5}s`,
                              }}
                            >
                              {particle}
                            </div>
                          ))}
                          
                          {/* HOVER ICON */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                            <div className={`p-3 rounded-full bg-gradient-to-r from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] shadow-2xl animate-pulse`}>
                              <Icon className="text-white" size={24} />
                            </div>
                          </div>
                        </div>

                        {/* CONTENT SECTION */}
                        <div className="p-8 relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] flex items-center justify-center shadow-lg`}>
                              <Icon className="text-white" size={20} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                                {member.name}
                              </h3>
                              <p className="text-amber-400 font-semibold">{member.role}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-xl backdrop-blur">
                              <span className="text-gray-300">Uzmanlık</span>
                              <span className="text-amber-300 font-semibold">{member.specialty}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-xl backdrop-blur">
                              <span className="text-gray-300">Deneyim</span>
                              <span className="text-orange-300 font-semibold">{member.experience}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 text-center">
                            <div className="text-sm text-gray-400 mb-2">İmza Teknik</div>
                            <div className={`text-lg font-bold bg-gradient-to-r from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] bg-clip-text text-transparent`}>
                              {member.signature}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className={`h-full bg-gradient-to-br from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl`}>
                        <Icon className="text-white mb-6 animate-bounce" size={64} />
                        <h3 className="text-3xl font-black text-white mb-4">{member.name}</h3>
                        <div className="text-xl text-white/90 mb-6">{member.role}</div>
                        
                        {/* STARS */}
                        <div className="flex gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-300 fill-current animate-pulse" size={20} style={{ animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                        
                        <div className="text-white/80 text-lg leading-relaxed">
                          "{member.specialty} konusunda uzmanım. {member.experience} deneyimim ile size en iyi hizmeti sunuyorum."
                        </div>
                        
                        <div className="mt-6 bg-white/20 backdrop-blur rounded-full px-6 py-2">
                          <span className="text-white font-bold">{member.signature}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM GLOW */}
                <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gradient-to-r from-[#7a5c42] via-[#ad7e5a] to-[#a36f50] rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`} />
              </div>
            );
          })}
        </div>

        {/* EPIC FOOTER */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-full px-8 py-4">
            <Scissors className="text-amber-400 animate-spin" size={24} />
            <span className="text-xl text-white font-bold">Randevu için bizi arayın!</span>
            <Sparkles className="text-orange-400 animate-pulse" size={24} />
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}

export default UltimateBarberTeam;