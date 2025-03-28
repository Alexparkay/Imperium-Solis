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
            <p className="text-gray-400">Preparing your solar potential report...</p>
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
                onClick={() => navigate('/energy-usage-estimation')}
                className="btn btn-circle btn-ghost hover:bg-amber-500/10 transition-colors"
              >
                <MdArrowBack size={24} className="text-amber-500" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Solar Panel Potential
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
                  Calculating Solar Potential
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
                  Our AI is analyzing roof area, sun exposure, and energy requirements to determine optimal solar installation...
                </p>
                <div className="w-full max-w-md space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Analyzing roof geometry</span>
                      <span className="text-amber-500 font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Calculating sun exposure</span>
                      <span className="text-amber-500 font-medium">95%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Determining optimal panel placement</span>
                      <span className="text-amber-500 font-medium">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Estimating energy production</span>
                      <span className="text-amber-500 font-medium">60%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Solar Image */}
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
                
                <div className="card-body p-0 relative z-10">
                  <div className="relative">
                    <img 
                      src="/images/solar/Screenshot.png" 
                      alt="Solar Potential Map" 
                      className="w-full h-auto"
                    />
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 px-8 py-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 w-[295px]">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg">
                          <MdSolarPower className="text-lg text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">IMPERIUM SOLIS</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Solar Potential Analysis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Overview */}
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
                      <FaSolarPanel size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Solar Installation Overview
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-3">
                        Based on our analysis of the facility's roof area, sun exposure, and energy requirements, 
                        we've determined the optimal solar panel installation configuration:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Installation Details Card */}
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
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaSolarPanel className="text-2xl" />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-6">Installation Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Installation Size</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.installationSize}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Panel Count</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.panelsCount}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Panel Capacity</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.panelCapacity}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 dark:text-gray-400">Installation Cost</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.installationCost}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Benefits Card */}
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
                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaMoneyBillWave className="text-2xl" />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-6">Financial Benefits</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Yearly Savings</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.yearlyCost}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Monthly Average</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.monthlyAverage}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">First Year</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.firstYear}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 dark:text-gray-400">Solar Incentives</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.solarIncentives}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solar Potential Card */}
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
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl group-hover:bg-yellow-500/20 transition-all duration-300"></div>
                  
                  <div className="card-body relative z-10">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <MdOutlineWbSunny className="text-2xl" />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-6">Solar Potential</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Roof Area</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.roofArea}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Usable Area</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.usableRoofArea}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Annual Sun Hours</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.annualSunHours}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 dark:text-gray-400">Energy Covered</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.energyCovered}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact Card */}
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
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-300"></div>
                  
                  <div className="card-body relative z-10">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaLeaf className="text-2xl" />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-6">Environmental Impact</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">CO2 Reduction</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.co2Reduction}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Tree Equivalent</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.treeEquivalent}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Yearly Energy</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.yearlyEnergy}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 dark:text-gray-400">Energy Rate</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{solarData.energyRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Production Chart */}
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
                      <FaChartLine size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Monthly Energy Production
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Estimated solar energy production throughout the year
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="relative h-80">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 bottom-10 w-16 flex flex-col justify-between">
                          {[30000, 25000, 20000, 15000, 10000, 5000, 0].map((value) => (
                            <div key={value} className="text-xs text-gray-500 dark:text-gray-400 -translate-x-2">
                              {value.toLocaleString()}
                            </div>
                          ))}
                        </div>

                        {/* Graph area */}
                        <div className="absolute left-16 right-16 top-0 bottom-0">
                          {/* Grid lines */}
                          <div className="absolute inset-0 grid grid-rows-6 gap-0">
                            {[...Array(7)].map((_, i) => (
                              <div
                                key={i}
                                className="border-t border-gray-200 dark:border-gray-700"
                              />
                            ))}
                          </div>

                          {/* Bars container */}
                          <div className="absolute inset-0 flex items-end justify-between pb-10">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                              // Generate a realistic solar production curve (higher in summer, lower in winter)
                              const monthIndex = index + 1;
                              const normalizedValue = Math.sin((monthIndex / 12) * Math.PI) * 0.5 + 0.5;
                              const height = 30 + normalizedValue * 70; // Between 30% and 100%
                              const value = Math.round(30000 * (height / 100));
                              
                              return (
                                <div
                                  key={month}
                                  className="relative group"
                                  style={{ height: '100%', width: `${100 / 12}%` }}
                                >
                                  {/* Production bar */}
                                  <div
                                    className="absolute bottom-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg transition-all duration-300 group-hover:to-yellow-300"
                                    style={{ height: `${height}%` }}
                                  >
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                      <div className="font-medium">{value.toLocaleString()} kWh</div>
                                      <div className="text-gray-300">${(value * 0.31).toLocaleString()}</div>
                                    </div>
                                  </div>

                                  {/* Month label */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    {month}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Peak Production</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">28,000 kWh</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">June</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Lowest Production</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">15,500 kWh</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">December</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Analysis */}
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
                      <MdOutlineCalculate size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Return on Investment Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Detailed financial analysis over a 25-year period
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="overflow-x-auto">
                        <table className="table w-full">
                          <thead>
                            <tr>
                              <th className="bg-transparent">Year</th>
                              <th className="bg-transparent">Energy Production</th>
                              <th className="bg-transparent">Savings</th>
                              <th className="bg-transparent">Cumulative Savings</th>
                              <th className="bg-transparent">ROI</th>
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
                                <tr key={year} className={year === 1 ? "bg-white dark:bg-gray-700/50" : ""}>
                                  <td className="font-medium">{year}</td>
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
              </div>

              {/* Installation Timeline */}
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
                      <FaRegCalendarAlt size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Installation Timeline
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Estimated timeline for the solar installation process
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex flex-col gap-6">
                        <div className="flex">
                          <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 1-2</div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                              <h4 className="font-semibold">Site Assessment & Engineering</h4>
                              <p className="text-sm opacity-90">Detailed roof inspection, structural analysis, and system design</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 3-4</div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                              <h4 className="font-semibold">Permitting & Approvals</h4>
                              <p className="text-sm opacity-90">Obtaining necessary permits and utility approvals</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 5-7</div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                              <h4 className="font-semibold">Installation</h4>
                              <p className="text-sm opacity-90">Mounting system installation, panel placement, and electrical wiring</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-24 flex-shrink-0 text-right pr-4 font-semibold">Week 8</div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                              <h4 className="font-semibold">Inspection & Commissioning</h4>
                              <p className="text-sm opacity-90">Final inspection, utility connection, and system activation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="card bg-gradient-to-br from-amber-500 to-amber-600 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-black/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-white/10 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
                      <FaSolarPanel size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Next Steps</h3>
                      <p className="text-white/90 text-lg leading-relaxed">
                        Based on our comprehensive analysis, this facility is an excellent candidate for solar installation. 
                        The next step is to reach out to the facility manager to discuss this opportunity and schedule a site visit.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all backdrop-blur-sm transform hover:scale-105">
                      Contact Facility Manager
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-amber-600 font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      Generate Proposal
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Continue Button */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleContinue}
                  className="relative group overflow-hidden"
                >
                  <div className="relative z-10 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
                    <span className="text-lg">Continue to Email Automation</span>
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

export default SolarPanelPotential; 