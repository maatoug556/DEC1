
import React, { useState, useEffect } from 'react';

const RelaxView: React.FC = () => {
  const [breathePhase, setBreathePhase] = useState<'inspire' | 'maintien' | 'expire'>('inspire');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          if (breathePhase === 'inspire') {
            setBreathePhase('maintien');
            return 4;
          } else if (breathePhase === 'maintien') {
            setBreathePhase('expire');
            return 4;
          } else {
            setBreathePhase('inspire');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathePhase]);

  const getPhaseText = () => {
    switch (breathePhase) {
      case 'inspire': return 'Inspirez lentement...';
      case 'maintien': return 'Maintenez...';
      case 'expire': return 'Expirez doucement...';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800">Gestion du Stress</h2>

      <section className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center overflow-hidden">
        <h3 className="text-xl font-semibold mb-8">Respiration Carrée</h3>
        
        <div className="relative flex items-center justify-center w-64 h-64">
          <div className={`absolute w-32 h-32 bg-indigo-500 rounded-full blur-xl transition-all duration-1000 ${
            breathePhase === 'inspire' ? 'scale-[2] opacity-60' : breathePhase === 'maintien' ? 'scale-[2] opacity-80' : 'scale-100 opacity-30'
          }`} />
          <div className={`z-10 w-32 h-32 border-4 border-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700 bg-white transition-all duration-1000 ${
            breathePhase === 'inspire' ? 'scale-[1.8]' : breathePhase === 'maintien' ? 'scale-[1.8]' : 'scale-100'
          }`}>
            {counter}
          </div>
        </div>
        
        <p className="mt-12 text-2xl font-medium text-indigo-900 h-8">
          {getPhaseText()}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-2">💡 La Pause Active</h4>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Toutes les heures, lève-toi 5 minutes. Étire tes bras, marche un peu et bois un verre d'eau. Cela réinitialise ta concentration.
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-2">🧘 La Pleine Conscience</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            Ferme les yeux et identifie 3 bruits autour de toi, 3 sensations physiques (tes pieds au sol, l'air sur ton visage) et 1 odeur.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RelaxView;
