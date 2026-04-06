import { useState, useEffect, useCallback } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects, { projects } from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import ManageModal from './components/ManageModal';
import ProjectInsights from './components/ProjectInsights';
import OwnerAuth from './components/OwnerAuth';
import { clearOwnerSession, isOwnerSession } from './components/ownerSession';

import type { MediaStore } from './types';

const INITIAL_MEDIA: MediaStore = { 
  0: [{ type: 'video', src: '/media/ev_project.mp4', poster: '/media/ev_thumbnail.png' }], 
  1: [
    { type: 'image', src: '/media/hospital_analytics_thumb.png' },
    { 
      type: 'image', 
      src: '/media/hospital_demographics.png', 
      title: 'Core Project Analytics', 
      description: 'Primary visualization showing a balanced 1:1 gender ratio across 200 patients. The analytical scope covers 140 admissions between Jan-May 2025.' 
    }
  ], 
  2: [], 3: [] 
};

function readFiles(files: FileList): Promise<Array<{ type: 'image' | 'video'; src: string }>> {
  return Promise.all(
    Array.from(files)
      .filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
      .map(
        file =>
          new Promise<{ type: 'image' | 'video'; src: string }>(resolve => {
            const reader = new FileReader();
            reader.onload = e => {
              resolve({
                type: file.type.startsWith('video/') ? 'video' : 'image',
                src: e.target!.result as string,
              });
            };
            reader.readAsDataURL(file);
          })
      )
  );
}

export default function App() {
  const [mediaStore, setMediaStore] = useState<MediaStore>(INITIAL_MEDIA);
  const [activeSection, setActiveSection] = useState('hero');
  const [view, setView] = useState<'home' | 'projects'>('home');

  // Owner auth
  const [isOwner, setIsOwner] = useState(() => isOwnerSession());
  const [authOpen, setAuthOpen] = useState(false);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbPid, setLbPid] = useState<number | null>(null);
  const [lbIdx, setLbIdx] = useState(0);

  // Manage modal state
  const [manageOpen, setManageOpen] = useState(false);
  const [managePid, setManagePid] = useState<number | null>(null);
  const [manageName, setManageName] = useState('');

  // Insights state
  const [insightsPid, setInsightsPid] = useState<number | null>(null);
  const handleOpenInsights = (pid: number) => setInsightsPid(pid);
  const handleCloseInsights = () => setInsightsPid(null);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(s => {
        if (s.offsetTop <= scrollY && s.offsetTop + s.offsetHeight > scrollY) {
          setActiveSection(s.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [view]);

  // Lightbox handlers
  const openLightbox = useCallback((pid: number, startIdx = 0) => {
    if ((mediaStore[pid] ?? []).length === 0) {
      return;
    }
    setLbPid(pid);
    setLbIdx(startIdx);
    setLbOpen(true);
  }, [mediaStore]);

  const closeLightbox = useCallback(() => setLbOpen(false), []);

  const navLightbox = useCallback((dir: number) => {
    if (lbPid === null) return;
    const len = (mediaStore[lbPid] ?? []).length;
    setLbIdx(prev => (prev + dir + len) % len);
  }, [lbPid, mediaStore]);

  // Manage modal handlers
  const openManage = (pid: number, name: string) => {
    setManagePid(pid);
    setManageName(name);
    setManageOpen(true);
  };
  const closeManage = () => setManageOpen(false);

  const handleAuthSuccess = () => {
    setIsOwner(true);
    setAuthOpen(false);
  };

  const handleAuthClose = () => {
    setAuthOpen(false);
  };

  const handleViewAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('projects');
  };

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('home');
  };

  const handleAddFiles = async (pid: number, files: FileList) => {
    const newItems = await readFiles(files);
    setMediaStore(prev => ({
      ...prev,
      [pid]: [...(prev[pid] ?? []), ...newItems],
    }));
  };

  const handleDeleteFile = (pid: number, idx: number) => {
    setMediaStore(prev => {
      const updated = [...(prev[pid] ?? [])];
      updated.splice(idx, 1);
      return { ...prev, [pid]: updated };
    });
  };

  const handleClickThumb = (pid: number, idx: number) => {
    setLbPid(pid);
    setLbIdx(idx);
    setLbOpen(true);
  };

  return (
    <>
      <Navbar activeSection={activeSection} isOwner={isOwner} onOwnerLogout={() => { setIsOwner(false); clearOwnerSession(); }} onOwnerLogin={() => setAuthOpen(true)} />

      <main className="animate-fade-in transition-all duration-700">
        {view === 'home' ? (
          <>
            <Hero />
            <About />
            <Projects
              mediaStore={mediaStore}
              isOwner={isOwner}
              onOpenLightbox={openLightbox}
              onOpenManage={openManage}
              onOpenInsights={handleOpenInsights}
              limit={2}
              onViewAll={handleViewAll}
            />
            <Experience />
            <Certifications />
            <Contact />
          </>
        ) : (
          <div className="pt-20 min-h-screen animate-slide-up">
            <div className="max-w-[1200px] mx-auto px-12 pt-12">
              <button 
                onClick={handleBackToHome}
                className="group flex items-center gap-2 text-text-muted font-mono text-xs hover:text-accent transition-colors mb-4"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
              </button>
            </div>
            <Projects
              mediaStore={mediaStore}
              isOwner={isOwner}
              onOpenLightbox={openLightbox}
              onOpenManage={openManage}
              onOpenInsights={handleOpenInsights}
            />
          </div>
        )}
      </main>

      <Footer />

      <Lightbox
        isOpen={lbOpen}
        pid={lbPid}
        idx={lbIdx}
        mediaStore={mediaStore}
        onClose={closeLightbox}
        onNav={navLightbox}
      />

      <ManageModal
        isOpen={manageOpen}
        pid={managePid}
        projectName={manageName}
        mediaStore={mediaStore}
        onClose={closeManage}
        onAddFiles={handleAddFiles}
        onDeleteFile={handleDeleteFile}
        onClickThumb={handleClickThumb}
      />

      {insightsPid !== null && (
        <ProjectInsights 
          project={projects.find(p => p.id === insightsPid)!} 
          media={mediaStore[insightsPid] ?? []}
          onClose={handleCloseInsights} 
        />
      )}

      {authOpen && (
        <OwnerAuth
          onSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />
      )}
    </>
  );
}
