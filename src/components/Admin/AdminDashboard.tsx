import React, { useState, useEffect } from 'react';

interface EarningsData {
  totalEarnings: number;
  monthlyEarnings: number;
  commissionEarnings: number;
  subscriptionEarnings: number;
  advertisingEarnings: number;
  transactionCount: number;
  activeSubscriptions: number;
}

interface Subscription {
  id: string;
  entrepreneurName: string;
  plan: 'standard' | 'premium' | 'featured';
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}

interface HustlerData {
  id: number;
  name:                         { id: 'users', name: 'MSH Entrepreneurs', icon: '👩‍🎓' },                 { id: 'users', name: 'MSH Entrepreneurs', icon: '👩‍🎓' },        {[
                  { id: 'overview', name: 'Overview', icon: '📊' },
                  { id: 'users', name: 'MSH Entrepreneurs', icon: '👩‍🎓' },
                  { id: 'transactions', name: 'Transactions', icon: '💳' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' }
                ].map((tab) => (g;
  email: string;
  phone: string;
  skill: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  subscriptionStatus: 'paid' | 'unpaid' | 'expired';
}

const AdminDashboard: React.FC = () => {
  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 50000,
    monthlyEarnings: 15000,
    commissionEarnings: 8000,
    subscriptionEarnings: 25000,
    advertisingEarnings: 12000,
    transactionCount: 45,
    activeSubscriptions: 8
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [hustlers, setHustlers] = useState<HustlerData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions' | 'settings'>('overview');

  // Load all data from localStorage
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    try {
      // Load earnings data
      const savedEarnings = localStorage.getItem('adminEarningsData');
      if (savedEarnings) {
        setEarnings(JSON.parse(savedEarnings));
      }

      // Load platform earnings (from subscription hook)
      const platformEarnings = localStorage.getItem('platformEarnings');
      if (platformEarnings) {
        const data = JSON.parse(platformEarnings);
        setEarnings(prev => ({
          ...prev,
          totalEarnings: data.totalSubscriptions || earnings.totalEarnings,
          monthlyEarnings: data.monthlySubscriptions || earnings.monthlyEarnings,
          subscriptionEarnings: data.totalSubscriptions || earnings.subscriptionEarnings,
          activeSubscriptions: data.activeSubscribers || earnings.activeSubscriptions,
          transactionCount: data.totalTransactions || earnings.transactionCount
        }));
      }

      // Load hustlers data
      const savedHustlers = localStorage.getItem('campusHustleData');
      if (savedHustlers) {
        const hustlersData = JSON.parse(savedHustlers);
        const formattedHustlers: HustlerData[] = hustlersData.map((hustler: any, index: number) => ({
          id: hustler.id || index + 1,
          name: hustler.name || 'Unknown',
          email: hustler.email || 'No email',
          phone: hustler.contact || 'No phone',
          skill: hustler.skill || 'General',
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          subscriptionStatus: Math.random() > 0.3 ? 'paid' : 'unpaid'
        }));
        setHustlers(formattedHustlers);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  // Sample subscriptions data
  useEffect(() => {
    const sampleSubscriptions: Subscription[] = [
      {
        id: '1',
        entrepreneurName: 'John Doe',
        plan: 'premium',
        amount: 10000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active'
      },
      {
        id: '2',
        entrepreneurName: 'Jane Smith', 
        plan: 'standard',
        amount: 5000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active'
      },
      {
        id: '3',
        entrepreneurName: 'Mike Johnson',
        plan: 'featured',
        amount: 15000,
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        status: 'active'
      }
    ];
    setSubscriptions(sampleSubscriptions);
  }, []);

  const handleApproveHustler = (id: number) => {
    setHustlers(prev => prev.map(hustler => 
      hustler.id === id ? { ...hustler, status: 'active' } : hustler
    ));
  };

  const handleSuspendHustler = (id: number) => {
    setHustlers(prev => prev.map(hustler => 
      hustler.id === id ? { ...hustler, status: 'suspended' } : hustler
    ));
  };

  const handleDeleteHustler = (id: number) => {
    setHustlers(prev => prev.filter(hustler => hustler.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';  
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'unpaid': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderOverviewTab = () => (
    <>
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {formatCurrency(earnings.totalEarnings)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">This Month</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {formatCurrency(earnings.monthlyEarnings)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-500 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {earnings.transactionCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Active MSH Entrepreneurs</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {earnings.activeSubscriptions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Revenue Breakdown */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Revenue Breakdown
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatCurrency(earnings.subscriptionEarnings)}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">Subscriptions</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" style={{width: '85%'}} />
            </div>
            <div className="text-xs text-gray-500 mt-1">50% of total revenue</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-50 rounded-xl border border-purple-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              {formatCurrency(earnings.commissionEarnings)}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">Commissions</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-500" style={{width: '30%'}} />
            </div>
            <div className="text-xs text-gray-500 mt-1">16% of total revenue</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              {formatCurrency(earnings.advertisingEarnings)}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">Advertising</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400" style={{width: '24%'}} />
            </div>
            <div className="text-xs text-gray-500 mt-1">24% of total revenue</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderUsersTab = () => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              Mary Stuart Hall Entrepreneurs
            </h3>
            <p className="text-sm text-gray-500">Manage all registered entrepreneurs ({hustlers.length} total)</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
            {hustlers.filter(h => h.status === 'active').length} Active
          </div>
        </div>
      </div>
      <div className="p-8">
        {hustlers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Skill</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subscription</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hustlers.map((hustler) => (
                  <tr key={hustler.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {hustler.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{hustler.name}</div>
                          <div className="text-sm text-gray-500">{hustler.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hustler.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {hustler.skill}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(hustler.status)}`}>
                        {hustler.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(hustler.subscriptionStatus)}`}>
                        {hustler.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {hustler.status === 'pending' && (
                          <button
                            onClick={() => handleApproveHustler(hustler.id)}
                            className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            Approve
                          </button>
                        )}
                        {hustler.status === 'active' && (
                          <button
                            onClick={() => handleSuspendHustler(hustler.id)}
                            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteHustler(hustler.id)}
                          className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">No entrepreneurs found</p>
            <p className="text-gray-400 text-sm">MSH entrepreneurs will appear here when they register on the platform</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
      <div className="px-8 py-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mr-3 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          Recent Transactions
        </h3>
        <p className="text-sm text-gray-500">MSH subscription payments and service commissions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Entrepreneur</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.filter(sub => sub.status === 'active').map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">
                      {subscription.entrepreneurName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{subscription.entrepreneurName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    subscription.plan === 'premium' 
                      ? 'bg-purple-100 text-purple-800' 
                      : subscription.plan === 'featured'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {subscription.plan === 'premium' ? 'Premium' : subscription.plan === 'featured' ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(subscription.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscription.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg mr-3 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        Admin Settings
      </h3>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Platform Commission Rate</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                defaultValue="15"
                placeholder="15%"
              />
              <span className="absolute right-3 top-3 text-gray-400 text-sm">%</span>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Monthly Subscription Fee</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                defaultValue="5000"
                placeholder="5000 UGX"
              />
              <span className="absolute right-3 top-3 text-gray-400 text-sm">UGX</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-800 mb-2">Mobile Money Integration</label>
              <p className="text-sm text-blue-700 mb-4">Configure your MTN MoMo or Airtel Money account for automatic earnings deposits and seamless payment processing.</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Configure Payment Gateway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 bg-clip-text text-transparent mb-3">
              MSH Connect Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Monitor Mary Stuart Hall's marketplace performance and manage our amazing entrepreneur community
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                MSH System Online
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                Real-time Hall Data
              </div>
            </div>
          </div>

          {/* Modern Tab Navigation */}
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20">
              <nav className="flex space-x-2">
                {[
                  { id: 'overview', name: 'Overview', icon: '📊' },
                  { id: 'users', name: 'MSH Sisters', icon: '�‍🎓' },
                  { id: 'transactions', name: 'Transactions', icon: '💳' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    } px-6 py-3 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all duration-200 ease-in-out`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'transactions' && renderTransactionsTab()}
          {activeTab === 'settings' && renderSettingsTab()}

          {/* Enhanced Mobile Money Integration Notice */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Mobile Money Integration Ready</h3>
                <div className="text-blue-700 mb-4">
                  <p>Your earnings will be automatically deposited to your mobile money account once payment integration is set up. Configure your MTN MoMo or Airtel Money details in settings.</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Secure payments
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant transfers
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Low fees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
