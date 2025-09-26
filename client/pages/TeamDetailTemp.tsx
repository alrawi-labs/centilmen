import React from 'react';
import { Award, Star, Clock, Scissors, CalendarDays, Phone } from 'lucide-react';

// ============================================================================
// MOCK DATA (Backend API'den geleceği varsayılan veriler)
// Bu veriler, URL'deki kuaför ID'sine göre fetch edilmelidir.
// Örnek olarak Duran Koçak (ID: 1) için verileri hazırladım.
// ============================================================================

const MOCK_HAIRDRESSER = {
  id: 1,
  firstName: "Duran",
  lastName: "Koçak",
  email: "duran.kocak@example.com",
  profile: {
    profile_picture: "../profile/profil.png",
    years_of_experience: 12,
    specialties: "Modern Kesim, Yaratıcı Renklendirme, Gelin Saçı, Vizontele, Keratin Bakım",
    rating: 4.9,
  },
  bio_blocks: [
    { id: 1, order: 1, type: "text", content: "Sektörde 12 yılı aşkın tecrübemle, en son trendleri ve klasikleşmiş stilleri bir araya getirerek size özel saç tasarımları sunuyorum. Sanatımı, sizin güzelliğinizi ortaya çıkarmak için bir araç olarak görüyorum. Amacım, salondan ayrıldığınızda sadece harika görünmeniz değil, aynı zamanda harika hissetmenizdir." },
    { id: 2, order: 2, type: "image", content: "../profile/paragraf1.jpg" },
    { id: 3, order: 3, type: "text", content: "Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz." },
    { id: 4, order: 4, type: "video", content: "../index/hero.mp4" },
    { id: 3, order: 3, type: "text", content: "Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz." },
    { id: 2, order: 2, type: "image", content: "../profile/paragraf2.jpg" },
    { id: 3, order: 3, type: "text", content: "Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz. Her saç tipi benzersizdir ve kişiye özel bir yaklaşım gerektirir. Ücretsiz bir konsültasyon için salonumuza uğrayarak saçınızın potansiyelini birlikte keşfedebiliriz." },
  ],
  working_schedule: [
    { day_of_week: 0, is_open: true, hours: [{ start_time: "09:00", end_time: "13:00" }, { start_time: "14:00", end_time: "19:00" }] },
    { day_of_week: 1, is_open: true, hours: [{ start_time: "09:00", end_time: "19:00" }] },
    { day_of_week: 2, is_open: true, hours: [{ start_time: "09:00", end_time: "19:00" }] },
    { day_of_week: 3, is_open: false, hours: [] },
    { day_of_week: 4, is_open: true, hours: [{ start_time: "09:00", end_time: "20:00" }] },
    { day_of_week: 5, is_open: true, hours: [{ start_time: "10:00", end_time: "20:00" }] },
    { day_of_week: 6, is_open: false, hours: [] },
  ]
};

const DAYS_OF_WEEK = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];


// ============================================================================
// HELPER COMPONENTS (Yardımcı Alt Bileşenler)
// ============================================================================

const BioBlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'text':
      return <p className="text-lg text-gray-300 leading-relaxed mb-6">{block.content}</p>;
    case 'image':
      return <img src={block.content} alt="Biyografi Resmi" className="rounded-2xl my-6 w-full object-cover" />;
    case 'video':
      return (
        <div className="aspect-video my-6">
          <iframe className="w-full h-full rounded-2xl" src={block.content} title="Biyografi Videosu" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      );
    default:
      return null;
  }
};

const WorkingHoursWidget = ({ schedule }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white flex items-center mb-4">
                <Clock className="w-5 h-5 mr-3 text-primary"/>
                Çalışma Saatleri
            </h3>
            <ul className="space-y-3">
                {DAYS_OF_WEEK.map((day, index) => {
                    const daySchedule = schedule.find(s => s.day_of_week === index);
                    const isOpen = daySchedule && daySchedule.is_open;
                    return (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">{day}</span>
                            {isOpen ? (
                                <div className="text-green-400 font-semibold flex flex-col items-end">
                                    {daySchedule.hours.map((h, i) => (
                                        <span key={i}>{h.start_time} - {h.end_time}</span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-red-400 font-semibold">Kapalı</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// ============================================================================
// MAIN PAGE COMPONENT (Ana Sayfa Bileşeni)
// ============================================================================

export default function HairdresserDetailPage() {
  // Gerçek uygulamada, bu veriyi URL'den alınan ID ile API'den çekersiniz.
  const hairdresser = MOCK_HAIRDRESSER;

  const specialties = hairdresser.profile.specialties.split(',').map(s => s.trim());

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* --- HERO BÖLÜMÜ --- */}
      <header className="relative h-80 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <img 
          src="../profile/cover.jpg" 
          alt="Salon Arkaplan" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 -bottom-20">
          <img 
            src={hairdresser.profile.profile_picture} 
            alt={`${hairdresser.firstName} ${hairdresser.lastName}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-800 shadow-lg"
          />
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 pt-28">
        {/* --- KUAFÖR BİLGİLERİ --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {hairdresser.firstName} {hairdresser.lastName}
          </h1>
          <div className="flex items-center justify-center gap-6 mt-4 text-primary">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-lg text-white">{hairdresser.profile.rating}</span>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-medium text-white">{hairdresser.profile.years_of_experience} Yıl Deneyim</span>
            </div>
          </div>
        </div>

        {/* --- ANA İÇERİK (2 SÜTUNLU YAPI) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* --- SOL SÜTUN: BİYOGRAFİ --- */}
          <main className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
                <CalendarDays className="w-7 h-7 mr-3 text-primary"/>
                Hakkımda
            </h2>
            <div className="prose prose-invert max-w-none">
              {hairdresser.bio_blocks.map(block => (
                <BioBlockRenderer key={block.id} block={block} />
              ))}
            </div>
          </main>
          
          {/* --- SAĞ SÜTUN: WIDGET'LAR --- */}
          <aside className="space-y-8">
            {/* Randevu Butonu */}
            <button className="w-full bg-primary text-gray-900 font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5"/>
                Hemen Randevu Al
            </button>
            
            {/* Uzmanlık Alanları */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white flex items-center mb-4">
                <Scissors className="w-5 h-5 mr-3 text-primary"/>
                Uzmanlık Alanları
              </h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((spec, index) => (
                  <span key={index} className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Çalışma Saatleri */}
            <WorkingHoursWidget schedule={hairdresser.working_schedule}/>
          </aside>
        </div>
      </div>
    </div>
  );
}