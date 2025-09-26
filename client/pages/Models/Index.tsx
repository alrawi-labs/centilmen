import { Link } from "react-router-dom";
import { HAIR_CATEGORIES, FEATURED_MODELS } from "@/utils/constants";
import { Button } from "@/components/ui/button";

export default function ModelsIndex() {
  return (
    <div>
      <section className="relative">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Saç Modelleri</h1>
              <p className="text-muted-foreground">Kategorilere göz atın ve tarzınızı bulun.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HAIR_CATEGORIES.map((cat) => (
              <div key={cat.key} className="rounded-xl border border-border bg-card/60 p-5">
                <h3 className="mb-3 text-lg font-semibold">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.items.map((i) => (
                    <li key={i.slug}>
                      <Link className="text-sm text-muted-foreground hover:underline" to={`/sac-modelleri/${i.slug}`}>
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold">Öne Çıkan Modeller</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_MODELS.map((m) => (
              <Link key={m.slug} to={`/sac-modelleri/${m.slug}`} className="group overflow-hidden rounded-xl border border-border/70 bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="text-sm text-primary/80">{m.category}</div>
                  <div className="text-lg font-semibold">{m.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
