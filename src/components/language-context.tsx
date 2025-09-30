import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Language = 'ml' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ml: {
    // Header
    appTitle: 'കൃഷി സഖി',
    welcome: 'സ്വാഗതം, രാജേഷേട്ടാ!',
    location: 'കോട്ടയം, കേരളം',
    farmName: 'ഹരിത വയൽ',
    
    // Navigation
    dashboard: 'ഹോം',
    chat: 'ചാറ്റ്',
    crops: 'വിള',
    weather: 'കാലാവസ്ഥ',
    activities: 'ജോലി',
    schemes: 'സ്കീം',
    
    // Tab Labels (full)
    dashboardFull: 'Dashboard',
    chatFull: 'AI സഖി',
    cropsFull: 'വിളകൾ',
    weatherFull: 'കാലാവസ്ഥ',
    activitiesFull: 'പ്രവർത്തനങ്ങൾ',
    schemesFull: 'സ്കീമുകൾ',
    
    // Farmer Profile
    farmerProfile: 'കർഷകൻ പ്രൊഫൈൽ',
    farmerName: 'രാജേഷ് കുമാർ',
    farmArea: 'പ്രവർത്തന പ്രദ�����ശം:',
    soilType: 'മണ്ണിന്റെ തരം:',
    irrigation: 'ജലസേചനം:',
    experience: 'പരിചയം:',
    cropsGrown: 'കൃഷി ചെയ്യുന്ന വിളകൾ:',
    phoneNumber: 'ഫോൺ നമ്പർ:',
    claysoil: 'കളിമണ്ണ്',
    borewell: 'ബോർവെൽ',
    years15: '15 വർഷം',
    acres12: '1.2 ഏക്കർ',
    
    // Crops
    rice: 'നെല്ല്',
    pepper: 'കുരുമുളക്',
    cardamom: 'ഏലം',
    coconut: 'തേങ്ങ്',
    banana: 'വാഴ',
    
    // AI Chat
    aiAssistant: 'കൃഷി സഖി - AI അസിസ്റ്റന്റ്',
    personalAdvisor: 'നിങ്ങളുടെ വ്യക്തിഗത കാർഷിക ഉപദേഷ്ടാവ്',
    typePlaceholder: 'ചോദ്യം ടൈപ്പ് ചെയ്യുക... (മലയാളത്തിലോ ഇംഗ്ലീഷിലോ)',
    speakInMalayalam: 'മലയാളത്തിൽ സംസാരിക്കാൻ മൈക്ക് ഓൺ ചെയ്യുക',
    addImage: 'ചിത്രം ചേർക്കുക',
    cropImage: 'വിളയുടെ ചിത്രം',
    imageAdded: 'ചിത്രം ചേർത്തു',
    analyzing: 'വിശകലനം ചെയ്യുന്നു...',
    
    // Weather
    weatherReport: 'കാലാവസ്ഥ റിപ്പോർട്ട്',
    weatherInfo: 'കാലാവസ്ഥ വിവരം',
    weatherDescription: 'കാർഷിക ഉപദേശങ്ങളോടെ കാലാവസ്ഥാ റിപ്പോർട്ട്',
    humidity: 'ഈർപ്പം:',
    wind: 'കാറ്റ്:',
    rain: 'മഴ:',
    forecast4days: '4 ദിവസത്തെ പ്രവചനം',
    farmingAdviceToday: 'ഇന്നത്തെ കാർഷിക ഉപദേശം',
    today: 'ഇന്ന്',
    tomorrow: 'നാളെ',
    dayAfter: 'മറ്റന്നാൾ',
    thursday: 'വ്യാഴം',
    monsoon: 'മൺസൂൺ',
    
    // Crop Management
    cropManagement: 'വിള കൈകാര്യം ചെയ്യൽ',
    cropManagementDesc: 'നിങ്ങളുടെ വിളകളുടെ വളർച്ച നിരീക്ഷിക്കുക',
    newCrop: 'പുതിയ വിള',
    healthy: 'ആരോഗ്യകരം',
    needsAttention: 'ശ്രദ്ധ വേണം',
    ready: 'തയ്യാറാണ്',
    growthProgress: 'വളർച്ചയുടെ പുരോഗതി',
    plantingDate: 'നടീൽ തീയതി:',
    expectedHarvest: 'വിളവെടുപ്പ് പ്രതീക്ഷിക്കുന്നത്:',
    lastActivity: 'അവസാന പ്രവർത്തനം:',
    nextActivity: 'അടുത്ത പ്രവർത്തനം:',
    notes: 'കുറിപ്പുകൾ:',
    takePhoto: 'ഫോട്ടോ എടുക്കുക',
    logActivity: 'പ്രവർത്തനം രേഖപ്പെടുത്തുക',
    addNewCrop: 'പുതിയ വിള ചേർക്കുക',
    addNewCropDesc: 'നിങ്ങളുടെ തോട്ടത്തിലെ പുതിയ വിളകൾ രേഖപ്പെടുത്തുക',
    add: 'ചേർക്കുക',
    
    // Activity Logger
    activityLog: 'പ്രവർത്തന രേഖ',
    activityLogDesc: 'നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്തുക',
    newActivity: 'പുതിയ പ്രവർത്തനം',
    cancel: 'റദ്ദാക്കുക',
    logNewActivity: 'പുതിയ പ്രവർത്തനം രേഖപ്പെടുത്തുക',
    watering: 'വെള്ളം നൽകൽ',
    fertilizing: 'വളം ചേർക്കൽ',
    pesticide: 'കീടനാശിനി',
    pruning: 'വെട്ടിമാറ്റൽ',
    harvesting: 'വിളവെടുപ്പ്',
    planting: 'നടീൽ',
    details: 'വിശദാംശങ്ങൾ (മലയാളത്തിലോ ഇംഗ്ലീഷിലോ)',
    speak: 'ശബ്ദത്തിൽ പറയുക',
    addPhoto: 'ഫോട്ടോ ചേർക്കുക',
    save: 'സേവ് ചെയ്യുക',
    recentActivities: 'സമീപകാല പ്രവർത്തനങ്ങൾ',
    activitiesThisMonth: 'ഈ മാസത്തെ പ്രവർത്തനങ്ങൾ',
    cropsManaging: 'വിളകൾ കൈകാര്യം ചെയ്യുന്നു',
    
    // Government Schemes
    govSchemes: 'സർക്കാർ പദ്ധതികൾ',
    govSchemesDesc: 'കർഷകർക്കുള്ള സർക്കാർ സഹായങ്ങളും അലേർട്ടുകളും',
    govSchemesAlerts: 'സർക്കാർ പദ്ധതികൾ & അലേർട്ടുകൾ',
    pmKisan: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി',
    keralaFarmerWelfare: 'കേരള കർഷക ക്ഷേമ ബോർഡ്',
    soilHealthCard: 'സോയിൽ ഹെൽത്ത് കാർഡ് സ്കീം',
    annualAssistance: '6000 രൂപ വാർഷിക സഹായം',
    farmerPension: 'കർഷക പെൻഷൻ & ഇൻഷുറൻസ് പദ്ധതി',
    freeSoilTesting: 'സൗജന്യ മണ്ണ് പരിശോധന',
    beneficiaryAmount: 'ഗുണഭോക്താവിന്:',
    lastDate: 'അവസാന തീയതി:',
    nextInstallment: 'അടുത്ത ഇൻസ്റ്റാൾമെന്റ്:',
    requiredDocuments: 'ആവശ്യമായ രേഖകൾ:',
    apply: 'അപ്ലൈ ചെയ്യുക',
    moreDetails: 'കൂടുതൽ വിവരങ്ങൾ',
    activeSchemes: 'സജീവ പദ്ധതികൾ',
    expectedIncome: 'പ്രതീക്ഷിക്കുന്ന വരുമാനം',
    urgentApplication: 'അടിയന്തര അപ്ലിക്കേഷൻ',
    free: 'സൗജന്യം',
    active: 'സജീവം',
    urgent: 'അടിയന്തരം',
    new: 'പുതിയത്',
    
    // Dashboard
    digitalFarmingAssistant: 'നിങ്ങളുടെ ഡിജിറ്റൽ കാർഷിക സഹായി',
    speciallyDesigned: 'കേരളത്തിലെ ചെറുകിട കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്തത്',
    todaysTasks: 'ഇന്നത്തെ ചുമതലകൾ',
    pendingActivities: 'പെൻഡിംഗ് പ്രവർത്തനങ്ങൾ',
    cropStatus: 'വിള സ്റ്റേറ്റസ്',
    thisMonthIncome: 'ഈ മാസത്തെ വരുമാനം',
    schemeAlerts: 'സ്കീം അലേർട്ടുകൾ',
    notifications: 'നോട്ടിഫിക്കേഷനുകൾ',
    todaysKeyInfo: 'ഇന്നത്തെ പ്രധാന വിവരങ്ങൾ',
    quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    todaysWork: 'ഇന്നത്തെ ജോലികൾ',
    logCropActivity: 'വിള രേഖപ്പെടുത്തൽ',
    marketPrice: 'മാർക്കറ്റ് വില',
    schemeUpdate: 'സ്കീം അപ്ഡേറ്റ്',
    
    // Footer
    aiPoweredAssistant: 'കേരളത്തിലെ ചെറുകിട കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത AI പവേർഡ് അസിസ്റ്റന്റ്',
    availableInBothLanguages: 'മലയാളത്തിലും ഇംഗ്ലീഷിലും ഉപയോഗിക്കാം • സൗജന്യ സേവനം',
    
    // Home Page  
    chatWithSakhi: 'നിങ്ങളുടെ സഖിയുമായി ചാറ്റ് ചെയ്യുക',
    importantInfoToday: 'ഇന്നുള്ള പ്രധാന വിവരങ്ങൾ',
    todaysFarmingAdvice: 'ഇന്നത്തെ കാർഷിക ഉപദേശം',
    farmingAdviceContent: 'മഴ കൂടുതൽ ആയതിനാൽ നെൽവയലിൽ വെള്ളം നിൽക്കരുത്. കുരുമുളകിൽ ഫംഗസ് രോഗത്തിന് സാധ്യത.',
    marketPricesUpdate: 'മാർക്കറ്റ് വില അപ്ഡേറ്റ്',
    marketPricesContent: 'കുരുമുളക് - ₹580/കിലോ, നെല്ല് - ₹2,200/ക്വിന്റൽ, തേങ്ങ - ₹25/എണ്ണം',
    pestAlerts: 'കീട മുന്നറിയിപ്പ്',
    pestAlertsContent: 'കോട്ടയം ജില്ലയിൽ ബ്രൗൺ പ്ലാന്റ് ഹോപ്പർ കാണപ്പെടുന്നു. നെൽവയൽ പരിശോധിക്കുക.',
    welcomeFarmer: 'സ്വാഗതം',
    
    // Help Section
    helpSupport: 'സഹായവും പിന്തുണയും',
    helpDescription: 'കൃഷി സഖിയുടെ ഉപയോഗത്തിൽ സഹായം നേടുക',
    faq: 'പതിവുചോദ്യങ്ങൾ',
    howAddCrops: 'പുതിയ വിളകൾ എങ്ങനെ ചേർക്കാം?',
    howAddCropsAnswer: 'വിളകൾ വിഭാഗത്തിൽ പോയി "പുതിയ വിള ചേർക്കുക" ക്ലിക്ക് ചെയ്ത് നിങ്ങളുടെ നടീലുകൾ രജിസ്റ്റർ ചെയ്യുക.',
    weatherAccuracy: 'കാലാവസ്ഥ പ്രവചനം എത്രത്തോളം കൃത്യം?',
    weatherAccuracyAnswer: 'കേരളത്തിലെ പ്രദേശങ്ങൾക്കായി സ്ഥാന-നിർദ്ദിഷ്ട ഡാറ്റയുമായി ഞങ്ങൾ 7-ദിവസത്തെ പ്രവചനങ്ങൾ നൽകുന്നു.',
    offlineUsage: 'ഈ ആപ്പ് ഓഫ്‌ലൈനിൽ ഉപയോഗിക്കാമോ?',
    offlineUsageAnswer: 'ചില ഫീച്ചറുകൾ ഓഫ്‌ലൈനിൽ പ്രവർത്തിക്കുന്നു, എന്നാൽ ചാറ്റിനും കാലാവസ്ഥയ്ക്കും ഇന്റർനെറ്റ് കണക്ഷൻ ആവശ്യമാണ്.',

    // Notifications
    weatherAlert: 'കാലാവസ്ഥാ അലേർട്ട്',
    weatherAlertMsg: 'നാളെ കനത്ത മഴയ്ക്ക് സാധ്യത. നിങ്ങളുടെ വിളകൾ സംരക്ഷിക്കുക.',
    fertilizerReminder: 'വളം ഓർമ്മിപ്പിക്കൽ',
    fertilizerReminderMsg: 'നിങ്ങളുടെ തേങ്ങയിൽ വളം നൽകാനുള്ള സമയം.',
    newGovScheme: 'പുതിയ സർക്കാർ പദ്ധതി',
    newGovSchemeMsg: 'പി.എം കിസാൻ പദ്ധതി പേയ്മെന്റ് നിങ്ങളുടെ അക്കൗണ്ടിൽ ക്രെഡിറ്റ് ചെയ്തു.',
    cropCalendarUpdate: 'വിള കലണ്ടർ അപ്ഡേറ്റ്',
    cropCalendarUpdateMsg: 'നിങ്ങളുടെ പ്രദേശത്ത് നെൽ ഇനങ്ങൾ നടാനുള്ള ഏറ്റവും നല്ല സമയം.',
    hoursAgo: 'മണിക്കൂർ മുമ്പ്',
    dayAgo: 'ദിവസം മുമ്പ്',
    daysAgo: 'ദിവസം മുമ്പ്',
    weekAgo: 'ആഴ്ച മുമ്പ്',

    // Landing Page
    welcomeToKrishiSakhi: 'കൃഷി സഖിയിലേക്ക് സ്വാഗതം',
    yourDigitalFarmingAssistant: 'നിങ്ങളുടെ ഡിജിറ്റൽ കാർഷിക സഹായി',
    designedForKeralaFarmers: 'കേരളത്തിലെ കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്തത്',
    getStarted: 'ആരംഭിക്കുക',
    features: 'സവിശേഷതകൾ',
    aiChatFeature: 'AI ചാറ്റ് അസിസ്റ്റന്റ്',
    weatherFeature: 'കാലാവസ്ഥാ വിവരം',
    cropManagementFeature: 'വിള കൈകാര്യം',
    schemeAlertsFeature: 'സർക്കാർ പദ്ധതി അലേർട്ടുകൾ',

    // Login Page
    enterYourName: 'നിങ്ങളുടെ പേര് നൽകുക',
    namePlaceholder: 'നിങ്ങളുടെ പേര് ഇവിടെ ടൈപ്പ് ചെയ്യുക',
    welcomeBack: 'സ്വാഗതം തിരിച്ചെത്തി',
    continue: 'തുടരുക',
    pleaseEnterName: 'ദയവായി നിങ്ങളുടെ പേര് നൽകുക',
    
    // Landing Page Content
    landingHello: 'ഹലോ! സ്വാഗതം',
    personalFarmingCompanion: 'നിങ്ങളുടെ വ്യക്തിഗത കാർഷിക സഹയാത്രി!',
    landingDescription: 'നിങ്ങൾ എല്ലാ ദിവസവും കഠിനാധ്വാനം ചെയ്ത് ഞങ്ങളെയെല്ലാം പോഷിപ്പിക്കുന്നു — ഞങ്ങൾ നിങ്ങളുടെ ശ്രമത്തെ വളരെയധികം അഭിനന്ദിക്കുന്നു. അതുകൊണ്ടാണ് കൃഷി സഖി ഇവിടെ: നിങ്ങളുടെ ഭാരം പങ്കിടുകയും കൃഷിയെ എളുപ്പവും മിടുക്കുള്ളതും കൂടുതൽ പ്രതിഫലദായകവും ആക്കുകയും ചെയ്യുന്നു — വയലിലെ വിശ്വസ്ത സുഹൃത്തിനെപ്പോലെ.',
    whyKrishiSakhi: 'എന്തുകൊണ്ട് കൃഷി സഖി?',
    whyKrishiSakhiDesc: 'കാരണം ഇത് നിങ്ങളുടെ കൃഷിയെ കൂടുതൽ മിടുക്കുള്ളതും എളുപ്പമുള്ളതും പ്രതിഫലദായകവുമാക്കുന്നു:',
    rightAdvice: 'ശരിയായ സമയത്ത് നിങ്ങളുടെ വിളകൾക്ക് ശരിയായ ഉപദേശം നേടുക',
    weatherBeforeSurprise: 'കാലാവസ്ഥ നിങ്ങളെ അത്ഭുതപ്പെടുത്തുന്നതിന് മുമ്പ് അറിയുക',
    saveMoney: 'മികച്ച ആസൂത്രണവും കുറഞ്ഞ അപകടസാധ്യതയും കൊണ്ട് പണം ലാഭിക്കുക',
    learnSimpleTips: 'നിങ്ങളുടെ വിളവെടുപ്പ് മെച്ചപ്പെടുത്താനുള്ള ലളിതമായ ടിപ്പുകൾ പഠിക്കുക',
    increaseIncome: 'മികച്ച കാർഷിക തിരഞ്ഞെടുപ്പുകൾ കൊണ്ട് നിങ്ങളുടെ വരുമാനം വർദ്ധിപ്പിക്കുക',
    farmingLighter: 'കൃഷി സഖിയുടെ കൂടെ, കൃഷി കൂടുതൽ എളുപ്പവും വിജയകരവുമാകും.',
    letsGrowTogether: 'നമുക്ക് ഒരുമിച്ച് വളരാം!',
    signUp: 'സൈൻ അപ്പ്',
    login: 'ലോഗിൻ',
    back: 'തിരികെ',
    
    // Login Page Content
    loginTitle: 'ലോഗിൻ',
    loginWelcome: 'ഹായ്, തിരിച്ചെത്തിയതിൽ സ്വാഗതം',
    loginWithGoogle: 'Google ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക',
    orLoginWithUsername: 'അല്ലെങ്കിൽ ഉപയോക്തൃനാമം ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക',
    username: 'ഉപയോക്തൃനാമം',
    usernamePlaceholder: 'നിങ്ങളുടെ ഉപയോക്തൃനാമം നൽകുക',
    otp: 'OTP',
    otpPlaceholder: '6 അക്ക OTP നൽകുക',
    sendOtp: 'OTP അയക്കുക',
    otpSent: 'OTP അയച്ചു! നിങ്ങളുടെ ഫോണിലേക്ക് പരിശോധിക്കുക',
    resendOtp: 'OTP വീണ്ടും അയക്കുക',
    resendOtpIn: 'സെക്കൻഡുകൾക്ക് ശേഷം വീണ്ടും അയക്കുക',
    rememberMe: 'എന്നെ ഓർക്കുക',
    forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
    notRegistered: 'ഇതുവരെ രെജിസ്റ്റർ ചെയ്തിട്ടില്ലേ?',
    createAccount: 'ഒരു അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    loginButton: 'ലോഗിൻ',
  },
  en: {
    // Header
    appTitle: 'Krishi Sakhi',
    welcome: 'Welcome, Rajesh!',
    location: 'Kottayam, Kerala',
    farmName: 'Green Field',
    
    // Navigation
    dashboard: 'Home',
    chat: 'Chat',
    crops: 'Crops',
    weather: 'Weather',
    activities: 'Activities',
    schemes: 'Schemes',
    
    // Tab Labels (full)
    dashboardFull: 'Dashboard',
    chatFull: 'AI Sakhi',
    cropsFull: 'Crops',
    weatherFull: 'Weather',
    activitiesFull: 'Activities',
    schemesFull: 'Schemes',
    
    // Farmer Profile
    farmerProfile: 'Farmer Profile',
    farmerName: 'Rajesh Kumar',
    farmArea: 'Farm Area:',
    soilType: 'Soil Type:',
    irrigation: 'Irrigation:',
    experience: 'Experience:',
    cropsGrown: 'Crops Being Grown:',
    phoneNumber: 'Phone Number:',
    claysoil: 'Clay Soil',
    borewell: 'Borewell',
    years15: '15 Years',
    acres12: '1.2 Acres',
    
    // Crops
    rice: 'Rice',
    pepper: 'Pepper',
    cardamom: 'Cardamom',
    coconut: 'Coconut',
    banana: 'Banana',
    
    // AI Chat
    aiAssistant: 'Krishi Sakhi - AI Assistant',
    personalAdvisor: 'Your Personal Farm Advisor',
    typePlaceholder: 'Type your question... (in Malayalam or English)',
    speakInMalayalam: 'Turn on mic to speak in Malayalam/English',
    addImage: 'Add Image',
    cropImage: 'Crop Image',
    imageAdded: 'Image Added',
    analyzing: 'Analyzing...',
    
    // Weather
    weatherReport: 'Weather Report',
    weatherInfo: 'Weather Information',
    weatherDescription: 'Weather report with farming advice',
    humidity: 'Humidity:',
    wind: 'Wind:',
    rain: 'Rain:',
    forecast4days: '4-Day Forecast',
    farmingAdviceToday: "Today's Farming Advice",
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfter: 'Day After',
    thursday: 'Thursday',
    monsoon: 'Monsoon',
    
    // Crop Management
    cropManagement: 'Crop Management',
    cropManagementDesc: 'Monitor your crop growth',
    newCrop: 'New Crop',
    healthy: 'Healthy',
    needsAttention: 'Needs Attention',
    ready: 'Ready',
    growthProgress: 'Growth Progress',
    plantingDate: 'Planting Date:',
    expectedHarvest: 'Expected Harvest:',
    lastActivity: 'Last Activity:',
    nextActivity: 'Next Activity:',
    notes: 'Notes:',
    takePhoto: 'Take Photo',
    logActivity: 'Log Activity',
    addNewCrop: 'Add New Crop',
    addNewCropDesc: 'Record new crops in your farm',
    add: 'Add',
    
    // Activity Logger
    activityLog: 'Activity Log',
    activityLogDesc: 'Record your farming activities',
    newActivity: 'New Activity',
    cancel: 'Cancel',
    logNewActivity: 'Log New Activity',
    watering: 'Watering',
    fertilizing: 'Fertilizing',
    pesticide: 'Pesticide',
    pruning: 'Pruning',
    harvesting: 'Harvesting',
    planting: 'Planting',
    details: 'Details (in Malayalam or English)',
    speak: 'Speak',
    addPhoto: 'Add Photo',
    save: 'Save',
    recentActivities: 'Recent Activities',
    activitiesThisMonth: 'Activities This Month',
    cropsManaging: 'Crops Managing',
    
    // Government Schemes
    govSchemes: 'Government Schemes',
    govSchemesDesc: 'Government assistance and alerts for farmers',
    govSchemesAlerts: 'Government Schemes & Alerts',
    pmKisan: 'PM Kisan Samman Nidhi',
    keralaFarmerWelfare: 'Kerala Farmer Welfare Board',
    soilHealthCard: 'Soil Health Card Scheme',
    annualAssistance: '₹6000 annual assistance',
    farmerPension: 'Farmer pension & insurance scheme',
    freeSoilTesting: 'Free soil testing',
    beneficiaryAmount: 'Beneficiary Amount:',
    lastDate: 'Last Date:',
    nextInstallment: 'Next Installment:',
    requiredDocuments: 'Required Documents:',
    apply: 'Apply',
    moreDetails: 'More Details',
    activeSchemes: 'Active Schemes',
    expectedIncome: 'Expected Income',
    urgentApplication: 'Urgent Application',
    free: 'Free',
    active: 'Active',
    urgent: 'Urgent',
    new: 'New',
    
    // Dashboard
    digitalFarmingAssistant: 'Your Digital Farming Assistant',
    speciallyDesigned: 'Specially designed for Kerala\'s small farmers',
    todaysTasks: "Today's Tasks",
    pendingActivities: 'Pending Activities',
    cropStatus: 'Crop Status',
    thisMonthIncome: "This Month's Income",
    schemeAlerts: 'Scheme Alerts',
    notifications: 'Notifications',
    todaysKeyInfo: "Today's Key Information",
    quickActions: 'Quick Actions',
    todaysWork: "Today's Work",
    logCropActivity: 'Log Crop Activity',
    marketPrice: 'Market Price',
    schemeUpdate: 'Scheme Update',
    
    // Footer
    aiPoweredAssistant: 'AI-powered assistant specially designed for Kerala\'s small farmers',
    availableInBothLanguages: 'Available in Malayalam and English • Free Service',
    
    // Home Page
    chatWithSakhi: 'Chat with your Sakhi',
    importantInfoToday: 'Important Information for Today',
    todaysFarmingAdvice: "Today's Farming Advice",
    farmingAdviceContent: 'Due to heavy rain, don\'t let water stand in paddy fields. Fungus disease possibility in pepper.',
    marketPricesUpdate: 'Market Prices Update',
    marketPricesContent: 'Pepper - ₹580/kg, Rice - ₹2,200/quintal, Coconut - ₹25/piece',
    pestAlerts: 'Pest Alerts',
    pestAlertsContent: 'Brown plant hopper spotted in Kottayam district. Check paddy fields.',
    welcomeFarmer: 'Welcome',
    
    // Help Section
    helpSupport: 'Help & Support',
    helpDescription: 'Get help with using Krishi Sakhi',
    faq: 'Frequently Asked Questions',
    howAddCrops: 'How do I add new crops?',
    howAddCropsAnswer: 'Go to the Crops section and click "Add New Crop" to register your plantings.',
    weatherAccuracy: 'How accurate is the weather forecast?',
    weatherAccuracyAnswer: 'We provide 7-day forecasts with location-specific data for Kerala regions.',
    offlineUsage: 'Can I use this app offline?',
    offlineUsageAnswer: 'Some features work offline, but chat and weather require internet connection.',

    // Notifications
    weatherAlert: 'Weather Alert',
    weatherAlertMsg: 'Heavy rainfall expected tomorrow. Protect your crops.',
    fertilizerReminder: 'Fertilizer Reminder',
    fertilizerReminderMsg: 'Time to apply fertilizer to your coconut trees.',
    newGovScheme: 'New Government Scheme',
    newGovSchemeMsg: 'PM-KISAN scheme payment has been credited to your account.',
    cropCalendarUpdate: 'Crop Calendar Update',
    cropCalendarUpdateMsg: 'Best time to plant rice varieties in your region.',
    hoursAgo: 'hours ago',
    dayAgo: 'day ago',
    daysAgo: 'days ago',
    weekAgo: 'week ago',

    // Landing Page
    welcomeToKrishiSakhi: 'Welcome to Krishi Sakhi',
    yourDigitalFarmingAssistant: 'Your Digital Farming Assistant',
    designedForKeralaFarmers: 'Specially designed for Kerala farmers',
    getStarted: 'Get Started',
    features: 'Features',
    aiChatFeature: 'AI Chat Assistant',
    weatherFeature: 'Weather Information',
    cropManagementFeature: 'Crop Management',
    schemeAlertsFeature: 'Government Scheme Alerts',

    // Login Page
    enterYourName: 'Enter Your Name',
    namePlaceholder: 'Type your name here',
    welcomeBack: 'Welcome Back',
    continue: 'Continue',
    pleaseEnterName: 'Please enter your name',
    
    // Landing Page Content
    landingHello: 'Hello! Welcome to',
    personalFarmingCompanion: 'Your Personal Farming Companion!',
    landingDescription: 'You work hard every day to feed us all and we truly appreciate your effort. That\'s why Krishi Sakhi is here: to share your workload and make farming easier, smarter, and more rewarding just like a trusted friend in the field.',
    whyKrishiSakhi: 'Why Krishi Sakhi?',
    whyKrishiSakhiDesc: 'Because it makes your farming smarter, easier, and more rewarding:',
    rightAdvice: 'Get the right advice for your crops at the right time',
    weatherBeforeSurprise: 'Know the weather before it surprises you',
    saveMoney: 'Save money with better planning and fewer risks',
    learnSimpleTips: 'Learn simple tips to improve your harvest',
    increaseIncome: 'Increase your income with smarter farming choices',
    farmingLighter: 'With Krishi Sakhi by your side, farming becomes lighter and more successful.',
    letsGrowTogether: 'Let\'s grow together!',
    signUp: 'Sign up',
    login: 'Login',
    back: 'Back',
    
    // Login Page Content
    loginTitle: 'Login',
    loginWelcome: 'Hi, Welcome back',
    loginWithGoogle: 'Login with Google',
    orLoginWithUsername: 'or Login with Username',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    otp: 'OTP',
    otpPlaceholder: 'Enter 6-digit OTP',
    sendOtp: 'Send OTP',
    otpSent: 'OTP sent! Check your phone',
    resendOtp: 'Resend OTP',
    resendOtpIn: 'Resend in seconds',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    notRegistered: 'Not registered yet?',
    createAccount: 'Create an account',
    loginButton: 'Login',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ml');

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations['ml']] || key;
  }, [language]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}