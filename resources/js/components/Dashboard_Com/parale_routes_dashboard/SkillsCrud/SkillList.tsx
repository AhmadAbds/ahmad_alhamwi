// components/dashboard/HeaderList.tsx
import { useEffect, useState } from 'react';
import {CategoryData, SkillData } from '@/types';
import {categoryService, skillService } from '../../../../services/api';


interface SkillListProps {
  onEdit: (skill: SkillData) => void;
}

export default function SkillList({ onEdit }: SkillListProps) {
  const [skillData, setskillData] = useState<SkillData[]>([]);
  const [categories, setcategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    loadData();
     fetchcategories();
  }, []);

  const fetchcategories = async ()=> {
    try{
      const categoriesData =await categoryService.getcategories();
      setcategories(categoriesData);
    }
    catch(error){
      console.log("error fetch categories")
    }
  }
  const getcategoryname = (category_id : number) => {
    const category = categories.find(cat => cat.id === category_id);
    return category? category.type : 'unkown';
  }
  const loadData = async () => {
    try {
      setLoading(true);
     const response = await skillService.getskills();
     
       const Data = Array.isArray(response) ? response : [response];
       console.log("skills" , response)
      
      setskillData(Data);
  
    } catch (err) {
      setError('فشل في تحميل البيانات');
      console.error('Error loading :', err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا ؟')) return;

    try {
      await skillService.deleteSkill(id);
      console.log(skillData)
      setskillData(skillData.filter(skill => skill.id !== id));
    } catch (err) {
      setError('فشل في حذف');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
        <button 
          onClick={loadData}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded ml-4"
        >
      Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">List</h2>
      </div>
      
      {skillData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <p className="text-gray-500 text-lg">Nothing data for skill data</p>
          <p className="text-gray-400">start to create new skill data</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {skillData.map((skill) => (
          <div key={skill.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{skill.title}</h3>
                       <span className="text-sm font-bold text-blue-600">{skill.value}%</span>
                       <input type="range"  value={skill.value || 0}  readOnly/> 
                      <p className="text-green-600 font-medium">{getcategoryname(skill.category_id)}
                        
                      </p>
                      
                    </div>
                  </div>
                 
                </div>

                {/* الأزرار */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(skill)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                update
                  </button>
                  <button
                    onClick={() => skill.id && handleDelete(skill.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                   delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}