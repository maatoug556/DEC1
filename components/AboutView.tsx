
import React from 'react';

const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800">À propos de Zenya</h2>
        <p className="text-gray-600 max-w-xl mx-auto italic">
          "Pour que chaque élève puisse apprendre sans sacrifier son bien-être."
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">Notre Mission</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Zenya est né d'un projet éducatif concret visant à combattre le stress scolaire. Nous croyons que l'organisation et la détente ne sont pas des options, mais des nécessités pour la réussite sur le long terme.
            <br/><br/>
            Inspiré par des événements réels et des statistiques alarmantes (98% de stress étudiant), ce site offre des solutions simples et accessibles gratuitement.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">La Technologie</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Développé initialement comme un concept en Python, Zenya utilise aujourd'hui une pile web moderne pour garantir vitesse et accessibilité sur tous les appareils (ordinateurs, tablettes et téléphones).
            <br/><br/>
            Chaque outil, du minuteur Pomodoro aux exercices de respiration, est conçu pour être minimaliste et efficace, sans surcharge mentale inutile.
          </p>
        </section>
      </div>

      <section className="bg-indigo-600 text-white p-8 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Contact & Soutien</h3>
        <p className="opacity-90 text-sm mb-6">Ce projet est open-source et évolue grâce aux retours des élèves et des enseignants. N'hésitez pas à partager Zenya autour de vous.</p>
        <div className="flex justify-center space-x-4">
          <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-wide">ÉDUCATION</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-wide">BIEN-ÊTRE</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-wide">LOGIQUE</span>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
