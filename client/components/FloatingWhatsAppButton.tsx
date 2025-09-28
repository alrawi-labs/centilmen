import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

// Floating WhatsApp button component
export function FloatingWhatsAppButton({ 
  phoneNumber = "905XXXXXXXXX",
  message = "Merhaba, randevu almak istiyorum.",
  position = "right", // left, right
  className = ""
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const positionClasses = {
    left: "left-6",
    right: "right-6"
  };

  return (
    <div className={`fixed bottom-6 ${positionClasses[position]} z-40 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } ${className}`}>
      
      {/* Tooltip */}
      {isHovered && (
        <div className={`absolute bottom-16 ${position === 'left' ? 'left-0' : 'right-0'} mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}>
          WhatsApp ile İletişim
          <div className={`absolute top-full ${position === 'left' ? 'left-4' : 'right-4'} w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80`}></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
}