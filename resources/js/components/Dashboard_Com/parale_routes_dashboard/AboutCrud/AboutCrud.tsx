
import { useState } from 'react';
import AboutList from './AboutList';
import CreateAbout from './CreateAbout';
import EditAbout from './EditAbout';


export default function AboutDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedAbout, setselectedAbout] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-solid border-whitesmoke">
          <h1 className="text-3xl font-bold">Manage About me</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
           Create About
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
          <AboutList 
            onEdit={(About) => {
              setselectedAbout(About);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreateAbout onSuccess={() => setCurrentView('list')} />
        )}
        {currentView === 'edit' && selectedAbout && (
          <EditAbout
            About={selectedAbout} 
            onSuccess={() => setCurrentView('list')}
          />
        )}
      </div>
    </div>
  );
}