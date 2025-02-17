import { motion } from 'framer-motion';
import { ArrowLeft, Code2, FileText, Upload, Download, Heart, Github, Search, CheckCircle } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const cardHover = {
  hover: { 
    y: -5,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

export function Documentation({ onBack }: DocumentationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 dark:from-gray-900/50 to-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDAwMCwwLDAsMC4xKSIgLz48L3N2Zz4=')]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-11 relative">
        <motion.button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to home
        </motion.button>

        <motion.div 
          className="prose prose-indigo dark:prose-invert max-w-none"
          initial="initial"
          animate="animate"
          variants={{}}
        >
          <motion.div {...fadeIn}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <Code2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Documentation
              </span>
            </h1>
          </motion.div>

          <div className="space-y-16">
            {/* Getting Started Section */}
            <motion.section {...fadeIn}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                🚀 Getting Started
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Welcome to BackendHub! Our platform bridges the gap between frontend developers and production-ready backend solutions. 
                Follow these three simple steps to accelerate your development process:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {[
                  { icon: Search, title: "Browse Projects", text: "Discover backend solutions filtered by language, framework, and API type." },
                  { icon: Download, title: "Download & Integrate", text: "Get the code and follow our detailed integration guides." },
                  { icon: Heart, title: "Engage & Share", text: "Contribute to the community with feedback and project sharing." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={cardHover}
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                  >
                    <item.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Workflow Section */}
            <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                🔄 Platform Workflow
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Smart Discovery", content: "Use our intelligent filters and search to find perfect backend solutions." },
                  { title: "Seamless Integration", content: "Download with one-click and follow interactive setup guides." },
                  { title: "Community Power", content: "Share projects, get feedback, and collaborate with developers." }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="pl-6 relative before:absolute before:left-0 before:top-4 before:w-3 before:h-3 before:bg-indigo-600 before:rounded-full before:animate-pulse"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Contribution Guide */}
            <motion.section {...fadeIn} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                👨💻 For Backend Developers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Share your expertise with the community! Follow this streamlined process to publish your backend projects:
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-inner">
                <ol className="space-y-8">
                  {[
                    "Upload your project through our submission portal",
                    "Include detailed documentation and setup guides",
                    "Add API specifications and testing instructions",
                    "Provide deployment configurations and environment variables",
                    "Submit for community review and approval"
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center text-white mt-1">
                        {idx + 1}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-lg flex-1">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.section>

            {/* Best Practices */}
            <motion.section {...fadeIn} transition={{ delay: 0.6 }}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                🏆 Excellence Guidelines
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Modular architecture with clear separation of concerns",
                  "Comprehensive error handling and logging",
                  "JWT authentication & authorization implementation",
                  "API versioning and proper status codes",
                  "Database schema design documentation",
                  "Performance optimization strategies"
                ].map((practice, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed right-8 bottom-8 space-y-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl"
            title="View GitHub Repository"
          >
            <Github className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}