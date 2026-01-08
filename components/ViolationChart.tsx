
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FirstInstanceDecision } from '../types';

interface ViolationChartProps {
  data: FirstInstanceDecision[];
}

const ViolationChart: React.FC<ViolationChartProps> = ({ data }) => {
  const chartData = React.useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach((item) => {
      // Basic extraction of primary substance/violation
      let label = 'Other';
      const v = item.violation.toUpperCase();
      if (v.includes('EPO')) label = 'EPO';
      else if (v.includes('TESTOSTERONE')) label = 'Testosterone';
      else if (v.includes('TRIAMCINOLONE')) label = 'Triamcinolone';
      else if (v.includes('ABP')) label = 'ABP Violation';
      else if (v.includes('NORANDROSTERONE')) label = 'Norandrosterone';
      else if (v.includes('METHYLPREDNISOLONE')) label = 'Methylprednisolone';
      
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6', '#ec4899'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={70}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          iconType="circle"
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-[11px] font-medium text-slate-600 ml-1">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ViolationChart;
