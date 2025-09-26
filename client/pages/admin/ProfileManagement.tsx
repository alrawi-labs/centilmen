import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Award,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Image as ImageIcon,
  Video,
  FileText,
  Briefcase
} from "lucide-react";

// --- Tipleri Tanımlayalım ---

interface IProfile {
  hairdresserId: number;
  profile_picture?: string;
  years_of_experience?: number;
  specialties?: string;
  rating?: number;
  hairdresserName?: string;
}

interface IBioBlock {
  id?: number;
  hairdresserId: number;
  order: number;
  type: 'text' | 'image' | 'video';
  content: string;
}

// ============================================================================
// STYLING COMPONENTS (Örnek dosyadan alındı)
// ============================================================================
const Button = ({
  size = "default",
  variant = "default",
  children,
  className = "",
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
      variant === "outline"
        ? "border border-border/40 bg-transparent hover:bg-card/80 hover:border-primary/30"
        : variant === "secondary"
        ? "bg-card/60 text-foreground hover:bg-card/80"
        : variant === "danger"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
    } ${size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ type = "text", placeholder, className = "", ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  />
);

const Textarea = ({ placeholder, className = "", ...props }) => (
    <textarea
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 min-h-[100px] ${className}`}
      {...props}
    />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Modal = ({ isOpen, onClose, children, title, size = "default" }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-card/95 border border-border/40 rounded-2xl mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm ${
        size === "lg" ? "max-w-4xl w-full" : "max-w-2xl w-full"
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h3 className="text-xl font-bold">{title}</h3>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};


// ============================================================================
// MOCK DATA (models.py'ye göre oluşturuldu)
// ============================================================================
const MOCK_HAIRDRESSERS = [
  { id: 1, firstName: "Duran", lastName: "Koçak", email: "duran@kuafor.com" },
  { id: 2, firstName: "Deniz", lastName: "Haznedar", email: "deniz@kuafor.com" },
  { id: 3, firstName: "Feyzullah", lastName: "Acar", email: "feyzullah@kuafor.com" }
];

const MOCK_PROFILES = [
    { hairdresserId: 1, profile_picture: "https://i.pravatar.cc/150?u=duran", years_of_experience: 12, specialties: "Modern Kesim, Renklendirme, Gelin Saçı", rating: 4.9 },
    { hairdresserId: 2, profile_picture: "https://i.pravatar.cc/150?u=deniz", years_of_experience: 8, specialties: "Klasik Kesim, Sakal Şekillendirme", rating: 4.7 },
    { hairdresserId: 3, profile_picture: "https://i.pravatar.cc/150?u=feyzullah", years_of_experience: 3, specialties: "Genç Stil, Yaratıcı Renkler", rating: 4.5 }
];

const MOCK_BIO_BLOCKS = [
    { id: 1, hairdresserId: 1, order: 1, type: "text", content: "12 yıllık tecrübemle en trend saç modellerini ve renklerini sizler için uyguluyorum. Müşteri memnuniyeti benim için her zaman önceliktir." },
    { id: 2, hairdresserId: 1, order: 2, type: "image", content: "https://images.unsplash.com/photo-1599351431202-187b213b1e32?w=500" },
    { id: 3, hairdresserId: 1, order: 3, type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 4, hairdresserId: 2, order: 1, type: "text", content: "Erkek saç kesimi ve sakal şekillendirme konusunda uzmanım. Geleneksel berberlik sanatını modern dokunuşlarla birleştiriyorum." }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProfileManagement() {
  const [hairdressers, setHairdressers] = useState(MOCK_HAIRDRESSERS);
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [bioBlocks, setBioBlocks] = useState(MOCK_BIO_BLOCKS);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBioBlockModalOpen, setIsBioBlockModalOpen] = useState(false);
  
  const [selectedProfile, setSelectedProfile] = useState(null); // { hairdresserId, hairdresserName, ...profileData }
  const [selectedBioBlock, setSelectedBioBlock] = useState(null); // blockData

  const handleOpenProfileModal = (hairdresser) => {
    const profileData = profiles.find(p => p.hairdresserId === hairdresser.id) || { hairdresserId: hairdresser.id };
    setSelectedProfile({ ...profileData, hairdresserName: `${hairdresser.firstName} ${hairdresser.lastName}` });
    setIsProfileModalOpen(true);
  };

  const handleSaveProfile = (profileData) => {
    setProfiles(prev => {
        const existingProfile = prev.find(p => p.hairdresserId === profileData.hairdresserId);
        if (existingProfile) {
            return prev.map(p => p.hairdresserId === profileData.hairdresserId ? { ...p, ...profileData } : p);
        }
        return [...prev, profileData];
    });
    setIsProfileModalOpen(false);
    setSelectedProfile(null);
  };

  const handleOpenBioBlockModal = (block, hairdresserId) => {
      if (block) { // Düzenleme
          setSelectedBioBlock(block);
      } else { // Yeni ekleme
          setSelectedBioBlock({ hairdresserId });
      }
      setIsBioBlockModalOpen(true);
  };

  const handleSaveBioBlock = (blockData) => {
    setBioBlocks(prev => {
        if (blockData.id) { // Güncelleme
            return prev.map(b => b.id === blockData.id ? { ...b, ...blockData } : b);
        }
        // Yeni ekleme
        const newBlock = { ...blockData, id: Date.now() };
        return [...prev, newBlock].sort((a,b) => a.order - b.order);
    });
    setIsBioBlockModalOpen(false);
    setSelectedBioBlock(null);
  };

  const handleDeleteBioBlock = (blockId) => {
    setBioBlocks(prev => prev.filter(b => b.id !== blockId));
  };


  const fullHairdresserData = useMemo(() => {
    return hairdressers.map(hd => ({
      ...hd,
      profile: profiles.find(p => p.hairdresserId === hd.id) || {},
      bio_blocks: bioBlocks.filter(b => b.hairdresserId === hd.id).sort((a,b) => a.order - b.order),
    }));
  }, [hairdressers, profiles, bioBlocks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Kuaför Profili Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  Kuaförlerin profil bilgilerini ve biyografilerini yönetin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
            {fullHairdresserData.map(hairdresser => (
                <HairdresserProfileCard
                    key={hairdresser.id}
                    hairdresser={hairdresser}
                    onEditProfile={() => handleOpenProfileModal(hairdresser)}
                    onAddBioBlock={() => handleOpenBioBlockModal(null, hairdresser.id)}
                    onEditBioBlock={(block) => handleOpenBioBlockModal(block, hairdresser.id)}
                    onDeleteBioBlock={handleDeleteBioBlock}
                />
            ))}
        </div>
      </div>
      
      {/* Modals */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleSaveProfile}
        profileData={selectedProfile}
      />
      <BioBlockModal
        isOpen={isBioBlockModalOpen}
        onClose={() => setIsBioBlockModalOpen(false)}
        onSubmit={handleSaveBioBlock}
        blockData={selectedBioBlock}
      />
    </div>
  );
}

// ============================================================================
// CHILD COMPONENTS
// ============================================================================

function HairdresserProfileCard({ hairdresser, onEditProfile, onAddBioBlock, onEditBioBlock, onDeleteBioBlock }) {
    const { firstName, lastName, email, profile, bio_blocks } = hairdresser;
    
    return (
        <div className="bg-card/60 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
            {/* Kuaför Bilgileri */}
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <img src={profile.profile_picture || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt={`${firstName} ${lastName}`} className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
                    <div>
                        <h3 className="text-xl font-bold">{firstName} {lastName}</h3>
                        <p className="text-sm text-muted-foreground">{email}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-primary" />
                                <span>{profile.years_of_experience || 0} Yıl Deneyim</span>
                           </div>
                           <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span>{profile.rating || 'N/A'}</span>
                           </div>
                        </div>
                    </div>
                </div>
                <Button variant="outline" onClick={onEditProfile}>
                    <Edit className="w-4 h-4 mr-2" />
                    Profili Düzenle
                </Button>
            </div>
            
            {/* Uzmanlık Alanları */}
            {profile.specialties && (
                <div className="mb-6">
                    <h4 className="font-semibold mb-2">Uzmanlık Alanları</h4>
                    <p className="text-sm bg-background/60 p-3 rounded-xl">{profile.specialties}</p>
                </div>
            )}

            {/* Biyografi Blokları */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Biyografi İçerikleri</h4>
                    <Button size="sm" onClick={onAddBioBlock}>
                        <Plus className="w-4 h-4 mr-2" />
                        Blok Ekle
                    </Button>
                </div>
                <div className="space-y-4">
                    {bio_blocks.length > 0 ? bio_blocks.map(block => (
                        <BioBlockItem 
                            key={block.id} 
                            block={block} 
                            onEdit={() => onEditBioBlock(block)}
                            onDelete={() => onDeleteBioBlock(block.id)}
                        />
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4 bg-background/50 rounded-lg">Henüz biyografi içeriği eklenmemiş.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function BioBlockItem({ block, onEdit, onDelete }) {
    const getIcon = (type) => {
        switch (type) {
            case "text": return <FileText className="w-5 h-5 text-primary" />;
            case "image": return <ImageIcon className="w-5 h-5 text-green-500" />;
            case "video": return <Video className="w-5 h-5 text-red-500" />;
            default: return <FileText className="w-5 h-5 text-primary" />;
        }
    };

    return (
        <div className="bg-background/60 p-4 rounded-xl flex items-start gap-4">
            <div className="flex-shrink-0">{getIcon(block.type)}</div>
            <div className="flex-grow">
                {block.type === 'image' ? (
                    <img src={block.content} alt="Bio" className="rounded-lg max-h-48" />
                ) : block.type === 'video' ? (
                    <iframe className="rounded-lg aspect-video w-full" src={block.content} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : (
                    <p className="text-sm text-foreground">{block.content}</p>
                )}
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
                <Button variant="outline" size="sm" className="p-2 h-auto" onClick={onEdit}>
                    <Edit className="w-4 h-4" />
                </Button>
                <Button variant="danger" size="sm" className="p-2 h-auto" onClick={onDelete}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}


// Varsayılan boş state
const initialProfileState: IProfile = {
  hairdresserId: 0,
  profile_picture: '',
  years_of_experience: 0,
  specialties: '',
  hairdresserName: ''
};

function ProfileEditModal({ isOpen, onClose, onSubmit, profileData }: { isOpen: boolean, onClose: () => void, onSubmit: (data: IProfile) => void, profileData: IProfile | null }) {
    // Başlangıç state'ini burada kullanıyoruz
    const [formData, setFormData] = useState<IProfile>(initialProfileState);

    useEffect(() => {
        // Eğer düzenlenecek veri varsa formu doldur, yoksa boşalt
        if (profileData) {
            setFormData(profileData);
        } else {
            setFormData(initialProfileState);
        }
    }, [profileData, isOpen]); // isOpen'ı da ekleyerek modal her açıldığında verinin güncellenmesini sağlarız

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${formData.hairdresserName || 'Profil'} Düzenle`}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Profil Fotoğrafı URL</label>
                    <Input name="profile_picture" value={formData.profile_picture || ''} onChange={handleChange} placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Deneyim (Yıl)</label>
                    <Input name="years_of_experience" type="number" value={formData.years_of_experience || ''} onChange={handleChange} placeholder="Örn: 5" />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-2">Uzmanlık Alanları</label>
                    <Textarea name="specialties" value={formData.specialties || ''} onChange={handleChange} placeholder="Modern Kesim, Renklendirme..." />
                </div>
                <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
                    <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
                    <Button type="submit">Kaydet</Button>
                </div>
            </form>
        </Modal>
    );
}

// Varsayılan boş state
const initialBioBlockState: IBioBlock = {
    hairdresserId: 0,
    order: 1,
    type: 'text',
    content: ''
};


function BioBlockModal({ isOpen, onClose, onSubmit, blockData }: { isOpen: boolean, onClose: () => void, onSubmit: (data: IBioBlock) => void, blockData: Partial<IBioBlock> | null }) {
    const [formData, setFormData] = useState<IBioBlock>(initialBioBlockState);
    
    useEffect(() => {
        if (blockData) {
            // Gelen veriyi başlangıç state'i ile birleştirerek eksik alanları doldur
            setFormData({ ...initialBioBlockState, ...blockData });
        } else {
            setFormData(initialBioBlockState);
        }
    }, [blockData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={blockData?.id ? "Biyografi Bloğunu Düzenle" : "Yeni Biyografi Bloğu Ekle"}>
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Blok Tipi</label>
                        <Select name="type" value={formData.type || 'text'} onChange={handleChange}>
                            <option value="text">Metin</option>
                            <option value="image">Resim</option>
                            <option value="video">Video</option>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Sıra</label>
                        <Input name="order" placeholder="Sıra Seçin" type="number" value={formData.order || 1} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">İçerik</label>
                    <Textarea name="content" value={formData.content || ''} onChange={handleChange} placeholder={
                        formData.type === 'text' ? 'Biyografi metnini girin...' : 
                        formData.type === 'image' ? 'Resim URL adresini girin...' : 
                        'Youtube embed URL adresini girin...'
                    }/>
                </div>
                <div className="flex gap-3 justify-end pt-4 border-t border-border/20">
                    <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
                    <Button type="submit">Kaydet</Button>
                </div>
             </form>
        </Modal>
    );
}