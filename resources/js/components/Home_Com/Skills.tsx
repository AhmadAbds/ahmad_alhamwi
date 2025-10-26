import { categoryService, skillService } from "@/services/api";
import { ScrollArea } from "../ui/scroll-area"
import './Skills.css'
import { useEffect, useState } from "react";
import { CategoryData, SkillData } from "@/types";

const Skills = () => {
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

  

    // دالة لتصفية المهارات حسب الفئة
    const getSkillsByCategory = (categoryId: number) => {
      return skillData.filter(skill => skill.category_id === categoryId);
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

    if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]">
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
    <div id="skills" className="Section_Skills">
      <h1>My Skills</h1>
      <div className="categories-container  flex flex-wrap gap-8 items-center justify-evenly xl:p-0 md:px-[10%] sm:px-[5%]">
        {categories.map((category) => {
          // التحقق من وجود category.id قبل استخدامه
          const categorySkills = category.id ? getSkillsByCategory(category.id) : [];
          
          // إذا كانت الفئة لا تحتوي على مهارات، لا نعرضها
          if (categorySkills.length === 0) return null;
          
          return (
            <div key={category.id} className="xl:w-[600px] md:w-full sm:w-full w-full">
              {/* عنوان الفئة */}
              <div className="category-type text-2xl font-bold text-center mb-4 p-3 shadow-lg bg-gray-400 rounded-lg dark:bg-gray-600">
                {category.type}
              </div>
              
              {/* ScrollArea منفصل لكل فئة */}
              <ScrollArea className="h-[425px] w-full rounded-md border border-gray-300  shadow-xl cursor-grabs">
                <div className="skills-container grid gap-4 p-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="p-3 border rounded-lg shadow-sm">
                      <div className='flex justify-between items-center mb-2'>
                        <div className="font-medium">{skill.title || "No Title"}</div>
                        <div className="p-2 border rounded-full text-sm">
                          {skill.value || 0}%
                        </div>
                      </div>
                      <input 
                        type="range" 
                        readOnly value={skill.value || 0}
                        min="0"
                        max="100"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Skills