import { Download, Github, Star, ThumbsUp } from 'lucide-react';
import type { Backend } from '../types';

interface ProjectGridProps {
  projects: Backend[];
  onProjectClick: (project: Backend) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.language}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">{project.stars}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Download className="w-4 h-4 mr-1" />
                    <span className="text-sm">{project.downloads}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-xs">
                  {project.framework}
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs">
                  {project.apiType}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(project.author)}&background=random`}
                    alt={project.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {project.author}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-emerald-500">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">{project.rating}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
              <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm rounded-lg transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    Python: 'bg-blue-500',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-500',
    Java: 'bg-red-500',
    'C#': 'bg-purple-500'
  };
  return colors[language] || 'bg-gray-500';
}