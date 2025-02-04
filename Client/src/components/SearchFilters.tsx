import { Search } from 'lucide-react';

const languages = ['JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C#'];
const frameworks = ['Express', 'Django', 'FastAPI', 'Spring Boot', 'ASP.NET', 'NestJS'];
const apiTypes = ['REST', 'GraphQL', 'gRPC', 'WebSocket', 'tRPC'];

export function SearchFilters() {
  return (
    <div className="bg-white dark:bg-gray-900 py-8 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search backend projects..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <select className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Language</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          
          <select className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Framework</option>
            {frameworks.map(framework => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
          
          <select className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select API Type</option>
            {apiTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}