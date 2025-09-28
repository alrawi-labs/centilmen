import { Outlet, useLocation } from "react-router-dom"; // useLocation'ı buraya ekliyoruz
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FloatingAppointmentButton } from "@/components/FloatingAppointmentButton";
import { useNavigate } from "react-router-dom";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // location nesnesini alıyoruz

  const hiddenPaths = ["/randevu", "/dogrulama", "/login"]; 

  const isHiddenPath = hiddenPaths.includes(location.pathname);
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1">
        <Outlet />
        {!isHiddenPath && (
          <>
            <FloatingAppointmentButton onClick={() => navigate("/randevu")} />
            <FloatingWhatsAppButton />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}