import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type QuickOption = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

type HeroSectionProps = {
  words: string[];
  p1?: string;
  p2?: string;
  p3?: string;
  quickOptions?: QuickOption[];
};

export function HeroSection({
  words,
  p1 = "",
  p2 = "",
  p3 = "",
  quickOptions = [],
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9c6f4f]/20 via-black to-gray-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#9c6f4f]/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#9c6f4f]/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main title with word animation */}
        <div className="mb-8">
          <div className="relative h-32 md:h-40 flex items-center justify-center">
            {words.map((word, index) => (
              <h1
                key={word}
                className={`absolute text-6xl md:text-8xl lg:text-9xl font-black transition-all duration-1000 ${
                  index === currentWord
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-75 rotate-12"
                }`}
              >
                <span className="bg-gradient-to-r from-white via-[#9c6f4f] to-white bg-clip-text text-transparent drop-shadow-2xl">
                  {word}
                </span>
              </h1>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#9c6f4f] to-transparent rounded-full" />
            <Heart className="text-[#9c6f4f] w-8 h-8 animate-pulse" />
            <div className="h-1 w-16 bg-gradient-to-l from-transparent via-[#9c6f4f] to-transparent rounded-full" />
          </div>
        </div>

        <p
          className={`text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {p1}
          <span className="text-transparent bg-gradient-to-r from-[#9c6f4f] to-[#b8825f] bg-clip-text font-semibold">
            {" "}
            {p2}{" "}
          </span>
          {p3}
        </p>

        {/* Quick contact options (dynamic) */}
        {quickOptions.length > 0 && (
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {quickOptions.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  <item.icon className="text-[#9c6f4f] w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
