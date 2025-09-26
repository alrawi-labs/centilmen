import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Giriş yapılıyor:", {
      email: formData.email,
      password: formData.password,
    });
    alert("Giriş yapılıyor...");
  };

  return (
    <section className="container mx-auto max-w-3xl px-4 py-14 mt-[10%]">
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card/40  shadow-2xl hover:shadow-3xl transition-shadow duration-500">

        {/* Sağ taraf - Form */}
        <div className="p-8 relative overflow-hidden">
          {/* Arka plan efektleri */}
          <div
            className={`absolute inset-0 transition-all duration-1000 "opacity-0"`}
          >
            <div
              className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-1/3 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/30 to-transparent rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-tr from-pink-400/30 to-transparent rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          {/* Form içeriği */}
          <div className="relative z-10">
            {/* Başlık bölümü */}
            <div
              className={`transition-all duration-500 ease-out 
             'opacity-100 transform translate-x-0 scale-100'
            }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h1 className="text-2xl font-semibold text-primary">
                Kuaför Giriş Sayfası
              </h1>
            </div>

            {/* Form alanları */}
            <div
              className={`mt-6 transition-all duration-500 ease-out
             'opacity-100 transform translate-x-0 scale-100'
            }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="space-y-3">
                {/* Ortak alanlar */}
                <div className="space-y-3">
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                      placeholder="E-posta"
                    />
                  </div>

                  <div className="group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2.5 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-background group-hover:border-blue-400/50 focus:scale-[1.02] focus:shadow-lg"
                      placeholder="Şifre"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full mt-4 relative overflow-hidden bg-primary hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group"
                >
                  <span className="relative z-10 font-medium">Giriş Yap</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
