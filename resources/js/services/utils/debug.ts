import { getImageUrl } from "./imageUtils";

// utils/debugUtils.ts
export const debugImageUrl = (path: string) => {
  console.log('📸 Image Debug:');
  console.log('Original path:', path);
  
  const fullUrl = getImageUrl(path);
  console.log('Full URL:', fullUrl);
  
  // اختبار تحميل الصورة
  const img = new Image();
  img.onload = () => console.log('✅ Image loads successfully');
  img.onerror = () => console.log('❌ Image failed to load');
  img.src = fullUrl;
  
  return fullUrl;
};

// استخدامه في المكون عند الحاجة
// debugImageUrl(header.profile_image);