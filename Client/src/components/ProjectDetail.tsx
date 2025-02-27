import { ArrowLeft, Download, Github, Star, Users } from "lucide-react";
import type { Backend } from "../types";
import { backendUrl } from "../API/BackendApi";
import axios from "axios";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

interface ProjectDetailProps {
  project: Backend;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [loading, setloading] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);

  const fetchfile = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/projects/downloadProject/${project.id}`,
        { withCredentials: true }
      );
      const files = response.data.data?.fileUrl || [];
      setFileUrls(Array.isArray(files) ? files : []);
      return files; 
    } catch (error: any) {
      console.error(error.response?.data?.message || "Error fetching projects");
      return [];
    }
  };

  const downloadFilesAsZip = async (urls) => {
    if (!Array.isArray(urls) || urls.length === 0) {
      console.error("No valid URLs to download");
      return;
    }

    const zip = new JSZip();

    const fetchPromises = urls.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      zip.file(`file_${index + 1}.jpg`, blob);
    });

    await Promise.all(fetchPromises);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "files.zip");
  };
  const handleDownloadClick = async () => {
    setloading(true);
    const files = await fetchfile();
    if (files?.length > 0) {
      await downloadFilesAsZip(files);
    } else {
      toast.error("No files to download");
    }
    setloading(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-11">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to projects
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1" />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Download className="w-5 h-5 mr-1" />
                <span>{project.downloadCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">
                {project.uploadedBy.name}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
              {project.language}
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">
              {project.framework}
            </span>
          </div>

          <div className="mt-8 flex items-center space-x-4">
            <button
              onClick={handleDownloadClick}
              className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              {loading ? "Loading..." : "Download"}
            </button>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h2>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`// Example API endpoints
GET /api/users
POST /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
