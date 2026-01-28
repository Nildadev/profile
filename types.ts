
export enum Category {
  SCRIPT = 'Scripts',
  SOFTWARE = 'Software',
  ART = 'Art',
  GENERAL = 'General'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface DesignSettings {
  primary: string;
  secondary: string;
  bgDark: string;
  bgLight: string;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}
