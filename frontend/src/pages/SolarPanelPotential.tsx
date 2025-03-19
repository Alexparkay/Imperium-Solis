import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSolarPower, MdOutlineWbSunny, MdOutlineAttachMoney, MdArrowForward, MdArrowBack, MdEdit, MdRefresh, MdMap, MdOutlineCalculate } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FaSolarPanel, FaMoneyBillWave, FaLeaf, FaChartLine, FaRegCalendarAlt } from 'react-icons/fa';

// Define types for our data
interface SolarPanel {
  id: string;
  name: string;
  wattage: number;
  efficiency: number;
  dimensions: {
    width: number;
    height: number;
  };
  costPerPanel: number;
}

interface SolarPotential {
  calculated: boolean;
  maxPanels: number;
  selectedPanelType: string;
  annualProduction: number;
  installationCost: number;
  annualSavings: number;
  paybackPeriod: number;
  roi: number;
  monthlyProduction: Array<{
    month: string;
    production: number;
  }>;
  annualEnergyConsumption?: number;
  localEnergyRate?: number;
  systemSize?: number;
  costPerWatt?: number;
  solarIncentives?: number;
  currentAnnualEnergyCost?: number;
  remainingGridEnergy?: number;
  remainingCost?: number;
  firstYearSavings?: number;
  firstYearROI?: number;
}

interface Facility {
  id: number;
  name: string;
  industry: string;
  location: string;
  analysis: {
    facilityType: string;
    squareFootage: number;
    energyRate: number;
    roofArea: number;
  };
  energyEstimation: {
    annualUsage: number;
    annualCost: number;
  };
  solarPotential: SolarPotential;
}

const SolarPanelPotential = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);
  const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);
  const [selectedPanelType, setSelectedPanelType] = useState('standard');
  
  // Available solar panel types
  const panelTypes: SolarPanel[] = [
    {
      id: 'standard',
      name: 'Standard Efficiency',
      wattage: 350,
      efficiency: 0.18,
      dimensions: {
        width: 1.7,
        height: 1.0
      },
      costPerPanel: 250
    },
    {
      id: 'premium',
      name: 'Premium Efficiency',
      wattage: 400,
      efficiency: 0.22,
      dimensions: {
        width: 1.7,
        height: 1.0
      },
      costPerPanel: 350
    },
    {
      id: 'highend',
      name: 'High-End Performance',
      wattage: 450,
      efficiency: 0.24,
      dimensions: {
        width: 1.7,
        height: 1.0
      },
      costPerPanel: 450
    }
  ];
  
  // Sample facilities data with analysis and energy estimation results
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: 1,
      name: "Apple Distribution Center",
      industry: "Technology",
      location: "Atlanta, GA",
      analysis: {
        facilityType: "Office/Warehouse",
        squareFootage: 250000,
        energyRate: 0.12,
        roofArea: 212500
      },
      energyEstimation: {
        annualUsage: 3500000,
        annualCost: 420000
      },
      solarPotential: {
        calculated: false,
        maxPanels: 0,
        selectedPanelType: '',
        annualProduction: 0,
        installationCost: 0,
        annualSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlyProduction: []
      }
    },
    {
      id: 2,
      name: "Honeywell Manufacturing Plant",
      industry: "Manufacturing",
      location: "Kansas City, MO",
      analysis: {
        facilityType: "Manufacturing",
        squareFootage: 180000,
        energyRate: 0.11,
        roofArea: 153000
      },
      energyEstimation: {
        annualUsage: 4500000,
        annualCost: 495000
      },
      solarPotential: {
        calculated: false,
        maxPanels: 0,
        selectedPanelType: '',
        annualProduction: 0,
        installationCost: 0,
        annualSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlyProduction: []
      }
    },
    {
      id: 3,
      name: "Apple Research Campus",
      industry: "Technology",
      location: "Denver, CO",
      analysis: {
        facilityType: "Office/Research",
        squareFootage: 120000,
        energyRate: 0.13,
        roofArea: 102000
      },
      energyEstimation: {
        annualUsage: 2160000,
        annualCost: 280800
      },
      solarPotential: {
        calculated: false,
        maxPanels: 0,
        selectedPanelType: '',
        annualProduction: 0,
        installationCost: 0,
        annualSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlyProduction: []
      }
    }
  ]);

  const currentFacility = facilities[currentFacilityIndex];
  const selectedPanel = panelTypes.find(panel => panel.id === selectedPanelType)!;

  // Solar panel data
  const solarData = {
    yearlyEnergy: '527,869.4 kWh/year',
    yearlyCost: '$69,678.76',
    installationSize: '377.2 kW',
    energyCovered: '82.4%',
    monthlyAverage: '$3,991.01',
    firstYear: '$47,892.14',
    tenYearTotal: '$433,761.89',
    costWithoutSolar: '$61,305.29',
    costWithSolar: '$827,973.05',
    totalLifetimeSavings: '$-766,667.76',
    breakEven: 'Not reached',
    address: '303 S Technology Ct, Broomfield, CO',
    state: 'CO',
    zipCode: '80021',
    energyRate: '$0.310/kWh',
    monthlyBill: '$5,806.56',
    panelsCount: '943 panels',
    solarIncentives: '$7,000.00',
    installationCost: '$4.00 per Watt',
    totalInstallationCost: '$1,075,020.00',
    panelCapacity: '400 Watts',
    roofArea: '45,000 sq ft',
    usableRoofArea: '32,000 sq ft',
    annualSunHours: '2,200 hours',
    co2Reduction: '176 tons/year',
    treeEquivalent: '4,100 trees',
    annualProduction: '435,383.1 kWh',
    remainingGridEnergy: '92,486.3 kWh',
    remainingCost: '$28,670.75',
    firstYearROI: '4.48%'
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

  const calculateSolarPotential = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Calculate how many panels can fit on the roof
      const panelArea = selectedPanel.dimensions.width * selectedPanel.dimensions.height;
      const usableRoofArea = currentFacility.analysis.roofArea * 0.7; // Assuming 70% of roof is usable
      const maxPanels = Math.floor(usableRoofArea / panelArea);
      
      // Calculate annual production based on location and panel efficiency
      let sunshineHoursPerYear = 0;
      if (currentFacility.location.includes("Atlanta")) {
        sunshineHoursPerYear = 2600;
      } else if (currentFacility.location.includes("Kansas City")) {
        sunshineHoursPerYear = 2400;
      } else if (currentFacility.location.includes("Denver")) {
        sunshineHoursPerYear = 3000;
      } else {
        sunshineHoursPerYear = 2500; // Default
      }
      
      const annualProduction = Math.round(maxPanels * selectedPanel.wattage * sunshineHoursPerYear * 0.75 / 1000); // kWh, with 75% efficiency factor
      
      // Calculate costs and savings
      const installationCost = Math.round(maxPanels * selectedPanel.costPerPanel + 50000); // Panel cost plus $50k base cost
      const annualSavings = Math.round(annualProduction * currentFacility.analysis.energyRate);
      const paybackPeriod = parseFloat((installationCost / annualSavings).toFixed(1));
      const roi = parseFloat(((annualSavings * 25 - installationCost) / installationCost * 100).toFixed(1)); // 25 year lifespan
      
      // Generate monthly production data based on seasonal variations
      const monthlyFactors = [0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.11, 0.10, 0.09, 0.08, 0.06, 0.05];
      const monthlyProduction = [
        { month: 'Jan', production: Math.round(annualProduction * monthlyFactors[0]) },
        { month: 'Feb', production: Math.round(annualProduction * monthlyFactors[1]) },
        { month: 'Mar', production: Math.round(annualProduction * monthlyFactors[2]) },
        { month: 'Apr', production: Math.round(annualProduction * monthlyFactors[3]) },
        { month: 'May', production: Math.round(annualProduction * monthlyFactors[4]) },
        { month: 'Jun', production: Math.round(annualProduction * monthlyFactors[5]) },
        { month: 'Jul', production: Math.round(annualProduction * monthlyFactors[6]) },
        { month: 'Aug', production: Math.round(annualProduction * monthlyFactors[7]) },
        { month: 'Sep', production: Math.round(annualProduction * monthlyFactors[8]) },
        { month: 'Oct', production: Math.round(annualProduction * monthlyFactors[9]) },
        { month: 'Nov', production: Math.round(annualProduction * monthlyFactors[10]) },
        { month: 'Dec', production: Math.round(annualProduction * monthlyFactors[11]) }
      ];
      
      // Update the current facility with solar potential data
      const updatedFacilities = [...facilities];
      updatedFacilities[currentFacilityIndex] = {
        ...currentFacility,
        solarPotential: {
          calculated: true,
          maxPanels,
          selectedPanelType: selectedPanel.id,
          annualProduction,
          installationCost,
          annualSavings,
          paybackPeriod,
          roi,
          monthlyProduction
        }
      };
      
      setFacilities(updatedFacilities);
      toast.success('Solar potential calculation complete');
    }, 2000);
  };

  const handleNext = () => {
    if (currentFacilityIndex < facilities.length - 1) {
      setCurrentFacilityIndex(currentFacilityIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFacilityIndex > 0) {
      setCurrentFacilityIndex(currentFacilityIndex - 1);
    }
  };

  const handleContinue = () => {
    if (facilities.filter(f => f.solarPotential.calculated).length === 0) {
      toast.error('Please calculate solar potential for at least one facility before continuing');
      return;
    }
    navigate('/email-automation');
  };

  const handlePanelTypeChange = (panelId: string) => {
    setSelectedPanelType(panelId);
    
    // If we already have calculations, recalculate with the new panel type
    if (currentFacility.solarPotential.calculated) {
      calculateSolarPotential();
    }
  };

  // Calculate percentage of energy that can be offset by solar
  const calculateEnergyOffset = () => {
    if (!currentFacility.solarPotential.calculated) return 0;
    
    return Math.min(100, Math.round((currentFacility.solarPotential.annualProduction / currentFacility.energyEstimation.annualUsage) * 100));
  };

  // Data for the energy offset pie chart
  const energyOffsetData = [
    { name: 'Solar Energy', value: calculateEnergyOffset() },
    { name: 'Grid Energy', value: 100 - calculateEnergyOffset() }
  ];
  
  const COLORS = ['#4ade80', '#94a3b8'];

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
              onClick={() => navigate('/energy-usage-estimation')}
              className="btn btn-circle btn-ghost"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold">Solar Panel Potential</h1>
          </div>
        </div>

        {isCalculating ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body flex flex-col items-center justify-center py-16">
              <div className="loading loading-spinner loading-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Calculating Solar Potential</h3>
              <p className="text-gray-500 mt-2">
                Our AI is analyzing roof area, sun exposure, and energy requirements to determine optimal solar installation...
              </p>
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between mb-2">
                  <span>Analyzing roof geometry</span>
                  <span>100%</span>
                </div>
                <progress className="progress progress-primary w-full" value="100" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Calculating sun exposure</span>
                  <span>95%</span>
                </div>
                <progress className="progress progress-primary w-full" value="95" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Determining optimal panel placement</span>
                  <span>80%</span>
                </div>
                <progress className="progress progress-primary w-full" value="80" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Estimating energy production</span>
                  <span>60%</span>
                </div>
                <progress className="progress progress-primary w-full" value="60" max="100"></progress>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Solar Image */}
            <div className="card bg-base-100 shadow-lg overflow-hidden">
              <div className="card-body p-0">
                <div className="relative">
                  <img 
                    src="/images/solar/Screenshot.png" 
                    alt="Solar Potential Map" 
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <span className="text-primary">IMPERIUM SOLIS</span>
                      <span className="text-orange-500">☀️</span>
                    </h3>
                    <p className="text-sm">Solar Potential Analysis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solar Overview */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl flex items-center gap-2">
                  <div className="text-primary">
                    <FaSolarPanel size={24} />
                  </div>
                  Solar Installation Overview
                </h2>
                <p className="text-gray-600">
                  Based on our analysis of the facility's roof area, sun exposure, and energy requirements, 
                  we've determined the optimal solar panel installation configuration:
                </p>
              </div>
            </div>

            {/* Solar Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaSolarPanel className="text-primary" />
                    Installation Details
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installation Size:</span>
                      <span className="font-semibold">{solarData.installationSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panel Count:</span>
                      <span className="font-semibold">{solarData.panelsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panel Capacity:</span>
                      <span className="font-semibold">{solarData.panelCapacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installation Cost:</span>
                      <span className="font-semibold">{solarData.installationCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600" />
                    Financial Benefits
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yearly Savings:</span>
                      <span className="font-semibold">{solarData.yearlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Average:</span>
                      <span className="font-semibold">{solarData.monthlyAverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Year:</span>
                      <span className="font-semibold">{solarData.firstYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solar Incentives:</span>
                      <span className="font-semibold">{solarData.solarIncentives}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <MdOutlineWbSunny className="text-yellow-500" />
                    Solar Potential
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roof Area:</span>
                      <span className="font-semibold">{solarData.roofArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usable Area:</span>
                      <span className="font-semibold">{solarData.usableRoofArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Sun Hours:</span>
                      <span className="font-semibold">{solarData.annualSunHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Covered:</span>
                      <span className="font-semibold">{solarData.energyCovered}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaLeaf className="text-green-600" />
                    Environmental Impact
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO2 Reduction:</span>
                      <span className="font-semibold">{solarData.co2Reduction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tree Equivalent:</span>
                      <span className="font-semibold">{solarData.treeEquivalent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yearly Energy:</span>
                      <span className="font-semibold">{solarData.yearlyEnergy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Production Chart */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <FaChartLine className="text-primary" />
                  Monthly Energy Production
                </h3>
                <div className="mt-6">
                  <div className="h-64 w-full">
                    {/* This would be a bar chart in a real implementation */}
                    <div className="flex h-48 items-end justify-between">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                        // Generate a realistic solar production curve (higher in summer, lower in winter)
                        const monthIndex = index + 1;
                        const normalizedValue = Math.sin((monthIndex / 12) * Math.PI) * 0.5 + 0.5;
                        const height = 30 + normalizedValue * 70; // Between 30% and 100%
                        
                        return (
                          <div key={month} className="flex flex-col items-center">
                            <div 
                              className="w-8 bg-yellow-500 rounded-t-sm" 
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="mt-2 text-xs">{month}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="text-sm text-gray-500">Lowest: 15,500 kWh (Dec)</div>
                    <div className="text-sm text-gray-500">Highest: 28,000 kWh (Jun)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineCalculate className="text-primary" />
                  Return on Investment Analysis
                </h3>
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Energy Production</th>
                          <th>Savings</th>
                          <th>Cumulative Savings</th>
                          <th>ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 10, 15, 20, 25].map(year => {
                          // Calculate values based on year
                          const degradation = 1 - (year * 0.005); // 0.5% degradation per year
                          const production = Math.round(249087 * degradation);
                          const savings = Math.round(77217 * degradation);
                          const cumulative = savings * year;
                          const installationCost = 622500; // 622 panels * 250W * $4/W
                          const roi = ((cumulative / installationCost) * 100).toFixed(1);
                          
                          return (
                            <tr key={year} className={year === 1 ? "bg-base-200" : ""}>
                              <td>{year}</td>
                              <td>{production.toLocaleString()} kWh</td>
                              <td>${savings.toLocaleString()}</td>
                              <td>${cumulative.toLocaleString()}</td>
                              <td>{roi}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Calculations Section */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineCalculate className="text-primary" />
                  Detailed Cost Calculations
                </h3>
                <div className="mt-6">
                  <div className="tabs tabs-boxed mb-6">
                    <a className="tab tab-active">Yearly Energy Costs</a>
                    <a className="tab">Cost Without Solar</a>
                    <a className="tab">Cost With Solar</a>
                    <a className="tab">Total Lifetime Savings</a>
                    <a className="tab">Break-Even Analysis</a>
                  </div>

                  {/* Yearly Energy Costs */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Yearly Energy Costs</h4>
                    
                    <div className="bg-base-200 p-4 rounded-lg mb-6">
                      <h5 className="font-semibold mb-2">INPUTS:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Energy Consumption:</span>
                          <span className="font-semibold">527,869.4 kWh/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Local Energy Rate:</span>
                          <span className="font-semibold">$0.310/kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">System Size:</span>
                          <span className="font-semibold">377.2 kW</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Installation Cost:</span>
                          <span className="font-semibold">$1,075,020.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost per Watt:</span>
                          <span className="font-semibold">$4.00/watt</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Solar Incentives:</span>
                          <span className="font-semibold">$7,000.00</span>
                        </div>
                      </div>
                    </div>
                    
                    <h5 className="font-semibold mb-2">CALCULATION:</h5>
                    
                    <div className="mb-6">
                      <h6 className="font-semibold mb-2">1. Current Annual Energy Cost:</h6>
                      <div className="pl-4 border-l-2 border-primary">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">a. Annual Consumption:</span>
                          <span>527,869.4 kWh</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">b. Energy Rate:</span>
                          <span>$0.310/kWh</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-600">c. Annual Cost:</span>
                          <span>$69,678.76</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h6 className="font-semibold mb-2">2. Annual Solar Production:</h6>
                      <div className="pl-4 border-l-2 border-primary">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">a. Monthly Production:</span>
                          <span>36,281.9 kWh</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">b. Annual Production:</span>
                          <span>435,383.1 kWh</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-600">c. Production Value:</span>
                          <span>$134,968.76</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h6 className="font-semibold mb-2">3. Remaining Grid Energy:</h6>
                      <div className="pl-4 border-l-2 border-primary">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">a. Annual Consumption:</span>
                          <span>527,869.4 kWh</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">b. Annual Production:</span>
                          <span>435,383.1 kWh</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">c. Remaining Energy:</span>
                          <span>92,486.3 kWh</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-600">d. Remaining Cost:</span>
                          <span>$28,670.75</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h6 className="font-semibold mb-2">4. First Year Savings:</h6>
                      <div className="pl-4 border-l-2 border-primary">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">a. Original Annual Cost:</span>
                          <span>$69,678.76</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">b. New Annual Cost:</span>
                          <span>$28,670.75</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-600">c. Annual Savings:</span>
                          <span>$47,892.14</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h6 className="font-semibold mb-2">5. Return on Investment (First Year):</h6>
                      <div className="pl-4 border-l-2 border-primary">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">a. Net Installation Cost:</span>
                          <span>$1,068,020.00</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-600">b. First Year ROI:</span>
                          <span>4.48%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-base-200 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">INDUSTRY BENCHMARKS:</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Commercial solar typically yields 5-10% first-year ROI</li>
                        <li>System production is calculated using conservative estimates</li>
                        <li>First year has highest production before panel degradation begins</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Installation Timeline */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <FaRegCalendarAlt className="text-primary" />
                  Installation Timeline
                </h3>
                <div className="mt-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 1-2</div>
                      <div className="flex-1">
                        <div className="bg-primary text-primary-content p-3 rounded-lg">
                          <h4 className="font-semibold">Site Assessment & Engineering</h4>
                          <p className="text-sm">Detailed roof inspection, structural analysis, and system design</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 3-4</div>
                      <div className="flex-1">
                        <div className="bg-secondary text-secondary-content p-3 rounded-lg">
                          <h4 className="font-semibold">Permitting & Approvals</h4>
                          <p className="text-sm">Obtaining necessary permits and utility approvals</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 5-7</div>
                      <div className="flex-1">
                        <div className="bg-accent text-accent-content p-3 rounded-lg">
                          <h4 className="font-semibold">Installation</h4>
                          <p className="text-sm">Mounting system installation, panel placement, and electrical wiring</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 8</div>
                      <div className="flex-1">
                        <div className="bg-info text-info-content p-3 rounded-lg">
                          <h4 className="font-semibold">Inspection & Commissioning</h4>
                          <p className="text-sm">Final inspection, utility connection, and system activation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="card-title text-lg">Next Steps</h3>
                <p>
                  Based on our comprehensive analysis, this facility is an excellent candidate for solar installation. 
                  The next step is to reach out to the facility manager to discuss this opportunity and schedule a site visit.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button 
                    onClick={handleContinue}
                    className="btn btn-outline btn-sm"
                  >
                    Prepare Outreach Email
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleContinue}
                className="btn btn-primary btn-lg flex items-center gap-2"
              >
                Continue to Email Automation
                <MdArrowForward size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SolarPanelPotential; 