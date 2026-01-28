
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, BlogPost, Category, DesignSettings } from '../types';
import { USER_PROFILE as INITIAL_PROFILE, BLOG_POSTS as INITIAL_POSTS, DEFAULT_DESIGN } from '../constants';
import { cloudService } from '../services/cloudService';

interface AppContextType {
  profile: UserProfile;
  posts: BlogPost[];
  theme: 'dark' | 'light';
  design: DesignSettings;
  isAdmin: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  toggleTheme: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  updateProfile: (newProfile: UserProfile) => void;
  updateDesign: (newDesign: DesignSettings) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  syncData: () => Promise<void>;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('app_theme') as 'dark' | 'light') || 'dark';
  });

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('is_admin') === 'true');

  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [design, setDesign] = useState<DesignSettings>(DEFAULT_DESIGN);

  // Khởi tạo: Tải dữ liệu từ Cloud nếu có, nếu không thì dùng LocalStorage
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      
      // 1. Thử tải từ Cloud
      const cloudData = await cloudService.fetchAllData();
      
      if (cloudData) {
        setProfile(cloudData.profile);
        setPosts(cloudData.posts);
        setDesign(cloudData.design);
      } else {
        // 2. Fallback về LocalStorage
        const savedProfile = localStorage.getItem('user_profile');
        const savedPosts = localStorage.getItem('blog_posts');
        const savedDesign = localStorage.getItem('app_design');
        
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedPosts) setPosts(JSON.parse(savedPosts));
        if (savedDesign) setDesign(JSON.parse(savedDesign));
      }
      
      setIsLoading(false);
    };

    initData();
  }, []);

  // Sync dữ liệu lên Cloud (Chỉ dành cho Admin)
  const syncData = async () => {
    if (!isAdmin || !cloudService.isAvailable()) return;
    setIsSyncing(true);
    await cloudService.syncToCloud({ profile, posts, design });
    setIsSyncing(false);
  };

  // Tự động lưu LocalStorage để trải nghiệm mượt mà
  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
    localStorage.setItem('blog_posts', JSON.stringify(posts));
    localStorage.setItem('app_design', JSON.stringify(design));
  }, [profile, posts, design]);

  // Apply Theme & CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  useEffect(() => {
    const styleId = 'dynamic-theme-vars';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      :root {
        --color-primary: ${design.primary};
        --color-secondary: ${design.secondary};
        --color-bg-dark: ${design.bgDark};
        --color-bg-light: ${design.bgLight};
      }
      .dark body { background-color: ${design.bgDark}; color: white; }
      .light body { background-color: ${design.bgLight}; color: #0f172a; }
      .bg-brand-primary { background-color: var(--color-primary); }
      .text-brand-primary { color: var(--color-primary); }
      .border-brand-primary { border-color: var(--color-primary); }
    `;
  }, [design]);

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('is_admin');
  };

  const exportData = () => {
    const data = { profile, posts, design };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nilspace_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.profile) setProfile(data.profile);
      if (data.posts) setPosts(data.posts);
      if (data.design) setDesign(data.design);
      return true;
    } catch (e) {
      return false;
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const updateProfile = (newProfile: UserProfile) => setProfile(newProfile);
  const updateDesign = (newDesign: DesignSettings) => setDesign(newDesign);
  const addPost = (post: BlogPost) => setPosts([post, ...posts]);
  const updatePost = (updatedPost: BlogPost) => setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  const deletePost = (id: string) => setPosts(posts.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{ 
      profile, posts, theme, design, isAdmin, isLoading, isSyncing,
      toggleTheme, login, logout, updateProfile, updateDesign,
      addPost, updatePost, deletePost, syncData, exportData, importData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
