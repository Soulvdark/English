import React, { useState, useEffect, useCallback } from "react";
import {
  Send,
  Copy,
  Check,
  Camera,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES (TypeScript)
// ==========================================

export type TabId = "english" | "editing";

export interface PriceInfo {
  label: string;
  amount: string;
  unit: string;
  subtext: string;
  footnote?: string;
}

export interface ServiceTabContent {
  id: TabId;
  tabLabel: string;
  badges: string[];
  title: string;
  sectionHeading: string;
  directions: string[];
  price: PriceInfo;
}

export interface ProfileData {
  name: string;
  roles: [string, string];
  aboutSummary: string;
  telegramHandle: string;
  telegramUrl: string;
  tabs: Record<TabId, ServiceTabContent>;
}

// ==========================================
// STATIC DATA (Strictly per Tatiana's TZ)
// ==========================================

const PROFILE_DATA: ProfileData = {
  name: "Татьяна Лепихина",
  roles: ["Учитель английского языка", "Литературный редактор"],
  aboutSummary:
    "Практикующий учитель (2–10 классы), веду индивидуальные занятия по собственным интерактивным материалам. Автор художественной прозы и литературный редактор.",
  telegramHandle: "@TanXian",
  telegramUrl: "https://t.me/TanXian",
  tabs: {
    english: {
      id: "english",
      tabLabel: "Английский",
      badges: [
        "Начальная и средняя школа · 2–10 класс",
        "Онлайн · Индивидуально",
      ],
      title: "Индивидуальные занятия для школьников",
      sectionHeading: "Основные направления работы:",
      directions: [
        "Устранение пробелов в знаниях и повышение успеваемости",
        "Грамматика, чтение, аудирование и разговорная практика",
        "Помощь со школьной программой и подготовка к контрольным",
        "Обучение по собственным интерактивным учебным материалам",
      ],
      price: {
        label: "Стоимость занятия",
        amount: "1 000 ₽",
        unit: "за 60 минут",
        subtext: "Формат: онлайн, индивидуально",
      },
    },
    editing: {
      id: "editing",
      tabLabel: "Редактура",
      badges: ["Романы", "Рассказы", "Фанфикшен"],
      title: "Литературная редактура художественных текстов",
      sectionHeading: "Что входит в работу с текстом:",
      directions: [
        "Стилистика, выразительность и чистота языка",
        "Естественность диалогов и убедительность персонажей",
        "Логика повествования и темп сцен",
        "Устранение повторов, лишних конструкций и смысловых провисаний",
        "Бережное сохранение индивидуального авторского голоса",
      ],
      price: {
        label: "Стоимость редактуры",
        amount: "3 500 ₽",
        unit: "за авторский лист",
        subtext: "1 авт. лист = 40 000 знаков с пробелами",
        footnote:
          "* Глубокая переработка сюжета и переписывание сцен в стандартную стоимость не входят.",
      },
    },
  },
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

interface DiamondBulletProps {
  className?: string;
}

const DiamondBullet: React.FC<DiamondBulletProps> = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-block w-[5.5px] h-[5.5px] bg-[#7C2832] rotate-45 shrink-0 mt-[7px] ${className}`}
  />
);

interface TabSwitcherProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: { id: TabId; label: string }[] = [
    { id: "english", label: PROFILE_DATA.tabs.english.tabLabel },
    { id: "editing", label: PROFILE_DATA.tabs.editing.tabLabel },
  ];

  return (
    <nav
      aria-label="Переключатель направлений"
      className="my-2 sm:my-3 bg-[#EFEAE2] p-1 rounded-xl border border-[#E6E0D6] grid grid-cols-2 gap-1 shrink-0"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectTab(tab.id)}
            className={`py-2 px-3 rounded-lg text-[13px] sm:text-[14px] font-bold tracking-wide transition-all duration-200 flex items-center justify-center select-none ${
              isActive
                ? "bg-[#7C2832] text-[#FAF8F5] shadow-[0_2px_10px_rgba(124,40,50,0.22)]"
                : "text-[#5C5854] hover:text-[#1F1E1D] hover:bg-[#FAF8F5]/50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("english");
  const [copied, setCopied] = useState<boolean>(false);
  const [screenshotMode, setScreenshotMode] = useState<boolean>(false);

  // Sync URL hash if someone opens #editing directly
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "editing" || hash === "english") {
      setActiveTab(hash as TabId);
    }
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    try {
      window.history.replaceState(null, "", `#${tab}`);
    } catch {
      // Ignore history errors in sandboxed iframes
    }
  }, []);

  const handleCopyTelegram = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROFILE_DATA.telegramHandle);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = PROFILE_DATA.telegramHandle;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Не удалось скопировать ник:", error);
    }
  }, []);

  const currentService: ServiceTabContent = PROFILE_DATA.tabs[activeTab];

  return (
    <>
      {/* Load Google Fonts: Cormorant Garamond & Manrope */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        .font-editorial-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-editorial-sans {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div
        className={`font-editorial-sans min-h-[100dvh] w-full flex flex-col items-center justify-center px-2.5 py-2 sm:p-5 transition-colors duration-300 ${
          screenshotMode ? "bg-[#FAF8F5] sm:bg-[#F4F0EA]" : "bg-[#F4F0EA]"
        } text-[#1F1E1D] antialiased selection:bg-[#7C2832] selection:text-white`}
      >
        {/* Unobtrusive Top Utility Bar (Hidden when Screenshot Mode is active) */}
        {!screenshotMode ? (
          <div className="w-full max-w-[460px] flex items-center justify-between mb-1.5 px-1 text-[11px] text-[#5C5854]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-[#7C2832]" />
              <span>Формат 1 экран · Готово к скриншоту</span>
            </span>
            <button
              type="button"
              onClick={() => setScreenshotMode(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EFEAE2] hover:bg-[#E6E0D6] text-[#1F1E1D] font-semibold transition-colors border border-[#E6E0D6]"
              title="Скрыть лишние кнопки для идеального скриншота"
            >
              <Camera className="w-3 h-3 text-[#7C2832]" />
              <span>Режим скриншота</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setScreenshotMode(false)}
            className="fixed top-2 right-2 z-50 opacity-20 hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full bg-[#1F1E1D] text-[#FAF8F5] text-[10px] font-semibold"
          >
            Выйти из режима скриншота
          </button>
        )}

        {/* =======================================================
            MAIN SINGLE-SCREEN EDITORIAL CARD
        ======================================================= */}
        <main
          aria-label="Визитная карточка Татьяны Лепихиной"
          className={`w-full max-w-[460px] bg-[#FAF8F5] rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-200 px-4 py-3.5 sm:px-6 sm:py-5 ${
            screenshotMode
              ? "border border-[#E6E0D6] shadow-none sm:shadow-[0_12px_36px_-12px_rgba(31,30,29,0.07)]"
              : "border border-[#E6E0D6] shadow-[0_14px_40px_-14px_rgba(31,30,29,0.09)]"
          }`}
        >
          {/* 1. HEADER: Name, Specialization & About Me */}
          <header className="border-b border-[#E6E0D6] pb-2.5 sm:pb-3 shrink-0">
            <div className="flex items-baseline justify-between gap-2">
              <h1 className="font-editorial-serif font-bold text-[27px] sm:text-[33px] leading-[1.02] tracking-tight text-[#1F1E1D]">
                {PROFILE_DATA.name}
              </h1>
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#7C2832] shrink-0"
                title="Открыта для новых учеников и текстов"
              />
            </div>

            {/* Roles Subtitle */}
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-[#7C2832] tracking-wider uppercase mt-1">
              {PROFILE_DATA.roles[0]}
              <span className="text-[#C8C0B4] mx-1.5">·</span>
              {PROFILE_DATA.roles[1]}
            </p>

            {/* Concise "Обо мне" block */}
            <div className="mt-2 sm:mt-2.5 bg-[#EFEAE2]/75 rounded-xl px-3 py-2 border border-[#E6E0D6]">
              <p className="text-[11.5px] sm:text-[12.5px] leading-[1.38] text-[#5C5854] font-medium">
                {PROFILE_DATA.aboutSummary}
              </p>
            </div>
          </header>

          {/* 2. INTERACTIVE TAB SWITCHER («Английский» / «Редактура») */}
          <TabSwitcher activeTab={activeTab} onSelectTab={handleTabChange} />

          {/* 3, 4 & 5. ACTIVE TAB CONTENT (Service Description, Directions, Price) */}
          <section
            key={currentService.id}
            aria-live="polite"
            className="flex flex-col justify-between flex-grow space-y-2.5 sm:space-y-3 animate-fadeIn"
          >
            {/* Service Title & Context Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {currentService.badges.map((badge, index) => (
                  <span
                    key={badge}
                    className={`px-2 py-0.5 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider rounded-md border ${
                      index === 0 || activeTab === "editing"
                        ? "bg-[#7C2832]/10 text-[#7C2832] border-[#7C2832]/20"
                        : "bg-[#EFEAE2] text-[#5C5854] border-[#E6E0D6]"
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h2 className="text-[16.5px] sm:text-[18.5px] font-extrabold text-[#1F1E1D] leading-snug tracking-tight">
                {currentService.title}
              </h2>
            </div>

            {/* Key Directions / What's Included List */}
            <div className="bg-white/80 rounded-xl p-3 sm:p-3.5 border border-[#E6E0D6] space-y-1.5">
              <h3 className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5C5854]/80 mb-0.5">
                {currentService.sectionHeading}
              </h3>

              <ul className="space-y-1.5 text-[12.5px] sm:text-[13.5px] leading-[1.32] text-[#1F1E1D] font-medium">
                {currentService.directions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <DiamondBullet />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prominent Price Block */}
            <div className="bg-[#7C2832]/[0.07] border border-[#7C2832]/25 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7C2832]">
                    {currentService.price.label}
                  </span>
                  <span className="text-[11.5px] sm:text-[12px] text-[#1F1E1D] font-semibold">
                    {currentService.price.subtext}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[20px] sm:text-[23px] font-extrabold text-[#7C2832] leading-none tracking-tight">
                    {currentService.price.amount}
                  </div>
                  <div className="text-[11px] font-semibold text-[#5C5854] mt-0.5">
                    {currentService.price.unit}
                  </div>
                </div>
              </div>

              {currentService.price.footnote && (
                <p className="text-[10.5px] sm:text-[11px] leading-tight text-[#5C5854] mt-1.5 pt-1.5 border-t border-[#7C2832]/15">
                  {currentService.price.footnote}
                </p>
              )}
            </div>
          </section>

          {/* 6. FOOTER / TELEGRAM CONTACT (Open text for screenshot + clickable link) */}
          <footer className="mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-[#E6E0D6] shrink-0">
            <div className="flex items-center justify-between bg-[#1F1E1D] text-[#FAF8F5] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm">
              <a
                href={PROFILE_DATA.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group focus:outline-none flex-grow"
                title="Открыть чат в Telegram (@TanXian)"
              >
                <span className="w-8 h-8 rounded-lg bg-[#7C2832] group-hover:bg-[#631F27] flex items-center justify-center text-white shrink-0 transition-colors">
                  <Send className="w-4 h-4 -ml-0.5" />
                </span>

                <div>
                  <span className="flex items-center gap-1 text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#E6E0D6]/75 font-semibold leading-none">
                    <span>Для записи и вопросов</span>
                    {!screenshotMode && (
                      <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    )}
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-extrabold tracking-tight text-white group-hover:underline">
                    Telegram: {PROFILE_DATA.telegramHandle}
                  </span>
                </div>
              </a>

              {/* Subtle Copy Handle Button (Hidden in pure screenshot mode) */}
              {!screenshotMode && (
                <button
                  type="button"
                  onClick={handleCopyTelegram}
                  className={`ml-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                    copied
                      ? "bg-[#7C2832] text-white"
                      : "bg-white/10 hover:bg-white/20 text-[#EFEAE2]"
                  }`}
                  title="Скопировать ник @TanXian"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Копировать</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
