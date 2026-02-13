
import React from 'react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: AppTab.HOME, label: 'Accueil', icon: '🏠' },
    { id: AppTab.ORGANIZE, label: 'S\'organiser', icon: '📅' },
    { id: AppTab.RELAX, label: 'Se détendre', icon: '🌿' },
    { id: AppTab.GAMES, label: 'Jeux', icon: '🧩' },
    { id: AppTab.ABOUT, label: 'À propos', icon: '✨' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setActiveTab(AppTab.HOME)}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">Z</div>
          <span className="font-bold text-gray-800 text-lg hidden sm:inline">Zenya</span>
        </div>
        
        <div className="flex space-x-1 sm:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
