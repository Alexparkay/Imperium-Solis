import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward, MdElectricBolt, MdOutlineCalculate, MdOutlineAnalytics, MdOutlineShowChart } from 'react-icons/md';
import { FaSolarPanel, FaBuilding, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const EnergyUsageEstimation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);
  
  // Energy usage data
  const energyData = {
    totalAnnualUsage: '249,087.3 kWh',
    averageMonthlyUsage: '20,757.3 kWh',
    peakDemand: '155.7 kW',
    annualCost: '$77,217.08',
    monthlyAverage: '$6,434.76',
    ratePerKWh: '$0.310/kWh',
    usageBreakdown: {
      hvac: 42,
      lighting: 22,
      equipment: 18,
      computers: 12,
      other: 6
    },
    monthlyUsage: [
      { month: 'Jan', usage: 22500, cost: 6975 },
      { month: 'Feb', usage: 21000, cost: 6510 },
      { month: 'Mar', usage: 20500, cost: 6355 },
      { month: 'Apr', usage: 19500, cost: 6045 },
      { month: 'May', usage: 18500, cost: 5735 },
      { month: 'Jun', usage: 21500, cost: 6665 },
      { month: 'Jul', usage: 24500, cost: 7595 },
      { month: 'Aug', usage: 25000, cost: 7750 },
      { month: 'Sep', usage: 22000, cost: 6820 },
      { month: 'Oct', usage: 19000, cost: 5890 },
      { month: 'Nov', usage: 18500, cost: 5735 },
      { month: 'Dec', usage: 21000, cost: 6510 }
    ]
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsCalculating(false);
      }, 3000);
    }, 1000);
  }, []);

  const handleContinueToSolarPotential = () => {
    navigate('/solar-panel-potential');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-amber-500 relative"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading Analysis</h2>
            <p className="text-gray-400">Preparing your energy usage report...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 py-4 px-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/facility-ai-analysis')}
                className="btn btn-circle btn-ghost hover:bg-amber-500/10 transition-colors"
              >
                <MdArrowBack size={24} className="text-amber-500" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Energy Usage Estimation
              </h1>
            </div>
          </div>

          {isCalculating ? (
            <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                    backgroundSize: '30px 30px'
                  }}
                ></div>
              </div>
              
              {/* Gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
              
              <div className="card-body flex flex-col items-center justify-center py-16 relative z-10">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="loading loading-spinner loading-lg text-amber-500 relative"></div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-4">
                  Calculating Energy Usage
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
                  Our AI is analyzing facility data to estimate energy consumption patterns...
                </p>
                <div className="w-full max-w-md space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Analyzing building specifications</span>
                      <span className="text-amber-500 font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Estimating HVAC requirements</span>
                      <span className="text-amber-500 font-medium">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Calculating lighting energy usage</span>
                      <span className="text-amber-500 font-medium">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[75%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Modeling equipment power consumption</span>
                      <span className="text-amber-500 font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Energy Usage Overview */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdElectricBolt size={24} />
                    </div>
                    <div>
                      <h2 className="card-title text-xl bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Energy Usage Overview
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-3">
                        Based on our analysis of the facility's size, type, equipment, and local climate conditions, we've estimated the following energy usage patterns:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  
                  {/* Gradient orbs */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
                  
                  <div className="card-body relative z-10">
                    <h3 className="card-title text-lg flex items-center gap-2">
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <MdOutlineCalculate size={20} />
                      </div>
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Annual Consumption
                      </span>
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Total Annual Usage:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.totalAnnualUsage}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Average Monthly:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.averageMonthlyUsage}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Peak Demand:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.peakDemand}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  
                  {/* Gradient orbs */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-green-500/10 blur-2xl group-hover:bg-green-500/20 transition-all duration-300"></div>
                  
                  <div className="card-body relative z-10">
                    <h3 className="card-title text-lg flex items-center gap-2">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <FaChartLine size={20} />
                      </div>
                      <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        Cost Analysis
                      </span>
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Annual Cost:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.annualCost}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Monthly Average:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.monthlyAverage}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Rate per kWh:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{energyData.ratePerKWh}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  
                  {/* Gradient orbs */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
                  
                  <div className="card-body relative z-10">
                    <h3 className="card-title text-lg flex items-center gap-2">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <FaBuilding size={20} />
                      </div>
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                        Facility Details
                      </span>
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Building Type:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">Commercial Office</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Square Footage:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">155,000 sq ft</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Operating Hours:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">8am - 6pm (M-F)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Breakdown */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineAnalytics size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Energy Usage Breakdown
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="space-y-6">
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex justify-between mb-2">
                              <span className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium">HVAC</span>
                                <span className="text-gray-900 dark:text-white font-medium">{energyData.usageBreakdown.hvac}%</span>
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">104,617 kWh</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                                style={{ width: `${energyData.usageBreakdown.hvac}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex justify-between mb-2">
                              <span className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium">Lighting</span>
                                <span className="text-gray-900 dark:text-white font-medium">{energyData.usageBreakdown.lighting}%</span>
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">54,799 kWh</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${energyData.usageBreakdown.lighting}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex justify-between mb-2">
                              <span className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium">Equipment</span>
                                <span className="text-gray-900 dark:text-white font-medium">{energyData.usageBreakdown.equipment}%</span>
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">44,836 kWh</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                                style={{ width: `${energyData.usageBreakdown.equipment}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex justify-between mb-2">
                              <span className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium">Computers</span>
                                <span className="text-gray-900 dark:text-white font-medium">{energyData.usageBreakdown.computers}%</span>
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">29,890 kWh</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                                style={{ width: `${energyData.usageBreakdown.computers}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex justify-between mb-2">
                              <span className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-medium">Other</span>
                                <span className="text-gray-900 dark:text-white font-medium">{energyData.usageBreakdown.other}%</span>
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">14,945 kWh</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
                                style={{ width: `${energyData.usageBreakdown.other}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-xl border border-gray-100 dark:border-gray-700"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                                {energyData.totalAnnualUsage}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total Annual Usage</div>
                            </div>
                          </div>
                          <div className="absolute inset-0 border-8 border-amber-500/20 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Usage Chart */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineShowChart size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Monthly Usage Patterns
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Energy consumption and cost trends throughout the year
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="relative h-80">
                        {/* Y-axis labels - Usage */}
                        <div className="absolute left-0 top-0 bottom-10 w-16 flex flex-col justify-between">
                          {[25000, 20000, 15000, 10000, 5000, 0].map((value) => (
                            <div key={value} className="text-xs text-gray-500 dark:text-gray-400 -translate-x-2">
                              {value.toLocaleString()}
                            </div>
                          ))}
                        </div>
                        
                        {/* Y-axis labels - Cost */}
                        <div className="absolute right-0 top-0 bottom-10 w-16 flex flex-col justify-between">
                          {[8000, 6400, 4800, 3200, 1600, 0].map((value) => (
                            <div key={value} className="text-xs text-gray-500 dark:text-gray-400 translate-x-2">
                              ${value.toLocaleString()}
                            </div>
                          ))}
                        </div>

                        {/* Graph area */}
                        <div className="absolute left-16 right-16 top-0 bottom-0">
                          {/* Grid lines */}
                          <div className="absolute inset-0 grid grid-rows-5 gap-0">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="border-t border-gray-200 dark:border-gray-700"
                              />
                            ))}
                          </div>

                          {/* Bars container */}
                          <div className="absolute inset-0 flex items-end justify-between pb-10">
                            {energyData.monthlyUsage.map((month, index) => (
                              <div
                                key={month.month}
                                className="relative group"
                                style={{ height: '100%', width: `${100 / 12}%` }}
                              >
                                {/* Usage bar */}
                                <div
                                  className="absolute bottom-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg transition-all duration-300 group-hover:to-amber-400"
                                  style={{ height: `${(month.usage / 25000) * 100}%` }}
                                >
                                  {/* Tooltip */}
                                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    <div className="font-medium">{month.usage.toLocaleString()} kWh</div>
                                    <div className="text-gray-300">${month.cost.toLocaleString()}</div>
                                  </div>
                                </div>

                                {/* Cost line point */}
                                <div
                                  className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 transition-transform duration-300 group-hover:scale-150 group-hover:bg-blue-400"
                                  style={{ bottom: `${(month.cost / 8000) * 100}%` }}
                                />

                                {/* Month label */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs font-medium text-gray-600 dark:text-gray-400">
                                  {month.month}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Cost line */}
                          <svg className="absolute inset-0 pb-10" style={{ height: '100%' }}>
                            <path
                              d={energyData.monthlyUsage.map((month, index) => {
                                const x = (index * (100 / 11)) + '%';
                                const y = (100 - (month.cost / 8000) * 100) + '%';
                                return (index === 0 ? 'M' : 'L') + ` ${x} ${y}`;
                              }).join(' ')}
                              className="stroke-blue-500 stroke-2 fill-none"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex justify-center gap-8 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-8 bg-gradient-to-t from-amber-600 to-amber-500 rounded"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Energy Usage (kWh)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-0.5 bg-blue-500"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cost ($)</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Peak Usage</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">25,000 kWh</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">August</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Peak Cost</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">$7,750</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">August</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Saving Opportunities */}
              <div className="card bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <FaLightbulb size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Energy Saving Opportunities
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800 rounded-xl p-6 backdrop-blur-sm group hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <FaSolarPanel size={20} />
                          </div>
                          <h4 className="font-semibold text-white">HVAC Optimization</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                          Upgrading to a more efficient HVAC system could reduce energy consumption by up to 30%.
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="#1e293b" 
                                strokeWidth="12"
                              />
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="url(#hvacCircleGradient)" 
                                strokeWidth="12"
                                strokeDasharray="339.3"
                                strokeDashoffset="135.7" // 339.3 * 0.4 = 135.7 (60% filled)
                                transform="rotate(-90 60 60)"
                                className="drop-shadow"
                              />
                              <defs>
                                <linearGradient id="hvacCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                              </defs>
                              <text x="60" y="55" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">60%</text>
                              <text x="60" y="75" fontSize="10" fill="#9ca3af" textAnchor="middle">Savings</text>
                            </svg>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white block">$9,700</span>
                            <span className="text-sm text-gray-400">yearly savings</span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-gray-300">Energy Savings</span>
                            </div>
                            <span className="text-sm font-medium text-white">$5,820</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                              <span className="text-xs text-gray-300">Maintenance</span>
                            </div>
                            <span className="text-sm font-medium text-white">$2,425</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                              <span className="text-xs text-gray-300">Equipment</span>
                            </div>
                            <span className="text-sm font-medium text-white">$1,455</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-xl p-6 backdrop-blur-sm group hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <FaLightbulb size={20} />
                          </div>
                          <h4 className="font-semibold text-white">LED Lighting Upgrade</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                          Replacing current lighting with LED fixtures could reduce lighting energy use by up to 60%.
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="#1e293b" 
                                strokeWidth="12"
                              />
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="url(#ledCircleGradient)" 
                                strokeWidth="12"
                                strokeDasharray="339.3"
                                strokeDashoffset="84.8" // 339.3 * 0.25 = 84.8 (75% filled)
                                transform="rotate(-90 60 60)"
                                className="drop-shadow"
                              />
                              <defs>
                                <linearGradient id="ledCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#f59e0b" />
                                  <stop offset="100%" stopColor="#d97706" />
                                </linearGradient>
                              </defs>
                              <text x="60" y="55" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">75%</text>
                              <text x="60" y="75" fontSize="10" fill="#9ca3af" textAnchor="middle">Savings</text>
                            </svg>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white block">$7,200</span>
                            <span className="text-sm text-gray-400">yearly savings</span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                              <span className="text-xs text-gray-300">Energy Savings</span>
                            </div>
                            <span className="text-sm font-medium text-white">$5,400</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                              <span className="text-xs text-gray-300">Installation</span>
                            </div>
                            <span className="text-sm font-medium text-white">$1,440</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-300"></div>
                              <span className="text-xs text-gray-300">Bulb Costs</span>
                            </div>
                            <span className="text-sm font-medium text-white">$360</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-xl p-6 backdrop-blur-sm group hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <FaBuilding size={20} />
                          </div>
                          <h4 className="font-semibold text-white">Smart Building Controls</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                          Implementing smart controls for lighting and HVAC could reduce overall energy use by 15%.
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="#1e293b" 
                                strokeWidth="12"
                              />
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="url(#smartCircleGradient)" 
                                strokeWidth="12"
                                strokeDasharray="339.3"
                                strokeDashoffset="196.8" // 339.3 * 0.58 = 196.8 (42% filled)
                                transform="rotate(-90 60 60)"
                                className="drop-shadow"
                              />
                              <defs>
                                <linearGradient id="smartCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#8b5cf6" />
                                  <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                              </defs>
                              <text x="60" y="55" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">42%</text>
                              <text x="60" y="75" fontSize="10" fill="#9ca3af" textAnchor="middle">HVAC</text>
                            </svg>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white block">$11,500</span>
                            <span className="text-sm text-gray-400">yearly savings</span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                              <span className="text-xs text-gray-300">HVAC Savings</span>
                            </div>
                            <span className="text-sm font-medium text-white">$4,830</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                              <span className="text-xs text-gray-300">Lighting Savings</span>
                            </div>
                            <span className="text-sm font-medium text-white">$3,220</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                              <span className="text-xs text-gray-300">Maintenance/Other</span>
                            </div>
                            <span className="text-sm font-medium text-white">$3,450</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-xl p-6 backdrop-blur-sm group hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <FaSolarPanel size={20} />
                          </div>
                          <h4 className="font-semibold text-white">Solar Energy Installation</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                          Installing solar panels could offset up to 100% of the facility's electricity consumption.
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="#1e293b" 
                                strokeWidth="12"
                              />
                              <circle 
                                cx="60" 
                                cy="60" 
                                r="54" 
                                fill="none" 
                                stroke="url(#solarCircleGradient)" 
                                strokeWidth="12"
                                strokeDasharray="339.3"
                                strokeDashoffset="118.8" // 339.3 * 0.35 = 118.8 (65% filled)
                                transform="rotate(-90 60 60)"
                                className="drop-shadow"
                              />
                              <defs>
                                <linearGradient id="solarCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#22c55e" />
                                  <stop offset="100%" stopColor="#16a34a" />
                                </linearGradient>
                              </defs>
                              <text x="60" y="55" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">65%</text>
                              <text x="60" y="75" fontSize="10" fill="#9ca3af" textAnchor="middle">Energy</text>
                            </svg>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white block">$77,200</span>
                            <span className="text-sm text-gray-400">yearly savings</span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-xs text-gray-300">Energy Savings</span>
                            </div>
                            <span className="text-sm font-medium text-white">$50,180</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                              <span className="text-xs text-gray-300">Tax Credits</span>
                            </div>
                            <span className="text-sm font-medium text-white">$16,984</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-300"></div>
                              <span className="text-xs text-gray-300">Performance & Other</span>
                            </div>
                            <span className="text-sm font-medium text-white">$10,036</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Potential Teaser */}
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaSolarPanel size={20} />
                    Solar Energy Potential
                  </h3>
                  <p>
                    Based on our energy usage analysis, this facility is an excellent candidate for solar energy. 
                    With the current energy consumption patterns, a properly sized solar installation could 
                    significantly reduce or even eliminate electricity costs.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      onClick={handleContinueToSolarPotential}
                      className="btn btn-outline btn-sm"
                    >
                      View Solar Potential Analysis
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Continue Button */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleContinueToSolarPotential}
                  className="relative group overflow-hidden"
                >
                  <div className="relative z-10 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
                    <span className="text-lg">Continue to Solar Panel Potential</span>
                    <MdArrowForward className="text-2xl group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  {/* Button decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageEstimation; 