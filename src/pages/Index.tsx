
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center">
      <header className="w-full py-6 text-center">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-blue-500">J</span>
          <span className="text-blue-400">A</span>
          <span className="text-blue-300">R</span>
          <span className="text-blue-400">V</span>
          <span className="text-blue-500">I</span>
          <span className="text-blue-600">S</span>
        </h1>
        <p className="mt-2 text-slate-400">Your Personal AI Assistant</p>
      </header>

      <main className="flex-1 w-full max-w-4xl p-4">
        <ChatInterface />
      </main>

      <footer className="w-full py-4 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} J.A.R.V.I.S - Just A Rather Very Intelligent System</p>
      </footer>
    </div>
  );
};

export default Index;
