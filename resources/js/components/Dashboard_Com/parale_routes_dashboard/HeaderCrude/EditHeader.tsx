// components/dashboard/EditHeader.tsx
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { HeaderData, HeaderFormData } from '@/types';
import { headerService } from '../../../../services/api';

interface EditHeaderProps {
  header: HeaderData;
  onSuccess: () => void;
}

export default function EditHeader({ header, onSuccess }: EditHeaderProps) {
  const [formData, setFormData] = useState<HeaderFormData>({
    name: header.name,
    my_jop: header.my_jop,
    description: header.description,
    profile_image: null
  });
  const [previewImage, setPreviewImage] = useState<string>(header.profile_image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  useEffect(() => {
    setFormData({
      name: header.name,
      my_jop: header.my_jop,
      description: header.description,
      profile_image: null
    });
    setPreviewImage(header.profile_image);
    setHasNewImage(false);
  }, [header]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profile_image: file }));
      setHasNewImage(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profile_image: null }));
    setPreviewImage('');
    setHasNewImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!header.id) return;

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('my_jop', formData.my_jop);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('_method', 'PUT');
      
      if (hasNewImage && formData.profile_image) {
        formDataToSend.append('profile_image', formData.profile_image);
      }

      await headerService.updateHeader(header.id, formDataToSend);
      onSuccess();
    } catch (err) {
      setError('فشل في تحديث الهيدر');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  if (type === 'file') {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Update Header</h2>
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
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Job
            </label>
            <input
              type="text"
              name="my_jop"
              value={formData.my_jop}
              onChange={handleChange}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* صورة الملف الشخصي */}
        <div>
          <label className="block text-sm font-medium  mb-2">
           Profile Picture {hasNewImage ? '(New)' : '(Current)'}
          </label>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="test"
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
            </div>

            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile_image"
              />
              <label
                htmlFor="profile_image"
                className="cursor-pointer border border-gray-300 rounded-lg p-4 block hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    {hasNewImage ? 'change picture' : 'click to choose an image'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG 
                  </p>
                </div>
              </label>
            </div>
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
            className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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