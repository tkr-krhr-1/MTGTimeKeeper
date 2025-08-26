import React, { useState, useCallback } from 'react';
import { ClockIcon } from './icons/ClockIcon';
import { TargetIcon } from './icons/TargetIcon';
import { ListIcon } from './icons/ListIcon';

function SetupScreen({ onStart, initialData }) {
  const [goal, setGoal] = useState(initialData?.goal || '');
  const [agenda, setAgenda] = useState(initialData?.agenda || '');
  const [duration, setDuration] = useState(initialData?.duration || 30);
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!goal.trim() || !agenda.trim() || duration <= 0) {
      setError('すべての項目を入力してください。会議時間は1分以上である必要があります。');
      return;
    }
    setError('');
    onStart({ goal, agenda, duration });
  }, [goal, agenda, duration, onStart]);

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-sky-900/20 border border-slate-700 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-sky-400">会議タイムキーパー</h1>
        <p className="text-slate-400 mt-2">会議の目的とアジェンダを設定して、時間通りに進めましょう。</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="goal" className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
            <TargetIcon className="w-5 h-5 mr-2 text-sky-400" />
            会議のゴール
          </label>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="例：Q3マーケティング戦略の決定"
            className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-200"
          />
        </div>

        <div className="relative">
          <label htmlFor="agenda" className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
            <ListIcon className="w-5 h-5 mr-2 text-sky-400" />
            アジェンダ（1行に1項目）
          </label>
          <textarea
            id="agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            rows={5}
            placeholder="例：&#10;1. Q2のパフォーマンスレビュー&#10;2. 新しいキャンペーンのアイデア出し&#10;3. 予算配分の最終決定"
            className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-200 resize-y"
          />
        </div>

        <div className="relative">
          <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
            <ClockIcon className="w-5 h-5 mr-2 text-sky-400" />
            会議時間（分）
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
            min="1"
            className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-200"
          />
        </div>
        
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
        >
          会議を開始
        </button>
      </form>
    </div>
  );
}

export default SetupScreen;
