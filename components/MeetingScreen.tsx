import React, { useState, useEffect, useMemo } from 'react';
import { TargetIcon } from './icons/TargetIcon';
import { ListIcon } from './icons/ListIcon';

const MeetingPhase = {
  Introduction: 0,
  Discussion: 1,
  NextActions: 2,
  WrapUp: 3,
  Finished: 4,
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const getPhaseInfo = (phase) => {
  switch (phase) {
    case MeetingPhase.Introduction:
      return { message: "会議を始めましょう。ゴールとアジェンダの認識を合わせる時間です。", color: 'bg-sky-500' };
    case MeetingPhase.Discussion:
      return { message: "メインの議論を進めています。会話を集中させましょう。", color: 'bg-green-500' };
    case MeetingPhase.NextActions:
      return { message: "明確なネクストアクションと担当者を決める時間です。", color: 'bg-yellow-500' };
    case MeetingPhase.WrapUp:
      return { message: "まとめの時間です。主要な決定事項と次のステップを要約しましょう。", color: 'bg-orange-500' };
    case MeetingPhase.Finished:
      return { message: "時間です！会議は終了しました。", color: 'bg-red-500' };
    default:
      return { message: '', color: 'bg-slate-700' };
  }
};


function MeetingScreen({ meetingData, onEnd }) {
  const totalSeconds = useMemo(() => meetingData.duration * 60, [meetingData.duration]);
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }
    const timerId = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeRemaining]);

  const currentPhase = useMemo(() => {
    if (timeRemaining <= 0) return MeetingPhase.Finished;
    const progress = (totalSeconds - timeRemaining) / totalSeconds;
    if (progress < 0.1) return MeetingPhase.Introduction;
    if (progress < 0.8) return MeetingPhase.Discussion;
    if (progress < 0.95) return MeetingPhase.NextActions;
    return MeetingPhase.WrapUp;
  }, [timeRemaining, totalSeconds]);

  const progressPercentage = useMemo(() => {
    return Math.min(((totalSeconds - timeRemaining) / totalSeconds) * 100, 100);
  }, [timeRemaining, totalSeconds]);

  const phaseInfo = getPhaseInfo(currentPhase);
  const timerColor = timeRemaining <= 60 ? 'text-red-400' : timeRemaining <= 300 ? 'text-yellow-400' : 'text-sky-400';

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-sky-900/20 border border-slate-700 w-full animate-fade-in space-y-8">
      
      {/* Timer and Progress */}
      <div className="text-center">
        <p className={`text-8xl font-black tabular-nums transition-colors duration-300 ${timerColor}`}>{formatTime(timeRemaining)}</p>
        <div className="w-full bg-slate-700 rounded-full h-4 mt-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-500 ease-out ${phaseInfo.color}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Prompt/Notification */}
      <div className="bg-slate-900/50 p-4 rounded-lg text-center border border-slate-700">
        <p className="text-lg font-medium text-slate-200">{phaseInfo.message}</p>
      </div>

      {/* Meeting Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold text-sky-400 mb-3 flex items-center">
            <TargetIcon className="w-6 h-6 mr-3"/>
            会議のゴール
          </h2>
          <p className="text-slate-300 whitespace-pre-wrap">{meetingData.goal}</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold text-sky-400 mb-3 flex items-center">
            <ListIcon className="w-6 h-6 mr-3"/>
            アジェンダ
          </h2>
          <p className="text-slate-300 whitespace-pre-wrap">{meetingData.agenda}</p>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <button
          onClick={onEnd}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
        >
          会議を終了
        </button>
      </div>
    </div>
  );
}

export default MeetingScreen;
