import { ArrowLeft, Code2, FileText, Upload, Download, Heart, Github, Search } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export function Documentation({ onBack }: DocumentationProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to home
      </button>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <Code2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          Documentation
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              BackendHub is a platform that connects frontend developers with production-ready backend code.
              Here's how to get started:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Browse Projects</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore our collection of backend projects filtered by language, framework, and API type.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Download className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Download & Use</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download the backend code and follow the setup instructions to integrate it with your frontend.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Engage & Share</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Like projects, provide feedback, and share your experience with the community.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Website Flow</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Homepage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The homepage showcases featured backend projects and provides filtering options to help you find the perfect backend solution.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on any project to view detailed information, including documentation, setup instructions, and GitHub repository links.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Project</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share your backend projects with the community by providing project details, documentation, and source code links.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">For Backend Developers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Want to share your backend code with the community? Follow these steps:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-400">
                <li>Click the "Upload" button in the navigation bar</li>
                <li>Fill in your project details:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>Project title and description</li>
                    <li>Programming language and framework</li>
                    <li>API type (REST, GraphQL, etc.)</li>
                    <li>GitHub repository URL (optional)</li>
                  </ul>
                </li>
                <li>Submit your project for review</li>
                <li>Once approved, your project will be available to the community</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </span>
                  <span>Include comprehensive documentation with setup instructions and API endpoints</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </span>
                  <span>Implement proper error handling and validation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </span>
                  <span>Follow security best practices and include authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </span>
                  <span>Write clean, maintainable code with proper comments</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}