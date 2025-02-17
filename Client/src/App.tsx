import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "./Store/User.store";
import { backendUrl } from "./API/BackendApi";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchFilters } from "./components/SearchFilters";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectGrid } from "./components/ProjectGrid";
import { UploadForm } from "./components/UploadForm";
import { Documentation } from "./components/Documentation";
import { Footer } from "./components/Footer";
import type { Backend } from "./types";

function App() {
  const [view, setView] = useState<"home" | "detail" | "upload" | "docs">(
    "home"
  );
  const [selectedProject, setSelectedProject] = useState<Backend | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    language: "",
    framework: "",
    apiType: "",
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/currentUser`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log(response.data.message || "User login successful!");
          const userData = response.data.data;

          useUserStore.getState().setUser({
            name: userData.name,
            id: userData.id,
            isAuth: true,
          });
        }
      } catch (error: any) {
        console.error("Caught error:", error);

        const errorMessage =
          error.response?.data?.message ||
          "Failed to authenticate. Please try again.";
        console.error(errorMessage);
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProjectClick = (project: Backend) => {
    setSelectedProject(project);
    setView("detail");
  };

  const navigateTo = (view: "home" | "detail" | "upload" | "docs") => {
    setView(view);
    if (view === "home") setSelectedProject(null);
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleFilterChange = (
    type: "language" | "framework" | "apiType",
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar
        onUploadClick={() => navigateTo("upload")}
        onHomeClick={() => navigateTo("home")}
        onDocsClick={() => navigateTo("docs")}
        currentView={view}
      />
      <main className="flex-grow">
        {view === "home" && (
          <>
            <Hero onUploadClick={() => navigateTo("upload")} />
            <SearchFilters
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
            <ProjectGrid
              searchQuery={searchQuery}
              filters={filters}
              onProjectClick={handleProjectClick}
            />
          </>
        )}
        {view === "detail" && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={() => navigateTo("home")}
          />
        )}
        {view === "upload" && <UploadForm onBack={() => navigateTo("home")} />}
        {view === "docs" && <Documentation onBack={() => navigateTo("home")} />}
      </main>
      <Footer currentView={view} onDocsClick={() => navigateTo("docs")} />
    </div>
  );
}

export default App;
