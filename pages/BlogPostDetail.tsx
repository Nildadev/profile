
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { gemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = useApp();
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const post = posts.find(p => p.id === id);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }
    gemini.getInsights(post.category, post.tags).then(setInsight);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post, navigate]);

  const handleGenerateSummary = async () => {
    if (!post) return;
    setIsSummarizing(true);
    const res = await gemini.summarizePost(post.title, post.content);
    setSummary(res);
    setIsSummarizing(false);
  };

  const copyToClipboard = () => {
    if (!post) return;
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-20 text-center space-y-8 animate-fade-in">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center justify-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.3em]">
          <Link to="/" className="text-slate-500 hover:text-brand-primary transition-colors">Trang chủ</Link>
          <span className="text-slate-800 dark:text-slate-700">/</span>
          <Link to="/blog" className="text-slate-500 hover:text-brand-primary transition-colors">Thư viện</Link>
          <span className="text-slate-800 dark:text-slate-700">/</span>
          <span className="text-brand-primary/60 truncate max-w-[150px] md:max-w-xs">{post.title}</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white border-white/5 transition-all mb-4 group"
        >
          <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Quay lại
        </button>

        <div className="flex justify-center">
          <span className="px-4 py-1 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] max-w-4xl mx-auto text-slate-900 dark:text-white uppercase italic">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <time>{new Date(post.date).toLocaleDateString('vi-VN', { dateStyle: 'long' })}</time>
          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></span>
          <span>5 Phút đọc</span>
        </div>
      </header>

      <div className="relative mb-24 rounded-[48px] overflow-hidden border border-white/5 shadow-2xl animate-blur-in">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-40">
        <div className="lg:col-span-8 space-y-12 animate-slide-up">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-12 italic border-l-4 border-brand-primary pl-8">
              {post.excerpt}
            </p>

            <div className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium markdown-content">
              <ReactMarkdown
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
                  }
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
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="sticky top-32 space-y-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative p-10 rounded-[40px] overflow-hidden group">
              <div className="absolute inset-0 bg-brand-primary/5 dark:bg-brand-primary/10 backdrop-blur-3xl border border-brand-primary/20"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-2xl shadow-brand-primary/40">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white tracking-tight uppercase italic">Trợ lý AI</h4>
                    <p className="text-[9px] text-brand-primary font-black uppercase tracking-widest">Neural Analysis Engine</p>
                  </div>
                </div>

                {!summary ? (
                  <button
                    onClick={handleGenerateSummary}
                    disabled={isSummarizing}
                    className="w-full py-5 bg-slate-900 text-white dark:bg-white dark:text-black hover:brightness-110 disabled:opacity-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl"
                  >
                    {isSummarizing ? 'Đang giải mã...' : 'Phân tích & Tóm tắt'}
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Bản tóm tắt:</h5>
                      <div className="p-6 bg-white/5 dark:bg-black/40 rounded-3xl border border-white/5">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                          "{summary}"
                        </p>
                      </div>
                    </div>

                    {insight && (
                      <div className="space-y-2 pt-4 border-t border-white/5">
                        <h5 className="text-[9px] font-black text-brand-secondary uppercase tracking-[0.2em]">Phân tích chuyên sâu:</h5>
                        <div className="p-6 bg-brand-secondary/5 rounded-3xl border border-brand-secondary/10">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                            {insight}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setSummary(null)}
                      className="text-[9px] text-slate-500 hover:text-brand-primary font-black uppercase tracking-widest underline decoration-2 underline-offset-4 transition-colors pt-2"
                    >
                      Yêu cầu phân tích lại
                    </button>
                  </div>
                )}

                {!summary && insight && !isSummarizing && (
                  <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                    <h5 className="text-[9px] font-black text-brand-secondary uppercase mb-4 tracking-[0.3em]">AI Insight:</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">{insight}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 glass rounded-[40px] border-white/5 space-y-8">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Metadata</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
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
        </aside>
      </div>
    </div>
  );
};

export default BlogPostDetail;
