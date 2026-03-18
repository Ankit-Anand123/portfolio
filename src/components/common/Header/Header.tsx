import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Open Source', path: '/open-source' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo — Playfair Display */}
          <Link
            to="/"
            data-testid="logo-link"
            className="font-playfair font-medium text-xl text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors duration-300 tracking-tight"
          >
            Ankit Anand
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                data-testid={`nav-${item.name.toLowerCase()}`}
                className={`relative text-sm font-manrope font-medium tracking-wide transition-colors duration-300 group ${
                  isActivePath(item.path)
                    ? 'text-[var(--color-gold)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                    isActivePath(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="p-2 rounded-full text-[var(--color-muted)] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
              className="md:hidden p-2 rounded-full text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-[var(--color-border)] flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                className={`px-4 py-3 text-sm font-manrope font-medium rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-[#D4AF37] bg-white/5'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
