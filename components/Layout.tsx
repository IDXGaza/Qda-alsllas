
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col max-w-lg mx-auto border-x border-slate-200">
      <header className="bg-emerald-700 text-white p-6 shadow-lg rounded-b-3xl">
        <h1 className="text-2xl font-bold text-center mb-1">سِراج</h1>
        <p className="text-emerald-100 text-sm text-center">متتبع الصلاة والقضاء الجعفري</p>
      </header>
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
