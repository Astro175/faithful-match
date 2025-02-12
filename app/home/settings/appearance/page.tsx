"use client";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

const languages = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function WebAppearance() {
  const { theme, setTheme } = useTheme();
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en-US");

  const getThemeLabel = (theme: string | undefined) => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System Default";
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageDialog(false);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-[700px] mx-auto p-6">
        <h1 className="text-2xl font-outfit font-bold text-foreground text-center mb-8 transition-colors duration-300">
          Web Appearance
        </h1>

        <div className="max-w-[380px] mx-auto space-y-6 bg-card rounded-lg p-6 shadow-lg transition-all duration-300">
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors duration-200"
            onClick={() => setShowThemeDialog(true)}
          >
            <span className="font-outfit font-semibold text-lg text-foreground transition-colors duration-300">
              Theme
            </span>
            <div className="flex items-center text-muted-foreground">
              <span className="font-outfit mr-2 transition-colors duration-300">
                {getThemeLabel(theme)}
              </span>
              <FiChevronRight size={20} />
            </div>
          </div>

          <div
            className="flex justify-between items-center cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors duration-200"
            onClick={() => setShowLanguageDialog(true)}
          >
            <span className="font-outfit font-semibold text-lg text-foreground transition-colors duration-300">
              App Language
            </span>
            <div className="flex items-center text-muted-foreground">
              <span className="font-outfit mr-2 transition-colors duration-300">
                {languages.find((lang) => lang.code === currentLanguage)?.label}
              </span>
              <FiChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
        <DialogContent className="sm:max-w-[400px] bg-card text-card-foreground transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="font-outfit text-center text-foreground transition-colors duration-300">
              Choose Theme
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="flex justify-between items-center px-4 py-6 font-outfit transition-all duration-200 hover:bg-accent/50"
              onClick={() => {
                setTheme("light");
                setShowThemeDialog(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                <span>Light</span>
              </div>
              {theme === "light" && <FiChevronRight size={20} />}
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="flex justify-between items-center px-4 py-6 font-outfit transition-all duration-200 hover:bg-accent/50"
              onClick={() => {
                setTheme("dark");
                setShowThemeDialog(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                <span>Dark</span>
              </div>
              {theme === "dark" && <FiChevronRight size={20} />}
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="flex justify-between items-center px-4 py-6 font-outfit transition-all duration-200 hover:bg-accent/50"
              onClick={() => {
                setTheme("system");
                setShowThemeDialog(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span>System Default</span>
              </div>
              {theme === "system" && <FiChevronRight size={20} />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="sm:max-w-[400px] bg-card text-card-foreground transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="font-outfit text-center text-foreground transition-colors duration-300">
              Choose Language
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={
                  currentLanguage === language.code ? "default" : "outline"
                }
                className="flex justify-between items-center px-4 py-6 font-outfit transition-all duration-200 hover:bg-accent/50"
                onClick={() => handleLanguageChange(language.code)}
              >
                <span>{language.label}</span>
                {currentLanguage === language.code && (
                  <FiChevronRight size={20} />
                )}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
