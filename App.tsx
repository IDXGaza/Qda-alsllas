
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DailyTracker } from './components/DailyTracker';
import { QazaDashboard } from './components/QazaDashboard';
import { Guide } from './components/Guide';
import { PrayerKey, DailyPrayers, QazaState } from './types';
import { INITIAL_QAZA } from './constants';
import { getSpiritualInsight } from './services/geminiService';
import { Sparkles, Calendar, BookOpen, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'qaza' | 'guide'>('today');
  const [daily, setDaily] = useState<DailyPrayers>(() => {
    const saved = localStorage.getItem('seraj_daily_v2');
    return saved ? JSON.parse(saved) : {};
  });
  const [qaza, setQaza] = useState<QazaState>(() => {
    const saved = localStorage.getItem('seraj_qaza_v2');
    return saved ? JSON.parse(saved) : INITIAL_QAZA;
  });
  const [insight, setInsight] = useState<string>('جارٍ تحميل نفحات إيمانية...');

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    localStorage.setItem('seraj_daily_v2', JSON.stringify(daily));
  }, [daily]);

  useEffect(() => {
    localStorage.setItem('seraj_qaza_v2', JSON.stringify(qaza));
  }, [qaza]);

  useEffect(() => {
    const fetchInsight = async () => {
      const total = (Object.values(qaza) as number[]).reduce((a, b) => a + b, 0);
      const res = await getSpiritualInsight("المؤمن", total);
      setInsight(res);
    };
    fetchInsight();
  }, [qaza]);

  const handleDailyAction = (key: PrayerKey, completed: boolean) => {
    setDaily(prev => ({
      ...prev,
      [todayStr]: {
        ...(prev[todayStr] || {}),
        [key]: completed
      }
    }));

    if (!completed) {
      setQaza(prev => ({
        ...prev,
        [key]: prev[key] + 1
      }));
    }
  };

  const resetToday = () => {
    if (confirm('هل تريد مسح تقييم اليوم والبدء من جديد؟')) {
      setDaily(prev => {
        const newData = { ...prev };
        delete newData[todayStr];
        return newData;
      });
    }
  };

  const updateQaza = (key: PrayerKey, delta: number) => {
    setQaza(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const setBulkQazaDays = (days: number) => {
    if (days <= 0) return;
    setQaza(prev => ({
      [PrayerKey.FAJR]: prev[PrayerKey.FAJR] + days,
      [PrayerKey.DHUHR_ASR]: prev[PrayerKey.DHUHR_ASR] + days,
      [PrayerKey.MAGHRIB_ISHA]: prev[PrayerKey.MAGHRIB_ISHA] + days,
    }));
  };

  const getTodayStatus = () => {
    return (daily[todayStr] || {}) as Record<PrayerKey, boolean | null>;
  };

  return (
    <Layout>
      <div className="mb-6 bg-emerald-50 border border-emerald-100 p-5 rounded-[2rem] flex items-start gap-3 shadow-sm">
        <Sparkles className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
        <p className="text-emerald-900 text-sm leading-relaxed quran-font italic">
          {insight}
        </p>
      </div>

      <div className="pb-20">
        {activeTab === 'today' && (
          <DailyTracker 
            todayStatus={getTodayStatus()} 
            onAction={handleDailyAction}
            onReset={resetToday}
          />
        )}
        {activeTab === 'qaza' && (
          <QazaDashboard 
            qazaState={qaza} 
            updateQaza={updateQaza} 
            setBulkQazaDays={setBulkQazaDays} 
          />
        )}
        {activeTab === 'guide' && (
          <Guide />
        )}
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/90 backdrop-blur-xl border-t border-slate-200 py-3 px-6 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <NavButton active={activeTab === 'today'} onClick={() => setActiveTab('today')} icon={<Calendar size={24} />} label="اليوم" />
        <NavButton active={activeTab === 'qaza'} onClick={() => setActiveTab('qaza')} icon={<BookOpen size={24} />} label="القضاء" />
        <NavButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={<HelpCircle size={24} />} label="الأحكام" />
      </nav>
    </Layout>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${active ? 'text-emerald-700 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
    <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-emerald-50' : ''}`}>{icon}</div>
    <span className={`text-[11px] font-black ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </button>
);

export default App;
