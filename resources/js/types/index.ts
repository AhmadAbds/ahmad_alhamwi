export interface User  {
    id : number ;
    email : string;
    name? : string;
};
export interface AuthContextType {
    user: User | null;
    login : (email : string , password :string)=>Promise<boolean>;
    isLoading : boolean;
}

export interface HeaderData {
  id?: number;
  name: string;
  my_jop: string;
  description: string;
  profile_image: string ; 
}

export interface HeaderFormData {
  name: string;
  my_jop: string;
  description: string;
  profile_image: File | null; 
}
export interface AboutData {
  id?: number;
  title: string;
  description: string;
  image: string ;
  state: string;
  expert: string;
  languages: string; 
}

export interface AboutFormData {
  title: string;
  description: string;
  image: File | null;
  state: string;
  expert: string;
  languages: string;  
}
export interface CategoryData {
  id?: number;
  type: string;
}

export interface CategoryFormData {
  type: string; 
}
export interface PersonalData {
  id?: number;
  title: string;
  description : string;
  email : string;
  phone : string;
  address : string;
  facebook : string;
  github : string;
  linkedin : string;
  telegram : string; 
}

export interface PersonalFormData {
  title: string;
  description : string;
  email : string;
  phone : string;
  address : string;
  facebook : string;
  github : string;
  linkedin : string;
  telegram : string; 
}

export interface SkillData {
  id?: number;
  title: string;
  value : number ;
  category_id : number;
  category? : {
    type : string;
  }
}

export interface SkillFormData {
 title: string;
  value : number ;
  category_id : number;
}

export interface AchievData {
  id?: number;
  image: string ; 
}

export interface AchievFormData {
image: File | null; 
}
export interface ClassificationData {
  id?: number;
  type: string;
}

export interface ClassificationFormData {
  type: string; 
}

export interface ProjectData {
  id?: number;
  classification_id: number;
  classification_type?: string;
  image: string;
  title: string;
  summary: string;
  visit?: string;
  video?: string;
  github: string;
  description: string;
  formatted_content?: string;
  content_styles?: ContentStyles;
  created_at : string;
}

export interface ContentStyles {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
}

export interface ProjectFormData {
  classification_id: number;
  image: File | null;
  title: string;
  summary: string;
  visit: string;
  video: string;
  github: string;
  description: string;
  formatted_content: string;
  content_styles: ContentStyles;
}

export interface ContactData {
  id?: number;
  first_name: string;
  last_name : string;
  email : string;
  phone : string;
  address : string;
  description : string;
}

export interface ContactFormData {
  first_name: string;
  last_name : string;
  email : string;
  phone : string;
  address : string;
  description : string;
}