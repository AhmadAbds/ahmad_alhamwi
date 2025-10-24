// components/dashboard/CreateHeader.tsx
import { useState} from 'react';
import { contactService} from '../../../../services/api';

interface CreatePersonalProps {
  onSuccess: () => void;
}

export default function CreateContact({ onSuccess }: CreatePersonalProps) {
  // useState منفصل لكل حقل
   const [description, setDescription] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [first_name, setfirstName] = useState('');
  const [last_name, setLastName] = useState('');
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
      formData.append('email', email);
      formData.append('description', description);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
     

     
      await contactService.createcontact(formData);
      
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
    <div className=" rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create New Contact</h2>
        <p className="text-gray-400">Put the information for the new contact</p>
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
              First Name
            </label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setfirstName(e.target.value)}
              className="w-full px-4 bg-background py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter fistname..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            
              className="w-full px-4 py-3 bg-background border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter last name..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium  mb-2">
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full px-4 py-3 border bg-background border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter email..."
            />
          </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium  mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
              className="w-full px-4 py-3 border bg-background border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter phone..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
              className="w-full px-4 py-3 border bg-background border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="enter address..."
            />
          </div>
        </div>

        {/* الوصف */}
        <div>
          <label className="block text-sm font-medium  mb-2">
           Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 border bg-background border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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