import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Check,
  ArrowLeft,
  RefreshCw,
  Clock,
  Shield,
  X,
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
        : variant === "secondary"
        ? "bg-card/60 text-foreground hover:bg-card/80"
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

const Input = ({ type = "text", className = "", inputRef, ...props }) => (
  <input
    ref={inputRef}
    type={type}
    className={`w-full px-4 py-3 rounded-xl border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 text-center text-2xl font-mono tracking-widest ${className}`}
    {...props}
  />
);

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email] = useState("kullanici@example.com"); // Mock email
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(6).fill(null).map((_, i) => inputRefs.current[i] || null);
  }, []);

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setShowError(false);

    // Auto move to next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Auto verify when all fields are filled
    if (newCode.every(digit => digit) && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  // Handle key down for navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setVerificationCode(newCode);
      setShowError(false);
      
      // Focus on the next empty field or last field
      const nextEmptyIndex = newCode.findIndex(digit => !digit);
      const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }

      // Auto verify if complete
      if (pastedData.length === 6) {
        handleVerify(pastedData);
      }
    }
  };

  // Handle verification
  const handleVerify = async (code) => {
    if (timeLeft <= 0) {
      setShowError(true);
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification logic
      if (code === "123456") {
        setShowSuccess(true);
        setTimeout(() => {
          // Redirect to dashboard or next step
          console.log("Verification successful - redirect to dashboard");
        }, 2000);
      } else {
        setShowError(true);
        // Clear the code
        setVerificationCode(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      setShowError(true);
      setVerificationCode(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    setShowError(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset timer and cooldown
      setTimeLeft(300);
      setResendCooldown(300); // 5 minute cooldown
      setVerificationCode(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  // Manual verify button click
  const handleVerifyClick = () => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20 flex items-center justify-center">
        <div className="container mx-auto max-w-lg px-4 py-8 text-center">
          <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-12 backdrop-blur-sm shadow-2xl shadow-primary/10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce">
              <Check className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Email Doğrulandı!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
              Email adresiniz başarıyla doğrulandı. Hesabınıza yönlendiriliyorsunuz...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card/20">
      <div className="container mx-auto max-w-lg px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Email Doğrulama</h1>
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">{email}</span> adresine gönderilen 6 haneli kodu giriniz
          </p>
          
        </div>

        {/* Verification Code Input */}
        <div className="bg-card/60 border border-border/40 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-lg mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-center">
              Doğrulama Kodu
            </label>
            <div className="flex gap-2 md:gap-3 justify-center">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  inputRef={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl ${
                    showError 
                      ? 'border-red-400 bg-red-50' 
                      : digit 
                      ? 'border-primary bg-primary/5' 
                      : ''
                  }`}
                  disabled={isVerifying || timeLeft <= 0}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {showError && (
            <div className="flex items-center gap-2 text-red-600 text-sm mb-4 justify-center">
              <X className="w-4 h-4" />
              <span>
                {timeLeft <= 0 
                  ? 'Kod süresi doldu. Lütfen yeni kod talep edin.' 
                  : 'Geçersiz kod. Lütfen tekrar deneyin.'}
              </span>
            </div>
          )}

          {/* Verify Button */}
          <Button
            onClick={handleVerifyClick}
            disabled={verificationCode.some(digit => !digit) || isVerifying || timeLeft <= 0}
            className="w-full mb-4"
            size="lg"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Doğrulanıyor...
              </>
            ) : (
              <>
                <Shield className="mr-2 w-5 h-5" />
                Kodu Doğrula
              </>
            )}
          </Button>

          {/* Resend Section */}
          <div className="text-center border-t border-border/40 pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Kod gelmedi mi?
            </p>
            <Button
              variant="outline"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Gönderiliyor...
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Yeniden Gönder ({formatTime(resendCooldown)})
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Yeniden Gönder
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => console.log('Navigate back to register')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Geri Dön
          </Button>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-card/40 border border-border/30 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <h3 className="font-medium mb-1">Email Doğrulama Hakkında</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Kod 5 dakika süreyle geçerlidir</li>
                <li>• Yeni kod talep etmek için 5 dakika beklemeniz gerekir</li>
                <li>• Spam klasörünüzü kontrol etmeyi unutmayın</li>
                <li>• Test için kod: <span className="font-mono font-semibold">123456</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}