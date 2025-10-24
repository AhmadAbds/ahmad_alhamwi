import './About.css'
import { useEffect, useState } from 'react';
import { AboutData } from '@/types';
import { aboutService } from '@/services/api';

 export default function About() {

   const [aboutdata, setaboutdata] = useState<AboutData | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const Abouts = await aboutService.getAbouts();
                  // افترضنا أن هناك سجل واحد فقط، أو نأخذ الأول
                  if (Abouts.length > 0) {
                      setaboutdata(Abouts[0]);
                  }
              } catch (err) {
                  setError('Failed to load data');
                  console.error(err);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchData();
      }, []);
  
      if (loading) return <div className="flex justify-center items-center h-64 mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>;
      if (error) return <div>Error: {error}</div>;
      if (!aboutdata) return <div>No data found</div>;
  return (
    <div id='about' className='About mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]'>
      <div className='profile_About'>
          <img  src= {aboutdata.image} alt="" className='Cardimg_About' />
        </div> 
        <div className='AboutText'>
            <h1><i>{aboutdata.title}</i></h1>
            <div className='lorem'>
              {aboutdata.description}
              </div>
              <p className='lorem'> <span style={{ color:"seagreen", fontWeight:"600" }} >state :</span> {aboutdata.state}</p>
              <p className='lorem'> <span style={{ color:"seagreen" , fontWeight:"600" }} >Expert :</span> {aboutdata.expert}</p>
              <p className='lorem'> <span style={{ color:"seagreen" , fontWeight:"600" }} >Languages :</span> {aboutdata.languages}</p>
              {/* <div>
              <h2>My Skills :</h2>
            {menu_range.map((element,index)=>{return(
                
                    )})}  
       </div> */}
        
    </div>
    </div>
  )
}
