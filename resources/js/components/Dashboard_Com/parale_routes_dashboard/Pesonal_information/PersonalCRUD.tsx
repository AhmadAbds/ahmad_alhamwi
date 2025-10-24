
import { useState } from 'react';
import PersonalList from './PersonalList';
import CreatePersonal from './CreatePersonal';
import EditPersonal from './UpdatePersonal';
/* import CategoryList from './CategoryList';
import EditCategory from './EditCategory';
import CreateCategory from './CreateCategory'; */

export default function PersonalDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selected, setselected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-solid border-whitesmoke">
          <h1 className="text-3xl font-bold">Manage personal information</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
           Create personal information
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
          <PersonalList
            onEdit={(personal) => {
              setselected(personal);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreatePersonal onSuccess={() => setCurrentView('list')} />
        )}
        {currentView === 'edit' && selected && (
          <EditPersonal
            personal={selected} 
            onSuccess={() => setCurrentView('list')}
          />
        )}
      </div>
    </div>
  );
}