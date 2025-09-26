import { useState, useEffect } from "react";

// Components for demo
const Button = ({ size, className, children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative isolate min-h-[90vh] flex items-center">
      {/* Clean Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="index/hero.jpg"
        >
          <source src="index/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          {/* Left Column - Elegant Typography */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                <span className="block">Her Erkek</span>
                <span className="block text-primary">Bir Centilmen</span>
                <span className="block">Olmayı Hak Eder.</span>
              </h1>

              <p className="text-xl text-gray-200 max-w-lg font-light leading-relaxed">
                Profesyonel kuaför hizmetleri ile tarzınızı keşfedin.
              </p>
            </div>
          </div>

          {/* Right Column - Premium Appointment Card */}
          <div
            className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="w-full max-w-md">
              <div className="rounded-2xl backdrop-blur-xl shadow-2xl border border-white/20 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-secondary-foreground mb-3">
                    Randevu Al
                  </h3>
                  <p className="text-primary">Centilmen'e gel, Centilmen ol.</p>
                </div>

                {/* Elegant Divider */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent via-primary/60 to-transparent"></div>
                </div>

                {/* Simple Benefits */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-secondary-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Online rezervasyon sistemi</span>
                  </div>
                  <div className="flex items-center gap-3 text-secondary-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Uzman kuaför ekibi</span>
                  </div>
                  <div className="flex items-center gap-3 text-secondary-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Premium salon deneyimi</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to="/randevu" className="block">
                  <Button
                    size="lg"
                    className="w-full py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Hemen Randevu Al
                  </Button>
                </Link>

                {/* Trust Line */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    1000+ mutlu müşteri • ⭐ 4.9/5 değerlendirme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
