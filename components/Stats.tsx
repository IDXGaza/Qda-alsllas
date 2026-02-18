
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { QazaState } from '../types';
import { PRAYER_METADATA } from '../constants';

interface StatsProps {
  qazaState: QazaState;
}

export const Stats: React.FC<StatsProps> = ({ qazaState }) => {
  const data = PRAYER_METADATA.map(p => ({
    name: p.label,
    count: qazaState[p.key as keyof QazaState],
    color: p.color.includes('amber') ? '#f59e0b' : 
           p.color.includes('orange') ? '#f97316' : '#6366f1'
  }));

  return (
    <section className="mb-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-2xl font-black mb-6 text-emerald-900">إحصائيات القضاء</h2>
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', direction: 'rtl' }}
            />
            <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={45}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
