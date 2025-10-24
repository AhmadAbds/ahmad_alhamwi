import api from '../api';
import { User } from '../../types';
import axios from 'axios';



export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      console.log('🔄 authService: إرسال طلب تسجيل الدخول');
      const response = await api.post('/login', { email, password });
      
      console.log('✅ authService: استجابة taken:', response.data.data.token);
            
    
       if (response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        console.log('🔐 authService: تم حفظ التوكن في localStorage');
      }

      if (response.data.data.user) {
        console.log('👤 authService: تم استلام بيانات المستخدم كاملة' , response.data.data.user);
        console.log('👤 authService: تم استلام بيانات المستخدم كاملة' , JSON.stringify(response.data.data.user));
        localStorage.setItem('user',JSON.stringify(response.data.data.user));
        return response.data.data.user;
      }
      return null
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ authService: خطأ Axios:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new Error(error.response?.data?.message || 'فشل تسجيل الدخول');
      }
      console.error('❌ authService: خطأ غير معروف:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      // إما من localStorage مباشرة أو من API
      const userStr = localStorage.getItem('user');
      if (userStr) {
        console.log("userpras" ,userStr)
        return JSON.parse(userStr);
      }
      console.log("usernull")
      return null;
      // أو جلب البيانات من الخادم إذا لم تكن في localStorage
      /*  const response = await api.get('/user');
      if (response.data.status === 'success') {
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } */
       
    } catch (error) {
      console.error('Get current user error:', error);
      // في حالة error (مثل token منتهي الصلاحية)، احذف token    
      return null;
    }
  },
};



/* 
export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      console.log('🔄 authService: إرسال طلب تسجيل الدخول');
      const response = await api.post('/login', { email, password });
      
      console.log('✅ authService: استجابة taken:', response.data.data.token);
            
    
       if (response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        console.log('🔐 authService: تم حفظ التوكن في localStorage');
      }

      if (response.data.data.user) {
        console.log('👤 authService: تم استلام بيانات المستخدم كاملة');
        return response.data.data.user;
      }
      return null
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ authService: خطأ Axios:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new Error(error.response?.data?.message || 'فشل تسجيل الدخول');
      }
      console.error('❌ authService: خطأ غير معروف:', error);
      throw error;
    }
  },
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

       إما من localStorage مباشرة أو من API
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }

       أو جلب البيانات من الخادم إذا لم تكن في localStorage
      const response = await api.get('/user');
      if (response.data.status === 'success') {
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
       في حالة error (مثل token منتهي الصلاحية)، احذف token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    console.log('✅ authService: تم حذف التوكن');
  }
};
 */