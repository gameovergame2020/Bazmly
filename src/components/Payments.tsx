import React, { useState } from 'react';
import { User } from '../App';
import { 
  CreditCard, 
  DollarSign, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Clock,
  Check,
  AlertCircle,
  Download,
  Eye,
  Calendar
} from 'lucide-react';

interface PaymentsProps {
  user: User;
}

interface Payment {
  id: string;
  invoiceId: string;
  client: string;
  eventTitle: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  transactionId?: string;
  currency: string;
  notes: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'cash' | 'crypto' | 'local';
  icon: string;
  enabled: boolean;
  fees: string;
}

export const Payments: React.FC<PaymentsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'methods' | 'reports'>('invoices');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const payments: Payment[] = [
    {
      id: '1',
      invoiceId: 'INV-2025-001',
      client: 'Aziza Karimova',
      eventTitle: 'Wedding - Aziza & Bobur',
      amount: 7500,
      paidAmount: 7500,
      dueDate: '2025-01-15',
      paidDate: '2025-01-14',
      status: 'paid',
      paymentMethod: 'Uzcard',
      transactionId: 'UZC789123456',
      currency: 'UZS',
      notes: 'Full payment received via Uzcard'
    },
    {
      id: '2',
      invoiceId: 'INV-2025-002',
      client: 'TechCorp Ltd',
      eventTitle: 'Corporate Event - Annual Meeting',
      amount: 12000,
      paidAmount: 6000,
      dueDate: '2025-01-25',
      status: 'partial',
      paymentMethod: 'Bank Transfer',
      transactionId: 'BT456789',
      currency: 'USD',
      notes: '50% advance payment received'
    },
    {
      id: '3',
      invoiceId: 'INV-2025-003',
      client: 'Olim Karimov',
      eventTitle: 'Birthday Party - 50th Celebration',
      amount: 3500,
      paidAmount: 0,
      dueDate: '2025-01-20',
      status: 'pending',
      currency: 'UZS',
      notes: 'Awaiting client payment'
    },
    {
      id: '4',
      invoiceId: 'INV-2025-004',
      client: 'Nodira Sultanova',
      eventTitle: 'Wedding Reception',
      amount: 6000,
      paidAmount: 0,
      dueDate: '2025-01-10',
      status: 'overdue',
      currency: 'USD',
      notes: 'Payment overdue - client contacted'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      name: 'Uzcard',
      type: 'local',
      icon: '💳',
      enabled: true,
      fees: '1.5%'
    },
    {
      id: '2',
      name: 'Humo',
      type: 'local',
      icon: '💳',
      enabled: true,
      fees: '1.3%'
    },
    {
      id: '3',
      name: 'Click',
      type: 'local',
      icon: '📱',
      enabled: true,
      fees: '2.0%'
    },
    {
      id: '4',
      name: 'Payme',
      type: 'local',
      icon: '📱',
      enabled: true,
      fees: '1.8%'
    },
    {
      id: '5',
      name: 'VISA/MasterCard',
      type: 'card',
      icon: '💳',
      enabled: true,
      fees: '2.5%'
    },
    {
      id: '6',
      name: 'Bank Transfer',
      type: 'bank',
      icon: '🏦',
      enabled: true,
      fees: '0.5%'
    },
    {
      id: '7',
      name: 'Cash',
      type: 'cash',
      icon: '💵',
      enabled: true,
      fees: '0%'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      partial: 'bg-blue-100 text-blue-800 border-blue-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      overdue: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      partial: <AlertCircle className="w-4 h-4" />,
      paid: <Check className="w-4 h-4" />,
      overdue: <AlertCircle className="w-4 h-4" />,
      cancelled: <AlertCircle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || <Clock className="w-4 h-4" />;
  };

  const filteredPayments = selectedStatus === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === selectedStatus);

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'partial').reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Handle invoices, payments and local payment integration</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {['invoices', 'methods', 'reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-500 text-sm font-medium">Pending</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${pendingPayments.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Pending Payments</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-red-500 text-sm font-medium">Overdue</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${overdueAmount.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Overdue Amount</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">95%</h3>
            <p className="text-gray-600 text-sm mt-1">Collection Rate</p>
          </div>
        </div>
      </div>

      {activeTab === 'invoices' && (
        <>
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'partial', 'paid', 'overdue'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && ` (${payments.filter(p => p.status === status).length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client & Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{payment.invoiceId}</div>
                            {payment.transactionId && (
                              <div className="text-sm text-gray-600">TXN: {payment.transactionId}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{payment.client}</div>
                        <div className="text-sm text-gray-600">{payment.eventTitle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.currency} {payment.amount.toLocaleString()}
                        </div>
                        {payment.paidAmount > 0 && payment.paidAmount < payment.amount && (
                          <div className="text-sm text-green-600">
                            Paid: {payment.currency} {payment.paidAmount.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.paymentMethod || 'Not selected'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(payment.dueDate).toLocaleDateString()}</span>
                        </div>
                        {payment.paidDate && (
                          <div className="text-green-600 text-xs">
                            Paid: {new Date(payment.paidDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'methods' && (
        <div className="space-y-6">
          {/* Local Payment Integration */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Uzbekistan Payment Integration</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Integrated with leading Uzbek payment systems including Uzcard, Humo, Click, and Payme. 
              Supports multi-currency transactions (UZS, USD, EUR).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Real-time payment processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Automatic fiscal receipt generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Central Bank compliance</span>
              </div>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map(method => (
              <div key={method.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{method.type} payment</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${method.enabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium text-gray-900">{method.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${method.enabled ? 'text-green-600' : 'text-red-600'}`}>
                      {method.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <button className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  method.enabled 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {method.enabled ? 'Configure' : 'Enable'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Revenue by Payment Method</h4>
                <div className="space-y-2">
                  {paymentMethods.slice(0, 5).map(method => (
                    <div key={method.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{method.icon}</span>
                        <span>{method.name}</span>
                      </div>
                      <span className="font-medium">${Math.floor(Math.random() * 10000).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monthly Trends</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Payment Value:</span>
                    <span className="font-medium">$5,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Success Rate:</span>
                    <span className="font-medium text-green-600">95.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Processing Time:</span>
                    <span className="font-medium">2.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Popular Method:</span>
                    <span className="font-medium">Uzcard (45%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};