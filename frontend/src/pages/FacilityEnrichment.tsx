import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdInfo, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdDownload, MdArrowForward, MdSolarPower, MdFactory, MdElectricBolt, MdAttachMoney, MdContentCopy, MdTableChart, MdCheck, MdWarning, MdOutlineWarning, MdSearch, MdInfoOutline, MdClose } from 'react-icons/md';
import { FaSolarPanel, FaMoneyBillWave, FaLeaf, FaChartLine, FaRegLightbulb, FaRegSun, FaRegClock, FaBuilding, FaIndustry, FaWarehouse } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

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
    }),
    
  custom: (component: JSX.Element) => 
    toast.custom(component, {
      position: 'bottom-right',
      duration: 5000,
    })
};

// Add more facility data to make the table more extensive
const enrichedFacilities = [
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
    facilityType: "Automotive Manufacturing",
    facilitySize: 285000, // square feet
    yearBuilt: 2010,
    roofArea: 220000, // square feet
    annualEnergyUsage: 8950000, // kWh
    energyRate: 0.115, // $/kWh
    peakDemand: 1850, // kW
    industryAvg: {
      energyUsage: 31, // kWh per square foot
      solarAdoption: 12, // percentage
      costPerWatt: 2.20, // $
      paybackPeriod: 9.1, // years
    },
    solarPotential: {
      maxCapacity: 2200, // kW
      annualProduction: 2860000, // kWh
      energyCoverage: 32.0, // percentage
      installationCost: 4840000, // $
      netInstallationCost: 3388000, // $ after incentives
      incentives: 1452000, // $
      costWithoutSolar: 1029250, // $ per year
      costWithSolar: 700735, // $ per year
      annualSavings: 328515, // $ per year
      monthlySavings: 27376, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 2029, // tons of CO2 per year
    }
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
    facilityType: "Healthcare Facility",
    facilitySize: 85000, // square feet
    yearBuilt: 2008,
    roofArea: 70000, // square feet
    annualEnergyUsage: 2125000, // kWh
    energyRate: 0.128, // $/kWh
    peakDemand: 450, // kW
    industryAvg: {
      energyUsage: 25, // kWh per square foot
      solarAdoption: 18, // percentage
      costPerWatt: 2.35, // $
      paybackPeriod: 8.4, // years
    },
    solarPotential: {
      maxCapacity: 700, // kW
      annualProduction: 910000, // kWh
      energyCoverage: 42.8, // percentage
      installationCost: 1645000, // $
      netInstallationCost: 1151500, // $ after incentives
      incentives: 493500, // $
      costWithoutSolar: 272000, // $ per year
      costWithSolar: 156544, // $ per year
      annualSavings: 115456, // $ per year
      monthlySavings: 9621, // $ per month
      paybackPeriod: 10.0, // years
      roi: 10.0, // percentage
      carbonOffset: 646, // tons of CO2 per year
    }
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
    facilityType: "Manufacturing Plant",
    facilitySize: 195000, // square feet
    yearBuilt: 2006,
    roofArea: 165000, // square feet
    annualEnergyUsage: 6435000, // kWh
    energyRate: 0.118, // $/kWh
    peakDemand: 1350, // kW
    industryAvg: {
      energyUsage: 33, // kWh per square foot
      solarAdoption: 10, // percentage
      costPerWatt: 2.25, // $
      paybackPeriod: 9.5, // years
    },
    solarPotential: {
      maxCapacity: 1650, // kW
      annualProduction: 2145000, // kWh
      energyCoverage: 33.3, // percentage
      installationCost: 3712500, // $
      netInstallationCost: 2598750, // $ after incentives
      incentives: 1113750, // $
      costWithoutSolar: 759330, // $ per year
      costWithSolar: 506556, // $ per year
      annualSavings: 252774, // $ per year
      monthlySavings: 21064, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 1523, // tons of CO2 per year
    }
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
    facilityType: "Office Building",
    facilitySize: 45000, // square feet
    yearBuilt: 2018,
    roofArea: 38000, // square feet
    annualEnergyUsage: 945000, // kWh
    energyRate: 0.125, // $/kWh
    peakDemand: 210, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 15, // percentage
      costPerWatt: 2.30, // $
      paybackPeriod: 8.2, // years
    },
    solarPotential: {
      maxCapacity: 380, // kW
      annualProduction: 494000, // kWh
      energyCoverage: 52.3, // percentage
      installationCost: 874000, // $
      netInstallationCost: 611800, // $ after incentives
      incentives: 262200, // $
      costWithoutSolar: 118125, // $ per year
      costWithSolar: 56475, // $ per year
      annualSavings: 61650, // $ per year
      monthlySavings: 5138, // $ per month
      paybackPeriod: 9.9, // years
      roi: 10.1, // percentage
      carbonOffset: 351, // tons of CO2 per year
    }
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
    facilityType: "Hospital Complex",
    facilitySize: 650000, // square feet
    yearBuilt: 2005,
    roofArea: 485000, // square feet
    annualEnergyUsage: 19500000, // kWh
    energyRate: 0.132, // $/kWh
    peakDemand: 3850, // kW
    industryAvg: {
      energyUsage: 30, // kWh per square foot
      solarAdoption: 16, // percentage
      costPerWatt: 2.40, // $
      paybackPeriod: 8.8, // years
    },
    solarPotential: {
      maxCapacity: 4850, // kW
      annualProduction: 6305000, // kWh
      energyCoverage: 32.3, // percentage
      installationCost: 11640000, // $
      netInstallationCost: 8148000, // $ after incentives
      incentives: 3492000, // $
      costWithoutSolar: 2574000, // $ per year
      costWithSolar: 1741656, // $ per year
      annualSavings: 832344, // $ per year
      monthlySavings: 69362, // $ per month
      paybackPeriod: 9.8, // years
      roi: 10.2, // percentage
      carbonOffset: 4477, // tons of CO2 per year
    }
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
    facilityType: "Municipal Building",
    facilitySize: 35000, // square feet
    yearBuilt: 2012,
    roofArea: 28000, // square feet
    annualEnergyUsage: 700000, // kWh
    energyRate: 0.122, // $/kWh
    peakDemand: 165, // kW
    industryAvg: {
      energyUsage: 20, // kWh per square foot
      solarAdoption: 22, // percentage
      costPerWatt: 2.25, // $
      paybackPeriod: 7.8, // years
    },
    solarPotential: {
      maxCapacity: 280, // kW
      annualProduction: 364000, // kWh
      energyCoverage: 52.0, // percentage
      installationCost: 630000, // $
      netInstallationCost: 441000, // $ after incentives
      incentives: 189000, // $
      costWithoutSolar: 85400, // $ per year
      costWithSolar: 41008, // $ per year
      annualSavings: 44392, // $ per year
      monthlySavings: 3699, // $ per month
      paybackPeriod: 9.9, // years
      roi: 10.1, // percentage
      carbonOffset: 258, // tons of CO2 per year
    }
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
    facilityType: "Office Complex",
    facilitySize: 125000, // square feet
    yearBuilt: 2014,
    roofArea: 95000, // square feet
    annualEnergyUsage: 2625000, // kWh
    energyRate: 0.119, // $/kWh
    peakDemand: 580, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 17, // percentage
      costPerWatt: 2.28, // $
      paybackPeriod: 8.5, // years
    },
    solarPotential: {
      maxCapacity: 950, // kW
      annualProduction: 1235000, // kWh
      energyCoverage: 47.0, // percentage
      installationCost: 2166000, // $
      netInstallationCost: 1516200, // $ after incentives
      incentives: 649800, // $
      costWithoutSolar: 312375, // $ per year
      costWithSolar: 165558, // $ per year
      annualSavings: 146817, // $ per year
      monthlySavings: 12235, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 877, // tons of CO2 per year
    }
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
    facilityType: "Automotive Manufacturing",
    facilitySize: 485000, // square feet
    yearBuilt: 2003,
    roofArea: 395000, // square feet
    annualEnergyUsage: 16950000, // kWh
    energyRate: 0.114, // $/kWh
    peakDemand: 3650, // kW
    industryAvg: {
      energyUsage: 35, // kWh per square foot
      solarAdoption: 11, // percentage
      costPerWatt: 2.18, // $
      paybackPeriod: 9.2, // years
    },
    solarPotential: {
      maxCapacity: 3950, // kW
      annualProduction: 5135000, // kWh
      energyCoverage: 30.3, // percentage
      installationCost: 8611000, // $
      netInstallationCost: 6027700, // $ after incentives
      incentives: 2583300, // $
      costWithoutSolar: 1932300, // $ per year
      costWithSolar: 1346901, // $ per year
      annualSavings: 585399, // $ per year
      monthlySavings: 48783, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 3646, // tons of CO2 per year
    }
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
    facilityType: "Automotive Manufacturing",
    facilitySize: 420000, // square feet
    yearBuilt: 2007,
    roofArea: 350000, // square feet
    annualEnergyUsage: 14700000, // kWh
    energyRate: 0.114, // $/kWh
    peakDemand: 3150, // kW
    industryAvg: {
      energyUsage: 35, // kWh per square foot
      solarAdoption: 11, // percentage
      costPerWatt: 2.18, // $
      paybackPeriod: 9.2, // years
    },
    solarPotential: {
      maxCapacity: 3500, // kW
      annualProduction: 4550000, // kWh
      energyCoverage: 31.0, // percentage
      installationCost: 7630000, // $
      netInstallationCost: 5341000, // $ after incentives
      incentives: 2289000, // $
      costWithoutSolar: 1675800, // $ per year
      costWithSolar: 1156002, // $ per year
      annualSavings: 519798, // $ per year
      monthlySavings: 43317, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 3231, // tons of CO2 per year
    }
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
    facilityType: "Office Building",
    facilitySize: 180000, // square feet
    yearBuilt: 2011,
    roofArea: 145000, // square feet
    annualEnergyUsage: 3780000, // kWh
    energyRate: 0.126, // $/kWh
    peakDemand: 850, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 14, // percentage
      costPerWatt: 2.32, // $
      paybackPeriod: 8.6, // years
    },
    solarPotential: {
      maxCapacity: 1450, // kW
      annualProduction: 1885000, // kWh
      energyCoverage: 49.9, // percentage
      installationCost: 3364000, // $
      netInstallationCost: 2354800, // $ after incentives
      incentives: 1009200, // $
      costWithoutSolar: 476280, // $ per year
      costWithSolar: 238714, // $ per year
      annualSavings: 237566, // $ per year
      monthlySavings: 19797, // $ per month
      paybackPeriod: 9.9, // years
      roi: 10.1, // percentage
      carbonOffset: 1338, // tons of CO2 per year
    }
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
    facilityType: "Manufacturing Facility",
    facilitySize: 65000, // square feet
    yearBuilt: 2019,
    roofArea: 55000, // square feet
    annualEnergyUsage: 2275000, // kWh
    energyRate: 0.135, // $/kWh
    peakDemand: 520, // kW
    industryAvg: {
      energyUsage: 35, // kWh per square foot
      solarAdoption: 8, // percentage
      costPerWatt: 2.45, // $
      paybackPeriod: 9.8, // years
    },
    solarPotential: {
      maxCapacity: 550, // kW
      annualProduction: 715000, // kWh
      energyCoverage: 31.4, // percentage
      installationCost: 1347500, // $
      netInstallationCost: 943250, // $ after incentives
      incentives: 404250, // $
      costWithoutSolar: 307125, // $ per year
      costWithSolar: 210555, // $ per year
      annualSavings: 96570, // $ per year
      monthlySavings: 8048, // $ per month
      paybackPeriod: 9.8, // years
      roi: 10.2, // percentage
      carbonOffset: 508, // tons of CO2 per year
    }
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
    facilityType: "Office Complex",
    facilitySize: 320000, // square feet
    yearBuilt: 2009,
    roofArea: 265000, // square feet
    annualEnergyUsage: 6720000, // kWh
    energyRate: 0.123, // $/kWh
    peakDemand: 1450, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 16, // percentage
      costPerWatt: 2.29, // $
      paybackPeriod: 8.3, // years
    },
    solarPotential: {
      maxCapacity: 2650, // kW
      annualProduction: 3445000, // kWh
      energyCoverage: 51.3, // percentage
      installationCost: 6068500, // $
      netInstallationCost: 4247950, // $ after incentives
      incentives: 1820550, // $
      costWithoutSolar: 826560, // $ per year
      costWithSolar: 403642, // $ per year
      annualSavings: 422918, // $ per year
      monthlySavings: 35243, // $ per month
      paybackPeriod: 10.0, // years
      roi: 10.0, // percentage
      carbonOffset: 2446, // tons of CO2 per year
    }
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
    facilityType: "Educational Campus",
    facilitySize: 285000, // square feet
    yearBuilt: 2004,
    roofArea: 225000, // square feet
    annualEnergyUsage: 5415000, // kWh
    energyRate: 0.118, // $/kWh
    peakDemand: 1250, // kW
    industryAvg: {
      energyUsage: 19, // kWh per square foot
      solarAdoption: 20, // percentage
      costPerWatt: 2.22, // $
      paybackPeriod: 7.9, // years
    },
    solarPotential: {
      maxCapacity: 2250, // kW
      annualProduction: 2925000, // kWh
      energyCoverage: 54.0, // percentage
      installationCost: 4995000, // $
      netInstallationCost: 3496500, // $ after incentives
      incentives: 1498500, // $
      costWithoutSolar: 638970, // $ per year
      costWithSolar: 293851, // $ per year
      annualSavings: 345119, // $ per year
      monthlySavings: 28760, // $ per month
      paybackPeriod: 10.1, // years
      roi: 9.9, // percentage
      carbonOffset: 2077, // tons of CO2 per year
    }
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
    facilityType: "Municipal Complex",
    facilitySize: 95000, // square feet
    yearBuilt: 2010,
    roofArea: 78000, // square feet
    annualEnergyUsage: 1900000, // kWh
    energyRate: 0.121, // $/kWh
    peakDemand: 420, // kW
    industryAvg: {
      energyUsage: 20, // kWh per square foot
      solarAdoption: 23, // percentage
      costPerWatt: 2.24, // $
      paybackPeriod: 7.7, // years
    },
    solarPotential: {
      maxCapacity: 780, // kW
      annualProduction: 1014000, // kWh
      energyCoverage: 53.4, // percentage
      installationCost: 1747200, // $
      netInstallationCost: 1223040, // $ after incentives
      incentives: 524160, // $
      costWithoutSolar: 229900, // $ per year
      costWithSolar: 107134, // $ per year
      annualSavings: 122766, // $ per year
      monthlySavings: 10231, // $ per month
      paybackPeriod: 10.0, // years
      roi: 10.0, // percentage
      carbonOffset: 720, // tons of CO2 per year
    }
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
    facilityType: "Parking & Facilities Services",
    facilitySize: 155000, // square feet
    yearBuilt: 2013,
    roofArea: 125000, // square feet
    annualEnergyUsage: 2635000, // kWh
    energyRate: 0.124, // $/kWh
    peakDemand: 580, // kW
    industryAvg: {
      energyUsage: 17, // kWh per square foot
      solarAdoption: 13, // percentage
      costPerWatt: 2.27, // $
      paybackPeriod: 8.7, // years
    },
    solarPotential: {
      maxCapacity: 1250, // kW
      annualProduction: 1625000, // kWh
      energyCoverage: 61.7, // percentage
      installationCost: 2837500, // $
      netInstallationCost: 1986250, // $ after incentives
      incentives: 851250, // $
      costWithoutSolar: 326740, // $ per year
      costWithSolar: 125267, // $ per year
      annualSavings: 201473, // $ per year
      monthlySavings: 16789, // $ per month
      paybackPeriod: 9.9, // years
      roi: 10.1, // percentage
      carbonOffset: 1154, // tons of CO2 per year
    }
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
    facilityType: "Office Complex",
    facilitySize: 385000, // square feet
    yearBuilt: 2008,
    roofArea: 320000, // square feet
    annualEnergyUsage: 8085000, // kWh
    energyRate: 0.127, // $/kWh
    peakDemand: 1750, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 15, // percentage
      costPerWatt: 2.31, // $
      paybackPeriod: 8.4, // years
    },
    solarPotential: {
      maxCapacity: 3200, // kW
      annualProduction: 4160000, // kWh
      energyCoverage: 51.4, // percentage
      installationCost: 7392000, // $
      netInstallationCost: 5174400, // $ after incentives
      incentives: 2217600, // $
      costWithoutSolar: 1026795, // $ per year
      costWithSolar: 500054, // $ per year
      annualSavings: 526741, // $ per year
      monthlySavings: 43895, // $ per month
      paybackPeriod: 9.8, // years
      roi: 10.2, // percentage
      carbonOffset: 2954, // tons of CO2 per year
    }
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
    facilityType: "Automotive Manufacturing",
    facilitySize: 225000, // square feet
    yearBuilt: 2009,
    roofArea: 185000, // square feet
    annualEnergyUsage: 7875000, // kWh
    energyRate: 0.116, // $/kWh
    peakDemand: 1650, // kW
    industryAvg: {
      energyUsage: 35, // kWh per square foot
      solarAdoption: 12, // percentage
      costPerWatt: 2.19, // $
      paybackPeriod: 9.3, // years
    },
    solarPotential: {
      maxCapacity: 1850, // kW
      annualProduction: 2405000, // kWh
      energyCoverage: 30.5, // percentage
      installationCost: 4051500, // $
      netInstallationCost: 2836050, // $ after incentives
      incentives: 1215450, // $
      costWithoutSolar: 913500, // $ per year
      costWithSolar: 634755, // $ per year
      annualSavings: 278745, // $ per year
      monthlySavings: 23229, // $ per month
      paybackPeriod: 10.2, // years
      roi: 9.8, // percentage
      carbonOffset: 1708, // tons of CO2 per year
    }
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
    facilityType: "Automotive Manufacturing",
    facilitySize: 585000, // square feet
    yearBuilt: 2002,
    roofArea: 465000, // square feet
    annualEnergyUsage: 20475000, // kWh
    energyRate: 0.113, // $/kWh
    peakDemand: 4250, // kW
    industryAvg: {
      energyUsage: 35, // kWh per square foot
      solarAdoption: 13, // percentage
      costPerWatt: 2.16, // $
      paybackPeriod: 8.9, // years
    },
    solarPotential: {
      maxCapacity: 4650, // kW
      annualProduction: 6045000, // kWh
      energyCoverage: 29.5, // percentage
      installationCost: 10044000, // $
      netInstallationCost: 7030800, // $ after incentives
      incentives: 3013200, // $
      costWithoutSolar: 2313675, // $ per year
      costWithSolar: 1630255, // $ per year
      annualSavings: 683420, // $ per year
      monthlySavings: 56952, // $ per month
      paybackPeriod: 10.3, // years
      roi: 9.7, // percentage
      carbonOffset: 4292, // tons of CO2 per year
    }
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
    facilityType: "Healthcare Facility",
    facilitySize: 185000, // square feet
    yearBuilt: 2011,
    roofArea: 155000, // square feet
    annualEnergyUsage: 4625000, // kWh
    energyRate: 0.129, // $/kWh
    peakDemand: 980, // kW
    industryAvg: {
      energyUsage: 25, // kWh per square foot
      solarAdoption: 17, // percentage
      costPerWatt: 2.36, // $
      paybackPeriod: 8.5, // years
    },
    solarPotential: {
      maxCapacity: 1550, // kW
      annualProduction: 2015000, // kWh
      energyCoverage: 43.6, // percentage
      installationCost: 3658000, // $
      netInstallationCost: 2560600, // $ after incentives
      incentives: 1097400, // $
      costWithoutSolar: 596625, // $ per year
      costWithSolar: 336547, // $ per year
      annualSavings: 260078, // $ per year
      monthlySavings: 21673, // $ per month
      paybackPeriod: 9.8, // years
      roi: 10.2, // percentage
      carbonOffset: 1431, // tons of CO2 per year
    }
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
    facilityType: "Office Complex",
    facilitySize: 295000, // square feet
    yearBuilt: 2015,
    roofArea: 245000, // square feet
    annualEnergyUsage: 6195000, // kWh
    energyRate: 0.125, // $/kWh
    peakDemand: 1350, // kW
    industryAvg: {
      energyUsage: 21, // kWh per square foot
      solarAdoption: 15, // percentage
      costPerWatt: 2.30, // $
      paybackPeriod: 8.4, // years
    },
    solarPotential: {
      maxCapacity: 2450, // kW
      annualProduction: 3185000, // kWh
      energyCoverage: 51.4, // percentage
      installationCost: 5635000, // $
      netInstallationCost: 3944500, // $ after incentives
      incentives: 1690500, // $
      costWithoutSolar: 774375, // $ per year
      costWithSolar: 376463, // $ per year
      annualSavings: 397912, // $ per year
      monthlySavings: 33159, // $ per month
      paybackPeriod: 9.9, // years
      roi: 10.1, // percentage
      carbonOffset: 2261, // tons of CO2 per year
    }
  }
];

// Searchable facility that's not in the initial list (hidden in database)
const luxwallFacility = {
  id: 15,
  name: "James Schifko",
  jobTitle: "Facilities Manager", 
  company: "Luxwall",
  emails: true,
  phoneNumbers: true,
  location: "1130 James L Hart Pkwy, Ypsilanti, MI",
  enriched: true,
  verified: true,
  email: "j.schifko@luxwall.com",
  phone: "(734) 555-9876",
  facilityType: "Manufacturing Building",
  facilitySize: 8500, // square feet
  yearBuilt: 2019,
  roofArea: 7200, // square feet
  annualEnergyUsage: 14861, // kWh (exactly as provided)
  energyRate: 0.24, // $/kWh (to get close to $300/month)
  peakDemand: 35, // kW
  industryAvg: {
    energyUsage: 18, // kWh per square foot
    solarAdoption: 12, // percentage
    costPerWatt: 4.00, // $ (as provided)
    paybackPeriod: 11.0, // years (as provided)
  },
  solarPotential: {
    maxCapacity: 10.5, // kW (exactly as provided)
    annualProduction: 13500, // kWh (realistic for 10.5kW system)
    energyCoverage: 90.8, // percentage (13500/14861 * 100)
    installationCost: 42000, // $ (exactly as provided)
    netInstallationCost: 29400, // $ after 30% federal tax credit
    incentives: 12600, // $ (30% of $42,000)
    costWithoutSolar: 3566, // $ per year (14,861.4 kWh * $0.24)
    costWithSolar: 1200, // $ per year (remaining energy + system costs)
    annualSavings: 2366, // $ per year (realistic based on small system)
    monthlySavings: 197, // $ per month
    paybackPeriod: 12.4, // years (more realistic given the small savings)
    roi: 8.1, // percentage
    carbonOffset: 9.6, // tons of CO2 per year (13,500 kWh * 0.0007 tons/kWh)
  }
};

const FacilityEnrichment = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnriching, setIsEnriching] = useState(true);
  const [facility, setFacility] = useState<any>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<any[]>([]);
  const [showEnriched, setShowEnriched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVisualizationToast, setShowVisualizationToast] = useState(false);
  const [selectedFacilityForModal, setSelectedFacilityForModal] = useState<any>(null);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Total facilities in the database (showing a much larger number)
  const totalFacilitiesInDatabase = 5648;
  
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
          
          // Log that we found the specific facility
          console.log(`Loaded facility data for ${foundFacility.name}`);
        } else {
          // If facility not found, show all facilities
          setSelectedFacilities(enrichedFacilities);
          if (enrichedFacilities.length > 0) {
            setFacility(enrichedFacilities[0]);
          }
          console.log(`Facility ID ${facilityId} not found, showing all facilities`);
        }
      } else {
        // If no facilityId is provided, show all facilities
        setSelectedFacilities(enrichedFacilities);
        if (enrichedFacilities.length > 0) {
          setFacility(enrichedFacilities[0]);
        }
        console.log('No facility ID provided, showing all facilities');
      }
      setIsLoading(false);
      
      // Simulate data enrichment processing
      setTimeout(() => {
        setIsEnriching(false);
      }, 3000);
    }, 1500);
  }, [facilityId]);

  // Function to simulate searching the database
  const performSearch = async (query: string) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = [];
    
    // Check if search matches Luxwall facility
    const searchLower = query.toLowerCase();
    if (
      searchLower.includes('james') ||
      searchLower.includes('schifko') ||
      searchLower.includes('1130') ||
      searchLower.includes('hart') ||
      searchLower.includes('pkwy') ||
      searchLower.includes('luxwall') ||
      searchLower.includes('ypsilanti')
    ) {
      results.push(luxwallFacility);
    }
    
    // Also search through existing facilities
    const existingMatches = enrichedFacilities.filter(f => 
      f.name.toLowerCase().includes(searchLower) || 
      f.company.toLowerCase().includes(searchLower) ||
      f.location.toLowerCase().includes(searchLower) ||
      f.facilityType.toLowerCase().includes(searchLower) ||
      f.email.toLowerCase().includes(searchLower)
    );
    
    results.push(...existingMatches);
    
    setSearchResults(results);
    setSelectedFacilities(results.length > 0 ? results : enrichedFacilities);
    setIsSearching(false);
    
    if (results.length > 0 && results.find(r => r.company === 'Luxwall')) {
      darkToast.success(`Found facility: ${luxwallFacility.name} at ${luxwallFacility.company}`);
    } else if (results.length > 0) {
      darkToast.success(`Found ${results.length} matching facilities`);
    } else {
      darkToast.error('No facilities found matching your search');
    }
  };

  // Handle search input with enter key
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSelectedFacilities(enrichedFacilities);
    setIsSearching(false);
  };

  const handleDownloadReport = () => {
    darkToast.success('Enriched facility data exported successfully');
  };
  
  const handleContinueToEnergyUsage = () => {
    navigate('/energy-usage-estimation');
  };

  const handleAIAnalysis = () => {
    // Navigate directly to energy usage page with fresh full table view (no modals)
    navigate('/energy-usage-estimation');
  };

  const handleViewSingleFacility = (facilityId: number) => {
    // Navigate to energy usage page with specific facility
    navigate(`/energy-usage-estimation?facilityId=${facilityId}`);
  };

  // Handle toggle enriched data with popup
  const handleToggleEnriched = () => {
    if (!showEnriched) {
      // Show loading animation when turning on enriched data
      setShowLoadingAnimation(true);
      
      // After a delay, hide the animation and show the enriched data
      setTimeout(() => {
        setShowLoadingAnimation(false);
        
        // Add a small delay before showing the enriched data for a smoother transition
        setTimeout(() => {
          setShowEnriched(true);
          
          darkToast.custom(
            <div className="flex items-start p-4 rounded-lg backdrop-blur-xl bg-[#28292b]/90 border border-orange-500/20 shadow-lg">
              <div className="text-orange-500 mr-2 mt-0.5">
                <MdInfoOutline size={20} />
              </div>
              <div>
                <p className="font-medium text-white">See Visualizations</p>
                <p className="text-sm text-white/70">
                  Click the <span className="font-bold text-orange-500">View</span> button to see detailed visualizations and interact with facility data.
                </p>
              </div>
            </div>
          );
        }, 300);
      }, 3500); // Show animation for 3.5 seconds
    } else {
      setShowEnriched(false);
    }
  };

  // Fix the modal showModal calls with null checks
  const showModal = (modalId: string) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement && 'showModal' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with showModal
      modalElement.showModal();
    }
  };
  
  // Handle view button click to show modal first, then navigate
  const handleViewFacility = (facilityId: number) => {
    const facilityToView = enrichedFacilities.find(f => f.id === facilityId);
    setSelectedFacilityForModal(facilityToView);
    const modalElement = document.getElementById('visualization-modal');
    if (modalElement && 'showModal' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with showModal
      modalElement.showModal();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('visualization-modal');
    if (modalElement && 'close' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with close
      modalElement.close();
    }
  };
  
  const goToEnergyUsageEstimation = () => {
    closeModal();
    if (selectedFacilityForModal) {
      navigate(`/energy-usage-estimation?facilityId=${selectedFacilityForModal.id}`);
    } else {
      navigate('/energy-usage-estimation');
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

      {/* Loading Animation Modal */}
      {showLoadingAnimation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="relative bg-[#1e222b]/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-xl max-w-3xl w-full mx-4 animate-fadeIn">
            {/* Animated gradient background for the modal */}
            <div className="absolute inset-0 opacity-30 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowLoadingAnimation(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all rounded-full p-1"
              >
                <MdClose size={20} />
              </button>
            </div>
            
            <div className="p-8 relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Analyzing Solar Panel Detection</h3>
              <p className="text-white/70 mb-6">Processing facility rooftops for optimal solar panel placement...</p>
              
              {/* GIF container with enhanced styling */}
              <div className="rounded-xl overflow-hidden border border-white/20 shadow-xl mb-6 transition-all duration-500 hover:shadow-orange-500/20">
                <img 
                  src="/images/solar/lq6qgs6wvqjt-1gPwk6hDo0cByUhr2UGEnr-2726648427c6cb529a6d0330b0c30945-detected_arrays.gif" 
                  alt="Solar Panel Detection" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Progress indicators */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Analyzing roof structure</span>
                    <span>Complete</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Detecting optimal panel placement</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Calculating energy production potential</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-2/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-3 text-white/70">
                <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping"></div>
                <p className="text-sm">Please wait while we process the data...</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{totalFacilitiesInDatabase.toLocaleString()}</h3>
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
                          110,000 sqft
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
                        placeholder="Search facilities... (Press Enter to search)"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                      />
                      <div className="absolute right-3 top-2.5 flex items-center gap-2">
                        {isSearching ? (
                          <div className="loading loading-spinner loading-sm text-orange-500"></div>
                        ) : searchTerm ? (
                          <button 
                            onClick={handleClearSearch}
                            className="text-white/50 hover:text-white transition-colors"
                            type="button"
                          >
                            <MdClose size={16} />
                          </button>
                        ) : (
                          <MdSearch size={20} className="text-white/50" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`${
                          showEnriched 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20' 
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        } backdrop-blur-md rounded-full px-4 py-2 transition-all duration-500 text-sm font-medium border border-white/10 flex items-center gap-2`}
                        onClick={handleToggleEnriched}
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
                {/* Search Status */}
                {searchResults.length > 0 && (
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MdSearch className="text-orange-500" />
                        <span className="text-white">Search Results: {searchResults.length} facilities found</span>
                      </div>
                      <button 
                        onClick={handleClearSearch}
                        className="text-white/70 hover:text-white text-sm underline"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
                )}
                
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
                                    onClick={() => handleViewFacility(facility.id)}
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
                  {searchResults.length > 0 ? (
                    <>
                      Showing <span className="text-white">{searchResults.length}</span> search results from <span className="text-white">{totalFacilitiesInDatabase.toLocaleString()}</span> total facilities
                    </>
                  ) : (
                    <>
                      Showing <span className="text-white">1-{selectedFacilities.length}</span> of <span className="text-white">{totalFacilitiesInDatabase.toLocaleString()}</span> facilities
                    </>
                  )}
                </div>
                <div className="flex gap-1">
                  <button className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all">Previous</button>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-md hover:from-orange-600 hover:to-orange-700 transition-all">1</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">2</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">3</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">...</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">385</button>
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
                      {['Technology', 'Office Building', 'Manufacturing Plant', 'Manufacturing Building', 'Warehouse', 'Data Center'].map(type => {
                        // Custom percentages for each type
                        const typePercentages = {
                          'Technology': 35,
                          'Office Building': 25,
                          'Manufacturing Plant': 18,
                          'Manufacturing Building': 2,
                          'Warehouse': 15,
                          'Data Center': 5
                        };
                        
                        // Count of facilities with this type (or use custom percentages if not enough data)
                        const count = selectedFacilities.filter(f => f.facilityType === type).length;
                        const percentage = count ? (count / selectedFacilities.length) * 100 : typePercentages[type as keyof typeof typePercentages];
                        
                        return (
                          <div key={type}>
                            <div className="flex justify-between mb-1">
                              <span className="text-white">{type}</span>
                              <span className="text-white">{count || Math.round(percentage / 100 * selectedFacilities.length)} ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200/20 rounded-full h-2.5">
                              <div className={`bg-gradient-to-r ${type === 'Technology' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-amber-600'} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
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

              {/* Continue button - changed to AI Analysis */}
              <div className="flex justify-center mt-8 mb-12">
                <button 
                  onClick={handleAIAnalysis}
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
                  
                  <span className="relative z-10 text-lg">AI Analysis - Full Table View</span>
                  <MdArrowForward className="relative z-10 text-2xl group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Visualization Modal */}
      <dialog id="visualization-modal" className="modal bg-transparent backdrop-blur-sm">
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/90 via-[#28292b]/80 to-[rgba(40,41,43,0.7)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-6 max-w-2xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Solar Potential Visualization</h3>
            <button 
              onClick={closeModal}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all rounded-full p-1.5"
            >
              <MdClose size={18} />
            </button>
          </div>
          
          {selectedFacilityForModal && (
            <div className="space-y-4 relative z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-2">{selectedFacilityForModal.name}</h4>
                    <p className="text-white/70 text-sm mb-1">{selectedFacilityForModal.company}</p>
                    <p className="text-white/70 text-sm mb-3">
                      <span className="inline-flex items-center gap-1">
                        <MdLocationOn className="text-orange-500" size={14} />
                        {selectedFacilityForModal.location}
                      </span>
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <p className="text-xs text-white/50">Facility Type</p>
                        <p className="text-sm text-white">{selectedFacilityForModal.facilityType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Facility Size</p>
                        <p className="text-sm text-white">{(selectedFacilityForModal.facilitySize/1000).toFixed(0)}K sqft</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Energy Usage</p>
                        <p className="text-sm text-white">{(selectedFacilityForModal.annualEnergyUsage/1000000).toFixed(2)}M kWh</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Solar Potential</p>
                        <p className="text-sm text-white">{selectedFacilityForModal.solarPotential.maxCapacity} kW</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white/5 p-4 rounded-xl h-full flex flex-col border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-2">Available Visualizations</h4>
                    <ul className="space-y-2 text-white/70 text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-orange-500">•</div>
                        <span>Energy Usage Breakdown: Visualize how energy is consumed across different facility systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-orange-500">•</div>
                        <span>Solar ROI Analysis: Interactive graph showing cost savings over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-orange-500">•</div>
                        <span>Carbon Offset Metrics: Environmental impact visualization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-orange-500">•</div>
                        <span>Installation Cost Breakdown: Detailed cost analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-4 rounded-xl border border-orange-500/30">
                <div className="flex items-start gap-3">
                  <div className="text-orange-500 mt-1">
                    <MdInfoOutline size={24} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Interactive Visualization Experience</p>
                    <p className="text-white/70 text-sm mt-1">
                      Continue to the Energy Usage Estimation page to interact with detailed visualizations and perform custom analyses.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button 
                  onClick={goToEnergyUsageEstimation}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <span>View Visualizations</span>
                  <MdArrowForward />
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default FacilityEnrichment; 