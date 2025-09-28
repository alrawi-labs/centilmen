import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Floating appointment button component
export function FloatingAppointmentButton({
  onClick,
  text = "Randevu Al",
  className = "",
  variant = "primary", // primary, secondary, success
}: {
  onClick?: () => void;
  text?: string;
  className?: string;
  variant?: "primary" | "secondary" | "success";
}) {
  const [animationPhase, setAnimationPhase] = useState("hidden"); // hidden, circle, bounce1, bounce2, bounce3, expanding, visible
  const navigate = useNavigate();

  // Eğer onClick prop'u dışarıdan verilmezse, varsayılan yönlendirme işlemini yap
  const handleClick = onClick ? onClick : () => navigate("/randevu");

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 100;
      
      if (shouldShow && animationPhase === "hidden") {
        // Animasyon sekansını başlat
        setAnimationPhase("circle");
        
        // 600ms daire halinde bekle
        setTimeout(() => setAnimationPhase("bounce1"), 600);
        
        // 750ms sonra ikinci zıplama (hızlı)
        setTimeout(() => setAnimationPhase("bounce2"), 750);
        
        // 900ms sonra üçüncü zıplama (hızlı)
        setTimeout(() => setAnimationPhase("bounce3"), 900);
        
        // 1050ms sonra daire tekrar normal pozisyona
        setTimeout(() => setAnimationPhase("circle"), 1050);
        
        // 1300ms sonra genişleme
        setTimeout(() => setAnimationPhase("expanding"), 1300);
        
        // 1700ms sonra içeriği göster
        setTimeout(() => setAnimationPhase("visible"), 1700);
        
      } else if (!shouldShow && animationPhase !== "hidden") {
        // Gizlenme animasyonu - ters sırayla
        setAnimationPhase("expanding"); // önce içerik gizlen
        
        setTimeout(() => setAnimationPhase("circle"), 200); // sonra daire ol
        
        setTimeout(() => {
          setAnimationPhase("hidden");
        }, 500); // son olarak tamamen gizlen
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationPhase]);

  const baseClasses =
    "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-150 ease-in-out";
    
  const variantClasses = {
    primary:
      "bg-[#9c6f4f85] backdrop-blur-md border border-white/20 hover:bg-white/15 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-500/10 backdrop-blur-md border border-gray-500/20 hover:bg-gray-500/15 text-gray-800 shadow-lg hover:shadow-xl",
    success:
      "bg-green-500/10 backdrop-blur-md border border-green-500/20 hover:bg-green-500/15 text-green-700 shadow-lg hover:shadow-xl",
  };

  // Animasyon fazlarına göre stiller
  const getAnimationStyles = () => {
    const baseTransform = "translateX(-50%)";
    
    switch (animationPhase) {
      case "hidden":
        return {
          transform: `${baseTransform} translateY(20px) scale(0)`,
          opacity: 0,
          width: "0px",
          height: "0px",
          padding: "0px",
          minWidth: "0px",
        };
      case "circle":
        return {
          transform: `${baseTransform} translateY(0px) scale(1)`,
          opacity: 1,
          width: "52px",
          height: "52px",
          padding: "0px",
          borderRadius: "50%",
          minWidth: "52px",
        };
      case "bounce1":
        return {
          transform: `${baseTransform} translateY(-15px) scale(1.1)`,
          opacity: 1,
          width: "52px",
          height: "52px",
          padding: "0px",
          borderRadius: "50%",
          minWidth: "52px",
        };
      case "bounce2":
        return {
          transform: `${baseTransform} translateY(-12px) scale(1.08)`,
          opacity: 1,
          width: "52px",
          height: "52px",
          padding: "0px",
          borderRadius: "50%",
          minWidth: "52px",
        };
      case "bounce3":
        return {
          transform: `${baseTransform} translateY(-8px) scale(1.05)`,
          opacity: 1,
          width: "52px",
          height: "52px",
          padding: "0px",
          borderRadius: "50%",
          minWidth: "52px",
        };
      case "expanding":
        return {
          transform: `${baseTransform} translateY(0px) scale(1.05)`,
          opacity: 1,
          width: "180px",
          height: "52px",
          padding: "12px 5px 12px 20px",
          borderRadius: "50px",
          minWidth: "180px",
        };
      case "visible":
        return {
          transform: `${baseTransform} translateY(0px) scale(1)`,
          opacity: 1,
          width: "180px",
          height: "52px",
          padding: "12px 5px 12px 20px",
          borderRadius: "50px",
          minWidth: "180px",
        };
      default:
        return {};
    }
  };

  // İçerik görünürlüğü
  const contentOpacity = animationPhase === "visible" ? 1 : 0;
  const arrowOpacity = ["circle", "bounce1", "bounce2", "bounce3", "expanding", "visible"].includes(animationPhase) ? 1 : 0;

  if (animationPhase === "hidden") return null;

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        ...getAnimationStyles(),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: animationPhase === "visible" ? "8px" : "0px",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        transitionProperty: "all",
        transitionDuration: "150ms",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      {/* Text content */}
      <span 
        className="hidden sm:inline transition-opacity duration-400"
        style={{ 
          opacity: contentOpacity,
          transitionDelay: animationPhase === "visible" ? "200ms" : "0ms"
        }}
      >
        {text}
      </span>
      <span 
        className="sm:hidden transition-opacity duration-400"
        style={{ 
          opacity: contentOpacity,
          transitionDelay: animationPhase === "visible" ? "200ms" : "0ms"
        }}
      >
        Randevu
      </span>
      
      {/* Arrow icon */}
      <div
        className="bg-primary backdrop-blur-sm rounded-full transition-all duration-150 border border-white/20"
        style={{
          width: ["circle", "bounce1", "bounce2", "bounce3"].includes(animationPhase) ? "45px" : "40px",
          height: ["circle", "bounce1", "bounce2", "bounce3"].includes(animationPhase) ? "45px" : "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: arrowOpacity,
          marginLeft: animationPhase === "visible" ? "4px" : "0px",
          transitionDelay: ["circle", "bounce1", "bounce2", "bounce3"].includes(animationPhase) ? "50ms" : "0ms",
          transform: ["bounce1", "bounce2", "bounce3"].includes(animationPhase) ? "rotate(15deg)" : "rotate(0deg)",
        }}
      >
        <ArrowRight 
          className={["circle", "bounce1", "bounce2", "bounce3"].includes(animationPhase) ? "w-7 h-7" : "w-6 h-6"}
          style={{
            transition: "all 150ms ease-in-out",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        />
      </div>
    </button>
  );
}