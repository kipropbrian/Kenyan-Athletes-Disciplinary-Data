
import React from 'react';

interface DecisionCardProps {
  respondent: string;
  date: string;
  detail: string;
  status: string;
  type: 'suspension' | 'decision' | 'appeal' | 'history';
  imageUrl?: string;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ respondent, date, detail, status, type, imageUrl }) => {
  // Use respondent name as seed for consistent avatar per name if no imageUrl is provided
  const avatarFallback = `https://i.pravatar.cc/300?u=${encodeURIComponent(respondent)}`;
  const displayImage = imageUrl || avatarFallback;
  
  const typeColors = {
    suspension: 'text-red-500 bg-red-50',
    decision: 'text-blue-500 bg-blue-50',
    appeal: 'text-amber-500 bg-amber-50',
    history: 'text-emerald-500 bg-emerald-50',
  };

  const getStatusBadge = (statusStr: string) => {
    const s = statusStr.toLowerCase();
    if (s.includes('years') || s.includes('outcome')) return 'bg-emerald-100 text-emerald-700';
    if (s.includes('pending') || s.includes('referred')) return 'bg-amber-100 text-amber-700';
    if (s.includes('charge')) return 'bg-rose-100 text-rose-700';
    return 'bg-slate-100 text-slate-700';
  };

  const handleSearch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(respondent + " Kenyan athlete integrity")}&tbm=isch`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4 z-10">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${typeColors[type]}`}>
          {type}
        </span>
      </div>
      
      <div className="flex items-center gap-5 mb-6">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-100 transition-all shadow-md bg-slate-100">
            <img 
              src={displayImage} 
              alt={respondent} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = avatarFallback;
              }}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-blue-500 hover:bg-blue-50 transition-colors"
            title="Search profile photos"
          >
             <i className="fas fa-search-plus text-[10px]"></i>
          </button>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors pr-8">{respondent}</h3>
          <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
            <i className="far fa-calendar-alt"></i>
            {date}
          </p>
        </div>
      </div>

      <div className="space-y-4 flex-grow flex flex-col justify-between">
        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
          <p className="text-sm text-slate-700 leading-relaxed italic">
            &ldquo;{detail}&rdquo;
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className={`text-[11px] font-bold px-4 py-2 rounded-xl border border-transparent shadow-sm ${getStatusBadge(status)}`}>
            {status}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionCard;
