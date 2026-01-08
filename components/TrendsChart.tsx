
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { ProvisionalSuspension, FirstInstanceDecision, AppealDecision } from '../types';

interface TrendsChartProps {
  suspensions: ProvisionalSuspension[];
  decisions: FirstInstanceDecision[];
  historicalDecisions: AppealDecision[];
}

const TrendsChart: React.FC<TrendsChartProps> = ({ suspensions, decisions, historicalDecisions }) => {
  const data = React.useMemo(() => {
    const yearMap: { [year: string]: { suspensions: number; decisions: number } } = {};
    
    // Start from 2017 as requested
    const startYear = 2017;
    const currentYear = new Date().getFullYear();
    // In the provided data, we have entries up to 2025
    const endYear = 2025; 

    for (let y = startYear; y <= endYear; y++) {
      yearMap[y.toString()] = { suspensions: 0, decisions: 0 };
    }

    // Process suspensions
    suspensions.forEach((s) => {
      const year = s.date.split('-')[0];
      if (yearMap[year]) {
        yearMap[year].suspensions++;
      }
    });

    // Process first instance decisions
    decisions.forEach((d) => {
      const year = d.date.split('-')[0];
      if (yearMap[year]) {
        yearMap[year].decisions++;
      }
    });

    // Process historical appeal decisions as "decisions" for the trend
    historicalDecisions.forEach((ad) => {
      const year = ad.date.split('-')[0];
      if (yearMap[year]) {
        yearMap[year].decisions++;
      }
    });

    return Object.entries(yearMap)
      .map(([year, counts]) => ({
        year,
        ...counts,
        total: counts.suspensions + counts.decisions,
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, [suspensions, decisions, historicalDecisions]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorSuspensions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDecisions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis 
          dataKey="year" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
        />
        <Tooltip
          contentStyle={{
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            fontSize: '12px',
            padding: '12px'
          }}
          itemStyle={{ padding: '2px 0' }}
        />
        <Legend 
          verticalAlign="top" 
          align="right" 
          iconType="circle"
          wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: 600 }}
        />
        <Line 
          type="monotone" 
          name="Provisional Suspensions" 
          dataKey="suspensions" 
          stroke="#ef4444" 
          strokeWidth={3}
          dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, strokeWidth: 0 }}
          animationDuration={1500}
        />
        <Line 
          type="monotone" 
          name="Final Decisions" 
          dataKey="decisions" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, strokeWidth: 0 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChart;
