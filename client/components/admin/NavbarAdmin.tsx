import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Bell, Menu, Scissors, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarAdminProps {
  title?: string;
  subtitle?: string;
}


export default function NavbarAdmin({ title = "", subtitle = "" }: NavbarAdminProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="border-b border-border/20 bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/20 rounded flex items-center justify-center">
              <img
                src="../CentilmenLogo.png"
                alt="Berber salonunda saç kesimi"
                className="h-full w-full object-cover transition-transform duration-700 "
              />{" "}
            </div>
            <div>
              <h1 className="text-2xl font-bold">CENTİLMEN</h1>
              <p className="text-muted-foreground text-sm">
                Kuaför Yönetim Paneli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Bildirimler
              <span className="ml-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
