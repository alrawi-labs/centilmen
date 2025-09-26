import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HAIR_CATEGORIES, EXPLORE_MENU, LANGUAGES } from "@/utils/constants";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const stylesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exploreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openWithGrace = (menu: "styles" | "explore") => {
    if (menu === "styles") {
      if (stylesTimer.current) clearTimeout(stylesTimer.current);
      setStylesOpen(true);
    } else {
      if (exploreTimer.current) clearTimeout(exploreTimer.current);
      setExploreOpen(true);
    }
  };

  const closeWithGrace = (menu: "styles" | "explore") => {
    const delay = 150; // small delay to allow cursor travel
    if (menu === "styles") {
      if (stylesTimer.current) clearTimeout(stylesTimer.current);
      stylesTimer.current = setTimeout(() => setStylesOpen(false), delay);
    } else {
      if (exploreTimer.current) clearTimeout(exploreTimer.current);
      exploreTimer.current = setTimeout(() => setExploreOpen(false), delay);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-primary/20 ring-1 ring-primary/40 grid place-items-center">
            <img
                    src="CentilmenLogo.png"
                    alt="Berber salonunda saç kesimi"
                    className="h-full w-full object-cover transition-transform duration-700 "
                  />
          </div>
          <span className="text-lg font-semibold tracking-wide">CENTİLMEN</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/60",
                isActive && "bg-secondary text-secondary-foreground",
              )
            }
          >
            {t("nav.home")}
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => openWithGrace("styles")}
            onMouseLeave={() => closeWithGrace("styles")}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/60"
              aria-haspopup="menu"
              aria-expanded={stylesOpen}
              onFocus={() => openWithGrace("styles")}
              onBlur={() => closeWithGrace("styles")}
            >
              {t("nav.styles")} <ChevronDown className="h-4 w-4" />
            </button>
            {stylesOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[min(1100px,95vw)] -translate-x-1/2 pt-2">
                <div
                  className="rounded-xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur"
                  onMouseEnter={() => openWithGrace("styles")}
                  onMouseLeave={() => closeWithGrace("styles")}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {HAIR_CATEGORIES.map((cat) => (
                      <div key={cat.key}>
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                          {t(`hair.categories.${cat.key}`)}
                        </h4>
                        <ul className="space-y-1">
                          {cat.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/sac-modelleri/${item.slug}`}
                                className="group/link flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-secondary/60"
                                onClick={() => setStylesOpen(false)}
                              >
                                <span>{t(`hair.items.${item.slug}`)}</span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover/link:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Trendleri keşfedin ve size en uygun modeli bulun.
                    </div>
                    <Link
                      to="/sac-modelleri"
                      onClick={() => setStylesOpen(false)}
                    >
                      <Button variant="secondary" size="sm">
                        {t("nav.allModels")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => openWithGrace("explore")}
            onMouseLeave={() => closeWithGrace("explore")}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/60"
              aria-haspopup="menu"
              aria-expanded={exploreOpen}
              onFocus={() => openWithGrace("explore")}
              onBlur={() => closeWithGrace("explore")}
            >
              {t("nav.explore")} <ChevronDown className="h-4 w-4" />
            </button>
            {exploreOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[min(1100px,95vw)] -translate-x-1/2 pt-2">
                <div
                  className="rounded-xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur grid grid-cols-1 md:grid-cols-3 gap-6"
                  onMouseEnter={() => openWithGrace("explore")}
                  onMouseLeave={() => closeWithGrace("explore")}
                >
                  {Object.values(EXPLORE_MENU).map((section) => (
                    <div key={section.heading}>
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                        {t(`explore.${(section as any).id}.heading`)}
                      </h4>
                      <ul className="space-y-1">
                        {section.links.map((l) => (
                          <li key={`${section.heading}-${l.label}`}>
                            <Link
                              to={l.href}
                              className="group/link flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-secondary/60"
                              onClick={() => setExploreOpen(false)}
                            >
                              <span>
                                {t(
                                  `explore.${(section as any).id}.links.${l.key}`,
                                )}
                              </span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover/link:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/dogrulama?mode=giris"
            className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/60",
                isActive && "bg-secondary text-secondary-foreground",
              )
            }
          >
            {t("nav.auth")}
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/60"
            >
              {t("nav.language")} <ChevronDown className="h-4 w-4" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-md border border-border bg-card p-1 shadow">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className={cn(
                      "w-full rounded px-2 py-1.5 text-left text-sm hover:bg-secondary/60",
                      i18n.resolvedLanguage === l.code && "bg-secondary/60",
                    )}
                    onClick={() => {
                      i18n.changeLanguage(l.code);
                      setLangOpen(false);
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}         
          </div>

          <div className="relative">
              <Link to="/randevu" >
                <Button className="w-full">Hemen Randevu Al</Button>
              </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/randevu">
            <Button size="sm">Randevu Al</Button>
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary/60"
            onClick={() => setMobileOpen(true)}
            aria-label="Açılır Menü"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-auto w-[85%] max-w-sm overflow-y-auto border-l border-border bg-background p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="h-9 w-9 rounded-md bg-primary/20 ring-1 ring-primary/40 grid place-items-center">
                  <img
                    src="CentilmenLogo.png"
                    alt="Berber salonunda saç kesimi"
                    className="h-full w-full object-cover transition-transform duration-700 "
                  />
                </div>
                <span className="text-lg font-semibold">Centilmen</span>
              </Link>
              <button
                className="rounded-md p-2 hover:bg-secondary/60"
                onClick={() => setMobileOpen(false)}
                aria-label="Kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 hover:bg-secondary/60"
              >
                {t("nav.home")}
              </NavLink>
              <NavLink
                to="/sac-modelleri"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 hover:bg-secondary/60"
              >
                {t("nav.styles")}
              </NavLink>
              <div className="rounded-md border border-border/60">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                  {t("nav.explore")}
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                  {Object.values(EXPLORE_MENU)
                    .flatMap((s) =>
                      s.links.map((l) => ({ ...l, sectionId: (s as any).id })),
                    )
                    .map((l, i) => (
                      <Link
                        key={`${l.href}-${l.key}-${i}`}
                        to={l.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded px-2 py-1 text-sm hover:bg-secondary/60"
                      >
                        {t(`explore.${l.sectionId}.links.${l.key}`)}
                      </Link>
                    ))}
                </div>
              </div>
              <NavLink
                to="/giris"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 hover:bg-secondary/60"
              >
                {t("nav.auth")}
              </NavLink>
              <div className="flex items-center gap-2 pl-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className="rounded-md px-2 py-1 text-sm hover:bg-secondary/60"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link to="/randevu" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Hemen Randevu Al</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
