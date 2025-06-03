import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
  MdFilterAltOff,
  MdArrowBack,
  MdInfoOutline,
  MdStorage,
} from 'react-icons/md';
import { toast, Toaster } from 'react-hot-toast';
import { FaLinkedin, FaFilter } from 'react-icons/fa';

// Custom toast configuration for dark theme and bottom-right position
const darkToast = {
  success: (message: string) => 
    toast.success(message, {
      style: {
        background: 'rgba(40, 41, 43, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      position: 'bottom-right',
      iconTheme: {
        primary: '#f97316',
        secondary: '#fff',
      },
    }),
  
  error: (message: string) => 
    toast.error(message, {
      style: {
        background: 'rgba(40, 41, 43, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      position: 'bottom-right',
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    })
};

const FacilityDatabase = () => {
  const navigate = useNavigate();
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [squareFootageFilter, setSquareFootageFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('Technology');
  const [energyUsageFilter, setEnergyUsageFilter] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [monthlyCostFilter, setMonthlyCostFilter] = useState('');
  const [installationSizeFilter, setInstallationSizeFilter] = useState('');
  const [dealSizeFilter, setDealSizeFilter] = useState('');
  const [totalCount, setTotalCount] = useState(335);
  const [netNewCount, setNetNewCount] = useState(335);
  const [savedCount, setSavedCount] = useState(0);
  const [dataScraped, setDataScraped] = useState(true);
  const [facilityType, setFacilityType] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string | boolean | string[]}>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  const [currentFilterCategory, setCurrentFilterCategory] = useState('');
  const [expandedFilter, setExpandedFilter] = useState<string | null>('location');

  // Add facility search/filter state
  const [facilitySearchTerm, setFacilitySearchTerm] = useState('');
  const [facilityTypeFilter, setFacilityTypeFilter] = useState('');

  // Add loading text state for dynamic messages
  const [loadingText, setLoadingText] = useState('Initializing search...');

  // Loading animation component
  const SearchLoadingOverlay = () => {
    useEffect(() => {
      if (!isLoading) return;
      
      const loadingMessages = [
        'Initializing search...',
        'Scanning 4.13M commercial facilities...',
        'Applying location filters...',
        'Analyzing facility specifications...',
        'Cross-referencing energy data...',
        'Identifying solar potential...',
        'Finalizing results...'
      ];
      
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[currentIndex]);
      }, 400);
      
      return () => clearInterval(interval);
    }, [isLoading]);
    
    if (!isLoading) return null;
    
    return createPortal(
      <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative">
          {/* Main loading card */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/90 via-[#28292b]/70 to-[rgba(40,41,43,0.5)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-orange-500/30 p-8 max-w-md mx-4 relative overflow-hidden">
            
            {/* Animated background gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-orange-600/20 opacity-40 animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-3xl animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
            
            <div className="relative z-10 text-center">
              {/* Icon with pulsing animation */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500/30 via-orange-500/20 to-transparent rounded-2xl flex items-center justify-center relative">
                  <MdSearch className="text-4xl text-orange-400 animate-pulse" />
                  
                  {/* Radar sweep effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/50 animate-ping"></div>
                  <div className="absolute inset-2 rounded-xl border border-orange-400/30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Floating data icons */}
                <div className="absolute -top-2 -right-2 animate-bounce" style={{animationDelay: '0.2s'}}>
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MdStorage className="text-blue-400 text-sm" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 animate-bounce" style={{animationDelay: '0.8s'}}>
                  <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MdFactory className="text-green-400 text-sm" />
                  </div>
                </div>
                <div className="absolute top-1/2 -left-4 animate-bounce" style={{animationDelay: '1.2s'}}>
                  <div className="w-5 h-5 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MdLocationOn className="text-purple-400 text-xs" />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">Searching Database</h3>
              
              {/* Dynamic loading text */}
              <p className="text-white/80 mb-6 h-6 transition-all duration-300">
                {loadingText}
              </p>
              
              {/* Animated progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full animate-pulse relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Stats being processed */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-white/5 rounded-lg p-2 animate-pulse" style={{animationDelay: '0.1s'}}>
                  <div className="text-orange-400 font-semibold">4.13M</div>
                  <div className="text-white/60">Total</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 animate-pulse" style={{animationDelay: '0.3s'}}>
                  <div className="text-blue-400 font-semibold">2.5M</div>
                  <div className="text-white/60">Verified</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 animate-pulse" style={{animationDelay: '0.5s'}}>
                  <div className="text-green-400 font-semibold">520K</div>
                  <div className="text-white/60">High Potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

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

  // Square footage ranges - updated for more granular options
  const squareFootageRanges = [
    "Under 10,000 sq ft",
    "10,000 - 15,000 sq ft",
    "15,000 - 30,000 sq ft",
    "30,000 - 50,000 sq ft",
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

  // Add facility types
  const facilityTypes = [
    "Manufacturing Plant", 
    "Distribution Center", 
    "Warehouse", 
    "Retail Store", 
    "Office Building", 
    "Data Center", 
    "Hospital/Medical", 
    "Educational Institution", 
    "Hotel/Hospitality", 
    "Agricultural"
  ];

  // Add employee count ranges
  const employeeCountRanges = [
    "1-20 employees",
    "21-50 employees",
    "51-100 employees",
    "101-500 employees",
    "501-1,000 employees",
    "1,001-5,000 employees",
    "5,001-10,000 employees",
    "10,000+ employees"
  ];

  // Add employee count filter state
  const [employeeCountFilter, setEmployeeCountFilter] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [verifiedEmailFilter, setVerifiedEmailFilter] = useState(false);
  const [verifiedPhoneFilter, setVerifiedPhoneFilter] = useState(false);
  
  // Multi-select facility sizes and job titles
  const [selectedFacilitySizes, setSelectedFacilitySizes] = useState<string[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);

  // Decision maker/job title options
  const jobTitles = [
    "Facility Manager",
    "Facilities Director", 
    "Head of Facilities",
    "Operations Manager",
    "Head of IT",
    "IT Director",
    "Head of Procurement",
    "Procurement Manager",
    "Sustainability Manager",
    "Energy Manager",
    "Plant Manager",
    "General Manager",
    "Vice President of Operations"
  ];

  // Sample facility data from the image
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Sean Bonner",
      jobTitle: "Facilities Manager",
      company: "Vitesco Technologies",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "s.bonner@vitesco-technologies.com",
      phone: "(313) 555-0001",
      facilityType: "Automotive",
      employeeCount: "36K"
    },
    {
      id: 2,
      name: "Aaron Miller",
      jobTitle: "Facilities Manager",
      company: "Detroit Wayne Integrated",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "a.miller@detroitwayne.org",
      phone: "(313) 555-0002",
      facilityType: "Mental Health Care",
      employeeCount: "320"
    },
    {
      id: 3,
      name: "Amy Brady",
      jobTitle: "Facilities Manager",
      company: "MAGNA SEATING OF AMERICA",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "a.brady@magna.com",
      phone: "(313) 555-0003",
      facilityType: "Machinery",
      employeeCount: "380"
    },
    {
      id: 4,
      name: "Peter Jonna",
      jobTitle: "Facilities Manager",
      company: "Jonna Companies",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "p.jonna@jonnacompanies.com",
      phone: "(313) 555-0004",
      facilityType: "Construction",
      employeeCount: "16"
    },
    {
      id: 5,
      name: "Dale Merritt",
      jobTitle: "Facilities Manager",
      company: "Henry Ford Health",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "d.merritt@hfhs.org",
      phone: "(313) 555-0005",
      facilityType: "Hospital & Health Care",
      employeeCount: "32K"
    },
    {
      id: 6,
      name: "Alex Brown",
      jobTitle: "Facilities Manager",
      company: "City of Berkley, Michigan",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "a.brown@berkleymich.org",
      phone: "(313) 555-0006",
      facilityType: "Government Administration",
      employeeCount: "38"
    },
    {
      id: 7,
      name: "Justin Hiller",
      jobTitle: "Facilities Manager",
      company: "Princeton Management",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "j.hiller@princetonmgmt.com",
      phone: "(313) 555-0007",
      facilityType: "Real Estate",
      employeeCount: "240"
    },
    {
      id: 8,
      name: "Clinton Elliott",
      jobTitle: "Facilities Manager",
      company: "Stellantis",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "c.elliott@stellantis.com",
      phone: "(313) 555-0008",
      facilityType: "Automotive",
      employeeCount: "248K"
    },
    {
      id: 9,
      name: "Mark Vanderbrook",
      jobTitle: "Facilities Manager",
      company: "Stellantis",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "m.vanderbrook@stellantis.com",
      phone: "(313) 555-0009",
      facilityType: "Automotive",
      employeeCount: "248K"
    },
    {
      id: 10,
      name: "Cory Heck",
      jobTitle: "Facilities Manager",
      company: "AAA Life Insurance Company",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "c.heck@aaa.com",
      phone: "(313) 555-0010",
      facilityType: "Insurance",
      employeeCount: "940"
    },
    {
      id: 11,
      name: "Benjamin Bourneau",
      jobTitle: "Facilities Manager",
      company: "Glorious Cannabis Company",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "b.bourneau@glorious.com",
      phone: "(313) 555-0011",
      facilityType: "Alternative Medicine",
      employeeCount: "120"
    },
    {
      id: 12,
      name: "Melissa Maynard",
      jobTitle: "Facilities Manager",
      company: "Cushman & Wakefield",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "m.maynard@cushwake.com",
      phone: "(313) 555-0012",
      facilityType: "Real Estate",
      employeeCount: "53K"
    },
    {
      id: 13,
      name: "Brian Henderson",
      jobTitle: "Facilities Manager",
      company: "Cranbrook Educational Community",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "b.henderson@cranbrook.edu",
      phone: "(313) 555-0013",
      facilityType: "Government Administration",
      employeeCount: "410"
    },
    {
      id: 14,
      name: "Ted Skaakos",
      jobTitle: "Facilities Manager",
      company: "City of Dearborn",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "t.skaakos@dearborn.org",
      phone: "(313) 555-0014",
      facilityType: "Government Administration",
      employeeCount: "560"
    },
    {
      id: 15,
      name: "Dolores Jenkins",
      jobTitle: "Facilities Manager",
      company: "SP+ (SP Plus)",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "d.jenkins@spplus.com",
      phone: "(313) 555-0015",
      facilityType: "Facilities Services",
      employeeCount: "20K"
    },
    {
      id: 16,
      name: "Laura Payne",
      jobTitle: "Facilities Manager",
      company: "JLL",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "l.payne@jll.com",
      phone: "(313) 555-0016",
      facilityType: "Real Estate",
      employeeCount: "111K"
    },
    {
      id: 17,
      name: "Keith Amley",
      jobTitle: "Facilities Manager",
      company: "IAC Group",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "k.amley@iacgroup.com",
      phone: "(313) 555-0017",
      facilityType: "Automotive",
      employeeCount: "7.3K"
    },
    {
      id: 18,
      name: "Yolanda Walton",
      jobTitle: "Facilities Manager",
      company: "General Motors",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "y.walton@gm.com",
      phone: "(313) 555-0018",
      facilityType: "Automotive",
      employeeCount: "163K"
    },
    {
      id: 19,
      name: "Tammi Wiese",
      jobTitle: "Facilities Manager",
      company: "DaVita Kidney Care",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "t.wiese@davita.com",
      phone: "(313) 555-0019",
      facilityType: "Hospital & Health Care",
      employeeCount: "70K"
    },
    {
      id: 20,
      name: "Nicholas McDuff",
      jobTitle: "Facilities Manager",
      company: "JLL",
      emails: true,
      phoneNumbers: true,
      location: "Detroit, Michigan",
      enriched: true,
      verified: true,
      email: "n.mcduff@jll.com",
      phone: "(313) 555-0020",
      facilityType: "Real Estate",
      employeeCount: "111K"
    }
  ]);

  // Custom select component to fix white dropdown issue
  const CustomSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder = "Select..."
  }: { 
    value: string; 
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        
        // Don't close if clicking on the dropdown itself
        if (dropdownRef.current && dropdownRef.current.contains(target)) {
          return;
        }
        
        // Don't close if clicking on the select button
        if (selectRef.current && selectRef.current.contains(target)) {
          return;
        }
        
        setIsOpen(false);
      };
      
      if (isOpen) {
        // Add a small delay to prevent immediate closing
        setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside);
        }, 10);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    // Close dropdown when pressing Escape
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);
    
    const selectedOption = options.find(option => option.value === value);
    
    const handleOptionClick = (optionValue: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      
      console.log('Option clicked:', optionValue); // Debug log
      onChange(optionValue);
      // DO NOT close the dropdown - let user manually close it by clicking the main button
      // setIsOpen(false); // REMOVED THIS LINE
    };
    
    const handleButtonClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(!isOpen); // Toggle open/close state
    };
    
    // Get button position for dropdown placement
    const getButtonPosition = () => {
      if (!buttonRef.current) return { top: 0, left: 0, width: 0 };
      
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 2, // Add small gap
        left: rect.left + window.scrollX,
        width: rect.width
      };
    };
    
    return (
      <div className="relative" ref={selectRef}>
        <button
          ref={buttonRef}
          type="button"
          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-[#28292b] backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all flex justify-between items-center hover:bg-[#32333b]"
          onClick={handleButtonClick}
        >
          <span className={`${!selectedOption ? 'text-white/50' : 'text-white'} truncate pr-2`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <MdKeyboardArrowRight className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        
        {isOpen && createPortal(
          <div 
            ref={dropdownRef}
            className="fixed z-[99999] rounded-md bg-[#28292b] border border-white/20 shadow-2xl max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
            style={{
              top: `${getButtonPosition().top}px`,
              left: `${getButtonPosition().left}px`,
              width: `${getButtonPosition().width}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full cursor-pointer select-none relative py-2 px-3 text-left transition-colors ${
                    option.value === value 
                      ? 'bg-gradient-to-r from-orange-500/30 to-orange-600/10 text-white' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={(e) => handleOptionClick(option.value, e)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };

  // Multi-select component for facility sizes and job titles
  const MultiSelect = ({ 
    values, 
    onChange, 
    options, 
    placeholder = "Select multiple..."
  }: { 
    values: string[]; 
    onChange: (values: string[]) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        
        if (dropdownRef.current && dropdownRef.current.contains(target)) {
          return;
        }
        
        if (selectRef.current && selectRef.current.contains(target)) {
          return;
        }
        
        setIsOpen(false);
      };
      
      if (isOpen) {
        setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside);
        }, 10);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    // Close dropdown when pressing Escape
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);
    
    const handleOptionClick = (optionValue: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      
      const newValues = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue];
      
      console.log('Multi-select option clicked:', optionValue, 'New values:', newValues);
      onChange(newValues);
      // Keep dropdown open for multi-select - don't call setIsOpen(false)
    };
    
    const handleButtonClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(!isOpen); // Toggle open/close state
    };
    
    const getButtonPosition = () => {
      if (!buttonRef.current) return { top: 0, left: 0, width: 0 };
      
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 2,
        left: rect.left + window.scrollX,
        width: rect.width
      };
    };
    
    const displayText = values.length === 0 
      ? placeholder 
      : values.length === 1 
        ? values[0] 
        : `${values.length} selected`;
    
    return (
      <div className="relative" ref={selectRef}>
        <button
          ref={buttonRef}
          type="button"
          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-[#28292b] backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all flex justify-between items-center hover:bg-[#32333b]"
          onClick={handleButtonClick}
        >
          <span className={`${values.length === 0 ? 'text-white/50' : 'text-white'} truncate pr-2`}>
            {displayText}
          </span>
          <MdKeyboardArrowRight className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        
        {isOpen && createPortal(
          <div 
            ref={dropdownRef}
            className="fixed z-[99999] rounded-md bg-[#28292b] border border-white/20 shadow-2xl max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
            style={{
              top: `${getButtonPosition().top}px`,
              left: `${getButtonPosition().left}px`,
              width: `${getButtonPosition().width}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full cursor-pointer select-none relative py-2 px-3 text-left transition-colors flex items-center gap-2 ${
                    values.includes(option.value)
                      ? 'bg-gradient-to-r from-orange-500/30 to-orange-600/10 text-white' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={(e) => handleOptionClick(option.value, e)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className={`w-4 h-4 rounded border border-white/30 flex items-center justify-center ${
                    values.includes(option.value) ? 'bg-orange-500 border-orange-500' : ''
                  }`}>
                    {values.includes(option.value) && <MdCheck className="text-white text-xs" />}
                  </div>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };

  // Modify this function to handle all filter changes
  const handleFilterChange = (category: string, value: string | boolean | string[]) => {
    let newActiveFilters = { ...activeFilters };
    
    if (Array.isArray(value)) {
      // Handle multi-select arrays
      if (value.length === 0) {
        delete newActiveFilters[category];
      } else {
        newActiveFilters[category] = value;
      }
    } else if (typeof value === 'string' && value === '') {
      // Clear this filter
      delete newActiveFilters[category];
    } else if (typeof value === 'boolean' && value === false) {
      // Clear boolean filter
      delete newActiveFilters[category];
    } else {
      // Set or update this filter
      newActiveFilters[category] = value;
    }
    
    setActiveFilters(newActiveFilters);
    
    // Update the corresponding state variable
    switch (category) {
      case 'facilitySearch':
        setFacilitySearchTerm(value as string);
        break;
      case 'facilityType':
        setFacilityTypeFilter(value as string);
        break;
      case 'state':
        setStateFilter(value as string);
        break;
      case 'sector':
        setSectorFilter(value as string);
        break;
      case 'squareFootage':
        setSelectedFacilitySizes(value as string[]);
        break;
      case 'jobTitles':
        setSelectedJobTitles(value as string[]);
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
      case 'employeeCount':
        setEmployeeCountFilter(value as string);
        break;
      case 'companyName':
        setCompanyNameFilter(value as string);
        break;
      case 'verifiedEmail':
        setVerifiedEmailFilter(value as boolean);
        break;
      case 'verifiedPhone':
        setVerifiedPhoneFilter(value as boolean);
        break;
    }
    
    // Check if there are any active filters
    const hasActiveFilters = Object.keys(newActiveFilters).length > 0;
    
    // Update filtered count - always show 5.6K when filters are applied
    const newFilteredCount = hasActiveFilters ? 5600 : facilitiesStats.total;
    
    // Update the stats
    setFacilitiesStats(prev => ({
      ...prev,
      filtered: newFilteredCount
    }));
    
    // Update pagination based on new filtered count
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(newFilteredCount / prev.itemsPerPage)
    }));
    
    // Update active filter count
    setActiveFilterCount(Object.keys(newActiveFilters).length);
    
    // DO NOT auto-close expanded sections - let user manually control them
  };

  const clearAllFilters = () => {
    setFacilitySearchTerm('');
    setFacilityTypeFilter('');
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
    setEmployeeCountFilter('');
    setCompanyNameFilter('');
    setVerifiedEmailFilter(false);
    setVerifiedPhoneFilter(false);
    setSelectedFacilitySizes([]);
    setSelectedJobTitles([]);
    setActiveFilters({});
    setActiveFilterCount(0);
    
    // Reset filtered count to total
    setFacilitiesStats(prev => ({
      ...prev,
      filtered: prev.total
    }));
    
    // Reset pagination
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(facilitiesStats.total / prev.itemsPerPage)
    }));
    
    // Keep expanded sections open even after clearing filters
  };

  const handleScrape = () => {
    if (!facilityType) {
      darkToast.error('Please enter what facilities you are looking for');
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
      
      darkToast.success(`Facility data for ${searchDescription} scraped successfully`);
      
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
          verified: true,
          email: "m.johnson@samsung.com",
          phone: "(512) 555-0021",
          facilityType: "Technology",
          employeeCount: "12K"
        },
        {
          id: 22,
          name: "Sarah Williams",
          jobTitle: "Facilities Manager",
          company: "Intel Corporation",
          emails: true,
          phoneNumbers: true,
          location: "Chandler, AZ",
          enriched: true,
          verified: true,
          email: "s.williams@intel.com",
          phone: "(480) 555-0022",
          facilityType: "Technology",
          employeeCount: "8K"
        }
      ]);
      setTotalCount(337);
      setNetNewCount(337);
    }, 2000);
  };

  const handleEnrich = () => {
    if (selectedFacilities.length === 0) {
      darkToast.error('Please select at least one facility to enrich');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      darkToast.success(`${selectedFacilities.length} facilities enriched successfully`);
      
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
      darkToast.error('Please enrich at least one facility before continuing');
      return;
    }
    
    // Navigate to the facility AI analysis page
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
    const matchesSearch = facilitySearchTerm 
      ? facility.name.toLowerCase().includes(facilitySearchTerm.toLowerCase()) || 
        facility.company.toLowerCase().includes(facilitySearchTerm.toLowerCase())
      : true;
    
    // Facility type matching (mocked for demonstration)
    const matchesFacilityType = facilityTypeFilter === '' || 
      (facility.id % facilityTypes.length === facilityTypes.indexOf(facilityTypeFilter) % facilityTypes.length);
    
    // Standard filters
    const matchesVerified = !showVerifiedOnly || facility.verified;
    const matchesLocation = locationFilter === '' || facility.location.includes(locationFilter);
    const matchesIndustry = industryFilter === '' || facility.company.includes(industryFilter);
    
    // Employee count matching (mocked for demonstration)
    const mockEmployeeCountMatcher = () => {
      if (employeeCountFilter === '') return true;
      // Mock logic based on facility ID for demonstration
      const mockEmployeeCount = (facility.id * 10) % 12000;
      switch(employeeCountFilter) {
        case "1-20 employees": return mockEmployeeCount >= 1 && mockEmployeeCount <= 20;
        case "21-50 employees": return mockEmployeeCount >= 21 && mockEmployeeCount <= 50;
        case "51-100 employees": return mockEmployeeCount >= 51 && mockEmployeeCount <= 100;
        case "101-500 employees": return mockEmployeeCount >= 101 && mockEmployeeCount <= 500;
        case "501-1,000 employees": return mockEmployeeCount >= 501 && mockEmployeeCount <= 1000;
        case "1,001-5,000 employees": return mockEmployeeCount >= 1001 && mockEmployeeCount <= 5000;
        case "5,001-10,000 employees": return mockEmployeeCount >= 5001 && mockEmployeeCount <= 10000;
        case "10,000+ employees": return mockEmployeeCount > 10000;
        default: return true;
      }
    };
    
    // Company name matching
    const matchesCompanyName = companyNameFilter === '' || 
      facility.company.toLowerCase().includes(companyNameFilter.toLowerCase());
    
    // Verified email/phone matching
    const matchesVerifiedEmail = !verifiedEmailFilter || facility.emails;
    const matchesVerifiedPhone = !verifiedPhoneFilter || facility.phoneNumbers;
    
    // Combine all filter criteria
    return matchesSearch && 
           matchesFacilityType &&
           matchesVerified && 
           matchesLocation && 
           matchesIndustry &&
           mockEmployeeCountMatcher() &&
           matchesCompanyName &&
           matchesVerifiedEmail &&
           matchesVerifiedPhone &&
           true;
  });

  // Stats card component for the dashboard
  const StatsCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    colorClass,
    borderColor = 'border-white/10',
    description
  }: { 
    title: string; 
    value: string; 
    change?: string;
    icon: React.ReactNode;
    colorClass: string;
    borderColor?: string;
    description?: string;
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
              {description && (
                <p className="text-xs text-orange-400 mt-1 max-w-[220px] leading-tight">{description}</p>
              )}
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

  // Update the state to include total database size info
  const [facilitiesStats, setFacilitiesStats] = useState({
    total: 4130000, // 4.13 million eligible commercial buildings
    filtered: 4130000,
    small: 2750000, // ~66.5% of eligible buildings are small
    medium: 1030000, // ~25% are medium
    large: 350000, // ~8.5% are large
    enriched: 1840000, // ~44.5% have been enriched with solar data
    highPotential: 520000, // ~12.6% have high solar potential
  });
  
  // Add pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 413000, // At 10 items per page
    itemsPerPage: 10
  });

  // Add page navigation functions
  const goToNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1
      }));
    }
  };

  const goToPrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1
      }));
    }
  };

  // Function to format large numbers with K, M, etc.
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  };
  
  // Function to format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Track which filter section is expanded
  const [expandedSection, setExpandedSection] = useState<string | null>('location'); // Default to location expanded

  // Toggle expanded section - only close if same section clicked, don't auto-close on selection
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null); // Close if same section clicked
    } else {
      setExpandedSection(section); // Open new section (can have multiple open if desired)
    }
  };

  // Load saved filters on component mount
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem('facilityFilters');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters) as {[key: string]: string | boolean | string[]};
        setActiveFilters(parsedFilters);
        
        // Apply saved filters to individual filter states
        Object.entries(parsedFilters).forEach(([key, value]) => {
          switch (key) {
            case 'facilitySearch':
              setFacilitySearchTerm(value as string);
              break;
            case 'facilityType':
              setFacilityTypeFilter(value as string);
              break;
            case 'state':
              setStateFilter(value as string);
              break;
            case 'sector':
              setSectorFilter(value as string);
              break;
            case 'squareFootage':
              setSelectedFacilitySizes(value as string[]);
              break;
            case 'jobTitles':
              setSelectedJobTitles(value as string[]);
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
            case 'employeeCount':
              setEmployeeCountFilter(value as string);
              break;
            case 'companyName':
              setCompanyNameFilter(value as string);
              break;
            case 'verifiedEmail':
              setVerifiedEmailFilter(value as boolean);
              break;
            case 'verifiedPhone':
              setVerifiedPhoneFilter(value as boolean);
              break;
          }
        });
      }
    } catch (error) {
      console.error('Error loading saved filters', error);
    }
  }, []);

  const handleSearch = () => {
    // Show loading state
    setIsLoading(true);
    setLoadingText('Initializing search...');
    
    // Simulate API call with longer duration for better loading experience
    setTimeout(() => {
      setIsLoading(false);
      
      // Store current filters to localStorage for persistence
      try {
        localStorage.setItem('facilityFilters', JSON.stringify(activeFilters));
      } catch (error) {
        console.error('Error saving filters to localStorage', error);
      }
      
      // Set a fixed filtered count to show the specific 5.6K facilities
      // This represents Technology companies over 100,000 square feet in the US with above 200 employees
      setFacilitiesStats(prev => ({
        ...prev,
        filtered: 5600
      }));
      
      // Update pagination based on new filtered count
      setPagination(prev => ({
        ...prev,
        currentPage: 1,
        totalPages: Math.ceil(5600 / prev.itemsPerPage)
      }));
      
      // Show the dashboard with results
      setShowDashboard(true);
      
      // Build a description of what's being searched for based on active filters
      darkToast.success("Found 5.6K Technology companies over 100,000 square feet in the US with above 200 employees");
    }, 2800); // Increased from 1000ms to 2800ms for better loading experience
  };

  // In the table, update the arrow button onClick handler to navigate to the specific facility
  // Replace:
  // <button 
  //   onClick={() => navigate(`/facility-enrichment/${facility.id}`)}
  //   className="p-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm"
  // >
  //   <MdArrowForward size={14} />
  // </button>

  // With this component in the JSX where the table is rendered:
  const FacilityActionButton = ({ facilityId }: { facilityId: number }) => {
    return (
      <button 
        onClick={() => navigate(`/facility-enrichment/${facilityId}`)}
        className="p-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:from-orange-600 hover:to-orange-700 transition-all"
      >
        <MdArrowForward size={14} />
      </button>
    );
  };

  // Generate dynamic description based on active filters
  const generateFilterDescription = () => {
    const parts: string[] = [];
    
    // Industry/Sector
    if (sectorFilter) {
      parts.push(`${sectorFilter.toLowerCase()} facilities`);
    } else {
      parts.push('commercial facilities');
    }
    
    // Facility sizes
    if (selectedFacilitySizes.length > 0) {
      if (selectedFacilitySizes.length === 1) {
        parts.push(`with ${selectedFacilitySizes[0].toLowerCase()}`);
      } else {
        // Check if all selected sizes are above 30,000 sq ft
        const hasLargeSizes = selectedFacilitySizes.some(size => 
          size.includes('30,000') || size.includes('50,000') || size.includes('100,000') || 
          size.includes('250,000') || size.includes('500,000') || size.includes('Over 500,000')
        );
        if (hasLargeSizes) {
          parts.push('over 30,000 square feet');
        } else {
          parts.push(`with multiple size ranges`);
        }
      }
    }
    
    // Location
    if (stateFilter) {
      parts.push(`in ${stateFilter}`);
    } else {
      parts.push('across the US');
    }
    
    // Job titles
    if (selectedJobTitles.length > 0) {
      if (selectedJobTitles.length === 1) {
        parts.push(`targeting ${selectedJobTitles[0].toLowerCase()}s`);
      } else {
        parts.push(`targeting ${selectedJobTitles.length} decision maker types`);
      }
    }
    
    // Employee count
    if (employeeCountFilter) {
      if (employeeCountFilter.includes('200')) {
        parts.push('with above 200 employees');
      } else {
        parts.push(`with ${employeeCountFilter.toLowerCase()}`);
      }
    }
    
    return parts.join(' ');
  };

  return (
    <div className="w-full px-4 py-4 bg-[#020305] min-h-screen relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      {/* Toast notifications with dark theme */}
      <Toaster
        toastOptions={{
          style: {
            background: 'rgba(40, 41, 43, 0.9)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
        }}
        position="bottom-right"
      />

      {/* Search Loading Overlay */}
      <SearchLoadingOverlay />

      {/* Main content with single scrollbar */}
      <div className="flex flex-col">
        {/* Header with title and stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-3 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <MdFactory className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Facility Database</h1>
          </div>
          
          {showDashboard && (
            <div className="text-white/70 text-sm flex items-center gap-2">
              <MdInfoOutline className="text-orange-400" />
              <span>Showing <span className="text-orange-400 font-medium">{formatLargeNumber(facilitiesStats.filtered)}</span> of {formatLargeNumber(facilitiesStats.total)} facilities</span>
              
              <button 
                onClick={clearAllFilters}
                className="ml-4 px-3 py-1 text-xs text-orange-400 hover:text-orange-300 bg-orange-500/10 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Main content area */}
        <div className="flex gap-4">
          {/* Collapsible filter sidebar - no separate scrollbar */}
          <div className="w-80 backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/20 overflow-visible">
            <div className="p-3 overflow-visible">
              <h2 className="text-lg font-bold text-white mb-3">Filters</h2>
              
              {/* Active filters display - always visible */}
              {Object.entries(activeFilters).some(([_, value]) => value !== '' && value !== false) && (
                <div className="mb-3 p-2 bg-[rgba(40,41,43,0.6)] rounded-xl border border-orange-500/10">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                      // Get a more meaningful label for the filter
                      const getFilterLabel = (filterKey: string, filterValue: string | boolean | string[]) => {
                        switch (filterKey) {
                          case 'state': return `State: ${filterValue}`;
                          case 'sector': return `Sector: ${filterValue}`;
                          case 'squareFootage': 
                            if (Array.isArray(filterValue)) {
                              return filterValue.length === 1 
                                ? `Size: ${filterValue[0]}` 
                                : `Size: ${filterValue.length} ranges`;
                            }
                            return `Size: ${filterValue}`;
                          case 'jobTitles':
                            if (Array.isArray(filterValue)) {
                              return filterValue.length === 1
                                ? `Job: ${filterValue[0]}`
                                : `Jobs: ${filterValue.length} titles`;
                            }
                            return `Job: ${filterValue}`;
                          case 'energyUsage': return `Energy: ${filterValue}`;
                          case 'employeeCount': return `Employees: ${filterValue}`;
                          case 'companyName': return `Company: ${filterValue}`;
                          case 'verifiedEmail': return 'Verified Email';
                          case 'verifiedPhone': return 'Verified Phone';
                          case 'verified': return 'Fully Verified';
                          default: return `${filterKey}: ${filterValue}`;
                        }
                      };
                      
                      if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) return null;
                      
                      return (
                        <div 
                          key={key}
                          className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs border border-orange-500/30"
                        >
                          <span>{getFilterLabel(key, value)}</span>
                          <button
                            onClick={() => handleFilterChange(key, Array.isArray(value) ? [] : typeof value === 'boolean' ? false : '')}
                            className="ml-1 text-orange-300 hover:text-white transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Collapsible Company Name Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('companyName')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineBusiness className="text-orange-400" />
                    <span className="font-medium">Company Name</span>
                    {companyNameFilter && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'companyName' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'companyName' && (
                  <div className="p-3 bg-white/5 border-t border-white/10">
                    <div className="relative">
                      <input
                        type="text"
                        value={companyNameFilter}
                        onChange={(e) => handleFilterChange('companyName', e.target.value)}
                        placeholder="Filter by company name..."
                        className="w-full py-2 px-3 pl-9 rounded-lg border border-white/20 bg-[#28292b] backdrop-blur-sm text-white placeholder:text-white/50 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                      <MdSearch className="absolute left-3 top-3 text-white/50" />
                      {companyNameFilter && (
                        <button
                          onClick={() => handleFilterChange('companyName', '')}
                          className="absolute right-3 top-3 text-white/50 hover:text-white"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Collapsible Company Size Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('companySize')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdPieChart className="text-orange-400" />
                    <span className="font-medium">Company Size</span>
                    {employeeCountFilter && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'companySize' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'companySize' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <CustomSelect
                      value={employeeCountFilter}
                      onChange={(value) => handleFilterChange('employeeCount', value)}
                      options={[
                        { value: "", label: "All Company Sizes" },
                        ...employeeCountRanges.map(range => ({ value: range, label: range }))
                      ]}
                      placeholder="Select company size..."
                    />
                  </div>
                )}
              </div>
              
              {/* Collapsible Location Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('location')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="text-orange-400" />
                    <span className="font-medium">Location</span>
                    {stateFilter && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'location' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'location' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <CustomSelect
                      value={stateFilter}
                      onChange={(value) => handleFilterChange('state', value)}
                      options={[
                        { value: "", label: "All Locations" },
                        ...usStates.map(state => ({ value: state, label: state }))
                      ]}
                      placeholder="Select state..."
                    />
                  </div>
                )}
              </div>
              
              {/* Collapsible Industry/Sector Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('sector')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdBarChart className="text-orange-400" />
                    <span className="font-medium">Industry Sector</span>
                    {sectorFilter && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'sector' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'sector' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <CustomSelect
                      value={sectorFilter}
                      onChange={(value) => handleFilterChange('sector', value)}
                      options={[
                        { value: "", label: "All Sectors" },
                        ...sectors.map(sector => ({ value: sector, label: sector }))
                      ]}
                      placeholder="Select sector..."
                    />
                  </div>
                )}
              </div>
              
              {/* Collapsible Facility Size Filter - NOW MULTI-SELECT */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('facilitySize')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineRoofing className="text-orange-400" />
                    <span className="font-medium">Facility Size</span>
                    {selectedFacilitySizes.length > 0 && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        {selectedFacilitySizes.length} selected
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'facilitySize' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'facilitySize' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <MultiSelect
                      values={selectedFacilitySizes}
                      onChange={(values) => handleFilterChange('squareFootage', values)}
                      options={squareFootageRanges.map(range => ({ value: range, label: range }))}
                      placeholder="Select facility sizes..."
                    />
                  </div>
                )}
              </div>
              
              {/* NEW: Collapsible Job Title/Decision Maker Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('jobTitles')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineBusiness className="text-orange-400" />
                    <span className="font-medium">Decision Makers</span>
                    {selectedJobTitles.length > 0 && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        {selectedJobTitles.length} selected
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'jobTitles' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'jobTitles' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <MultiSelect
                      values={selectedJobTitles}
                      onChange={(values) => handleFilterChange('jobTitles', values)}
                      options={jobTitles.map(title => ({ value: title, label: title }))}
                      placeholder="Select job titles..."
                    />
                  </div>
                )}
              </div>
              
              {/* Collapsible Energy Usage Filter */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('energyUsage')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineElectricBolt className="text-orange-400" />
                    <span className="font-medium">Energy Usage</span>
                    {energyUsageFilter && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'energyUsage' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'energyUsage' && (
                  <div className="p-3 bg-white/5 border-t border-white/10 overflow-visible">
                    <CustomSelect
                      value={energyUsageFilter}
                      onChange={(value) => handleFilterChange('energyUsage', value)}
                      options={[
                        { value: "", label: "All Energy Usage Levels" },
                        ...energyUsageRanges.map(range => ({ value: range, label: range }))
                      ]}
                      placeholder="Select energy usage..."
                    />
                  </div>
                )}
              </div>
              
              {/* Collapsible Verification Filters */}
              <div className="mb-2 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-visible">
                <button 
                  onClick={() => toggleSection('verification')}
                  className="w-full p-3 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MdCheck className="text-orange-400" />
                    <span className="font-medium">Verification</span>
                    {(verifiedEmailFilter || verifiedPhoneFilter || showVerifiedOnly) && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'verification' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === 'verification' && (
                  <div className="p-3 bg-white/5 border-t border-white/10">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={verifiedEmailFilter}
                          onChange={() => handleFilterChange('verifiedEmail', !verifiedEmailFilter)}
                          className="rounded border-orange-300 text-orange-500 focus:ring-orange-500 h-4 w-4 bg-white/10" 
                        />
                        <span className="text-sm text-white/80">
                          Verified Email
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={verifiedPhoneFilter}
                          onChange={() => handleFilterChange('verifiedPhone', !verifiedPhoneFilter)}
                          className="rounded border-orange-300 text-orange-500 focus:ring-orange-500 h-4 w-4 bg-white/10" 
                        />
                        <span className="text-sm text-white/80">
                          Verified Phone Number
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={showVerifiedOnly}
                          onChange={() => handleFilterChange('verified', !showVerifiedOnly)}
                          className="rounded border-orange-300 text-orange-500 focus:ring-orange-500 h-4 w-4 bg-white/10" 
                        />
                        <span className="text-sm text-white/80">
                          Full Contact Verification
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {!showDashboard ? (
              // Welcome message and search button
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/20 border border-orange-500/20">
                      <MdFactory className="text-6xl text-orange-400" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 border border-blue-500/20">
                      <MdStorage className="text-3xl text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Discover Commercial Solar Opportunities
                  </h2>
                  <p className="text-xl text-white/80 mb-8">
                    Our database contains over {formatLargeNumber(facilitiesStats.total)} commercial facilities across the United States. 
                    Use our advanced filters to find the perfect solar installation opportunities.
                  </p>
                  <div className="flex flex-col gap-2 items-center">
                    {Object.keys(activeFilters).length > 0 && (
                      <div className="bg-white/10 p-3 rounded-lg mb-2 w-full max-w-md">
                        <p className="text-white/70 text-sm mb-2">Searching with these filters:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(activeFilters).map(([key, value]) => (
                            <div key={key} className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full text-xs">
                              {key}: {value.toString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-all text-lg shadow-md hover:shadow-lg inline-flex items-center gap-2 group border border-white/20"
                    >
                      <MdSearch className="text-xl" />
                      Search Facilities
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Compact stats cards in a single row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatsCard
                    title="Total Facilities"
                    value={formatLargeNumber(facilitiesStats.filtered)}
                    description={
                      facilitiesStats.filtered !== facilitiesStats.total 
                        ? "Decision makers of manufacturing facilities over 30,000 square foot in Detroit, MI"
                        : undefined
                    }
                    change={facilitiesStats.filtered !== facilitiesStats.total ? `${((facilitiesStats.filtered / facilitiesStats.total) * 100).toFixed(1)}% of database` : "+2.5% this month"}
                    icon={<MdFactory className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600"
                  />
                  
                  <StatsCard
                    title="High Potential Facilities"
                    value={formatLargeNumber(Math.round(facilitiesStats.filtered * (facilitiesStats.highPotential / facilitiesStats.total)))}
                    change="+3.1% this month"
                    icon={<MdSolarPower className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"
                  />
                  
                  <StatsCard
                    title="Enriched Facilities"
                    value={formatLargeNumber(Math.round(facilitiesStats.filtered * (facilitiesStats.enriched / facilitiesStats.total)))}
                    change="+5.2% this month"
                    icon={<MdCheck className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-green-500 via-green-600 to-teal-600"
                  />
                </div>
                
                {/* Facilities Table with more compact design */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 relative overflow-hidden">
                  {/* Unique gradient pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-orange-600/25 opacity-25"></div>
                  <div className="absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-orange-500/45 to-transparent rounded-full blur-3xl transform rotate-90"></div>
                  <div className="absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-amber-600/40 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 overflow-x-auto rounded-2xl">
                    <table className="w-full">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="w-10 py-3 px-2">
                            <input 
                              type="checkbox" 
                              className="rounded border-orange-400 text-orange-500 focus:ring-orange-500 h-4 w-4 bg-white/10"
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
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
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
                              <td className="py-2 px-2">
                                <input 
                                  type="checkbox" 
                                  className="rounded border-orange-400 text-orange-500 focus:ring-orange-500 h-4 w-4 bg-white/10"
                                  checked={selectedFacilities.includes(facility.id)}
                                  onChange={() => handleSelectFacility(facility.id)}
                                />
                              </td>
                              <td className="py-2 px-2 text-sm font-medium text-orange-400 hover:text-orange-300 cursor-pointer">{facility.name}</td>
                              <td className="py-2 px-2 text-sm text-white/80">{facility.jobTitle}</td>
                              <td className="py-2 px-2 text-sm text-white/80">{facility.company}</td>
                              <td className="py-2 px-2 text-sm">
                                <div className="flex items-center gap-1">
                                  {facility.emails && <MdEmail className="text-green-400 text-sm" />}
                                  {facility.phoneNumbers && <MdOutlinePhone className="text-green-400 text-sm" />}
                                </div>
                              </td>
                              <td className="py-2 px-2 text-sm text-white/80">{facility.location}</td>
                              <td className="py-2 px-2 text-sm">
                                <FacilityActionButton facilityId={facility.id} />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-5 px-4 text-center text-white/60">
                              <div className="flex flex-col items-center">
                                <MdSearch className="text-3xl text-white/30 mb-2" />
                                <p className="text-sm text-white/80">No facilities found</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination controls */}
                  <div className="p-3 border-t border-white/10 flex justify-between items-center">
                    <div className="text-white/70 text-xs">
                      Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, facilitiesStats.filtered)} of {formatLargeNumber(facilitiesStats.filtered)}
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={goToPrevPage}
                        disabled={pagination.currentPage <= 1}
                        className={`p-1.5 rounded-lg ${pagination.currentPage <= 1 ? 'bg-white/5 text-white/30' : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'} transition-colors`}
                      >
                        <MdArrowBack size={16} />
                      </button>
                      
                      <div className="px-2 py-1 rounded-lg bg-white/10 text-white/80 text-xs flex items-center">
                        {pagination.currentPage} / {formatLargeNumber(pagination.totalPages)}
                      </div>
                      
                      <button 
                        onClick={goToNextPage}
                        disabled={pagination.currentPage >= pagination.totalPages}
                        className={`p-1.5 rounded-lg ${pagination.currentPage >= pagination.totalPages ? 'bg-white/5 text-white/30' : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'} transition-colors`}
                      >
                        <MdArrowForward size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Footer with database info and action button - more compact */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-3 flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-500/20 backdrop-blur-sm p-2 rounded-lg">
                      <MdSolarPower className="text-orange-400 text-base" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Commercial Solar Database</p>
                      <p className="text-white/60 text-xs">{formatLargeNumber(facilitiesStats.total)} facilities across all 50 states</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleContinue}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-all text-sm shadow-md hover:shadow-lg inline-flex items-center gap-2 group border border-white/20"
                  >
                    AI Analysis
                    <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDatabase;
