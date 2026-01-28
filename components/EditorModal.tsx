
import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Category, BlogPost, DesignSettings } from '../types';
import { DEFAULT_DESIGN } from '../constants';
import { cloudService } from '../services/cloudService';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditorModal: React.FC<EditorModalProps> = ({ isOpen, onClose }) => {
  const { 
    profile, posts, design, isAdmin, login, logout, isSyncing,
    updateProfile, updateDesign, addPost, updatePost, deletePost,
    exportData, importData, syncData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'design' | 'security'>('profile');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const postImageInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const [profileForm, setProfileForm] = useState(profile);
  const [designForm, setDesignForm] = useState<DesignSettings>(design);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  if (!isOpen) return null;

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl transition-opacity duration-700" onClick={onClose}></div>
        <div className="relative w-full max-w-md glass p-12 rounded-[48px] border-brand-primary/30 space-y-10 text-center shadow-[0_0_100px_rgba(var(--color-primary-rgb,0,0,0),0.2)] transform animate-[tagAppear_0.6s_ease-out]">
          <div className="relative w-24 h-24 bg-brand-primary/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 group">
            <div className="absolute inset-0 bg-brand-primary rounded-[32px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <svg className="w-12 h-12 text-brand-primary animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-black tracking-tight text-white uppercase italic">Xác thực Admin</h3>
            <p className="text-sm text-slate-400 font-medium italic opacity-80">Chỉ chủ sở hữu mới có quyền truy cập khu vực này.</p>
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            await new Promise(r => setTimeout(r, 600)); // Dramatic pause
            if (!login(passwordInput)) {
              setLoginError(true);
              setIsSubmitting(false);
            }
          }} className="space-y-6">
            <div className="relative">
              <input 
                type="password" 
                autoFocus
                className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/10'} rounded-2xl px-6 py-4 text-center text-white text-lg font-mono outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all`}
                placeholder="Mật mã khóa"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
              />
              {loginError && <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-500 font-black uppercase tracking-widest text-center animate-bounce">Truy cập bị từ chối!</p>}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              {isSubmitting ? 'ĐANG KIỂM TRA...' : 'GIẢI MÃ TRUY CẬP'}
            </button>
          </form>
          <div className="pt-6">
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em] opacity-40">Identity Protection Secured</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    updateDesign(designForm);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost?.id) {
      updatePost(editingPost as BlogPost);
    } else {
      const newPost: BlogPost = {
        ...editingPost as BlogPost,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
      };
      addPost(newPost);
    }
    setEditingPost(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl h-[85vh] glass rounded-[48px] border-white/10 overflow-hidden flex flex-col shadow-[0_0_150px_rgba(0,0,0,0.5)] transform animate-[tagAppear_0.4s_ease-out]">
        <div className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02]">
          <div className="flex gap-2 p-1 bg-black/20 rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
            {(['profile', 'posts', 'design', 'security'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab === 'profile' ? 'Hồ sơ' : tab === 'posts' ? 'Bài viết' : tab === 'design' ? 'Giao diện' : 'Hệ thống'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={syncData}
              disabled={isSyncing}
              className={`flex items-center gap-3 px-6 py-3 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-primary hover:text-white transition-all ${isSyncing ? 'animate-pulse opacity-50' : ''}`}
            >
              {isSyncing ? 'Pushing Data...' : 'Push to Cloud'}
              <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </button>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-12 max-w-2xl mx-auto pb-10">
              <div className="flex flex-col items-center gap-8">
                <div className="relative group">
                   <div className="absolute -inset-4 bg-brand-primary/20 rounded-[44px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <img src={profileForm.avatar} className="relative w-40 h-40 rounded-[40px] object-cover border-4 border-brand-primary/20 shadow-2xl" />
                   <button type="button" onClick={() => avatarInputRef.current?.click()} className="absolute -bottom-3 -right-3 p-3 bg-brand-primary text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></button>
                </div>
                <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setProfileForm({...profileForm, avatar: ev.target?.result as string});
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Họ tên công khai</label><input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} /></div>
                <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vị trí hiện tại</label><input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all" value={profileForm.role} onChange={e => setProfileForm({...profileForm, role: e.target.value})} /></div>
              </div>
              <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiểu sử nghệ thuật & kỹ thuật</label><textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all leading-relaxed" value={profileForm.bio} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} /></div>
              <button type="submit" className="w-full py-5 bg-white text-black font-black rounded-2xl shadow-xl hover:bg-slate-100 transition-all uppercase tracking-widest">LƯU TẠM THỜI (LOCAL)</button>
              <p className="text-center text-[9px] text-slate-500 uppercase font-black tracking-widest">Sử dụng "Push to Cloud" ở trên cùng để mọi người thấy thay đổi</p>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10 max-w-xl mx-auto py-10">
              <div className="p-10 bg-brand-primary/5 border border-brand-primary/10 rounded-[40px] space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                </div>
                <h4 className="font-black uppercase text-xs tracking-[0.2em] text-brand-primary">Cloud Persistence</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium italic opacity-80">
                  {cloudService.isAvailable() 
                    ? "Hệ thống đang kết nối với Cloud Database. Mọi thay đổi sẽ được đồng bộ hóa toàn cầu." 
                    : "Bạn đang ở chế độ Local. Hãy cấu hình SUPABASE_URL trong code để đồng bộ cho mọi người xem."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <button onClick={exportData} className="py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-[1.03] transition-all shadow-xl shadow-white/5">Xuất bản dự phòng (.json)</button>
                  <button onClick={() => importInputRef.current?.click()} className="py-4 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all">Khôi phục dữ liệu</button>
                  <input type="file" ref={importInputRef} className="hidden" accept=".json" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (importData(event.target?.result as string)) {
                          alert('Dữ liệu đã được đồng bộ!');
                          window.location.reload();
                        }
                      };
                      reader.readAsText(file);
                    }
                  }} />
                </div>
              </div>

              <div className="p-10 glass rounded-[40px] border-white/5 flex items-center justify-between group">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-lg">Hệ thống</h4>
                  <p className="text-[10px] text-brand-primary font-black uppercase tracking-[0.2em]">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <button onClick={() => { logout(); onClose(); }} className="px-8 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20">ĐĂNG XUẤT</button>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <form onSubmit={handleSaveDesign} className="space-y-12 max-w-3xl mx-auto pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {(['primary', 'secondary', 'bgDark', 'bgLight'] as const).map(key => (
                  <div key={key} className="p-6 bg-white/[0.03] rounded-[32px] border border-white/5 space-y-5 hover:border-brand-primary/20 transition-all group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{key}</label>
                    <div className="flex gap-6 items-center">
                      <div className="relative">
                        <input type="color" className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none p-0 overflow-hidden" value={designForm[key]} onChange={e => setDesignForm({...designForm, [key]: e.target.value})} />
                        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-inset ring-white/10 group-hover:ring-white/20 transition-all"></div>
                      </div>
                      <input type="text" className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono uppercase tracking-widest focus:border-brand-primary outline-none" value={designForm[key]} onChange={e => setDesignForm({...designForm, [key]: e.target.value})} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-10">
                <button type="button" onClick={() => setDesignForm(DEFAULT_DESIGN)} className="flex-1 py-5 border border-white/10 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:text-white hover:bg-white/5 transition-all">CÀI LẠI MẶC ĐỊNH</button>
                <button type="submit" className="flex-[2] py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.99] transition-all">LƯU THIẾT KẾ</button>
              </div>
            </form>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-10 pb-10">
               {!editingPost ? (
                <>
                  <button onClick={() => setEditingPost({ category: Category.GENERAL, tags: [], imageUrl: 'https://picsum.photos/800/450' })} className="group w-full py-8 border-2 border-dashed border-white/10 text-slate-500 hover:border-brand-primary hover:text-brand-primary font-black rounded-[32px] transition-all flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-brand-primary/5">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.3em]">Bắt đầu một bài viết mới</span>
                  </button>
                  <div className="grid grid-cols-1 gap-4">
                    {posts.map(post => (
                      <div key={post.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-[28px] flex items-center justify-between group hover:border-brand-primary/20 transition-all">
                        <div className="flex items-center gap-6">
                          <img src={post.imageUrl} className="w-24 h-16 rounded-xl object-cover shadow-lg" />
                          <div className="space-y-1">
                            <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1">{post.title}</h4>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] text-brand-primary font-black uppercase tracking-widest px-2 py-0.5 bg-brand-primary/10 rounded-md">{post.category}</span>
                              <span className="text-[9px] text-slate-500 font-bold">{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setEditingPost(post)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-slate-500 hover:text-brand-primary hover:bg-brand-primary/10 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                          <button onClick={() => { if(confirm('Xác nhận xóa vĩnh viễn?')) deletePost(post.id); }} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSavePost} className="space-y-8 max-w-3xl mx-auto pb-10">
                   <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="space-y-1">
                      <h3 className="font-black text-xl text-white italic uppercase tracking-tighter">Biên tập viên số</h3>
                      <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest">Post Editor Mode</p>
                    </div>
                    <button type="button" onClick={() => setEditingPost(null)} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">Đóng Editor</button>
                   </div>
                   <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề bài viết</label><input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all text-lg font-bold" placeholder="Nhập tiêu đề hấp dẫn..." value={editingPost.title || ''} onChange={e => setEditingPost({...editingPost, title: e.target.value})} /></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chuyên mục</label><select className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all cursor-pointer" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value as Category})}>{Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                     <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Đường dẫn ảnh nền (Unsplash/Picsum)</label><input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary outline-none transition-all text-sm font-mono" placeholder="https://..." value={editingPost.imageUrl || ''} onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})} /></div>
                   </div>
                   <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung chi tiết (Markdown support)</label><textarea rows={12} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white mono text-sm leading-relaxed focus:border-brand-primary outline-none transition-all" placeholder="Gõ nội dung tại đây..." value={editingPost.content || ''} onChange={e => setEditingPost({...editingPost, content: e.target.value})} /></div>
                   <button type="submit" className="w-full py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl shadow-brand-primary/20 hover:brightness-110 active:scale-[0.99] transition-all uppercase tracking-[0.2em] italic">XUẤT BẢN NỘI DUNG</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
