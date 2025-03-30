import React from 'react';
import { useState } from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import USMap from '../components/maps/USMap';
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
  MdTrendingUp,
  MdAccessTime,
  MdOutlineCalendarMonth,
  MdOutlineSearch,
  MdOutlineLocationOn,
  MdOutlineCloud,
  MdOutlineWbSunny as MdSun,
  MdKeyboardArrowRight,
  MdHomeWork,
  MdShowChart,
  MdEmail,
  MdDashboard
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
                      <span className="text-sm text-slate-300">{item.name}</span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-500 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );

        case 'metric':
          return (
            <div className="h-full flex items-center justify-center">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-full h-28 w-28 flex items-center justify-center relative border border-orange-500/20">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-300"
                    style={{ height: `${(chartData[0].value / (chartData[0].value + chartData[1].value)) * 100}%` }}
                  />
                </div>
                <div className="z-10 text-center">
                  <div className="text-2xl font-bold text-white">{chartData[0].value}</div>
                  <div className="text-xs text-slate-300">{chartData[0].name}</div>
                </div>
              </div>
            </div>
          );

        case 'sparkline':
          const maxValue = Math.max(...chartData.map(item => item.value));
          const values = chartData.map(item => item.value / maxValue * 40);
          
          return (
            <div className="h-full flex items-end justify-between px-2">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="w-2 bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-sm transition-all duration-300 hover:bg-orange-400"
                  style={{ height: `${value}px` }}
                />
              ))}
            </div>
          );

        default:
          return (
            <div className="h-full flex items-end justify-between px-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-6 bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-sm transition-all duration-300 hover:bg-orange-400"
                    style={{ height: `${(item.value / Math.max(...chartData.map(d => d.value))) * 100}px` }}
                  />
                  <span className="text-xs text-slate-300 mt-1">{item.name}</span>
                </div>
              ))}
            </div>
          );
      }
    };

    // Add a function to generate random gradient patterns
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

    const gradient = getRandomGradient();

    return (
      <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-orange-500/15 group relative">
        {/* Random gradient pattern */}
        <div className={`absolute inset-0 ${gradient.base} opacity-25 group-hover:opacity-30`}></div>
        {gradient.blobs.map((blob, index) => (
          <div key={index} className={`${blob} to-transparent rounded-full blur-${index === 0 ? '3xl' : index === 1 ? '2xl' : 'xl'} transform rotate-${Math.floor(Math.random() * 90)}deg`}></div>
        ))}
        
        <div className="p-6 relative z-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold shrink-0 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/20">
              {number}
            </div>
            <h2 className="text-lg font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="text-orange-300 text-xl">
              {icon}
            </div>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
          
          {/* Chart Visualization */}
          <div className="h-32 mb-5 px-2 bg-gradient-to-b from-white/[0.05] to-transparent rounded-xl p-4">
            {renderChart()}
          </div>
          
          <div className="bg-gradient-to-br from-[#28292b]/60 to-[rgba(40,41,43,0.2)] backdrop-blur-md rounded-xl p-4 mb-5 shadow-sm border border-orange-500/20 relative overflow-hidden">
            {/* Inner gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-blue-500/10 opacity-30"></div>
            <div className="relative z-10">
              {stats}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => navigate(route)}
              className="text-sm text-orange-300 hover:text-orange-200 transition-colors flex items-center gap-1 group font-medium"
            >
              View Details
              <MdArrowForward className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      <div className="py-4"></div>

      {/* Process Flow Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Lead Identification */}
          <div className="rounded-3xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] backdrop-blur-xl border border-orange-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/20 relative overflow-hidden group">
            {/* Unique gradient pattern 1 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-orange-600/15 opacity-25 group-hover:opacity-30"></div>
            <div className="absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-3xl transform rotate-45"></div>
            <div className="absolute bottom-1/3 -right-10 w-32 h-32 bg-gradient-to-tl from-amber-500/30 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-600/25 to-transparent rounded-full blur-xl transform -rotate-45"></div>
            
            <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl">
              {/* Main icon and temperature-like display */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/20">
                    <MdOutlineAnalytics className="text-white text-3xl" />
                  </div>
                  <div className="ml-3">
                    <div className="text-4xl font-bold text-white tracking-tight">79<span className="text-lg font-normal text-white/80">%</span></div>
                    <div className="text-xs text-orange-400 font-medium mt-0.5">Completion Rate</div>
                  </div>
                </div>
                <div className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-orange-500/10">
                  <MdOutlineSearch className="text-xl text-white/70" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-5">Lead Identification</h3>
              
              {/* Weather-like status indicators */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-orange-400">
                    <MdOutlineCalendarMonth />
                  </div>
                  <div className="text-sm text-slate-200">Quarterly Target: 150 Leads</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-orange-400">
                    <MdLocationOn />
                  </div>
                  <div className="text-sm text-slate-200">Top Region: West Coast</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-orange-400">
                    <MdAccessTime />
                  </div>
                  <div className="text-sm text-slate-200">Last Updated: 2h ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Lead Enrichment */}
          <div className="rounded-3xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] backdrop-blur-xl border border-orange-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/20 relative overflow-hidden group">
            {/* Unique gradient pattern 2 */}
            <div className="absolute inset-0 bg-gradient-to-bl from-orange-600/30 via-amber-600/20 to-orange-500/15 opacity-25 group-hover:opacity-30"></div>
            <div className="absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-tr from-orange-500/40 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
            <div className="absolute -bottom-10 right-1/4 w-36 h-36 bg-gradient-to-bl from-amber-500/35 to-transparent rounded-full blur-2xl transform rotate-45"></div>
            <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-tr from-orange-600/30 to-transparent rounded-full blur-xl"></div>
            
            <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl">
              {/* Main icon and temperature-like display */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-600/20">
                    <MdOutlineLightbulb className="text-white text-3xl" />
                  </div>
                  <div className="ml-3">
                    <div className="text-4xl font-bold text-white tracking-tight">5.5<span className="text-lg font-normal text-white/80">k</span></div>
                    <div className="text-xs text-amber-400 font-medium mt-0.5">Data Points</div>
                  </div>
                </div>
                <div className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-amber-500/10">
                  <MdOutlineSearch className="text-xl text-white/70" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-5">Lead Enrichment</h3>
              
              {/* Weather-like status indicators */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-amber-400">
                    <MdSun className="text-xl" />
                  </div>
                  <div className="text-sm text-slate-200">Solar Potential: High</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-amber-400">
                    <MdOutlineLocationOn />
                  </div>
                  <div className="text-sm text-slate-200">Coverage: 37 States</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-amber-400">
                    <MdAccessTime />
                  </div>
                  <div className="text-sm text-slate-200">Last Updated: 4h ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Personalized Outreach */}
          <div className="rounded-3xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] backdrop-blur-xl border border-orange-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/20 relative overflow-hidden group">
            {/* Unique gradient pattern 3 */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-orange-600/25 opacity-25 group-hover:opacity-30"></div>
            <div className="absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-orange-500/45 to-transparent rounded-full blur-3xl transform rotate-90"></div>
            <div className="absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-amber-600/40 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-orange-500/35 to-transparent rounded-full blur-xl transform -rotate-45"></div>
            
            <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl">
              {/* Main icon and temperature-like display */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <MdOutlineEmail className="text-white text-3xl" />
                  </div>
                  <div className="ml-3">
                    <div className="text-4xl font-bold text-white tracking-tight">42<span className="text-lg font-normal text-white/80">%</span></div>
                    <div className="text-xs text-blue-400 font-medium mt-0.5">Response Rate</div>
                  </div>
                </div>
                <div className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-blue-500/10">
                  <MdOutlineSearch className="text-xl text-white/70" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-5">Personalized Outreach</h3>
              
              {/* Weather-like status indicators */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-blue-400">
                    <MdOutlineCloud className="text-xl" />
                  </div>
                  <div className="text-sm text-slate-200">Emails Sent: 85</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-blue-400">
                    <MdOutlineLocationOn />
                  </div>
                  <div className="text-sm text-slate-200">Top Market: California</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-blue-400">
                    <MdAccessTime />
                  </div>
                  <div className="text-sm text-slate-200">Last Campaign: 2d ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USA Map Section */}
      <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-6 mb-8 relative overflow-hidden">
        {/* Unique gradient pattern 4 */}
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/30 via-amber-500/20 to-orange-500/25 opacity-25"></div>
        <div className="absolute -top-20 right-1/4 w-52 h-52 bg-gradient-to-br from-orange-500/45 to-transparent rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-1/3 -left-16 w-44 h-44 bg-gradient-to-tr from-amber-500/40 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-gradient-to-bl from-orange-600/35 to-transparent rounded-full blur-xl transform rotate-90"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <MdLocationOn className="text-orange-500" />
              Facility Locations
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500/80"></div>
                <span className="text-slate-200">High Activity</span>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500/60"></div>
                <span className="text-slate-200">Active Markets</span>
              </span>
            </div>
          </div>
          
          <div className="flex gap-6">
            {/* Map */}
            <div className="h-[80px] flex-1">
              <USMap className="w-full h-full" />
            </div>
            
            {/* Metrics */}
            <div className="w-64 space-y-4">
              <div className="bg-[rgba(27,34,42,0.75)] rounded-xl p-4 border border-orange-500/10">
                <h3 className="text-white text-sm font-medium mb-2">Market Coverage</h3>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-orange-500">42</div>
                  <div className="text-sm text-slate-400">States Active</div>
                </div>
                <div className="mt-2 h-1.5 bg-[rgba(27,34,42,0.95)] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              
              <div className="bg-[rgba(27,34,42,0.75)] rounded-xl p-4 border border-orange-500/10">
                <h3 className="text-white text-sm font-medium mb-2">Top Regions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">California</span>
                    <span className="text-orange-500">245 Sites</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">Texas</span>
                    <span className="text-orange-500">189 Sites</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">Florida</span>
                    <span className="text-orange-500">156 Sites</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[rgba(27,34,42,0.75)] rounded-xl p-4 border border-orange-500/10">
                <h3 className="text-white text-sm font-medium mb-2">Growth Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200">Monthly Growth</span>
                      <span className="text-green-400">+12.5%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-[rgba(27,34,42,0.95)] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200">Market Penetration</span>
                      <span className="text-orange-400">68%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-[rgba(27,34,42,0.95)] rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workflow Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/20 backdrop-blur-md">
            <MdDashboard className="text-white text-xl" />
          </div>
          <h2 className="text-xl font-bold text-white relative">
            Dashboard Overview
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent"></span>
          </h2>
        </div>
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
                  <p className="text-sm text-slate-400">Total Facilities</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">{dashboardData.facilitiesScraped.total}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Enriched</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">{dashboardData.facilitiesScraped.enriched}</p>
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
                <p className="text-sm text-slate-400">Analyzed</p>
                <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">{dashboardData.facilitiesAnalyzed.total}</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full" 
                    style={{ width: `${dashboardData.facilitiesAnalyzed.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-orange-400/80 mt-1">{dashboardData.facilitiesAnalyzed.percentage}% complete</p>
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
                  <p className="text-sm text-slate-400">Avg. Annual Usage</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">{dashboardData.energyEstimations.averageUsage}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Avg. Annual Cost</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">{dashboardData.energyEstimations.averageCost}</p>
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
                  <p className="text-sm text-slate-400">Avg. ROI</p>
                  <p className="text-xl font-bold text-white">{dashboardData.solarPotential.averageROI}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Avg. Payback</p>
                  <p className="text-xl font-bold text-white">{dashboardData.solarPotential.averagePayback}</p>
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
                  <p className="text-sm text-slate-400">Emails Sent</p>
                  <p className="text-xl font-bold text-white">{dashboardData.emailCampaigns.emailsSent}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Open Rate</p>
                  <p className="text-xl font-bold text-white">{dashboardData.emailCampaigns.openRate}%</p>
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
    </div>
  );
};

export default Home;
