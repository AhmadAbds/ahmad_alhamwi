// components/dashboard/CreateHeader.tsx
import { useState} from 'react';
import { categoryService} from '../../../../services/api';

interface CreateHeaderProps {
  onSuccess: () => void;
} 

export default function CreateCategory({ onSuccess }: CreateHeaderProps) {
  // useState منفصل لكل حقل
  const [type, settype] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('🚀 جاري إرسال البيانات إلى الخادم...');
      
      // إنشاء FormData وإضافة الحقول
      const formData = new FormData();
      formData.append('type', type);

      console.log('📊 البيانات المرسلة:', {
        type
      });

      // إرسال البيانات باستخدام FormData
      await categoryService.createCategory(formData);
      setMessage('successfully');
      setTimeout(() => {
        onSuccess();
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Error in created');
    }
  };

  return (
    <div className="bg-background  rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create New Category</h2>
        <p className="text-gray-400">Put the information for the new Category</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} method='POST' className="space-y-6">
          <div>
            <label className="block text-sm font-medium  mb-2">
              Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => settype(e.target.value)}
              required
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter type..."
            />
          </div>
          
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
               Create 
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