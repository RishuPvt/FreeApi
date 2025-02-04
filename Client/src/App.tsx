import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchFilters } from './components/SearchFilters';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectGrid } from './components/ProjectGrid';
import { UploadForm } from './components/UploadForm';
import { Footer } from './components/Footer';
import type { Backend } from './types';

// Mock data for demonstration
const mockProjects: Backend[] = [
  {
    id: '1',
    title: 'E-commerce REST API',
    description: 'A fully featured e-commerce backend with authentication, product management, order processing, and payment integration.',
    language: 'JavaScript',
    framework: 'Express',
    apiType: 'REST',
    author: 'John Doe',
    stars: 128,
    downloads: 1543,
    rating: 98,
    createdAt: '2024-03-15',
    githubUrl: 'https://github.com/johndoe/ecommerce-api'
  },
  {
    id: '2',
    title: 'Social Media GraphQL API',
    description: 'Modern social media backend with GraphQL, real-time notifications, and advanced caching strategies.',
    language: 'Python',
    framework: 'FastAPI',
    apiType: 'GraphQL',
    author: 'Jane Smith',
    stars: 256,
    downloads: 2187,
    rating: 95,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
  },
  {
    id: '3',
    title: 'Real-time Chat Backend',
    description: 'High-performance WebSocket-based chat backend with presence detection and message persistence.',
    language: 'Go',
    framework: 'Go Fiber',
    apiType: 'WebSocket',
    author: 'Mike Johnson',
    stars: 89,
    downloads: 876,
    rating: 92,
    createdAt: '2024-03-13',
    githubUrl: 'https://github.com/mikej/chat-backend'
  },
  {
    id: '4',
    title: 'Task Management API',
    description: 'Scalable task management system with team collaboration features and automated workflows.',
    language: 'Rust',
    framework: 'Actix',
    apiType: 'REST',
    author: 'Sarah Wilson',
    stars: 167,
    downloads: 1298,
    rating: 97,
    createdAt: '2024-03-12'
  },
  {
    id: '5',
    title: 'Authentication Service',
    description: 'Secure authentication service with OAuth2, JWT, and multi-factor authentication support.',
    language: 'Java',
    framework: 'Spring Boot',
    apiType: 'REST',
    author: 'Alex Brown',
    stars: 312,
    downloads: 3421,
    rating: 99,
    createdAt: '2024-03-11',
    githubUrl: 'https://github.com/alexb/auth-service'
  },
  {
    id: '6',
    title: 'File Storage API',
    description: 'Cloud-native file storage service with versioning, access control, and image processing.',
    language: 'C#',
    framework: 'ASP.NET',
    apiType: 'REST',
    author: 'Chris Taylor',
    stars: 145,
    downloads: 1876,
    rating: 94,
    createdAt: '2024-03-10',
    githubUrl: 'https://github.com/ctaylor/storage-api'
  }
];

function App() {
  const [view, setView] = useState<'home' | 'detail' | 'upload'>('home');
  const [selectedProject, setSelectedProject] = useState<Backend | null>(null);

  const handleProjectClick = (project: Backend) => {
    setSelectedProject(project);
    setView('detail');
  };

  const navigateToUpload = () => {
    setView('upload');
  };

  const navigateToHome = () => {
    setView('home');
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar onUploadClick={navigateToUpload} onHomeClick={navigateToHome} />
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onUploadClick={navigateToUpload} />
            <SearchFilters />
            <ProjectGrid
              projects={mockProjects}
              onProjectClick={handleProjectClick}
            />
          </>
        )}
        {view === 'detail' && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={navigateToHome}
          />
        )}
        {view === 'upload' && (
          <UploadForm onBack={navigateToHome} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;