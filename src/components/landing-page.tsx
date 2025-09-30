import React from "react";
import { useLanguage } from "./language-context";
import { LanguageToggle } from "./language-toggle";
import { Button } from "./ui/button";
import { Sprout } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t, language } = useLanguage();

  const handleLoginClick = () => {
    onGetStarted(); // This will trigger the login page
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}      
      <nav className="flex justify-between items-center px-6 py-3 border rounded-lg mb-4 border-green-400">
        {/* Logo */}
        <h1 className="text-2xl font-semibold">{t("appTitle")}</h1>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button
            variant="outline"
            className="rounded-lg bg-green-500 text-black border-solid "
            onClick={() => alert("Sign up functionality coming soon!")}
          >
            {t("signUp")}
          </Button>
          <Button
            variant="outline"
            className="rounded-lg bg-green-500 text-black border-solid "
            onClick={handleLoginClick}
          >
            {t("login")}
          </Button>
        </div>
      </nav>
      

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-100 p-8 rounded-lg border border-green-400">
          {/* Hero Title */}
          <h1 className="text-2xl font-bold text-center mb-6">
            {t("landingHello")} <em>{t("appTitle")}</em> {t("personalFarmingCompanion")}
          </h1>

          {/* Content */}
          <div className="max-w-3xl mx-auto text-left">
            <p className="text-gray-800 mb-6">{t("landingDescription")}</p>

            <h2 className="font-bold mb-2">{t("whyKrishiSakhi")}</h2>
            <p className="mb-4">{t("whyKrishiSakhiDesc")}</p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span>1)</span>
                <p>{t("rightAdvice")}</p>
              </div>
              <div className="flex items-start gap-2">
                <span>2)</span>
                <p>{t("weatherBeforeSurprise")}</p>
              </div>
              <div className="flex items-start gap-2">
                <span>3)</span>
                <p>{t("saveMoney")}</p>
              </div>
              <div className="flex items-start gap-2">
                <span>4)</span>
                <p>{t("learnSimpleTips")}</p>
              </div>
              <div className="flex items-start gap-2">
                <span>5)</span>
                <p>{t("increaseIncome")}</p>
              </div>
            </div>

            {/* Footer Line */}
            <p className="text-center text-xl font-semibold mt-8">
              {t("letsGrowTogether")} 🌾
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
       
        <footer className="border-t bg-card mt-8">
          <div className="container mx-auto px-4 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t('aiPoweredAssistant')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('availableInBothLanguages')}
            </p>
          </div>
        </footer>
      
    </div>
  );
}
