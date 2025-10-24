import { useEffect, useState } from 'react';
import { HeaderData } from '@/types';
import { headerService } from '../../services/api';
import './Hero.css';
function Hero() {
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const headers = await headerService.getHeaders();
                // افترضنا أن هناك سجل واحد فقط، أو نأخذ الأول
                if (headers.length > 0) {
                    setHeaderData(headers[0]);
                }
            } catch (err) {
                setError('Failed to load header data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    if (loading) return 
    <div className="flex justify-center items-center h-64 mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>;
    if (error) return <div>Error: {error}</div>;
    if (!headerData) return <div>No header data found</div>;

    return (
        <div className='Hero' id = "home">
            <div className='Text'>
                <h3>Hello I'am</h3>
                <h2>{headerData.name}</h2>
                <h1 className='partone_job' ><i>{headerData.my_jop}</i></h1>
                <h1 className='jopp'><i>Developer</i></h1>
                <div>{headerData.description}</div>
              <button>Hire me</button>
            </div>
            <div className='profile'>
                 <img src={headerData.profile_image} alt="Profile" className='Cardimg' /> 
            </div>
        </div>
    );
}

export default Hero;