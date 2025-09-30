import React, { useState, useEffect } from 'react';
import { useLanguage } from './language-context';
import { LanguageToggle } from './language-toggle';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
  onBack?: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = () => {
    if (username.trim()) {
      setOtpSent(true);
      setCountdown(30); // 30 seconds countdown
      setError('');
      // Demo: Simulate OTP sending
      console.log(`OTP sent to ${username}`);
    } else {
      setError('Please enter username first');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && otp.trim()) {
      // For demo purposes, just use username as name
      onLogin(username);
    } else {
      setError('Please enter both username and OTP');
    }
  };

  const handleGoogleLogin = () => {
    // For demo purposes, simulate Google login
    onLogin('Demo User');
  };

  const handleBackToLanding = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      handleSendOtp();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={handleBackToLanding}
          className="text-green-700 hover:bg-green-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>
        <LanguageToggle />
      </div>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('loginTitle')}</h1>
            <p className="text-gray-600">{t('loginWelcome')} 👋</p>
          </div>

          {/* Login Card */}
          <Card className="border-green-200 shadow-lg">
            <CardContent className="p-6">
              {/* Google Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-6 border-gray-200 hover:bg-gray-50"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('loginWithGoogle')}
              </Button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('orLoginWithUsername')}</span>
                </div>
              </div>

              {/* Username/OTP Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    {t("username")}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={t("usernamePlaceholder")}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError('');
                    }}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    disabled={otpSent}
                  />
                </div>

                {/* OTP Field */}
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-gray-700 font-medium">
                    {t("otp")}
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder={t("otpPlaceholder")}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (error) setError('');
                    }}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    maxLength={6}
                  />
                </div>

                {/* OTP Status and Resend */}
                {otpSent && (
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600 text-sm">
                      <Smartphone className="h-4 w-4 mr-2" />
                      {t('otpSent')}
                    </div>

                    {countdown > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        {t('resendOtpIn')} {countdown}s
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleResendOtp}
                      >
                        {t('resendOtp')}
                      </Button>
                    )}
                  </div>
                )}

                {/* Send OTP Button */}
                {!otpSent && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSendOtp}
                  >
                    {t('sendOtp')}
                  </Button>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!otpSent}
                >
                  {t("loginButton")}
                </Button>
              </form>

              {/* Create Account Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t("notRegistered")} {' '}
                  <Button
                    type="button"
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0 font-medium"
                    onClick={() => alert('Sign up functionality coming soon!')}
                  >
                    {t("createAccount")} ↗
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
