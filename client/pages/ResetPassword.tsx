import { useState, useEffect } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Check,
  AlertCircle,
  ArrowLeft
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

export default function PasswordResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for reset link validity
  const [isSuccess, setIsSuccess] = useState(false);

  // Timer for reset link expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Validate password
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    setErrors({});
    // Remove error styling from Input components by not passing error-based className
    // Validation
    const newErrors: {
      password?: string;
      confirmPassword?: string;
      general?: string;
    } = {};
    
    if (!password) {
      newErrors.password = "Yeni şifre gereklidir";
    } else if (!validatePassword(password)) {
      newErrors.password = "Şifre en az 8 karakter olmalıdır";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (timeLeft <= 0) {
      setErrors({ general: "Reset linki süresi doldu. Lütfen yeni bir reset linki isteyin." });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: "Şifre sıfırlanamadı. Lütfen tekrar deneyin." });
    } finally {
      setIsLoading(false);
    }
  };

  // Success page
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20 flex items-center justify-center">
        <div className="container mx-auto max-w-lg px-4 py-8 text-center">
          <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-12 backdrop-blur-sm shadow-2xl shadow-primary/10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce">
              <Check className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Şifren Başarıyla Sıfırlandı!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
              Yeni şifreniz ayarlandı. Artık hesabınıza giriş yapabilirsiniz.
            </p>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => console.log('Navigate to login')}
              >
                Giriş Yap
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Navigate to home')}
                className="w-full"
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main password reset form
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-lg px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Lock className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Yeni Şifre Belirle</h1>
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Hesabınız için yeni bir şifre oluşturun
          </p>
          
          {/* Timer Display */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            timeLeft <= 120 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : timeLeft <= 300 
              ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
              : 'bg-card/60 border border-border/40 backdrop-blur-sm'
          }`}>
            <Shield className="w-4 h-4" />
            <span>Link geçerlilik süresi: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Password Reset Form */}
        <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-lg mb-6">
          {errors.general && (
            <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.general}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="En az 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  className={errors.password ? "border-red-400 " : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Şifre Tekrarı
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Şifrenizi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={Lock}
                  className={errors.confirmPassword ? "border-red-400 " : ""}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordReset();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Password Strength Indicator */}
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-sm font-medium mb-2">Şifre Gereksinimleri:</p>
              <div className="text-xs space-y-1">
                <div className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                  En az 8 karakter
                </div>
                <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                  Büyük harf (önerilen)
                </div>
                <div className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                  Rakam (önerilen)
                </div>
                <div className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <div className={`w-2 h-2 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                  Özel karakter (önerilen)
                </div>
              </div>
            </div>

            <Button
              onClick={handlePasswordReset}
              disabled={isLoading || timeLeft <= 0}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Şifre Sıfırlanıyor...
                </>
              ) : (
                <>
                  <Shield className="mr-2 w-5 h-5" />
                  Şifremi Sıfırla
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
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm">
              <h3 className="font-medium mb-1">Güvenlik İpuçları</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Güçlü bir şifre seçin (büyük/küçük harf, rakam, özel karakter)</li>
                <li>• Başka hesaplarda kullandığınız şifreyi kullanmayın</li>
                <li>• Şifrenizi kimseyle paylaşmayın</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}