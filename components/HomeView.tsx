
import React from 'react';
import { AppTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: AppTab) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Bienvenue sur <span className="text-indigo-600">Zenya</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transformez votre stress en sérénité et votre organisation en succès scolaire.
        </p>
      </header>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🚨</span> Pourquoi Zenya ?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-sm text-red-800 font-medium">L'urgence</p>
            <p className="mt-1 text-red-700">Le stress touche 98% des élèves. Il est temps d'agir pour votre santé mentale.</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-sm text-orange-800 font-medium">L'objectif</p>
            <p className="mt-1 text-orange-700">Fournir des outils concrets pour ne plus se sentir dépassé par les devoirs.</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <button 
          onClick={() => onNavigate(AppTab.ORGANIZE)}
          className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📅</div>
          <h3 className="font-bold text-gray-900 mb-2">S'organiser</h3>
          <p className="text-sm text-gray-500">Gérez votre temps avec Pomodoro et priorisez vos priorités.</p>
        </button>

        <button 
          onClick={() => onNavigate(AppTab.RELAX)}
          className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
          <h3 className="font-bold text-gray-900 mb-2">Se détendre</h3>
          <p className="text-sm text-gray-500">Respirez et retrouvez votre calme en quelques secondes.</p>
        </button>

        <button 
          onClick={() => onNavigate(AppTab.GAMES)}
          className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🧩</div>
          <h3 className="font-bold text-gray-900 mb-2">Jeux Logiques</h3>
          <p className="text-sm text-gray-500">Détendez-vous intelligemment avec nos nouveaux défis.</p>
        </button>
      </div>
    </div>
  );
};

export default HomeView;
