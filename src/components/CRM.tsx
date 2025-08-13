import React, { useState } from 'react';
import { User } from '../App';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Calendar,
  DollarSign
} from 'lucide-react';

interface CRMProps {
  user: User;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  value: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  eventType: string;
  eventDate: string;
  notes: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalSpent: number;
  eventsBooked: number;
  rating: number;
  lastBooking: string;
  status: 'active' | 'inactive' | 'vip';
}

export const CRM: React.FC<CRMProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'clients'>('leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Malika Abdullayeva',
      email: 'malika@email.com',
      phone: '+998901234567',
      company: 'Silk Road Events',
      source: 'Website',
      status: 'qualified',
      value: 5000,
      assignedTo: 'Alex Sales',
      createdAt: '2025-01-15',
      lastContact: '2025-01-16',
      eventType: 'Wedding',
      eventDate: '2025-03-15',
      notes: 'Looking for premium wedding package. Budget: $5000-7000'
    },
    {
      id: '2',
      name: 'Davron Toshev',
      email: 'davron@techcorp.uz',
      phone: '+998701234567',
      company: 'TechCorp Uzbekistan',
      source: 'Referral',
      status: 'proposal',
      value: 8000,
      assignedTo: 'Alex Sales',
      createdAt: '2025-01-12',
      lastContact: '2025-01-17',
      eventType: 'Corporate Event',
      eventDate: '2025-02-20',
      notes: 'Annual company celebration. Needs catering for 200 people.'
    },
    {
      id: '3',
      name: 'Nodira Karimova',
      email: 'nodira@gmail.com',
      phone: '+998551234567',
      source: 'Instagram',
      status: 'new',
      value: 2500,
      assignedTo: 'Alex Sales',
      createdAt: '2025-01-17',
      lastContact: '2025-01-17',
      eventType: 'Birthday Party',
      eventDate: '2025-02-10',
      notes: '50th birthday celebration. Interested in garden venue.'
    }
  ];

  const clients: Client[] = [
    {
      id: '1',
      name: 'Aziza Karimova',
      email: 'aziza@email.com',
      phone: '+998901234567',
      totalSpent: 12500,
      eventsBooked: 3,
      rating: 5,
      lastBooking: '2025-01-18',
      status: 'vip'
    },
    {
      id: '2',
      name: 'TechCorp Ltd',
      email: 'events@techcorp.uz',
      phone: '+998701234567',
      company: 'TechCorp Ltd',
      totalSpent: 25000,
      eventsBooked: 8,
      rating: 4,
      lastBooking: '2024-12-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Olim Karimov',
      email: 'olim@email.com',
      phone: '+998551234567',
      totalSpent: 3500,
      eventsBooked: 2,
      rating: 5,
      lastBooking: '2025-01-20',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-purple-100 text-purple-800',
      negotiation: 'bg-orange-100 text-orange-800',
      closed_won: 'bg-green-100 text-green-800',
      closed_lost: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      vip: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLeadScore = (lead: Lead) => {
    let score = 50; // Base score
    if (lead.value > 5000) score += 20;
    if (lead.source === 'Referral') score += 15;
    if (lead.status === 'qualified' || lead.status === 'proposal') score += 20;
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM & Lead Management</h1>
          <p className="text-gray-600 mt-1">Manage leads and client relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'leads' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          }`}
        >
          Leads ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'clients' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          }`}
        >
          Clients ({clients.length})
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{activeTab === 'leads' ? leads.length : clients.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Total {activeTab}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeTab === 'leads' ? '23%' : '4.2'}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {activeTab === 'leads' ? 'Conversion Rate' : 'Avg Rating'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+15%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeTab === 'leads' ? '$15,500' : '$41,000'}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {activeTab === 'leads' ? 'Pipeline Value' : 'Total Revenue'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeTab === 'leads' ? '5' : '13'}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {activeTab === 'leads' ? 'This Month' : 'Events Booked'}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      {activeTab === 'leads' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600 flex items-center space-x-2">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="text-sm text-gray-600 flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{lead.eventType}</div>
                      <div className="text-sm text-gray-600">{lead.eventDate}</div>
                      <div className="text-xs text-gray-500">Source: {lead.source}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">${lead.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${getLeadScore(lead)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{getLeadScore(lead)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                  {client.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-1">{client.name}</h3>
              {client.company && (
                <p className="text-sm text-gray-600 mb-2">{client.company}</p>
              )}
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Spent</p>
                  <p className="font-medium text-gray-900">${client.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Events</p>
                  <p className="font-medium text-gray-900">{client.eventsBooked}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Last booking: {new Date(client.lastBooking).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};