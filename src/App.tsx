import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Percent, AlertCircle } from 'lucide-react';

export default function App() {
  const [total, setTotal] = useState('');
  const [cost, setCost] = useState('');

  const rawPercentage = useMemo(() => {
    const t = parseFloat(total);
    const c = parseFloat(cost);
    if (isNaN(t) || isNaN(c) || t <= 0) return 0;
    return (c / t) * 100;
  }, [total, cost]);

  const displayPercentage = rawPercentage.toFixed(2).replace(/\.00$/, '');
  const isOverBudget = rawPercentage > 100;

  // Determine progress bar color based on spending severity
  const getProgressColor = (percent: number) => {
    if (percent > 100) return 'bg-red-500';
    if (percent > 25) return 'bg-orange-400';
    if (percent > 5) return 'bg-pink-500';
    return 'bg-green-400';
  };

  return (
    <div className="min-h-screen bg-yellow-400 font-sans flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] sm:rounded-[48px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] border-4 sm:border-8 border-black max-w-5xl w-full flex flex-col p-4 sm:p-8 lg:p-12 relative"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-12 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-black tracking-tighter leading-none uppercase">
              Spend<span className="text-indigo-600">Scale</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-500 mt-2 uppercase tracking-widest text-balance">
              Instant Budget Visualization
            </p>
          </div>
          <div className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm sm:text-lg whitespace-nowrap self-start sm:self-auto">
            BETA v1.0
          </div>
        </div>

        {/* Main Calculator Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 flex-grow">
          
          {/* Left: Inputs */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center">
            
            {/* Total Budget Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="total" className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase tracking-tight">
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xl sm:text-2xl lg:text-4xl font-black text-indigo-600 pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  id="total"
                  min="0"
                  step="any"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="5000"
                  className="w-full bg-indigo-50 border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl py-3 sm:py-4 lg:py-6 pl-10 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 text-xl sm:text-2xl lg:text-4xl font-black focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all placeholder:text-indigo-200"
                />
              </div>
            </div>

            {/* Item Cost Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cost" className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase tracking-tight">
                Item Cost
              </label>
              <div className="relative">
                <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xl sm:text-2xl lg:text-4xl font-black text-pink-500 pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  id="cost"
                  min="0"
                  step="any"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="750"
                  className="w-full bg-pink-50 border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl py-3 sm:py-4 lg:py-6 pl-10 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 text-xl sm:text-2xl lg:text-4xl font-black focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all placeholder:text-pink-200"
                />
              </div>
            </div>

          </div>

          {/* Right: Result Visualization */}
          <div className="bg-indigo-600 rounded-[24px] sm:rounded-[32px] border-2 sm:border-4 border-black p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[250px] sm:min-h-[300px]">
            {/* Decorative Background Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-500 rounded-full opacity-50 pointer-events-none"></div>
            
            <span className="text-indigo-200 text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-widest mb-1 sm:mb-2 z-10">
              Total Impact
            </span>
            
            <div className="flex items-baseline justify-center z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] sm:drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)] min-h-[80px] sm:min-h-[140px] items-center">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={displayPercentage}
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={`text-[60px] sm:text-[80px] lg:text-[140px] leading-none font-black ${isOverBudget ? 'text-red-400' : 'text-white'} truncate max-w-[200px] sm:max-w-[250px] lg:max-w-[350px]`}
                >
                  {displayPercentage}
                </motion.span>
              </AnimatePresence>
              <span className="text-3xl sm:text-4xl lg:text-6xl font-black text-white ml-1">%</span>
            </div>
            
            <div className="h-[30px] sm:h-[40px] lg:h-[60px] flex items-center justify-center w-full z-10 mt-1 sm:mt-2 lg:mt-4">
              <AnimatePresence mode="wait">
                {isOverBudget ? (
                  <motion.div 
                    key="over-budget"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 border-2 border-black rounded-full"
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <span className="text-white font-black uppercase text-xs sm:text-sm lg:text-base tracking-wider">Over Budget</span>
                  </motion.div>
                ) : (
                  (total && cost) ? (
                    <motion.p 
                      key="remaining"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-white text-sm sm:text-lg lg:text-xl font-medium px-2 sm:px-4"
                    >
                      Remaining balance:{' '}
                      <span className="font-black underline decoration-pink-500 decoration-2 sm:decoration-4 underline-offset-2 sm:underline-offset-4 block sm:inline mt-1 sm:mt-0">
                        ${(parseFloat(total) - parseFloat(cost)).toFixed(2).replace(/\.00$/, '')}
                      </span>
                    </motion.p>
                  ) : (
                    <motion.p 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-indigo-300 text-sm sm:text-lg lg:text-xl font-medium px-2 sm:px-4"
                    >
                      Enter amounts to see calculation
                    </motion.p>
                  )
                )}
              </AnimatePresence>
            </div>
            
            {/* Progress Bar Visual */}
            <div className="w-full h-4 sm:h-6 lg:h-8 bg-black mt-4 sm:mt-6 lg:mt-8 rounded-full border-2 border-white overflow-hidden p-0.5 sm:p-1 z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(rawPercentage, 100)}%` }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                className={`h-full rounded-full ${getProgressColor(rawPercentage)}`}
              />
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="bg-green-400 border-2 sm:border-4 border-black px-4 sm:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl flex-1 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold text-sm sm:text-lg lg:text-xl shrink-0">A</div>
            <span className="font-bold text-black uppercase tracking-tight text-xs sm:text-sm lg:text-base">Safe: &lt; 5%</span>
          </div>
          <div className="bg-orange-400 border-2 sm:border-4 border-black px-4 sm:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl flex-1 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold text-sm sm:text-lg lg:text-xl shrink-0">B</div>
            <span className="font-bold text-black uppercase tracking-tight text-xs sm:text-sm lg:text-base">Caution: 5-25%</span>
          </div>
          <div className="bg-red-500 border-2 sm:border-4 border-black px-4 sm:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl flex-1 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold text-sm sm:text-lg lg:text-xl shrink-0 text-black">C</div>
            <span className="font-bold text-white uppercase tracking-tight text-xs sm:text-sm lg:text-base">Danger: &gt; 25%</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
