import { useState, useEffect, useCallback } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import ManageModal from './components/ManageModal';
import OwnerAuth, { isOwnerSession } from './components/OwnerAuth';

import type { MediaStore } from './types';

const INITIAL_MEDIA: MediaStore = { 
  0: [{ type: 'video', src: '/media/ev_project.mp4', poster: '/media/ev_thumbnail.png' }], 
  1: [], 2: [], 3: [] 
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

  // Owner auth
  const [isOwner, setIsOwner] = useState(() => isOwnerSession());
  const [authOpen, setAuthOpen] = useState(false);
  // Pending action after auth success (to open manage modal for a specific project)
  const [pendingManage, setPendingManage] = useState<{ pid: number; name: string } | null>(null);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbPid, setLbPid] = useState<number | null>(null);
  const [lbIdx, setLbIdx] = useState(0);

  // Manage modal state
  const [manageOpen, setManageOpen] = useState(false);
  const [managePid, setManagePid] = useState<number | null>(null);
  const [manageName, setManageName] = useState('');

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
  }, []);

  // Lightbox handlers
  const openLightbox = useCallback((pid: number, startIdx = 0) => {
    if ((mediaStore[pid] ?? []).length === 0) {
      openManage(pid, '');
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

  // Owner auth — called when a visitor clicks the locked 🔒 button
  const handleRequestOwnerAuth = (pid: number, name: string) => {
    setPendingManage({ pid, name });
    setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsOwner(true);
    setAuthOpen(false);
    // If triggered from a specific project card, open that manage modal immediately
    if (pendingManage) {
      openManage(pendingManage.pid, pendingManage.name);
      setPendingManage(null);
    }
  };

  const handleAuthClose = () => {
    setAuthOpen(false);
    setPendingManage(null);
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
      <Navbar activeSection={activeSection} isOwner={isOwner} onOwnerLogout={() => { setIsOwner(false); sessionStorage.removeItem('am_portfolio_owner'); }} onOwnerLogin={() => setAuthOpen(true)} />

      <main>
        <Hero />
        <About />
        <Projects
          mediaStore={mediaStore}
          isOwner={isOwner}
          onOpenLightbox={openLightbox}
          onOpenManage={openManage}
          onRequestOwnerAuth={handleRequestOwnerAuth}
        />
        <Experience />
        <Certifications />
        <Contact />
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

      <OwnerAuth
        isOpen={authOpen}
        onSuccess={handleAuthSuccess}
        onClose={handleAuthClose}
      />
    </>
  );
}
