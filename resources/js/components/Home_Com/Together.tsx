import { useEffect, useState } from 'react';
import './Together.css'
import { BsFacebook, BsTelegram, BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { PersonalData } from '@/types';
import { personalInformationService } from '@/services/api';
import { ImGithub,ImLinkedin2} from 'react-icons/im';
function Together() {
 const [persData, setpersData] = useState<PersonalData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const firstData = await personalInformationService.getpersonalInformations();
                // افترضنا أن هناك سجل واحد فقط، أو نأخذ الأول
                if (firstData.length > 0) {
                    setpersData(firstData[0]);
                }
            } catch (err) {
                setError('Failed to load personal data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, []);




   if (loading) return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
    if (error) return <div>Error: {error}</div>;
    if (!persData) return <div>No header data found</div>;
  return (
    <div className='Together mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]' >
             <div className='father_text_Together'>
             <h1><i>{persData.title}</i></h1>
             <div className='desc_together' >{persData.description}</div>
             <div className='container_card_contact' >
              <div className="card_contact">
              <div className='cover_icon_card' ><BsTelephone className='icon_card_contact' /></div>
              <div className='child_text_card_contact' >
                <p>My Phone :</p>
                <p>{persData.phone}</p>
              </div>
              </div>

              <div className="card_contact" style={{margin:"30px 0"}} >
              <div className='cover_icon_card' ><MdOutlineMailOutline className='icon_card_contact' /></div>
              <div className='child_text_card_contact' >
                <p>My Email :</p>
                <p>{persData.email}</p>
              </div>
              </div>

              <div className="card_contact">
              <div className='cover_icon_card' ><MdOutlineLocationOn className='icon_card_contact' /></div>
              <div className='child_text_card_contact' >
                <p>My Location :</p>
                <p>{persData.address}</p>
              </div>
              </div>
              <div className="flex items-center gap-5 mt-7 ml-1">
                <a target='_blank' href={persData.telegram}><BsTelegram className='icon_socail_media hover:text-[#2560a3]' /></a>
                <a target='_blank' href={persData.facebook}><BsFacebook className='icon_socail_media hover:text-[#2560a3]' /></a>
                <a target='_blank' href={persData.github}><ImGithub className='icon_socail_media hover:text-[#2560a3]' /></a>
                <a target='_blank' href={persData.linkedin}><ImLinkedin2 className='icon_socail_media hover:text-[#2560a3]' /></a>
              </div>
             </div>
             </div>
             <img src={"https://ik.imagekit.io/xipaoaj98/portfolio/IMG_20251016_195455_822.jpg?updatedAt=1760633732348"} alt="" />
    </div>
  )
}

export default Together