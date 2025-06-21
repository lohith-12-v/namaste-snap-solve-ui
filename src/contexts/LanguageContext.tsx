
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'te';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  en: {
    // Navigation
    'welcome': 'Welcome Back',
    'namaste': 'Namaste, Rajesh!',
    'ready_to_help': 'Ready to make Telangana better?',
    'settings': 'Settings',
    'report_problem': 'Report a Problem',
    'view_reports': 'View My Reports',
    'history': 'History',
    'map': 'Map',
    
    // Authentication
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'create_account': 'Create Account',
    'welcome_back': 'Welcome Back',
    'sign_in_continue': 'Sign in to continue',
    'join_community': 'Join TG FixIt community',
    'full_name': 'Full Name',
    'address': 'Address',
    'email_address': 'Email Address',
    'aadhaar_number': 'Aadhaar Number',
    'email_mobile': 'Email or Mobile',
    'password': 'Password',
    'forgot_password': 'Forgot password?',
    'already_account': 'Already have an account?',
    'no_account': "Don't have an account?",
    
    // Profile
    'profile_details': 'Profile details',
    'reward_points': 'Reward Points',
    'reported': 'Reported',
    'solved': 'Solved',
    'rating': 'Rating',
    
    // Settings
    'other_settings': 'Other settings',
    'notifications': 'Notifications',
    'dark_mode': 'Dark mode',
    'language': 'Language',
    'about_application': 'About application',
    'help_faq': 'Help/FAQ',
    'deactivate_account': 'Deactivate my account',
    
    // Languages
    'english': 'English',
    'hindi': 'Hindi',
    'telugu': 'Telugu',
    
    // Report
    'report_title': 'Report Title',
    'describe_problem': 'Describe the problem',
    'select_category': 'Select Category',
    'select_urgency': 'Select Urgency',
    'location': 'Location',
    'add_photos': 'Add Photos',
    'submit_report': 'Submit Report',
    'submitting': 'Submitting...',
    'report_submitted': 'Report submitted successfully!',
    
    // Categories
    'road_infrastructure': 'Road & Infrastructure',
    'water_sanitation': 'Water & Sanitation',
    'electricity': 'Electricity',
    'public_safety': 'Public Safety',
    
    // Urgency
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'critical': 'Critical'
  },
  hi: {
    // Navigation
    'welcome': 'वापसी पर स्वागत',
    'namaste': 'नमस्ते, राजेश!',
    'ready_to_help': 'तेलंगाना को बेहतर बनाने के लिए तैयार?',
    'settings': 'सेटिंग्स',
    'report_problem': 'समस्या की रिपोर्ट करें',
    'view_reports': 'मेरी रिपोर्ट देखें',
    'history': 'इतिहास',
    'map': 'नक्शा',
    
    // Authentication
    'sign_in': 'साइन इन',
    'sign_up': 'साइन अप',
    'create_account': 'खाता बनाएं',
    'welcome_back': 'वापसी पर स्वागत',
    'sign_in_continue': 'जारी रखने के लिए साइन इन करें',
    'join_community': 'TG FixIt समुदाय में शामिल हों',
    'full_name': 'पूरा नाम',
    'address': 'पता',
    'email_address': 'ईमेल पता',
    'aadhaar_number': 'आधार संख्या',
    'email_mobile': 'ईमेल या मोबाइल',
    'password': 'पासवर्ड',
    'forgot_password': 'पासवर्ड भूल गए?',
    'already_account': 'पहले से खाता है?',
    'no_account': 'खाता नहीं है?',
    
    // Profile
    'profile_details': 'प्रोफ़ाइल विवरण',
    'reward_points': 'रिवार्ड पॉइंट्स',
    'reported': 'रिपोर्ट की गई',
    'solved': 'हल की गई',
    'rating': 'रेटिंग',
    
    // Settings
    'other_settings': 'अन्य सेटिंग्स',
    'notifications': 'अधिसूचनाएं',
    'dark_mode': 'डार्क मोड',
    'language': 'भाषा',
    'about_application': 'एप्लिकेशन के बारे में',
    'help_faq': 'सहायता/FAQ',
    'deactivate_account': 'खाता निष्क्रिय करें',
    
    // Languages
    'english': 'अंग्रेजी',
    'hindi': 'हिंदी',
    'telugu': 'तेलुगु',
    
    // Report
    'report_title': 'रिपोर्ट शीर्षक',
    'describe_problem': 'समस्या का वर्णन करें',
    'select_category': 'श्रेणी चुनें',
    'select_urgency': 'तात्कालिकता चुनें',
    'location': 'स्थान',
    'add_photos': 'फोटो जोड़ें',
    'submit_report': 'रिपोर्ट जमा करें',
    'submitting': 'जमा किया जा रहा है...',
    'report_submitted': 'रिपोर्ट सफलतापूर्वक जमा की गई!',
    
    // Categories
    'road_infrastructure': 'सड़क और बुनियादी ढांचा',
    'water_sanitation': 'पानी और स्वच्छता',
    'electricity': 'बिजली',
    'public_safety': 'सार्वजनिक सुरक्षा',
    
    // Urgency
    'low': 'कम',
    'medium': 'मध्यम',
    'high': 'उच्च',
    'critical': 'गंभीर'
  },
  te: {
    // Navigation
    'welcome': 'తిరిగి స్వాగతం',
    'namaste': 'నమస్తే, రాజేష్!',
    'ready_to_help': 'తెలంగాణను మెరుగుపరచడానికి సిద్ధంగా ఉన్నారా?',
    'settings': 'సెట్టింగులు',
    'report_problem': 'సమస్యను నివేదించండి',
    'view_reports': 'నా నివేదికలను చూడండి',
    'history': 'చరిత్ర',
    'map': 'మ్యాప్',
    
    // Authentication
    'sign_in': 'సైన్ ఇన్',
    'sign_up': 'సైన్ అప్',
    'create_account': 'ఖాతా సృష్టించండి',
    'welcome_back': 'తిరిగి స్వాగతం',
    'sign_in_continue': 'కొనసాగించడానికి సైన్ ఇన్ చేయండి',
    'join_community': 'TG FixIt కమ్యూనిటీలో చేరండి',
    'full_name': 'పూర్తి పేరు',
    'address': 'చిరునామా',
    'email_address': 'ఇమెయిల్ చిరునామా',
    'aadhaar_number': 'ఆధార్ నంబర్',
    'email_mobile': 'ఇమెయిల్ లేదా మొబైల్',
    'password': 'పాస్వర్డ్',
    'forgot_password': 'పాస్వర్డ్ మర్చిపోయారా?',
    'already_account': 'ఇప్పటికే ఖాతా ఉందా?',
    'no_account': 'ఖాతా లేదా?',
    
    // Profile
    'profile_details': 'ప్రొఫైల్ వివరాలు',
    'reward_points': 'రివార్డ్ పాయింట్లు',
    'reported': 'నివేదించబడింది',
    'solved': 'పరిష్కరించబడింది',
    'rating': 'రేటింగ్',
    
    // Settings
    'other_settings': 'ఇతర సెట్టింగులు',
    'notifications': 'నోటిఫికేషన్లు',
    'dark_mode': 'డార్క్ మోడ్',
    'language': 'భాష',
    'about_application': 'అప్లికేషన్ గురించి',
    'help_faq': 'సహాయం/FAQ',
    'deactivate_account': 'ఖాతాను నిష్క్రియం చేయండి',
    
    // Languages
    'english': 'ఇంగ్లీష్',
    'hindi': 'హిందీ',
    'telugu': 'తెలుగు',
    
    // Report
    'report_title': 'నివేదిక శీర్షిక',
    'describe_problem': 'సమస్యను వివరించండి',
    'select_category': 'వర్గాన్ని ఎంచుకోండి',
    'select_urgency': 'అత్యవసరతను ఎంచుకోండి',
    'location': 'స్థానం',
    'add_photos': 'ఫోటోలను జోడించండి',
    'submit_report': 'నివేదికను సమర్పించండి',
    'submitting': 'సమర్పిస్తోంది...',
    'report_submitted': 'నివేదిక విజయవంతంగా సమర్పించబడింది!',
    
    // Categories
    'road_infrastructure': 'రోడ్ & ఇన్ఫ్రాస్ట్రక్చర్',
    'water_sanitation': 'నీరు & పారిశుధ్యత',
    'electricity': 'విద్యుత్',
    'public_safety': 'పబ్లిక్ సేఫ్టీ',
    
    // Urgency
    'low': 'తక్కువ',
    'medium': 'మధ్యమ',
    'high': 'అధిక',
    'critical': 'క్రిటికల్'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'te'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
