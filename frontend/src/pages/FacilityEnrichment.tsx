import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdInfo, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdDownload, MdArrowForward, MdSolarPower, MdFactory, MdElectricBolt, MdAttachMoney, MdContentCopy, MdTableChart, MdCheck, MdWarning, MdOutlineWarning, MdSearch } from 'react-icons/md';
import { FaSolarPanel, FaMoneyBillWave, FaLeaf, FaChartLine, FaRegLightbulb, FaRegSun, FaRegClock, FaBuilding, FaIndustry, FaWarehouse } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Add more facility data to make the table more extensive
const enrichedFacilities = [
  {
    id: 1,
    name: "Michael Reynolds",
    jobTitle: "Facilities Manager",
    company: "Apple",
    emails: true,
    phoneNumbers: true,
    location: "Atlanta, GA",
    enriched: true,
    verified: true,
    email: "m.reynolds@example.com",
    phone: "(404) 555-1234",
    facilityType: "Office Building",
    facilitySize: 125000, // square feet
    yearBuilt: 2008,
    roofArea: 85000, // square feet
    annualEnergyUsage: 2750000, // kWh
    energyRate: 0.128, // $/kWh
    peakDemand: 750, // kW
    industryAvg: {
      energyUsage: 22, // kWh per square foot
      solarAdoption: 15, // percentage
      costPerWatt: 2.35, // $
      paybackPeriod: 8.2, // years
    },
    solarPotential: {
      maxCapacity: 850, // kW
      annualProduction: 1275000, // kWh
      energyCoverage: 46.3, // percentage
      installationCost: 1997500, // $
      netInstallationCost: 1398250, // $ after incentives
      incentives: 599250, // $
      costWithoutSolar: 352000, // $ per year
      costWithSolar: 189060, // $ per year
      annualSavings: 162940, // $ per year
      monthlySavings: 13578, // $ per month
      paybackPeriod: 8.6, // years
      roi: 11.6, // percentage
      carbonOffset: 903, // tons of CO2 per year
    }
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
    phone: "(816) 555-6789",
    facilityType: "Manufacturing Plant",
    facilitySize: 310000, // square feet
    yearBuilt: 2001,
    roofArea: 275000, // square feet
    annualEnergyUsage: 8350000, // kWh
    energyRate: 0.095, // $/kWh
    peakDemand: 1850, // kW
    industryAvg: {
      energyUsage: 28, // kWh per square foot
      solarAdoption: 8, // percentage
      costPerWatt: 2.15, // $
      paybackPeriod: 9.8, // years
    },
    solarPotential: {
      maxCapacity: 2750, // kW
      annualProduction: 3685000, // kWh
      energyCoverage: 44.1, // percentage
      installationCost: 5912500, // $
      netInstallationCost: 4138750, // $ after incentives
      incentives: 1773750, // $
      costWithoutSolar: 793250, // $ per year
      costWithSolar: 442975, // $ per year
      annualSavings: 350275, // $ per year
      monthlySavings: 29189, // $ per month
      paybackPeriod: 11.8, // years
      roi: 8.5, // percentage
      carbonOffset: 2616, // tons of CO2 per year
    }
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
    phone: "(303) 555-4321",
    facilityType: "Data Center",
    facilitySize: 85000, // square feet
    yearBuilt: 2016,
    roofArea: 75000, // square feet
    annualEnergyUsage: 4850000, // kWh
    energyRate: 0.112, // $/kWh
    peakDemand: 980, // kW
    industryAvg: {
      energyUsage: 57, // kWh per square foot
      solarAdoption: 11, // percentage
      costPerWatt: 2.28, // $
      paybackPeriod: 10.1, // years
    },
    solarPotential: {
      maxCapacity: 750, // kW
      annualProduction: 1160000, // kWh
      energyCoverage: 23.9, // percentage
      installationCost: 1710000, // $
      netInstallationCost: 1197000, // $ after incentives
      incentives: 513000, // $
      costWithoutSolar: 543200, // $ per year
      costWithSolar: 413280, // $ per year
      annualSavings: 129920, // $ per year
      monthlySavings: 10827, // $ per month
      paybackPeriod: 9.2, // years
      roi: 10.9, // percentage
      carbonOffset: 823, // tons of CO2 per year
    }
  },
  {
    id: 4,
    name: "Zuretti Carter",
    jobTitle: "Facilities Manager",
    company: "ChargePoint",
    emails: true,
    phoneNumbers: true,
    location: "San Francisco, CA",
    enriched: true,
    verified: true,
    email: "z.carter@example.com",
    phone: "(415) 555-7890",
    facilityType: "Warehouse",
    facilitySize: 195000, // square feet
    yearBuilt: 2012,
    roofArea: 178000, // square feet
    annualEnergyUsage: 3200000, // kWh
    energyRate: 0.145, // $/kWh
    peakDemand: 680, // kW
    industryAvg: {
      energyUsage: 18, // kWh per square foot
      solarAdoption: 12, // percentage
      costPerWatt: 2.25, // $
      paybackPeriod: 8.5, // years
    },
    solarPotential: {
      maxCapacity: 1750, // kW
      annualProduction: 2425000, // kWh
      energyCoverage: 75.8, // percentage
      installationCost: 3937500, // $
      netInstallationCost: 2756250, // $ after incentives
      incentives: 1181250, // $
      costWithoutSolar: 464000, // $ per year
      costWithSolar: 112288, // $ per year
      annualSavings: 351712, // $ per year
      monthlySavings: 29309, // $ per month
      paybackPeriod: 7.8, // years
      roi: 12.8, // percentage
      carbonOffset: 1721, // tons of CO2 per year
    }
  },
  {
    id: 5,
    name: "Scott Simpson",
    jobTitle: "Facilities Manager",
    company: "Plexus Corp.",
    emails: true,
    phoneNumbers: true,
    location: "Neenah, WI",
    enriched: true,
    verified: true,
    email: "s.simpson@example.com",
    phone: "(920) 555-3456",
    facilityType: "Manufacturing Plant",
    facilitySize: 265000, // square feet
    yearBuilt: 2005,
    roofArea: 230000, // square feet
    annualEnergyUsage: 7850000, // kWh
    energyRate: 0.102, // $/kWh
    peakDemand: 1650, // kW
    industryAvg: {
      energyUsage: 32, // kWh per square foot
      solarAdoption: 9, // percentage
      costPerWatt: 2.18, // $
      paybackPeriod: 9.3, // years
    },
    solarPotential: {
      maxCapacity: 2250, // kW
      annualProduction: 2812500, // kWh
      energyCoverage: 35.8, // percentage
      installationCost: 4905000, // $
      netInstallationCost: 3433500, // $ after incentives
      incentives: 1471500, // $
      costWithoutSolar: 800700, // $ per year
      costWithSolar: 514419, // $ per year
      annualSavings: 286281, // $ per year
      monthlySavings: 23857, // $ per month
      paybackPeriod: 12.0, // years
      roi: 8.3, // percentage
      carbonOffset: 1997, // tons of CO2 per year
    }
  },
  {
    id: 6,
    name: "Rob Greinke",
    jobTitle: "Facilities Manager",
    company: "Eaton",
    emails: true,
    phoneNumbers: true,
    location: "Waukesha, WI",
    enriched: true,
    verified: true,
    email: "r.greinke@example.com",
    phone: "(262) 555-9012",
    facilityType: "Office Building",
    facilitySize: 95000, // square feet
    yearBuilt: 2014,
    roofArea: 78000, // square feet
    annualEnergyUsage: 1950000, // kWh
    energyRate: 0.115, // $/kWh
    peakDemand: 520, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 14, // percentage
      costPerWatt: 2.29, // $
      paybackPeriod: 8.7, // years
    },
    solarPotential: {
      maxCapacity: 770, // kW
      annualProduction: 1078000, // kWh
      energyCoverage: 55.3, // percentage
      installationCost: 1763300, // $
      netInstallationCost: 1234310, // $ after incentives
      incentives: 528990, // $
      costWithoutSolar: 224250, // $ per year
      costWithSolar: 100317, // $ per year
      annualSavings: 123933, // $ per year
      monthlySavings: 10328, // $ per month
      paybackPeriod: 10.0, // years
      roi: 10.0, // percentage
      carbonOffset: 765, // tons of CO2 per year
    }
  },
  {
    id: 7,
    name: "Ryan Frey",
    jobTitle: "Facilities Manager",
    company: "Vertiv",
    emails: true,
    phoneNumbers: true,
    location: "Delaware, OH",
    enriched: true,
    verified: true,
    email: "r.frey@example.com",
    phone: "(740) 555-5678",
    facilityType: "Data Center",
    facilitySize: 115000, // square feet
    yearBuilt: 2010,
    roofArea: 98000, // square feet
    annualEnergyUsage: 5950000, // kWh
    energyRate: 0.108, // $/kWh
    peakDemand: 1280, // kW
    industryAvg: {
      energyUsage: 52, // kWh per square foot
      solarAdoption: 10, // percentage
      costPerWatt: 2.22, // $
      paybackPeriod: 9.8, // years
    },
    solarPotential: {
      maxCapacity: 980, // kW
      annualProduction: 1372000, // kWh
      energyCoverage: 23.1, // percentage
      installationCost: 2175600, // $
      netInstallationCost: 1522920, // $ after incentives
      incentives: 652680, // $
      costWithoutSolar: 642600, // $ per year
      costWithSolar: 494616, // $ per year
      annualSavings: 147984, // $ per year
      monthlySavings: 12332, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 974, // tons of CO2 per year
    }
  }
];

const FacilityEnrichment = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnriching, setIsEnriching] = useState(true);
  const [facility, setFacility] = useState<any>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<any[]>([]);
  const [showEnriched, setShowEnriched] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Solar data
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

  useEffect(() => {
    // Simulate API call to get facility data
    setIsLoading(true);
    setTimeout(() => {
      // If a specific facilityId is provided, use that
      if (facilityId) {
        const foundFacility = enrichedFacilities.find(f => f.id === parseInt(facilityId));
        if (foundFacility) {
          setFacility(foundFacility);
          setSelectedFacilities([foundFacility]);
        } else {
          // If facility not found, use all facilities
          setSelectedFacilities(enrichedFacilities);
        }
      } else {
        // If no facilityId is provided, load all enriched facilities
        setSelectedFacilities(enrichedFacilities);
        if (enrichedFacilities.length > 0) {
          setFacility(enrichedFacilities[0]);
        }
      }
      setIsLoading(false);
      
      // Simulate data enrichment processing
      setTimeout(() => {
        setIsEnriching(false);
      }, 3000);
    }, 1500);
  }, [facilityId]);

  const handleDownloadReport = () => {
    toast.success('Enriched facility data exported successfully');
  };
  
  const handleContinueToEnergyUsage = () => {
    navigate('/energy-usage-estimation');
  };

  // Fix the modal showModal calls with null checks
  const showModal = (modalId: string) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement && 'showModal' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with showModal
      modalElement.showModal();
    }
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
            <h2 className="text-2xl font-bold text-white mb-2">Loading Facility Data</h2>
            <p className="text-gray-400">Preparing comprehensive solar potential and financial analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  // Function to update the existing card class names to match Home page styling
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-orange-500/15 group relative overflow-hidden";

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Simple header without box */}
          <div className="py-4">
            <div className="flex items-center gap-3">
              <MdTableChart className="text-2xl text-orange-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Facility Enrichment</h1>
            </div>
          </div>

          {isEnriching ? (
            <div className={cardBaseClass}>
              {/* Loading state content stays the same */}
              {/* ... existing loading state code ... */}
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Facilities</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{selectedFacilities.length}</h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 shadow-lg shadow-orange-500/20 backdrop-blur-md border border-white/20">
                        <FaBuilding className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Avg. Facility Size</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {Math.round(selectedFacilities.reduce((sum, facility) => sum + facility.facilitySize, 0) / selectedFacilities.length).toLocaleString()} sqft
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/20 backdrop-blur-md border border-white/20">
                        <MdFactory className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-green-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Avg. Solar ROI</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {(selectedFacilities.reduce((sum, facility) => sum + facility.solarPotential.roi, 0) / selectedFacilities.length).toFixed(1)}%
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-lg shadow-green-500/20 backdrop-blur-md border border-white/20">
                        <MdAttachMoney className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Energy</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {(selectedFacilities.reduce((sum, facility) => sum + facility.annualEnergyUsage, 0) / 1000000).toFixed(1)}M kWh
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/20 backdrop-blur-md border border-white/20">
                        <MdElectricBolt className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-amber-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Savings</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          ${(selectedFacilities.reduce((sum, facility) => sum + facility.solarPotential.annualSavings, 0) / 1000).toFixed(0)}K/yr
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-lg shadow-amber-500/20 backdrop-blur-md border border-white/20">
                        <FaSolarPanel className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search and Filter Controls */}
              <div className={`${cardBaseClass} mb-6`}>
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                      <input
                        type="text"
                        placeholder="Search facilities..."
                        className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute right-3 top-2.5 text-white/50">
                        <MdSearch size={20} />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`${
                          showEnriched 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20' 
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        } backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 text-sm font-medium border border-white/10 flex items-center gap-2`}
                        onClick={() => setShowEnriched(!showEnriched)}
                      >
                        Show Enriched Data
                        {showEnriched && <MdCheck className="text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enriched Facilities Table - Fit on one page without horizontal scroll */}
              <div className={`${cardBaseClass}`}>
                <div className="p-4">
                  <table className="w-full table-auto text-sm">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Facility Manager</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Company</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Location</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Type</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Size</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Energy</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Rate</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Capacity</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Coverage</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Without Solar</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">With Solar</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Savings/yr</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">ROI</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Payback</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">CO2 Offset</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFacilities
                        .filter(f => 
                          searchTerm ? 
                            f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            f.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            f.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            f.facilityType.toLowerCase().includes(searchTerm.toLowerCase())
                            : true
                        )
                        .map((facility, index) => (
                          <tr 
                            key={facility.id} 
                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                          >
                            <td className="px-2 py-2 text-white text-xs">
                              <div className="flex items-center">
                                <div>
                                  <div className="font-medium">{facility.name}</div>
                                  <div className="text-xs text-white/50">{facility.jobTitle}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-white text-xs">{facility.company}</td>
                            <td className="px-2 py-2 text-white text-xs">{facility.location}</td>
                            <td className="px-2 py-2 text-white text-xs">{facility.facilityType}</td>
                            <td className="px-2 py-2 text-white text-xs">{(facility.facilitySize/1000).toFixed(0)}K sqft</td>
                            <td className="px-2 py-2 text-white text-xs">{(facility.annualEnergyUsage/1000000).toFixed(2)}M kWh</td>
                            <td className="px-2 py-2 text-white text-xs">${facility.energyRate.toFixed(2)}</td>
                            
                            {showEnriched ? (
                              <>
                                <td className="px-2 py-2 text-white text-xs">{facility.solarPotential.maxCapacity} kW</td>
                                <td className="px-2 py-2 text-xs">
                                  <div className="flex items-center">
                                    <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-1">
                                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, facility.solarPotential.energyCoverage)}%` }}></div>
                                    </div>
                                    <span className="text-white">{facility.solarPotential.energyCoverage.toFixed(0)}%</span>
                                  </div>
                                </td>
                                <td className="px-2 py-2 text-white text-xs">${(facility.solarPotential.costWithoutSolar/1000).toFixed(0)}K</td>
                                <td className="px-2 py-2 text-white text-xs">${(facility.solarPotential.costWithSolar/1000).toFixed(0)}K</td>
                                <td className="px-2 py-2 text-green-400 text-xs">${(facility.solarPotential.annualSavings/1000).toFixed(0)}K</td>
                                <td className="px-2 py-2 text-white text-xs">{facility.solarPotential.roi.toFixed(1)}%</td>
                                <td className="px-2 py-2 text-white text-xs">{facility.solarPotential.paybackPeriod.toFixed(1)} yrs</td>
                                <td className="px-2 py-2 text-white text-xs">{facility.solarPotential.carbonOffset} tons</td>
                                <td className="px-2 py-2 text-xs">
                                  <button 
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-2 py-1 text-xs font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                                    onClick={() => showModal(`calculations-${facility.id}`)}
                                  >
                                    View
                                  </button>
                                </td>
                              </>
                            ) : (
                              <td colSpan={9} className="px-2 py-2 text-white/50 text-xs">
                                <div className="flex items-center gap-1">
                                  <MdOutlineWarning size={12} />
                                  <span>Solar potential data not yet displayed</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add pagination */}
              <div className="flex justify-between items-center mt-6 mb-8">
                <div className="text-white/70">
                  Showing <span className="text-white">1-{selectedFacilities.length}</span> of <span className="text-white">87</span> facilities
                </div>
                <div className="flex gap-1">
                  <button className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all">Previous</button>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-md hover:from-orange-600 hover:to-orange-700 transition-all">1</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">2</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">3</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">...</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">9</button>
                  <button className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all">Next</button>
                </div>
              </div>

              {/* Breakdown by Facility Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Facility Type Breakdown</h3>
                    
                    <div className="space-y-4">
                      {['Office Building', 'Manufacturing Plant', 'Data Center', 'Warehouse', 'Retail Store'].map(type => {
                        const count = selectedFacilities.filter(f => f.facilityType === type).length;
                        const percentage = (count / selectedFacilities.length) * 100;
                        
                        return (
                          <div key={type}>
                            <div className="flex justify-between mb-1">
                              <span className="text-white">{type}</span>
                              <span className="text-white">{count} ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200/20 rounded-full h-2.5">
                              <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-500/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Industry Avg. vs. Current Facilities</h3>
                    
                    <div className="space-y-4">
                      {selectedFacilities.map(facility => (
                        <div key={facility.id} className="bg-white/5 p-3 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span className="text-white text-sm">{facility.name} at {facility.company}</span>
                            <span className="text-white text-sm">{facility.facilityType}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70 text-xs">Energy Usage (kWh/sqft)</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white/70 text-xs">Ind. Avg: {facility.industryAvg.energyUsage}</span>
                              <span className="text-white text-xs">Current: {(facility.annualEnergyUsage / facility.facilitySize).toFixed(1)}</span>
                            </div>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70 text-xs">Solar Adoption</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white/70 text-xs">Ind. Avg: {facility.industryAvg.solarAdoption}%</span>
                              <span className="text-green-400 text-xs font-medium">{facility.solarPotential.energyCoverage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <div className="flex justify-center mt-8 mb-12">
                <button 
                  onClick={handleContinueToEnergyUsage}
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
                  
                  <span className="relative z-10 text-lg">View Energy Usage Estimation</span>
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

export default FacilityEnrichment; 