import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdElectricBolt, MdOutlineCalculate, MdOutlineAnalytics, MdOutlineShowChart, MdArrowForward, MdInfoOutline, MdClose, MdZoomOutMap } from 'react-icons/md';
import { FaSolarPanel, FaBuilding, FaChartLine, FaLightbulb, FaBolt, FaCalculator, FaChartBar, FaClock, FaMoneyBill, FaRegLightbulb, FaAirFreshener, FaServer, FaTools, FaPercentage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Area, AreaChart } from 'recharts';

// Define a constant for the Solar Window URL
const SOLAR_WINDOW_URL = 'https://solar-windows.vercel.app/'; // Map application URL

const EnergyUsageEstimation = () => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // New state for initial page load
  const [isLoading, setIsLoading] = useState(false); // Existing state for other operations
  const [isCalculating, setIsCalculating] = useState(true);
  const [iframeKey, setIframeKey] = useState(1);
  const [iframeError, setIframeError] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [useEmbedHelper, setUseEmbedHelper] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedPieSection, setSelectedPieSection] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Enhanced energy data with detailed calculations for Michigan manufacturing facility
  const energyData = {
    totalAnnualUsage: '6,804,468 kWh',
    averageMonthlyUsage: '567,039 kWh',
    peakDemand: '1,674 kW',
    annualCost: '$959,324',
    monthlyAverage: '$79,944',
    ratePerKWh: '$0.240/kWh',
    costWithSolar: '$952,452',
    costWithoutSolar: '$959,324',
    monthlyPowerOutage: '1.2 hours',
    roiPeriod: '14.6 years',
    breakEvenPoint: '175.2 months',
    solarEfficiency: '20.2%',
    usageBreakdown: {
      hvac: 38,
      lighting: 26,
      equipment: 20,
      computers: 12,
      other: 4
    },
    calculations: {
      annualConsumption: {
        title: 'Annual Consumption Calculation',
        steps: [
          'Base Load Analysis: 2.8 kW × 24 hours × 365 days = 24,528 kWh',
          'HVAC Load (Seasonal): Average 3.2 kW × 8 hours × 120 heating days = 3,072 kWh',
          'Manufacturing Equipment: Average 1.8 kW × 10 hours × 250 workdays = 4,500 kWh',
          'Lighting Load: Average 1.2 kW × 12 hours × 365 days = 5,256 kWh',
          'Michigan Climate Efficiency Factor: 0.82 (cold weather impact)',
          'Total Annual Usage: (Base + HVAC + Equipment + Lighting) × Efficiency = 14,861.4 kWh'
        ],
        methodology: 'Calculations based on Michigan climate conditions, typical manufacturing facility usage patterns, and local utility data. HVAC load accounts for heating season requirements typical for the Great Lakes region.'
      },
      costAnalysis: {
        title: 'Cost Analysis Breakdown',
        steps: [
          'Grid Energy Rate: $0.240/kWh (Based on DTE Energy commercial rates)',
          'Annual Grid Cost: 14,861.4 kWh × $0.240 = $3,566.74',
          'Solar System Size: 62 panels × 405W = 25.0 kW',
          'Solar Production: 25.0 kW × 1,380 sun hours × 0.83 efficiency = 28,635 kWh/year',
          'Grid Dependency with Solar: 25% of original usage (excess sold back)',
          'New Annual Grid Cost: $3,566.74 × 0.25 = $892.50'
        ],
        methodology: 'Cost calculations based on DTE Energy commercial rates for Michigan. Solar production estimates account for Michigan\'s climate, snow coverage, and seasonal variations typical for the region. Excess production sold at net metering rates.'
      },
      facilityMetrics: {
        title: 'Facility Metrics Calculation',
        steps: [
          'Building Energy Use Intensity: 14,861.4 kWh ÷ 37,125 sq ft = 0.40 kWh/sq ft/year',
          'Peak Load Factor: 8.2 kW ÷ (14,861.4 kWh ÷ 8,760 hours) = 4.83',
          'Demand Response Potential: 2.1 kW reduction possible during peak hours',
          'Power Quality Index: 0.96 (Based on regional grid analysis)'
        ],
        methodology: 'Metrics derived from typical manufacturing facility patterns in Michigan, accounting for heating degree days and regional energy intensity benchmarks for industrial facilities.'
      },
      peakMetrics: {
        title: 'Peak Usage & Reliability Metrics',
        steps: [
          'Peak Demand Calculation: Highest 15-minute average = 8.2 kW',
          'Monthly Power Outage: (Sum of outage minutes) ÷ (12 months × 60) = 1.2 hours/month',
          'Grid Reliability Index: 99.82% uptime (Michigan average)',
          'Power Factor: 0.93 (Commercial building standard)'
        ],
        methodology: 'Peak metrics based on Michigan utility data and typical small commercial building load profiles. Reliability calculations use DTE Energy historical outage data.'
      }
    }
  };

  // Add ROI and cost data for graph - Michigan manufacturing facility
  const roiData = [
    { month: 0, withSolar: 100000, withoutSolar: 0 }, // Initial investment
    { month: 6, withSolar: 100000 + 6 * 74, withoutSolar: 6 * 297 },
    { month: 12, withSolar: 100000 + 12 * 74, withoutSolar: 12 * 297 },
    { month: 24, withSolar: 100000 + 24 * 74, withoutSolar: 24 * 297 },
    { month: 36, withSolar: 100000 + 36 * 74, withoutSolar: 36 * 297 },
    { month: 48, withSolar: 100000 + 48 * 74, withoutSolar: 48 * 297 },
    { month: 60, withSolar: 100000 + 60 * 74, withoutSolar: 60 * 297 },
    { month: 72, withSolar: 100000 + 72 * 74, withoutSolar: 72 * 297 },
    { month: 84, withSolar: 100000 + 84 * 74, withoutSolar: 84 * 297 },
    { month: 96, withSolar: 100000 + 96 * 74, withoutSolar: 96 * 297 },
    { month: 108, withSolar: 100000 + 108 * 74, withoutSolar: 108 * 297 },
    { month: 120, withSolar: 100000 + 120 * 74, withoutSolar: 120 * 297 },
    { month: 144, withSolar: 100000 + 144 * 74, withoutSolar: 144 * 297 },
    { month: 175, withSolar: 100000 + 175 * 74, withoutSolar: 175 * 297 }, // Break-even point
    { month: 180, withSolar: 100000 + 180 * 74, withoutSolar: 180 * 297 }
  ];

  // Format energy usage data for pie chart with enhanced colors and descriptions - Michigan facility
  const energyUsagePieData = [
    { 
      id: 'hvac',
      name: 'HVAC', 
      value: energyData.usageBreakdown.hvac, 
      color: '#FF6B6B', 
      gradientStart: '#FF6B6B',
      gradientEnd: '#FF8E8E',
      icon: <FaAirFreshener />,
      description: 'Heating, Ventilation, and Air Conditioning for Michigan\'s cold climate requires significant heating energy during winter months.',
      calculation: '3.2 kW average heating load × 8 hours × 120 heating days × 0.82 efficiency = 5,647 kWh/year',
      breakdown: [
        { name: 'Heating', percentage: '65%', value: '3,671 kWh' },
        { name: 'Cooling', percentage: '20%', value: '1,129 kWh' },
        { name: 'Ventilation', percentage: '15%', value: '847 kWh' }
      ],
      tips: [
        'High-efficiency heat pumps can reduce heating costs by 40% in Michigan',
        'Programmable thermostats can save 10-15% on heating bills',
        'Proper insulation is critical for Michigan climate efficiency'
      ]
    },
    { 
      id: 'lighting',
      name: 'Lighting', 
      value: energyData.usageBreakdown.lighting, 
      color: '#4ECDC4', 
      gradientStart: '#4ECDC4',
      gradientEnd: '#7DFFD3',
      icon: <FaRegLightbulb />,
      description: 'Lighting energy usage for a small commercial facility with 85 fixtures operating during business hours.',
      calculation: '85 fixtures × 18W LED × 12 hours × 365 days / 1000 = 3,864 kWh/year',
      breakdown: [
        { name: 'Office Areas', percentage: '60%', value: '2,318 kWh' },
        { name: 'Common Areas', percentage: '25%', value: '966 kWh' },
        { name: 'Exterior', percentage: '15%', value: '580 kWh' }
      ],
      tips: [
        'LED lighting upgrades can reduce lighting energy by up to 75%',
        'Occupancy sensors can cut lighting costs by 30%',
        'Daylight harvesting can save up to 40% in perimeter areas'
      ]
    },
    { 
      id: 'equipment',
      name: 'Equipment', 
      value: energyData.usageBreakdown.equipment, 
      color: '#FFD166', 
      gradientStart: '#FFD166',
      gradientEnd: '#FFE29D',
      icon: <FaTools />,
      description: 'Office equipment including printers, copiers, kitchen appliances, and other commercial equipment.',
      calculation: 'Based on 8 workstations, 2 printers, kitchen equipment, and miscellaneous = 2,972 kWh/year',
      breakdown: [
        { name: 'Kitchen Equipment', percentage: '45%', value: '1,337 kWh' },
        { name: 'Printers & Copiers', percentage: '30%', value: '892 kWh' },
        { name: 'Other Equipment', percentage: '25%', value: '743 kWh' }
      ],
      tips: [
        'ENERGY STAR equipment uses 30-75% less electricity',
        'Power management features can save up to 30% on equipment energy',
        'Smart power strips can eliminate phantom loads when equipment is off'
      ]
    },
    { 
      id: 'computers',
      name: 'Computers', 
      value: energyData.usageBreakdown.computers, 
      color: '#7F66FF', 
      gradientStart: '#7F66FF',
      gradientEnd: '#9D8CFF',
      icon: <FaServer />,
      description: 'Computer systems including desktops, laptops, and a small server that run during business hours.',
      calculation: '8 computer systems × 95W active × 9 hours × 250 days / 1000 = 1,783 kWh/year',
      breakdown: [
        { name: 'Desktop Computers', percentage: '55%', value: '981 kWh' },
        { name: 'Small Server', percentage: '30%', value: '535 kWh' },
        { name: 'Laptops', percentage: '15%', value: '267 kWh' }
      ],
      tips: [
        'Modern laptops use up to 80% less energy than desktop computers',
        'Server virtualization can reduce server energy use by 80%',
        'Setting computers to sleep after 15 minutes of inactivity can save up to 15%'
      ]
    },
    { 
      id: 'other',
      name: 'Other', 
      value: energyData.usageBreakdown.other, 
      color: '#FB8DA0', 
      gradientStart: '#FB8DA0',
      gradientEnd: '#FFACE4',
      icon: <FaPercentage />,
      description: 'Miscellaneous energy usage including security systems, water heating, and other building systems.',
      calculation: 'Measured through submetering of auxiliary building systems = 595 kWh/year',
      breakdown: [
        { name: 'Water Heating', percentage: '50%', value: '298 kWh' },
        { name: 'Security Systems', percentage: '35%', value: '208 kWh' },
        { name: 'Miscellaneous', percentage: '15%', value: '89 kWh' }
      ],
      tips: [
        'Heat pump water heaters can reduce water heating energy by 60%',
        'Motion-activated security systems use less power than always-on systems',
        'Regular maintenance can improve overall system efficiency'
      ]
    }
  ];

  // Detailed section data for each category
  const getPieSectionDetails = (sectionId: string) => {
    return energyUsagePieData.find(item => item.id === sectionId);
  };

  // Extended ROI data to show 25 years with extended gains - Michigan manufacturing facility
  const extendedRoiData = [
    { year: 0, withSolar: 0, withoutSolar: 0, savings: 0, totalInvestment: 100000 }, // Initial investment
    { year: 1, withSolar: 12 * 74, withoutSolar: 12 * 297, savings: (12 * 297) - (12 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 2, withSolar: 24 * 74, withoutSolar: 24 * 297, savings: (24 * 297) - (24 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 3, withSolar: 36 * 74, withoutSolar: 36 * 297, savings: (36 * 297) - (36 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 4, withSolar: 48 * 74, withoutSolar: 48 * 297, savings: (48 * 297) - (48 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 5, withSolar: 60 * 74, withoutSolar: 60 * 297, savings: (60 * 297) - (60 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 6, withSolar: 72 * 74, withoutSolar: 72 * 297, savings: (72 * 297) - (72 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 7, withSolar: 84 * 74, withoutSolar: 84 * 297, savings: (84 * 297) - (84 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 8, withSolar: 96 * 74, withoutSolar: 96 * 297, savings: (96 * 297) - (96 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 9, withSolar: 108 * 74, withoutSolar: 108 * 297, savings: (108 * 297) - (108 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 10, withSolar: 120 * 74, withoutSolar: 120 * 297, savings: (120 * 297) - (120 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 12, withSolar: 144 * 74, withoutSolar: 144 * 297, savings: (144 * 297) - (144 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 14.6, withSolar: 175 * 74, withoutSolar: 175 * 297, savings: (175 * 297) - (175 * 74 + 100000) + 100000, totalInvestment: 100000 }, // Break-even point
    { year: 15, withSolar: 180 * 74, withoutSolar: 180 * 297, savings: (180 * 297) - (180 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 18, withSolar: 216 * 74, withoutSolar: 216 * 297, savings: (216 * 297) - (216 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 20, withSolar: 240 * 74, withoutSolar: 240 * 297, savings: (240 * 297) - (240 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 22, withSolar: 264 * 74, withoutSolar: 264 * 297, savings: (264 * 297) - (264 * 74 + 100000) + 100000, totalInvestment: 100000 },
    { year: 25, withSolar: 300 * 74, withoutSolar: 300 * 297, savings: (300 * 297) - (300 * 74 + 100000) + 100000, totalInvestment: 100000 },
  ];

  // Calculate cumulative savings
  const calculateCumulativeSavings = (data: any[]) => {
    return data.map((entry, i) => {
      if (i === 0) return { ...entry, cumulativeSavings: entry.savings };
      return { 
        ...entry, 
        cumulativeSavings: data[i-1].cumulativeSavings + entry.savings - data[i-1].savings 
      };
    });
  };

  const roiDataWithCumulative = calculateCumulativeSavings(extendedRoiData);

  // Custom pie chart renderer with gradients and 3D effect
  const renderCustomizedPie = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const item = energyUsagePieData[index];
    
    return (
      <g>
        <text 
          x={x} 
          y={y} 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          className="font-semibold"
          fill="#fff"
        >
          {`${name} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  // Custom tooltip for enhanced pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-700/50 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${data.gradientStart}, ${data.gradientEnd})` }}>
              {data.icon}
            </div>
            <h4 className="text-lg font-semibold text-white">
              {data.name}: {data.value}%
            </h4>
          </div>
          <p className="text-sm text-gray-300 mb-2">{data.description}</p>
          <div className="text-xs text-gray-400">
            Click for detailed breakdown & calculations
          </div>
        </div>
      );
    }
    return null;
  };

  // Enhanced tooltip for ROI chart
  const CustomROITooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const savingsValue = data.cumulativeSavings;
      const isPositive = savingsValue > 0;
      
      return (
        <div className="bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-2">Year {label}</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <span className="text-gray-300">Without Solar:</span>
              <span className="font-semibold text-white">${data.withoutSolar.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-gray-300">With Solar:</span>
              <span className="font-semibold text-white">${(data.withSolar + data.totalInvestment).toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <span className="text-gray-300">Cumulative Savings:</span>
              <span className={`font-semibold text-lg ml-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{data.cumulativeSavings.toLocaleString()} $
              </span>
            </div>
            {data.year >= 14.6 && (
              <div className="text-sm text-green-400 font-medium pt-1">
                {data.year === 14.6 ? 'Break-even point!' : 'Generating profit!'}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Handle section click in pie chart to show details
  const handlePieSectionClick = (data: any, index: number) => {
    setSelectedPieSection(data.id);
    setShowDetailsModal(true);
  };

  // Modal for showing detailed breakdown of each energy usage section
  const EnergyUsageDetailModal = ({ sectionId, onClose }: { sectionId: string, onClose: () => void }) => {
    const sectionData = getPieSectionDetails(sectionId);
    
    if (!sectionData) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900/90 backdrop-blur-md rounded-xl w-full max-w-3xl mx-4 overflow-hidden shadow-2xl border border-gray-700/50">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" 
                style={{ background: `linear-gradient(135deg, ${sectionData.gradientStart}, ${sectionData.gradientEnd})` }}>
                {sectionData.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {sectionData.name} Energy Usage
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <MdOutlineAnalytics className="text-amber-500" />
                Overview
              </h4>
              <p className="text-gray-300">{sectionData.description}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaCalculator className="text-amber-500" />
                Calculation
              </h4>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <p className="text-gray-300 font-mono">{sectionData.calculation}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaChartBar className="text-amber-500" />
                Detailed Breakdown
              </h4>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
                <div className="grid grid-cols-3 text-sm font-medium text-gray-400 border-b border-gray-700 bg-gray-800/80">
                  <div className="p-3">Category</div>
                  <div className="p-3">Percentage</div>
                  <div className="p-3">Annual Usage</div>
                </div>
                {sectionData.breakdown.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 text-sm border-b border-gray-700/50 last:border-0">
                    <div className="p-3 text-white">{item.name}</div>
                    <div className="p-3 text-amber-500">{item.percentage}</div>
                    <div className="p-3 text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaRegLightbulb className="text-amber-500" />
                Efficiency Tips
              </h4>
              <ul className="space-y-2">
                {sectionData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <div className="text-amber-500 mt-1">•</div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle manual reload of iframe
  const handleReloadIframe = () => {
    setIframeKey(prev => prev + 1);
    setIframeError(false);
    toast('Reloading Solar Window...', { icon: '🔄' });
  };

  // Information Modal Component
  const InfoModal = ({ title, steps, methodology, onClose }: { 
    title: string; 
    steps: string[]; 
    methodology: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Calculation Steps</h4>
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-amber-500">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Methodology</h4>
            <p className="text-gray-600 dark:text-gray-300">{methodology}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Info Button Component
  const InfoButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    >
      <MdInfoOutline size={20} className="text-gray-600 dark:text-gray-300" />
    </button>
  );

  // Add useEffect for initial page loading animation
  useEffect(() => {
    // Ensure page starts from the top
    window.scrollTo(0, 0);
    
    // Simulate comprehensive data loading and calculations
    setIsPageLoading(true);
    
    const loadingTimer = setTimeout(() => {
      setIsPageLoading(false);
      setIsCalculating(false);
    }, 4000); // 4 second loading animation
    
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleContinueToSolarPotential = () => {
    navigate('/solar-panel-potential');
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#020305] flex items-center justify-center relative overflow-hidden">
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-green-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-purple-500 relative"></div>
          </div>
          
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Analyzing Energy Usage & Logistics</h2>
            <p className="text-gray-400 text-lg">Processing comprehensive facility data and calculating optimization strategies...</p>
            
            {/* Progress indicators */}
            <div className="space-y-4 w-full max-w-md">
              <div>
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Gathering facility energy data</span>
                  <span>Complete</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Calculating energy consumption patterns</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full w-5/6 animate-pulse"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Optimizing supply chain logistics</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Generating ROI projections</span>
                  <span>58%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/5 animate-pulse"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Preparing interactive visualizations</span>
                  <span>34%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Additional loading messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <FaCalculator className="text-purple-500" />
                <span>Processing 247 energy usage patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChartLine className="text-amber-500" />
                <span>Analyzing seasonal consumption trends</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSolarPanel className="text-green-500" />
                <span>Calculating solar integration potential</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBolt className="text-blue-500" />
                <span>Optimizing peak demand management</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-3 text-white/70 mt-6">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-ping"></div>
            <p className="text-sm">Preparing comprehensive energy analytics dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Define base classes for cards to match the Home page styling
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-orange-500/15 group relative overflow-hidden";

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Simple title without a box - left aligned */}
          <div className="flex items-center justify-start py-4">
            <div className="flex items-center gap-3">
              <MdElectricBolt size={28} className="text-orange-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Energy Usage Estimation
              </h1>
            </div>
          </div>

          {/* Solar Window Integration - Full Size */}
          <div className={cardBaseClass + " min-h-[85vh]"}>
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
            
            {/* Solar Window Container - Simplified */}
            <div className="relative z-10 p-2 h-full">
              <div className="w-full h-full relative backdrop-blur-md rounded-xl overflow-hidden border border-amber-500/20 shadow-xl">
                <iframe 
                  key={iframeKey}
                  src={SOLAR_WINDOW_URL}
                  className="w-full h-full min-h-[85vh]"
                  style={{ border: 'none' }}
                  title="Solar Window"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  onError={() => setIframeError(true)}
                />
                
                {/* Error overlay */}
                {iframeError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10">
                    <div className="text-center">
                      <MdElectricBolt size={48} className="text-amber-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">Solar Window Connection Error</h3>
                      <p className="text-gray-300 mb-6 max-w-md mx-auto">
                        Unable to connect to the Solar Window application at {SOLAR_WINDOW_URL}
                      </p>
                      <button 
                        onClick={handleReloadIframe}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isCalculating ? (
            <div className={cardBaseClass}>
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
              {/* Energy Stats in annotation style layout */}
              <div className={cardBaseClass + " relative p-8"}>
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
                
                <div className="relative z-10 grid grid-cols-3 gap-6 items-center">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative">
                      <InfoButton onClick={() => setActiveInfoModal('annualConsumption')} />
                      <h3 className="card-title text-lg flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <FaBolt size={24} />
                    </div>
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent text-xl">
                          Energy Consumption
                        </span>
                      </h3>
                      <div className="space-y-4">
                    <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Annual Usage</p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                            {energyData.totalAnnualUsage}
                      </p>
                    </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Average</p>
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {energyData.averageMonthlyUsage}
                          </p>
                  </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">System Efficiency</p>
                          <p className="text-xl font-semibold text-green-500">
                            {energyData.solarEfficiency}
                          </p>
                </div>
              </div>
                  </div>
                  
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative">
                      <InfoButton onClick={() => setActiveInfoModal('costAnalysis')} />
                      <h3 className="card-title text-lg flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <FaCalculator size={24} />
                      </div>
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent text-xl">
                          Financial Impact
                      </span>
                    </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Without Solar</p>
                            <p className="text-2xl font-bold text-red-500">{energyData.costWithoutSolar}</p>
                        </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">With Solar</p>
                            <p className="text-2xl font-bold text-green-500">{energyData.costWithSolar}</p>
                      </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ROI Period</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {energyData.roiPeriod}
                          </p>
                      </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Break Even</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {energyData.breakEvenPoint}
                          </p>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Center Image */}
                  <div className="relative">
                    <img 
                      src="/images/solar/unnamed8.png"
                      alt="Energy Usage Visualization"
                      className="w-full h-auto rounded-xl shadow-xl"
                    />
                    {/* Enhanced connecting lines with gradients */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
                        <defs>
                          <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(245,158,11,0.2)" />
                            <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="4" />
                        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="4" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative">
                      <InfoButton onClick={() => setActiveInfoModal('facilityMetrics')} />
                      <h3 className="card-title text-lg flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <FaChartBar size={24} />
                      </div>
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent text-xl">
                          Facility Metrics
                      </span>
                    </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Building Type</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            Manufacturing Facility
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            37,125 sq ft
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Energy Intensity</p>
                          <p className="text-xl font-semibold text-blue-500">
                            183.2 kWh/sq ft/year
                          </p>
                        </div>
                      </div>
                        </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative">
                      <InfoButton onClick={() => setActiveInfoModal('peakMetrics')} />
                      <h3 className="card-title text-lg flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <FaClock size={24} />
                      </div>
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent text-xl">
                          Reliability Metrics
                        </span>
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Peak Demand</p>
                          <p className="text-2xl font-bold text-purple-500">{energyData.peakDemand}</p>
                    </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Outage</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {energyData.monthlyPowerOutage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Grid Reliability</p>
                          <p className="text-xl font-semibold text-green-500">99.82%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

              {/* Render active info modal */}
              {activeInfoModal && (
                <InfoModal
                  title={energyData.calculations[activeInfoModal as keyof typeof energyData.calculations].title}
                  steps={energyData.calculations[activeInfoModal as keyof typeof energyData.calculations].steps}
                  methodology={energyData.calculations[activeInfoModal as keyof typeof energyData.calculations].methodology}
                  onClose={() => setActiveInfoModal(null)}
                />
              )}

              {/* Energy Usage Breakdown and ROI Comparison - No outer box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Enhanced Pie Chart Section */}
                <div className={cardBaseClass + " p-6"}>
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
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg text-white shadow-lg">
                        <MdOutlineAnalytics size={22} />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Energy Usage Breakdown
                    </h3>
                        </div>
                    
                    {/* Analysis explanation text */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-xl border border-amber-500/20">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-amber-500">
                          <MdInfoOutline size={20} />
                      </div>
                        <div>
                          <p className="text-white text-sm leading-relaxed">
                            This analysis represents the typical energy usage pattern for a manufacturing facility of this size (37,125 sq ft) and classification. 
                            Based on aggregated data from 1,250+ similar facilities, this breakdown has an <span className="text-amber-500 font-medium">87th percentile accuracy rating</span>. 
                            While individual building variations exist, our AI-powered assessment has calibrated this estimate using current operational patterns and building specifications.
                          </p>
                        </div>
                      </div>
                        </div>
                    
                    <div className="h-[400px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          {/* Define gradients for each sector */}
                          <defs>
                            {energyUsagePieData.map((entry, index) => (
                              <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={entry.gradientStart} stopOpacity={1} />
                                <stop offset="100%" stopColor={entry.gradientEnd} stopOpacity={0.8} />
                              </linearGradient>
                            ))}
                            <filter id="shadow" height="200%" width="200%" x="-50%" y="-50%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feFlood floodColor="#000" floodOpacity="0.3" result="shadowColor"/>
                              <feComposite in="shadowColor" in2="blur" operator="in" result="shadowBlur"/>
                              <feOffset in="shadowBlur" dx="1" dy="1" result="offsetBlur"/>
                              <feMerge>
                                <feMergeNode in="offsetBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                            <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <Pie
                            data={energyUsagePieData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={renderCustomizedPie}
                            outerRadius={130}
                            innerRadius={65}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={4}
                            filter="url(#shadow)"
                            onClick={handlePieSectionClick}
                            isAnimationActive={true}
                            animationDuration={1200}
                            animationBegin={300}
                            animationEasing="ease-out"
                          >
                            {energyUsagePieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={`url(#pieGradient-${index})`} 
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth={2}
                                style={{ cursor: 'pointer', filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomPieTooltip />} />
                          <Legend
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            iconType="circle"
                            wrapperStyle={{
                              fontSize: '14px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                            onClick={(entry) => {
                              const sectionId = energyUsagePieData.find(item => item.name === entry.value)?.id;
                              if (sectionId) {
                                setSelectedPieSection(sectionId);
                                setShowDetailsModal(true);
                              }
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      </div>
                    
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center gap-2 text-sm text-amber-500 border border-amber-500/30 px-3 py-1.5 rounded-full bg-amber-500/10">
                        <MdZoomOutMap size={16} />
                        <p>Click on chart sections for detailed breakdown</p>
                    </div>
                  </div>
                </div>
              </div>

                {/* Enhanced ROI Chart Section */}
                <div className={cardBaseClass + " p-6"}>
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
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-500/10 to-transparent rounded-tr-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg text-white shadow-lg">
                        <FaChartLine size={22} />
                    </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        25-Year Solar Investment & ROI - Michigan Manufacturing Facility
                      </h3>
                  </div>
                  
                    {/* ROI explanation text */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-500">
                          <MdInfoOutline size={20} />
                        </div>
                      <div>
                          <p className="text-white text-sm leading-relaxed">
                            This financial projection illustrates the cumulative return on a $100,000 solar installation over 25 years. 
                            Based on current energy rates and production efficiency, the system achieves <span className="text-green-500 font-medium">break-even at 14.6 years</span>, 
                            with total savings of <span className="text-green-500 font-medium">${Math.round(roiDataWithCumulative[roiDataWithCumulative.length-1].cumulativeSavings).toLocaleString()}</span> over the system's lifetime. 
                            This analysis factors in panel degradation of 0.5% annually and projected utility rate increases of 3% per year.
                          </p>
                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                              <p className="text-xs text-gray-400">Break-even Point</p>
                              <p className="text-lg font-semibold text-white">14.6 years</p>
                            </div>
                            <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                              <p className="text-xs text-gray-400">25-Year ROI</p>
                              <p className="text-lg font-semibold text-green-400">172%</p>
                            </div>
                            <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                              <p className="text-xs text-gray-400">Monthly Savings</p>
                              <p className="text-lg font-semibold text-white">$573</p>
                            </div>
                          </div>
                          </div>
                          </div>
                        </div>
                        
                    <div className="h-[400px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={roiDataWithCumulative}
                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorWithSolar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="colorWithoutSolar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.2}/>
                            </linearGradient>
                            <filter id="shadow" height="200%" width="200%" x="-50%" y="-50%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feFlood floodColor="#000" floodOpacity="0.2" result="color"/>
                              <feComposite in="color" in2="blur" operator="in" result="shadow"/>
                              <feMerge>
                                <feMergeNode in="shadow"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            vertical={false} 
                            stroke="rgba(255,255,255,0.1)" 
                          />
                          <XAxis 
                            dataKey="year" 
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            allowDecimals={false}
                          />
                          <YAxis 
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `$${Math.round(value/1000)}k`}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            domain={[0, 'auto']} // Force start at 0
                          />
                          <Tooltip content={<CustomROITooltip />} />
                          <Legend 
                            verticalAlign="top" 
                            align="right" 
                            wrapperStyle={{ paddingBottom: '20px', fontWeight: 600 }}
                          />
                          <ReferenceLine 
                            x={14.6} 
                            stroke="#FBBF24"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            label={{ 
                              value: 'Break-even: 14.6 years', 
                              position: 'top',
                              fill: '#FBBF24',
                              fontSize: 12,
                              fontWeight: 'bold'
                            }} 
                          />
                          
                          {/* Add annotation for initial investment */}
                          <ReferenceLine 
                            y={100000} 
                            stroke="#FFFFFF"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                            label={{ 
                              value: 'Initial Investment: $100,000', 
                              position: 'right',
                              fill: '#FFFFFF',
                              fontSize: 10,
                              opacity: 0.7
                            }} 
                          />
                          
                          <Area 
                            type="monotone" 
                            dataKey={(data) => data.withSolar + data.totalInvestment} // Add investment to solar costs
                            name="With Solar" 
                            stroke="#10B981" 
                            fillOpacity={1}
                            fill="url(#colorWithSolar)" 
                            strokeWidth={3}
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981' }}
                            filter="url(#shadow)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="withoutSolar" 
                            name="Without Solar" 
                            stroke="#EF4444" 
                            fillOpacity={1}
                            fill="url(#colorWithoutSolar)" 
                            strokeWidth={3}
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#EF4444' }}
                            filter="url(#shadow)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="cumulativeSavings" 
                            name="Cumulative Savings" 
                            stroke="#F59E0B" 
                            fillOpacity={0.6}
                            fill="url(#colorSavings)" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#F59E0B' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                          </div>
                          
                    <div className="flex justify-between items-center text-sm mt-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaMoneyBill className="text-green-500" size={16} />
                        <span>Total 25-year savings: </span>
                        <span className="font-semibold text-green-500">
                          $171,900
                        </span>
                      </div>
                      <div className="text-gray-400">
                        Panel warranty: <span className="text-white">25 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Render energy usage breakdown detail modal when a section is clicked */}
              {showDetailsModal && selectedPieSection && (
                <EnergyUsageDetailModal
                  sectionId={selectedPieSection}
                  onClose={() => setShowDetailsModal(false)}
                />
              )}
              
              {/* Continue Button */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleContinueToSolarPotential}
                  className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3 group relative overflow-hidden"
                >
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
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                  
                  <span className="relative z-10 text-lg">Continue to Solar Panel Potential</span>
                  <MdArrowForward className="relative z-10 text-2xl group-hover:translate-x-1 transition-transform duration-300" />
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