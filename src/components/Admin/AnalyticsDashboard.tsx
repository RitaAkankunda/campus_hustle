import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Star, 
  BarChart3,
  ArrowUp,
  ArrowDown,
  Package
} from 'lucide-react';
import { Hustler } from '../../types';

interface AnalyticsDashboardProps {
  hustler: Hustler;
}

interface AnalyticsData {
  profileViews: number;
  productViews: number;
  viewsThisWeek: number;
  viewsLastWeek: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ hustler }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    profileViews: 0,
    productViews: 0,
    viewsThisWeek: 0,
    viewsLastWeek: 0
  });

  useEffect(() => {
    // Fetch real analytics from backend
    const fetchAnalytics = async () => {
      try {
        // In a real app, this would fetch from /api/hustlers/:id/analytics
        // For now, all analytics start at 0 and will be populated by real tracking
        // TODO: Implement backend analytics tracking endpoint
        setAnalytics({
          profileViews: 0, // Real data from backend tracking
          productViews: 0, // Real data from backend tracking
          viewsThisWeek: 0, // Real data from backend tracking
          viewsLastWeek: 0 // Real data from backend tracking
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchAnalytics();
  }, [hustler.id]);

  const totalViews = analytics.profileViews + analytics.productViews;
  const engagementRate = hustler.reviewCount > 0 && totalViews > 0
    ? parseFloat(((hustler.reviewCount / totalViews) * 100).toFixed(1))
    : 0;

  const viewsChange = analytics.viewsThisWeek - analytics.viewsLastWeek;
  const viewsChangePercent = analytics.viewsLastWeek > 0 
    ? parseFloat(((viewsChange / analytics.viewsLastWeek) * 100).toFixed(1))
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-sm text-gray-600">Track your profile performance</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Views */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-8 w-8 text-blue-600" />
            {analytics.viewsLastWeek > 0 && (
              <span className={`text-sm font-semibold flex items-center gap-1 ${
                viewsChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {viewsChangePercent >= 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {Math.abs(viewsChangePercent).toFixed(1)}%
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Profile Views</p>
          {analytics.viewsThisWeek > 0 && (
            <p className="text-xs text-gray-500 mt-2">{analytics.viewsThisWeek} this week</p>
          )}
        </div>

        {/* Product Views */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.productViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Product Views</p>
          <p className="text-xs text-gray-500 mt-2">Across all products</p>
        </div>

        {/* Reviews */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-yellow-600 fill-yellow-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{hustler.reviewCount || 0}</h3>
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-xs text-gray-500 mt-2">
            {hustler.reviewCount > 0 ? (
              <>Rating: {hustler.rating?.toFixed(1) || '0'} ⭐</>
            ) : (
              <>No ratings yet</>
            )}
          </p>
        </div>

        {/* Engagement Rate */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {parseFloat(engagementRate) > 0 ? engagementRate : '0'}%
          </h3>
          <p className="text-sm text-gray-600">Engagement Rate</p>
          <p className="text-xs text-gray-500 mt-2">Reviews per 100 views</p>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;

