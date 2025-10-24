import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '../types/index.ts';
import { authService } from '../services/auth/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // تغيير القيمة الافتراضية إلى true

  // استعادة حالة المستخدم من localStorage عند التحميل
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // إذا كان هناك token، حاول الحصول على بيانات المستخدم
          const userData = await authService.getCurrentUser();
          if (userData) {
            console.log("user data context" , userData);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await authService.login(email, password);
      console.log("بيانات السمتخدم مستلمة")
      if (userData) {
        setUser(userData);
        console.log("تم تسجيل الدحول بمجاح")
        return true;
      }
      console.log("لم يتم استلام البيانات")
      return false;
    } catch (error : any) {
      console.error("خطأ في تسجيل الدخول Authcontext");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};