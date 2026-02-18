
import React, { useState, useEffect } from 'react';
import { PRAYER_METADATA } from '../constants';
import { PrayerKey, QazaState } from '../types';
import { Plus, Minus, Calculator, CalendarDays, RefreshCw, CheckCircle2, ArrowDown, AlertCircle } from 'lucide-react';

interface QazaDashboardProps {
  qazaState: QazaState;
  updateQaza: (key: PrayerKey, delta: number) => void;
  setBulkQazaDays: (days: number) => void;
}

export const QazaDashboard: React.FC<QazaDashboardProps> = ({ qazaState, updateQaza, setBulkQazaDays }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputMode, setInputMode] = useState<'years' | 'days'>('years');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const remainingDays = Math.max(...(Object.values(qazaState) as number[]));
  const LUNAR_YEAR_DAYS = 354.36;

  const getCalculatedDays = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return 0;
    return inputMode === 'years' ? Math.round(val * LUNAR_YEAR_DAYS) : Math.round(val);
  };

  const calculatedDays = getCalculatedDays();

  useEffect(() => {
    setShowConfirm(false);
  }, [inputValue, inputMode]);

  const handleBulkAction = () => {
    if (calculatedDays <= 0) return;
    
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setBulkQazaDays(calculatedDays);
    setInputValue('');
    setShowConfirm(false);
    setFeedback(`تمت إضافة ${calculatedDays} يوم بنجاح!`);
    setHighlight(true);
    
    setTimeout(() => setHighlight(false), 2500);
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <section className="animate-in fade-in duration-500 space-y-6">
      {/* سجل القضاء العلوي */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-emerald-900">سجل القضاء</h2>
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg shadow-emerald-100">
            الأيام المتبقية: {remainingDays}
          </div>
        </div>

        <div className="space-y-4">
          {PRAYER_METADATA.map((p) => (
            <div key={p.key} className={`flex items-center justify-between p-2 rounded-2xl transition-all duration-700 ${highlight ? 'bg-emerald-50 scale-[1.02]' : 'bg-transparent'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 ${p.color}`}>
                  {React.cloneElement(p.icon as React.ReactElement, { size: 24 })}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700">{p.label}</span>
                  {p.subLabel && <span className="text-[10px] text-slate-400 font-bold">{p.subLabel}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateQaza(p.key as PrayerKey, -1)} 
                  disabled={qazaState[p.key as PrayerKey] <= 0} 
                  className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center disabled:opacity-20 active:scale-90 transition-transform"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <div className="relative w-16 flex flex-col items-center">
                  <div className={`text-2xl font-black text-slate-800 tabular-nums transition-all duration-500 ${highlight ? 'text-emerald-600 scale-125' : ''}`}>
                    {qazaState[p.key as PrayerKey]}
                  </div>
                  {calculatedDays > 0 && showConfirm && (
                    <div className="absolute -bottom-4 text-[10px] font-bold text-emerald-500 animate-bounce">
                      +{calculatedDays}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => updateQaza(p.key as PrayerKey, 1)} 
                  className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* حاسبة القضاء بالجملة */}
      <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden transition-all border border-emerald-800">
        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 -z-0"><Calculator size={150} /></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <RefreshCw size={24} className="text-emerald-400" /> إضافة فترات قضاء
            </h3>
            <button 
              onClick={() => { setInputMode(inputMode === 'years' ? 'days' : 'years'); setInputValue(''); }} 
              className="text-xs bg-emerald-800 px-4 py-2 rounded-full border border-emerald-700 hover:bg-emerald-700 transition-colors font-black"
            >
              التبديل لـ {inputMode === 'years' ? 'الأيام' : 'السنوات'}
            </button>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input 
                type="number" 
                inputMode="decimal"
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder={inputMode === 'years' ? "مثلاً 1.5 سنة" : "مثلاً 30 يوم"} 
                className="w-full bg-emerald-950/40 border-2 border-emerald-700/50 rounded-2xl px-6 py-5 text-3xl font-black placeholder:text-emerald-800/60 outline-none focus:border-emerald-400 transition-all text-center text-emerald-100" 
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-lg pointer-events-none">
                {inputMode === 'years' ? 'سنة' : 'يوم'}
              </span>
            </div>

            {calculatedDays > 0 && (
              <div className="bg-emerald-800/40 p-5 rounded-3xl border border-emerald-700/30 flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                <div className="flex items-center gap-3 w-full">
                  <CalendarDays className="text-emerald-400 flex-shrink-0" size={28} />
                  <div>
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">المجموع المحسوب</p>
                    <p className="text-2xl font-black text-white">{calculatedDays} يوم قضاء</p>
                  </div>
                </div>
                {showConfirm && (
                  <div className="w-full flex items-center gap-2 mt-2 p-3 bg-emerald-500/10 rounded-xl border border-emerald-400/20 text-emerald-300 text-[11px] font-bold">
                    <AlertCircle size={16} />
                    اضغط مرة أخرى للتأكيد وإضافة القيمة للسجل
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handleBulkAction} 
              disabled={calculatedDays <= 0} 
              className={`w-full py-5 rounded-[2rem] text-xl font-black active:scale-95 transition-all shadow-xl disabled:opacity-20 flex items-center justify-center gap-3 group ${showConfirm ? 'bg-orange-500 hover:bg-orange-400 text-orange-950' : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950'}`}
            >
              {showConfirm ? (
                <>تأكيد الإضافة الآن <CheckCircle2 size={24} /></>
              ) : (
                <>{calculatedDays > 0 ? <ArrowDown className="group-hover:translate-y-1 transition-transform" /> : <Plus />} إضافة للسجل</>
              )}
            </button>

            {feedback && (
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm bg-emerald-800/40 py-4 rounded-2xl border border-emerald-700 animate-in slide-in-from-bottom-2">
                <CheckCircle2 size={20} className="text-emerald-400" /> 
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
