import { Code2, Github, Twitter } from 'lucide-react';
import type { View } from '../types';

interface FooterProps {
  currentView: View;
  onDocsClick: () => void;
}

export function Footer({ currentView, onDocsClick }: FooterProps) {
  const getLinkClasses = (view: View) => {
    const baseClasses = "transition-colors";
    const activeClasses = "text-indigo-600 dark:text-indigo-400";
    const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400";
    return `${baseClasses} ${currentView === view ? activeClasses : inactiveClasses}`;
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">BackendHub</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Empowering frontend developers with production-ready backend code.
              Build complete applications faster with our curated collection of backend solutions.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button 
                  onClick={onDocsClick}
                  className={getLinkClasses('docs')}
                >
                  Documentation
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  API Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Best Practices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BackendHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}