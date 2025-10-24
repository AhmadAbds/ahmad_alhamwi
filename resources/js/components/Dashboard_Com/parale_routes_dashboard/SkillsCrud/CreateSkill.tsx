// components/dashboard/CreateHeader.tsx
import { useEffect, useState} from 'react';
import { categoryService , skillService } from '../../../../services/api';
import { CategoryData } from '@/types';

interface CreateSkillProps {
  onSuccess: () => void;
}

export default function CreateSkill({ onSuccess }: CreateSkillProps) {
  // useState منفصل لكل حقل
  const [title, settitle] = useState('');
   const [value, setvalue] = useState<string>('');
  const [category_id, setCategory_id] = useState(0);
  const [categories, setcategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
   fetchCategories();
  }, [])
  
  const fetchCategories = async () => {
    try {
      const categoriesData = await categoryService.getcategories();
      setcategories(categoriesData);
     /*  if (categoriesData.length > 0) {
        setCategory_id(categoriesData[0].id);
      } */
    } catch (err) {
      console.error('❌ خطأ في جلب الفئات:', err);
    }
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // السماح فقط بالأرقام والقيمة الفارغة
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      setvalue(inputValue);
      setError(null); // مسح الخطأ عند الإدخال الصحيح
    }
  };

  // دالة لتحويل القيمة إلى رقم بأمان
  const getSafeNumberValue = (val: string): number => {
    if (val === '') return 0;
    const num = parseInt(val, 10);
    return isNaN(num) ? 0 : num;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   const numericValue = getSafeNumberValue(value);
    if (numericValue < 0 || numericValue > 100) {
      setError('القيمة يجب أن تكون بين 0 و 100');
      return;
    }
    if (category_id === 0) {
        setError('choose category');
        return
    }
    setLoading(true);
    setError(null);
    try {
      console.log('🚀 جاري إرسال البيانات إلى الخادم...');
      
      // إنشاء FormData وإضافة الحقول
      const formData = new FormData();
      formData.append('title', title);
      formData.append('value', value.toString());
      formData.append('category_id', category_id.toString());
      
     
      await skillService.createSkill(formData);
      
      console.log('✅ تم إنشاء  بنجاح');
      setMessage('successfully');
     
      setTimeout(() => {
        onSuccess();
      }, 2000);
      
    } catch (err: any) {
      console.error('❌ خطأ في إنشاء :', err);
      setError(err.message || 'فشل في إنشاء ');
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create New Skill</h2>
        <p className="text-gray-400">Put the information for the new Skill</p>
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

      <form onSubmit={handleSubmit}  method='POST' className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium  mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              required
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              value
            </label>
            <input
             type="text" // تغيير إلى text للتحكم أفضل
              inputMode="numeric" // لوحة أرقام للجوال
              pattern="[0-9]*" // قبول الأرقام فقط
              value={value}
              onChange={handleValueChange}
              required
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter value of skill..."
            />
          </div>
        </div>

          <div>
             <label className="block text-sm font-medium  mb-2">
            Category
          </label>
          <select
            value={category_id}
            onChange={(e) => setCategory_id(parseInt(e.target.value))}
            required
            className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value={0}>اختر الفئة</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
          </select>
          </div>
        

        {/* الأزرار */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
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
               Create
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