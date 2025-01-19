import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="language-toggle"
    >
      {language === 'he' ? 'English' : 'עברית'}
    </button>
  );
}; 