import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FloatingAppointmentButton } from "@/components/FloatingAppointmentButton";
import { useNavigate } from "react-router-dom";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1">
        <Outlet />
        <FloatingAppointmentButton onClick={() => navigate("/randevu")} />
        <FloatingWhatsAppButton />
      </main>
      <Footer />
    </div>
  );
}
