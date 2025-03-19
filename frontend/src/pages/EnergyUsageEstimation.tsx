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
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate calculation process
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
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/facility-ai-analysis')}
              className="btn btn-circle btn-ghost"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold">Energy Usage Estimation</h1>
          </div>
        </div>

        {isCalculating ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body flex flex-col items-center justify-center py-16">
              <div className="loading loading-spinner loading-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Calculating Energy Usage</h3>
              <p className="text-gray-500 mt-2">
                Our AI is analyzing facility data to estimate energy consumption patterns...
              </p>
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between mb-2">
                  <span>Analyzing building specifications</span>
                  <span>100%</span>
                </div>
                <progress className="progress progress-primary w-full" value="100" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Estimating HVAC requirements</span>
                  <span>90%</span>
                </div>
                <progress className="progress progress-primary w-full" value="90" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Calculating lighting energy usage</span>
                  <span>75%</span>
                </div>
                <progress className="progress progress-primary w-full" value="75" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Modeling equipment power consumption</span>
                  <span>45%</span>
                </div>
                <progress className="progress progress-primary w-full" value="45" max="100"></progress>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Energy Usage Overview */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl flex items-center gap-2">
                  <div className="text-primary">
                    <MdElectricBolt size={24} />
                  </div>
                  Energy Usage Overview
                </h2>
                <p className="text-gray-600">
                  Based on our analysis of the facility's size, type, equipment, and local climate conditions, we've estimated the following energy usage patterns:
                </p>
              </div>
            </div>

            {/* Energy Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <MdOutlineCalculate className="text-primary" />
                    Annual Consumption
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Annual Usage:</span>
                      <span className="font-semibold">{energyData.totalAnnualUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Monthly:</span>
                      <span className="font-semibold">{energyData.averageMonthlyUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peak Demand:</span>
                      <span className="font-semibold">{energyData.peakDemand}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaChartLine className="text-green-600" />
                    Cost Analysis
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Cost:</span>
                      <span className="font-semibold">{energyData.annualCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Average:</span>
                      <span className="font-semibold">{energyData.monthlyAverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate per kWh:</span>
                      <span className="font-semibold">{energyData.ratePerKWh}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaBuilding className="text-blue-600" />
                    Facility Details
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Building Type:</span>
                      <span className="font-semibold">Commercial Office</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Square Footage:</span>
                      <span className="font-semibold">155,000 sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Hours:</span>
                      <span className="font-semibold">8am - 6pm (M-F)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineAnalytics className="text-primary" />
                  Energy Usage Breakdown
                </h3>
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="flex items-center gap-2">
                              <span className="badge badge-primary">HVAC</span>
                              <span>{energyData.usageBreakdown.hvac}%</span>
                            </span>
                            <span>104,617 kWh</span>
                          </div>
                          <progress className="progress progress-primary w-full" value={energyData.usageBreakdown.hvac} max="100"></progress>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="flex items-center gap-2">
                              <span className="badge badge-secondary">Lighting</span>
                              <span>{energyData.usageBreakdown.lighting}%</span>
                            </span>
                            <span>54,799 kWh</span>
                          </div>
                          <progress className="progress progress-secondary w-full" value={energyData.usageBreakdown.lighting} max="100"></progress>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="flex items-center gap-2">
                              <span className="badge badge-accent">Equipment</span>
                              <span>{energyData.usageBreakdown.equipment}%</span>
                            </span>
                            <span>44,836 kWh</span>
                          </div>
                          <progress className="progress progress-accent w-full" value={energyData.usageBreakdown.equipment} max="100"></progress>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="flex items-center gap-2">
                              <span className="badge badge-info">Computers</span>
                              <span>{energyData.usageBreakdown.computers}%</span>
                            </span>
                            <span>29,890 kWh</span>
                          </div>
                          <progress className="progress progress-info w-full" value={energyData.usageBreakdown.computers} max="100"></progress>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="flex items-center gap-2">
                              <span className="badge badge-warning">Other</span>
                              <span>{energyData.usageBreakdown.other}%</span>
                            </span>
                            <span>14,945 kWh</span>
                          </div>
                          <progress className="progress progress-warning w-full" value={energyData.usageBreakdown.other} max="100"></progress>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{energyData.totalAnnualUsage}</div>
                            <div className="text-sm text-gray-500">Total Annual Usage</div>
                          </div>
                        </div>
                        {/* This would be a pie chart in a real implementation */}
                        <div className="w-full h-full rounded-full border-8 border-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Usage Chart */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineShowChart className="text-primary" />
                  Monthly Usage Patterns
                </h3>
                <div className="mt-6">
                  <div className="h-64 w-full">
                    {/* This would be a bar chart in a real implementation */}
                    <div className="flex h-48 items-end justify-between">
                      {energyData.monthlyUsage.map((month) => (
                        <div key={month.month} className="flex flex-col items-center">
                          <div 
                            className="w-8 bg-primary rounded-t-sm" 
                            style={{ height: `${(month.usage / 25000) * 100}%` }}
                          ></div>
                          <div className="mt-2 text-xs">{month.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="text-sm text-gray-500">Lowest: 18,500 kWh (Nov)</div>
                    <div className="text-sm text-gray-500">Highest: 25,000 kWh (Aug)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Saving Opportunities */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <FaLightbulb className="text-yellow-500" />
                  Energy Saving Opportunities
                </h3>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h4 className="font-semibold">HVAC Optimization</h4>
                        <p className="text-sm">Upgrading to a more efficient HVAC system could reduce energy consumption by up to 30%.</p>
                        <div className="mt-2">
                          <span className="text-primary font-semibold">Potential Savings: $9,700/year</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h4 className="font-semibold">LED Lighting Upgrade</h4>
                        <p className="text-sm">Replacing current lighting with LED fixtures could reduce lighting energy use by up to 60%.</p>
                        <div className="mt-2">
                          <span className="text-primary font-semibold">Potential Savings: $7,200/year</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h4 className="font-semibold">Smart Building Controls</h4>
                        <p className="text-sm">Implementing smart controls for lighting and HVAC could reduce overall energy use by 15%.</p>
                        <div className="mt-2">
                          <span className="text-primary font-semibold">Potential Savings: $11,500/year</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h4 className="font-semibold">Solar Energy Installation</h4>
                        <p className="text-sm">Installing solar panels could offset up to 100% of the facility's electricity consumption.</p>
                        <div className="mt-2">
                          <span className="text-primary font-semibold">Potential Savings: $77,200/year</span>
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
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleContinueToSolarPotential}
                className="btn btn-primary btn-lg flex items-center gap-2"
              >
                Continue to Solar Panel Potential
                <MdArrowForward size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnergyUsageEstimation; 