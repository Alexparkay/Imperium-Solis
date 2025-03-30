import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdElectricBolt, MdOutlineCalculate, MdOutlineAnalytics, MdOutlineShowChart, MdArrowForward } from 'react-icons/md';
import { FaSolarPanel, FaBuilding, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Define the SolarWindow interface for TypeScript
declare global {
  interface Window {
    SolarWindow?: {
      embed: (options: {
        containerId: string;
        height: string;
        width: string;
      }) => {
        onMessage: (type: string, callback: (data: any) => void) => void;
        sendMessage: (type: string, payload: any) => void;
      };
    };
  }
}

// Dashboard-Engine communication interfaces
interface DashboardMessage {
  type: 'COMMAND' | 'STATE_REQUEST';
  payload: string;
}

interface EngineMessage {
  type: 'STATE_UPDATE' | 'ENGINE_READY' | 'INTERACTION';
  payload: any;
}

const EnergyUsageEstimation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [useEmbedHelper, setUseEmbedHelper] = useState(false);
  const [solarWindowInstance, setSolarWindowInstance] = useState<any>(null);
  
  // URL for the Solar Window application
  const SOLAR_WINDOW_URL = 'http://localhost:5177'; // Solar Window local instance
  
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

  // Initialize the embedding helper
  useEffect(() => {
    // Check if the SolarWindow embedding helper is available
    if (window.SolarWindow && document.getElementById('solar-window-container')) {
      try {
        const instance = window.SolarWindow.embed({
          containerId: 'solar-window-container',
          height: '85vh', // Increased height to maximize space
          width: '100%'
        });
        
        setSolarWindowInstance(instance);
        setUseEmbedHelper(true);
        
        // Listen for state updates
        instance.onMessage('STATE_UPDATE', (state) => {
          console.log('Solar analysis state:', state);
          handleSolarWindowStateUpdate(state);
        });
        
        // Listen for user interactions
        instance.onMessage('INTERACTION', (data) => {
          console.log('User interaction:', data);
          handleSolarWindowInteraction(data);
        });
        
        // Listen for ready event
        instance.onMessage('ENGINE_READY', () => {
          setEngineReady(true);
          // Initialize the app
          instance.sendMessage('COMMAND', 'INITIALIZE');
        });
        
        return () => {
          // No direct cleanup method provided in the docs, but we can set state
          setSolarWindowInstance(null);
        };
      } catch (error) {
        console.error('Error initializing SolarWindow embedding:', error);
        setUseEmbedHelper(false);
        toast.error('Failed to initialize Solar Window embedding, falling back to iframe');
      }
    } else {
      setUseEmbedHelper(false);
    }
  }, []);

  // Handle state updates from the Solar Window app
  const handleSolarWindowStateUpdate = (state: any) => {
    console.log('Received state update from Solar Window:', state);
    if (state.energyData) {
      toast.success('Energy data updated from Solar Window');
    }
  };

  // Handle interactions from the Solar Window app
  const handleSolarWindowInteraction = (data: any) => {
    console.log('User interacted with Solar Window:', data);
    if (data.action === 'update_energy_usage') {
      toast.success('Energy usage updated from Solar Window');
    }
  };

  // Send commands to engine (iframe approach)
  const sendToEngine = (message: DashboardMessage) => {
    if (useEmbedHelper && solarWindowInstance) {
      // Use the embed helper API
      solarWindowInstance.sendMessage(message.type, message.payload);
    } else if (iframeRef.current?.contentWindow) {
      // Use the iframe postMessage API
      iframeRef.current.contentWindow.postMessage(message, SOLAR_WINDOW_URL);
    }
  };

  // Handle engine messages (iframe approach)
  useEffect(() => {
    // Only set up message listener if we're using the iframe approach
    if (useEmbedHelper) return;
    
    const messageHandler = (event: MessageEvent<EngineMessage>) => {
      if (event.origin !== SOLAR_WINDOW_URL) return;

      switch (event.data.type) {
        case 'ENGINE_READY':
          setEngineReady(true);
          sendToEngine({
            type: 'COMMAND',
            payload: 'INITIALIZE'
          });
          break;
          
        case 'STATE_UPDATE':
          console.log('Engine state:', event.data.payload);
          handleSolarWindowStateUpdate(event.data.payload);
          break;
          
        case 'INTERACTION':
          handleSolarWindowInteraction(event.data.payload);
          break;
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [useEmbedHelper]);

  // Load the embedding script
  useEffect(() => {
    const loadEmbedScript = () => {
      const script = document.createElement('script');
      script.src = `${SOLAR_WINDOW_URL}/lib/embed.js`;
      script.async = true;
      script.onload = () => console.log('Solar Window embed script loaded');
      script.onerror = () => {
        console.error('Failed to load Solar Window embed script');
        setUseEmbedHelper(false);
      };
      document.body.appendChild(script);
    };

    loadEmbedScript();
    
    return () => {
      // Remove the script when component unmounts
      const script = document.querySelector(`script[src="${SOLAR_WINDOW_URL}/lib/embed.js"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-orange-500 relative"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading Analysis</h2>
            <p className="text-gray-400">Preparing your energy usage report...</p>
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
            
            {/* Solar Window Container - Simplified, no header */}
            <div className="relative z-10 p-2 h-full">
              {/* External App container */}
              <div className="w-full h-full relative backdrop-blur-md rounded-xl overflow-hidden border border-amber-500/20 shadow-xl">
                {!engineReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10">
                    <div className="text-center">
                      <div className="loading loading-spinner loading-lg text-amber-500 mb-4"></div>
                      <p className="text-white text-lg">Connecting to Solar Window...</p>
                    </div>
                  </div>
                )}
                
                {/* Embed Helper Container */}
                <div 
                  id="solar-window-container" 
                  className={`w-full h-full min-h-[85vh] ${useEmbedHelper ? 'block' : 'hidden'}`}
                ></div>
                
                {/* Fallback iframe for manual integration */}
                {!useEmbedHelper && (
                  <iframe
                    ref={iframeRef}
                    src={SOLAR_WINDOW_URL}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    className="w-full h-full min-h-[85vh] bg-transparent"
                    title="Solar Window Analysis Engine"
                  />
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
              {/* Energy Usage Overview */}
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

              {/* Solar Potential Teaser */}
              <div className="card bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/30 via-amber-500/20 to-orange-500/25 opacity-25"></div>
                <div className="card-body relative z-10">
                  <h3 className="card-title text-lg flex items-center gap-2 text-white">
                    <FaSolarPanel size={20} />
                    Solar Energy Potential
                  </h3>
                  <p className="text-white/90">
                    Based on our energy usage analysis, this facility is an excellent candidate for solar energy. 
                    With the current energy consumption patterns, a properly sized solar installation could 
                    significantly reduce or even eliminate electricity costs.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      onClick={handleContinueToSolarPotential}
                      className="px-4 py-2 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white rounded-lg hover:bg-orange-600 transition-all border border-white/20 hover:shadow-lg hover:shadow-orange-500/20"
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