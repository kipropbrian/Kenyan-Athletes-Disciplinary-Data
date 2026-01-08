
import React from 'react';

interface DecisionCardProps {
  respondent: string;
  date: string;
  detail: string;
  status: string;
  type: 'suspension' | 'decision' | 'appeal' | 'history';
}

const DecisionCard: React.FC<DecisionCardProps> = ({ respondent, date, detail, status, type }) => {
  // Use respondent name as seed for consistent avatar per name
  const avatarUrl = `https://i.pravatar.cc/300?u=${encodeURIComponent(respondent)}`;
  
  const typeColors = {
    suspension: 'text-red-500 bg-red-50',
    decision: 'text-blue-500 bg-blue-50',
    appeal: 'text-amber-500 bg-amber-50',
    history: 'text-indigo-500 bg-indigo-50',
  };

  const getStatusBadge = (statusStr: string) => {
    const s = statusStr.toLowerCase();
    if (s.includes('years') || s.includes('outcome')) return 'bg-emerald-100 text-emerald-700';
    if (s.includes('pending') || s.includes('referred')) return 'bg-amber-100 text-amber-700';
    if (s.includes('charge')) return 'bg-rose-100 text-rose-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${typeColors[type]}`}>
          {type}
        </span>
      </div>
      
      <div className="flex items-center gap-5 mb-6">
        <div className="relative">
          <img 
            src={avatarUrl} 
            alt={respondent} 
            className="w-16 h-16 rounded-2xl object-cover bg-slate-200 ring-4 ring-slate-50 group-hover:scale-105 transition-transform" 
          />
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-md">
             <i className="fas fa-certificate text-blue-500 text-xs"></i>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{respondent}</h3>
          <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
            <i className="far fa-calendar-alt"></i>
            {date}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl min-h-[80px]">
          <p className="text-sm text-slate-700 leading-relaxed italic">
            &ldquo;{detail}&rdquo;
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold px-4 py-2 rounded-xl border border-transparent ${getStatusBadge(status)}`}>
            {status}
          </span>
          <button className="text-slate-300 hover:text-blue-500 transition-colors p-2">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionCard;
