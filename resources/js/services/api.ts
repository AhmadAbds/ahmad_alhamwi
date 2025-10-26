import { AboutData, AboutFormData, AchievData, AchievFormData, CategoryData, CategoryFormData, ClassificationData, ClassificationFormData, ContactData, ContactFormData, HeaderData, HeaderFormData, PersonalData, PersonalFormData, ProjectData, ProjectFormData, SkillData, SkillFormData } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ahmad-alhamwi.vercel.app/api' ,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
     'Content-Type': 'application/json',
  },
});

// طلبات Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (typeof config.data === 'object' && config.data !== null) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




// Header CRUD Api
export const headerService = {
  async getHeaders(): Promise<HeaderData[]> {
      const response = await api.get('/headers');
      console.log(response.data.headers)
      return response.data.headers
  },

  async createHeader(headerDataform: FormData): Promise<HeaderFormData> {
    const response = await api.post('/headers', headerDataform,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("1" ,response.data)
    console.log("2" ,response.data.profile_image.size)
    return response.data;
  }, 
  
  async updateHeader(id: number, headerData: FormData): Promise<HeaderFormData> {
    const response = await api.post(`/headers/${id}`, headerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  async deleteHeader(id: number): Promise<void> {
    await api.delete(`/headers/${id}`);
  }
};
// About CRUD API
export const aboutService = {
  async getAbouts(): Promise<AboutData[]> {
      const response = await api.get('/About_mes');
      console.log(response.data.data)
      return response.data.data
  },

  async createAbout(AboutDataform: FormData): Promise<AboutFormData> {
    const response = await api.post('/About_mes', AboutDataform,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("about" ,response.data);
    return response.data;
  }, 
  
  async updateAbout(id: number, AboutData: FormData): Promise<AboutFormData> {
    const response = await api.post(`/About_mes/${id}`, AboutData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteAbout(id: number): Promise<void> {
    await api.delete(`/About_mes/${id}`);
  }
};
// Categories API
export const categoryService = {
  async getcategories(): Promise<CategoryData[]> {
      const response = await api.get('/categories');
      console.log(response.data.data)
      return response.data.data
  },

  async createCategory(CategoryDataform: FormData): Promise<CategoryFormData> {
    const response = await api.post('/categories', CategoryDataform,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }, 
  
  async updateCategory(id: number, CategoryData: FormData): Promise<CategoryFormData> {
    const response = await api.post(`/categories/${id}`, CategoryData);
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
};
// Skills API
export const skillService = {
  async getskills(): Promise<SkillData[]> {
      const response = await api.get('/skills');
      console.log(response.data.data)
      return response.data.data
  },

  async createSkill(SkillDataform: FormData): Promise<SkillFormData> {
    const response = await api.post('/skills', SkillDataform,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }, 
  
  async updateSkill(id: number, SkillData: FormData): Promise<SkillFormData> {
    const response = await api.post(`/skills/${id}`, SkillData);
    return response.data;
  },

  async deleteSkill(id: number): Promise<void> {
    await api.delete(`/skills/${id}`);
  }
};


// personal information API

export const personalInformationService = {
  async getpersonalInformations(): Promise<PersonalData[]> {
      const response = await api.get('/personal_informations');
      console.log(response.data.data)
      return response.data.data
  },

  async createpersonalInformation(personalDataform: FormData): Promise<PersonalFormData> {
    const response = await api.post('/personal_informations', personalDataform);
    return response.data;
  }, 
  
  async updatePersonal(id: number, PersonalData: FormData): Promise<PersonalFormData> {
    const response = await api.post(`/personal_informations/${id}`, PersonalData);
    return response.data;
  },

  async deletePersonalInformation(id: number): Promise<void> {
    await api.delete(`/personal_informations/${id}`);
  }
};
// Achievements API

export const achievementsService = {
  async getachievemets(): Promise<AchievData[]> {
      const response = await api.get('/achievements');
      console.log(response.data.data)
      return response.data.data
  },

  async createachievements(achievementsDataform: FormData): Promise<AchievFormData> {
    const response = await api.post('/achievements', achievementsDataform);
    return response.data;
  }, 
  
  async updateachievements(id: number, AchievData: FormData): Promise<AchievFormData> {
    const response = await api.post(`/achievements/${id}`, AchievData);
    return response.data;
  },

  async deleteachievements(id: number): Promise<void> {
    await api.delete(`/achievements/${id}`);
  }
};

// classifications API
export const classificationService = {
  async getclassification(): Promise<ClassificationData[]> {
      const response = await api.get('/classifications');
      console.log(response.data.data)
      return response.data.data
  },

  async createClassification(ClassificationDataform: FormData): Promise<ClassificationFormData> {
    const response = await api.post('/classifications', ClassificationDataform);
    return response.data;
  }, 
  
  async updateClassification(id: number, ClassificationData: FormData): Promise<ClassificationFormData> {
    const response = await api.post(`/classifications/${id}`, ClassificationData);
    return response.data;
  },

  async deleteClassification(id: number): Promise<void> {
    await api.delete(`/classifications/${id}`);
  }
};
// project API
export const projectService = {
  async getProjects(): Promise<ProjectData[]> {
      const response = await api.get('/projects');
      console.log("data project" ,response.data.data)
      return response.data.data
  },

  async createProject(formData: FormData): Promise<ProjectFormData> {
    const response = await api.post('/projects', formData);
    console.log("creat project" , response.data)
    return response.data;
  }, 
  
  async updateProject(id: number, formData: FormData): Promise<ProjectFormData> {
    const response = await api.post(`/projects/${id}`, formData);
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
};
// contact information API

export const contactService = {
  async getcontacts(): Promise<ContactData[]> {
      const response = await api.get('/contacts');
      console.log(response.data.data)
      return response.data.data
  },

  async createcontact(contactDataform: FormData): Promise<ContactFormData> {
    const response = await api.post('/contacts', contactDataform);
    return response.data;
  }, 
  
  async updateContact(id: number, ConatctData: FormData): Promise<ContactFormData> {
    const response = await api.post(`/contacts/${id}`, ConatctData);
    return response.data;
  },

  async deleteContact(id: number): Promise<void> {
    await api.delete(`/contacts/${id}`);
  }
};
// ردود Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;