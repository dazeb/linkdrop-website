'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link href="/artifacts" className="text-sm font-medium">
          Artifacts
        </Link>
        <Link href="/gallery" className="text-sm font-medium">
          Gallery
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github size={24} />
        </Link>
        <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
          <Twitter size={24} />
        </Link>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;