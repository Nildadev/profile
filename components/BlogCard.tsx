
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="group block">
      <div className="relative glass rounded-5xl overflow-hidden border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-700">
        <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        </div>

        <div className="p-6 md:p-10 space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-[10px] font-bold text-slate-500">{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors duration-500 leading-[1.1]">
            {post.title}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
            {post.excerpt}
          </p>

          <div className="pt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-slate-500 border border-white/5">#{tag}</span>
              ))}
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:scale-110 transition-all duration-500">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
