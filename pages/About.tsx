
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EditorModal from '../components/EditorModal';

const About: React.FC = () => {
  const { profile, isAdmin } = useApp();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="pt-40 pb-40">
      <EditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-60">
        <div className="space-y-12 animate-slide-up">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">The Profile</h4>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                {profile.name.split(' ')[0]} <br />
                <span className="text-brand-primary italic">{profile.name.split(' ').slice(1).join(' ')}</span>
              </h1>
           </div>
           
           <p className="text-2xl font-medium text-slate-500 leading-relaxed italic border-l-4 border-brand-primary pl-8">
             "{profile.role}"
           </p>

           <div className="space-y-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-lg">
             <p>{profile.bio}</p>
           </div>

           <div className="flex flex-wrap gap-6 pt-6">
              {profile.socials?.github && (
                <a href={profile.socials.github} target="_blank" className="text-sm font-black uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-all">GitHub</a>
              )}
              {profile.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" className="text-sm font-black uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-all">LinkedIn</a>
              )}
              {profile.socials?.email && (
                <a href={`mailto:${profile.socials.email}`} className="text-sm font-black uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-all">Email</a>
              )}
           </div>

           {isAdmin && (
             <button 
               onClick={() => setIsEditorOpen(true)}
               className="px-8 py-3 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
             >
               Mở Admin Panel
             </button>
           )}
        </div>

        <div className="relative group animate-blur-in">
           <div className="absolute -inset-10 bg-brand-primary/10 rounded-[5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative aspect-[3/4] rounded-5xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl border border-white/5">
             <img src={profile.avatar} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
           </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-60">
        <div className="p-12 glass rounded-5xl space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Frontend</h4>
          <ul className="space-y-4 font-black text-2xl tracking-tight">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Three.js / WebGL</li>
          </ul>
        </div>
        <div className="p-12 glass rounded-5xl space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary">Backend</h4>
          <ul className="space-y-4 font-black text-2xl tracking-tight">
            <li>Node.js</li>
            <li>Python Automation</li>
            <li>SQL & NoSQL</li>
            <li>Cloud CI/CD</li>
          </ul>
        </div>
        <div className="p-12 glass rounded-5xl space-y-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Design</h4>
          <ul className="space-y-4 font-black text-2xl tracking-tight">
            <li>UI/UX Strategy</li>
            <li>Bento Systems</li>
            <li>Motion Design</li>
            <li>3D Visualization</li>
          </ul>
        </div>
      </section>

      {!isAdmin && (
        <section className="text-center py-20 opacity-30">
          <button onClick={() => setIsEditorOpen(true)} className="text-[10px] font-black uppercase tracking-[1em] hover:opacity-100 transition-opacity">System Login</button>
        </section>
      )}
    </div>
  );
};

export default About;
