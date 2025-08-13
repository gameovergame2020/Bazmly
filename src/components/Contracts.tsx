import React, { useState } from 'react';
import { User } from '../App';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Check,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

interface ContractsProps {
  user: User;
}

interface Contract {
  id: string;
  title: string;
  client: string;
  eventType: string;
  eventDate: string;
  venue: string;
  amount: number;
  status: 'draft' | 'sent' | 'signed' | 'executed' | 'expired';
  createdAt: string;
  signedAt?: string;
  expiresAt: string;
  assignedTo: string;
  templateType: string;
  clauses: string[];
  attachments: string[];
}

export const Contracts: React.FC<ContractsProps> = ({ user }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const contracts: Contract[] = [
    {
      id: '1',
      title: 'Wedding Service Agreement - Aziza & Bobur',
      client: 'Aziza Karimova',
      eventType: 'Wedding',
      eventDate: '2025-03-15',
      venue: 'Grand Hall A',
      amount: 7500,
      status: 'signed',
      createdAt: '2025-01-10',
      signedAt: '2025-01-15',
      expiresAt: '2025-03-20',
      assignedTo: 'Alex Sales',
      templateType: 'Premium Wedding Package',
      clauses: ['Venue rental', 'Catering service', 'Decoration', 'Sound system', 'Photography'],
      attachments: ['floor_plan.pdf', 'menu_options.pdf']
    },
    {
      id: '2',
      title: 'Corporate Event Contract - TechCorp Annual',
      client: 'TechCorp Ltd',
      eventType: 'Corporate Event',
      eventDate: '2025-02-20',
      venue: 'Conference Center',
      amount: 12000,
      status: 'sent',
      createdAt: '2025-01-12',
      expiresAt: '2025-02-15',
      assignedTo: 'Alex Sales',
      templateType: 'Corporate Event Standard',
      clauses: ['Venue rental', 'A/V equipment', 'Catering', 'Security', 'Parking'],
      attachments: ['tech_requirements.pdf']
    },
    {
      id: '3',
      title: 'Birthday Celebration - Olim\'s 50th',
      client: 'Olim Karimov',
      eventType: 'Birthday Party',
      eventDate: '2025-02-10',
      venue: 'Garden Terrace',
      amount: 3500,
      status: 'draft',
      createdAt: '2025-01-16',
      expiresAt: '2025-02-05',
      assignedTo: 'Alex Sales',
      templateType: 'Birthday Party Standard',
      clauses: ['Venue rental', 'Basic catering', 'Decoration', 'Music system'],
      attachments: []
    },
    {
      id: '4',
      title: 'Wedding Contract - Expired',
      client: 'Nodira Sultanova',
      eventType: 'Wedding',
      eventDate: '2025-04-10',
      venue: 'Garden Hall',
      amount: 6000,
      status: 'expired',
      createdAt: '2024-12-20',
      expiresAt: '2025-01-15',
      assignedTo: 'Alex Sales',
      templateType: 'Standard Wedding Package',
      clauses: ['Venue rental', 'Catering service', 'Basic decoration'],
      attachments: ['wedding_menu.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      sent: 'bg-blue-100 text-blue-800 border-blue-200',
      signed: 'bg-green-100 text-green-800 border-green-200',
      executed: 'bg-purple-100 text-purple-800 border-purple-200',
      expired: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      draft: <Edit className="w-4 h-4" />,
      sent: <Clock className="w-4 h-4" />,
      signed: <Check className="w-4 h-4" />,
      executed: <Check className="w-4 h-4" />,
      expired: <AlertCircle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || <FileText className="w-4 h-4" />;
  };

  const filteredContracts = selectedStatus === 'all' 
    ? contracts 
    : contracts.filter(contract => contract.status === selectedStatus);

  const statusCounts = {
    all: contracts.length,
    draft: contracts.filter(c => c.status === 'draft').length,
    sent: contracts.filter(c => c.status === 'sent').length,
    signed: contracts.filter(c => c.status === 'signed').length,
    executed: contracts.filter(c => c.status === 'executed').length,
    expired: contracts.filter(c => c.status === 'expired').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contract Management</h1>
          <p className="text-gray-600 mt-1">Create, manage and track contracts with e-signature</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Contract</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+15%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{contracts.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Contracts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{statusCounts.signed}</h3>
            <p className="text-gray-600 text-sm mt-1">Signed Contracts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-yellow-500 text-sm font-medium">+5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{statusCounts.sent}</h3>
            <p className="text-gray-600 text-sm mt-1">Pending Signature</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+18%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">
              ${contracts.filter(c => c.status === 'signed').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Contract Value</p>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === status
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search contracts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client & Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map(contract => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                        <div className="text-sm text-gray-600">{contract.templateType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{contract.client}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{contract.eventType} • {new Date(contract.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-600">{contract.venue}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${contract.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(contract.status)}`}>
                      {getStatusIcon(contract.status)}
                      <span>{contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>Created: {new Date(contract.createdAt).toLocaleDateString()}</div>
                    {contract.signedAt && (
                      <div>Signed: {new Date(contract.signedAt).toLocaleDateString()}</div>
                    )}
                    <div className={contract.status === 'expired' ? 'text-red-600' : ''}>
                      Expires: {new Date(contract.expiresAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      {contract.status === 'draft' && (
                        <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* E-imzo Integration Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Check className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">E-imzo Integration Ready</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Contracts are ready for integration with Uzbekistan's official e-imzo digital signature system. 
          This ensures legal compliance and authenticity for all contracts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Legal compliance with Uzbek law</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Secure digital signatures</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Automated verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};