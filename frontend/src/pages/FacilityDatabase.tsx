import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdSearch, 
  MdFilterList, 
  MdLocationOn, 
  MdFactory, 
  MdOutlineEmail, 
  MdOutlinePhone, 
  MdArrowForward, 
  MdAdd, 
  MdDelete, 
  MdEdit, 
  MdLink, 
  MdCheck, 
  MdChevronRight,
  MdFilterAlt,
  MdRefresh,
  MdOutlineRoofing,
  MdOutlineManageSearch,
  MdOutlineBusiness,
  MdSolarPower,
  MdOutlineElectricBolt,
  MdAreaChart,
  MdTrendingUp,
  MdBarChart,
  MdAttachMoney,
  MdPieChart,
  MdInsights,
  MdOutlineAnalytics,
  MdOutlineLightbulb,
  MdOutlineEnergySavingsLeaf,
  MdOutlineArrowUpward,
  MdAccessTime,
  MdOutlineCalendarMonth,
  MdOutlineSearch,
  MdOutlineLocationOn,
  MdOutlineCloud,
  MdOutlineWbSunny,
  MdKeyboardArrowRight,
  MdHomeWork,
  MdShowChart,
  MdEmail,
  MdDashboard,
  MdFilterAltOff
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { FaLinkedin, FaFilter } from 'react-icons/fa';

const FacilityDatabase = () => {
  const navigate = useNavigate();
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [squareFootageFilter, setSquareFootageFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [energyUsageFilter, setEnergyUsageFilter] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [monthlyCostFilter, setMonthlyCostFilter] = useState('');
  const [installationSizeFilter, setInstallationSizeFilter] = useState('');
  const [dealSizeFilter, setDealSizeFilter] = useState('');
  const [totalCount, setTotalCount] = useState(335);
  const [netNewCount, setNetNewCount] = useState(335);
  const [savedCount, setSavedCount] = useState(0);
  const [dataScraped, setDataScraped] = useState(false);
  const [facilityType, setFacilityType] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string | boolean}>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  const [currentFilterCategory, setCurrentFilterCategory] = useState('');

  // State options for dropdown
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", 
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Industry/sector options
  const sectors = [
    "Manufacturing", "Technology", "Healthcare", "Retail", "Warehousing", "Energy", 
    "Financial Services", "Education", "Food Production", "Automotive", "Electronics", 
    "Pharmaceuticals", "Logistics", "Aerospace", "Telecommunications"
  ];

  // Square footage ranges
  const squareFootageRanges = [
    "Under 10,000 sq ft",
    "10,000 - 50,000 sq ft",
    "50,000 - 100,000 sq ft", 
    "100,000 - 250,000 sq ft",
    "250,000 - 500,000 sq ft",
    "Over 500,000 sq ft"
  ];

  // Energy usage ranges
  const energyUsageRanges = [
    "Low (< 500,000 kWh/year)",
    "Medium (500,000 - 2,000,000 kWh/year)",
    "High (2,000,000 - 5,000,000 kWh/year)",
    "Very High (> 5,000,000 kWh/year)"
  ];

  // Cost ranges for filters
  const monthlyCostRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "Over $100,000"
  ];

  const installationSizeRanges = [
    "Small (< 100kW)",
    "Medium (100kW - 500kW)",
    "Large (500kW - 1MW)",
    "Enterprise (> 1MW)"
  ];

  const dealSizeRanges = [
    "Under $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "$1,000,000 - $2,500,000",
    "Over $2,500,000"
  ];

  // Sample facility data from the image
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Jeff Levy",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Atlanta, GA",
      enriched: true,
      verified: true
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
      verified: true
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
      verified: true
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
      verified: true
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
      verified: true
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
      verified: true
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
      verified: true
    },
    {
      id: 8,
      name: "Fred Hotchkiss",
      jobTitle: "Facilities Manager",
      company: "EMS Technologies, Inc.",
      emails: true,
      phoneNumbers: true,
      location: "Binghamton, NY",
      enriched: true,
      verified: true
    },
    {
      id: 9,
      name: "Anthony Sankale",
      jobTitle: "Facilities Manager",
      company: "Novanta Inc.",
      emails: true,
      phoneNumbers: true,
      location: "Boston, MA",
      enriched: true,
      verified: true
    },
    {
      id: 10,
      name: "Bob Harrison",
      jobTitle: "Facilities Manager",
      company: "Franklin Electric",
      emails: true,
      phoneNumbers: true,
      location: "Bluffton, IN",
      enriched: true,
      verified: true
    },
    {
      id: 11,
      name: "Matt Olson",
      jobTitle: "Facilities Manager",
      company: "Bentek Corporation",
      emails: true,
      phoneNumbers: true,
      location: "San Jose, CA",
      enriched: true,
      verified: true
    },
    {
      id: 12,
      name: "Bradley Romero",
      jobTitle: "Facilities Manager",
      company: "Honeywell",
      emails: true,
      phoneNumbers: true,
      location: "Denver, CO",
      enriched: true,
      verified: true
    },
    {
      id: 13,
      name: "Vicente Cornejo",
      jobTitle: "Facilities Manager",
      company: "ITW Food Equipment Group",
      emails: true,
      phoneNumbers: true,
      location: "Dayton, OH",
      enriched: true,
      verified: true
    },
    {
      id: 14,
      name: "Daniel Conroy",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Jersey City, NJ",
      enriched: true,
      verified: true
    }
  ]);

  // Modify this function to handle all filter changes
  const handleFilterChange = (category: string, value: string | boolean) => {
    if (typeof value === 'string' && value === '') {
      // Clear this filter
      const newActiveFilters = { ...activeFilters };
      delete newActiveFilters[category];
      setActiveFilters(newActiveFilters);
    } else {
      // Set or update this filter
      setActiveFilters({
        ...activeFilters,
        [category]: value
      });
    }
    
    // Update the corresponding state variable
    switch (category) {
      case 'state':
        setStateFilter(value as string);
        break;
      case 'sector':
        setSectorFilter(value as string);
        break;
      case 'squareFootage':
        setSquareFootageFilter(value as string);
        break;
      case 'energyUsage':
        setEnergyUsageFilter(value as string);
        break;
      case 'monthlyCost':
        setMonthlyCostFilter(value as string);
        break;
      case 'installationSize':
        setInstallationSizeFilter(value as string);
        break;
      case 'dealSize':
        setDealSizeFilter(value as string);
        break;
      case 'location':
        setLocationFilter(value as string);
        break;
      case 'industry':
        setIndustryFilter(value as string);
        break;
      case 'verified':
        setShowVerifiedOnly(value as boolean);
        break;
    }
    
    // Update active filter count
    setTimeout(() => {
      const count = Object.keys(activeFilters).length;
      setActiveFilterCount(count);
    }, 0);
  };

  const clearAllFilters = () => {
    setLocationFilter('');
    setIndustryFilter('');
    setSizeFilter('');
    setSquareFootageFilter('');
    setStateFilter('');
    setSectorFilter('');
    setEnergyUsageFilter('');
    setShowVerifiedOnly(false);
    setMonthlyCostFilter('');
    setInstallationSizeFilter('');
    setDealSizeFilter('');
    setActiveFilters({});
    setActiveFilterCount(0);
  };

  const handleScrape = () => {
    if (!facilityType) {
      toast.error('Please enter what facilities you are looking for');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setDataScraped(true);
      
      // Build a description of what's being searched for
      let searchDescription = facilityType;
      
      // Add filter details to the search description
      if (stateFilter) {
        searchDescription += ` in ${stateFilter}`;
      }
      if (sectorFilter) {
        searchDescription += ` (${sectorFilter} sector)`;
      }
      if (squareFootageFilter) {
        searchDescription += ` with ${squareFootageFilter}`;
      }
      if (energyUsageFilter) {
        searchDescription += ` using ${energyUsageFilter}`;
      }
      if (showVerifiedOnly) {
        searchDescription += " with verified contacts";
      }
      
      toast.success(`Facility data for ${searchDescription} scraped successfully`);
      
      // Add new facilities
      setFacilities(prev => [
        ...prev,
        {
          id: 15,
          name: "Michael Johnson",
          jobTitle: "Facilities Manager",
          company: "Samsung Electronics",
          emails: true,
          phoneNumbers: true,
          location: "Austin, TX",
          enriched: true,
          verified: true
        },
        {
          id: 16,
          name: "Sarah Williams",
          jobTitle: "Facilities Manager",
          company: "Intel Corporation",
          emails: true,
          phoneNumbers: true,
          location: "Chandler, AZ",
          enriched: true,
          verified: true
        }
      ]);
      setTotalCount(337);
      setNetNewCount(337);
    }, 2000);
  };

  const handleEnrich = () => {
    if (selectedFacilities.length === 0) {
      toast.error('Please select at least one facility to enrich');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${selectedFacilities.length} facilities enriched successfully`);
      
      // Update enriched facilities
      setFacilities(prev => prev.map(facility => {
        if (selectedFacilities.includes(facility.id)) {
          return {
            ...facility,
            enriched: true
          };
        }
        return facility;
      }));
      
      setSelectedFacilities([]);
    }, 2000);
  };

  const handleContinue = () => {
    if (facilities.filter(f => f.enriched).length === 0) {
      toast.error('Please enrich at least one facility before continuing');
      return;
    }
    navigate('/facility-ai-analysis');
  };

  const handleSelectFacility = (id: number) => {
    setSelectedFacilities(prev => {
      if (prev.includes(id)) {
        return prev.filter(facilityId => facilityId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Helper function to generate random gradient patterns
  const getRandomGradient = () => {
    const patterns = [
      {
        base: "bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-orange-600/15",
        blobs: [
          "absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/40",
          "absolute bottom-1/3 -right-10 w-32 h-32 bg-gradient-to-tl from-amber-500/30",
          "absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-600/25"
        ]
      },
      {
        base: "bg-gradient-to-bl from-orange-600/30 via-amber-600/20 to-orange-500/15",
        blobs: [
          "absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-tr from-orange-500/40",
          "absolute -bottom-10 right-1/4 w-36 h-36 bg-gradient-to-bl from-amber-500/35",
          "absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-tr from-orange-600/30"
        ]
      },
      {
        base: "bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-orange-600/25",
        blobs: [
          "absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-orange-500/45",
          "absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-amber-600/40",
          "absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-orange-500/35"
        ]
      }
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  const filteredFacilities = facilities.filter(facility => {
    // Only show facilities when data has been scraped
    if (!dataScraped) {
      return false;
    }
    
    // Basic search term matching based on active filters
    const matchesSearch = true; // No more search term
    
    // Standard filters
    const matchesVerified = !showVerifiedOnly || facility.verified;
    const matchesLocation = locationFilter === '' || facility.location.includes(locationFilter);
    const matchesIndustry = industryFilter === '' || facility.company.includes(industryFilter);
    
    // Cost-based filters (mocked for demonstration)
    const mockMonthlyCostMatcher = () => {
      if (monthlyCostFilter === '') return true;
      // Mock logic based on facility ID for demonstration
      const mockMonthlyCost = (facility.id * 5000) % 120000;
      switch(monthlyCostFilter) {
        case "Under $5,000": return mockMonthlyCost < 5000;
        case "$5,000 - $10,000": return mockMonthlyCost >= 5000 && mockMonthlyCost < 10000;
        case "$10,000 - $25,000": return mockMonthlyCost >= 10000 && mockMonthlyCost < 25000;
        case "$25,000 - $50,000": return mockMonthlyCost >= 25000 && mockMonthlyCost < 50000;
        case "$50,000 - $100,000": return mockMonthlyCost >= 50000 && mockMonthlyCost < 100000;
        case "Over $100,000": return mockMonthlyCost >= 100000;
        default: return true;
      }
    };

    const mockInstallationSizeMatcher = () => {
      if (installationSizeFilter === '') return true;
      // Mock logic based on facility ID for demonstration
      const mockSize = (facility.id * 200) % 2000;
      switch(installationSizeFilter) {
        case "Small (< 100kW)": return mockSize < 100;
        case "Medium (100kW - 500kW)": return mockSize >= 100 && mockSize < 500;
        case "Large (500kW - 1MW)": return mockSize >= 500 && mockSize < 1000;
        case "Enterprise (> 1MW)": return mockSize >= 1000;
        default: return true;
      }
    };

    const mockDealSizeMatcher = () => {
      if (dealSizeFilter === '') return true;
      // Mock logic based on facility ID for demonstration
      const mockDealSize = (facility.id * 250000) % 3000000;
      switch(dealSizeFilter) {
        case "Under $250,000": return mockDealSize < 250000;
        case "$250,000 - $500,000": return mockDealSize >= 250000 && mockDealSize < 500000;
        case "$500,000 - $1,000,000": return mockDealSize >= 500000 && mockDealSize < 1000000;
        case "$1,000,000 - $2,500,000": return mockDealSize >= 1000000 && mockDealSize < 2500000;
        case "Over $2,500,000": return mockDealSize >= 2500000;
        default: return true;
      }
    };

    // Combine all filter criteria
    return matchesSearch && 
           matchesVerified && 
           matchesLocation && 
           matchesIndustry &&
           mockMonthlyCostMatcher() &&
           mockInstallationSizeMatcher() &&
           mockDealSizeMatcher();
  });

  // Stats card component for the dashboard
  const StatsCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    colorClass,
    borderColor = 'border-white/10' 
  }: { 
    title: string; 
    value: string; 
    change?: string;
    icon: React.ReactNode;
    colorClass: string;
    borderColor?: string;
  }) => {
    return (
      <div className={`backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-orange-500/20 hover:-translate-y-1 relative overflow-hidden group`}>
        {/* Enhanced gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-500/20 to-blue-500/30 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-2xl transform rotate-12 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-xl transform -rotate-12 opacity-80 group-hover:opacity-90"></div>
        <div className="absolute top-1/3 -right-8 w-20 h-20 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-lg transform rotate-45 opacity-70"></div>
        
        <div className="relative z-10 p-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white/90 mb-1">{title}</p>
              <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{value}</h3>
              {change && (
                <div className="flex items-center text-xs font-medium text-orange-300 mt-2">
                  <MdTrendingUp className="mr-1" /> {change}
                </div>
              )}
            </div>
            <div className={`rounded-2xl p-3 ${colorClass} shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/20`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter chip component
  const FilterChip = ({ 
    label, 
    value, 
    isActive, 
    onClick 
  }: { 
    label: string; 
    value: string | boolean; 
    isActive: boolean; 
    onClick: () => void 
  }) => {
    return (
      <button 
        onClick={onClick} 
        className={`${isActive 
          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20' 
          : 'bg-white/10 text-white/80 hover:bg-white/20'} 
          backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 text-sm font-medium border border-white/10 flex items-center gap-2`}
      >
        {label}
        {isActive && <MdCheck className="text-white" />}
      </button>
    );
  };

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      <div className="py-4"></div>
      
      <div className="flex flex-col gap-6">
        {/* Header section with title and actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-3 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <MdFactory className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Facility Database</h1>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleScrape}
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Scraping...' : 'Scrape New Facilities'}
              <MdSolarPower />
            </button>
            <button 
              onClick={handleEnrich}
              disabled={isLoading || selectedFacilities.length === 0}
              className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] text-white py-2 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed border border-orange-500/20"
            >
              {isLoading ? 'Enriching...' : 'Enrich Selected'}
              <MdOutlineElectricBolt />
            </button>
          </div>
        </div>
        
        {!dataScraped ? (
          <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 overflow-hidden transition-all duration-300 relative">
            {/* Unique gradient pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-orange-600/15 opacity-25"></div>
            <div className="absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-3xl transform rotate-45"></div>
            <div className="absolute bottom-1/3 -right-10 w-32 h-32 bg-gradient-to-tl from-amber-500/30 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-600/25 to-transparent rounded-full blur-xl transform -rotate-45"></div>
            
            <div className="relative z-10 p-10">
              <div className="flex flex-col items-center justify-center py-12 px-8 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-2xl">
                <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-5 rounded-2xl text-white shadow-lg mb-8 transform hover:scale-105 transition-transform duration-300 border border-white/20">
                  <MdFactory className="text-4xl" />
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">What facilities are you looking for?</h2>
                
                <div className="form-control w-full max-w-xl">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Electrical manufacturing facilities in the United States"
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className="w-full p-4 pl-6 pr-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-lg placeholder-white/60"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MdSearch className="text-white/70 text-xl" />
                    </div>
                  </div>
                  <p className="text-sm mt-3 text-white/70">
                    Enter the type of facilities you want to scrape data for
                  </p>
                </div>

                {/* Filter Options */}
                <div className="w-full max-w-xl mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-2 rounded-lg text-white shadow-md border border-white/20">
                        <MdFilterAlt className="text-lg" />
                      </div>
                      <h3 className="font-semibold text-white">Search Filters</h3>
                    </div>
                    <button 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
                    >
                      {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
                      {showAdvancedFilters ? 
                        <MdChevronRight className="transform rotate-90" /> : 
                        <MdChevronRight className="transform rotate-0" />
                      }
                    </button>
                  </div>

                  {showAdvancedFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdLocationOn className="text-orange-400" />
                          State
                        </label>
                        <select 
                          value={stateFilter}
                          onChange={(e) => handleFilterChange('state', e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          <option value="">All States</option>
                          {usStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineBusiness className="text-orange-400" />
                          Sector
                        </label>
                        <select 
                          value={sectorFilter}
                          onChange={(e) => handleFilterChange('sector', e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Sectors</option>
                          {sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineRoofing className="text-orange-400" />
                          Square Footage
                        </label>
                        <select 
                          value={squareFootageFilter}
                          onChange={(e) => handleFilterChange('squareFootage', e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Sizes</option>
                          {squareFootageRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineElectricBolt className="text-orange-400" />
                          Energy Usage
                        </label>
                        <select 
                          value={energyUsageFilter}
                          onChange={(e) => handleFilterChange('energyUsage', e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Energy Usage Levels</option>
                          {energyUsageRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 mt-1">
                          <input 
                            type="checkbox" 
                            checked={showVerifiedOnly}
                            onChange={() => handleFilterChange('verified', !showVerifiedOnly)}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 h-5 w-5" 
                          />
                          <span className="text-sm font-medium text-white">
                            Only show verified contacts
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleScrape}
                  disabled={isLoading || !facilityType}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed group border border-white/20"
                >
                  {isLoading ? 'Scraping...' : 'Start Scraping'}
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                {/* Animated floating elements for additional visual interest */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 animate-pulse"></div>
                <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-orange-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-20 right-4 w-12 h-12 rounded-full bg-orange-500/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Facilities"
                value={totalCount.toString()}
                change="+2 in last scrape"
                icon={<MdFactory className="text-white text-2xl" />}
                colorClass="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600"
              />
              
              <StatsCard
                title="Net New"
                value={netNewCount.toString()}
                change="+2 in last scrape"
                icon={<MdAdd className="text-white text-2xl" />}
                colorClass="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"
              />
              
              <StatsCard
                title="Saved"
                value={savedCount.toString()}
                change="0% change"
                icon={<MdCheck className="text-white text-2xl" />}
                colorClass="bg-gradient-to-br from-green-500 via-green-600 to-teal-600"
              />
            </div>
            
            {/* Filters Panel */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-6 mb-8 relative overflow-hidden">
              {/* Unique gradient pattern */}
              <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/30 via-amber-500/20 to-orange-500/25 opacity-25"></div>
              <div className="absolute -top-20 right-1/4 w-52 h-52 bg-gradient-to-br from-orange-500/45 to-transparent rounded-full blur-3xl transform rotate-45"></div>
              <div className="absolute bottom-1/3 -left-16 w-44 h-44 bg-gradient-to-tr from-amber-500/40 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-gradient-to-bl from-orange-600/35 to-transparent rounded-full blur-xl transform rotate-90"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20 border border-white/20">
                      <MdFilterAlt className="text-xl" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    
                    {activeFilterCount > 0 && (
                      <div className="bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                        {activeFilterCount}
                      </div>
                    )}
                  </div>
                  
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors text-sm"
                    >
                      <MdFilterAltOff />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Filter Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={() => setCurrentFilterCategory('location')}
                    className={`backdrop-blur-md ${currentFilterCategory === 'location' ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'} rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-white/10 group`}
                  >
                    <div className={`rounded-full p-3 ${currentFilterCategory === 'location' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all duration-300`}>
                      <MdLocationOn className="text-2xl" />
                    </div>
                    <span className="font-medium">Location</span>
                    {activeFilters['state'] && <div className="w-2 h-2 rounded-full bg-white absolute top-2 right-2"></div>}
                  </button>

                  <button
                    onClick={() => setCurrentFilterCategory('industry')}
                    className={`backdrop-blur-md ${currentFilterCategory === 'industry' ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'} rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-white/10 group`}
                  >
                    <div className={`rounded-full p-3 ${currentFilterCategory === 'industry' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all duration-300`}>
                      <MdOutlineBusiness className="text-2xl" />
                    </div>
                    <span className="font-medium">Industry</span>
                    {activeFilters['sector'] && <div className="w-2 h-2 rounded-full bg-white absolute top-2 right-2"></div>}
                  </button>

                  <button
                    onClick={() => setCurrentFilterCategory('facility')}
                    className={`backdrop-blur-md ${currentFilterCategory === 'facility' ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'} rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-white/10 group`}
                  >
                    <div className={`rounded-full p-3 ${currentFilterCategory === 'facility' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all duration-300`}>
                      <MdOutlineRoofing className="text-2xl" />
                    </div>
                    <span className="font-medium">Facility</span>
                    {(activeFilters['squareFootage'] || activeFilters['verified']) && <div className="w-2 h-2 rounded-full bg-white absolute top-2 right-2"></div>}
                  </button>

                  <button
                    onClick={() => setCurrentFilterCategory('energy')}
                    className={`backdrop-blur-md ${currentFilterCategory === 'energy' ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'} rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-white/10 group`}
                  >
                    <div className={`rounded-full p-3 ${currentFilterCategory === 'energy' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all duration-300`}>
                      <MdOutlineElectricBolt className="text-2xl" />
                    </div>
                    <span className="font-medium">Energy</span>
                    {(activeFilters['energyUsage'] || activeFilters['monthlyCost']) && <div className="w-2 h-2 rounded-full bg-white absolute top-2 right-2"></div>}
                  </button>
                </div>

                {/* Filter Options Based on Selected Category */}
                {currentFilterCategory && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {currentFilterCategory === 'location' && 'Location Filters'}
                      {currentFilterCategory === 'industry' && 'Industry Filters'}
                      {currentFilterCategory === 'facility' && 'Facility Filters'}
                      {currentFilterCategory === 'energy' && 'Energy Filters'}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {currentFilterCategory === 'location' && (
                        <>
                          <h4 className="w-full text-white/80 text-sm font-medium mb-2">States</h4>
                          <FilterChip 
                            label="All States" 
                            value="" 
                            isActive={stateFilter === ''} 
                            onClick={() => handleFilterChange('state', '')} 
                          />
                          {usStates.filter((_, i) => i < 10).map(state => (
                            <FilterChip 
                              key={state} 
                              label={state} 
                              value={state} 
                              isActive={stateFilter === state} 
                              onClick={() => handleFilterChange('state', state)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Cities</div>
                          <FilterChip 
                            label="All Cities" 
                            value="" 
                            isActive={locationFilter === ''} 
                            onClick={() => handleFilterChange('location', '')} 
                          />
                          {['Atlanta', 'Boston', 'Denver', 'Kansas City', 'San Francisco', 'San Jose', 'Austin', 'Chandler'].map(city => (
                            <FilterChip 
                              key={city} 
                              label={city} 
                              value={city} 
                              isActive={locationFilter === city} 
                              onClick={() => handleFilterChange('location', city)} 
                            />
                          ))}
                        </>
                      )}

                      {currentFilterCategory === 'industry' && (
                        <>
                          <h4 className="w-full text-white/80 text-sm font-medium mb-2">Sectors</h4>
                          <FilterChip 
                            label="All Sectors" 
                            value="" 
                            isActive={sectorFilter === ''} 
                            onClick={() => handleFilterChange('sector', '')} 
                          />
                          {sectors.map(sector => (
                            <FilterChip 
                              key={sector} 
                              label={sector} 
                              value={sector} 
                              isActive={sectorFilter === sector} 
                              onClick={() => handleFilterChange('sector', sector)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Companies</div>
                          <FilterChip 
                            label="All Companies" 
                            value="" 
                            isActive={industryFilter === ''} 
                            onClick={() => handleFilterChange('industry', '')} 
                          />
                          {['Apple', 'Honeywell', 'ChargePoint', 'Eaton', 'Vertiv', 'Samsung', 'Intel'].map(company => (
                            <FilterChip 
                              key={company} 
                              label={company} 
                              value={company} 
                              isActive={industryFilter === company} 
                              onClick={() => handleFilterChange('industry', company)} 
                            />
                          ))}
                        </>
                      )}

                      {currentFilterCategory === 'facility' && (
                        <>
                          <h4 className="w-full text-white/80 text-sm font-medium mb-2">Square Footage</h4>
                          <FilterChip 
                            label="All Sizes" 
                            value="" 
                            isActive={squareFootageFilter === ''} 
                            onClick={() => handleFilterChange('squareFootage', '')} 
                          />
                          {squareFootageRanges.map(range => (
                            <FilterChip 
                              key={range} 
                              label={range} 
                              value={range} 
                              isActive={squareFootageFilter === range} 
                              onClick={() => handleFilterChange('squareFootage', range)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Contact Verification</div>
                          <FilterChip 
                            label="All Contacts" 
                            value={false} 
                            isActive={!showVerifiedOnly} 
                            onClick={() => handleFilterChange('verified', false)} 
                          />
                          <FilterChip 
                            label="Verified Only" 
                            value={true} 
                            isActive={showVerifiedOnly} 
                            onClick={() => handleFilterChange('verified', true)} 
                          />
                        </>
                      )}

                      {currentFilterCategory === 'energy' && (
                        <>
                          <h4 className="w-full text-white/80 text-sm font-medium mb-2">Energy Usage</h4>
                          <FilterChip 
                            label="All Usage Levels" 
                            value="" 
                            isActive={energyUsageFilter === ''} 
                            onClick={() => handleFilterChange('energyUsage', '')} 
                          />
                          {energyUsageRanges.map(range => (
                            <FilterChip 
                              key={range} 
                              label={range} 
                              value={range} 
                              isActive={energyUsageFilter === range} 
                              onClick={() => handleFilterChange('energyUsage', range)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Monthly Energy Cost</div>
                          <FilterChip 
                            label="All Cost Ranges" 
                            value="" 
                            isActive={monthlyCostFilter === ''} 
                            onClick={() => handleFilterChange('monthlyCost', '')} 
                          />
                          {monthlyCostRanges.map(range => (
                            <FilterChip 
                              key={range} 
                              label={range} 
                              value={range} 
                              isActive={monthlyCostFilter === range} 
                              onClick={() => handleFilterChange('monthlyCost', range)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Installation Size</div>
                          <FilterChip 
                            label="All Installation Sizes" 
                            value="" 
                            isActive={installationSizeFilter === ''} 
                            onClick={() => handleFilterChange('installationSize', '')} 
                          />
                          {installationSizeRanges.map(range => (
                            <FilterChip 
                              key={range} 
                              label={range} 
                              value={range} 
                              isActive={installationSizeFilter === range} 
                              onClick={() => handleFilterChange('installationSize', range)} 
                            />
                          ))}
                          <div className="w-full text-white/80 text-sm font-medium mt-4 mb-2">Deal Size</div>
                          <FilterChip 
                            label="All Deal Sizes" 
                            value="" 
                            isActive={dealSizeFilter === ''} 
                            onClick={() => handleFilterChange('dealSize', '')} 
                          />
                          {dealSizeRanges.map(range => (
                            <FilterChip 
                              key={range} 
                              label={range} 
                              value={range} 
                              isActive={dealSizeFilter === range} 
                              onClick={() => handleFilterChange('dealSize', range)} 
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Active Filters Display */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-white/70 text-sm">Active filters:</span>
                    {Object.entries(activeFilters).map(([key, value]) => (
                      <div key={key} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                        {key === 'state' && 'State:'}
                        {key === 'sector' && 'Sector:'}
                        {key === 'squareFootage' && 'Size:'}
                        {key === 'energyUsage' && 'Energy:'}
                        {key === 'monthlyCost' && 'Cost:'}
                        {key === 'installationSize' && 'Installation:'}
                        {key === 'dealSize' && 'Deal:'}
                        {key === 'location' && 'City:'}
                        {key === 'industry' && 'Company:'}
                        {key === 'verified' && 'Verified Only'}
                        {key !== 'verified' && <span className="font-medium">{value.toString()}</span>}
                        <button 
                          onClick={() => handleFilterChange(key, '')}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Facilities Table */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 relative overflow-hidden">
              {/* Unique gradient pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-orange-600/25 opacity-25"></div>
              <div className="absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-orange-500/45 to-transparent rounded-full blur-3xl transform rotate-90"></div>
              <div className="absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-amber-600/40 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-orange-500/35 to-transparent rounded-full blur-xl transform -rotate-45"></div>
              
              <div className="relative z-10 overflow-x-auto rounded-2xl">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="w-12 py-4 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-orange-400 text-orange-500 focus:ring-orange-500 h-5 w-5 bg-white/10"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFacilities(filteredFacilities.map(f => f.id));
                            } else {
                              setSelectedFacilities([]);
                            }
                          }}
                          checked={selectedFacilities.length === filteredFacilities.length && filteredFacilities.length > 0}
                        />
                      </th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Name</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Job Title</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Company</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Emails</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Phone Numbers</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Actions</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Links</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">Location</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-white uppercase tracking-wider">AI Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredFacilities.length > 0 ? (
                      filteredFacilities.map((facility) => (
                        <tr key={facility.id} className={`${
                          selectedFacilities.includes(facility.id) 
                            ? "bg-orange-500/20" 
                            : "hover:bg-white/5"
                          } transition-colors`}
                        >
                          <td className="py-4 px-4">
                            <input 
                              type="checkbox" 
                              className="rounded border-orange-400 text-orange-500 focus:ring-orange-500 h-5 w-5 bg-white/10"
                              checked={selectedFacilities.includes(facility.id)}
                              onChange={() => handleSelectFacility(facility.id)}
                            />
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-orange-400 hover:text-orange-300 cursor-pointer">{facility.name}</td>
                          <td className="py-4 px-4 text-sm text-white/80">{facility.jobTitle}</td>
                          <td className="py-4 px-4 text-sm text-white/80">
                            {facility.company === "Apple" && <span className="flex items-center gap-1">🍎 Apple</span>}
                            {facility.company === "Honeywell" && <span className="flex items-center gap-1"><span className="bg-red-500 w-4 h-4 rounded-sm"></span> Honeywell</span>}
                            {facility.company === "ChargePoint" && <span className="flex items-center gap-1">— ChargePoint</span>}
                            {facility.company === "Plexus Corp." && <span className="flex items-center gap-1"><span className="bg-red-600 w-4 h-4 rounded-sm"></span> Plexus Corp.</span>}
                            {facility.company === "Eaton" && <span className="flex items-center gap-1">Eaton</span>}
                            {facility.company === "Vertiv" && <span className="flex items-center gap-1"><span className="bg-black w-4 h-4 rounded-sm"></span> Vertiv</span>}
                            {facility.company === "EMS Technologies, Inc." && <span className="flex items-center gap-1">EMS Technologies, Inc.</span>}
                            {facility.company === "Novanta Inc." && <span className="flex items-center gap-1"><span className="bg-teal-500 w-4 h-4 rounded-sm"></span> Novanta Inc.</span>}
                            {facility.company === "Franklin Electric" && <span className="flex items-center gap-1"><span className="bg-blue-600 w-4 h-4 rounded-sm"></span> Franklin Electric</span>}
                            {facility.company === "Bentek Corporation" && <span className="flex items-center gap-1">Bentek Corporation</span>}
                            {facility.company === "ITW Food Equipment Group" && <span className="flex items-center gap-1">ITW Food Equipment Group</span>}
                            {facility.company === "Samsung Electronics" && <span className="flex items-center gap-1">Samsung Electronics</span>}
                            {facility.company === "Intel Corporation" && <span className="flex items-center gap-1">Intel Corporation</span>}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <div className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-green-500/20 text-green-400 font-medium text-xs">
                              <MdCheck className="text-green-400" /> Access email
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <div className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-green-500/20 text-green-400 font-medium text-xs">
                              <MdCheck className="text-green-400" /> Access Mobile
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <div className="flex gap-2">
                              <button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">
                                <MdEdit size={16} />
                              </button>
                              <button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">
                                <MdLink size={16} />
                              </button>
                              <button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">
                                <MdOutlineEmail size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <FaLinkedin className="text-blue-400" size={20} />
                          </td>
                          <td className="py-4 px-4 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                              <MdLocationOn className="text-orange-500" />
                              {facility.location}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <button 
                              onClick={() => navigate(`/facility-ai-analysis/${facility.id}`)}
                              className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-xs shadow-sm hover:shadow-md transition-all group border border-white/20"
                            >
                              AI Analysis
                              <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-8 px-4 text-center text-white/60">
                          <div className="flex flex-col items-center">
                            <MdSearch className="text-4xl text-white/30 mb-3" />
                            <p className="text-lg font-semibold text-white/80">No facilities found</p>
                            <p className="text-sm mt-1">Try adjusting your filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Footer info */}
            <div className="mt-6 backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-6 relative overflow-hidden">
              {/* Unique gradient pattern */}
              <div className="absolute inset-0 bg-gradient-to-bl from-orange-600/30 via-amber-600/20 to-orange-500/15 opacity-25"></div>
              <div className="absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-tr from-orange-500/40 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
              <div className="absolute -bottom-10 right-1/4 w-36 h-36 bg-gradient-to-bl from-amber-500/35 to-transparent rounded-full blur-2xl transform rotate-45"></div>
              <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-tr from-orange-600/30 to-transparent rounded-full blur-xl"></div>
              
              <div className="flex flex-wrap justify-between items-center gap-4 relative z-10">
                <div>
                  <span className="text-sm font-medium text-white/80">
                    {facilities.filter(f => f.enriched).length} of {facilities.length} facilities enriched
                  </span>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full" 
                      style={{ width: `${(facilities.filter(f => f.enriched).length / facilities.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm py-2 px-4 rounded-lg border border-orange-500/20">
                  <MdSolarPower className="text-orange-400 text-lg" />
                  <span className="text-sm font-medium text-white/80">
                    Only 5% of these facilities have adopted solar technology
                  </span>
                </div>
                
                <button 
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group border border-white/20"
                >
                  Continue to AI Analysis
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityDatabase;
