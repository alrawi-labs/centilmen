import { useState, useMemo } from "react";
import {
  Scissors,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  X,
  Save,
  Search,
  Grid3X3,
  List,
  Image as ImageIcon,
  Tag,
  User,
  Camera,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock Components
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
        : variant === "success"
        ? "bg-green-500 text-white hover:bg-green-600"
        : variant === "warning"
        ? "bg-orange-500 text-white hover:bg-orange-600"
        : variant === "danger"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
    } ${
      size === "lg"
        ? "px-8 py-4 text-lg"
        : size === "sm"
        ? "px-4 py-2 text-sm"
        : "px-6 py-3 text-base"
    } ${className}`}
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

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Textarea = ({ placeholder, className = "", rows = 3, ...props }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 resize-none ${className}`}
    {...props}
  />
);

const Modal = ({ isOpen, onClose, children, title, size = "default" }) => {
  if (!isOpen) return null;
  
  const sizeClasses = size === "large" ? "max-w-4xl" : "max-w-2xl";
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-card/95 border border-border/40 rounded-2xl ${sizeClasses} w-full mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm animate-in fade-in-0 zoom-in-95`}>
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

// Mock Data
const MOCK_HAIR_STYLES = [
  {
    id: 1,
    name: "Modern Fade",
    category: "Fade",
    faceTypes: ["oval", "kare"],
    description: "Klasik fade kesimi ile modern dokunuş",
    difficulty: "orta",
    duration: "45 dakika",
    price: "₺200",
    popularity: 4.8,
    photos: [
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1619951917260-4e79d3ce9a08?w=400&h=300&fit=crop"
    ],
    tags: ["modern", "klasik", "popüler"],
    createdAt: "2024-09-20",
    updatedAt: "2024-09-24"
  },
  {
    id: 2,
    name: "Undercut Styling",
    category: "Undercut",
    faceTypes: ["yuvarlak", "oval"],
    description: "Yan taraf kısa, üst uzun stil",
    difficulty: "kolay",
    duration: "30 dakika",
    price: "₺180",
    popularity: 4.6,
    photos: [
      "https://images.unsplash.com/photo-1610635110937-4b96d2aa8e38?w=400&h=300&fit=crop"
    ],
    tags: ["undercut", "genç", "trend"],
    createdAt: "2024-09-18",
    updatedAt: "2024-09-22"
  },
  {
    id: 3,
    name: "Klasik Pompadour",
    category: "Pompadour",
    faceTypes: ["oval", "uzun"],
    description: "Retro tarzda pompadour kesimi",
    difficulty: "zor",
    duration: "60 dakika",
    price: "₺250",
    popularity: 4.9,
    photos: [
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1619951917260-4e79d3ce9a08?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1610635110937-4b96d2aa8e38?w=400&h=300&fit=crop"
    ],
    tags: ["pompadour", "retro", "klasik"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-23"
  },
  {
    id: 4,
    name: "Buzz Cut",
    category: "Kısa",
    faceTypes: ["kare", "oval", "yuvarlak"],
    description: "Çok kısa, pratik kesim",
    difficulty: "kolay",
    duration: "20 dakika",
    price: "₺120",
    popularity: 4.2,
    photos: [
      "https://images.unsplash.com/photo-1619951917260-4e79d3ce9a08?w=400&h=300&fit=crop"
    ],
    tags: ["kısa", "pratik", "spor"],
    createdAt: "2024-09-10",
    updatedAt: "2024-09-20"
  }
];

const CATEGORIES = [
  { id: "all", name: "Tüm Kategoriler" },
  { id: "fade", name: "Fade" },
  { id: "undercut", name: "Undercut" },
  { id: "pompadour", name: "Pompadour" },
  { id: "kısa", name: "Kısa Kesim" },
  { id: "uzun", name: "Uzun Saç" },
  { id: "klasik", name: "Klasik" }
];

const FACE_TYPES = [
  { id: "all", name: "Tüm Yüz Tipleri", label: "Tümü" },
  { id: "oval", name: "oval", label: "Oval" },
  { id: "yuvarlak", name: "yuvarlak", label: "Yuvarlak" },
  { id: "kare", name: "kare", label: "Kare" },
  { id: "uzun", name: "uzun", label: "Uzun" }
];

const DIFFICULTY_LEVELS = [
  { id: "kolay", name: "Kolay", color: "bg-green-100 text-green-600" },
  { id: "orta", name: "Orta", color: "bg-orange-100 text-orange-600" },
  { id: "zor", name: "Zor", color: "bg-red-100 text-red-600" }
];

export default function HairStylesManagement() {
  const [view, setView] = useState("grid"); // grid, list
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    faceType: "all",
    difficulty: "all"
  });
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStyle, setEditingStyle] = useState(null);

  // Filter hair styles based on current filters
  const filteredStyles = useMemo(() => {
    return MOCK_HAIR_STYLES.filter(style => {
      const matchesSearch = !filters.search || 
        style.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        style.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        style.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesCategory = filters.category === "all" || 
        style.category.toLowerCase() === filters.category.toLowerCase();
      
      const matchesFaceType = filters.faceType === "all" || 
        style.faceTypes.includes(filters.faceType);
      
      const matchesDifficulty = filters.difficulty === "all" || 
        style.difficulty === filters.difficulty;
      
      return matchesSearch && matchesCategory && matchesFaceType && matchesDifficulty;
    });
  }, [filters]);

  const handleAddStyle = (styleData) => {
    console.log("Yeni saç modeli ekleniyor:", styleData);
    setShowAddModal(false);
  };

  const handleEditStyle = (styleData) => {
    console.log("Saç modeli güncelleniyor:", styleData);
    setEditingStyle(null);
  };

  const handleDeleteStyle = (styleId) => {
    console.log("Saç modeli siliniyor:", styleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Saç Modelleri Yönetimi</h1>
                <p className="text-muted-foreground text-sm">
                  {filteredStyles.length} model listeleniyor
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Izgara
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Model
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Model adı, açıklama veya etiket ara..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtreler
              {(filters.category !== "all" || filters.faceType !== "all" || filters.difficulty !== "all") && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-card/60 border border-border/40 rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Yüz Tipi</label>
                  <Select
                    value={filters.faceType}
                    onChange={(e) => setFilters(prev => ({ ...prev, faceType: e.target.value }))}
                  >
                    {FACE_TYPES.map(faceType => (
                      <option key={faceType.id} value={faceType.id}>{faceType.name}</option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Zorluk</label>
                  <Select
                    value={filters.difficulty}
                    onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="all">Tüm Seviyeler</option>
                    {DIFFICULTY_LEVELS.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on view */}
        {view === "grid" ? (
          <StylesGridView 
            styles={filteredStyles}
            onViewDetails={setSelectedStyle}
            onEdit={setEditingStyle}
            onDelete={handleDeleteStyle}
          />
        ) : (
          <StylesListView 
            styles={filteredStyles}
            onViewDetails={setSelectedStyle}
            onEdit={setEditingStyle}
            onDelete={handleDeleteStyle}
          />
        )}
      </div>

      {/* Style Detail Modal */}
      {selectedStyle && (
        <StyleDetailModal
          style={selectedStyle}
          isOpen={!!selectedStyle}
          onClose={() => setSelectedStyle(null)}
        />
      )}

      {/* Add Style Modal */}
      <AddStyleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStyle}
      />

      {/* Edit Style Modal */}
      {editingStyle && (
        <EditStyleModal
          style={editingStyle}
          isOpen={!!editingStyle}
          onClose={() => setEditingStyle(null)}
          onSubmit={handleEditStyle}
        />
      )}
    </div>
  );
}

function StylesGridView({ styles, onViewDetails, onEdit, onDelete }) {
  if (styles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Saç modeli bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla model görebilirsiniz
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {styles.map((style) => (
        <div key={style.id} className="bg-card/60 border border-border/40 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          {/* Image Gallery */}
          <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
            {style.photos.length > 0 ? (
              <img
                src={style.photos[0]}
                alt={style.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            {style.photos.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-sm">
                +{style.photos.length - 1}
              </div>
            )}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-sm">
              <Star className="w-3 h-3 fill-current" />
              {style.popularity}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{style.name}</h3>
              <span className="font-bold text-primary">{style.price}</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {style.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {style.category}
              </span>
              <DifficultyBadge difficulty={style.difficulty} />
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {style.faceTypes.map((faceType, index) => (
                <span key={index} className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded text-xs">
                  {FACE_TYPES.find(ft => ft.name === faceType)?.label || faceType}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{style.duration}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onViewDetails(style)}>
                  <Eye className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onEdit(style)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(style.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StylesListView({ styles, onViewDetails, onEdit, onDelete }) {
  if (styles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Saç modeli bulunamadı
        </h3>
        <p className="text-sm text-muted-foreground">
          Filtreleri değiştirerek daha fazla model görebilirsiniz
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/60 border border-border/40 rounded-2xl backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card/80 border-b border-border/20">
            <tr>
              <th className="text-left p-4 font-semibold">Model</th>
              <th className="text-left p-4 font-semibold">Kategori</th>
              <th className="text-left p-4 font-semibold">Yüz Tipi</th>
              <th className="text-left p-4 font-semibold">Zorluk</th>
              <th className="text-left p-4 font-semibold">Süre</th>
              <th className="text-left p-4 font-semibold">Fiyat</th>
              <th className="text-left p-4 font-semibold">Popülerlik</th>
              <th className="text-right p-4 font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((style, index) => (
              <tr key={style.id} className={`hover:bg-card/40 transition-colors duration-200 ${index !== styles.length - 1 ? 'border-b border-border/10' : ''}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden">
                      {style.photos.length > 0 ? (
                        <img
                          src={style.photos[0]}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{style.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{style.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {style.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {style.faceTypes.slice(0, 2).map((faceType, index) => (
                      <span key={index} className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded text-xs">
                        {FACE_TYPES.find(ft => ft.name === faceType)?.label || faceType}
                      </span>
                    ))}
                    {style.faceTypes.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{style.faceTypes.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <DifficultyBadge difficulty={style.difficulty} />
                </td>
                <td className="p-4">
                  <span className="text-sm">{style.duration}</span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-primary">{style.price}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{style.popularity}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(style)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => onEdit(style)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(style.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const config = DIFFICULTY_LEVELS.find(level => level.id === difficulty);
  if (!config) return null;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.name}
    </span>
  );
}

function StyleDetailModal({ style, isOpen, onClose }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % style.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + style.photos.length) % style.photos.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={style.name} size="large">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Photo Gallery */}
          <div className="space-y-4">
            <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden">
              {style.photos.length > 0 ? (
                <>
                  <img
                    src={style.photos[currentPhotoIndex]}
                    alt={`${style.name} - ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {style.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevPhoto}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-1 rounded-full text-sm">
                        {currentPhotoIndex + 1} / {style.photos.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {style.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {style.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentPhotoIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`${style.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style Information */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Açıklama</h4>
              <p className="text-muted-foreground">{style.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Kategori</label>
                <p className="font-medium">{style.category}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Fiyat</label>
                <p className="font-semibold text-primary text-lg">{style.price}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Süre</label>
                <p className="font-medium">{style.duration}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Zorluk</label>
                <DifficultyBadge difficulty={style.difficulty} />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Uygun Yüz Tipleri</label>
              <div className="flex flex-wrap gap-2">
                {style.faceTypes.map((faceType, index) => (
                  <span key={index} className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {FACE_TYPES.find(ft => ft.name === faceType)?.label || faceType}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Etiketler</label>
              <div className="flex flex-wrap gap-2">
                {style.tags.map((tag, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-current text-yellow-500" />
                <span className="font-semibold">{style.popularity}</span>
                <span className="text-sm text-muted-foreground">/ 5.0</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Oluşturulma: {new Date(style.createdAt).toLocaleDateString('tr-TR')}</p>
              <p>Son güncellenme: {new Date(style.updatedAt).toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function AddStyleModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fade',
    faceTypes: [],
    description: '',
    difficulty: 'kolay',
    duration: '',
    price: '',
    tags: '',
    photos: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const styleData = {
      ...formData,
      id: Date.now(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      popularity: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSubmit(styleData);
    
    // Reset form
    setFormData({
      name: '',
      category: 'Fade',
      faceTypes: [],
      description: '',
      difficulty: 'kolay',
      duration: '',
      price: '',
      tags: '',
      photos: []
    });
  };

  const handleFaceTypeChange = (faceType, checked) => {
    setFormData(prev => ({
      ...prev,
      faceTypes: checked 
        ? [...prev.faceTypes, faceType]
        : prev.faceTypes.filter(ft => ft !== faceType)
    }));
  };

  const handlePhotoAdd = () => {
    // In a real app, this would open a file picker
    const mockPhoto = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, mockPhoto]
    }));
  };

  const handlePhotoRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Saç Modeli Ekle" size="large">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Model Adı *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: Modern Fade"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori *</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Açıklama</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Model hakkında detaylı açıklama..."
              rows={3}
            />
          </div>

          {/* Face Types */}
          <div>
            <label className="block text-sm font-medium mb-2">Uygun Yüz Tipleri *</label>
            <div className="flex flex-wrap gap-3">
              {FACE_TYPES.filter(ft => ft.id !== 'all').map(faceType => (
                <label key={faceType.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.faceTypes.includes(faceType.name)}
                    onChange={(e) => handleFaceTypeChange(faceType.name, e.target.checked)}
                    className="rounded border-border/40"
                  />
                  <span className="text-sm">{faceType.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Zorluk Seviyesi</label>
              <Select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tahmini Süre</label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Örn: 45 dakika"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fiyat</label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Örn: ₺200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Etiketler</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Etiketleri virgülle ayırın (örn: modern, trend, popüler)"
            />
          </div>

          {/* Photo Gallery */}
          <div>
            <label className="block text-sm font-medium mb-2">Fotoğraflar</label>
            <div className="space-y-3">
              <Button type="button" variant="outline" onClick={handlePhotoAdd}>
                <Upload className="w-4 h-4 mr-2" />
                Fotoğraf Ekle
              </Button>
              
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                        <img src={photo} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Model Ekle
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EditStyleModal({ style, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: style?.name || '',
    category: style?.category || 'Fade',
    faceTypes: style?.faceTypes || [],
    description: style?.description || '',
    difficulty: style?.difficulty || 'kolay',
    duration: style?.duration || '',
    price: style?.price || '',
    tags: style?.tags?.join(', ') || '',
    photos: style?.photos || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const styleData = {
      ...style,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSubmit(styleData);
  };

  const handleFaceTypeChange = (faceType, checked) => {
    setFormData(prev => ({
      ...prev,
      faceTypes: checked 
        ? [...prev.faceTypes, faceType]
        : prev.faceTypes.filter(ft => ft !== faceType)
    }));
  };

  const handlePhotoAdd = () => {
    const mockPhoto = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, mockPhoto]
    }));
  };

  const handlePhotoRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  if (!style) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Düzenle: ${style.name}`} size="large">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Model Adı *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: Modern Fade"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori *</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Açıklama</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Model hakkında detaylı açıklama..."
              rows={3}
            />
          </div>

          {/* Face Types */}
          <div>
            <label className="block text-sm font-medium mb-2">Uygun Yüz Tipleri *</label>
            <div className="flex flex-wrap gap-3">
              {FACE_TYPES.filter(ft => ft.id !== 'all').map(faceType => (
                <label key={faceType.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.faceTypes.includes(faceType.name)}
                    onChange={(e) => handleFaceTypeChange(faceType.name, e.target.checked)}
                    className="rounded border-border/40"
                  />
                  <span className="text-sm">{faceType.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Zorluk Seviyesi</label>
              <Select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tahmini Süre</label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Örn: 45 dakika"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fiyat</label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Örn: ₺200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Etiketler</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Etiketleri virgülle ayırın (örn: modern, trend, popüler)"
            />
          </div>

          {/* Photo Gallery */}
          <div>
            <label className="block text-sm font-medium mb-2">Fotoğraflar</label>
            <div className="space-y-3">
              <Button type="button" variant="outline" onClick={handlePhotoAdd}>
                <Upload className="w-4 h-4 mr-2" />
                Fotoğraf Ekle
              </Button>
              
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                        <img src={photo} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border/20">
          <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Güncelle
          </Button>
        </div>
      </form>
    </Modal>
  );
}