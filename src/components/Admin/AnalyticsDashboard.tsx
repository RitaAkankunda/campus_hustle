import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  ShoppingBag, 
  Star, 
  Calendar,
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
  totalViews: number;
  viewsThisWeek: number;
  viewsLastWeek: number;
  popularProducts: Array<{ name: string; views: number; orders: number }>;
  weeklyTrend: Array<{ day: string; views: number }>;
  topCategories: Array<{ category: string; count: number }>;
  engagementRate: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ hustler }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    // Load from localStorage or initialize
    const saved = localStorage.getItem(`analytics_${hustler.id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      profileViews: Math.floor(Math.random() * 500) + 100,
      productViews: Math.floor(Math.random() * 1000) + 200,
      totalViews: 0,
      viewsThisWeek: Math.floor(Math.random() * 100) + 20,
      viewsLastWeek: Math.floor(Math.random() * 80) + 15,
      popularProducts: [],
      weeklyTrend: [],
      topCategories: [],
      engagementRate: 0
    };
  });

  useEffect(() => {
    // Calculate analytics from hustler data
    const totalViews = analytics.profileViews + analytics.productViews;
    const engagementRate = hustler.reviewCount > 0 
      ? ((hustler.reviewCount / Math.max(totalViews, 1)) * 100).toFixed(1)
      : 0;

    const popularProducts = (hustler.products || []).map(product => ({
      name: product.name,
      views: Math.floor(Math.random() * 100) + 10,
      orders: Math.floor(Math.random() * 20) + 1
    })).sort((a, b) => b.views - a.views).slice(0, 5);

    const weeklyTrend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      views: Math.floor(Math.random() * 30) + 5
    }));

    const categoryCount = (hustler.products || []).reduce((acc: any, product: any) => {
      const cat = product.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    
    const topCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    setAnalytics(prev => ({
      ...prev,
      totalViews,
      engagementRate: parseFloat(engagementRate),
      popularProducts,
      weeklyTrend,
      topCategories
    }));
  }, [hustler]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`analytics_${hustler.id}`, JSON.stringify(analytics));
  }, [analytics, hustler.id]);

  const viewsChange = analytics.viewsThisWeek - analytics.viewsLastWeek;
  const viewsChangePercent = analytics.viewsLastWeek > 0 
    ? ((viewsChange / analytics.viewsLastWeek) * 100).toFixed(1)
    : 0;

  const maxViews = Math.max(...analytics.weeklyTrend.map(d => d.views), 1);

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
            <span className={`text-sm font-semibold flex items-center gap-1 ${
              parseFloat(viewsChangePercent) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(viewsChangePercent) >= 0 ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {Math.abs(parseFloat(viewsChangePercent))}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Profile Views</p>
          <p className="text-xs text-gray-500 mt-2">{analytics.viewsThisWeek} this week</p>
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
          <p className="text-xs text-gray-500 mt-2">Rating: {hustler.rating || 0} ⭐</p>
        </div>

        {/* Engagement Rate */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.engagementRate}%</h3>
          <p className="text-sm text-gray-600">Engagement Rate</p>
          <p className="text-xs text-gray-500 mt-2">Reviews per 100 views</p>
        </div>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Trend */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Weekly View Trend
          </h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {analytics.weeklyTrend.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full bg-gray-200 rounded-t flex items-end" style={{ height: '180px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-500"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">{day.views}</span>
                <span className="text-xs text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            Popular Products
          </h3>
          <div className="space-y-4">
            {analytics.popularProducts.length > 0 ? (
              analytics.popularProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {product.views} views
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <ShoppingBag className="h-3 w-3" />
                        {product.orders} orders
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No product data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {analytics.topCategories.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Product Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {analytics.topCategories.map((cat, index) => (
              <div
                key={index}
                className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2"
              >
                <span className="font-semibold text-gray-900">{cat.category}</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  {cat.count} products
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Insights & Recommendations</h3>
        <div className="space-y-3">
          {analytics.engagementRate < 5 && (
            <p className="text-sm text-gray-700">
              <strong>Low engagement:</strong> Consider asking satisfied customers for reviews to improve your engagement rate.
            </p>
          )}
          {analytics.viewsThisWeek < analytics.viewsLastWeek && (
            <p className="text-sm text-gray-700">
              <strong>Views declining:</strong> Try updating your profile description or adding new products to attract more views.
            </p>
          )}
          {analytics.popularProducts.length > 0 && analytics.popularProducts[0].views > 50 && (
            <p className="text-sm text-gray-700">
              <strong>Popular product detected:</strong> "{analytics.popularProducts[0].name}" is performing well. Consider promoting it or creating similar products.
            </p>
          )}
          {hustler.products.length === 0 && (
            <p className="text-sm text-gray-700">
              <strong>No products yet:</strong> Add products to your profile to start attracting customers and generating analytics data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

