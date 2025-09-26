import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FEATURED_MODELS, TEAM, TESTIMONIALS } from "@/utils/constants";
import {
  Scissors,
  ShieldCheck,
  Award,
  Sparkles,
  Star,
  Check,
} from "lucide-react";
import BeforeAfter from "@/components/BeforeAfter";
import WhyUsScroll from "@/components/sections/WhyUsScroll";
import ClipperScroll from "@/components/sections/ClipperScroll";
import Featured from "@/components/sections/Featured";
import Gallery from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import Freedom from "@/components/sections/Freedom";
import ExperienceScroll from "@/components/sections/ExperienceScroll";
import UltimateBarberTeam from "@/components/sections/UltimateBarberTeam";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";

export default function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <Satisfaction />
      <WhyUsScroll />
      <Stats />
      <ClipperScroll />
      <Featured />
      <Gallery />
      <Testimonials />
      <Freedom />
      <ExperienceScroll />
      <UltimateBarberTeam />
      <FAQ />
    </div>
  );
}

// function Hero() {
//   return (
//     <section className="relative isolate min-h-[90vh]">
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <video
//           className="h-full w-full object-cover"
//           autoPlay
//           loop
//           muted
//           playsInline
//           poster="https://images.unsplash.com/photo-1517837016564-bfc3ffd67455?q=80&w=1920&auto=format&fit=crop"
//         >
//           <source
//             src="https://assets.mixkit.co/videos/download/mixkit-barber-cutting-a-clients-hair-4369-medium.mp4"
//             type="video/mp4"
//           />
//         </video>
//         <div className="absolute inset-0 bg-background/70" />
//       </div>

//       <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-28 md:grid-cols-2">
//         <div className="flex flex-col justify-center">
//           <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
//             <span className="block">Her Erkek</span>
//             <span className="block">Bir Centilmen</span>
//             <span className="block">Olmayı Hak Eder.</span>
//           </h1>
//         </div>
//         <div className="flex items-center md:justify-end">
//           <div className="flex w-full max-w-xl items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur md:w-auto">
//             <p className="text-lg font-semibold">
//               Centilmen’e gel, Centilmen ol.
//             </p>
//             <Link to="/randevu">
//               <Button size="lg" className="whitespace-nowrap">
//                 Hemen Randevu Al
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Satisfaction() {
  return (
    <section className="container mx-auto max-w-6xl px-8 py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-8 md:p-12 backdrop-blur">
        {/* Arka plan blur efektleri */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--primary)/0.18),transparent_70%)]" />
          <div className="absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--primary)/0.12),transparent_70%)]" />
        </div>

        {/* Başlık */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
          Müşterilerimiz platformumuzu kullanarak rahatça saç stilini
          seçebiliyorlar
        </h2>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* 1. Fotoğraf paneli */}
          <div className="group relative h-64 overflow-hidden rounded-xl ring-1 ring-border/60 bg-black/30 md:h-72 lg:h-80">
            <img
              src="index/mutlu_musteri.jpg"
              alt="Berber salonunda saç kesimi"
              className="h-full w-full object-cover transition-transform duration-700 "
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />
          </div>

          {/* 2. Saç stil paneli */}
          <div className="relative group overflow-hidden">
            {/* Main Card */}
            <div className="flex h-44 items-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/15 to-transparent p-8 ring-1 ring-primary/20 backdrop-blur-sm md:h-52 transition-all duration-500">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl opacity-0 transition-opacity duration-700" />

              {/* Floating particles effect */}
              <div className="absolute top-4 right-6 w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse delay-300" />
              <div className="absolute top-12 right-8 w-1 h-1 bg-primary/50 rounded-full animate-pulse delay-700" />

              {/* Content */}
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <div className="text-sm font-semibold text-white/80 tracking-wide uppercase md:text-base">
                    En çok seçilen saç stili
                  </div>
                </div>

                <div className="relative">
                  <div className="mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-3xl font-black text-transparent md:text-4xl tracking-tight">
                    High Fade
                  </div>

                  {/* Subtle underline effect */}
                  <div className="mt-2 h-0.5 w-0 bg-primary rounded-full group-hover:w-20 transition-all duration-700 ease-out" />
                </div>

                {/* Stats or additional info */}
                <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full" />
                    <span>Popüler</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/80 rounded-full" />
                    <span>Trend</span>
                  </div>
                </div>
              </div>

              {/* Side decoration */}
              <div className="hidden md:flex flex-col items-center justify-center ml-6 opacity-60 transition-opacity duration-500">
                <div className="text-6xl font-black bg-gradient-to-b from-primary/40 to-primary/20 bg-clip-text text-transparent">
                  #1
                </div>
                <div className="text-xs text-primary/60 mt-1 font-medium">
                  CHOICE
                </div>
              </div>
            </div>
          </div>

          {/* 3. Hemen Randevu Al paneli */}
          <div className="">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 ring-1 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
              {/* Background decoration */}
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/10 blur-xl transition-all duration-300" />

              <div className="relative flex h-40 items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <div className="text-lg font-semibold md:text-xl">
                      Hemen Randevu Al
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Uygun saatleri şimdi seçin.
                  </div>
                  <div className="text-xs text-primary/70 font-medium">
                    ✓ Hızlı rezervasyon ✓ Esnek saatler
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <Link to="/randevu">
                    <Button variant="default" size="lg" className="bg-primary">
                      Randevu Al
                    </Button>
                  </Link>
                  <div className="text-xs text-muted-foreground text-right">
                    2 dakikada tamamla
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Logo paneli */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-black/20 p-6 text-center ring-1 ring-border/60 h-[20.8rem] -translate-y-[120px]">
            <img
              src="CentilmenLogo.png"
              alt="Berber salonunda saç kesimi"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "+2500", label: "Mutlu ve Sadık Müşteri" },
    { value: "+15", label: "Uzman Kuaför ve Stylist" },
    { value: "+10", label: "Yıllık Tecrübe" },
    { value: "+40", label: "Ödül & Sertifika" },
  ];
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/60 bg-card/60 p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {s.value}
            </div>
            <div className="mt-2 text-xs md:text-sm text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// function Freedom() {
//   const items = [
//     {
//       title: "Saç Modeli",
//       desc: "İstediğiniz saç modelini siz seçebiliyorsunuz.",
//     },
//     {
//       title: "Kuaför",
//       desc: "Kime randevu almak istediğinizi siz belirleyebiliyorsunuz.",
//     },
//     { title: "Saat", desc: "İstediğiniz saatte randevu alabiliyorsunuz." },
//   ];
//   return (
//     <section className="container mx-auto max-w-6xl px-4 py-10">
//       <h3 className="text-xl font-semibold">Özgürlük</h3>
//       <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
//         {items.map((it) => (
//           <div
//             key={it.title}
//             className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-4"
//           >
//             <Check className="mt-0.5 h-5 w-5 text-primary" />
//             <div>
//               <div className="text-sm font-semibold">{it.title}</div>
//               <div className="text-xs text-muted-foreground">{it.desc}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Team() {
//   const team = [
//     {
//       name: "Centilmen abi",
//       role: "Usta Berber",
//       image:
//         "https://images.unsplash.com/photo-1509988892867-8bf3ee9e3afa?q=80&w=1200&auto=format&fit=crop",
//     },
//     {
//       name: "Denizcim",
//       role: "Stylist",
//       image:
//         "https://images.unsplash.com/photo-1545169390-0bcd7f6a24b1?q=80&w=1200&auto=format&fit=crop",
//     },
//     {
//       name: "Feyzullah",
//       role: "Sakal Ustası",
//       image:
//         "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
//     },
//   ];
//   return (
//     <section className="container mx-auto max-w-6xl px-4 py-14">
//       <h2 className="mb-6 text-2xl font-semibold">Ekipimiz</h2>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {team.map((p) => (
//           <div
//             key={p.name}
//             className="overflow-hidden rounded-xl border border-border/60 bg-card/60"
//           >
//             <div className="aspect-[4/3] overflow-hidden">
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <div className="p-4">
//               <div className="text-lg font-semibold">{p.name}</div>
//               <div className="text-sm text-muted-foreground">{p.role}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function FAQ() {
//   const faq = [
//     {
//       q: "Randevu almadan gelebilir miyim?",
//       a: "Evet, gelebilirsiniz. Ancak yoğunluk durumuna göre bekleme süresi olabilir. Randevu almanız sizi bekletmeden hizmet almaya yardımcı olur.",
//     },
//     {
//       q: "Randevumu iptal edebilir miyim?",
//       a: "Evet, randevularınızı sistem üzerinden ya da telefonla kolayca iptal edebilirsiniz.",
//     },
//     {
//       q: "Ödeme yöntemleriniz nelerdir?",
//       a: "Nakit ve kredi kartı ile ödeme yapabilirsiniz.",
//     },
//     {
//       q: "Saç modelimi önceden seçebilir miyim?",
//       a: "Evet, sistemimiz üzerinden istediğiniz saç modelini seçip kuaförünüze iletebilirsiniz.",
//     },
//     {
//       q: "Kaç gün önceden randevu almalıyım?",
//       a: "Yoğunluk dönemine göre değişmekle birlikte 1-2 gün önceden randevu almanız tavsiye edilir.",
//     },
//     {
//       q: "Kuaförümü kendim seçebilir miyim?",
//       a: "Evet, istediğiniz kuaförü seçerek ona özel randevu oluşturabilirsiniz.",
//     },
//     {
//       q: "Randevuya geç kalırsam ne olur?",
//       a: "Geç kalmanız durumunda diğer müşterilerin beklememesi için randevunuz iptal olabilir, ancak uygunluk varsa yeniden ayarlanır.",
//     },
//     {
//       q: "Hijyen kurallarınız nelerdir?",
//       a: "Tüm ekipmanlarımız her müşteri sonrası sterilize edilir. Salonumuzda hijyen önceliğimizdir.",
//     },
//   ];
//   return (
//     <section className="container mx-auto max-w-3xl px-4 py-14">
//       <h2 className="mb-6 text-2xl font-semibold">
//         SSS – Sıkça Sorulan Sorular
//       </h2>
//       <Accordion
//         type="single"
//         collapsible
//         className="w-full rounded-xl border border-border/60 bg-card/60 px-4"
//       >
//         {faq.map((f, i) => (
//           <AccordionItem value={`item-${i}`} key={i}>
//             <AccordionTrigger>{f.q}</AccordionTrigger>
//             <AccordionContent>{f.a}</AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//       <div className="mt-4 text-center text-sm text-muted-foreground">
//         Başka sorunuz mu var? Hemen buradan yazarak sorabilirsiniz.
//       </div>
//     </section>
//   );
// }
