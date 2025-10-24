// components/dashboard/CreateHeader.tsx
import { useState, useRef, ChangeEvent } from 'react';
import { headerService } from '../../../../services/api';

interface CreateHeaderProps {
  onSuccess: () => void;
}

export default function CreateHeader({ onSuccess }: CreateHeaderProps) {
  // useState منفصل لكل حقل
  const [name, setName] = useState('');
  const [my_jop, setMyJop] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    console.log("📁 الملف المحدد:", file);

    if (file) {
      setSelectedFile(file);
      console.log("set" ,  setSelectedFile(file))
      // إنشاء معاينة محلية للعرض
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من وجود صورة
    if (!selectedFile) {
      setError('يرجى اختيار صورة أولاً');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🚀 جاري إرسال البيانات إلى الخادم...');
      
      // إنشاء FormData وإضافة الحقول
      const formData = new FormData();
      formData.append('name', name);
      formData.append('my_jop', my_jop);
      formData.append('description', description);
      formData.append('profile_image', selectedFile); // إضافة الملف مباشرة

      console.log('📊 البيانات المرسلة:', {
        name,
        my_jop,
        description,
        profile_image: selectedFile.name
      });

      // إرسال البيانات باستخدام FormData
      await headerService.createHeader(formData);
      
      console.log('✅ تم إنشاء الهيدر بنجاح');
      setMessage('successfully created');
      
      setTimeout(() => {
        onSuccess();
      }, 2000);
      
    } catch (err: any) {
      console.error('❌ خطأ في إنشاء الهيدر:', err);
      setError(err.message || 'فشل في إنشاء الهيدر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create New Header</h2>
        <p className="text-gray-400">Put the information for the new header</p>
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

      <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST' className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-background"
              placeholder="enter name..."
            />
          </div>{/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Job
            </label>
            <input
              type="text"
              value={my_jop}
              onChange={(e) => setMyJop(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-background"
              placeholder="enter job..."
            />
          </div>
        </div>

        {/* صورة الملف الشخصي */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Profile Picture
          </label>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* معاينة الصورة */}
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

            {/* زر رفع الملف */}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!previewImage}
                className="hidden"
                id="profile_image"
              />
              <label
                htmlFor="profile_image"
                className="cursor-pointer border border-gray-300 rounded-lg p-4 block transition-colors hover:bg-gray-50"
              >
                <div className="text-center">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    {previewImage ? 'change picture' : 'click to choose an image'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 ">
                    PNG, JPG, JPEG
                  </p>
                </div>
              </label>
              
              {/* عرض اسم الملف بعد الاختيار */}
              {selectedFile && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                  <p className="text-gray-400">The specified file</p>
                  <p className="text-gray-400 truncate">{selectedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* الوصف */}
        <div>
          <label className="block text-sm font-medium  mb-2">
           Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-background"
            placeholder="enter description"
          />
        </div>

        {/* الأزرار */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
               Create Header
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