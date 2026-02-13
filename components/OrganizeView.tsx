
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

const OrganizeView: React.FC = () => {
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      const nextSession = !isBreak;
      setIsBreak(nextSession);
      setTimeLeft(nextSession ? 5 * 60 : 25 * 60);
      alert(nextSession ? "C'est l'heure de la pause !" : "C'est l'heure de se concentrer !");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const addTask = (priority: 'high' | 'medium' | 'low') => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800">Organisation Efficace</h2>
      
      {/* Pomodoro Section */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold mb-2">Méthode Pomodoro</h3>
        <p className="text-gray-500 text-sm mb-6 italic">25 min de travail concentré, 5 min de pause.</p>
        
        <div className={`text-7xl font-mono font-bold mb-8 ${isBreak ? 'text-emerald-500' : 'text-indigo-600'}`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-full font-bold text-white transition-all ${
              isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isActive ? 'Pause' : 'Démarrer'}
          </button>
          <button 
            onClick={resetTimer}
            className="px-8 py-3 rounded-full font-bold bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Réinitialiser
          </button>
        </div>
      </section>

      {/* Eisenhower Matrix / Task Prioritization */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Matrice de Priorité</h3>
        <div className="flex space-x-2 mb-6">
          <input 
            type="text" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Nouvelle tâche..."
            className="flex-grow p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button onClick={() => addTask('high')} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-200">Urgent</button>
          <button onClick={() => addTask('medium')} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-200">Important</button>
          <button onClick={() => addTask('low')} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-gray-200">À faire</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['high', 'medium', 'low'] as const).map(prio => (
            <div key={prio} className="space-y-3">
              <h4 className={`text-xs font-bold uppercase tracking-widest ${
                prio === 'high' ? 'text-red-500' : prio === 'medium' ? 'text-blue-500' : 'text-gray-500'
              }`}>
                {prio === 'high' ? 'Urgent & Important' : prio === 'medium' ? 'Important' : 'Secondaire'}
              </h4>
              <div className="bg-gray-50 p-3 rounded-xl min-h-[100px] space-y-2">
                {tasks.filter(t => t.priority === prio).map(task => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-2 rounded bg-white border cursor-pointer text-sm flex items-center transition-opacity ${
                      task.completed ? 'opacity-50 line-through' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      prio === 'high' ? 'bg-red-400' : prio === 'medium' ? 'bg-blue-400' : 'bg-gray-400'
                    }`} />
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OrganizeView;
