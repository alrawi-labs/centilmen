import { useParams, Link } from "react-router-dom";
import { FEATURED_MODELS } from "@/utils/constants";
import { Button } from "@/components/ui/button";

const FACE_TYPES = ["Oval", "Kare", "Yuvarlak"];

export default function ModelDetail() {
  const { slug } = useParams();
  const model = FEATURED_MODELS.find((m) => m.slug === slug) || FEATURED_MODELS[0];

  return (
    <section className="container mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{model.name}</h1>
          <p className="text-muted-foreground">{model.category}</p>
        </div>
        <Link to="/randevu">
          <Button size="lg">Bu Modelle Randevu Al</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="overflow-hidden rounded-xl border border-border/70">
            <img src={model.image} alt={model.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border/70">
                <img src={`${model.image}&t=${i}`} alt={`${model.name} ${i}`} className="h-28 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border/60 bg-card/60 p-5">
            <h3 className="mb-3 text-lg font-semibold">Uygun Yüz Tipleri</h3>
            <div className="flex flex-wrap gap-2">
              {FACE_TYPES.map((t) => (
                <span key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 p-5">
            <h3 className="mb-3 text-lg font-semibold">Önerilen Diğer Modeller</h3>
            <div className="space-y-3">
              {FEATURED_MODELS.filter((m) => m.slug !== model.slug).slice(0, 3).map((m) => (
                <Link to={`/sac-modelleri/${m.slug}`} key={m.slug} className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary/60">
                  <img src={m.image} alt={m.name} className="h-12 w-12 rounded-md object-cover" />
                  <div>
                    <div className="text-sm text-muted-foreground">{m.category}</div>
                    <div className="text-sm font-medium">{m.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
