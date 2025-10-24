import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { ProjectData, ProjectFormData, ContentStyles, ClassificationData } from '../../../../types/index';
import { classificationService, projectService } from '../../../../services/api';
import TextEditor from './TextEditor';

interface EditProjectProps {
  project: ProjectData;
  onSuccess: () => void;
}

export default function EditProject({ project, onSuccess }: EditProjectProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    classification_id: project.classification_id || 0,
    image: null,
    title: project.title || '',
    summary: project.summary || '',
    visit: project.visit || '',
    video: project.video || '',
    github: project.github || '',
    description: project.description || '',
    formatted_content: project.formatted_content || '',
    content_styles: project.content_styles || {}
  });
   const [Classifications, setClassifications] = useState<ClassificationData[]>([])
  const [previewImage, setPreviewImage] = useState<string>(project.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNewImage, setHasNewImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // تهيئة البيانات عند تغيير المشروع
    fetchClassifications();
    setFormData({
      classification_id: project.classification_id || 0,
      image: null,
      title: project.title || '',
      summary: project.summary || '',
      visit: project.visit || '',
      video: project.video || '',
      github: project.github || '',
      description: project.description || '',
      formatted_content: project.formatted_content || '',
      content_styles: project.content_styles || {}
    });
    setPreviewImage(project.image || '');
    setHasNewImage(false);
    setError(null);
  }, [project]);

    const fetchClassifications = async () => {
      try {
        const classificationData = await classificationService.getclassification();
        setClassifications(classificationData);
       /*  if (categoriesData.length > 0) {
          setCategory_id(categoriesData[0].id);
        } */
      } catch (err) {
        console.error('❌ خطأ في جلب الفئات:', err);
      }
    };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setHasNewImage(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewImage(project.image || '');
    setHasNewImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.id) return;

    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append('classification_id', formData.classification_id.toString());
      submitData.append('title', formData.title);
      submitData.append('summary', formData.summary);
      submitData.append('visit', formData.visit);
      submitData.append('video', formData.video);
      submitData.append('github', formData.github);
      submitData.append('description', formData.description);
      submitData.append('formatted_content', formData.formatted_content);
      submitData.append('content_styles', JSON.stringify(formData.content_styles));
      submitData.append('_method', 'PUT');

      // إضافة الصورة فقط إذا تم تغييرها
      if (hasNewImage && formData.image) {
        submitData.append('image', formData.image);
      }

      await projectService.updateProject(project.id, submitData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      console.error('Error updating project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'classification_id' ? parseInt(value) : value 
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, formatted_content: content }));
  };const handleStylesChange = (styles: ContentStyles) => {
    setFormData(prev => ({ ...prev, content_styles: styles }));
  };

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Edit Project</h2>
        <p className="text-gray-400">Update project details and content</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classification */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Classification
            </label>
            <select
              name="classification_id"
              value={formData.classification_id}
              onChange={handleChange}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>Select Classification</option>
              {Classifications.map((classification) => (
              <option key={classification.id} value={classification.id}>
                {classification.type}
              </option>
            ))}
              
            </select>
            {project.classification_type && (
              <p className="text-sm text-gray-500 mt-1">
                Current: {project.classification_type}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project title"
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Summary
          </label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief project summary"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium  mb-2">
              GitHub URL
            </label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Visit URL (Optional)
            </label>
            <input
              type="text"
              name="visit"
              value={formData.visit}
              onChange={handleChange}
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"/>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Video URL (Optional)
            </label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        {/* Project Image */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Project Image {hasNewImage ? '(New)' : '(Current)'}
          </label>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-28 h-28 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              {!hasNewImage && project.image && (
                <p className="text-xs text-gray-500 mt-2 text-center">Current image</p>
              )}
            </div>

            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="project_image"
              />
              <label
                htmlFor="project_image"
                className="cursor-pointer border border-gray-300 rounded-lg p-4 block hover:bg-gray-50"
              >
                <div className="text-center">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    {hasNewImage ? 'Change image' : 'Click to change image'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {hasNewImage ? 'New image selected' : 'PNG, JPG, JPEG up to 5MB'}
                  </p>
                </div>
              </label>
              
              {hasNewImage && formData.image && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                  <p className="text-blue-600">New image selected:</p>
                  <p className="text-blue-500 truncate">{formData.image.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Project description"
          />
        </div>

        {/* Text Editor */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Formatted Content
          </label>
          <TextEditor
            value={formData.formatted_content}
            onChange={handleContentChange}
            styles={formData.content_styles}
            onStylesChange={handleStylesChange}
          />
        </div>

        {/* Preview of Current Styles */}
        {project.content_styles && Object.keys(project.content_styles).length > 0 && (
          <div className="p-4 bg-slate-400 rounded-lg">
            <h4 className="font-semibold mb-2">Current Content Styles:</h4>
            <div className="text-sm text-gray-600 font-semibold space-y-1">
              {project.content_styles.color && (
                <div>Color: <span className="font-mono">{project.content_styles.color}</span></div>
              )}
              {project.content_styles.fontSize && (
                <div>Font Size: <span className="font-mono">{project.content_styles.fontSize}px</span></div>
              )}
              {project.content_styles.fontWeight && (
                <div>Font Weight: <span className="font-mono">{project.content_styles.fontWeight}</span></div>
              )}
              {project.content_styles.fontStyle && (
                <div>Font Style: <span className="font-mono">{project.content_styles.fontStyle}</span></div>
              )}
              {project.content_styles.textAlign && (
                <div>Text Align: <span className="font-mono">{project.content_styles.textAlign}</span></div>
              )}
              {project.content_styles.lineHeight && (
                <div>Line Height: <span className="font-mono">{project.content_styles.lineHeight}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Project
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onSuccess}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                classification_id: project.classification_id || 0,
                image: null,
                title: project.title || '',
                summary: project.summary || '',
                visit: project.visit || '',video: project.video || '',
                github: project.github || '',
                description: project.description || '',
                formatted_content: project.formatted_content || '',
                content_styles: project.content_styles || {}
              });
              setPreviewImage(project.image || '');
              setHasNewImage(false);
              setError(null);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Reset Changes
          </button>
        </div>
      </form>
    </div>
  );
}