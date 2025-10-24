// utils/imageUtils.ts
import { API_CONFIG } from '../../components/config/constants';

export const getImageUrl = (imagePath: any): string => {
  // إذا كانت القيمة غير موجودة أو ليست نصاً
  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('❌ Invalid image path:', imagePath);
    return '';
  }
  
  const cleanPath = imagePath.trim();
  
  // إذا كان الرابط كاملاً
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  
  // إذا كان المسار يبدأ بـ /storage/
  if (cleanPath.startsWith('/storage/')) {
    return`${API_CONFIG.BASE_URL}${cleanPath}`;
  }
  
  // إذا كان المسار يبدأ بـ storage/ (بدون /)
  if (cleanPath.startsWith('storage/')) {
    return `${API_CONFIG.BASE_URL}/${cleanPath}`;
  }
  
  // لأي حالة أخرى
  return `${API_CONFIG.BASE_URL}/storage/${cleanPath}`;
};