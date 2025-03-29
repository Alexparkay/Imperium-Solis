// import React from 'react';
import { useState } from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import { useQuery } from '@tanstack/react-query';
import {
  MdFactory,
  MdSolarPower,
  MdElectricBolt,
  MdAttachMoney,
  MdLocationOn,
  MdBarChart,
  MdOutlineRoofing,
  MdOutlineWbSunny,
  MdOutlineEmail,
  MdOutlineTrackChanges,
  MdArrowForward,
  MdArrowOutward,
  MdOutlineSettings,
  MdPieChart,
  MdInsights,
  MdOutlineAnalytics,
  MdOutlineLightbulb,
  MdOutlineEnergySavingsLeaf,
  MdCheck,
  MdChevronRight,
  MdOutlineArrowUpward,
  MdTrendingUp
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Mock data for Imperum Solis dashboard
const dashboardData = {
  facilitiesScraped: {
    total: 124,
    enriched: 98,
    percentage: 79,
    chartData: [
      { name: "Jan", value: 45 },
      { name: "Feb", value: 55 },
      { name: "Mar", value: 65 },
      { name: "Apr", value: 75 },
      { name: "May", value: 85 },
      { name: "Jun", value: 95 },
      { name: "Jul", value: 110 },
      { name: "Aug", value: 124 }
    ]
  },
  facilitiesAnalyzed: {
    total: 98,
    percentage: 79,
    chartData: [
      { name: "Jan", value: 35 },
      { name: "Feb", value: 42 },
      { name: "Mar", value: 50 },
      { name: "Apr", value: 58 },
      { name: "May", value: 67 },
      { name: "Jun", value: 78 },
      { name: "Jul", value: 88 },
      { name: "Aug", value: 98 }
    ]
  },
  energyEstimations: {
    total: 98,
    averageUsage: "3,250,000 kWh",
    averageCost: "$390,000",
    chartData: [
      { name: "Jan", value: 2800000 },
      { name: "Feb", value: 2900000 },
      { name: "Mar", value: 3100000 },
      { name: "Apr", value: 3300000 },
      { name: "May", value: 3500000 },
      { name: "Jun", value: 3700000 },
      { name: "Jul", value: 3600000 },
      { name: "Aug", value: 3400000 }
    ]
  },
  solarPotential: {
    facilitiesCalculated: 92,
    averageROI: "185%",
    averagePayback: "7.8 years",
    totalSavings: "$18.5M",
    chartData: [
      { name: "Jan", value: 150 },
      { name: "Feb", value: 160 },
      { name: "Mar", value: 170 },
      { name: "Apr", value: 180 },
      { name: "May", value: 190 },
      { name: "Jun", value: 200 },
      { name: "Jul", value: 190 },
      { name: "Aug", value: 185 }
    ]
  },
  emailCampaigns: {
    emailsSent: 85,
    emailsOpened: 62,
    openRate: 73,
    repliedRate: 42,
    interestedRate: 28,
    chartData: [
      { name: "Sent", value: 85 },
      { name: "Opened", value: 62 },
      { name: "Replied", value: 36 },
      { name: "Interested", value: 24 }
    ]
  },
  topFacilities: [
    {
      id: 1,
      name: "Apple Distribution Center",
      location: "Atlanta, GA",
      savings: "$273,000",
      roi: "205.3%",
      status: "Interested"
    },
    {
      id: 2,
      name: "Tesla Gigafactory",
      location: "Reno, NV",
      savings: "$1,250,000",
      roi: "245.8%",
      status: "Email Sent"
    },
    {
      id: 3,
      name: "Amazon Fulfillment Center",
      location: "Dallas, TX",
      savings: "$425,000",
      roi: "198.2%",
      status: "Follow-up Scheduled"
    },
    {
      id: 4,
      name: "Honeywell Manufacturing Plant",
      location: "Kansas City, MO",
      savings: "$166,320",
      roi: "156.2%",
      status: "Email Opened"
    },
    {
      id: 5,
      name: "Walmart Distribution Center",
      location: "Chicago, IL",
      savings: "$580,000",
      roi: "212.5%",
      status: "Not Contacted"
    }
  ]
};

const Home = () => {
  const navigate = useNavigate();

  const FeatureCard = ({ 
    icon, 
    title, 
    description,
    bgColor = 'bg-white dark:bg-slate-800'
  }: { 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    bgColor?: string;
  }) => {
    return (
      <div className={`${bgColor} rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden group border border-slate-100 dark:border-slate-700`}>
        {/* Decorative corner shape */}
        <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-amber-500/10"></div>
        
        <div className="relative z-10">
          <div className="rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 p-4 mb-5 text-white shadow-sm inline-flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{description}</p>
          
          <div className="flex items-center mt-2 group-hover:translate-x-1 transition-transform duration-300">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
              <MdChevronRight className="text-white text-sm" />
            </div>
            <span className="text-amber-500 text-sm font-medium">Learn more</span>
          </div>
        </div>
      </div>
    );
  };

  const StatsCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    colorClass,
    borderColor = 'border-amber-500' 
  }: { 
    title: string; 
    value: string; 
    change?: string;
    icon: React.ReactNode;
    colorClass: string;
    borderColor?: string;
  }) => {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border ${borderColor} hover:-translate-y-1 relative overflow-hidden group`}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-transparent dark:from-slate-700/20 rounded-2xl pointer-events-none"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
            {change && (
              <div className="flex items-center text-xs font-medium text-emerald-500 mt-2">
                <MdTrendingUp className="mr-1" /> {change}
              </div>
            )}
          </div>
          <div className={`rounded-2xl p-3 ${colorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  const WorkflowCard = ({ 
    number, 
    title, 
    description, 
    icon, 
    route, 
    stats,
    chartData,
    chartType = 'bar' // 'bar', 'progress', 'metric', 'sparkline'
  }: { 
    number: number; 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    route: string;
    stats: React.ReactNode;
    chartData: { name: string; value: number }[];
    chartType?: 'bar' | 'progress' | 'metric' | 'sparkline';
  }) => {
    const renderChart = () => {
      switch (chartType) {
        case 'progress':
          const total = chartData.reduce((sum, item) => sum + item.value, 0);
          return (
            <div className="space-y-3">
              {chartData.map((item, index) => {
                const percentage = (item.value / total) * 100;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
                      <span className="text-sm font-medium text-slate-800 dark:text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );

        case 'metric':
          const currentValue = chartData[0].value;
          const previousValue = chartData[1].value;
          const change = ((currentValue - previousValue) / previousValue) * 100;
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                {currentValue.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-sm ${
                  change >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">vs last period</span>
              </div>
            </div>
          );

        case 'sparkline':
          const maxValue = Math.max(...chartData.map(d => d.value));
          return (
            <div className="relative h-16">
              <div className="absolute inset-0 flex items-end">
                {chartData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full transition-all duration-300 group-hover:from-amber-400 group-hover:to-amber-200"
                      style={{ 
                        height: `${(item.value / maxValue) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{chartData[0].name}</span>
                <span>{chartData[chartData.length - 1].name}</span>
              </div>
            </div>
          );

        default: // bar
          const barMaxValue = Math.max(...chartData.map(d => d.value));
          return (
            <div className="h-32">
              <div className="flex items-end justify-between h-full">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-4 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t transition-all duration-300 group-hover:from-amber-400 group-hover:to-amber-200"
                      style={{ 
                        height: `${(item.value / barMaxValue) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
      }
    };

    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 group relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/70 dark:from-slate-800 dark:to-slate-800/80 pointer-events-none"></div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent"></div>
        
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
              {number}
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="text-amber-500 text-xl">
              {icon}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
          </div>
          
          {/* Chart Visualization */}
          <div className="h-32 mb-5 px-2">
            {renderChart()}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-5 shadow-sm">
            {stats}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => navigate(route)}
              className="text-sm text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1 group font-medium"
            >
              View Details
              <MdArrowForward className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TopFacilitiesBox = () => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/70 dark:from-slate-800 dark:to-slate-800/80 pointer-events-none"></div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/5 to-transparent"></div>
        
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-3 rounded-xl text-white shadow-sm">
              <MdBarChart className="text-xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Top Facilities by Potential Savings</h2>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500 dark:text-slate-300 tracking-wider">Facility</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500 dark:text-slate-300 tracking-wider">Location</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500 dark:text-slate-300 tracking-wider">Annual Savings</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500 dark:text-slate-300 tracking-wider">ROI</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500 dark:text-slate-300 tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {dashboardData.topFacilities.map(facility => (
                  <tr key={facility.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-sm font-medium text-slate-800 dark:text-white">{facility.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <MdLocationOn className="text-amber-500" />
                        {facility.location}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">{facility.savings}</td>
                    <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-300">{facility.roi}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        facility.status === "Interested" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                        facility.status === "Follow-up Scheduled" ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300" :
                        facility.status === "Email Opened" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                        facility.status === "Email Sent" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" :
                        "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                      }`}>
                        {facility.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => navigate('/outreach-tracking')}
              className="flex items-center gap-2 text-amber-500 hover:text-amber-600 font-medium transition-colors group"
            >
              View All Facilities
              <MdArrowOutward className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-1 py-2">
      {/* Hero Section */}
      <div 
        className="w-full rounded-2xl mb-8 overflow-hidden relative shadow-sm" 
        style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), linear-gradient(110deg, #2563eb, #0ea5e9, #0f172a)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Solar panel pattern overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #ffffff 40px, #ffffff 42px), repeating-linear-gradient(90deg, transparent, transparent 40px, #ffffff 40px, #ffffff 42px)',
            backgroundSize: '42px 42px'
          }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full"></div>
        
        <div className="p-8 md:p-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-white text-sm font-medium py-1 px-4 rounded-full mb-6 shadow-sm">
              Solar Energy Solutions
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Powering Your Future<br/>
              With Advanced Solar Technology
            </h1>
            <p className="text-slate-200 text-base lg:text-lg mb-7 max-w-2xl leading-relaxed">
              Automate solar sales with facility data scraping, energy analysis, and personalized outreach designed for maximum efficiency and ROI.
            </p>
            <button 
              onClick={() => navigate('/facility-data-scraper')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 px-7 rounded-xl font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 group"
            >
              Get Started
              <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Process Flow Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Lead Identification */}
          <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group border border-sky-400/20"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7, #0c4a6e)'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-sky-600/0 rounded-full blur-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tl from-sky-400/20 to-cyan-500/0 rounded-full blur-2xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 p-[2px] mb-6 shadow-lg group-hover:shadow-sky-500/25 transition-shadow duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-100 transition-colors duration-300">Lead Identification</h3>
              <p className="text-sky-100 text-base leading-relaxed mb-6">
                Identify and qualify potential leads through our extensive database of commercial facilities, filtering for optimal solar potential.
              </p>
              
              <div className="flex items-center gap-3 text-cyan-300 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <MdOutlineAnalytics className="text-xl" />
                <span className="text-base">Data-Driven Selection</span>
                <MdArrowForward className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Step 2: Lead Enrichment */}
          <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group border border-blue-400/20"
            style={{
              background: 'linear-gradient(135deg, #0369a1, #1e40af, #1e3a8a)'
            }}
          >
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.07]" 
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #38bdf8 20px, #38bdf8 21px), repeating-linear-gradient(135deg, transparent, transparent 20px, #38bdf8 20px, #38bdf8 21px)',
                backgroundSize: '30px 30px'
              }}
            ></div>
            
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-sky-400/30 to-blue-600/0 rounded-full blur-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tl from-blue-400/20 to-sky-500/0 rounded-full blur-2xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-[2px] mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-100 transition-colors duration-300">Lead Enrichment</h3>
              <p className="text-sky-100 text-base leading-relaxed mb-6">
                Enrich leads with detailed facility specifications, energy consumption patterns, and solar potential analysis tailored to solar company requirements.
              </p>
              
              <div className="flex items-center gap-3 text-sky-300 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <MdOutlineLightbulb className="text-xl" />
                <span className="text-base">Smart Analysis</span>
                <MdArrowForward className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Step 3: Personalized Outreach */}
          <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group border border-indigo-400/20"
            style={{
              background: 'linear-gradient(135deg, #1e40af, #1e3a8a, #172554)'
            }}
          >
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.07]" 
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, #38bdf8 20px, #38bdf8 21px), repeating-linear-gradient(-135deg, transparent, transparent 20px, #38bdf8 20px, #38bdf8 21px)',
                backgroundSize: '30px 30px'
              }}
            ></div>
            
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-indigo-600/0 rounded-full blur-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tl from-indigo-400/20 to-blue-500/0 rounded-full blur-2xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] mb-6 shadow-lg group-hover:shadow-indigo-500/25 transition-shadow duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-100 transition-colors duration-300">Personalized Outreach</h3>
              <p className="text-sky-100 text-base leading-relaxed mb-6">
                Engage leads with hyper-personalized communication strategies based on facility-specific data and solar potential insights.
              </p>
              
              <div className="flex items-center gap-3 text-sky-300 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <MdOutlineEmail className="text-xl" />
                <span className="text-base">Smart Engagement</span>
                <MdArrowForward className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        <StatsCard 
          title="Facilities Analyzed" 
          value={dashboardData.facilitiesAnalyzed.total.toString()} 
          change={`${dashboardData.facilitiesAnalyzed.percentage}% complete`}
          icon={<MdOutlineRoofing className="text-2xl" />}
          colorClass="bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
          borderColor="border-blue-100 dark:border-blue-800/30"
        />
        <StatsCard 
          title="Average Annual Savings" 
          value={dashboardData.energyEstimations.averageCost}
          icon={<MdAttachMoney className="text-2xl" />}
          colorClass="bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400"
          borderColor="border-emerald-100 dark:border-emerald-800/30"
        />
        <StatsCard 
          title="Average ROI" 
          value={dashboardData.solarPotential.averageROI}
          icon={<MdInsights className="text-2xl" />}
          colorClass="bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400"
          borderColor="border-amber-100 dark:border-amber-800/30"
        />
        <StatsCard 
          title="Email Open Rate" 
          value={`${dashboardData.emailCampaigns.openRate}%`}
          icon={<MdOutlineEmail className="text-2xl" />}
          colorClass="bg-purple-50 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400"
          borderColor="border-purple-100 dark:border-purple-800/30"
        />
      </div>
      
      {/* Workflow Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center">
          <div className="w-1 h-5 bg-amber-500 rounded-full mr-3"></div>
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <WorkflowCard 
            number={1}
            title="Facility Data Scraper"
            description="View and manage facility data collection"
            icon={<MdFactory />}
            route="/facility-data-scraper"
            chartData={dashboardData.facilitiesScraped.chartData}
            chartType="sparkline"
            stats={
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Facilities</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.facilitiesScraped.total}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Enriched</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.facilitiesScraped.enriched}</p>
                </div>
              </div>
            }
          />
          
          <WorkflowCard 
            number={2}
            title="Facility AI Analysis"
            description="Review AI-powered facility analysis"
            icon={<MdOutlineRoofing />}
            route="/facility-ai-analysis"
            chartData={[
              { name: "Analyzed", value: dashboardData.facilitiesAnalyzed.total },
              { name: "Pending", value: dashboardData.facilitiesScraped.total - dashboardData.facilitiesAnalyzed.total }
            ]}
            chartType="progress"
            stats={
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Analyzed</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.facilitiesAnalyzed.total}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-600/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full" 
                    style={{ width: `${dashboardData.facilitiesAnalyzed.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{dashboardData.facilitiesAnalyzed.percentage}% complete</p>
              </div>
            }
          />
          
          <WorkflowCard 
            number={3}
            title="Energy Usage Estimation"
            description="Monitor energy consumption patterns"
            icon={<MdElectricBolt />}
            route="/energy-usage-estimation"
            chartData={[
              { name: "Current", value: dashboardData.energyEstimations.chartData[dashboardData.energyEstimations.chartData.length - 1].value },
              { name: "Previous", value: dashboardData.energyEstimations.chartData[dashboardData.energyEstimations.chartData.length - 2].value }
            ]}
            chartType="metric"
            stats={
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Annual Usage</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.energyEstimations.averageUsage}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Annual Cost</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.energyEstimations.averageCost}</p>
                </div>
              </div>
            }
          />
          
          <WorkflowCard 
            number={4}
            title="Solar Panel Potential"
            description="Track solar potential and ROI"
            icon={<MdSolarPower />}
            route="/solar-panel-potential"
            chartData={[
              { name: "ROI", value: parseFloat(dashboardData.solarPotential.averageROI) },
              { name: "Payback", value: parseFloat(dashboardData.solarPotential.averagePayback) * 10 },
              { name: "Savings", value: parseFloat(dashboardData.solarPotential.totalSavings.replace(/[^0-9.-]+/g, "")) / 1000000 }
            ]}
            chartType="progress"
            stats={
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Avg. ROI</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.solarPotential.averageROI}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Payback</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.solarPotential.averagePayback}</p>
                </div>
              </div>
            }
          />
          
          <WorkflowCard 
            number={5}
            title="Email Automation"
            description="Manage email campaigns"
            icon={<MdOutlineEmail />}
            route="/email-automation"
            chartData={[
              { name: "Sent", value: dashboardData.emailCampaigns.emailsSent },
              { name: "Opened", value: dashboardData.emailCampaigns.emailsOpened },
              { name: "Replied", value: dashboardData.emailCampaigns.repliedRate * dashboardData.emailCampaigns.emailsSent / 100 }
            ]}
            chartType="progress"
            stats={
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Emails Sent</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.emailCampaigns.emailsSent}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Open Rate</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.emailCampaigns.openRate}%</p>
                </div>
              </div>
            }
          />
          
          <WorkflowCard 
            number={6}
            title="Outreach Tracking"
            description="Monitor engagement metrics"
            icon={<MdOutlineTrackChanges />}
            route="/outreach-tracking"
            chartData={[
              { name: "Sent", value: dashboardData.emailCampaigns.emailsSent },
              { name: "Opened", value: dashboardData.emailCampaigns.emailsOpened },
              { name: "Replied", value: dashboardData.emailCampaigns.repliedRate * dashboardData.emailCampaigns.emailsSent / 100 },
              { name: "Interested", value: dashboardData.emailCampaigns.interestedRate * dashboardData.emailCampaigns.emailsSent / 100 }
            ]}
            chartType="progress"
            stats={
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Reply Rate</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.emailCampaigns.repliedRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Interest Rate</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{dashboardData.emailCampaigns.interestedRate}%</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
      
      {/* Top Facilities Table */}
      <TopFacilitiesBox />
    </div>
  );
};

export default Home;
