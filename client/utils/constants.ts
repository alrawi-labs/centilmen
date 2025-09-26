export type HairModel = {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
};

export const HAIR_CATEGORIES: {
  name: string;
  key: string;
  items: { name: string; slug: string }[];
}[] = [
  {
    name: "Klasik Modeller",
    key: "klasik",
    items: [
      { name: "Klasik Saç Kesimi", slug: "klasik-sac-kesimi" },
      { name: "Side Part", slug: "side-part" },
      { name: "Ivy League", slug: "ivy-league" },
      { name: "Taper Cut", slug: "taper-cut" },
    ],
  },
  {
    name: "Modern / Trendy Modeller",
    key: "modern-trendy",
    items: [
      { name: "Pompadour", slug: "pompadour" },
      { name: "Quiff", slug: "quiff" },
      { name: "Textured Crop", slug: "textured-crop" },
      { name: "Comb Over", slug: "comb-over" },
      { name: "Faux Hawk", slug: "faux-hawk" },
    ],
  },
  {
    name: "Fade / Kısa Tarz Modeller",
    key: "fade-kisa",
    items: [
      { name: "Low Fade", slug: "low-fade" },
      { name: "Mid Fade", slug: "mid-fade" },
      { name: "High Fade", slug: "high-fade" },
      { name: "Skin Fade", slug: "skin-fade" },
      { name: "Buzz Cut", slug: "buzz-cut" },
      { name: "Crew Cut", slug: "crew-cut" },
    ],
  },
  {
    name: "Özel / Deneysel Modeller",
    key: "ozel-deneysel",
    items: [
      { name: "Spiky Hair", slug: "spiky-hair" },
      { name: "Undercut", slug: "undercut" },
      { name: "Asimetrik Kesimler", slug: "asimetrik-kesimler" },
    ],
  },
];

export const EXPLORE_MENU = {
  Kimiz: {
    id: "kimiz",
    heading: "Kimiz?",
    links: [
      { key: "hakkimizda", label: "Hakkımızda", href: "/hakkimizda" },
      { key: "ekibimiz", label: "Ekibimiz", href: "/ekip" },
      { key: "centil-abi", label: "Centil abi", href: "/ekip-detay" },
      { key: "deniz", label: "Deniz", href: "/ekip-detay" },
      { key: "ucuncu", label: "Üçüncüyü unuttum", href: "/ekip-detay" },
    ],
  },
  Iletisim: {
    id: "iletisim",
    heading: "İletişim",
    links: [
      { key: "bize-ulasin", label: "Bize ulaşın", href: "/iletisim" },
      { key: "randevu-alin", label: "Randevu alın", href: "/randevu" },
      { key: "kayit-olun", label: "Kayıt Olun", href: "/dogrulama?mode=kayit" },
      { key: "giris-yapin", label: "Giriş Yapın", href: "/dogrulama?mode=giris" },
    ],
  },
  Kaynaklar: {
    id: "kaynaklar",
    heading: "Kaynaklar",
    links: [
      { key: "sss", label: "Sıkça Sorulan Sorular", href: "/sss" },
      { key: "rahatlik-bakim", label: "Rahatlık ve bakım", href: "/kaynaklar/rahatlik-bakim" },
    ],
  },
  
};

export const LANGUAGES = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
];

export const FEATURED_MODELS: HairModel[] = [
  {
    slug: "pompadour",
    name: "Pompadour",
    category: "Modern / Trendy Modeller",
    subcategory: "Modern",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "quiff",
    name: "Quiff",
    category: "Modern / Trendy Modeller",
    subcategory: "Modern",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "low-fade",
    name: "Low Fade",
    category: "Fade / Kısa Tarz Modeller",
    subcategory: "Fade",
    image:
      "https://images.unsplash.com/photo-1554774853-b415df9eeb92?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "taper-cut",
    name: "Taper Cut",
    category: "Klasik Modeller",
    subcategory: "Klasik",
    image:
      "https://images.unsplash.com/photo-1536520002442-39764a41e2a5?q=80&w=1200&auto=format&fit=crop",
  },
];

export const TEAM = [
  {
    name: "Centil abi",
    role: "Usta Berber",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Deniz",
    role: "Stilist",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Üçüncü…",
    role: "Çırak",
    image:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
  },
];

export const TESTIMONIALS = [
  {
    name: "Mert K.",
    text: "Hayatımın en iyi kesimini burada yaptırdım. Ortam ve ilgi çok iyi!",
  },
  {
    name: "Can D.",
    text: "Randevu sistemi pratik, ekip profesyonel. Tavsiye ederim.",
  },
  {
    name: "Efe A.",
    text: "Modern kesimler harika. Özellikle fade tarzını çok iyi yapıyorlar.",
  },
];
