import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdArrowBack, 
  MdOutlineEmail, 
  MdPhone, 
  MdCheck, 
  MdClose, 
  MdOutlineSchedule, 
  MdOutlineCalendarToday, 
  MdNotes, 
  MdOutlineInsights, 
  MdOutlineBarChart, 
  MdOutlinePieChart, 
  MdOutlineShowChart,
  MdOutlineTrackChanges,
  MdOutlineQueryStats,
  MdOutlineMoreVert
} from 'react-icons/md';
import { FaRegEdit, FaRegTrashAlt, FaRegClock, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Add HTMLDialogElement to the global Window interface
declare global {
  interface HTMLElementTagNameMap {
    'dialog': HTMLDialogElement;
  }
}

interface EmailStatus {
  drafted: boolean;
  sent: boolean;
  scheduled: boolean;
  scheduledDate?: Date;
}

interface Facility {
  id: number;
  name: string;
  industry: string;
  location: string;
  manager: string;
  email: string;
  phone: string;
  emailStatus: EmailStatus;
  outreachStatus: {
    opened: boolean;
    openedAt?: Date;
    replied: boolean;
    repliedAt?: Date;
    interested: boolean | null;
    followUpScheduled: boolean;
    followUpDate?: Date;
    notes: string;
  };
  solarPotential: {
    annualSavings: number;
  };
}

const OutreachTracking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [outreachData, setOutreachData] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('contacts');
  
  // Sample outreach data
  const sampleOutreachData = [
    {
      id: 1,
      contactName: "Jeff Levy",
      company: "Apple",
      email: "j.levy@example.com",
      phone: "(404) 555-1234",
      location: "Atlanta, GA",
      position: "Facilities Manager",
      outreachHistory: [
        {
          id: 101,
          type: "email",
          date: "2023-06-15T09:30:00",
          subject: "Reduce Energy Costs with Solar - Personalized Analysis for Apple",
          status: "sent",
          response: "interested",
          notes: "Replied same day, interested in learning more about the ROI timeline."
        },
        {
          id: 102,
          type: "call",
          date: "2023-06-17T14:00:00",
          subject: "Initial consultation call",
          status: "completed",
          response: "positive",
          notes: "30-minute call. Very interested in the proposal. Requested detailed ROI analysis."
        },
        {
          id: 103,
          type: "email",
          date: "2023-06-18T10:15:00",
          subject: "Solar Energy Proposal for Apple",
          status: "sent",
          response: "none",
          notes: "Sent detailed proposal with ROI analysis as requested."
        },
        {
          id: 104,
          type: "call",
          date: "2023-06-23T11:00:00",
          subject: "Follow-up call",
          status: "scheduled",
          response: "pending",
          notes: "Scheduled to discuss the proposal and answer any questions."
        }
      ]
    },
    {
      id: 2,
      contactName: "Amy Huke",
      company: "Honeywell",
      email: "a.huke@example.com",
      phone: "(816) 555-6789",
      location: "Kansas City, MO",
      position: "Facilities Manager",
      outreachHistory: [
        {
          id: 201,
          type: "email",
          date: "2023-06-15T09:30:00",
          subject: "Reduce Energy Costs with Solar - Personalized Analysis for Honeywell",
          status: "sent",
          response: "none",
          notes: "No response yet."
        },
        {
          id: 202,
          type: "email",
          date: "2023-06-19T09:30:00",
          subject: "Following Up: Solar Energy Savings for Honeywell",
          status: "scheduled",
          response: "pending",
          notes: "Follow-up email scheduled."
        }
      ]
    },
    {
      id: 3,
      contactName: "Ryan Kuddes",
      company: "Apple",
      email: "r.kuddes@example.com",
      phone: "(303) 555-4321",
      location: "Denver, CO",
      position: "Facilities Manager",
      outreachHistory: [
        {
          id: 301,
          type: "email",
          date: "2023-06-15T09:30:00",
          subject: "Reduce Energy Costs with Solar - Personalized Analysis for Apple",
          status: "sent",
          response: "interested",
          notes: "Replied after 2 days, interested in a call next week."
        },
        {
          id: 302,
          type: "call",
          date: "2023-06-22T15:30:00",
          subject: "Initial consultation call",
          status: "scheduled",
          response: "pending",
          notes: "Scheduled for a 20-minute call to discuss solar options."
        }
      ]
    },
    {
      id: 4,
      contactName: "Zuretti Carter",
      company: "ChargePoint",
      email: "z.carter@example.com",
      phone: "(415) 555-7890",
      location: "San Francisco, CA",
      position: "Facilities Manager",
      outreachHistory: [
        {
          id: 401,
          type: "email",
          date: "2023-06-15T09:30:00",
          subject: "Reduce Energy Costs with Solar - Personalized Analysis for ChargePoint",
          status: "sent",
          response: "not_interested",
          notes: "Replied that they already have solar installed at their facility."
        }
      ]
    },
    {
      id: 5,
      contactName: "Scott Simpson",
      company: "Plexus Corp.",
      email: "s.simpson@example.com",
      phone: "(920) 555-2345",
      location: "Neenah, WI",
      position: "Facilities Manager",
      outreachHistory: [
        {
          id: 501,
          type: "email",
          date: "2023-06-15T09:30:00",
          subject: "Reduce Energy Costs with Solar - Personalized Analysis for Plexus Corp.",
          status: "sent",
          response: "none",
          notes: "No response yet."
        },
        {
          id: 502,
          type: "call",
          date: "2023-06-16T13:45:00",
          subject: "Cold call introduction",
          status: "completed",
          response: "neutral",
          notes: "Brief call. Said they're evaluating energy options but not ready to commit. Will review our email."
        },
        {
          id: 503,
          type: "email",
          date: "2023-06-20T09:30:00",
          subject: "Following Up: Solar Energy Savings for Plexus Corp.",
          status: "scheduled",
          response: "pending",
          notes: "Follow-up email scheduled."
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setOutreachData(sampleOutreachData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'scheduled':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  };

  const getResponseColor = (response: string) => {
    switch (response) {
      case 'interested':
      case 'positive':
        return 'text-success';
      case 'not_interested':
        return 'text-error';
      case 'neutral':
        return 'text-warning';
      default:
        return 'text-gray-500';
    }
  };

  const getResponseIcon = (response: string) => {
    switch (response) {
      case 'interested':
      case 'positive':
        return <FaRegCheckCircle className="text-success" />;
      case 'not_interested':
        return <FaRegTimesCircle className="text-error" />;
      case 'neutral':
        return <FaRegClock className="text-warning" />;
      case 'none':
      case 'pending':
      default:
        return <FaRegClock className="text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <MdOutlineEmail className="text-primary" />;
      case 'call':
        return <MdPhone className="text-primary" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddNote = () => {
    if (!selectedContact || !newNote.trim()) {
      return;
    }

    // In a real app, you would make an API call here
    toast.success('Note added successfully');
    setNewNote('');
    setShowNoteModal(false);
  };

  const handleScheduleFollowUp = (contact: any) => {
    // In a real app, you would navigate to the email composer or show a scheduling modal
    toast.success(`Follow-up scheduled for ${contact.contactName}`);
  };

  const filteredData = outreachData.filter(contact => {
    if (filterStatus === 'all') return true;
    
    // Check if any outreach matches the filter
    return contact.outreachHistory.some((outreach: any) => {
      if (filterStatus === 'interested') {
        return ['interested', 'positive'].includes(outreach.response);
      } else if (filterStatus === 'not_interested') {
        return outreach.response === 'not_interested';
      } else if (filterStatus === 'no_response') {
        return outreach.response === 'none';
      } else if (filterStatus === 'pending') {
        return outreach.status === 'scheduled';
      }
      return false;
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'date') {
      // Get the most recent outreach for each contact
      const latestA = a.outreachHistory.sort((x: any, y: any) => 
        new Date(y.date).getTime() - new Date(x.date).getTime()
      )[0]?.date || '';
      
      const latestB = b.outreachHistory.sort((x: any, y: any) => 
        new Date(y.date).getTime() - new Date(x.date).getTime()
      )[0]?.date || '';
      
      return sortOrder === 'desc' 
        ? new Date(latestB).getTime() - new Date(latestA).getTime()
        : new Date(latestA).getTime() - new Date(latestB).getTime();
    } else if (sortBy === 'name') {
      return sortOrder === 'desc'
        ? b.contactName.localeCompare(a.contactName)
        : a.contactName.localeCompare(b.contactName);
    } else if (sortBy === 'company') {
      return sortOrder === 'desc'
        ? b.company.localeCompare(a.company)
        : a.company.localeCompare(b.company);
    }
    return 0;
  });

  // Analytics data
  const analyticsData = {
    // Email performance data
    emailPerformance: [
      { name: 'Sent', value: 32 },
      { name: 'Opened', value: 24 },
      { name: 'Replied', value: 14 },
      { name: 'Meetings', value: 8 },
    ],
    
    // Response rate over time
    responseRateOverTime: [
      { month: 'Jan', rate: 25 },
      { month: 'Feb', rate: 28 },
      { month: 'Mar', rate: 32 },
      { month: 'Apr', rate: 38 },
      { month: 'May', rate: 42 },
      { month: 'Jun', rate: 47 },
    ],
    
    // Engagement by industry
    engagementByIndustry: [
      { industry: 'Technology', interested: 65, neutral: 25, notInterested: 10 },
      { industry: 'Manufacturing', interested: 48, neutral: 32, notInterested: 20 },
      { industry: 'Retail', interested: 52, neutral: 28, notInterested: 20 },
      { industry: 'Healthcare', interested: 70, neutral: 20, notInterested: 10 },
      { industry: 'Education', interested: 58, neutral: 30, notInterested: 12 },
    ],
    
    // Conversion funnel
    conversionFunnel: [
      { stage: 'Contacted', count: 100 },
      { stage: 'Engaged', count: 68 },
      { stage: 'Meeting', count: 42 },
      { stage: 'Proposal', count: 28 },
      { stage: 'Closed', count: 18 },
    ],
    
    // Follow-up effectiveness
    followUpEffectiveness: [
      { followUps: '0', conversionRate: 12 },
      { followUps: '1', conversionRate: 24 },
      { followUps: '2', conversionRate: 38 },
      { followUps: '3', conversionRate: 45 },
      { followUps: '4+', conversionRate: 52 },
    ],
    
    // Response time distribution
    responseTimeDistribution: [
      { time: 'Same day', percentage: 35 },
      { time: '1-2 days', percentage: 42 },
      { time: '3-7 days', percentage: 15 },
      { time: '1-2 weeks', percentage: 5 },
      { time: '2+ weeks', percentage: 3 },
    ]
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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
              onClick={() => navigate('/email-automation')}
              className="btn btn-circle btn-ghost"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold">Outreach Tracking</h1>
          </div>
          
          <div className="flex gap-3">
            <div className="tabs tabs-boxed">
              <a 
                className={`tab ${activeTab === 'contacts' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                Contacts
              </a>
              <a 
                className={`tab ${activeTab === 'analytics' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </a>
            </div>
            
            {activeTab === 'contacts' && (
              <>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-outline">
                    Filter: {filterStatus === 'all' ? 'All Contacts' : 
                      filterStatus === 'interested' ? 'Interested' :
                      filterStatus === 'not_interested' ? 'Not Interested' :
                      filterStatus === 'no_response' ? 'No Response' : 'Pending'}
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={() => setFilterStatus('all')}>All Contacts</button></li>
                    <li><button onClick={() => setFilterStatus('interested')}>Interested</button></li>
                    <li><button onClick={() => setFilterStatus('not_interested')}>Not Interested</button></li>
                    <li><button onClick={() => setFilterStatus('no_response')}>No Response</button></li>
                    <li><button onClick={() => setFilterStatus('pending')}>Pending Follow-ups</button></li>
                  </ul>
                </div>
                
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-outline">
                    Sort: {sortBy === 'date' ? 'Date' : 
                      sortBy === 'name' ? 'Name' : 'Company'} ({sortOrder === 'desc' ? 'Desc' : 'Asc'})
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={() => { setSortBy('date'); setSortOrder('desc'); }}>Latest First</button></li>
                    <li><button onClick={() => { setSortBy('date'); setSortOrder('asc'); }}>Oldest First</button></li>
                    <li><button onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>Name (A-Z)</button></li>
                    <li><button onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>Name (Z-A)</button></li>
                    <li><button onClick={() => { setSortBy('company'); setSortOrder('asc'); }}>Company (A-Z)</button></li>
                    <li><button onClick={() => { setSortBy('company'); setSortOrder('desc'); }}>Company (Z-A)</button></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab === 'analytics' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Performance */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlinePieChart className="text-primary" />
                  Email Performance
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.emailPerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.emailPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} emails`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  75% open rate, 58% response rate, and 57% meeting conversion
                </div>
              </div>
            </div>
            
            {/* Response Rate Over Time */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineShowChart className="text-primary" />
                  Response Rate Trend
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analyticsData.responseRateOverTime}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Response Rate']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Response Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  Response rate has increased by 88% over the last 6 months
                </div>
              </div>
            </div>
            
            {/* Engagement by Industry */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineBarChart className="text-primary" />
                  Engagement by Industry
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.engagementByIndustry}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                      <Bar dataKey="interested" name="Interested" stackId="a" fill="#4ade80" />
                      <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#facc15" />
                      <Bar dataKey="notInterested" name="Not Interested" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  Healthcare and Technology show the highest interest rates
                </div>
              </div>
            </div>
            
            {/* Conversion Funnel */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineInsights className="text-primary" />
                  Conversion Funnel
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.conversionFunnel}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="stage" type="category" />
                      <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  18% overall conversion rate from initial contact to closed deal
                </div>
              </div>
            </div>
            
            {/* Follow-up Effectiveness */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlineBarChart className="text-primary" />
                  Follow-up Effectiveness
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.followUpEffectiveness}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="followUps" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                      <Bar dataKey="conversionRate" name="Conversion Rate" fill="#4ade80" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  Multiple follow-ups increase conversion rates by up to 333%
                </div>
              </div>
            </div>
            
            {/* Response Time Distribution */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg flex items-center gap-2">
                  <MdOutlinePieChart className="text-primary" />
                  Response Time Distribution
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={analyticsData.responseTimeDistribution}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Area type="monotone" dataKey="percentage" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-center text-gray-500 mt-2">
                  77% of responses come within the first 2 days
                </div>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="card bg-base-100 shadow-lg md:col-span-2">
              <div className="card-body">
                <h2 className="card-title text-lg">Campaign Performance Summary</h2>
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Open Rate</div>
                    <div className="stat-value text-primary">75%</div>
                    <div className="stat-desc">21% above industry average</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-title">Response Rate</div>
                    <div className="stat-value text-secondary">58%</div>
                    <div className="stat-desc">32% above industry average</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-title">Meeting Rate</div>
                    <div className="stat-value">33%</div>
                    <div className="stat-desc">18% above industry average</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-title">Conversion Rate</div>
                    <div className="stat-value text-accent">18%</div>
                    <div className="stat-desc">12% above industry average</div>
                  </div>
                </div>
                <div className="alert alert-success mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Your outreach campaign is performing 27% better than industry benchmarks!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {sortedData.map(contact => (
                <div key={contact.id} className="card bg-base-100 shadow-lg">
                  <div className="card-body p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      {/* Contact Info */}
                      <div className="flex-1">
                        <h2 className="card-title text-lg">{contact.contactName}</h2>
                        <div className="text-sm text-gray-600">{contact.position} at {contact.company}</div>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <MdOutlineEmail className="text-gray-500" size={16} />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdPhone className="text-gray-500" size={16} />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdOutlineCalendarToday className="text-gray-500" size={16} />
                            <span>{contact.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowNoteModal(true);
                            }}
                            className="btn btn-sm btn-outline gap-1"
                          >
                            <MdNotes size={16} />
                            Add Note
                          </button>
                          <button 
                            onClick={() => handleScheduleFollowUp(contact)}
                            className="btn btn-sm btn-outline gap-1"
                          >
                            <MdOutlineSchedule size={16} />
                            Schedule Follow-up
                          </button>
                        </div>
                      </div>
                      
                      {/* Outreach History */}
                      <div className="flex-[2]">
                        <h3 className="font-medium mb-3">Outreach History</h3>
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Response</th>
                                <th>Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contact.outreachHistory
                                .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map((outreach: any) => (
                                  <tr key={outreach.id}>
                                    <td className="whitespace-nowrap">{formatDate(outreach.date)}</td>
                                    <td className="flex items-center gap-1">
                                      {getTypeIcon(outreach.type)}
                                      <span className="capitalize">{outreach.type}</span>
                                    </td>
                                    <td className="max-w-[200px] truncate" title={outreach.subject}>
                                      {outreach.subject}
                                    </td>
                                    <td>
                                      <span className={`badge ${getStatusColor(outreach.status)}`}>
                                        {outreach.status}
                                      </span>
                                    </td>
                                    <td className="flex items-center gap-1">
                                      {getResponseIcon(outreach.response)}
                                      <span className={`capitalize ${getResponseColor(outreach.response)}`}>
                                        {outreach.response === 'none' ? 'No response' : outreach.response}
                                      </span>
                                    </td>
                                    <td className="max-w-[200px] truncate" title={outreach.notes}>
                                      {outreach.notes}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {sortedData.length === 0 && (
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-6 text-center">
                  <p className="text-gray-500">No contacts match the current filter.</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {sortedData.length} of {outreachData.length} contacts
              </div>
              
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Contacts</div>
                  <div className="stat-value text-primary">{outreachData.length}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Interested</div>
                  <div className="stat-value text-success">
                    {outreachData.filter(contact => 
                      contact.outreachHistory.some((o: any) => 
                        ['interested', 'positive'].includes(o.response)
                      )
                    ).length}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Pending</div>
                  <div className="stat-value text-warning">
                    {outreachData.filter(contact => 
                      contact.outreachHistory.some((o: any) => o.status === 'scheduled')
                    ).length}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">
              Add Note for {selectedContact?.contactName}
            </h3>
            <div className="form-control">
              <textarea 
                className="textarea textarea-bordered h-32"
                placeholder="Enter your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => setShowNoteModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddNote}
                className="btn btn-primary"
                disabled={!newNote.trim()}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutreachTracking; 