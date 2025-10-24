// components/dashboard/CreateHeader.tsx
import { useState} from 'react';
import { personalInformationService } from '../../../../services/api';

interface CreatePersonalProps {
  onSuccess: () => void;
}

export default function CreatePersonal({ onSuccess }: CreatePersonalProps) {
  // useState منفصل لكل حقل
  const [title, settitle] = useState('');
   const [description, setDescription] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [facebook, setfacebook] = useState('');
  const [telegram, settelegram] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [github, setgithub] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log('🚀 جاري إرسال البيانات إلى الخادم...');
      
      // إنشاء FormData وإضافة الحقول
      const formData = new FormData();
      formData.append('title', title);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('facebook', facebook);
      formData.append('telegram', telegram);
      formData.append('linkedin', linkedin);
      formData.append('github', github);
     

     
      await personalInformationService.createpersonalInformation(formData);
      
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
        
          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter email..."
            />
          </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter phone..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter address..."
            />
          </div>
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium mb-2">
              Facebook
            </label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setfacebook(e.target.value)}
             
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter facebook..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Github
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => setgithub(e.target.value)}
            
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter github..."
            />
          </div>
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setlinkedin(e.target.value)}
             
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter linkedin..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Telegram
            </label>
            <input
              type="text"
              value={telegram}
              onChange={(e) => settelegram(e.target.value)}
              
              className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter telegram..."
            />
          </div>
        </div>

       
        {/* الوصف */}
        <div>
          <label className="block text-sm font-medium mb-2">
           Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full bg-background px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="enter description"
          />
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