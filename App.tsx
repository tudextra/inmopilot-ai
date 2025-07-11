
import React, { useState } from 'react';
import { View } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ListingGenerator from './components/ListingGenerator';
import JediAcademy from './components/JediAcademy';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'generator':
        return <ListingGenerator onBack={() => setCurrentView('home')} />;
      case 'academy':
        return <JediAcademy />;
      case 'home':
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 antialiased">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
           {renderView()}
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-slate-400">
        InmoPilot AI - Creado con la magia de Gemini.
      </footer>
    </div>
  );
};

export default App;
