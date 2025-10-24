// components/dashboard/HeaderList.tsx
import { useEffect, useState } from 'react';
import { HeaderData } from '@/types';
import { headerService } from '../../../../services/api';


interface HeaderListProps {
  onEdit: (header: HeaderData) => void;
}

export default function HeaderList({ onEdit }: HeaderListProps) {
  const [headers, setHeaders] = useState<HeaderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    loadHeaders();
  }, []);

  
  const loadHeaders = async () => {
    try {
      setLoading(true);
    const response = await headerService.getHeaders();
    
    // تأكد من أن البيانات هي مصفوفة
    const headersData = Array.isArray(response) ? response : [response];
    
    setHeaders(headersData);
    } catch (err) {
      setError('Erro faild in load data or no data existe');
      console.error('Error loading headers:', err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async (id: number) => {
    if (!window.confirm('ary you shure')) return;

    try {
      await headerService.deleteHeader(id);
      setHeaders(headers.filter(header => header.id !== id));
    } catch (err) {
      setError('faild to delete');
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
          onClick={loadHeaders}
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
      
      {headers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <p className="text-gray-500 text-lg">Nothing data for header</p>
          <p className="text-gray-400">start to create new header</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {headers.map((header) => (
            <div key={header.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* المعلومات */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                   
                    {header.profile_image && (
                      <img
                        src={header.profile_image}
                        alt={header.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{header.name}</h3>
                      <p className="text-blue-600 font-medium">{header.my_jop}</p>
                    </div>
                  </div>
                  <p className="line-clamp-2">{header.description}</p>
                </div>

                {/* الأزرار */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(header)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                update
                  </button>
                  <button
                    onClick={() => header.id && handleDelete(header.id)}
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