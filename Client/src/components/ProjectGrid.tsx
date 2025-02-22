import { useState, useMemo, useEffect } from "react";
import { Download, Github, Heart } from "lucide-react";
import axios from "axios";
import type { Backend } from "../types";
import { backendUrl } from "../API/BackendApi";
import { useUserStore } from "../Store/User.store";
import { toast } from "react-toastify";
interface ProjectGridProps {
  searchQuery: string;
  filters: {
    language: string;
    framework: string;
    apiType: string;
  };
  onProjectClick: (project: Backend) => void;
}

export function ProjectGrid({
  searchQuery,
  filters,
  onProjectClick,
}: ProjectGridProps) {
  const [projects, setProjects] = useState<Backend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [updateProjectId, setUpdateProjectId] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    githubUrl: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/projects/allproject`, {
          withCredentials: true,
        });
        setProjects(response.data.data);
      } catch (error: any) {
        console.error(
          error.response?.data?.message || "Error fetching projects"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${backendUrl}/projects/deleteProject/${projectId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Project deleted succesfully");
      }
      setProjects(response.data.data || []);
    } catch (error: any) {
      toast.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateProjectId) return;

    try {
      const response = await axios.put(
        `${backendUrl}/projects/updateProject/${updateProjectId}`,
        updateData,
        { withCredentials: true }
      );
      setProjects(response.data.data || []);
      setUpdateProjectId(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.uploadedBy.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesLanguage =
        !filters.language ||
        project.language?.toLowerCase() === filters.language.toLowerCase();

      const matchesFramework =
        !filters.framework ||
        project.framework?.toLowerCase() === filters.framework.toLowerCase();

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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer relative"
            onClick={() => onProjectClick(project)}
          >
            {/* Menu Button */}
            <div className="absolute top-2 right-2">
              {useUserStore.getState().id === project.userId ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(
                      openMenuId === project.id ? null : project.id
                    );
                  }}
                  className="focus:outline-none text-white"
                >
                  ⋮
                </button>
              ) : null}

              {openMenuId === project.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateProjectId(project.id);
                      setOpenMenuId(null);
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>

            {/* Project Card Content */}
            <div className="p-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getLanguageColor(
                      project.language
                    )}`}
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.language}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mr-[25px]">
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
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      project.uploadedBy.name
                    )}&background=random`}
                    alt={project.uploadedBy.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {project.uploadedBy.name}
                  </span>
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
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Update Popup */}
      {updateProjectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Update Project</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  id="text"
                  type="text"
                  value={updateData.title}
                  name="title"
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={updateData.description}
                  name="description"
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  githubUrl
                </label>
                <input
                  id="githubUrl"
                  value={updateData.githubUrl}
                  name="githubUrl"
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateProjectId(null)}
                  className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getLanguageColor(language?: string): string {
  const colors: Record<string, string> = {
    javascript: "bg-yellow-400",
    python: "bg-blue-500",
    go: "bg-cyan-500",
    rust: "bg-orange-500",
    java: "bg-red-500",
    "c#": "bg-purple-500",
  };

  const normalizedLanguage = language?.trim().toLowerCase() || "default";
  return colors[normalizedLanguage] || "bg-gray-500";
}
