import { useState } from 'react';
import ProjectList from './ProjectList';
import CreateProject from './CreateProject';
import { ProjectData } from '@/types';
import EditProject from './EditProject'; 

export default function ProjectDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          {currentView === 'list' && (
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Project
            </button>
          )}
          {currentView !== 'list' && (
            <button
              onClick={() => setCurrentView('list')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to List
            </button>
          )}
        </div>

        {/* Content */}
        {currentView === 'list' && (
          <ProjectList 
            onEdit={(project) => {
              setSelectedProject(project);
              setCurrentView('edit');
            }}
          />
        )}
        {currentView === 'create' && (
          <CreateProject onSuccess={() => setCurrentView('list')} />
        )}
         {currentView === 'edit' && selectedProject && (
          <EditProject 
            project={selectedProject} 
            onSuccess={() => setCurrentView('list')}
          />
        )} 
      </div>
    </div>
  );
}