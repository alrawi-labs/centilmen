import { Scissors, ArrowRight, Star } from "lucide-react";

// Mock data
const FEATURED_MODELS = [
  { slug: "high-fade", name: "High Fade", category: "Modern Kesim" },
  { slug: "undercut", name: "Undercut", category: "Klasik Stil" },
  { slug: "buzz-cut", name: "Buzz Cut", category: "Minimal Kesim" },
  { slug: "pompadour", name: "Pompadour", category: "Vintage Stil" }
];

function Featured() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        
        {/* Sol taraf - Başlık ve açıklama */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
              <span className="text-base font-semibold text-primary/90 tracking-wide uppercase">
                En iyi neyi sağlıyoruz?
              </span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              Öne Çıkan
              <br />
              <span className="text-primary">Modeller</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              En popüler ve trend saç stillerimizden ilham alın. Uzman berberlerimiz tarafından özenle seçilmiş modeller.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/sac-modelleri"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Tüm Modeller
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>50+ farklı model</span>
            </div>
          </div>
        </div>

        {/* Sağ taraf - Model kartları */}
        <div className="space-y-4">
          {FEATURED_MODELS.map((model, index) => (
            <a
              key={model.slug}
              href={`/sac-modelleri/${model.slug}`}
              className="group relative flex items-center justify-between rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-6 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInFromRight 0.6s ease-out forwards"
              }}
            >
              {/* Sol içerik */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-base font-semibold group-hover:text-primary transition-colors">
                    {model.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {model.category}
                  </div>
                </div>
              </div>

              {/* Sağ ok */}
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Görüntüle
                </span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover efekti için gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
          ))}

          {/* Alt bilgi */}
          <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/20">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background" />
                <div className="h-8 w-8 rounded-full bg-primary/30 border-2 border-background" />
                <div className="h-8 w-8 rounded-full bg-primary/40 border-2 border-background" />
              </div>
              <div className="text-sm">
                <div className="font-medium">1000+ mutlu müşteri</div>
                <div className="text-muted-foreground">Bu modelleri tercih etti</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
}

export default Featured;