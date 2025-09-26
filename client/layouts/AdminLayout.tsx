import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import FooterAdmin from "@/components/admin/FooterAdmin";
import SidebarAdmin from "@/components/admin/SidebarAdmin";

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin title="Admin Panel" subtitle="Hoşgeldiniz!" />
      <main className="flex-1">
      {/* <SidebarAdmin /> */}
        <Outlet /> {/* Burada admin route’larının içeriği render edilecek */}
      </main>
      <FooterAdmin />
    </div>
  );
};

export default AdminLayout;
