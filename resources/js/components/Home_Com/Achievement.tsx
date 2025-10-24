import { achievementsService } from '@/services/api';
import { AchievData } from '@/types';
import  { useEffect, useState } from 'react'
import './Achievements.css'
const Achievement = () => {
     const [achievements, setachievements] = useState<AchievData[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
     
      useEffect(() => {
        loadHeaders();
      }, []);
    
      
      const loadHeaders = async () => {
        try {
        setLoading(true);
        const response = await achievementsService.getachievemets();
        
        // تأكد من أن البيانات هي مصفوفة
        const Data = Array.isArray(response) ? response : [response];
        
        setachievements(Data);
    
          
        } catch (err) {
          setError('فشل في تحميل البيانات');
          console.error('Error loading:', err);
        } finally {
          setLoading(false);
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
              onClick={loadHeaders}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded ml-4"
            >
             try again
            </button>
          </div>
        );
      }
  return (
    <div>
      <h1 className='adress_achie' >My Achievements</h1>
        <div className="flex justify-between items-center flex-wrap gap-8 px-[4%]">
          {achievements.map((achievement) => {
            return(
                      <img
                      key={achievement.id}
                        src={achievement.image}
                        alt={'image achievement'}
                        className="achiev_img max-w-[500px] shadow-xl rounded-md m-auto"
                      />
            )
          }
             
                   
               
          )}
        </div>
        

    </div>
  )
}

export default Achievement