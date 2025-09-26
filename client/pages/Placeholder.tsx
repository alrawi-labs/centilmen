type Props = { title?: string };

export default function Placeholder({ title = "Sayfa" }: Props) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-xl border border-border bg-card/60 p-10 text-center">
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bu sayfa yakında detaylandırılacak. Lütfen hangi içeriği görmek
          istediğinizi belirtin; tasarımı isteklerinize göre netleştirelim.
        </p>
      </div>
    </section>
  );
}
