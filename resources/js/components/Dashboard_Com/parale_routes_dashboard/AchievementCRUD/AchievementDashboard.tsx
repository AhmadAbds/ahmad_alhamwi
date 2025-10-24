// components/dashboard/HeaderDashboard.tsx
import { useState } from 'react';
import AchieveList from './AchievementList';
import CreateAchievements from './CreateAchievement';
import EditAchiev from './EditAchievement';
/* import HeaderList from './HeaderList';
import CreateHeader from './CreateHeader';
import EditHeader from './EditHeader'; */

export default function AchievementDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-solid border-whitesmoke">
          <h1 className="text-3xl font-bold">Manage Achievements</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
           Create Achievement
            </button>
          )}
          {currentView !== 'list' && (
            <button
              onClick={() => setCurrentView('list')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
             Back
            </button>
          )}
        </div>

        {/* Content */}
        {currentView === 'list' && (
          <AchieveList 
            onEdit={(achievement) => {
              setSelected(achievement);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreateAchievements onSuccess={() => setCurrentView('list')} />
        )}
        {currentView === 'edit' && selected && (
          <EditAchiev
            achievemet={selected} 
            onSuccess={() => setCurrentView('list')}
          />
        )}
      </div>
    </div>
  );
}