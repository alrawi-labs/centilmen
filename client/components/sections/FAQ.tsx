import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

// Accordion components for demo
const Accordion = ({ type, collapsible, className, children }) => (
  <div className={className}>{children}</div>
);

const AccordionItem = ({ value, children }) => (
  <div className="border-b border-border/20 last:border-b-0">{children}</div>
);

const AccordionTrigger = ({ children, onClick, isOpen }) => (
  <button
    className="flex w-full items-center justify-between py-6 px-2 text-left text-base font-medium hover:text-primary transition-all duration-300 group"
    onClick={onClick}
  >
    <span className="group-hover:translate-x-1 transition-transform duration-300">
      {children}
    </span>
    <div
      className={`w-6 h-6 flex items-center justify-center transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
    >
      <div className="relative">
        <div
          className={`w-4 h-px bg-current transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
        ></div>
        <div
          className={`w-4 h-px bg-current absolute top-0 transition-all duration-300 ${isOpen ? "-rotate-45" : "rotate-90"}`}
        ></div>
      </div>
    </div>
  </button>
);

const AccordionContent = ({ children, isOpen }) => (
  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}
  >
    <div className="px-2 text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const faq = [
    {
      q: "Randevu almadan gelebilir miyim?",
      a: "Evet, gelebilirsiniz. Ancak yoğunluk durumuna göre bekleme süresi olabilir. Randevu almanız sizi bekletmeden hizmet almaya yardımcı olur.",
      icon: "🕒",
    },
    {
      q: "Randevumu iptal edebilir miyim?",
      a: "Evet, randevularınızı sistem üzerinden ya da telefonla kolayca iptal edebilirsiniz.",
      icon: "✖️",
    },
    {
      q: "Ödeme yöntemleriniz nelerdir?",
      a: "Nakit ve kredi kartı ile ödeme yapabilirsiniz.",
      icon: "💳",
    },
    {
      q: "Saç modelimi önceden seçebilir miyim?",
      a: "Evet, sistemimiz üzerinden istediğiniz saç modelini seçip kuaförünüze iletebilirsiniz.",
      icon: "✂️",
    },
    {
      q: "Kaç gün önceden randevu almalıyım?",
      a: "Yoğunluk dönemine göre değişmekle birlikte 1-2 gün önceden randevu almanız tavsiye edilir.",
      icon: "📅",
    },
    {
      q: "Kuaförümü kendim seçebilir miyim?",
      a: "Evet, istediğiniz kuaförü seçerek ona özel randevu oluşturabilirsiniz.",
      icon: "👨‍💼",
    },
    {
      q: "Randevuya geç kalırsam ne olur?",
      a: "Geç kalmanız durumunda diğer müşterilerin beklememesi için randevunuz iptal olabilir, ancak uygunluk varsa yeniden ayarlanır.",
      icon: "⏰",
    },
    {
      q: "Hijyen kurallarınız nelerdir?",
      a: "Tüm ekipmanlarımız her müşteri sonrası sterilize edilir. Salonumuzda hijyen önceliğimizdir.",
      icon: "🧼",
    },
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="relative container mx-auto max-w-4xl px-4 py-20 overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              FAQ
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-primary to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
            Sıkça Sorulan
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent leading-tight">
            Sorular
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Centilmen deneyimi hakkında merak ettiklerinizi burada
            bulabilirsiniz
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="relative">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faq.map((f, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/40 bg-gradient-to-r from-card/60 via-card/80 to-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Elegant hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <AccordionItem value={`item-${i}`}>
                  <div className="relative z-10">
                    {/* Icon decorator */}
                    <div className="absolute left-4 top-6 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-primary/20 transition-all duration-300">
                      <span className="text-sm">{f.icon}</span>
                    </div>

                    <AccordionTrigger
                      onClick={() => toggleItem(i)}
                      isOpen={openItem === i}
                    >
                      <span className="ml-12 text-lg">{f.q}</span>
                    </AccordionTrigger>

                    <AccordionContent isOpen={openItem === i}>
                      <div className="ml-12 mr-8 text-base leading-7">
                        {f.a}
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>

        {/* Call-to-Action Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-card/40 via-card/60 to-card/40 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">
              Başka sorunuz mu var?
            </h3>

            <p className="text-muted-foreground mb-4 max-w-md">
              Uzman ekibimiz size yardımcı olmaya hazır. Hemen iletişime geçin.
            </p>

            <Link to="/iletisim">
              <Button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                İletişime Geç
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-px bg-current transform rotate-45"></div>
                  <div className="w-2 h-px bg-current transform -rotate-45 -ml-1"></div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
