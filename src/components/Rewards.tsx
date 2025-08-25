import React from 'react';
import { GamificationReward } from '../types';

interface RewardsProps {
  rewards: GamificationReward[];
}

const Rewards: React.FC<RewardsProps> = ({ rewards }) => {
  if (!rewards.length) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Your Rewards</h2>
      <div className="flex flex-wrap gap-4">
        {rewards.map(r => (
          <div key={r.id} className="flex flex-col items-center bg-purple-50 rounded-lg p-4 min-w-[120px]">
            <span className="text-3xl mb-2">{r.icon}</span>
            <div className="font-semibold text-purple-800">{r.name}</div>
            <div className="text-xs text-gray-500 mb-1">{r.description}</div>
            {r.value && <div className="text-sm font-bold text-blue-600">+{r.value}</div>}
            <div className="text-xs text-gray-400 mt-1">{new Date(r.awardedAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
