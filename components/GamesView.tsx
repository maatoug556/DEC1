
import React, { useState, useEffect, useRef } from 'react';
import { Riddle } from '../types';

const riddles: Riddle[] = [
  { id: 1, question: "Qu'est-ce qui appartient à toi, mais que les autres utilisent plus que toi ?", answer: "ton prénom", hint: "C'est comment on t'appelle." },
  { id: 2, question: "Plus j'en ai, moins on y voit. Qui suis-je ?", answer: "l'obscurité", hint: "Opposé de la lumière." },
  { id: 3, question: "Qu'est-ce qui est aussi grand qu'un éléphant mais ne pèse rien ?", answer: "son ombre", hint: "Elle te suit quand il y a du soleil." },
  { id: 4, question: "J'ai des villes, mais pas de maisons. J'ai des montagnes, mais pas d'arbres. J'ai de l'eau, mais pas de poissons. Qui suis-je ?", answer: "une carte", hint: "Tu l'utilises pour te repérer." },
];

const COLORS = [
  { name: 'Rouge', class: 'text-red-500', bg: 'bg-red-500' },
  { name: 'Bleu', class: 'text-blue-500', bg: 'bg-blue-500' },
  { name: 'Vert', class: 'text-green-500', bg: 'bg-green-500' },
  { name: 'Jaune', class: 'text-yellow-500', bg: 'bg-yellow-500' },
];

const GamesView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'riddles' | 'memory' | 'math' | 'colors' | 'sequence'>('riddles');

  // Riddle State
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [riddleFeedback, setRiddleFeedback] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  // Memory State
  const [memoryGrid, setMemoryGrid] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const symbols = ['🦁', '🦊', '🐻', '🐼', '🐨', '🐯'];

  // Math State
  const [mathProblem, setMathProblem] = useState({ a: 0, b: 0, op: '+', result: 0 });
  const [mathInput, setMathInput] = useState('');
  const [mathScore, setMathScore] = useState(0);

  // Color Match State
  const [colorChallenge, setColorChallenge] = useState({ text: '', colorIndex: 0 });
  const [colorScore, setColorScore] = useState(0);

  // Sequence State
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSeqIndex, setUserSeqIndex] = useState(0);
  const [isShowingSeq, setIsShowingSeq] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    if (activeGame === 'memory') resetMemory();
    if (activeGame === 'math') generateMath();
    if (activeGame === 'colors') generateColor();
    if (activeGame === 'sequence') startSequence();
  }, [activeGame]);

  const resetMemory = () => {
    const grid = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setMemoryGrid(grid.map(s => symbols.indexOf(s)));
    setSolved([]);
    setSelected([]);
  };

  const generateMath = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    setMathProblem({ a, b, op, result: op === '+' ? a + b : a - b });
    setMathInput('');
  };

  const generateColor = () => {
    const textIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    setColorChallenge({ text: COLORS[textIdx].name, colorIndex: colorIdx });
  };

  const handleColorClick = (idx: number) => {
    if (idx === colorChallenge.colorIndex) {
      setColorScore(colorScore + 1);
      generateColor();
    } else {
      setColorScore(0);
      generateColor();
    }
  };

  const startSequence = () => {
    setSequence([Math.floor(Math.random() * 4)]);
    setUserSeqIndex(0);
    showSequence([Math.floor(Math.random() * 4)]);
  };

  const showSequence = async (newSeq: number[]) => {
    setIsShowingSeq(true);
    setSequence(newSeq);
    for (let i = 0; i < newSeq.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setActiveButton(newSeq[i]);
      await new Promise(r => setTimeout(r, 400));
      setActiveButton(null);
    }
    setIsShowingSeq(false);
    setUserSeqIndex(0);
  };

  const handleSeqClick = (idx: number) => {
    if (isShowingSeq) return;
    if (idx === sequence[userSeqIndex]) {
      if (userSeqIndex === sequence.length - 1) {
        const next = [...sequence, Math.floor(Math.random() * 4)];
        showSequence(next);
      } else {
        setUserSeqIndex(userSeqIndex + 1);
      }
    } else {
      alert("Perdu ! Recommençons.");
      startSequence();
    }
  };

  const handleRiddleCheck = () => {
    const normalize = (s: string) => s.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    if (normalize(userAnswer).includes(normalize(riddles[currentRiddle].answer))) {
      setRiddleFeedback({ type: 'success', msg: 'Bravo ! C\'est la bonne réponse.' });
    } else {
      setRiddleFeedback({ type: 'error', msg: 'Pas tout à fait... réessaye !' });
    }
  };

  const handleMemoryClick = (index: number) => {
    if (selected.length === 2 || selected.includes(index) || solved.includes(index)) return;
    const newSelected = [...selected, index];
    setSelected(newSelected);
    if (newSelected.length === 2) {
      if (memoryGrid[newSelected[0]] === memoryGrid[newSelected[1]]) {
        setSolved([...solved, ...newSelected]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Détente Intelligente</h2>
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-xl gap-1">
          {['riddles', 'memory', 'math', 'colors', 'sequence'].map(game => (
            <button 
              key={game}
              onClick={() => setActiveGame(game as any)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeGame === game ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
            >
              {game === 'riddles' ? 'Énigmes' : game === 'memory' ? 'Mémoire' : game === 'math' ? 'Calcul' : game === 'colors' ? 'Réflexes' : 'Séquence'}
            </button>
          ))}
        </div>
      </div>
      
      {activeGame === 'riddles' && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Casse-tête #{riddles[currentRiddle].id}</span>
            <span className="text-xs text-gray-400">{currentRiddle + 1} / {riddles.length}</span>
          </div>
          <p className="text-xl font-medium text-gray-800 mb-8 leading-relaxed italic">« {riddles[currentRiddle].question} »</p>
          <div className="space-y-4">
            <input 
              type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRiddleCheck()}
              placeholder="Ta réponse..." className="w-full p-4 border rounded-xl focus:border-amber-400 outline-none"
            />
            <div className="flex space-x-3">
              <button onClick={handleRiddleCheck} className="flex-grow bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl">Vérifier</button>
              <button onClick={() => setShowHint(true)} className="px-4 py-3 bg-amber-50 text-amber-600 font-medium rounded-xl">Indice 💡</button>
            </div>
            {riddleFeedback.type && (
              <div className={`p-4 rounded-xl text-center font-medium ${riddleFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {riddleFeedback.msg}
                {riddleFeedback.type === 'success' && <button onClick={() => {setCurrentRiddle((currentRiddle+1)%riddles.length); setUserAnswer(''); setRiddleFeedback({type:null, msg:''}); setShowHint(false);}} className="block mx-auto mt-2 text-sm underline font-bold">Suivant →</button>}
              </div>
            )}
          </div>
        </section>
      )}

      {activeGame === 'memory' && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <h3 className="text-center font-bold text-gray-700 mb-6">Mémorisez les paires</h3>
          <div className="grid grid-cols-4 gap-3">
            {memoryGrid.map((val, idx) => (
              <div key={idx} onClick={() => handleMemoryClick(idx)}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
                  selected.includes(idx) || solved.includes(idx) ? 'bg-indigo-50' : 'bg-indigo-600'
                }`}
              >
                {(selected.includes(idx) || solved.includes(idx)) ? symbols[val] : ''}
              </div>
            ))}
          </div>
          {solved.length === memoryGrid.length && <button onClick={resetMemory} className="mt-6 w-full py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg">Rejouer 🎉</button>}
        </section>
      )}

      {activeGame === 'math' && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm mx-auto text-center">
          <div className="mb-4 text-sm text-gray-500 font-bold">Score: {mathScore}</div>
          <h3 className="text-5xl font-mono font-bold mb-8 text-gray-800">{mathProblem.a} {mathProblem.op} {mathProblem.b}</h3>
          <input type="number" value={mathInput} autoFocus onChange={(e) => setMathInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (parseInt(mathInput) === mathProblem.result ? (setMathScore(mathScore+1), generateMath()) : setMathInput(''))}
            className="w-full text-center p-4 text-2xl border rounded-xl outline-none mb-4"
          />
        </section>
      )}

      {activeGame === 'colors' && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm mx-auto text-center">
          <div className="mb-4 text-sm text-gray-500">Score: {colorScore}</div>
          <p className="text-sm text-gray-400 mb-2 font-medium">Cliquez sur la couleur de l'encre (pas le mot) :</p>
          <h3 className={`text-6xl font-black mb-10 ${COLORS[colorChallenge.colorIndex].class}`}>
            {colorChallenge.text}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {COLORS.map((c, i) => (
              <button key={i} onClick={() => handleColorClick(i)} className={`${c.bg} h-16 rounded-xl shadow-sm hover:scale-105 transition-transform`} />
            ))}
          </div>
        </section>
      )}

      {activeGame === 'sequence' && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm mx-auto text-center">
          <div className="mb-4 text-sm text-gray-500">Séquence: {sequence.length}</div>
          <div className="grid grid-cols-2 gap-4 aspect-square">
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => handleSeqClick(i)}
                className={`rounded-2xl transition-all duration-200 border-4 border-white shadow-md ${
                  i === 0 ? 'bg-red-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-green-500' : 'bg-yellow-500'
                } ${activeButton === i ? 'opacity-100 scale-105 brightness-125' : 'opacity-40'}`}
              />
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">{isShowingSeq ? 'Observez bien...' : 'À vous !'}</p>
        </section>
      )}
    </div>
  );
};

export default GamesView;
