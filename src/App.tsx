import React, { useState, useCallback } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type TabId = "english" | "editing";

export type DirectionIconId =
  | "chart"
  | "book"
  | "cap"
  | "feather"
  | "layers"
  | "fileCheck";

export interface DirectionItem {
  icon: DirectionIconId;
  text: string;
}

export interface PriceInfo {
  label: string;
  amount: string;
  unit: string;
  subtext?: string;
}

export interface ServiceTabContent {
  id: TabId;
  tabLabel: string;
  titleLines: [string, string];
  badge: string;
  directions: DirectionItem[];
  price: PriceInfo;
}

export interface ProfileData {
  name: string;
  rolesLine1: string;
  rolesLine2: string;
  telegramHandle: string;
  telegramUrl: string;
  tabs: Record<TabId, ServiceTabContent>;
}

// ==========================================
// STATIC CONTENT (Compact Single-Screen Edition)
// ==========================================

const PROFILE_DATA: ProfileData = {
  name: "Татьяна Лепихина",
  rolesLine1: "УЧИТЕЛЬ АНГЛИЙСКОГО ·",
  rolesLine2: "ЛИТЕРАТУРНЫЙ РЕДАКТОР",
  telegramHandle: "@TanXian",
  telegramUrl: "https://t.me/TanXian",
  tabs: {
    english: {
      id: "english",
      tabLabel: "Английский",
      titleLines: ["Английский", "для школьников"],
      badge: "ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ",
      directions: [
        {
          icon: "chart",
          text: "Устранение пробелов и повышение успеваемости",
        },
        {
          icon: "book",
          text: "Грамматика, чтение, аудирование и разговорная практика",
        },
        {
          icon: "cap",
          text: "Школьная программа и подготовка к контрольным с авторскими интерактивными материалами",
        },
      ],
      price: {
        label: "СТОИМОСТЬ ЗАНЯТИЯ",
        amount: "1 000 ₽",
        unit: "60 минут",
      },
    },
    editing: {
      id: "editing",
      tabLabel: "Редактура",
      titleLines: ["Литературная", "редактура прозы"],
      badge: "ХУДОЖЕСТВЕННЫЕ ТЕКСТЫ",
      directions: [
        {
          icon: "feather",
          text: "Стиль, язык и точность формулировок",
        },
        {
          icon: "layers",
          text: "Логика повествования, композиция и диалоги",
        },
        {
          icon: "fileCheck",
          text: "Конкретные правки с пояснениями и рекомендациями",
        },
      ],
      price: {
        label: "СТОИМОСТЬ РЕДАКТУРЫ",
        amount: "3 500 ₽",
        unit: "за авторский лист",
        subtext: "1 а. л. = 40 000 знаков с пробелами",
      },
    },
  },
};

// ==========================================
// CUSTOM EDITORIAL ICONS
// ==========================================

const DirectionIcon: React.FC<{ id: DirectionIconId }> = ({ id }) => {
  switch (id) {
    case "chart":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 20h18" />
          <rect x="5" y="13" width="3" height="7" rx="0.5" />
          <rect x="10.5" y="9" width="3" height="11" rx="0.5" />
          <rect x="16" y="4" width="3" height="16" rx="0.5" />
        </svg>
      );
    case "book":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "cap":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12.5V16c0 1.657 2.686 3 6 3s6-1.343 6-3v-3.5" />
          <path d="M22 10v5" />
        </svg>
      );
    case "feather":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.24 4.76a5.5 5.5 0 0 0-7.78 0L4 13.22V19h5.78l8.46-8.46a5.5 5.5 0 0 0 2-5.78z" />
          <path d="M3 21l9.5-9.5" />
          <path d="M14.5 9.5L11 13" />
        </svg>
      );
    case "layers":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 3 2 8.5 12 14 22 8.5 12 3" />
          <polyline points="2 13 12 18.5 22 13" />
          <polyline points="2 17.5 12 23 22 17.5" />
        </svg>
      );
    case "fileCheck":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-[18px] h-[18px] text-[#7C2832]"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 20H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6" />
          <path d="M8 8h5" />
          <path d="M8 12h4" />
          <path d="M8 16h2" />
          <circle cx="17" cy="17" r="4" />
          <path d="M15.3 17l1.2 1.2 2.3-2.4" />
        </svg>
      );
  }
};

// ==========================================
// THEMATIC HERO ILLUSTRATIONS
// ==========================================

const EnglishHeroArt: React.FC = () => (
  <svg
    viewBox="0 0 165 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[138px] sm:w-[152px] h-[94px] sm:h-[104px] select-none pointer-events-none shrink-0 -mr-4 -my-2"
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="engSkyGlow"
        cx="65%"
        cy="45%"
        r="55%"
        fx="65%"
        fy="45%"
      >
        <stop offset="0%" stopColor="#EAD6C2" stopOpacity="0.85" />
        <stop offset="55%" stopColor="#F1E4D5" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="towerGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C89F65" />
        <stop offset="50%" stopColor="#9E7340" />
        <stop offset="100%" stopColor="#694823" />
      </linearGradient>
      <linearGradient id="spireDark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B2D23" />
        <stop offset="100%" stopColor="#6E5239" />
      </linearGradient>
      <linearGradient id="ribbonBurgundy" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#7C2832" stopOpacity="0" />
        <stop offset="28%" stopColor="#8A2D38" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#6B1D27" />
        <stop offset="100%" stopColor="#4E121A" />
      </linearGradient>
      <linearGradient id="fadeLeft" x1="0" y1="0" x2="0.35" y2="0">
        <stop offset="0%" stopColor="#FAF8F5" stopOpacity="1" />
        <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Warm Atmospheric Sky Glow */}
    <ellipse cx="105" cy="52" rx="68" ry="50" fill="url(#engSkyGlow)" />

    {/* Soft Cloud Wisps */}
    <path
      d="M42 44C54 40 66 41 78 44C92 47 118 36 148 40"
      stroke="#E5CFC1"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.55"
    />

    {/* Distant Westminster Silhouette */}
    <g opacity="0.82">
      <rect x="64" y="64" width="38" height="24" fill="#9E7B56" />
      <path
        d="M66 64L68 55L70 64M73 64L75 53L77 64M81 64L83 56L85 64M89 64L91 52L93 64M96 64L98 57L100 64"
        fill="#7B5C3D"
      />
      {/* Gothic Windows on Westminster */}
      <g stroke="#FAF3E8" strokeWidth="0.9" opacity="0.7">
        <line x1="69" y1="68" x2="69" y2="82" />
        <line x1="74" y1="68" x2="74" y2="82" />
        <line x1="79" y1="68" x2="79" y2="82" />
        <line x1="84" y1="68" x2="84" y2="82" />
        <line x1="89" y1="68" x2="89" y2="82" />
        <line x1="94" y1="68" x2="94" y2="82" />
      </g>
    </g>

    {/* Big Ben / Elizabeth Tower */}
    <g>
      {/* Needle Spire */}
      <path d="M114 5L115.2 17H112.8L114 5Z" fill="#3B2D23" />
      {/* Upper Roof */}
      <path d="M114 14L121 29H107L114 14Z" fill="url(#spireDark)" />
      {/* Belfry Lantern Gallery */}
      <rect x="107" y="29" width="14" height="6" fill="#C9A571" />
      <path
        d="M108.5 29V35M111 29V35M114 29V35M117 29V35M119.5 29V35"
        stroke="#573D26"
        strokeWidth="0.9"
      />
      {/* Lower Stepped Roof */}
      <path d="M107 35L121 35L124 41H104L107 35Z" fill="#4D3A2B" />

      {/* Clock Stage Housing */}
      <rect
        x="103.5"
        y="41"
        width="21"
        height="19"
        rx="0.8"
        fill="#DFC396"
        stroke="#785836"
        strokeWidth="1"
      />
      {/* Clock Face */}
      <circle
        cx="114"
        cy="50.5"
        r="6.8"
        fill="#FCF8F0"
        stroke="#8C6639"
        strokeWidth="1.3"
      />
      <circle
        cx="114"
        cy="50.5"
        r="5.2"
        fill="none"
        stroke="#C49B60"
        strokeWidth="0.6"
        strokeDasharray="1.2 1.2"
      />
      {/* Clock Hands */}
      <path
        d="M114 50.5V46.8M114 50.5L116.8 51.8"
        stroke="#2E2218"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Main Tower Shaft */}
      <rect
        x="105"
        y="60"
        width="18"
        height="32"
        fill="url(#towerGold)"
        stroke="#6B4D2B"
        strokeWidth="0.8"
      />
      {/* Vertical Fluting */}
      <g stroke="#FAF0DF" strokeWidth="0.8" opacity="0.65">
        <line x1="108.5" y1="62" x2="108.5" y2="88" />
        <line x1="111.5" y1="62" x2="111.5" y2="88" />
        <line x1="114" y1="62" x2="114" y2="88" />
        <line x1="116.5" y1="62" x2="116.5" y2="88" />
        <line x1="119.5" y1="62" x2="119.5" y2="88" />
      </g>
      {/* Horizontal Banding */}
      <line x1="105" y1="71" x2="123" y2="71" stroke="#5A3E20" strokeWidth="1.1" />
      <line x1="105" y1="81" x2="123" y2="81" stroke="#5A3E20" strokeWidth="1.1" />
    </g>

    {/* Right-side Turret Accent */}
    <path d="M132 58L135 49L138 58V86H132V58Z" fill="#8A6845" opacity="0.75" />

    {/* Flowing Burgundy Silk Wave at Base */}
    <path
      d="M52 103C78 103 95 96 116 88C134 81 151 82 165 89V108H52V103Z"
      fill="url(#ribbonBurgundy)"
    />
    <path
      d="M66 105C92 102 112 91 132 86C146 82 157 85 165 91"
      stroke="#A84450"
      strokeWidth="1.2"
      opacity="0.55"
    />
  </svg>
);

const EditingHeroArt: React.FC = () => (
  <svg
    viewBox="0 0 165 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[138px] sm:w-[152px] h-[94px] sm:h-[104px] select-none pointer-events-none shrink-0 -mr-4 -my-2"
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="editWarmGlow"
        cx="65%"
        cy="50%"
        r="58%"
        fx="65%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#E8D2BE" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#F2E6D8" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="drapeTop" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8E323D" stopOpacity="0.15" />
        <stop offset="45%" stopColor="#7C2832" stopOpacity="0.88" />
        <stop offset="100%" stopColor="#52151C" />
      </linearGradient>
      <linearGradient id="goldNib" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F6E2A7" />
        <stop offset="45%" stopColor="#D4A656" />
        <stop offset="100%" stopColor="#8B6220" />
      </linearGradient>
      <linearGradient id="penBarrel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B2E2A" />
        <stop offset="50%" stopColor="#1A1514" />
        <stop offset="100%" stopColor="#0D0A0A" />
      </linearGradient>
    </defs>

    {/* Warm Paper Glow */}
    <ellipse cx="106" cy="54" rx="68" ry="52" fill="url(#editWarmGlow)" />

    {/* Upper Burgundy Silk Drape */}
    <path
      d="M72 4C96 2 116 14 136 10C148 8 158 2 165 0V45C150 38 134 30 116 26C98 22 84 12 72 4Z"
      fill="url(#drapeTop)"
    />

    {/* Angled Manuscript Page */}
    <g transform="rotate(-11 108 62)">
      <rect
        x="56"
        y="28"
        width="96"
        height="64"
        rx="3"
        fill="#FBF6EE"
        stroke="#DFCBB2"
        strokeWidth="1"
      />
      {/* Handwritten Calligraphic Script Lines */}
      <g
        stroke="#9C8267"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.72"
      >
        <path d="M66 40C73 38 78 42 85 39C92 37 98 41 106 39" />
        <path d="M66 49C75 47 83 51 92 48C101 46 110 50 122 47" />
        <path d="M66 58C72 56 79 60 88 57C96 55 103 58 112 56" />
        <path d="M66 67C76 65 84 69 95 66C104 64 114 68 126 65" />
        <path d="M66 76C74 74 82 77 91 75" />
      </g>
      {/* Editorial Proofreading Accent Marks in Burgundy */}
      <path
        d="M84 53L89 45M101 69C105 66 110 66 114 69"
        stroke="#7C2832"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </g>

    {/* Lower Right Burgundy Ribbon Accent */}
    <path
      d="M114 96C128 89 144 76 165 73V108H98C103 103 108 99 114 96Z"
      fill="url(#drapeTop)"
    />

    {/* Classic Fountain Pen Nib & Barrel */}
    <g transform="rotate(-30 124 55)">
      {/* Soft Drop Shadow */}
      <path
        d="M84 57L112 50L168 49L168 63L112 62L84 57Z"
        fill="#593E2B"
        opacity="0.22"
      />
      {/* Gold Nib */}
      <path
        d="M82 54L109 47.5L113 54L109 60.5L82 54Z"
        fill="url(#goldNib)"
        stroke="#785318"
        strokeWidth="0.8"
      />
      {/* Nib Slit & Breather Hole */}
      <line
        x1="82"
        y1="54"
        x2="99"
        y2="54"
        stroke="#5C3D0E"
        strokeWidth="0.9"
      />
      <circle cx="100" cy="54" r="1.4" fill="#5C3D0E" />

      {/* Gold Collar Ring */}
      <rect
        x="111"
        y="46.8"
        width="5.5"
        height="14.4"
        rx="1"
        fill="url(#goldNib)"
      />

      {/* Lacquered Pen Barrel */}
      <rect
        x="116"
        y="46"
        width="56"
        height="16"
        rx="2"
        fill="url(#penBarrel)"
      />
      {/* Specular Highlight on Barrel */}
      <line
        x1="118"
        y1="49.5"
        x2="168"
        y2="49.5"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        opacity="0.28"
      />
    </g>
  </svg>
);

// ==========================================
// TAB SWITCHER
// ==========================================

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
      className="bg-[#EFEAE2] p-1 rounded-[14px] border border-[#E6E0D6] grid grid-cols-2 gap-1 shrink-0"
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
            className={`py-1.5 sm:py-2 px-3 rounded-[11px] text-[13.5px] sm:text-[14.5px] font-semibold tracking-tight transition-all duration-200 flex items-center justify-center select-none cursor-pointer ${
              isActive
                ? "bg-[#7C2832] text-[#FAF8F5] shadow-[0_2px_8px_rgba(124,40,50,0.24)]"
                : "text-[#1F1E1D] hover:bg-[#FAF8F5]/60"
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
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "editing" || hash === "english") {
        return hash;
      }
    }
    return "english";
  });

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    try {
      window.history.replaceState(null, "", `#${tab}`);
    } catch {
      // Ignore history errors in restricted webviews
    }
  }, []);

  const currentService: ServiceTabContent = PROFILE_DATA.tabs[activeTab];

  return (
    <>
      <style>{`
        .font-editorial-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-editorial-sans {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div className="font-editorial-sans min-h-[100dvh] w-full bg-[#FAF8F5] sm:bg-[#F2ECE4] text-[#1F1E1D] flex flex-col items-center justify-center px-3.5 py-2.5 sm:p-5 antialiased selection:bg-[#7C2832] selection:text-white">
        {/* =======================================================
            SINGLE-SCREEN MOBILE BUSINESS CARD
        ======================================================= */}
        <main
          aria-label="Визитная карточка Татьяны Лепихиной"
          className="w-full max-w-[390px] bg-[#FAF8F5] sm:rounded-[28px] sm:border sm:border-[#E6E0D6] sm:shadow-[0_18px_48px_-14px_rgba(31,30,29,0.12)] sm:px-5 sm:py-4 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-hidden"
        >
          {/* 1. COMPACT HEADER: Name & Dual Specialization */}
          <header className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <h1 className="font-editorial-serif font-bold text-[27px] sm:text-[30px] leading-[1.04] tracking-[-0.01em] text-[#1F1E1D]">
                {PROFILE_DATA.name}
              </h1>
              <span
                className="inline-block w-2.5 h-2.5 rounded-full bg-[#7C2832] shrink-0"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1 text-[11px] sm:text-[11.5px] leading-[1.32] font-bold uppercase tracking-[0.055em] text-[#7C2832]">
              <span className="block">{PROFILE_DATA.rolesLine1}</span>
              <span className="block">{PROFILE_DATA.rolesLine2}</span>
            </p>
          </header>

          {/* 2. TAB SWITCHER */}
          <TabSwitcher activeTab={activeTab} onSelectTab={handleTabChange} />

          {/* 3. ACTIVE TAB CONTENT */}
          <section
            key={currentService.id}
            aria-live="polite"
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {/* Compact Hero Block: Title + Single Format Badge + Thematic Illustration */}
            <div className="relative flex items-center justify-between gap-1 pt-0.5">
              <div className="z-10 flex flex-col items-start">
                <h2 className="font-editorial-serif font-bold text-[24px] sm:text-[26px] leading-[1.05] tracking-[-0.01em] text-[#1F1E1D]">
                  <span className="block">{currentService.titleLines[0]}</span>
                  <span className="block">{currentService.titleLines[1]}</span>
                </h2>

                <span className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-[#EFEAE2] border border-[#E4DDD3] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.055em] text-[#2B2927] leading-none">
                  {currentService.badge}
                </span>
              </div>

              {activeTab === "english" ? <EnglishHeroArt /> : <EditingHeroArt />}
            </div>

            {/* Compact Directions Card (3 concise items with icons) */}
            <div className="bg-[#FDFBF9] rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-3 border border-[#E6E0D6] space-y-2 sm:space-y-2.5 shadow-[0_2px_8px_rgba(31,30,29,0.02)]">
              {currentService.directions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F3E5E4] border border-[#7C2832]/12 flex items-center justify-center shrink-0">
                    <DirectionIcon id={item.icon} />
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] leading-[1.26] text-[#1F1E1D] font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* 4. UNIFIED COMPACT PRICE & DURATION BLOCK */}
            <div className="bg-[#F3E5E4]/85 border border-[#7C2832]/20 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3">
              <span className="block text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#4A1D22] leading-tight">
                {currentService.price.label}
              </span>

              <div className="mt-1 flex items-center gap-2.5 sm:gap-3">
                <span className="text-[22px] sm:text-[24px] font-extrabold text-[#7C2832] leading-none tracking-tight">
                  {currentService.price.amount}
                </span>
                <span
                  className="h-4 w-[1px] bg-[#7C2832]/30 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[13.5px] sm:text-[14.5px] font-semibold text-[#1F1E1D] leading-tight">
                  {currentService.price.unit}
                </span>
              </div>

              {currentService.price.subtext && (
                <p className="mt-1 text-[11px] sm:text-[11.5px] text-[#3D3A37] font-medium leading-tight">
                  {currentService.price.subtext}
                </p>
              )}
            </div>
          </section>

          {/* 5. PROMINENT & CLICKABLE TELEGRAM CONTACT */}
          <footer className="shrink-0">
            <a
              href={PROFILE_DATA.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Написать в Telegram ${PROFILE_DATA.telegramHandle}`}
              className="w-full flex items-center gap-3 bg-[#1E1B1A] hover:bg-[#2A2625] active:scale-[0.995] text-[#FAF8F5] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all shadow-sm group"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#7C2832] group-hover:bg-[#8E303B] flex items-center justify-center text-white shrink-0 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-[18px] h-[18px] -ml-0.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </span>

              <span
                className="w-[1px] h-7 sm:h-8 bg-white/20 shrink-0"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <span className="block text-[10px] sm:text-[10.5px] uppercase tracking-[0.07em] text-[#D8D2C9] font-semibold leading-tight">
                  ЗАПИСЬ И ВОПРОСЫ
                </span>
                <span className="block text-[15px] sm:text-[16.5px] font-bold tracking-tight text-white group-hover:underline leading-snug mt-0.5 truncate">
                  Telegram: {PROFILE_DATA.telegramHandle}
                </span>
              </div>
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
