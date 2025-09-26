import { Button } from "@/components/ui/button";

// Link component placeholder for demo
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/40 bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden">
      {/* Elegant geometric background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-y-32"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary rounded-full blur-2xl transform translate-y-16"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Hero Statement Section */}
        <div className="flex flex-col items-center justify-between gap-12 py-16 md:flex-row md:py-20">
          {/* Typography Masterpiece */}
          <div className="text-center md:text-left group">
            <div className="relative">
              {/* Decorative line above */}
              <div className="hidden md:block absolute -top-6 left-0 w-16 h-px bg-gradient-to-r from-primary/60 to-transparent"></div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary via-foreground to-primary/80 bg-clip-text text-transparent">
                Centilmen'e gel, Centilmen ol.
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                  Stil • Kalite • Zarafet
                </span>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <Link to="/randevu" className="group">
              <Button
                size="lg"
                className="px-12 py-4 text-lg font-semibold relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <span className="relative z-10">Randevu Al</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary transition-all duration-500"></div>
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground/70 font-medium tracking-wide">
              Online rezervasyon • 7/24 erişim
            </p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/20 to-transparent h-px top-0"></div>

          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:gap-12 bg-card/20 backdrop-blur-sm border-y border-border/30">
            {[
              {
                title: "Salon",
                links: [
                  { label: "Hakkımızda", to: "/hakkimizda" },
                  { label: "Ekibimiz", to: "/ekip" },
                  { label: "İletişim", to: "/iletisim" },
                ],
              },
              {
                title: "Hizmetler",
                links: [
                  { label: "Saç Modelleri", to: "/sac-modelleri" },
                  { label: "Randevu Al", to: "/randevu" },
                ],
              },
              {
                title: "Destek",
                links: [
                  { label: "SSS", to: "/sss" },
                  { label: "Kaynaklar", to: "/kaynaklar" },
                ],
              },
              {
                title: "Yasal",
                links: [
                  { label: "Gizlilik", to: "/gizlilik" },
                  { label: "Koşullar", to: "/kosullar" },
                ],
              },
            ].map((section, index) => (
              <div key={section.title} className="group space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h4 className="text-sm font-bold text-foreground tracking-wider uppercase">
                    {section.title}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 hover:font-medium inline-block relative group"
                        to={link.to}
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-border/40 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground font-medium mb-1">
                © {new Date().getFullYear()} Centilmen Erkek Kuaför. Tüm
                hakları saklıdır.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Profesyonel kuaförlük hizmetleri ile farkı yaşayın.
              </p>
            </div>

            {/* Elegant Brand Mark */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
              </div>
              <span className="text-xs font-medium text-muted-foreground tracking-widest">
                CENTILMEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
