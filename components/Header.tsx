
import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, searchTerm, setSearchTerm }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Dashboard', icon: 'fa-home' },
    { id: 'suspensions', label: 'Suspensions', icon: 'fa-user-slash' },
    { id: 'decisions', label: 'Decisions', icon: 'fa-gavel' },
    { id: 'appeals', label: 'Pending Appeals', icon: 'fa-scale-unbalanced' },
    { id: 'history', label: 'History', icon: 'fa-history' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center relative">
              <i className="fas fa-shield-halved text-2xl"></i>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                Kenyan Athletics Integrity Hub
                <span className="hidden sm:inline-block text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-normal">AIU DATA</span>
              </h1>
              <p className="text-red-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                Monitoring Disciplinary Processes for Kenyan Athletes
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search athlete names or violations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none text-slate-200 placeholder-slate-500"
            />
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-slate-800 text-red-400 border-b-2 border-red-500 shadow-inner' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <i className={`fas ${tab.icon} text-xs`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
