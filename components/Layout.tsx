import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BackgroundMusic from './BackgroundMusic';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme, isLoading, isSyncing, isAdmin } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Khởi đầu', path: '/' },
    { name: 'Thư viện', path: '/blog' },
    { name: 'Thông tin', path: '/about' },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-brand-dark space-y-8">
        <div className="w-20 h-20 bg-brand-primary rounded-[32px] animate-bounce flex items-center justify-center shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.5)]">
          <span className="text-white font-black text-2xl">N</span>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary animate-pulse">Initializing System</p>
          <p className="text-slate-600 text-[9px] uppercase font-bold tracking-widest">Fetching Cloud Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-8 pointer-events-none px-4">
        <nav className={`
          pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full glass border border-white/5
          ${scrolled ? 'scale-90 opacity-95 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]' : 'scale-100'}
        `}>
          <Link to="/" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-brand-primary rounded-full group mr-1 md:mr-4 relative flex-shrink-0">
            <span className="text-white font-black text-[10px] md:text-sm group-hover:rotate-[360deg] transition-transform duration-700">N</span>
            {isSyncing && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="sync-loader w-2 h-2 md:w-3 md:h-3"></span>
              </span>
            )}
          </Link>

          <div className="flex gap-0.5 md:gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500
                    ${isActive ? 'bg-white text-black dark:bg-white dark:text-black shadow-lg' : 'text-slate-500 hover:text-white'}
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center ml-1 md:ml-4 border-l border-white/10 pl-1 md:pl-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white flex-shrink-0"
            >
              {theme === 'dark' ? (
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <BackgroundMusic />
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-20 md:py-32 bg-black text-white px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic">Nildadev.</h2>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed text-sm md:text-base">
              Kiến trúc sư kỹ thuật số, tập trung vào việc tạo ra các trải nghiệm người dùng mượt mà thông qua mã nguồn hiện đại và nghệ thuật thị giác.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Navigation</h4>
            <div className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm font-bold text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <Link to="/blog" className="hover:text-white transition-colors">Thư viện</Link>
              <Link to="/about" className="hover:text-white transition-colors">Về tôi</Link>
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Social</h4>
            <div className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-700 text-center md:text-left">© 2024 DESIGNED BY NILDADEV</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              {isSyncing ? 'Synchronizing Cloud...' : 'System Live • Saigon'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;