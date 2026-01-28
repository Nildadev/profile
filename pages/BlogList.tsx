
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import BlogCard from '../components/BlogCard';

const BlogList: React.FC = () => {
  const { posts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tất cả'>('Tất cả');

  const filteredPosts = selectedCategory === 'Tất cả' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const categories = ['Tất cả', ...Object.values(Category)];

  return (
    <div className="space-y-20 py-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
          Thư viện <span className="text-brand-primary">NilSpace</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium italic">
          Nơi lưu giữ các dự án tâm huyết, mã nguồn mở và cảm hứng thiết kế của tôi.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
              selectedCategory === cat 
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                : 'border-white/10 bg-white/5 text-slate-500 dark:text-slate-400 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-32 space-y-6">
          <div className="text-8xl opacity-10 font-black">NULL</div>
          <p className="text-slate-500 dark:text-slate-600 font-medium italic">
            Chưa có nội dung nào trong danh mục này. Hãy quay lại sau nhé!
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
