
import { useState } from 'react';
import ClassificationList from './ClassificationList';
import CreateClassification from './CreateClassification';
import EditClassi from './EditClassification';


export default function ClassiDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selected, setselected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-solid border-whitesmoke">
          <h1 className="text-3xl font-bold">Manage Classifications</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
           Create Classification
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
          <ClassificationList
            onEdit={(Classification) => {
              setselected(Classification);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreateClassification onSuccess={() => setCurrentView('list')} />
        )}
        {currentView === 'edit' && selected && (
          <EditClassi
            classification={selected} 
            onSuccess={() => setCurrentView('list')}
          />
        )}
      </div>
    </div>
  );
}