
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { profile, posts } = useApp();

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Maximum Impact */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Visuals - Refined to avoid boxy artifacts */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_50%)] opacity-[0.07] blur-[120px]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark"></div>
        </div>

        <div className="relative z-10 text-center space-y-12 animate-slide-up">
          <div className="flex justify-center mb-10">
            <div className="px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary shadow-xl">
              Available for new projects
            </div>
          </div>

          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-white uppercase">
            MAKING <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent italic">SENSE</span> OF <br className="hidden md:block" />
            THE <span className="text-slate-200 dark:text-slate-800">VOID.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            Tôi là {profile.name}. Nhà phát triển sản phẩm tập trung vào sự tối giản, hiệu suất và những trải nghiệm số đầy cảm hứng.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link to="/blog" className="px-12 py-5 bg-slate-900 text-white dark:bg-white dark:text-black rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Thư viện dự án
            </Link>
            <Link to="/about" className="px-12 py-5 glass text-slate-900 dark:text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-100 dark:hover:bg-white/10 transition-all border-slate-200 dark:border-white/20">
              Về tôi
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-12 left-12 flex flex-col gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-40 hidden lg:flex">
          <p>44.837° N / -0.579° W</p>
          <p>Saigon District 1</p>
        </div>
      </section>

      {/* Featured Section - Modern Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-40">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24 animate-slide-up">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Selected Works</h4>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white">
              Tâm điểm <br /> sáng tạo.
            </h2>
          </div>
          <Link to="/blog" className="group flex items-center gap-6 pb-2 border-b-2 border-slate-200 dark:border-white/10 hover:border-brand-primary transition-all text-slate-900 dark:text-white">
            <span className="text-sm font-black uppercase tracking-widest">Toàn bộ thư viện</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, idx) => (
            <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section - Bento Inspired */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-40 bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] border border-slate-200 dark:border-white/5 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Expertise</h4>
            <h3 className="text-5xl font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
              Công nghệ <br /> định hình <br /> tương lai.
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs leading-relaxed">
              Từ việc viết script tự động hóa đến xây dựng các framework web hiện đại và nghệ thuật đồ họa.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-12 glass rounded-5xl bento-card space-y-8">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Fullstack Dev</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Sử dụng React, Node.js và TypeScript để tạo ra các hệ thống web có khả năng mở rộng cực cao.</p>
            </div>

            <div className="p-12 glass rounded-5xl bento-card space-y-8 bg-brand-secondary/5">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Tech Artist</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Giao thoa giữa code và mỹ thuật. Tạo ra các hiệu ứng hình ảnh và giao diện người dùng sống động.</p>
            </div>

            <div className="p-12 glass rounded-5xl bento-card space-y-8 md:col-span-2 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">AI Integrated Workflow</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Áp dụng các mô hình ngôn ngữ lớn (LLM) để tối ưu hóa quá trình phát triển phần mềm và sáng tạo nội dung.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/[0.05] rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-brand-primary">
                  <span className="font-black text-2xl">AI</span>
                </div>
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/[0.05] rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-brand-secondary">
                  <span className="font-black text-2xl">JS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <section className="max-w-screen-2xl mx-auto px-6 py-40 text-center space-y-12">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter opacity-10 uppercase italic text-slate-900 dark:text-white">Get in touch</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Hãy bắt đầu một cuộc hội thoại?</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Gửi mail hoặc kết nối qua các nền tảng mạng xã hội để thảo luận về dự án tiếp theo của bạn.</p>
          <div className="pt-8">
            <a href={`mailto:${profile.socials?.email || ''}`} className="inline-flex items-center gap-4 px-12 py-6 bg-brand-primary text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-primary/20">
              Gửi yêu cầu <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
