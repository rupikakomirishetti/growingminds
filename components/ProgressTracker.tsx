import React, { useState } from 'react';
import { MilestoneMetric, Child } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sparkles, Brain, CheckCircle2, Circle } from 'lucide-react';
import { getDevelopmentalInsight } from '../services/geminiService';

interface ProgressTrackerProps {
  data: MilestoneMetric[];
  childrenData: Child[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data, childrenData }) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiTip, setAiTip] = useState<{title: string, content: string} | null>(null);
  const activeChild = childrenData[0];

  const handleGetInsight = async () => {
    setLoadingAi(true);
    const result = await getDevelopmentalInsight(
        activeChild.group, 
        ["Playing with sand", "Reading hungry caterpillar", "Stacking blocks"]
    );
    setAiTip(result);
    setLoadingAi(false);
  };

  const chartData = data.reduce((acc: any[], curr) => {
    const existingEntry = acc.find(item => item.date === curr.date);
    if (existingEntry) {
      existingEntry[curr.category] = curr.score;
    } else {
      acc.push({ date: curr.date, [curr.category]: curr.score });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-lg">
          <p className="font-bold text-stone-600 mb-2">{label}</p>
          {payload.map((p: any) => (
             <p key={p.name} style={{ color: p.color }} className="font-semibold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: p.color}}></span>
                {p.name}: {p.value}
             </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-stone-700">Growing Up</h1>
          <p className="text-stone-400 font-medium mt-1">Watching {activeChild.firstName} bloom</p>
        </div>
        <button 
            onClick={handleGetInsight}
            disabled={loadingAi}
            className="mt-4 md:mt-0 ghibli-btn bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white px-8 py-3 font-bold shadow-lg shadow-violet-200 flex items-center gap-2 disabled:opacity-70"
        >
            {loadingAi ? (
                <span className="animate-pulse">Consulting Spirits...</span>
            ) : (
                <>
                    <Sparkles className="w-5 h-5" />
                    <span>Ask the Spirits</span>
                </>
            )}
        </button>
      </div>

      {aiTip && (
        <div className="ghibli-card bg-gradient-to-br from-indigo-50 to-purple-50 border-white p-8 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform rotate-12">
                <Brain className="w-32 h-32 text-indigo-900" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                {aiTip.title}
            </h3>
            <p className="text-indigo-900/80 font-medium text-lg leading-relaxed max-w-2xl relative z-10">
                {aiTip.content}
            </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 ghibli-card p-8 h-[450px] border-0">
            <h3 className="text-xl font-bold text-stone-600 mb-6">Growth Path</h3>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="date" stroke="#a8a29e" tick={{fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#a8a29e" tick={{fontSize: 12}} domain={[0, 100]} axisLine={false} tickLine={false} dx={-10} />
                    <Tooltip content={<CustomTooltip />} cursor={{stroke: '#e7e5e4', strokeWidth: 2}} />
                    <Legend wrapperStyle={{paddingTop: '20px', fontFamily: 'Quicksand'}} iconType="circle" />
                    <Line type="monotone" dataKey="Language" stroke="#818cf8" strokeWidth={4} dot={{r: 4, strokeWidth: 0, fill: '#818cf8'}} activeDot={{ r: 8, fill: '#818cf8', stroke: 'white', strokeWidth: 3 }} />
                    <Line type="monotone" dataKey="Motor" stroke="#34d399" strokeWidth={4} dot={{r: 4, strokeWidth: 0, fill: '#34d399'}} activeDot={{ r: 8, fill: '#34d399', stroke: 'white', strokeWidth: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="space-y-6">
            <div className="ghibli-card p-6 bg-amber-50/50 border-0">
                <h3 className="font-bold text-amber-800 mb-4 text-lg">Little Steps</h3>
                <div className="space-y-3">
                    {['Stacks 6 blocks', 'Uses 2-word sentences', 'Runs without falling', 'Identifies shapes'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/60 p-3 rounded-xl transition-all hover:bg-white">
                            {i < 2 ? (
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                            ) : (
                                <Circle className="w-6 h-6 text-stone-300" />
                            )}
                            <span className={`font-medium ${i < 2 ? "text-stone-400 line-through" : "text-stone-600"}`}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
             <div className="ghibli-card p-6 bg-rose-50/50 border-0">
                <h3 className="font-bold text-rose-800 mb-4 text-lg">Notes from Ms. Sarah</h3>
                <div className="relative">
                    <p className="font-medium text-stone-600 italic bg-white/80 p-4 rounded-xl shadow-sm leading-relaxed">
                        "Leo is showing great improvement in sharing toys during play sessions. He loves the building blocks!"
                    </p>
                    <div className="w-4 h-4 bg-white/80 absolute -bottom-2 left-6 rotate-45"></div>
                </div>
                <div className="mt-6 flex items-center gap-3 px-2">
                     <img src="https://picsum.photos/50/50?random=99" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Teacher" />
                     <div>
                        <span className="block font-bold text-stone-700">Ms. Sarah</span>
                        <span className="text-xs text-stone-400 font-semibold">Lead Teacher</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;