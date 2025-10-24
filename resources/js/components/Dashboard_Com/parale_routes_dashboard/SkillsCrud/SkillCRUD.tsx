
import { useState } from 'react';
import SkillList from './SkillList';
import CreateSkill from './CreateSkill';
import EditSkill from './EditSkill';


export default function SkillDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selected, setselected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-solid border-whitesmoke">
          <h1 className="text-3xl font-bold">Manage Skills</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
           Create skill
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
          <SkillList
            onEdit={(skill) => {
              setselected(skill);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreateSkill onSuccess={() => setCurrentView('list')} />
        )}
         {currentView === 'edit' && selected && (
          <EditSkill
            skill={selected} 
            onSuccess={() => setCurrentView('list')}
          />
        )} 
      </div>
    </div>
  );
}