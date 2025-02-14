import { Code2, Github, Menu } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { AuthModal } from './AuthModal';
import type { View } from '../types';

interface NavbarProps {
  onUploadClick: () => void;
  onHomeClick: () => void;
  onDocsClick: () => void;
  currentView: View;
}

export function Navbar({ onUploadClick, onHomeClick, onDocsClick, currentView }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getLinkClasses = (view: View) => {
    const baseClasses = "transition-colors";
    const activeClasses = "text-indigo-600 dark:text-indigo-400";
    const inactiveClasses = "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400";
    return `${baseClasses} ${currentView === view ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">BackendHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={onHomeClick}
                className={getLinkClasses('home')}
              >
                Browse
              </button>
              <button
                onClick={onUploadClick}
                className={getLinkClasses('upload')}
              >
                Upload
              </button>
              <button
                onClick={onDocsClick}
                className={getLinkClasses('docs')}
              >
                Documentation
              </button>
              <ThemeToggle />
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  onHomeClick();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${getLinkClasses('home')}`}
              >
                Browse
              </button>
              <button
                onClick={() => {
                  onUploadClick();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${getLinkClasses('upload')}`}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  onDocsClick();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${getLinkClasses('docs')}`}
              >
                Documentation
              </button>
              <button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full mt-2 flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Github className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}