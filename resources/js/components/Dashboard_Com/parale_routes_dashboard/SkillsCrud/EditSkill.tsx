// components/dashboard/EditHeader.tsx
import { useState, useEffect, } from 'react';
import { CategoryData, SkillData, SkillFormData } from '@/types';
import { categoryService , skillService } from '../../../../services/api';

interface EditSkillProps {
  skill: SkillData;
  onSuccess: () => void;
}

export default function EditSkill({ skill, onSuccess }: EditSkillProps) {
  const [formData, setFormData] = useState<SkillFormData>({
    title: skill.title,
    value : skill.value,
    category_id : skill.category_id
  });
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState<CategoryData[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchcategories();
    setFormData({
       title: skill.title,
    value : skill.value,
    category_id : skill.category_id
    });
    
  }, [skill]);

    const fetchcategories = async ()=> {
      try{
        const categoriesData =await categoryService.getcategories();
        setcategories(categoriesData);
      }
      catch(error){
        console.log("error fetch categories")
      }
    }
    /* const getcategoryname = (category_id : number) => {
      const category = categories.find(cat => cat.id === category_id);
      return category? category.type : 'unkown';
    } */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.id) return;

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('value', formData.value.toString());
      formDataToSend.append('category_id', formData.category_id.toString());
      formDataToSend.append('_method', 'PUT');
console.log("append")
      await skillService.updateSkill(skill.id, formDataToSend);
      onSuccess();
    } catch (err) {
      setError('فشل في تحديث ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};
const handleChangeselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value} = e.target;
  
  setFormData(prev => {
    if (name === 'category_id') {
      // تحويل إلى رقم
      return { ...prev, [name]: parseInt(value) || 0 };
    } else {
      // بقاء كنص
      return { ...prev, [name]: value };
    }
  });
};

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Update Skill</h2>
        <p className="text-gray-400">Edit Skill data</p>
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
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Value
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Category
            </label>
             <select
             name='category_id'
            value={formData.category_id}
            onChange={handleChangeselect}
            required
            className="w-full bg-background  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value={0}>choose category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
          </select>
          </div>

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