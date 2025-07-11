
import React from 'react';
import { View } from '../types';
import { Icon } from './common/Icon';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavLink: React.FC<{
  targetView: View;
  currentView: View;
  onNavigate: (view: View) => void;
  icon: React.ComponentProps<typeof Icon>['icon'];
  children: React.ReactNode;
}> = ({ targetView, currentView, onNavigate, icon, children }) => {
  const isActive = currentView === targetView;
  return (
    <button
      onClick={() => onNavigate(targetView)}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-emerald-500 text-white'
          : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
      }`}
    >
      <Icon icon={icon} className="w-5 h-5" />
      <span>{children}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
             <div className="bg-white p-1 rounded-full">
                <Icon icon="sparkles" className="h-6 w-6 text-indigo-800" />
            </div>
            <span className="text-white text-xl font-bold ml-3">InmoPilot AI</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <NavLink
              targetView="home"
              currentView={currentView}
              onNavigate={onNavigate}
              icon="home"
            >
              Inicio
            </NavLink>
            <NavLink
              targetView="generator"
              currentView={currentView}
              onNavigate={onNavigate}
              icon="new"
            >
              Generador
            </NavLink>
            <NavLink
              targetView="academy"
              currentView={currentView}
              onNavigate={onNavigate}
              icon="academy"
            >
              Academia
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
