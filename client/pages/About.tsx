import { useState, useEffect } from "react";
import { FaAward } from "react-icons/fa6";
import { SiZap } from "react-icons/si";
import { RiChatSmileAiFill } from "react-icons/ri";
import { GiHealthPotion } from "react-icons/gi";

// Mock components for demo
const Link = ({ to, children, className = "", ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

const Button = ({ size = "default", variant = "default", children, className = "", ...props }) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ${
      variant === 'secondary' 
        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
        : 'bg-primary text-primary-foreground hover:bg-primary/90'
    } ${size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2 text-sm'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Mock data
const TEAM = [
  { 
    name: "Duran Koçak", 
    role: "Usta Kuaför", 
    bodyImage: "team/duran-body.png",
    backgroundImage: "team/duran-background.png"
  },
  { 
    name: "Deniz Haznedar", 
    role: "Stylist", 
    bodyImage: "team/deniz-body.png",
    backgroundImage: "team/deniz-background.png"
  },
  { 
    name: "Feyzullah", 
    role: "Saç Uzmanı", 
    bodyImage: "team/feyzullah-body.png",
    backgroundImage: "team/feyzullah-background.png"
  },
  { 
    name: "Emre Yılmaz", 
    role: "Senior Kuaför", 
    bodyImage: "team/feyzullah-body.png",
    backgroundImage: "team/feyzullah-background.png"
  }
];

const TESTIMONIALS = [
  { name: "Ahmet Y.", text: "Harika hizmet, her zaman memnun ayrılıyorum." },
  { name: "Murat K.", text: "Profesyonel ekip ve temiz salon." },
  { name: "Serkan A.", text: "Randevu sistemi çok pratik ve güvenilir." }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-background">
      <Hero />
      <Story />
      <Values />
      <TeamSection />
      <Press />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16">
      <div className={`relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Premium Background */}
        <div className="absolute inset-0">
          <img
            src="about/heroAbout.png"
            alt="Salon arkaplan"
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
          
          {/* Elegant geometric elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/8 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative p-12 md:p-16">
          <div className="max-w-4xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold tracking-wide text-sm uppercase">Hakkımızda</span>
            </div>

            {/* Hero Typography */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              <span className="block">Her Erkek</span>
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Bir Centilmen
              </span>
              <span className="block">Olmayı Hak Eder.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Centilmen Kuaför olarak amacımız her müşteriye 
              <span className="text-foreground font-medium"> özel deneyim sunmak</span> ve 
              <span className="text-foreground font-medium"> kaliteyi yaşatmak</span>.
            </p>

            {/* Elegant CTA Placement */}
            <div className="mt-12 flex items-center gap-6">
              <Link to="/randevu">
                <Button size="lg" className="px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Randevu Al
                </Button>
              </Link>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-12 h-px bg-gradient-to-r from-border to-transparent"></div>
                <span className="text-sm font-medium">15 yıllık deneyim</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        {/* Content */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Hikayemiz</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                <span className="text-primary font-semibold">2010 yılında</span> başladığımız yolculukta, 
                her müşterinin kendine özgü tarzını ortaya çıkarmayı hedefliyoruz.
              </p>
              
              <p>
                Modern kesim tekniklerini klasik centilmen dokunuşlarıyla birleştiriyoruz. 
                Misyonumuz; <span className="text-foreground font-medium">uzmanlık, hijyen ve samimiyet</span> ile 
                her ziyaretinizi keyifli bir deneyime dönüştürmektir.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">1000+ Mutlu Müşteri</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">⭐ 4.9/5 Değerlendirme</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl border border-border/40 shadow-2xl">
            <img
              src="about/hikayemiz.jpg"
              alt="Salon fotoğrafı"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-4 -right-4 w-full h-full border border-primary/20 rounded-2xl"></div>
          <div className="absolute -z-20 top-8 -right-8 w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl"></div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      icon: <FaAward  className="h-6 w-6" />,
      title: "Profesyonellik",
      desc: "Alanında uzman kuaförler ve stylistler ile hizmet kalitesi.",
    },
    {
      icon: <SiZap className="h-6 w-6" />,
      title: "Hız ve Kolaylık", 
      desc: "Online randevu sistemi ile hızlı ve kolay rezervasyon imkanı.",
    },
    {
      icon: <RiChatSmileAiFill className="h-6 w-6" />,
      title: "Müşteri Memnuniyeti",
      desc: "Her ziyaret özel ve kişiye özel yaklaşım ile mükemmel deneyim.",
    },
    {
      icon: <GiHealthPotion className="h-6 w-6" />,
      title: "Hijyen ve Güven",
      desc: "Tüm araç ve gereçler sterilize edilir, maksimum hijyen standardı.",
    },
  ];

  return (
    <section className="container mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Değerlerimiz</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Centilmen deneyimini oluşturan temel değerlerimiz
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {values.map((value, index) => (
          <div
            key={value.title}
            className="group relative"
          >
            <div className="h-full rounded-2xl border border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
              
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <div className="text-primary text-2xl">{value.icon}</div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.desc}
              </p>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Centilmen'in Arkasındaki Uzmanlar
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Deneyimli ve tutkulu ekibimizle size en iyi hizmeti sunuyoruz
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.slice(0, 4).map((person, index) => (
          <div
            key={person.name}
            className="group relative"
          >
            {/* Card container - NO overflow-hidden */}
            <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20">
              
              {/* Background Image (stays in place) */}
              <div className="aspect relative object-top overflow-hidden rounded-t-2xl">
                <img
                  src={person.backgroundImage}
                  alt={`${person.name} background`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              {/* Body Image (floats outside card on hover) */}
              <div className="absolute top-[-7.5%] left-0 right-0 pointer-events-none z-20">
                <div className="h-full w-full transition-all duration-700 ease-out group-hover:scale-150 group-hover:-translate-y-12 group-hover:translate-x-4">
                  <img
                    src={person.bodyImage}
                    alt={person.name}
                    className="h-full w-full object-cover object-top transition-all duration-700 rounded-t-2xl"
                    style={{
                      clipPath: 'polygon(25% 0%, 75% 0%, 85% 100%, 15% 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Overlay effect on hover */}
              <div className="absolute top-0 left-0 right-0 aspect-[3/5] bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none z-10"></div>
              
              {/* Content */}
              <div className="p-6 relative z-10 bg-card/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {person.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {person.role}
                </p>
                
                {/* Experience indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary transition-all duration-300`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Expert</span>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Press() {
  const quotes = TESTIMONIALS.slice(0, 3);
  const logos = [
    "https://dummyimage.com/120x40/9ca3af/222&text=Daily+Style",
    "https://dummyimage.com/120x40/9ca3af/222&text=Men's+Look", 
    "https://dummyimage.com/120x40/9ca3af/222&text=City+Life",
  ];

  return (
    <section className="container mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-3xl border border-border/40 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm p-8 md:p-12">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Referanslarımız</h2>
          <p className="text-lg text-muted-foreground">
            Müşterilerimizin deneyimleri ve basında yer aldığımız platformlar
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
          {quotes.map((quote, index) => (
            <div
              key={quote.name}
              className="group relative"
            >
              <div className="h-full rounded-xl border border-border/40 bg-background/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:bg-background/80">
                
                {/* Quote icon */}
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-lg">"</span>
                </div>
                
                <p className="text-foreground mb-4 italic leading-relaxed">
                  "{quote.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {quote.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">— {quote.name}</div>
                    <div className="text-xs text-muted-foreground">Müşteri</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press logos */}
        <div className="border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted-foreground mb-6">Basında biz</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {logos.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="Basın logosu" 
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300" 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm">
        
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/8 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="relative text-center p-12 md:p-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Centilmen Olmaya Hazır mısınız?
          </h3>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Profesyonel kuaför hizmetlerimiz ile tarzınızı keşfedin. 
            Randevunuzu hemen alın ve farkı yaşayın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/randevu">
              <Button size="lg" className="px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Randevu Al
              </Button>
            </Link>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <span className="text-sm">veya bizi arayın</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-border to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}