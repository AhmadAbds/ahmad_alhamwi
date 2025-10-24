// components/dashboard/EditHeader.tsx
import { useState, useEffect} from 'react';
import { ClassificationData, ClassificationFormData} from '@/types';
import {  classificationService} from '../../../../services/api';

interface EditClassiProps {
  classification: ClassificationData;
  onSuccess: () => void;
}

export default function EditClassi({ classification, onSuccess }: EditClassiProps) {
  const [formData, setFormData] = useState<ClassificationFormData>({
    type: classification.type
  });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setFormData({
        type: classification.type
    });
  }, [classification]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classification.id) return;
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);
      formDataToSend.append('_method', 'PUT');

      await classificationService.updateClassification(classification.id, formDataToSend);
      onSuccess();
    } catch (err) {
      setError('Error in created');
      console.error(err);
    } 
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Update Classification</h2>
        <p className="text-gray-400">Edit classification data</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">          
          <div>
            <label className="block text-sm font-medium  mb-2">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

        {/* الأزرار */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save modifications
          </button>
          
          <button
            type="button"
            onClick={onSuccess}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
           cancel
          </button>
        </div>
      </form>
    </div>
  );
}