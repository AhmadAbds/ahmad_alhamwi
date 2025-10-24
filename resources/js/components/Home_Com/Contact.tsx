import { useState } from 'react'
import './Contact.css'
import { contactService } from '@/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';

function Contact() {
   const [description, setDescription] = useState('');
   const [email, setemail] = useState('');
   const [phone, setphone] = useState('');
   const [address, setaddress] = useState('');
   const [first_name, setfirstName] = useState('');
   const [last_name, setLastName] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
  
   // دالة لتصفير جميع الحقول
   const resetForm = () => {
      setDescription('');
      setemail('');
      setphone('');
      setaddress('');
      setfirstName('');
      setLastName('');
   };

   const handleSubmit = async () => {
      setIsLoading(true);
      
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
        
         // عرض إشعار "جاري الإرسال"
         toast.info('Sending Data...', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
        
         await contactService.createcontact(formData);
         
         console.log('✅ تم إنشاء  بنجاح');
         
         // إخفاء إشعار "جاري الإرسال" وعرض إشعار النجاح
         toast.dismiss();
         toast.success('Sent successfully,your request will be processed later.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
         
         // تصفير الحقول بعد الإرسال الناجح
         resetForm();
         
      } catch (err: any) {
         console.error('❌ خطأ في إنشاء :', err);
         
         // إخفاء إشعار "جاري الإرسال" وعرض إشعار الخطأ
         toast.dismiss();
         toast.error('حدث خطأ أثناء الإرسال. حاول مرة أخرى.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
         
      } finally {
         setIsLoading(false);
         setIsDialogOpen(false);
      }
   };

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsDialogOpen(true);
   };
  
   return (
      <div className='mb-[30px] sm:mb-[70px]'>
         {/* إضافة حاوية الإشعارات */}
         <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         
         <h1 id='contact' className='address_contact' style={{textAlign:"center"}}>Contact Me</h1>
         <form onSubmit={handleFormSubmit} method='POST' className='father_contact'>
             <div className='flex w-full justify-center items-center ' >
               <input 
                  required 
                  className='small_input_contact bg-background' 
                  type="text" 
                  placeholder='First Name'
                  value={first_name}
                  onChange={(e) => setfirstName(e.target.value)}
                  style={{marginRight:"15px"}} 
                  disabled={isLoading}
               />
               <input 
                  required 
                  className='small_input_contact bg-background'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text" 
                  placeholder='Last Name' 
                  disabled={isLoading}
               />
            </div>
            <div className='flex w-full justify-center items-center '>
               <input 
                  required 
                  className='small_input_contact bg-background' 
                  type="email" 
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder='Your Email'  
                  style={{marginRight:"15px"}}  
                  disabled={isLoading}
               />
               <input 
                  required 
                  className='small_input_contact bg-background'
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  type="number" 
                  placeholder='Your Phone' 
                  disabled={isLoading}
               />
            </div> 
            <input 
               required 
               type="text" 
               placeholder='Write Your Message...'
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               className='big_input_contact bg-background' 
               disabled={isLoading}
            /> 
            <div className='Map'>
               <iframe  
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5797.469113048719!2d36.31958129063437!3d33.54357542891977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6576f16a659%3A0x35ff1a44edf00ee9!2z2YXYs9in2YPZhiDYqNix2LLYqdiMINiv2YXYtNmC2Iwg2LPZiNix2YrYpw!5e0!3m2!1sar!2s!4v1741354434992!5m2!1sar!2s" 
                  style={{width:"100%" ,borderRadius:"0 0 30px 30px", border:"0"}}
                  className=' h-[400px] sm:h-[500px] '
               ></iframe>
               <div className='dialog_map bg-background'>
                  <h1>Location :</h1>
                  <div className='dialog2'>
                        <input
                           className='locationinput bg-background'
                           required 
                           type="text"
                           value={address}
                           onChange={(e) => setaddress(e.target.value)}
                           placeholder='Enter your location..' 
                           disabled={isLoading}
                        />
                  </div>
               </div>
            </div>
            <Button  type='submit' disabled={isLoading} className='px-8 rounded-lg py-6 text-xl font-semibold mt-5' variant={"outline"}>
               {isLoading ? 'loading...' : 'Send'}
            </Button>
         </form>

         {/* AlertDialog خارج النموذج */}
         <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action will send your contact information. Please make sure all data is correct.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                     onClick={handleSubmit}
                     disabled={isLoading}
                     className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                     {isLoading ? 'جاري الإرسال...' : 'Continue'}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   )
}

export default Contact