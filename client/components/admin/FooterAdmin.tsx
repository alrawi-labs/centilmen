import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FooterAdmin() {
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
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground">
              Centilmen Admin Panel
            </h2>
            <p className="text-sm text-muted-foreground tracking-wide">
              Yönetim • Kontrol • Güven
            </p>
          </div>
        </div>

        {/* Admin Navigation Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:gap-12 bg-card/20 backdrop-blur-sm border-y border-border/30">
            {[
              {
                title: "Genel",
                links: [
                  { label: "Dashboard", to: "/admin" },
                  { label: "Ayarlar", to: "/admin/ayarlar" },
                ],
              },
              {
                title: "Kullanıcılar",
                links: [
                  { label: "Çalışanlar", to: "/admin/calisan" },
                  { label: "Roller & Yetkiler", to: "/admin/roller" },
                ],
              },
              {
                title: "İçerik",
                links: [
                  { label: "Modeller", to: "/admin/modeller" },
                  { label: "İçerik Yönetimi", to: "/admin/icerik" },
                ],
              },
              {
                title: "Destek",
                links: [
                  { label: "SSS", to: "/admin/sss" },
                  { label: "Geri Bildirim", to: "/admin/geri-bildirim" },
                ],
              },
            ].map((section) => (
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
                © {new Date().getFullYear()} Centilmen Admin. Tüm hakları saklıdır.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Yönetim paneli üzerinden sisteminizi kontrol edin.
              </p>
            </div>

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
