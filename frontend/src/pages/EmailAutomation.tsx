import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward, MdOutlineEmail, MdScheduleSend, MdSend, MdOutlinePersonAdd } from 'react-icons/md';
import { FaRegCopy, FaRegEdit, FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Facility {
  id: number;
  name: string;
  industry: string;
  location: string;
  manager: string;
  email: string;
  phone: string;
  analysis: {
    facilityType: string;
    squareFootage: number;
    energyRate: number;
    roofArea: number;
  };
  energyEstimation: {
    annualUsage: number;
    annualCost: number;
  };
  solarPotential: {
    calculated: boolean;
    maxPanels: number;
    annualProduction: number;
    installationCost: number;
    annualSavings: number;
    paybackPeriod: number;
    roi: number;
  };
  emailStatus: {
    drafted: boolean;
    sent: boolean;
    scheduled: boolean;
    scheduledDate?: Date;
  };
}

const EmailAutomation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('independent_research');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Email templates
  const templates = [
    {
      id: 'independent_research',
      name: 'Independent Research',
      subject: 'Independent research on {{company}}\'s energy savings',
      body: `Hey {{name}},

I came across {{company}} and was really impressed by your work in the renewable energy sector. I decided to run some independent research on your facility at {{location}} to see if solar could be a game-changer for you.

Based on our calculations, your facility's estimated energy usage is 249,087 kWh per year, with a rough annual electricity cost of £77,217. If you were to install 155.7 kW of solar panels, you could generate 1823% of your energy needs in-house and save around £47,892 per year. With available solar incentives, your return on investment would be just 8.2 years.

Would you be interested in seeing a visualisation of this data? I'll send it right away!

Best,
Your Name`
    },
    {
      id: 'solar_intro',
      name: 'Solar Introduction',
      subject: 'Reduce Energy Costs with Solar - Personalized Analysis for {{company}}',
      body: `Dear {{name}},

I hope this email finds you well. I'm reaching out because we've conducted an analysis of {{company}}'s facility at {{location}} and identified significant potential for solar energy savings.

Our analysis shows:
• Potential annual savings of $77,217
• 155.7 kW system capacity
• 622 solar panels
• 1823% energy coverage

Would you be available for a 15-minute call next week to discuss how these savings could benefit {{company}}?

Best regards,
Your Name
Solar Energy Consultant`
    },
    {
      id: 'solar_followup',
      name: 'Solar Follow-up',
      subject: 'Following Up: Solar Energy Savings for {{company}}',
      body: `Dear {{name}},

I wanted to follow up on my previous email regarding the solar energy potential we identified for {{company}}'s facility.

Our analysis indicates that implementing solar energy at your facility could result in:
• Significant reduction in energy costs
• Protection against rising utility rates
• Enhanced sustainability profile
• Potential tax incentives and rebates

I'd be happy to share our detailed analysis with you. Would you have time for a brief call this week?

Best regards,
Your Name
Solar Energy Consultant`
    },
    {
      id: 'solar_proposal',
      name: 'Solar Proposal',
      subject: 'Solar Energy Proposal for {{company}}',
      body: `Dear {{name}},

Thank you for your interest in exploring solar energy solutions for {{company}}. As promised, I've attached our detailed proposal for your facility at {{location}}.

Key highlights of our proposal:
• System Size: 155.7 kW
• Annual Production: 249,087 kWh
• Annual Savings: $77,217
• ROI Timeline: Detailed in the attached proposal
• Environmental Impact: Reduction of 176 tons of CO2 annually

Please review the attached proposal at your convenience. I'm available to answer any questions you might have or to schedule a site visit.

Best regards,
Your Name
Solar Energy Consultant`
    }
  ];
  
  // Contact data
  const contacts = [
    {
      id: 1,
      name: "Jeff Levy",
      email: "j.levy@example.com",
      company: "Apple",
      location: "Atlanta, GA",
      position: "Facilities Manager"
    },
    {
      id: 2,
      name: "Amy Huke",
      email: "a.huke@example.com",
      company: "Honeywell",
      location: "Kansas City, MO",
      position: "Facilities Manager"
    },
    {
      id: 3,
      name: "Ryan Kuddes",
      email: "r.kuddes@example.com",
      company: "Apple",
      location: "Denver, CO",
      position: "Facilities Manager"
    },
    {
      id: 4,
      name: "Zuretti Carter",
      email: "z.carter@example.com",
      company: "ChargePoint",
      location: "San Francisco, CA",
      position: "Facilities Manager"
    },
    {
      id: 5,
      name: "Scott Simpson",
      email: "s.simpson@example.com",
      company: "Plexus Corp.",
      location: "Neenah, WI",
      position: "Facilities Manager"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Set default template
      const defaultTemplate = templates.find(t => t.id === 'independent_research');
      if (defaultTemplate) {
        setEmailSubject(defaultTemplate.subject);
        setEmailBody(defaultTemplate.body);
      }
      
      // Set default selected contacts
      setSelectedContacts([contacts[0].name, contacts[2].name]);
      
      // Default scheduled date/time (tomorrow at 9am)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setScheduledDate(tomorrow.toISOString().split('T')[0]);
      setScheduledTime('09:00');
    }, 1000);
  }, []);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const handleContactToggle = (name: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleSendEmails = () => {
    if (selectedContacts.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }
    
    toast.success(`${selectedContacts.length} emails scheduled for ${scheduledDate} at ${scheduledTime}`);
    
    // Navigate to outreach tracking after a short delay
    setTimeout(() => {
      navigate('/outreach-tracking');
    }, 1500);
  };

  const handleContinueToOutreachTracking = () => {
    navigate('/outreach-tracking');
  };

  const personalize = (text: string, contact: any) => {
    return text
      .replace(/{{name}}/g, contact.name)
      .replace(/{{company}}/g, contact.company)
      .replace(/{{location}}/g, contact.location)
      .replace(/{{position}}/g, contact.position);
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
              onClick={() => navigate('/solar-panel-potential')}
              className="btn btn-circle btn-ghost"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-2xl font-bold">Email Automation</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Email Templates */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                <MdOutlineEmail className="text-primary" />
                Email Templates
              </h2>
              <div className="mt-4">
                <div className="flex flex-col gap-3">
                  {templates.map(template => (
                    <div 
                      key={template.id}
                      className={`card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      <div className="card-body p-4">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{template.subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end mt-4">
                  <button className="btn btn-sm btn-outline gap-2">
                    <FaRegEdit size={16} />
                    Create New Template
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Column - Email Editor */}
          <div className="card bg-base-100 shadow-lg lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                <FaRegEdit className="text-primary" />
                Email Editor
              </h2>
              <div className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Body</span>
                  </label>
                  <textarea 
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="textarea textarea-bordered h-64"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <button className="btn btn-sm btn-outline gap-2">
                    <FaRegCopy size={16} />
                    Copy
                  </button>
                  <button className="btn btn-sm btn-outline gap-2">
                    <FaRegSave size={16} />
                    Save as Template
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Selection */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                <MdOutlinePersonAdd className="text-primary" />
                Select Recipients
              </h2>
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  {contacts.map(contact => (
                    <div 
                      key={contact.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
                    >
                      <input 
                        type="checkbox" 
                        className="checkbox"
                        checked={selectedContacts.includes(contact.name)}
                        onChange={() => handleContactToggle(contact.name)}
                      />
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.email}</div>
                        <div className="text-xs text-gray-500">{contact.company} - {contact.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <span className="text-sm">
                    {selectedContacts.length} contacts selected
                  </span>
                  <button className="btn btn-sm btn-outline">
                    Import Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Email Preview */}
          <div className="card bg-base-100 shadow-lg lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                <MdOutlineEmail className="text-primary" />
                Email Preview
              </h2>
              <div className="mt-4">
                {selectedContacts.length > 0 ? (
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <span className="font-medium">To:</span> {contacts.find(c => c.name === selectedContacts[0])?.email}
                      {selectedContacts.length > 1 && ` +${selectedContacts.length - 1} more`}
                    </div>
                    <div className="mb-4">
                      <span className="font-medium">Subject:</span> {personalize(emailSubject, contacts.find(c => c.name === selectedContacts[0]))}
                    </div>
                    <div className="whitespace-pre-line border-t pt-4">
                      {personalize(emailBody, contacts.find(c => c.name === selectedContacts[0]))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Select a contact to preview the personalized email
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Schedule */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                <MdScheduleSend className="text-primary" />
                Schedule Delivery
              </h2>
              <div className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input 
                    type="date" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input 
                    type="time" 
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div className="form-control">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox" />
                    <span className="label-text">Send follow-up if no response after 3 days</span>
                  </label>
                </div>
                
                <button 
                  onClick={handleSendEmails}
                  className="btn btn-primary w-full gap-2"
                  disabled={selectedContacts.length === 0}
                >
                  <MdSend size={18} />
                  {selectedContacts.length > 0 
                    ? `Schedule ${selectedContacts.length} Emails` 
                    : 'Select Recipients First'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            onClick={handleContinueToOutreachTracking}
            className="btn btn-primary btn-lg flex items-center gap-2"
          >
            Continue to Outreach Tracking
            <MdArrowForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomation; 