import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { backendUrl } from "../API/BackendApi";
import axios from "axios";

interface UploadFormProps {
  onBack: () => void;
}
export function UploadForm({ onBack }: UploadFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    framework: "",
    author: "",
    githubUrl: "",
  });
  const [loading, setloading] = useState(false);
  const [media, setMedia] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setMedia(Array.from(files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("language", formData.language);
      form.append("framework", formData.framework);
      form.append("author", formData.author);
      form.append("githubUrl", formData.githubUrl);

      if (media.length > 0) {
        media.forEach((file) => form.append("fileUrl", file));
      }

      const response = await axios.post(
        `${backendUrl}/projects/uploadproject`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Upload successful!");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-11">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to home
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Share Your Backend
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                placeholder="Describe your backend project"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Language *
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="framework"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Framework *
                </label>
                <select
                  id="framework"
                  name="framework"
                  value={formData.framework}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                >
                  <option value="">Select Framework</option>
                  <option value="Express">Express</option>
                  <option value="Django">Django</option>
                  <option value="FastAPI">FastAPI</option>
                  <option value="Spring Boot">Spring Boot</option>
                  <option value="ASP.NET">ASP.NET</option>
                  <option value="NestJS">NestJS</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Author Name *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                GitHub Repository URL *
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                placeholder="https://github.com/username/repository"
              />
            </div>
            <label className="flex items-center gap-2 w-full max-w-xs px-4 py-2  text-white rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition">
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium ">
                Upload Files (Optional)
              </span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2 " />
                  Upload Project
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
