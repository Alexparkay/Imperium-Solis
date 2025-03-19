import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdInfo, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdDownload, MdArrowForward } from 'react-icons/md';
import { FaSolarPanel, FaMoneyBillWave, FaLeaf, FaChartLine } from 'react-icons/fa';
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
              onClick={() => navigate('/facility-data-scraper')}
              className="btn btn-circle btn-ghost"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold">Solar Potential Analysis</h1>
          </div>
          <button 
            onClick={handleDownloadReport}
            className="btn btn-primary flex items-center gap-2"
          >
            <MdDownload size={20} />
            Download Report
          </button>
        </div>

        {/* Facility Info */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-xl">{facility.name}</h2>
                <p className="text-gray-500">{facility.jobTitle} at {facility.company}</p>
                <div className="flex items-center gap-1 mt-2">
                  <MdLocationOn className="text-primary" />
                  <span>{facility.location}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <MdOutlineEmail className="text-primary" size={16} />
                  <span>{facility.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlinePhone className="text-primary" size={16} />
                  <span>{facility.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body flex flex-col items-center justify-center py-16">
              <div className="loading loading-spinner loading-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Analyzing Solar Potential</h3>
              <p className="text-gray-500 mt-2">
                Our AI is analyzing satellite imagery, energy usage patterns, and local solar conditions...
              </p>
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between mb-2">
                  <span>Analyzing roof area</span>
                  <span>100%</span>
                </div>
                <progress className="progress progress-primary w-full" value="100" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Calculating solar exposure</span>
                  <span>85%</span>
                </div>
                <progress className="progress progress-primary w-full" value="85" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Estimating energy production</span>
                  <span>60%</span>
                </div>
                <progress className="progress progress-primary w-full" value="60" max="100"></progress>
                
                <div className="flex justify-between mb-2 mt-4">
                  <span>Calculating financial benefits</span>
                  <span>30%</span>
                </div>
                <progress className="progress progress-primary w-full" value="30" max="100"></progress>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Solar Analysis Header */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl flex items-center gap-2">
                  <div className="text-primary">
                    <FaSolarPanel size={24} />
                  </div>
                  Solar Potential Analysis
                </h2>
                <p className="text-gray-600">
                  Based on our AI analysis, this facility has excellent solar potential. Here's a breakdown of the potential benefits:
                </p>
              </div>
            </div>

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
                      <span className="text-gray-600">Yearly Cost:</span>
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
                    <FaLeaf className="text-green-600" />
                    Energy Production
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yearly Energy:</span>
                      <span className="font-semibold">{solarData.yearlyEnergy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Covered:</span>
                      <span className="font-semibold">{solarData.energyCovered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Rate:</span>
                      <span className="font-semibold">{solarData.energyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Bill:</span>
                      <span className="font-semibold">{solarData.monthlyBill}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaChartLine className="text-blue-600" />
                    Long-term Analysis
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">10 Year Total:</span>
                      <span className="font-semibold">{solarData.tenYearTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost Without Solar:</span>
                      <span className="font-semibold">{solarData.costWithoutSolar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost With Solar:</span>
                      <span className="font-semibold">{solarData.costWithSolar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Break Even:</span>
                      <span className="font-semibold">{solarData.breakEven}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <MdLocationOn className="text-primary" />
                  Location Details
                </h3>
                <div className="mt-4">
                  <p className="text-gray-600">Address: {solarData.address}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600">State</span>
                      <span className="font-semibold">{solarData.state}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Zip Code</span>
                      <span className="font-semibold">{solarData.zipCode}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Energy Rate</span>
                      <span className="font-semibold">{solarData.energyRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="card-title text-lg">Our Recommendation</h3>
                <p>
                  Based on our analysis, we highly recommend implementing solar energy solutions at this facility. 
                  With an energy coverage of {solarData.energyCovered} and potential for significant long-term savings, 
                  this facility is an excellent candidate for solar installation.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm">Contact Facility Manager</button>
                  <button className="btn btn-sm">Generate Proposal</button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4 mb-2">
              <p>
                Note: Only 5% of similar facilities have adopted solar technology. 
                Be among the first to implement sustainable energy solutions.
              </p>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleContinueToEnergyUsage}
                className="btn btn-primary btn-lg flex items-center gap-2"
              >
                View Detailed Energy Usage Estimation
                <MdArrowForward size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityAIAnalysis; 