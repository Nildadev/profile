import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import BlogCard from '../components/BlogCard';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = useApp();
  const [copied, setCopied] = useState(false);

  const post = posts.find(p => p.id === id);

  // Related Posts Logic
  const relatedPosts = post ? posts.filter(p =>
    p.id !== post.id && p.tags.some(tag => post.tags.includes(tag))
  ).slice(0, 2) : [];

  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post, navigate]);

  const copyToClipboard = () => {
    if (!post) return;
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return null;

  return (
    <div className="max-w-6xl mx-auto pt-32 pb-12 px-6">
      <header className="mb-20 text-center space-y-8 animate-fade-in">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center justify-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.3em]">
          <Link to="/" className="text-slate-600 hover:text-brand-primary transition-colors">Trang chủ</Link>
          <span className="text-slate-800 dark:text-slate-700">/</span>
          <Link to="/blog" className="text-slate-600 hover:text-brand-primary transition-colors">Thư viện</Link>
          <span className="text-slate-800 dark:text-slate-700">/</span>
          <span className="text-brand-primary/80 truncate max-w-[150px] md:max-w-xs">{post.title}</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white border-white/5 transition-all mb-4 group"
        >
          <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Quay lại
        </button>

        <div className="flex justify-center">
          <span className="px-4 py-1 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] max-w-4xl mx-auto text-slate-900 dark:text-white uppercase italic">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <time>{new Date(post.date).toLocaleDateString('vi-VN', { dateStyle: 'long' })}</time>
          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></span>
          <span>5 Phút đọc</span>
        </div>
      </header>

      <div className="relative mb-12 md:mb-24 rounded-3xl md:rounded-[48px] overflow-hidden border border-white/5 shadow-2xl animate-blur-in">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-40">
        <div className="lg:col-span-8 space-y-8 md:space-y-12 animate-slide-up">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-8 md:mb-12 italic border-l-4 border-brand-primary pl-6 md:pl-8">
              {post.excerpt}
            </p>

            <div className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const value = String(children).replace(/\n$/, '');
                    return !inline && match ? (
                      <CodeBlock
                        language={match[1]}
                        value={value}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h2: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} className="scroll-mt-32 text-2xl font-bold mt-12 mb-6 text-slate-900 dark:text-white group relative"><a href={`#${id}`} className="absolute -left-6 opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity">#</a>{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h3 id={id} className="scroll-mt-32 text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-200">{children}</h3>;
                  },
                  img: ({ node, ...props }: any) => (
                    <div className="my-10 space-y-2">
                      <img
                        className="rounded-3xl border border-white/10 shadow-2xl mx-auto max-w-full h-auto object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/0f172a/0ea5e9?text=Image+Not+Found';
                          const container = target.parentElement;
                          if (container) {
                            const errorText = document.createElement('p');
                            errorText.className = 'text-[10px] text-red-400 font-black uppercase tracking-widest text-center mt-4';
                            errorText.innerText = '⚠️ KHÔNG TÌM THẤY ẢNH - HÃY KIỂM TRA LẠI ĐƯỜNG DẪN';
                            container.appendChild(errorText);
                          }
                        }}
                        {...props}
                      />
                    </div>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-16 flex justify-between items-center mb-4 border-t border-white/5 pt-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Technical Reference</h4>
              <button
                onClick={copyToClipboard}
                className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary hover:text-white transition-all"
              >
                {copied ? 'Đã sao chép!' : 'Sao chép mã nguồn'}
              </button>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-white/10">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 text-slate-900 dark:text-white italic">Bài viết liên quan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map(p => (
                  <div key={p.id} className="scale-90 origin-top-left hover:scale-100 transition-transform duration-500">
                    <BlogCard post={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="sticky top-32 space-y-10 animate-slide-up" style={{ animationDelay: '200ms' }}>

            {/* Table of Contents */}
            <div className="p-8 glass rounded-[32px] border-white/5">
              <TableOfContents content={post.content} />
            </div>

            <div className="p-10 glass rounded-[40px] border-white/5 space-y-8">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Thông tin bài viết</h4>

              <div className="space-y-6">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Chuyên mục</span>
                  <span className="text-brand-primary">{post.category}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest pt-4 border-t border-white/5">
                  <span className="text-slate-500">Ngày đăng</span>
                  <span className="text-slate-900 dark:text-white">{new Date(post.date).toLocaleDateString('vi-VN', { dateStyle: 'medium' })}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest pt-4 border-t border-white/5">
                  <span className="text-slate-500">Thẻ bài viết</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-all cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostDetail;
