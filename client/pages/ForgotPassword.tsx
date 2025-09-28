import { useState } from "react";
import {
  Mail,
  ArrowLeft,
  Send,
  AlertCircle,
  KeyRound
} from "lucide-react";

// Mock components
const Button = ({
  size = "default",
  variant = "default",
  children,
  className = "",
  disabled = false,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
      disabled
        ? "bg-muted/20 text-muted-foreground cursor-not-allowed"
        : variant === "outline"
        ? "border border-border/40 bg-transparent hover:bg-card/80 hover:border-primary/30"
        : variant === "ghost"
        ? "bg-transparent hover:bg-card/60"
        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
    } ${
      size === "lg"
        ? "px-8 py-4 text-lg"
        : size === "sm"
        ? "px-4 py-2 text-sm"
        : "px-6 py-3 text-base"
    } ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ type = "text", className = "", icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
    )}
    <input
      type={type}
      className={`w-full px-4 py-3 ${Icon ? 'pl-12' : ''} rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 ${className}`}
      {...props}
    />
  </div>
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email submit
  const handleEmailSubmit = async () => {
    setErrors({});
    
    if (!email) {
      setErrors({ email: "Email adresi gereklidir" });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: "Geçerli bir email adresi giriniz" });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success - show success message
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ email: "Email gönderilemedi. Lütfen tekrar deneyin." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend email
  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setErrors({});
    } catch (error) {
      setErrors({ general: "Email tekrar gönderilemedi." });
    } finally {
      setIsLoading(false);
    }
  };

  // If email is submitted successfully, show success message
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
        <div className="container mx-auto max-w-lg px-4 py-8 md:py-16">
          <div className="text-center">
            <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-lg">
              {/* Success Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                <Send className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Email Gönderildi!
              </h1>
              
              <p className="text-muted-foreground text-sm md:text-base mb-6">
                <span className="font-medium text-foreground">{email}</span> adresine şifre sıfırlama linki gönderildi.
              </p>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium text-blue-900 mb-2">Sonraki Adımlar:</h3>
                    <div className="text-blue-700 space-y-1">
                      <div>1. Email kutunuzu kontrol edin</div>
                      <div>2. Şifre sıfırlama linkine tıklayın</div>
                      <div>3. Yeni şifrenizi belirleyin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resend Section */}
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Email gelmedi mi?
                </p>
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full mb-4"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Tekrar Gönder
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => setIsSubmitted(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Geri Dön
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main forgot password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-lg px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <KeyRound className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Şifremi Unuttum</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Email adresinizi girin, şifre sıfırlama linki gönderelim
          </p>
        </div>

        {/* Email Form */}
        <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-lg mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Adresiniz
              </label>
              <Input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                className={errors.email ? "border-red-400" : ""}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailSubmit();
                  }
                }}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <Button
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" />
                  Reset Linki Gönder
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => console.log('Navigate back to login')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Giriş Sayfasına Dön
          </Button>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-card/40 border border-border/30 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <h3 className="font-medium mb-1">Şifre Sıfırlama Hakkında</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Reset linki 10 dakika süreyle geçerlidir</li>
                <li>• Spam klasörünüzü kontrol etmeyi unutmayın</li>
                <li>• Güvenliğiniz için link tek kullanımlıktır</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}