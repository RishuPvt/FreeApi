import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchFilters } from './components/SearchFilters';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectGrid } from './components/ProjectGrid';
import { UploadForm } from './components/UploadForm';
import { Documentation } from './components/Documentation';
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
    likes: 45,
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
    likes: 89,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
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
    likes: 89,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
  },  {
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
    likes: 89,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
  },  {
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
    likes: 89,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
  },  {
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
    likes: 89,
    createdAt: '2024-03-14',
    githubUrl: 'https://github.com/janesmith/social-api'
  },
  // ... (keep other mock projects)
];

function App() {
  const [view, setView] = useState<'home' | 'detail' | 'upload' | 'docs'>('home');
  const [selectedProject, setSelectedProject] = useState<Backend | null>(null);
  const [projects, setProjects] = useState<Backend[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    language: '',
    framework: '',
    apiType: ''
  });

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

  const navigateToDocs = () => {
    setView('docs');
  };

  const handleLike = (projectId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, likes: (project.likes || 0) + 1 }
          : project
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (type: 'language' | 'framework' | 'apiType', value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = !filters.language || project.language === filters.language;
      const matchesFramework = !filters.framework || project.framework === filters.framework;
      const matchesApiType = !filters.apiType || project.apiType === filters.apiType;

      return matchesSearch && matchesLanguage && matchesFramework && matchesApiType;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar 
        onUploadClick={navigateToUpload} 
        onHomeClick={navigateToHome} 
        onDocsClick={navigateToDocs}
        currentView={view}
      />
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onUploadClick={navigateToUpload} />
            <SearchFilters
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
            <ProjectGrid
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
              onLike={handleLike}
            />
          </>
        )}
        {view === 'detail' && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={navigateToHome}
            onLike={() => handleLike(selectedProject.id)}
          />
        )}
        {view === 'upload' && (
          <UploadForm onBack={navigateToHome} />
        )}
        {view === 'docs' && (
          <Documentation onBack={navigateToHome} />
        )}
      </main>
      <Footer currentView={view} onDocsClick={navigateToDocs} />
    </div>
  );
}

export default App;