
import React, { useState, useRef } from 'react';
import { PRAYER_METADATA } from '../constants';
import { PrayerKey } from '../types';
import { Check, X, RotateCcw, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

interface DailyTrackerProps {
  todayStatus: Record<PrayerKey, boolean | null>;
  onAction: (key: PrayerKey, completed: boolean) => void;
  onReset: () => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({ todayStatus, onAction, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<'right' | 'left' | null>(null);
  
  const startX = useRef(0);
  const prayers = PRAYER_METADATA;
  const isFinished = currentIndex >= prayers.length;

  const handleAction = (completed: boolean) => {
    setExitDirection(completed ? 'right' : 'left');
    setTimeout(() => {
      onAction(prayers[currentIndex].key as PrayerKey, completed);
      setCurrentIndex(prev => prev + 1);
      setExitDirection(null);
      setDragX(0);
    }, 300);
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = currentX - startX.current;
    setDragX(diff);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX > 100) handleAction(true);
    else if (dragX < -100) handleAction(false);
    else setDragX(0);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Sparkles className="text-emerald-600 w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">تقبل الله طاعتكم</h3>
        <p className="text-slate-500 mb-8 font-medium">تم الانتهاء من مراجعة صلوات اليوم.</p>
        <button
          onClick={() => {
            onReset();
            setCurrentIndex(0);
          }}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-8 py-4 rounded-3xl hover:bg-emerald-100 transition-all active:scale-95 shadow-sm"
        >
          <RotateCcw size={20} /> إعادة تقييم اليوم
        </button>
      </div>
    );
  }

  const currentPrayer = prayers[currentIndex];
  const rotation = dragX / 15;
  const opacity = Math.min(Math.abs(dragX) / 100, 0.4);

  return (
    <section className="flex flex-col items-center py-4 select-none overflow-hidden touch-none">
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-emerald-900 leading-none">سجل صلاتك</h2>
          <span className="text-slate-400 text-sm mt-1">اسحب البطاقة أو اضغط الأزرار</span>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-black shadow-sm">
          {currentIndex + 1} / {prayers.length}
        </div>
      </div>

      <div 
        className="relative w-full max-w-[320px] aspect-[3/4] cursor-grab active:cursor-grabbing"
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        <div 
          className={`absolute inset-0 transition-transform duration-200 ease-out h-full
            ${!isDragging && !exitDirection ? 'translate-x-0 rotate-0' : ''}
            ${exitDirection === 'right' ? 'translate-x-[150%] rotate-45 opacity-0 duration-500' : ''}
            ${exitDirection === 'left' ? '-translate-x-[150%] -rotate-45 opacity-0 duration-500' : ''}
          `}
          style={{ transform: isDragging ? `translateX(${dragX}px) rotate(${rotation}deg)` : undefined }}
        >
          <div className="h-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-8 flex flex-col items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500 pointer-events-none flex items-center justify-center transition-opacity" style={{ opacity: dragX > 0 ? opacity : 0 }}>
               <Check className="text-white w-20 h-20" strokeWidth={4} />
            </div>
            <div className="absolute inset-0 bg-rose-500 pointer-events-none flex items-center justify-center transition-opacity" style={{ opacity: dragX < 0 ? opacity : 0 }}>
               <X className="text-white w-20 h-20" strokeWidth={4} />
            </div>

            <div className={`p-10 rounded-full shadow-inner ${currentPrayer.bg} ${currentPrayer.color}`}>
              {React.cloneElement(currentPrayer.icon as React.ReactElement, { size: 90, strokeWidth: 1.5 })}
            </div>
            
            <div className="text-center z-10">
              <h3 className="text-4xl font-black mb-1 text-slate-800 tracking-tight">{currentPrayer.label}</h3>
              {currentPrayer.subLabel && <p className="text-emerald-600 font-bold text-sm mb-3">{currentPrayer.subLabel}</p>}
              <p className="text-slate-500 font-medium">أديت الفريضة في وقتها؟</p>
            </div>

            <div className="w-full flex justify-between px-2 text-slate-300 pointer-events-none">
                <div className="flex items-center gap-1 font-bold text-xs"><ChevronLeft size={16}/> فاتتني</div>
                <div className="flex items-center gap-1 font-bold text-xs">صليت <ChevronRight size={16}/></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[320px] flex gap-4 mt-8 px-2">
        <button onClick={() => handleAction(false)} className="flex-1 bg-white hover:bg-rose-50 text-rose-500 py-5 rounded-3xl flex items-center justify-center gap-2 transition-all border-2 border-slate-100 active:scale-95 shadow-sm">
          <X size={24} strokeWidth={3} />
          <span className="font-black text-lg">فاتتني</span>
        </button>
        <button onClick={() => handleAction(true)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-200">
          <Check size={24} strokeWidth={3} />
          <span className="font-black text-lg">صليت</span>
        </button>
      </div>

      <div className="mt-8 flex gap-2">
        {prayers.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-emerald-600 shadow-sm' : i < currentIndex ? 'w-4 bg-emerald-200' : 'w-4 bg-slate-200'}`} />
        ))}
      </div>
    </section>
  );
};
