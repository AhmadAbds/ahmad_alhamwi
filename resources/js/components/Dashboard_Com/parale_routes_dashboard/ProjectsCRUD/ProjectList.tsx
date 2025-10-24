import { useEffect, useState } from 'react';
import { ProjectData } from '../../../../types/index';
import { projectService } from '../../../../services/api';
import FormattedContent from './Formatted_content';

interface ProjectListProps {
  onEdit: (project: ProjectData) => void;
}

export default function ProjectList({ onEdit }: ProjectListProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectService.getProjects();
       const Data = Array.isArray(response) ? response : [response];
        setProjects(Data);
    } catch (err: any) {
      console.error('❌ Error loading projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
      console.log('✅ Project deleted successfully');
    } catch (err: any) {
      console.error('❌ Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  // إضافة useEffect لمراقبة تغييرات projects
  useEffect(() => {
    console.log('📊 Current projects state:', projects);
  }, [projects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={loadProjects}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded ml-4 mt-2 sm:mt-0"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Projects List</h2>
        <p style={{ color:"seagreen" , fontWeight:"700" }} className="text-lg mt-1">
          Total projects: {projects.length}
        </p>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📁</div>
          <p className="text-gray-500 text-lg">No projects found</p>
          <p className="text-gray-400">Start by creating a new project</p>
          <button
            onClick={loadProjects}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Project Information */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                        onError={(e) => {
                          console.error('❌ Image load error for:', project.image);
                          e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title || 'No Title'}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {project.classification_type || 'No Classification'}
                      </p>
                      <p className="text-sm mt-1">
                        {project.summary || 'No summary available'}
                      </p>
                      
                    </div>
                  </div>
                   {/* المحتوى المنسق مع الأنماط */}
      <FormattedContent
                            formatted_content={project.formatted_content || "don't have formatted"}
                            styles={project.content_styles}
                            className="max-h-96 overflow-y-auto"
                          />
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    {project.github && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </span>
                    )}
                    {project.visit && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        Visit
                      </span>
                    )}
                    {project.video && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log('✏️ Editing project:', project);
                      onEdit(project);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      console.log('🗑️ Deleting project ID:', project.id);
                      project.id && handleDelete(project.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
              
              {/* Debug Info - يمكن إزالته لاحقاً */}
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                <p className="text-gray-600">Debug: ID: {project.id} | Image: {project.image ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}