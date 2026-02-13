
import React, { useState } from 'react';
import { AppTab } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import OrganizeView from './components/OrganizeView';
import RelaxView from './components/RelaxView';
import GamesView from './components/GamesView';
import AboutView from './components/AboutView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return <HomeView onNavigate={setActiveTab} />;
      case AppTab.ORGANIZE:
        return <OrganizeView />;
      case AppTab.RELAX:
        return <RelaxView />;
      case AppTab.GAMES:
        return <GamesView />;
      case AppTab.ABOUT:
        return <AboutView />;
      default:
        return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
      
      <footer className="hidden md:block py-6 bg-white border-t text-center text-sm text-gray-500">
        © 2024 Zenya - Cultiver la sérénité scolaire
      </footer>
    </div>
  );
};

export default App;
