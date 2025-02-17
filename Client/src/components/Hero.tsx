import { ArrowRight, Code2, Download, Upload } from "lucide-react";
interface HeroProps {
  onUploadClick: () => void;
}
export function Hero({ onUploadClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Backend Code
          <span className="relative whitespace-nowrap text-indigo-600 dark:text-indigo-400">
            <span className="relative">Made Simple</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Access a vast library of production-ready backend code. Perfect for
          frontend developers looking to build complete applications.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <button className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Browse Backend Code
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onUploadClick}
            className="group inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Share Your Backend
            <Upload className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Code2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Ready to Use
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Production-ready backend code that you can use immediately
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Download className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Easy Integration
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Simple download and setup process with clear documentation
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Upload className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Share & Collaborate
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Share your backend code and help other developers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
