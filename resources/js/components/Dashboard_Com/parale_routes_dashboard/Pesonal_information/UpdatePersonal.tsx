// components/dashboard/EditHeader.tsx
import { useState, useEffect, } from 'react';
import { PersonalData, PersonalFormData } from '@/types';
import { personalInformationService } from '../../../../services/api';

interface EditPersonalProps {
  personal: PersonalData;
  onSuccess: () => void;
}

export default function EditPersonal({ personal, onSuccess }: EditPersonalProps) {
  const [formData, setFormData] = useState<PersonalFormData>({
    title: personal.title,
    description : personal.description,
    email : personal.email,
    phone : personal.phone,
    address : personal.address,
    github : personal.github,
    facebook : personal.facebook,
    linkedin : personal.linkedin,
    telegram : personal.telegram
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
        title: personal.title,
    description : personal.description,
    email : personal.email,
    phone : personal.phone,
    address : personal.address,
    github : personal.github,
    facebook : personal.facebook,
    linkedin : personal.linkedin,
    telegram : personal.telegram
    });
    
  }, [personal]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personal.id) return;

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('facebook', formData.facebook);
        formDataToSend.append('telegram', formData.telegram);
        formDataToSend.append('github', formData.github);
        formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('_method', 'PUT');

      await personalInformationService.updatePersonal(personal.id, formDataToSend);
      onSuccess();
    } catch (err) {
      setError('فشل في تحديث ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Update Personal Information</h2>
        <p className="text-gray-400">Edit header data</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
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
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Facebook
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
             
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Github
            </label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
             
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
             
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Telegram
            </label>
            <input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        {/* الوصف */}
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
            className="w-full px-4 py-3 border bg-background border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>{/* الأزرار */}
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
                Save modifications
              </>
            )}
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