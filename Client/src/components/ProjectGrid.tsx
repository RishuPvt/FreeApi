import { useState, useMemo, useEffect } from "react";
import { Download, Github, Heart } from "lucide-react";
import axios from "axios";
import type { Backend } from "../types";
import { backendUrl } from "../API/BackendApi";

interface ProjectGridProps {
  searchQuery: string;
  filters: {
    language: string;
    framework: string;
    apiType: string;
  };
  onProjectClick: (project: Backend) => void;
}

export function ProjectGrid({ searchQuery, filters, onProjectClick }: { searchQuery: string; filters: { language: string; framework: string; apiType: string; }; onProjectClick: (project: Backend) => void; }) {
  const [projects, setProjects] = useState<Backend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/projects/allproject`, {
          withCredentials: true,
        });
        setProjects(response.data.data);
      } catch (error: any) {
        console.error(error.response?.data?.message || "Error fetching projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);


  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.uploadedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesLanguage =
        !filters.language || // If no language filter is selected
        project.language?.toLowerCase() === filters.language.toLowerCase(); // Case-insensitive comparison
  
      const matchesFramework =
        !filters.framework || // If no framework filter is selected
        project.framework?.toLowerCase() === filters.framework.toLowerCase(); // Case-insensitive comparison
  
      return matchesSearch && matchesLanguage && matchesFramework;
    });
  }, [searchQuery, filters, projects]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading projects...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            <div className="p-[10px]">
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.language}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="text-sm">{project.downloadCount}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
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
                </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(project.uploadedBy.name)}&background=random`}
                    alt={project.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {project.uploadedBy.name}

                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(project.id);
                  }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  <Heart className={`w-4 h-4 mr-1 ${project.likes ? "fill-current text-pink-500" : ""}`} />
                </button>
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
    javascript: "bg-yellow-400",
    python: "bg-blue-500",
    go: "bg-cyan-500",
    rust: "bg-orange-500",
    java: "bg-red-500",
    "c#": "bg-purple-500",
  };

  const normalizedLanguage = language?.trim().toLowerCase();

  return colors[normalizedLanguage] || "bg-gray-500";
}
