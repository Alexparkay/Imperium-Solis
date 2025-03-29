import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdInfo, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdDownload, MdArrowForward, MdSolarPower } from 'react-icons/md';
import { FaSolarPanel, FaMoneyBillWave, FaLeaf, FaChartLine, FaRegLightbulb, FaRegSun, FaRegClock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const FacilityAIAnalysis = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [facility, setFacility] = useState<any>(null);
  
  // Solar data from the image
  const solarData = {
    yearlyEnergy: '249,087.3 kWh',
    yearlyCost: '$77,217.08',
    installationSize: '155.7 kW',
    energyCovered: '1823 %',
    monthlyAverage: '$3,991.01',
    firstYear: '$47,892.00',
    tenYearTotal: '-$4,286.00',
    costWithoutSolar: '$61,305.29',
    costWithSolar: '$615,718.36',
    totalLifetimeSavings: '$-554,413.07',
    breakEven: '-- years',
    address: '303 S Technology Ct, Broomfield, CO',
    state: 'CO',
    zipCode: '80021',
    energyRate: '$0.310/kWh',
    monthlyBill: '$300.00',
    panelsCount: '622 panels',
    solarIncentives: '$7000.00',
    installationCost: '$4.00 per Watt',
    panelCapacity: '250 Watts'
  };

  // Sample facility data
  const sampleFacilities = [
    {
      id: 1,
      name: "Jeff Levy",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Atlanta, GA",
      enriched: true,
      verified: true,
      email: "j.levy@example.com",
      phone: "(404) 555-1234"
    },
    {
      id: 2,
      name: "Amy Huke",
      jobTitle: "Facilities Manager",
      company: "Honeywell",
      emails: true,
      phoneNumbers: true,
      location: "Kansas City, MO",
      enriched: true,
      verified: true,
      email: "a.huke@example.com",
      phone: "(816) 555-6789"
    },
    {
      id: 3,
      name: "Ryan Kuddes",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Denver, CO",
      enriched: true,
      verified: true,
      email: "r.kuddes@example.com",
      phone: "(303) 555-4321"
    }
    // Add more facilities as needed
  ];

  useEffect(() => {
    // Simulate API call to get facility data
    setIsLoading(true);
    setTimeout(() => {
      const foundFacility = sampleFacilities.find(f => f.id === parseInt(facilityId || '0'));
      if (foundFacility) {
        setFacility(foundFacility);
      } else {
        // If facility not found, use the first one as a fallback
        setFacility(sampleFacilities[0]);
      }
      setIsLoading(false);
      
      // Simulate AI analysis processing
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 3000);
    }, 1000);
  }, [facilityId]);

  const handleDownloadReport = () => {
    toast.success('Solar analysis report downloaded successfully');
  };
  
  const handleContinueToEnergyUsage = () => {
    navigate('/energy-usage-estimation');
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
            <p className="text-gray-400">Preparing your solar potential report...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center sticky top-0 z-50 bg-white dark:bg-gray-900 py-4 px-6 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/facility-data-scraper')}
              className="btn btn-circle btn-ghost hover:bg-amber-500/10 transition-colors"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Solar Potential Analysis</h1>
          </div>
          <button 
            onClick={handleDownloadReport}
            className="btn btn-primary flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transition-all"
          >
            <MdDownload size={20} />
            Download Report
          </button>
        </div>

        {/* Facility Info */}
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
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{facility.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{facility.jobTitle} at {facility.company}</p>
                <div className="flex items-center gap-2 mt-3 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg inline-block">
                  <MdLocationOn className="text-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300">{facility.location}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg">
                  <MdOutlineEmail className="text-amber-500" size={18} />
                  <span className="text-gray-700 dark:text-gray-300">{facility.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg">
                  <MdOutlinePhone className="text-amber-500" size={18} />
                  <span className="text-gray-700 dark:text-gray-300">{facility.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isAnalyzing ? (
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-4">Analyzing Solar Potential</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
                Our AI is analyzing satellite imagery, energy usage patterns, and local solar conditions...
              </p>
              <div className="w-full max-w-md space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Analyzing roof area</span>
                    <span className="text-amber-500 font-medium">100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Calculating solar exposure</span>
                    <span className="text-amber-500 font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Estimating energy production</span>
                    <span className="text-amber-500 font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Calculating financial benefits</span>
                    <span className="text-amber-500 font-medium">30%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Solar Analysis Header */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              
              <div className="relative z-10 flex items-start gap-6">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <FaSolarPanel className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Solar Potential Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl text-lg">
                    Based on our AI analysis, this facility has excellent solar potential. Here's a comprehensive breakdown of the potential benefits and implementation details.
                  </p>
                </div>
              </div>
            </div>

            {/* Solar Image */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative group hover:shadow-2xl transition-all duration-300">
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                    backgroundSize: '30px 30px'
                  }}
                ></div>
              </div>
              
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

            {/* Solar Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Installation Details Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
                
                <div className="relative z-10">
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
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <FaMoneyBillWave className="text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-6">Financial Benefits</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Yearly Cost</span>
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

              {/* Energy Production Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <FaLeaf className="text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-6">Energy Production</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Yearly Energy</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.yearlyEnergy}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Energy Covered</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.energyCovered}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Energy Rate</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.energyRate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 dark:text-gray-400">Monthly Bill</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.monthlyBill}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Long-term Analysis Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-6">Long-term Analysis</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">10 Year Total</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.tenYearTotal}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Cost Without Solar</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.costWithoutSolar}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Cost With Solar</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.costWithSolar}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 dark:text-gray-400">Break Even</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{solarData.breakEven}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Financial Analysis Widget */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-8 text-center">Key Financial Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Cost Without Solar */}
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold">Cost Without Solar</h4>
                        <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20" onClick={() => document.getElementById('costWithoutSolarModal').showModal()}>
                          <MdInfo size={20} />
                        </button>
                      </div>
                      <div className="text-4xl font-bold mb-2">{solarData.costWithoutSolar}</div>
                      <p className="text-red-100 text-sm">Projected cost without solar implementation</p>
                    </div>
                  </div>

                  {/* Cost With Solar */}
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold">Cost With Solar</h4>
                        <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20" onClick={() => document.getElementById('costWithSolarModal').showModal()}>
                          <MdInfo size={20} />
                        </button>
                      </div>
                      <div className="text-4xl font-bold mb-2">{solarData.costWithSolar}</div>
                      <p className="text-green-100 text-sm">Total cost including solar installation</p>
                    </div>
                  </div>

                  {/* ROI (Break Even) */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold">ROI (Break Even)</h4>
                        <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20" onClick={() => document.getElementById('roiModal').showModal()}>
                          <MdInfo size={20} />
                        </button>
                      </div>
                      <div className="text-4xl font-bold mb-2">{solarData.breakEven}</div>
                      <p className="text-blue-100 text-sm">Time until investment pays off</p>
                    </div>
                  </div>
                </div>

                {/* Monthly and Yearly Costs */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl group">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold">Monthly Average</h4>
                        <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20" onClick={() => document.getElementById('monthlyCostModal').showModal()}>
                          <MdInfo size={20} />
                        </button>
                      </div>
                      <div className="text-3xl font-bold mb-2">{solarData.monthlyAverage}</div>
                      <p className="text-purple-100 text-sm">Expected monthly cost with solar</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl group">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold">First Year Cost</h4>
                        <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20" onClick={() => document.getElementById('firstYearCostModal').showModal()}>
                          <MdInfo size={20} />
                        </button>
                      </div>
                      <div className="text-3xl font-bold mb-2">{solarData.firstYear}</div>
                      <p className="text-yellow-100 text-sm">Initial investment and first year expenses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Projection Graph */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Financial Projection</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">25-year cost analysis and break-even point</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Without Solar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">With Solar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Break-Even Point</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Graph */}
                <div className="relative h-[600px] w-full bg-gradient-to-br from-gray-50/50 to-white/30 dark:from-gray-700/50 dark:to-gray-800/30 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-gray-700/10">
                  {/* Graph Background Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="h-px bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex justify-between p-8">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className="w-px bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm"></div>
                    ))}
                  </div>

                  {/* Graph Lines */}
                  <svg className="absolute inset-0 w-full h-full p-8">
                    {/* Without Solar Line - More detailed curve */}
                    <defs>
                      <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under Without Solar curve */}
                    <path
                      d="M 0 400 C 100 380, 200 360, 300 340 C 400 320, 500 300, 600 280 L 600 500 L 0 500 Z"
                      fill="url(#redGradient)"
                      className="animate-draw"
                    />
                    
                    {/* Without Solar Line */}
                    <path
                      d="M 0 400 C 100 380, 200 360, 300 340 C 400 320, 500 300, 600 280"
                      stroke="url(#redGradient)"
                      strokeWidth="3"
                      fill="none"
                      className="animate-draw"
                      filter="drop-shadow(0 0 6px rgba(239, 68, 68, 0.3))"
                    />
                    
                    {/* Area under With Solar curve */}
                    <path
                      d="M 0 450 C 100 440, 200 420, 300 380 C 400 340, 500 320, 600 300 L 600 500 L 0 500 Z"
                      fill="url(#greenGradient)"
                      className="animate-draw"
                    />
                    
                    {/* With Solar Line */}
                    <path
                      d="M 0 450 C 100 440, 200 420, 300 380 C 400 340, 500 320, 600 300"
                      stroke="url(#greenGradient)"
                      strokeWidth="3"
                      fill="none"
                      className="animate-draw"
                      filter="drop-shadow(0 0 6px rgba(34, 197, 94, 0.3))"
                    />
                    
                    {/* Break-Even Point Line */}
                    <line
                      x1="350"
                      y1="0"
                      x2="350"
                      y2="500"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                      className="animate-pulse"
                    />
                    
                    {/* Break-Even Point Marker */}
                    <g transform="translate(350, 360)" className="animate-pulse">
                      <circle
                        r="8"
                        fill="#3B82F6"
                        className="animate-ping"
                        opacity="0.2"
                      />
                      <circle
                        r="6"
                        fill="#3B82F6"
                        filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))"
                      />
                    </g>

                    {/* Data Points - Without Solar */}
                    {[0, 5, 10, 15, 20, 25].map((year, i) => (
                      <g key={`without-${i}`} transform={`translate(${i * 120}, ${400 - i * 24})`} className="group">
                        <circle
                          r="4"
                          fill="#EF4444"
                          className="transition-all duration-300 hover:r-6"
                          filter="drop-shadow(0 0 4px rgba(239, 68, 68, 0.3))"
                        />
                        <text
                          x="0"
                          y="-10"
                          textAnchor="middle"
                          className="text-xs fill-gray-600 dark:fill-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          ${(61305.29 + i * 12000).toLocaleString()}
                        </text>
                      </g>
                    ))}

                    {/* Data Points - With Solar */}
                    {[0, 5, 10, 15, 20, 25].map((year, i) => (
                      <g key={`with-${i}`} transform={`translate(${i * 120}, ${450 - i * 30})`} className="group">
                        <circle
                          r="4"
                          fill="#22C55E"
                          className="transition-all duration-300 hover:r-6"
                          filter="drop-shadow(0 0 4px rgba(34, 197, 94, 0.3))"
                        />
                        <text
                          x="0"
                          y="20"
                          textAnchor="middle"
                          className="text-xs fill-gray-600 dark:fill-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          ${(615718.36 - i * 24000).toLocaleString()}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Year Labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
                    {[0, 5, 10, 15, 20, 25].map((year) => (
                      <div key={year} className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm">
                          Year {year}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cost Labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-8 pl-2">
                    {['$800K', '$700K', '$600K', '$500K', '$400K', '$300K', '$200K', '$100K', '$0'].map((cost) => (
                      <span key={cost} className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm">
                        {cost}
                      </span>
                    ))}
                  </div>

                  {/* Break-Even Point Tooltip */}
                  <div className="absolute left-[350px] top-[360px] transform -translate-x-1/2 -translate-y-full">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl p-4 border border-gray-200/10 dark:border-gray-700/10 backdrop-blur-sm">
                      <div className="text-sm space-y-1">
                        <div className="font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Break-Even Point</div>
                        <div className="text-gray-600 dark:text-gray-400">Year 7.5</div>
                        <div className="text-gray-500 dark:text-gray-500 text-xs">Total Investment Recovered</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown Cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" 
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                          backgroundSize: '30px 30px'
                        }}
                      ></div>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">Break-Even Point</h4>
                      <div className="text-4xl font-bold mb-2">7.5 Years</div>
                      <p className="text-blue-100 text-sm">Time until solar investment pays off</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" 
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                          backgroundSize: '30px 30px'
                        }}
                      ></div>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">Total Savings</h4>
                      <div className="text-4xl font-bold mb-2">$554,413</div>
                      <p className="text-green-100 text-sm">25-year projected savings</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" 
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                          backgroundSize: '30px 30px'
                        }}
                      ></div>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">ROI</h4>
                      <div className="text-4xl font-bold mb-2">233%</div>
                      <p className="text-purple-100 text-sm">Return on investment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Modals */}
            <dialog id="costWithoutSolarModal" className="modal">
              <div className="modal-box bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-4">Cost Without Solar Breakdown</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Base Energy Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current monthly energy bill: $3,991.01<br />
                      Annual energy consumption: 249,087.3 kWh<br />
                      Energy rate: $0.310/kWh
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Projected Increases</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Annual energy cost increase: 3.5%<br />
                      Grid reliability costs: 2%<br />
                      Carbon tax impact: 1.5%
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Total Projected Cost</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      25-year total: $61,305.29<br />
                      Includes all projected increases and maintenance
                    </p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="costWithSolarModal" className="modal">
              <div className="modal-box bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-4">Cost With Solar Breakdown</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Installation Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      System size: 155.7 kW<br />
                      Panel count: 622 panels<br />
                      Installation cost: $4.00 per Watt<br />
                      Total installation: $622,800
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Incentives & Rebates</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Federal tax credit: 30%<br />
                      State rebate: $7,000<br />
                      Local incentives: $2,500<br />
                      Total incentives: $194,340
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Operating Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Annual maintenance: $1,500<br />
                      Insurance: $2,000<br />
                      Monitoring: $500<br />
                      Total annual: $4,000
                    </p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="roiModal" className="modal">
              <div className="modal-box bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-4">ROI & Break-Even Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Initial Investment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total system cost: $622,800<br />
                      Less incentives: $194,340<br />
                      Net investment: $428,460
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Annual Savings</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Energy cost reduction: $47,892<br />
                      Carbon credits: $2,500<br />
                      Total annual: $50,392
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Break-Even Calculation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Net investment: $428,460<br />
                      Annual savings: $50,392<br />
                      Break-even period: 7.5 years
                    </p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="monthlyCostModal" className="modal">
              <div className="modal-box bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-4">Monthly Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly energy bill: $3,991.01<br />
                      Peak demand charges: $500<br />
                      Total current: $4,491.01
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">With Solar</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Solar production: 3,500 kWh<br />
                      Grid purchase: 500 kWh<br />
                      Net monthly: $3,991.01
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Savings</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly reduction: $500<br />
                      Annual savings: $6,000<br />
                      Net metering credits: $1,200
                    </p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="firstYearCostModal" className="modal">
              <div className="modal-box bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-4">First Year Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Initial Investment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      System purchase: $622,800<br />
                      Installation: $31,140<br />
                      Permits & fees: $5,000<br />
                      Total: $658,940
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">First Year Incentives</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Federal tax credit: $186,840<br />
                      State rebate: $7,000<br />
                      Local incentives: $2,500<br />
                      Total: $196,340
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Net First Year Cost</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total investment: $658,940<br />
                      Less incentives: $196,340<br />
                      Net cost: $47,892
                    </p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* Location Details */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <MdLocationOn className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Location Details</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">{solarData.address}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-all duration-300">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">State</span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-xl">{solarData.state}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-all duration-300">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Zip Code</span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-xl">{solarData.zipCode}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-all duration-300">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Energy Rate</span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-xl">{solarData.energyRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              
              <div className="relative z-10 p-8">
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-white/10 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
                    <FaRegLightbulb className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Recommendation</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      Based on our comprehensive analysis, we highly recommend implementing solar energy solutions at this facility. 
                      With an impressive energy coverage of {solarData.energyCovered} and significant potential for long-term savings, 
                      this facility presents an excellent opportunity for solar installation.
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

            {/* Stats Note */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
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
              
              <div className="relative z-10 flex items-center justify-center gap-12">
                <div className="flex items-center gap-4 group">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                    <FaRegSun className="text-amber-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-lg">Only 5% Adoption</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">of similar facilities use solar</p>
                  </div>
                </div>
                
                <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
                
                <div className="flex items-center gap-4 group">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                    <FaRegClock className="text-green-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-lg">Early Adopter</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Opportunity to lead the market</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={handleContinueToEnergyUsage}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3 group relative overflow-hidden"
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
                
                <span className="relative z-10 text-lg">View Detailed Energy Usage Estimation</span>
                <MdArrowForward className="relative z-10 text-2xl group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityAIAnalysis; 