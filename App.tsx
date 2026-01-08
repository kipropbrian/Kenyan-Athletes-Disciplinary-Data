
import React, { useState, useMemo } from 'react';
import { INTEGRITY_DATA } from './data';
import { TabType } from './types';
import Header from './components/Header';
import StatCard from './components/StatCard';
import DecisionCard from './components/DecisionCard';
import ViolationChart from './components/ViolationChart';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuspensions = useMemo(() => 
    INTEGRITY_DATA.provisional_suspensions.filter(s => 
      s.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.details.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredDecisions = useMemo(() => 
    INTEGRITY_DATA.first_instance_decisions.filter(d => 
      d.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.violation.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredAppeals = useMemo(() => 
    INTEGRITY_DATA.pending_appeals.filter(a => 
      a.appellant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredAppealDecisions = useMemo(() => 
    INTEGRITY_DATA.appeal_decisions.filter(ad => 
      ad.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.adrv.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="min-h-screen pb-20">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Kenya Spotlight Banner */}
        <div className="mb-8 bg-gradient-to-r from-slate-900 via-red-900 to-emerald-900 p-1 rounded-3xl shadow-lg">
          <div className="bg-white/95 backdrop-blur-sm rounded-[22px] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="h-1.5 w-8 bg-black mb-0.5 rounded-full"></div>
                <div className="h-1.5 w-8 bg-red-600 mb-0.5 rounded-full"></div>
                <div className="h-1.5 w-8 bg-emerald-600 rounded-full"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Regional Disciplinary Focus</h2>
                <p className="text-sm text-slate-500">
                  Detailed analytics and case registry for athletes from <strong>Kenya</strong>. 
                  Data provided by the <a href="https://www.athleticsintegrity.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Athletics Integrity Unit (AIU)</a>.
                </p>
              </div>
            </div>
            <a 
              href="https://www.athleticsintegrity.org/disciplinary-process/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="fas fa-external-link-alt text-xs"></i>
              Visit Official AIU Registry
            </a>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Suspensions" 
                value={INTEGRITY_DATA.provisional_suspensions.length} 
                icon="fa-user-slash"
                color="bg-red-500"
              />
              <StatCard 
                title="Recent Decisions" 
                value={INTEGRITY_DATA.first_instance_decisions.length} 
                icon="fa-gavel"
                color="bg-blue-500"
              />
              <StatCard 
                title="Pending Appeals" 
                value={INTEGRITY_DATA.pending_appeals.length} 
                icon="fa-scale-unbalanced"
                color="bg-amber-500"
              />
              <StatCard 
                title="Historical Cases" 
                value={INTEGRITY_DATA.appeal_decisions.length} 
                icon="fa-book"
                color="bg-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold mb-6 text-slate-800 flex items-center gap-2">
                  <i className="fas fa-chart-pie text-red-500"></i>
                  Kenyan Violation Distribution
                </h3>
                <div className="h-[300px]">
                  <ViolationChart data={INTEGRITY_DATA.first_instance_decisions} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold mb-6 text-slate-800 flex items-center gap-2">
                  <i className="fas fa-bullhorn text-emerald-600"></i>
                  Latest Disciplinary Notices
                </h3>
                <div className="space-y-4">
                  {INTEGRITY_DATA.provisional_suspensions.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="bg-red-50 text-red-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-user-clock text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.respondent}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.details}</p>
                        <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suspensions' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Provisional Suspensions (Kenya)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuspensions.map((s, i) => (
                <DecisionCard key={i} respondent={s.respondent} date={s.date} detail={s.details} status={s.status} type="suspension" />
              ))}
            </div>
            {filteredSuspensions.length === 0 && <NoResults />}
          </div>
        )}

        {activeTab === 'decisions' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800">First Instance Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecisions.map((d, i) => (
                <DecisionCard key={i} respondent={d.respondent} date={d.date} detail={d.violation} status={d.outcome} type="decision" />
              ))}
            </div>
            {filteredDecisions.length === 0 && <NoResults />}
          </div>
        )}

        {activeTab === 'appeals' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Pending Appeals (CAS)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppeals.map((a, i) => (
                <DecisionCard key={i} respondent={a.appellant} date={a.date_of_appeal} detail={a.summary} status={a.status} type="appeal" />
              ))}
            </div>
            {filteredAppeals.length === 0 && <NoResults />}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Historical Case Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppealDecisions.map((ad, i) => (
                <DecisionCard key={i} respondent={ad.respondent} date={ad.date} detail={ad.adrv} status={ad.outcome} type="history" />
              ))}
            </div>
            {filteredAppealDecisions.length === 0 && <NoResults />}
          </div>
        )}
      </main>

      {/* Footer attribution */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs">
          <p>© 2024 Kenyan Athletics Integrity Registry. Not affiliated with AIU or World Athletics.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Data Source: <a href="https://www.athleticsintegrity.org" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors font-semibold">athleticsintegrity.org</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const NoResults: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
      <i className="fas fa-search text-slate-300 text-3xl"></i>
    </div>
    <h3 className="text-xl font-semibold text-slate-600">No matches found</h3>
    <p className="text-slate-400">Try adjusting your search criteria</p>
  </div>
);

export default App;
