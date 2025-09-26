import "./global.css";
import "./i18n";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import ModelsIndex from "./pages/Models/Index";
import ModelDetail from "./pages/ModelDetail";
import Appointment from "./pages/Appointment";
import Placeholder from "./pages/Placeholder";
import About from "./pages/About";
import Login from "./pages/Login";
import TeamPage from "./pages/OurTeam";
import TeamDetail from "./pages/TeamDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Comfort from "./pages/Comfort";
import ContactTemp from "./pages/ContactTemp";

import AdminLayout from "./layouts/AdminLayout";
import LoginAdmin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AppointmentAdmin from "./pages/admin/AppointmentManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import WorkerManagement from "./pages/admin/WorkerManagement";
import HairModelsManagement from "./pages/admin/HairModelsManagement";
import HourManagement from "./pages/admin/HourManagement";
import ProfileManagement from "./pages/admin/ProfileManagement";
import TeamDetailTemp from "./pages/TeamDetailTemp";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Normal Kullanıcı Sayfaları */}
          <Route element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="/sac-modelleri" element={<ModelsIndex />} />
            <Route path="/sac-modelleri/:slug" element={<ModelDetail />} />
            <Route path="/randevu" element={<Appointment />} />
            <Route path="/dogrulama" element={<Login />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/ekip" element={<TeamPage />} />
            <Route path="/ekip-detay" element={<TeamDetail />} />
            <Route path="/ekip-detay2" element={<TeamDetailTemp />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/iletisim2" element={<ContactTemp />} />
            <Route path="/sss" element={<FAQ />} />
            <Route path="/kaynaklar" element={<Comfort />} />
            <Route path="/kaynaklar/:slug" element={<Comfort />} />
            <Route path="/profil" element={<Profile />} />
            <Route
              path="/gizlilik"
              element={<Placeholder title="Gizlilik" />}
            />
            <Route
              path="/kosullar"
              element={<Placeholder title="Koşullar" />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Sayfaları */}
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/musteriler"
              element={<CustomerManagement />}
            />
            <Route
              path="/admin/randevular"
              element={<AppointmentAdmin />}
            />
            <Route
              path="/admin/calisanlar"
              element={<WorkerManagement />}
            />
            <Route
              path="/admin/sac-modelleri"
              element={<HairModelsManagement />}
            />
            <Route
              path="/admin/calisma-saatleri"
              element={<HourManagement />}
            />
            <Route
              path="/admin/profil"
              element={<ProfileManagement />}
            />
          </Route>
          <Route path="/admin/giris" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

export default App; // ✅ Bunu ekle
