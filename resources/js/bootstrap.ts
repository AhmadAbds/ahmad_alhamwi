import axios from 'axios';

// تهيئة axios
window.axios = axios;

// تعيين headers افتراضية
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// التعامل مع CSRF Token بشكل آمع أنواع TypeScript
const tokenMetaElement = document.head.querySelector('meta[name="csrf-token"]');

if (tokenMetaElement) {
    const csrfToken = tokenMetaElement.getAttribute('content');
    if (csrfToken) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    } else {
        console.warn('CSRF token found but content is empty');
    }
} else {
    console.warn('CSRF token meta tag not found');
}

// تعريف النوع TypeScript لـ window
declare global {
    interface Window {
        axios: typeof axios;
    }
}

// تصدير فارغ لجعل الملف module
export {};